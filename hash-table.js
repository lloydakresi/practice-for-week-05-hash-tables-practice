const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
    this.capacity = numBuckets;
  }

  hash(key) {
    // Your code here
    let hex = sha256(key).slice(0, 8);
    let hexDec = parseInt(hex, 16);
    return hexDec;
  }

  hashMod(key) {
    // Your code here
    let integer = this.hash(key);
    return integer % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let kVPair = new KeyValuePair(key, value);
    let bucketKey = this.hashMod(key);
    if(this.data[bucketKey]){
      throw new Error("hash collision or same key/value pair already exists!");
    }
    this.data[bucketKey] = kVPair;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let kVPair = new KeyValuePair(key, value);
    let bucketKey = this.hashMod(key);
    if(this.data[bucketKey]){
      let prev = this.data[bucketKey];
      this.data[bucketKey] = kVPair;
      this.data[bucketKey].next = prev;
    }else{
      this.data[bucketKey] = kVPair;
    }
    this.count++;

  }

  insert(key, value) {
    // Your code here
    let kVPair = new KeyValuePair(key,value)
    let bucketKey = this.hashMod(key)

    if (this.data[bucketKey]) {
      // search for same key
      let bucketPair = this.data[bucketKey]
      while (bucketPair !== null
            && bucketPair.key !== key) {
        bucketPair = bucketPair.next;
      }
      if (bucketPair === null) {
        let prev = this.data[bucketKey];
        this.data[bucketKey] = kVPair;
        this.data[bucketKey].next = prev;
        this.count++
      } else {
      // (bucketPair.key === key) {
        bucketPair.value = kVPair.value;
      } ;
    } else {
      this.data[bucketKey] = kVPair;
      this.count++
    }

  }

}


module.exports = HashTable;
