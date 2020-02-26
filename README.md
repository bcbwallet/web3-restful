# Restful  API wrapper for Ethereum web3.js

Intended to support all web3.js APIs, not tested yet.

## Install

- Install

```
npm install
```

- Install forever

```
npm install -g forever
```

- Run

```
forever start index.js -o out.log -e err.log
```

## API scheme

- web3.js

```
web3.x.y.z
```

- web3-restful

```
POST /x/y/z
```

Body

```json
{ "params": [ param1, param2, ... ] }
```

Response

```json
{ "result": "result from web3.js" }
```

## Example

- encodeParameter

web3.js

```javascript
web3.eth.abi.encodeParameter('uint256', '2345675643');
> "0x000000000000000000000000000000000000000000000000000000008bd02b7b"
```

web3-restful

```json
curl -X POST -d '{"params": ["uint256", "2345675643"]}' -H "Content-Type:application/json" localhost:3000/eth/abi/encodeParameter

> {"result":"0x000000000000000000000000000000000000000000000000000000008bd02b7b"}
```

- encodeParameters

web3.js

```javascript
web3.eth.abi.encodeParameters(['uint8[]','bytes32'], [['34','434'], '0x324567fff']);
> "0x00000000000000000000000000000000000000000000000000000000000000400324567fff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000b2"
```

web3-restful

```json
curl -X POST -d '{"params": [["uint8[]","bytes32"],[["34","434"],"0x324567fff"]]}' -H "Content-Type:application/json" localhost:3000/eth/abi/encodeParameters

> {"result":"0x00000000000000000000000000000000000000000000000000000000000000400324567fff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000b2"}
```
