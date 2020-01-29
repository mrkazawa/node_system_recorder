const fs = require('fs');
const si = require('systeminformation');

// location to store the result
//const RESULT_DATA_PATH = '/home/vagrant/monitoring_result.csv';
const RESULT_DATA_PATH = 'monitoring_result.csv';
const NUMBER_OF_CORES = 2;

function consturctHeader() {
    let string = "timestamp,mem_used,rx_bytes,tx_bytes";
    for (i = 0; i < NUMBER_OF_CORES; i++) {
        string += ",cpu_"+i;
    }
    string += "\r\n";
    return string;
}

async function main() {
    const header = consturctHeader();
    fs.appendFileSync(RESULT_DATA_PATH, header);
}
 
async function cpuData() {
    try {
        const data = await si.cpu();
        console.log('CPU Information:');
        console.log('- manufucturer: ' + data.manufacturer);
        console.log('- brand: ' + data.brand);
        console.log('- speed: ' + data.speed);
        console.log('- cores: ' + data.cores);
        console.log('- physical cores: ' + data.physicalCores);
        console.log('...');
    } catch (e) {
        console.log(e);
    }
}

async function timeData() {
    try {
        const time = await si.time();
        console.log('Current Time: ' + time.current);
    } catch (e) {
        console.log(e);
    }
}

async function cpuLoad() {
    try {
        const cpuLoad = await si.currentLoad();
        console.log('Current Load: ' + cpuLoad.currentload);
        console.log('CPU 0 Load: ' + cpuLoad.cpus[0].load);
        console.log('CPU 1 Load: ' + cpuLoad.cpus[1].load);
    } catch (e) {
        console.log(e);
    }
}

async function ramUsage() {
    try {
        const ram = await si.mem();
        console.log('Memory Total: ' + ram.total);
        console.log('Memory Used: ' + ram.used);
        console.log('Memory Free: ' + ram.free);
    } catch (e) {
        console.log(e);
    }
}

async function netUsage() {
    try {
        const netInt = await si.networkInterfaces();
        // make sure to use the correct network interface here
        const netStat = await si.networkStats(netInt[3].iface);
        console.log('Network Interface: ' + netStat[0].iface);
        console.log('Rx bytes: ' + netStat[0].rx_bytes);
        console.log('Tx bytes: ' + netStat[0].tx_bytes);
    } catch (e) {
        console.log(e);
    }
}

main();