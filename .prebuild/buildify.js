const fs = require('fs');
const os = require('os');
const path = require('path');
const child_process = require('child_process');

const prebuildPkgPath = path.dirname(require.resolve('prebuildify'));
const prebuildPath = path.resolve(prebuildPkgPath, 'bin.js');

const cwd = path.resolve(__dirname, '../');

/**
 * --------------- Node.js Build ---------------
 */

// define build targets
const nodeBuildTargets = [
//  '-t',
//  '14.0.0',
//  '-t',
//  '15.0.0',
//  '-t',
//  '16.0.0',
//  '-t',
//  '17.0.1',
//  '-t',
//  '18.0.0',
//  '-t',
//  '19.0.0'
//  "-t",
//  "22.0.0",
//  "-t",
//  "23.1.2",
  "-t",
  "electron@23.1.2"
//  '-t',
//  '18.0.0',
//  '-t',
//  '19.0.0'
//  "-t",
//  "18.12.1"
]

const nodeBuildCmd = [
  prebuildPath,
  "-r",
  "electron",
  ...nodeBuildTargets,
]

if (os.platform() === 'linux' && fs.existsSync('/etc/alpine-release')) {
  nodeBuildCmd.push('--tag-libc')
}

//nodeBuildCmd.push('--tag-armv')

console.log('Building for Node.js:');
console.log(nodeBuildCmd.join(' '));

try {
  child_process.spawnSync(process.execPath, nodeBuildCmd, {
    cwd: cwd,
    stdio: ['inherit', 'inherit', 'inherit']
  });
} catch (e) {
  console.error(e);
  process.exit(0);
}

//
//
//console.log("Built files for non-windows");
//console.log("Extracting them into the right sub-directories in prebuilds/");
//
//// Find files (like .e.g. prebuilds/@cdktf/node-pty-prebuilt-multiarch-v0.10.1-pre.9-node-v83-darwin-x64.tar.gz)
//const pkg = require("../package.json");
////const [scope, package] = pkg.name.split("/");
//const version = pkg.version;
////const dir = path.join(cwd, "prebuilds", scope);
//const dir = path.join(cwd, "prebuilds", `${os.platform}-${os.arch}`);
//
//const files = fs.readdirSync(dir);
//console.log("**FILES", files)
//const all = files.map((file) => {
//  const match = /node-v(\d+)-/.exec(file);
//  if (!match) return Promise.resolve();
//  const fullname = path.join(dir, file);
//  const abi = match[1];
//  const dest = path.resolve(
//    cwd,
//    "prebuilds",
//    `${os.platform}-${os.arch}`,
//    `abi${abi}`
//  );
//  return decompress(fullname, dest, {
//    plugins: [decompressTargz()],
//  }).then(() => {
//    console.log(`Decompressed ${fullname} into ${dest}`);
//  });
//});
//
//Promise.all(all).then(() => {
//  console.log("Done decompressing.");
//  console.log("Deleting compressed files in prebuilds dir");
//
////  for(let file of files) {
////    console.log("removing", file)
////    fs.rmSync(path.join(dir, file))
////  }
//
//  fs.rmdirSync(dir, { recursive: true, force: true });
//
//  console.log("Done");
//});
