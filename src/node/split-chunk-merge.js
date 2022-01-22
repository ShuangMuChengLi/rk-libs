/**
 * https://github.com/xbc30/split-chunk-merge
 */
const path = require('path');
const fs = require('fs');

const Promise = require('bluebird');

const splitByParts = (file, parts, targetPath = '', targetName = '') => {
  const self = this;

  // Validate parameters.
  if (parts < 1) {
    return Promise.reject(new Error('Parameter \'parts\' is invalid, must contain an integer value.'));
  }

  return Promise.promisify(fs.stat)(file).then(function (stat) {
    if (!stat.isFile) {
      return Promise.reject(new Error('Given file is not valid'));
    }
    if (!stat.size) {
      return Promise.reject(new Error('File is empty'));
    }

    const totalSize = stat.size;
    const splitSize = Math.floor(totalSize / parts);

    // If size of the parts is 0 then you have more parts than bytes.
    if (splitSize < 1) {
      return Promise.reject(new Error('Too many parts, or file too small!'));
    }

    // Get last split size, this is different from the others because it uses scrap value.
    const lastSplitSize = splitSize + totalSize % parts;

    // Capture the partinfo in here:
    const partInfo = [];

    // Iterate the parts
    for (let i = 0; i < parts; i++) {
      partInfo[i] = {
        number: i,

        // Set buffer read start position
        start: i * splitSize,

        // Set total ending position
        end: (i * splitSize) + splitSize
      };

      if (i === (parts - 1)) {
        partInfo[i].end = (i * splitSize) + lastSplitSize;
      }
    }

    return splitFile(file, partInfo, targetPath, targetName);
  });
};

/**
 * Split file into multiple parts based on max part size given
 * @param {string} file
 * @param {int} maxSize max part size in BYTES!
 * @param targetPath
 * @param targetName
 * @returns {Promise}
 */
const splitBySizes = (file, maxSize, targetPath, targetName) => {
  return Promise.promisify(fs.stat)(file).then(function (stat) {
    if (!stat.isFile) {
      return Promise.reject(new Error('Given file is not valid'));
    }
    if (!stat.size) {
      return Promise.reject(new Error('File is empty'));
    }

    const totalSize = stat.size;

    // Number of parts (exclusive last part!)
    const parts = Math.ceil(totalSize / maxSize);
    const splitSize = Math.round(maxSize);

    // If size of the parts is 0 then you have more parts than bytes.
    if (splitSize < 1) {
      return Promise.reject(new Error('Too many parts, or file too small!'));
    }

    // Capture the partinfo in here:
    const partInfo = [];

    // Iterate the parts
    for (let i = 0; i < parts; i++) {
      partInfo[i] = {
        number: i,

        // Set buffer read start position
        start: i * splitSize,

        // Set total ending position
        end: (i * splitSize) + splitSize
      };
    }

    // recalculate the size of the last chunk
    partInfo[partInfo.length - 1].end = totalSize;

    return splitFile(file, partInfo, targetPath, targetName);
  });
};

/**
 * Split the file, given by partinfos and filepath
 * @access private
 * @param {string} file
 * @param {object} partInfo
 *
 * @param targetPath {string}
 * @param targetName
 * @returns {Promise}
 */
const splitFile = (file, partInfo, targetPath, targetName = '') => {
  // Now the magic. Read buffers with length..
  const partFiles = [];

  return Promise.mapSeries(partInfo, function (info) {
    return new Promise(function (resolve, reject) {
      // Open up a reader
      const reader = fs.createReadStream(file, {
        encoding: null,
        start: info.start,
        end: info.end - 1
      });

      // Part name (file name of part)
      // get the max number of digits to generate for part number
      // ex. if original file is split into 4 files, then it will be 1
      // ex. if original file is split into 14 files, then it will be 2
      // etc.
      const maxPaddingCount = String(partInfo.length).length;
      // initial part number
      // ex. '0', '00', '000', etc.
      let currentPad = '';
      for (let i = 0; i < maxPaddingCount; i++) {
        currentPad += '0';
      }
      // construct part number for current file part
      // <file>-chunk-1
      // ...
      // <file>-chunk-5
      const unpaddedPartNumber = '' + info.number;
      const partNumber = currentPad.substring(0, currentPad.length - unpaddedPartNumber.length) + unpaddedPartNumber;
      const partName = path.resolve(targetPath, targetName + '-chunk-' + partNumber);

      partFiles.push(partName);

      // Open up writer
      const writer = fs.createWriteStream(partName);

      // Pipe reader to writer
      const pipe = reader.pipe(writer);

      pipe.on('error', reject);
      pipe.on('finish', resolve);
    });
  }).then(function () {
    return Promise.resolve(partFiles);
  });
};

/**
 * Merge all input files by fs.appendFileSync()
 * @access private
 * @param {array} inputPathList
 * @param {string} outputPath
 *
 * @returns {Promise}
 */
const fsMerge = (inputPathList, outputPath) => {
  // Validate inputPathList.
  if (inputPathList.length <= 0) {
    return Promise.reject(new Error('Please input an array with files path!'));
  }

  return Promise.mapSeries(inputPathList, function (item) {
    fs.appendFileSync(outputPath, fs.readFileSync(item));
  }).then(function () {
    return Promise.resolve(outputPath);
  });
};

/**
 * Merge all input files by Buffer.concat()
 * @access private
 * @param {array} inputPathList
 * @param {string} outputPath
 *
 * @returns {Promise}
 */
const bufferMerge = (inputPathList, outputPath) => {
  // Validate inputPathList.
  if (inputPathList.length <= 0) {
    return Promise.reject(new Error('Please input an array with files path!'));
  }

  const buffers = [];

  return Promise.mapSeries(inputPathList, function (item) {
    buffers.push(fs.readFileSync(item));
  }).then(function () {
    // Buffer.concat() merge all buffers
    const concatBuffer = Buffer.concat(buffers);

    // write the merged buffer to the output file
    fs.writeFileSync(outputPath, concatBuffer);
    return Promise.resolve(outputPath);
  });
};

/**
 * Merge all input files by pipeline stream
 * @access private
 * @param {array} inputPathList
 * @param {string} outputPath
 * @param {int} chunkSize[optional]
 *
 * @returns {Promise}
 */
const streamMerge = (inputPathList, outputPath, chunkSize = 2 * 1024 * 1024) => {
  // Validate inputPathList.
  if (inputPathList.length <= 0) {
    return Promise.reject(new Error('Please input an array with files path!'));
  }

  // create writable stream for output
  const output = fs.createWriteStream(outputPath, {
    encoding: null
  });

  let i = 0;
  return Promise.mapSeries(inputPathList, function (item) {
    console.log(++i);
    return new Promise(function (resolve, reject) {
      const input = fs.createReadStream(item, {
        encoding: null,
        highWaterMark: chunkSize
      });

      // pipeline data flow
      input.pipe(output, {
        end: i === inputPathList.length
      });
      input.on('error', reject);
      input.on('end', resolve);
    });
  }).then(function () {
    // close the stream to prevent memory leaks
    output.close();
    return Promise.resolve(outputPath);
  });
};

module.exports = {
  splitByParts,
  splitBySizes,
  splitFile,
  fsMerge,
  bufferMerge,
  streamMerge
};
