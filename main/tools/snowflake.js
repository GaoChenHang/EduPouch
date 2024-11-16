// snowflake.js

class Snowflake {
    constructor(workerId, datacenterId) {
        if (workerId > 31 || workerId < 0) {
            throw new Error('workerId must be between 0 and 31');
        }
        if (datacenterId > 31 || datacenterId < 0) {
            throw new Error('datacenterId must be between 0 and 31');
        }

        this.twepoch = 1288834974657n;
        this.workerIdBits = 5n;
        this.datacenterIdBits = 5n;
        this.maxWorkerId = -1n ^ (-1n << this.workerIdBits);
        this.maxDatacenterId = -1n ^ (-1n << this.datacenterIdBits);
        this.sequenceBits = 12n;

        this.workerIdShift = this.sequenceBits;
        this.datacenterIdShift = this.sequenceBits + this.workerIdBits;
        this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;
        this.sequenceMask = -1n ^ (-1n << this.sequenceBits);

        this.workerId = BigInt(workerId);
        this.datacenterId = BigInt(datacenterId);
        this.sequence = 0n;
        this.lastTimestamp = -1n;
    }

    tilNextMillis(lastTimestamp) {
        let timestamp = this.timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = this.timeGen();
        }
        return timestamp;
    }

    timeGen() {
        return BigInt(Math.floor(Date.now()));
    }

    nextId() {
        let timestamp = this.timeGen();

        if (timestamp < this.lastTimestamp) {
            throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1n) & this.sequenceMask;
            if (this.sequence === 0n) {
                timestamp = this.tilNextMillis(this.lastTimestamp);
            }
        } else {
            this.sequence = 0n;
        }

        this.lastTimestamp = timestamp;

        return BigInt((timestamp - this.twepoch) << this.timestampLeftShift) |
               (this.datacenterId << this.datacenterIdShift) |
               (this.workerId << this.workerIdShift) |
               this.sequence;
    }
}

module.exports =  Snowflake;