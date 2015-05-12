var fs = require('fs');
var Path = require('path');

var testFilePattern = '{name}-test';
var testsDirName = 'test';
var testFilePath = '';
var separateTests = true;
var scriptsDirName = 'lib';
var base = __dirname;
var testBase = __dirname.replace(new RegExp('\/' + testsDirName + '$'), '') +
      '/' + (separateTests ? testsDirName : scriptsDirName);

// allow for global initialization logic
(function () {
      global.expect = require('chai').expect;
    })();

function getFilePaths(path) {
  var moduleOrTestFileName = Path.basename(path, '.js');
  var isTestFile;
  var fileName;
  var moduleName;

  // extract the module name from the test file name if it exists
  var testFileNameMatch = moduleOrTestFileName.match(
        new RegExp(testFilePattern.replace('{name}', '(.*)') + '$'));
  if (testFileNameMatch) {
    // extract the module name from the test file name
    moduleName = testFileNameMatch[1];
    isTestFile = true;
  } else {
    // the module name is the test file name (the ext has already been removed)
    moduleName = moduleOrTestFileName;
  }
  fileName = moduleName + '.js';

  // return both the test file and standard file from this path (which could be either)

  // path within the .test directory
  var relativePath = path.substring(base.length + 1);
  // path to the module js file
  var modulePath = Path.dirname(relativePath)
      // remove the initial js or test dir
      .replace(/(^|\/)[^\/]*/, '');
  // name of test module file
  var testFileName = testFilePattern.replace('{name}', moduleName) + '.js';

  var rtn;
  if (separateTests) {
    rtn = {
      moduleDir: Path.join(base, scriptsDirName, modulePath),
      moduleFile: Path.join(base, scriptsDirName, modulePath, fileName),
      testFile: Path.join(base, testsDirName, modulePath, testFileName)
    };
  } else {
    // remove the test directory if it exists (and is relative)
    modulePath = modulePath.replace(new RegExp('(^|\/)' + testsDirName + '$'), '');
    rtn = {
      moduleDir: Path.join(base, scriptsDirName, modulePath),
      moduleFile: Path.join(base, scriptsDirName, modulePath, fileName),
      testFile: Path.join(base, scriptsDirName, modulePath, testsDirName, testFileName)
    };
  }
  rtn.isTestFile = isTestFile;
  rtn.relativeModulePath = rtn.moduleFile.substring(base.length + scriptsDirName.length + 1);

  return rtn;
}

// test all
function evalDir(path) {
  fs.readdirSync(path).forEach(function(name) {
    if (!isHiddenFile(name)) {
      var _path = Path.join(path, name);
      var stats = fs.lstatSync(_path);
      if (stats.isDirectory()) {
        evalDir(_path);
      } else if (stats.isFile() && isTestFile(path, name)) {
        evalFile(_path);
      }
    }
  });
}

function evalFile(path) {
  // just makes the path tests easier
  path = path.replace('\\', '/');

  var filePaths = getFilePaths(path),
      targetModule;
  if (filePaths.isTestFile && path.match(/\/_[^\/]*$/)) {
    // files in tests dir prefixed with _ won't be tested - good for utility classes
    return;
  }
  if (!fs.existsSync(filePaths.moduleFile)) {
    // we have a test file without a match
    console.error(filePaths.relativeModulePath + ' does not exist');
  } else {
    targetModule = true;
  }
  if (!fs.existsSync(filePaths.testFile)) {
    // if there is no file than there is nothing to do here
    return;
  }

  describe(filePaths.relativeModulePath, function() {
    var rtn = require(filePaths.testFile);
    if (typeof rtn === 'function') {
      // execute the function and provide the test target object and test base path
      targetModule = targetModule && require(filePaths.moduleFile);
      rtn(targetModule, filePaths.moduleDir);
    }
  });
}

function isTestFile(path, name) {
  if (name.indexOf('_') === 0) {
    return false;
  }
  if (separateTests) {
    var relativePath = path.substring(base.length + 1);
    return relativePath === testsDirName || relativePath.match(
      new RegExp('^' + testsDirName + '\/'));
  } else {
    return path.match(new RegExp('\/' + testsDirName + '$'));
  }
}

function isHiddenFile(fileName) {
  return fileName.match(/^\./);
}

if (testFilePath) {
  evalFile(testFilePath);
} else {
  evalDir(testBase);
}


