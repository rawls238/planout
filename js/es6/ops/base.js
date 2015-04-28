class PlanOutOp {

	constructor(args) {
		this.args = args;
	}

	execute(mapper) {
		throw "Implement this function";
	}

	dumpArgs() {
		console.log(this.args);
	}

	getArgMixed(name) {
		if (!this.args[name]) {
			throw ("Missing argument" + name);
			return
		}
		return this.args[name];
	}

	getArgNumber(name) {
		var cur = this.getArgMixed(name);
		if (typeof(cur) !== "number") {
			throw (name + " is not a number.")
		}
		return cur;
	}

	getArgString(name) {
		var cur = this.getArgMixed(name);
		if (typeof(cur) !== "string") {
			throw (name + " is not a string.")
		}
		return cur;
	}

	getArgList(name) {
		var cur = this.getArgMixed(name);
		if (Object.prototype.toString.call( cur ) !== '[object Array]') {
			throw (name + " is not a list");
		}
		return cur;
	}

	getArgObject(name) {
		var cur = this.getArgMixed(name);
		if (Object.prototype.toString.call( cur ) !== '[object Object]') {
			throw (name + " is not an object.")
		}
		return cur;
	}

	getArgIndexish(name) {
		var cur = this.getArgMixed(name);
		var type = Object.prototype.toString.call( cur );
		if (type !== '[object Object]' && type !== '[object Array]') {
			throw (name + " is not an list or object.")
		}
		return cur;
	}
};

class PlanOutOpSimple extends PlanOutOp {

	execute(mapper) {
		this.mapper = mapper;
		var param_names = Object.keys(this.args);
		for (let param of param_names) {
			this.args[param] = mapper.evaluate(this.args[param]);
		}
		return this.simpleExecute();
	}
}

class PlanOutOpUnary extends PlanOutOpSimple {
	simpleExecute() {
		return this.unaryExecute(this.getArgMixed('value'));
	}
	getUnaryString() {
		return this.args.op;
	}
	unaryExecute(value) {
		console.log("TODO");
	}
}

class PlanOutOpBinary extends PlanOutOpSimple {
	simpleExecute() { 
		return this.binaryExecute(this.getArgMixed('left'), this.getArgMixed('right'));
	}

	getInfixString() {
		return this.args.op;
	}

	binaryExecute(left, right) {
		console.log("TODO");
	}
}

class PlanOutOpCommutative extends PlanOutOpSimple {
	simpleExecute() {
		return this.commutativeExecute(this.getArgList('values'));
	}

	getCommutativeString() {
		return this.args.op;
	}

	commutativeExecute(values) {
		console.log("IMPLEMENT");
	}
}

export { PlanOutOp, PlanOutOpSimple, PlanOutOpCommutative, PlanOutOpBinary, PlanOutOpUnary }