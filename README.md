# Restful  API wrapper for Ethereum web3.js

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
Result = web3.x.y.z(Arguments)
```

- web3-restful

```
POST /x/y/z
```

  Body

```
{ "params": [ Arguments ] }
```

  Response

```
{ "result": Result }
```

## Examples

Refer to [web3.js API doc](https://web3js.readthedocs.io/en/v1.2.6/)

### encodeFunctionSignature

web3.js

```javascript
web3.eth.abi.encodeFunctionSignature('myMethod(uint256,string)')
> '0x24ee0097'
```

web3-restful

```json
curl -X POST -d '{"params": ["myEvent(uint256,bytes32)"]}' -H "Content-Type:application/json" localhost:3000/eth/abi/encodeFunctionSignature

> {"result":"0xf2eeb729"}
```

### encodeParameter

```javascript
web3.eth.abi.encodeParameter('uint256', '2345675643');
> "0x000000000000000000000000000000000000000000000000000000008bd02b7b"
```

```json
curl -X POST -d '{"params": ["uint256", "2345675643"]}' -H "Content-Type:application/json" localhost:3000/eth/abi/encodeParameter

> {"result":"0x000000000000000000000000000000000000000000000000000000008bd02b7b"}
```

### encodeParameters

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

### encodeFunctionCall

web3.js

```javascript
web3.eth.abi.encodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}, ['2345675643', 'Hello!%']);

> "0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"

```

web3-restful

```json
curl -X POST -d '{
	"params": [{
			"name": "myMethod",
			"type": "function",
			"inputs": [{
				"type": "uint256",
				"name": "myNumber"
			}, {
				"type": "string",
				"name": "myString"
			}]
		},
		["2345675643", "Hello!%"]
	]
}' -H "Content-Type:application/json" localhost:3000/eth/abi/encodeFunctionCall

> {"result":"0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"}
```

### decodeParameter

web3.js

​```javascript
web3.eth.abi.decodeParameter('uint256', '0x0000000000000000000000000000000000000000000000000000000000000010');
> "16"
```

web3-restful

```json
curl -X POST -d '{"params": ["uint256", "0x0000000000000000000000000000000000000000000000000000000000000010"]}' -H "Content-Type:application/json" localhost:3000/eth/abi/decodeParameter

> {"result":"16"}
```

### decodeParameters

web3.js

```javascript
web3.eth.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000');
> Result { '0': 'Hello!%!', '1': '234', '__length__': 2 }
```

web3-restful

```json
curl -X POST -d '{"params": [["string", "uint256"],"0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000"]}' -H "Content-Type:application/json" localhost:3000/eth/abi/decodeParameters

> {"result":{"0":"Hello!%!","1":"234","__length__":2}}
```


### decodeLog

web3.js

```javascript
web3.eth.abi.decodeLog([{
    type: 'string',
    name: 'myString'
},{
    type: 'uint256',
    name: 'myNumber',
    indexed: true
},{
    type: 'uint8',
    name: 'mySmallNumber',
    indexed: true
}],
'0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
['0x000000000000000000000000000000000000000000000000000000000000f310', '0x0000000000000000000000000000000000000000000000000000000000000010']);
> Result {
    '0': 'Hello%!',
    '1': '62224',
    '2': '16',
    myString: 'Hello%!',
    myNumber: '62224',
    mySmallNumber: '16'
}
```

web3-restful

```json
curl -X POST -d '{
	"params": [
		[{
			"type": "string",
			"name": "myString"
		}, {
			"type": "uint256",
			"name": "myNumber",
			"indexed": true
		}, {
			"type": "uint8",
			"name": "mySmallNumber",
			"indexed": true
		}],
"0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000", ["0x000000000000000000000000000000000000000000000000000000000000f310", "0x0000000000000000000000000000000000000000000000000000000000000010"]
	]
}' -H "Content-Type:application/json" localhost:3000/eth/abi/decodeLog

>
{"result":{"0":"Hello%!","1":"62224","2":"16","__length__":3,"myString":"Hello%!","myNumber":"62224","mySmallNumber":"16"}}
```
