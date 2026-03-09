function Br(n) {
  "@babel/helpers - typeof";
  return Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Br(n);
}
function Dc(n, e) {
  if (Br(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (Br(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function _c(n) {
  var e = Dc(n, "string");
  return Br(e) == "symbol" ? e : e + "";
}
function re(n, e, t) {
  return (e = _c(e)) in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
const tn = {
  Literal: 1,
  Collection: 3,
  Graph: 4,
  NamedNode: 5,
  BlankNode: 6,
  Variable: 7
};
let Xe = class {
  constructor(e) {
    re(this, "termType", void 0), re(this, "classOrder", void 0), re(this, "value", void 0), this.value = e;
  }
  /**
   * Creates the substituted node for this one, according to the specified bindings
   * @param bindings - Bindings of identifiers to nodes
   */
  substitute(e) {
    return this;
  }
  /**
   * Compares this node with another
   * @see {equals} to check if two nodes are equal
   * @param other - The other node
   */
  compareTerm(e) {
    return this.classOrder < e.classOrder ? -1 : this.classOrder > e.classOrder ? 1 : this.value < e.value ? -1 : this.value > e.value ? 1 : 0;
  }
  /**
   * Compares whether the two nodes are equal
   * @param other The other node
   */
  equals(e) {
    return e ? this.termType === e.termType && this.value === e.value : !1;
  }
  /**
   * Creates a hash for this node
   * @deprecated use {rdfFactory.id} instead if possible
   */
  hashString() {
    return this.toCanonical();
  }
  /**
   * Compares whether this node is the same as the other one
   * @param other - Another node
   */
  sameTerm(e) {
    return this.equals(e);
  }
  /**
   * Creates a canonical string representation of this node
   */
  toCanonical() {
    return this.toNT();
  }
  /**
   * Creates a n-triples string representation of this node
   */
  toNT() {
    return this.toString();
  }
  /**
   * Creates a n-quads string representation of this node
   */
  toNQ() {
    return this.toNT();
  }
  /**
   * Creates a string representation of this node
   */
  toString() {
    throw new Error("Node.toString() is abstract - see the subclasses instead");
  }
};
re(Xe, "fromValue", void 0);
re(Xe, "toJS", void 0);
const Xn = "NamedNode", zn = "BlankNode", fr = "Literal", xn = "Variable", Gn = "DefaultGraph", Tn = "Collection", Dl = "Empty", Pr = "Graph", Ts = "text/html", ui = "application/ld+json", _l = "text/n3", Sc = "application/n3", ci = "application/nquads", di = "application/n-quads", Fc = "application/n-triples", Rr = "application/rdf+xml", Ic = "application/sparql-update", Lc = "application/sparql-update-single-match", Hn = "text/turtle", Bc = "application/x-turtle", hi = "application/xhtml+xml";
let nn = class tr extends Xe {
  static getId(e) {
    if (e) {
      if (typeof e != "string")
        throw new Error("Bad id argument to new blank node: " + e);
      if (e.includes("#")) {
        let t = e.split("#");
        return t[t.length - 1];
      }
      return e;
    }
    return "n" + tr.nextId++;
  }
  /**
   * Initializes this node
   * @param [id] The identifier for the blank node
   */
  constructor(e) {
    super(tr.getId(e)), re(this, "termType", zn), re(this, "classOrder", tn.BlankNode), re(this, "isBlank", 1), re(this, "isVar", 1);
  }
  /**
   * The identifier for the blank node
   */
  get id() {
    return this.value;
  }
  set id(e) {
    this.value = e;
  }
  compareTerm(e) {
    return this.classOrder < e.classOrder ? -1 : this.classOrder > e.classOrder ? 1 : this.id < e.id ? -1 : this.id > e.id ? 1 : 0;
  }
  /**
   * Gets a copy of this blank node in the specified formula
   * @param formula The formula
   */
  copy(e) {
    var t = new tr();
    return e.copyTo(this, t), t;
  }
  toCanonical() {
    return tr.NTAnonymousNodePrefix + this.value;
  }
  toString() {
    return tr.NTAnonymousNodePrefix + this.id;
  }
};
re(nn, "nextId", 0);
re(nn, "NTAnonymousNodePrefix", "_:");
function Un(n) {
  return typeof n == "string" ? n : n.value;
}
function Rc(n) {
  return typeof n == "object" && n !== null && "subject" in n;
}
function Na(n) {
  return typeof n == "object" && n !== null && "statements" in n;
}
function Ti(n) {
  return an(n) && n.termType === Tn;
}
function kc(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "termType") && (n.termType === Xn || n.termType === xn || n.termType === zn || n.termType === Tn || n.termType === fr || n.termType === Pr);
}
function Oc(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "termType") && (n.termType === Xn || n.termType === xn || n.termType === zn || n.termType === Tn || n.termType === fr || n.termType === Pr);
}
function Uc(n) {
  return an(n) && (n.termType === Xn || n.termType === zn || n.termType === xn);
}
function Mc(n) {
  return an(n) && n.termType === xn;
}
function an(n) {
  return typeof n == "object" && n !== null && "termType" in n;
}
function Sl(n) {
  return n.termType === fr;
}
function nr(n) {
  return typeof n == "object" && n !== null && "subject" in n && "predicate" in n && "object" in n;
}
function Ds(n) {
  return an(n) && n.termType === "NamedNode";
}
function Pc(n) {
  return an(n) && "termType" in n && n.termType === "BlankNode";
}
function $c(n) {
  return an(n) && (n.termType === Xn || n.termType === xn || n.termType === zn || n.termType === Gn);
}
let pt = class rr extends Xe {
  /**
   * Create a named (IRI) RDF Node
   * @constructor
   * @param iri - The IRI for this node
   */
  constructor(e) {
    if (super(Un(e)), re(this, "termType", Xn), re(this, "classOrder", tn.NamedNode), !this.value)
      throw new Error("Missing IRI for NamedNode");
    if (!this.value.includes(":"))
      throw new Error('NamedNode IRI "' + e + '" must be absolute.');
    if (this.value.includes(" ")) {
      var t = 'Error: NamedNode IRI "' + e + '" must not contain unencoded spaces.';
      throw new Error(t);
    }
  }
  /**
   * Returns an $rdf node for the containing directory, ending in slash.
   */
  dir() {
    var e = this.value.split("#")[0], t = e.slice(0, -1).lastIndexOf("/"), r = e.indexOf("//");
    return r >= 0 && t < r + 2 || t < 0 ? null : new rr(e.slice(0, t + 1));
  }
  /**
   * Returns an NN for the whole web site, ending in slash.
   * Contrast with the "origin" which does NOT have a trailing slash
   */
  site() {
    var e = this.value.split("#")[0], t = e.indexOf("//");
    if (t < 0) throw new Error("This URI does not have a web site part (origin)");
    var r = e.indexOf("/", t + 2);
    return r < 0 ? new rr(e.slice(0) + "/") : new rr(e.slice(0, r + 1));
  }
  /**
   * Creates the fetchable named node for the document.
   * Removes everything from the # anchor tag.
   */
  doc() {
    return this.value.indexOf("#") < 0 ? this : new rr(this.value.split("#")[0]);
  }
  /**
   * Returns the URI including <brackets>
   */
  toString() {
    return "<" + this.value + ">";
  }
  /** The local identifier with the document */
  id() {
    return this.value.split("#")[1];
  }
  /** Alias for value, favored by Tim */
  get uri() {
    return this.value;
  }
  set uri(e) {
    this.value = e;
  }
  /**
   * Creates a named node from the specified input value
   * @param value - An input value
   */
  static fromValue(e) {
    return typeof e > "u" || e === null || an(e) ? e : new rr(e);
  }
};
const dn = {
  boolean: new pt("http://www.w3.org/2001/XMLSchema#boolean"),
  dateTime: new pt("http://www.w3.org/2001/XMLSchema#dateTime"),
  decimal: new pt("http://www.w3.org/2001/XMLSchema#decimal"),
  double: new pt("http://www.w3.org/2001/XMLSchema#double"),
  integer: new pt("http://www.w3.org/2001/XMLSchema#integer"),
  langString: new pt("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),
  string: new pt("http://www.w3.org/2001/XMLSchema#string")
};
let en = class Qt extends Xe {
  /**
   * Initializes a literal
   * @param value - The literal's lexical value
   * @param language - The language for the literal. Defaults to ''.
   * @param datatype - The literal's datatype as a named node. Defaults to xsd:string.
   */
  constructor(e, t, r) {
    super(e), re(this, "termType", fr), re(this, "classOrder", tn.Literal), re(this, "datatype", dn.string), re(this, "isVar", 0), re(this, "language", ""), t ? (this.language = t, this.datatype = dn.langString) : r ? this.datatype = pt.fromValue(r) : this.datatype = dn.string;
  }
  /**
   * Gets a copy of this literal
   */
  copy() {
    return new Qt(this.value, this.lang, this.datatype);
  }
  /**
   * Gets whether two literals are the same
   * @param other The other statement
   */
  equals(e) {
    return e ? this.termType === e.termType && this.value === e.value && this.language === e.language && (!this.datatype && !e.datatype || this.datatype && this.datatype.equals(e.datatype)) : !1;
  }
  /**
   * The language for the literal
   * @deprecated use {language} instead
   */
  get lang() {
    return this.language;
  }
  set lang(e) {
    this.language = e || "";
  }
  toNT() {
    return Qt.toNT(this);
  }
  /** Serializes a literal to an N-Triples string */
  static toNT(e) {
    if (typeof e.value == "number")
      return "" + e.value;
    if (typeof e.value != "string")
      throw new Error("Value of RDF literal is not string or number: " + e.value);
    var t = e.value;
    return t = t.replace(/\\/g, "\\\\"), t = t.replace(/\"/g, '\\"'), t = t.replace(/\n/g, "\\n"), t = t.replace(/\r/g, "\\r"), t = '"' + t + '"', e.language ? t += "@" + e.language : e.datatype.equals(dn.string) || (t += "^^" + e.datatype.toCanonical()), t;
  }
  toString() {
    return "" + this.value;
  }
  /**
   * Builds a literal node from a boolean value
   * @param value - The value
   */
  static fromBoolean(e) {
    let t = e ? "1" : "0";
    return new Qt(t, null, dn.boolean);
  }
  /**
   * Builds a literal node from a date value
   * @param value The value
   */
  static fromDate(e) {
    if (!(e instanceof Date))
      throw new TypeError("Invalid argument to Literal.fromDate()");
    let t = function(i) {
      return ("" + (100 + i)).slice(1, 3);
    }, r = "" + e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + "Z";
    return new Qt(r, null, dn.dateTime);
  }
  /**
   * Builds a literal node from a number value
   * @param value - The value
   */
  static fromNumber(e) {
    if (typeof e != "number")
      throw new TypeError("Invalid argument to Literal.fromNumber()");
    let t;
    const r = e.toString();
    return r.indexOf("e") < 0 && Math.abs(e) <= Number.MAX_SAFE_INTEGER ? t = Number.isInteger(e) ? dn.integer : dn.decimal : t = dn.double, new Qt(r, null, t);
  }
  /**
   * Builds a literal node from an input value
   * @param value - The input value
   */
  static fromValue(e) {
    if (Sl(e))
      return e;
    switch (typeof e) {
      case "object":
        if (e instanceof Date)
          return Qt.fromDate(e);
      case "boolean":
        return Qt.fromBoolean(e);
      case "number":
        return Qt.fromNumber(e);
      case "string":
        return new Qt(e);
    }
    throw new Error("Can't make literal from " + e + " of type " + typeof e);
  }
};
function Fl(n) {
  return typeof n > "u" || n === null || an(n) ? n : Array.isArray(n) ? new Ht(n) : en.fromValue(n);
}
class Ht extends Xe {
  constructor(e) {
    super((nn.nextId++).toString()), re(this, "termType", Tn), re(this, "classOrder", tn.Collection), re(this, "closed", !1), re(this, "compareTerm", nn.prototype.compareTerm), re(this, "elements", []), re(this, "isVar", 0), e && e.length > 0 && e.forEach((t) => {
      this.elements.push(Fl(t));
    });
  }
  get id() {
    return this.value;
  }
  set id(e) {
    this.value = e;
  }
  /**
   * Appends an element to this collection
   * @param element - The new element
   */
  append(e) {
    return this.elements.push(e);
  }
  /**
   * Closes this collection
   */
  close() {
    return this.closed = !0, this.closed;
  }
  /**
   * Removes the first element from the collection (and return it)
   */
  shift() {
    return this.elements.shift();
  }
  /**
   * Creates a new Collection with the substituting bindings applied
   * @param bindings - The bindings to substitute
   */
  substitute(e) {
    const t = this.elements.map((r) => r.substitute(e));
    return new Ht(t);
  }
  toNT() {
    return Ht.toNT(this);
  }
  static toNT(e) {
    return nn.NTAnonymousNodePrefix + e.id;
  }
  /**
   * Serializes the collection to a string.
   * Surrounded by (parentheses) and separated by spaces.
   */
  toString() {
    return "(" + this.elements.join(" ") + ")";
  }
  /**
   * Prepends the specified element to the collection's front
   * @param element - The element to prepend
   */
  unshift(e) {
    return this.elements.unshift(e);
  }
}
re(Ht, "termType", Tn);
const kr = "chrome:theSession";
new pt(kr);
let Di = class extends Xe {
  constructor() {
    super(""), re(this, "value", ""), re(this, "termType", Gn), re(this, "uri", kr);
  }
  toCanonical() {
    return this.value;
  }
  toString() {
    return "DefaultGraph";
  }
};
function _s(n) {
  return !!n && n.termType === Gn;
}
const qc = new Di();
class qt {
  /**
   * Construct a new statement
   *
   * @param subject - The subject of the triple.  What the fact is about
   * @param predicate - The relationship which is asserted between the subject and object
   * @param object - The thing or data value which is asserted to be related to the subject
   * @param {NamedNode} graph - The document where the triple is or was or will be stored on the web.
   *
   * The graph param is a named node of the document in which the triple when it is stored
   *  on the web. It exists because when you have read data from various places in the web,
   *  the “graph” tells you _why_ you have the triple. (At the moment, it is just the
   *  document, in future it could be an inference step)
   *
   * When you do UpdateManager.update() then the graph’s of all the statements must be the same,
   *  and give the document you are patching. In future, we may have a more
   *  powerful update() which can update more than one document.
   */
  constructor(e, t, r, i) {
    re(this, "subject", void 0), re(this, "predicate", void 0), re(this, "object", void 0), re(this, "graph", void 0), this.subject = Xe.fromValue(e), this.predicate = Xe.fromValue(t), this.object = Xe.fromValue(r), this.graph = i == null ? qc : Xe.fromValue(i);
  }
  /** Alias for graph, favored by Tim */
  get why() {
    return this.graph;
  }
  set why(e) {
    this.graph = e;
  }
  /**
   * Checks whether two statements are the same
   * @param other - The other statement
   */
  equals(e) {
    return e.subject.equals(this.subject) && e.predicate.equals(this.predicate) && e.object.equals(this.object) && e.graph.equals(this.graph);
  }
  /**
   * Creates a statement with the bindings substituted
   * @param bindings The bindings
   */
  substitute(e) {
    return new qt(this.subject.substitute(e), this.predicate.substitute(e), this.object.substitute(e), _s(this.graph) ? this.graph : this.graph.substitute(e));
  }
  /** Creates a canonical string representation of this statement. */
  toCanonical() {
    let e = [this.subject.toCanonical(), this.predicate.toCanonical(), this.object.toCanonical()];
    return this.graph && this.graph.termType !== Gn && e.push(this.graph.toCanonical()), e.join(" ") + " .";
  }
  /** Creates a n-triples string representation of this statement */
  toNT() {
    return [this.subject.toNT(), this.predicate.toNT(), this.object.toNT()].join(" ") + " .";
  }
  /** Creates a n-quads string representation of this statement */
  toNQ() {
    return [this.subject.toNT(), this.predicate.toNT(), this.object.toNT(), _s(this.graph) ? "" : this.graph.toNT()].join(" ") + " .";
  }
  /** Creates a string representation of this statement */
  toString() {
    return this.toNT();
  }
}
var Il = Il || console.log;
function $n(n) {
  var e;
  return e = n.indexOf("#"), e < 0 ? n : n.slice(0, e);
}
function Hc(n) {
  var e = /[^\/]*\/\/([^\/]*)\//.exec(n);
  return e ? e[1] : "";
}
function Dt(n, e) {
  var t, r, i, s, a, l, u = e.indexOf("#");
  if (u > 0 && (e = e.slice(0, u)), n.length === 0)
    return e;
  if (n.indexOf("#") === 0)
    return e + n;
  if (s = n.indexOf(":"), s >= 0 || (t = e.indexOf(":"), e.length === 0))
    return n;
  if (t < 0)
    return Il("Invalid base: " + e + " in join with given: " + n), n;
  if (r = e.slice(0, +t + 1 || 9e9), n.indexOf("//") === 0)
    return r + n;
  if (e.indexOf("//", t) === t + 1) {
    if (i = e.indexOf("/", t + 3), i < 0)
      return e.length - t - 3 > 0 ? e + "/" + n : r + n;
  } else if (i = e.indexOf("/", t + 1), i < 0)
    return e.length - t - 1 > 0 ? e + "/" + n : r + n;
  if (n.indexOf("/") === 0)
    return e.slice(0, i) + n;
  if (l = e.slice(i), a = l.lastIndexOf("/"), a < 0)
    return r + n;
  for (a >= 0 && a < l.length - 1 && (l = l.slice(0, +a + 1 || 9e9)), l += n; l.match(/[^\/]*\/\.\.\//); )
    l = l.replace(/[^\/]*\/\.\.\//, "");
  return l = l.replace(/\.\//g, ""), l = l.replace(/\/\.$/, "/"), e.slice(0, i) + l;
}
function Ss(n) {
  const e = n.indexOf(":");
  return e < 0 ? null : n.slice(0, e);
}
function Wa(n, e) {
  var t, r, i, s, a, l, u, c, h, f, m, v, w, b = new RegExp("^[-_a-zA-Z0-9.]+:(//[^/]*)?/[^/]*$");
  if (!n)
    return e;
  if (n === e)
    return "";
  for (r = c = 0, a = e.length; c < a && e[r] === n[r]; r = ++c)
    ;
  if (n.slice(0, r).match(b) && (i = e.indexOf("//"), i < 0 && (i = -2), s = e.indexOf("/", i + 2), e[s + 1] !== "/" && n[s + 1] !== "/" && e.slice(0, s) === n.slice(0, s)))
    return e.slice(s);
  if (e[r] === "#" && n.length === r)
    return e.slice(r);
  for (; r > 0 && e[r - 1] !== "/"; )
    r--;
  if (r < 3 || n.indexOf("//", r - 2) > 0 || e.indexOf("//", r - 2) > 0 || n.indexOf(":", r) > 0)
    return e;
  for (u = 0, m = n.slice(r), h = 0, l = m.length; h < l; h++)
    t = m[h], t === "/" && u++;
  if (u === 0 && r < e.length && e[r] === "#")
    return "./" + e.slice(r);
  if (u === 0 && r === e.length)
    return "./";
  if (w = "", u > 0)
    for (f = 1, v = u; v >= 1 ? f <= v : f >= v; v >= 1 ? ++f : --f)
      w += "../";
  return w + e.slice(r);
}
let jn = class Ll extends Xe {
  /**
   * Initializes this variable
   * @param name The variable's name
   */
  constructor(e = "") {
    super(e), re(this, "termType", xn), re(this, "base", "varid:"), re(this, "classOrder", tn.Variable), re(this, "isVar", 1), re(this, "uri", void 0), this.base = "varid:", this.uri = Dt(e, this.base);
  }
  equals(e) {
    return e ? this.termType === e.termType && this.value === e.value : !1;
  }
  hashString() {
    return this.toString();
  }
  substitute(e) {
    var t;
    return (t = e[this.toNT()]) != null ? t : this;
  }
  toString() {
    return Ll.toString(this);
  }
  static toString(e) {
    return e.uri.slice(0, e.base.length) === e.base ? `?${e.uri.slice(e.base.length)}` : `?${e.uri}`;
  }
}, xt = /* @__PURE__ */ (function(n) {
  return n.collections = "COLLECTIONS", n.defaultGraphType = "DEFAULT_GRAPH_TYPE", n.equalsMethod = "EQUALS_METHOD", n.id = "ID", n.identity = "IDENTITY", n.reversibleId = "REVERSIBLE_ID", n.variableType = "VARIABLE_TYPE", n;
})({});
const Fs = new Di(), Pt = {
  supports: {
    [xt.collections]: !1,
    [xt.defaultGraphType]: !1,
    [xt.equalsMethod]: !0,
    [xt.identity]: !1,
    [xt.id]: !0,
    [xt.reversibleId]: !1,
    [xt.variableType]: !0
  },
  /**
   * Creates a new blank node
   * @param value - The blank node's identifier
   */
  blankNode(n) {
    return new nn(n);
  },
  defaultGraph: () => Fs,
  /**
   * Compares to (rdf) objects for equality.
   */
  equals(n, e) {
    return n === e || !n || !e ? !0 : nr(n) || nr(e) ? nr(n) && nr(e) ? this.equals(n.subject, e.subject) && this.equals(n.predicate, e.predicate) && this.equals(n.object, e.object) && this.equals(n.graph, e.graph) : !1 : an(n) && an(e) ? this.id(n) === this.id(e) : !1;
  },
  /**
   * Generates a uniquely identifiably *idempotent* string for the given {term}.
   *
   * Equivalent to [[Term.hashString]]
   *
   * @example Use this to associate data with a term in an object
   *   { obj[id(term)] = "myData" }
   */
  id(n) {
    if (!n)
      return "undefined";
    if (nr(n))
      return this.quadToNQ(n);
    switch (n.termType) {
      case Gn:
        return "defaultGraph";
      case xn:
        return jn.toString(n);
      default:
        const e = this.termToNQ(n);
        if (e)
          return e;
        throw new Error(`Can't id term with type '${n.termType}'`);
    }
  },
  isQuad(n) {
    return n instanceof qt;
  },
  /**
   * Creates a new literal node. Does some JS literal parsing for ease of use.
   * @param value - The lexical value
   * @param languageOrDatatype - Either the language or the datatype
   */
  literal(n, e) {
    if (typeof n != "string" && !e)
      return en.fromValue(n);
    const t = typeof n == "string" ? n : "" + n;
    return typeof e == "string" ? e.indexOf(":") === -1 ? new en(t, e) : new en(t, null, this.namedNode(e)) : new en(t, null, e);
  },
  /**
   * Creates a new named node
   * @param value - The new named node
   */
  namedNode(n) {
    return new pt(n);
  },
  /**
   * Creates a new statement
   * @param subject - The subject
   * @param predicate - The predicate
   * @param object - The object
   * @param graph - The containing graph
   */
  quad(n, e, t, r) {
    return new qt(n, e, t, r || Fs);
  },
  /**
   * Creates a new statement
   * @param subject - The subject
   * @param predicate - The predicate
   * @param object - The object
   * @param graph - The containing graph
   */
  triple(n, e, t, r) {
    return this.quad(n, e, t, r);
  },
  quadToNQ(n) {
    return `${this.termToNQ(n.subject)} ${this.termToNQ(n.predicate)} ${this.termToNQ(n.object)} ${this.termToNQ(n.graph)} .`;
  },
  /** Stringify a {term} to n-quads serialization. */
  termToNQ(n) {
    switch (n.termType) {
      case zn:
        return "_:" + n.value;
      case Gn:
        return "";
      case Dl:
        return "<http://www.w3.org/1999/02/22-rdf-syntax-ns#nil>";
      case fr:
        return en.toNT(n);
      case Pr:
      case Xn:
        return "<" + n.value + ">";
      case Tn:
        return "(" + n.elements.map((e) => this.termToNQ(e)).join(" ") + ")";
      default:
        throw new Error(`Can't serialize nonstandard term type (was '${n.termType}')`);
    }
  },
  /** Convert an rdf object (term or quad) to n-quads serialization. */
  toNQ(n) {
    return this.isQuad(n) ? this.quadToNQ(n) : this.termToNQ(n);
  },
  /**
   * Creates a new variable
   * @param name - The name for the variable
   */
  variable(n) {
    return new jn(n);
  }
}, Xt = {
  debug(n) {
  },
  warn(n) {
  },
  info(n) {
  },
  error(n) {
  },
  success(n) {
  },
  msg(n) {
  }
};
function Ne(n, e) {
  const t = e || {
    namedNode: (r) => new pt(r)
  };
  return function(r) {
    return t.namedNode(n + (r || ""));
  };
}
var ra = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Bl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ga = { exports: {} }, Wc = ga.exports, Is;
function Vc() {
  return Is || (Is = 1, (function(n) {
    (function(e, t) {
      n.exports ? n.exports = t() : e.ttl2jsonld = t();
    })(Wc, function() {
      function e(i, s) {
        function a() {
          this.constructor = i;
        }
        a.prototype = s.prototype, i.prototype = new a();
      }
      function t(i, s, a, l) {
        this.message = i, this.expected = s, this.found = a, this.location = l, this.name = "SyntaxError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, t);
      }
      e(t, Error), t.buildMessage = function(i, s) {
        var a = {
          literal: function(v) {
            return '"' + u(v.text) + '"';
          },
          class: function(v) {
            var w = "", b;
            for (b = 0; b < v.parts.length; b++)
              w += v.parts[b] instanceof Array ? c(v.parts[b][0]) + "-" + c(v.parts[b][1]) : c(v.parts[b]);
            return "[" + (v.inverted ? "^" : "") + w + "]";
          },
          any: function(v) {
            return "any character";
          },
          end: function(v) {
            return "end of input";
          },
          other: function(v) {
            return v.description;
          }
        };
        function l(v) {
          return v.charCodeAt(0).toString(16).toUpperCase();
        }
        function u(v) {
          return v.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(w) {
            return "\\x0" + l(w);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(w) {
            return "\\x" + l(w);
          });
        }
        function c(v) {
          return v.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(w) {
            return "\\x0" + l(w);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(w) {
            return "\\x" + l(w);
          });
        }
        function h(v) {
          return a[v.type](v);
        }
        function f(v) {
          var w = new Array(v.length), b, x;
          for (b = 0; b < v.length; b++)
            w[b] = h(v[b]);
          if (w.sort(), w.length > 0) {
            for (b = 1, x = 1; b < w.length; b++)
              w[b - 1] !== w[b] && (w[x] = w[b], x++);
            w.length = x;
          }
          switch (w.length) {
            case 1:
              return w[0];
            case 2:
              return w[0] + " or " + w[1];
            default:
              return w.slice(0, -1).join(", ") + ", or " + w[w.length - 1];
          }
        }
        function m(v) {
          return v ? '"' + u(v) + '"' : "end of input";
        }
        return "Expected " + f(i) + " but " + m(s) + " found.";
      };
      function r(i, s) {
        s = s !== void 0 ? s : {};
        var a = {}, l = { turtleDoc: ms }, u = ms, c = function(o) {
          var y = Ue.toJSON();
          return y["@graph"] = [], o.filter((E) => Array.isArray(E)).forEach((E) => {
            E.forEach((D) => {
              y["@graph"].push(D);
            });
          }), y["@graph"].length === 1 && (Object.assign(y, y["@graph"][0]), delete y["@graph"]), y;
        }, h = "\uFEFF", f = xe("\uFEFF", !1), m = ".", v = xe(".", !1), w = function(o) {
          return o;
        }, b = "#", x = xe("#", !1), _ = /^[^\n]/, R = We([`
`], !0, !1), G = `
`, Y = xe(`
`, !1), A = function(o) {
          return o.join("");
        }, K = "@prefix", M = xe("@prefix", !1), j = function(o, y) {
          return Ue.addPrefix(o === "" ? "0" : o, y), {};
        }, k = "@base", H = xe("@base", !1), $ = function(o) {
          return Ue.addBase(o), {};
        }, q = /^[Bb]/, ee = We(["B", "b"], !1, !1), Q = /^[Aa]/, S = We(["A", "a"], !1, !1), V = /^[Ss]/, Z = We(["S", "s"], !1, !1), ae = /^[Ee]/, ie = We(["E", "e"], !1, !1), oe = /^[Pp]/, ne = We(["P", "p"], !1, !1), ge = /^[Rr]/, Be = We(["R", "r"], !1, !1), pe = /^[Ff]/, Ce = We(["F", "f"], !1, !1), Me = /^[Ii]/, Ye = We(["I", "i"], !1, !1), Te = /^[Xx]/, qe = We(["X", "x"], !1, !1), ht = function(o, y) {
          var E = {};
          return typeof o == "string" && o !== "[]" ? E["@id"] = o : typeof o == "object" && Object.assign(E, o), y && Object.assign(E, y), [E];
        }, it = function(o, y) {
          var E = {};
          return o && Object.assign(E, o), y && Object.assign(E, y), [E];
        }, De = ";", Re = xe(";", !1), _e = function(o, y, E, D) {
          var F = {};
          return F[E] = D, F;
        }, Ct = function(o, y, E) {
          return E;
        }, Ve = function(o, y, E) {
          var D = {};
          return E.unshift(Tc(o, y)), E.forEach((F) => {
            F && Object.keys(F).forEach((U) => {
              F[U].forEach((P) => {
                U === "@type" && P["@id"] !== void 0 && (P = P["@id"]), D[U] === void 0 ? D[U] = P : Array.isArray(D[U]) ? D[U].push(P) : D[U] = [D[U], P];
              });
            });
          }), D;
        }, se = ",", Fe = xe(",", !1), lt = function(o, y) {
          return y;
        }, St = function(o, y) {
          return y.unshift(o), y;
        }, Oe = "a", ke = xe("a", !1), It = function() {
          return "@type";
        }, ln = function(o) {
          return Ha(o, !0);
        }, bt = function(o) {
          return Ha(o, !1);
        }, _n = function(o) {
          return o === "[]" ? {} : { "@id": o };
        }, N = function(o) {
          return { "@id": o };
        }, p = "[", g = xe("[", !1), I = "]", W = xe("]", !1), z = "(", te = xe("(", !1), Ae = ")", Ke = xe(")", !1), Pe = function(o) {
          return { "@list": o };
        }, He = function(o, y) {
          return { "@value": o, "@language": y };
        }, Le = "^^", qr = xe("^^", !1), pr = function(o, y) {
          if (y === "http://www.w3.org/2001/XMLSchema#boolean" && o === "true") return !0;
          if (y === "http://www.w3.org/2001/XMLSchema#boolean" && o === "false") return !1;
          if (y === "http://www.w3.org/2001/XMLSchema#integer") return parseInt(o);
          if (y === "http://www.w3.org/2001/XMLSchema#double") return parseFloat(o);
          const E = Ue.resolve(y, !0);
          if (E) {
            const D = y.split(":")[0];
            if (E === "http://www.w3.org/2001/XMLSchema#boolean" && o === "true")
              return Ue.decrement(D), !0;
            if (E === "http://www.w3.org/2001/XMLSchema#boolean" && o === "false")
              return Ue.decrement(D), !1;
            if (E === "http://www.w3.org/2001/XMLSchema#integer")
              return Ue.decrement(D), parseInt(o);
            if (E === "http://www.w3.org/2001/XMLSchema#double")
              return Ue.decrement(D), parseFloat(o);
          }
          return { "@value": o, "@type": y };
        }, mr = "true", C = xe("true", !1), T = function() {
          return !0;
        }, O = "false", J = xe("false", !1), le = function() {
          return !1;
        }, Ee = function(o) {
          return o + ":";
        }, Ge = "<", mt = xe("<", !1), Nt = /^[^\0- <>"{}|\^`\\]/, Ot = We([["\0", " "], "<", ">", '"', "{", "}", "|", "^", "`", "\\"], !0, !1), Ut = ">", on = xe(">", !1), un = function(o) {
          const y = o.map((D) => 65536 <= D.codePointAt(0) && D.codePointAt(0) <= 983039 ? "a" : D.length === 1 ? D : D.length === 6 ? String.fromCharCode("0x" + D.substring(2)) : D.length === 10 ? String.fromCodePoint("0x" + D.substring(2)) : D).join("");
          if (y.match(/^[^\u0000-\u0020<>"{}|^`\\]*$/)) {
            var E = o.join("");
            try {
              return Ue.resolve(E);
            } catch {
              Ra("Invalid IRIREF " + E);
            }
          } else Ra("Invalid IRIREF " + o.join("") + " / " + y);
        }, ft = ":", nt = xe(":", !1), cn = function(o) {
          return o = o || "0", Ue.hasPrefix(o) === !1 && Ra("undefined prefix " + o), o;
        }, Sn = function(o) {
          return o || "";
        }, ot = function(o, y) {
          return Ue.increment(o), Ue.resolve(o + ":" + y);
        }, gr = "_:", wn = xe("_:", !1), Qe = /^[0-9]/, st = We([["0", "9"]], !1, !1), jo = "@", Xo = xe("@", !1), qi = /^[a-zA-Z]/, Hi = We([["a", "z"], ["A", "Z"]], !1, !1), Ia = "-", La = xe("-", !1), Hr = /^[a-zA-Z0-9]/, Wr = We([["a", "z"], ["A", "Z"], ["0", "9"]], !1, !1), Wi = function(o, y) {
          return "-" + y.join("");
        }, zo = function(o, y) {
          return o.join("") + y.join("");
        }, Vr = /^[+\-]/, Kr = We(["+", "-"], !1, !1), Jo = function(o) {
          return o.match(/^[0+][0-9]+$/) ? {
            "@value": o,
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          } : parseInt(o);
        }, Yo = function(o) {
          return {
            "@value": o,
            "@type": "http://www.w3.org/2001/XMLSchema#decimal"
          };
        }, Qo = function(o) {
          return {
            "@value": o,
            "@type": "http://www.w3.org/2001/XMLSchema#double"
          };
        }, Zo = /^[eE]/, eu = We(["e", "E"], !1, !1), Gr = '"', jr = xe('"', !1), Vi = /^[^"\\\n\r]/, Ki = We(['"', "\\", `
`, "\r"], !0, !1), Xr = "'", zr = xe("'", !1), Gi = /^[^'\\\n\r]/, ji = We(["'", "\\", `
`, "\r"], !0, !1), Jr = "'''", Xi = xe("'''", !1), Wt = /^[^'\\]/, Vt = We(["'", "\\"], !0, !1), Yr = "''", zi = xe("''", !1), Ji = function(o, y) {
          return "''" + y.join("");
        }, Yi = function(o, y) {
          return "'" + y.join("");
        }, Qi = function(o, y) {
          return o.join("") + y.join("");
        }, Qr = '"""', Zi = xe('"""', !1), Kt = /^[^"\\]/, Gt = We(['"', "\\"], !0, !1), Zr = '""', es = xe('""', !1), ts = function(o, y) {
          return '""' + y.join("");
        }, ns = function(o, y) {
          return '"' + y.join("");
        }, rs = "\\U", tu = xe("\\U", !1), nu = function(o) {
          return String.fromCodePoint(parseInt(o.join(""), 16));
        }, as = "\\u", ru = xe("\\u", !1), au = function(o) {
          return String.fromCharCode(parseInt(o.join(""), 16));
        }, is = "\\t", iu = xe("\\t", !1), su = function() {
          return "	";
        }, ss = "\\b", lu = xe("\\b", !1), ou = function() {
          return "\b";
        }, ls = "\\n", uu = xe("\\n", !1), cu = function() {
          return `
`;
        }, os = "\\r", du = xe("\\r", !1), hu = function() {
          return "\r";
        }, us = "\\f", fu = xe("\\f", !1), pu = function() {
          return "\f";
        }, cs = '\\"', mu = xe('\\"', !1), gu = function() {
          return '"';
        }, ds = "\\'", yu = xe("\\'", !1), vu = function() {
          return "'";
        }, hs = "\\\\", wu = xe("\\\\", !1), Eu = function() {
          return "\\";
        }, Cu = /^[ \t\r\n]/, bu = We([" ", "	", "\r", `
`], !1, !1), Nu = function() {
          return "[]";
        }, Au = /^[\uD800-\uDBFF]/, xu = We([["\uD800", "\uDBFF"]], !1, !1), Tu = /^[\uDC00-\uDFFF]/, Du = We([["\uDC00", "\uDFFF"]], !1, !1), _u = function(o, y) {
          return o + y;
        }, Su = /^[A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, Fu = We([["A", "Z"], ["a", "z"], ["À", "Ö"], ["Ø", "ö"], ["ø", "˿"], ["Ͱ", "ͽ"], ["Ϳ", "῿"], ["‌", "‍"], ["⁰", "↏"], ["Ⰰ", "⿯"], ["、", "퟿"], ["豈", "﷏"], ["ﷰ", "�"]], !1, !1), Iu = "_", Lu = xe("_", !1), Bu = "·", Ru = xe("·", !1), ku = /^[\u0300-\u036F]/, Ou = We([["̀", "ͯ"]], !1, !1), Uu = /^[\u203F-\u2040]/, Mu = We([["‿", "⁀"]], !1, !1), fs = function(o, y, E, D) {
          return E.join("") + D.join("");
        }, Pu = function(o, y, E) {
          return o + y.join("") + E.join("");
        }, $u = "%", qu = xe("%", !1), Hu = /^[0-9A-Fa-f]/, Wu = We([["0", "9"], ["A", "F"], ["a", "f"]], !1, !1), Vu = "\\", Ku = xe("\\", !1), Gu = /^[_~.!$&'()*+,;=\/?#@%\-]/, ju = We(["_", "~", ".", "!", "$", "&", "'", "(", ")", "*", "+", ",", ";", "=", "/", "?", "#", "@", "%", "-"], !1, !1), d = 0, ue = 0, ea = [{ line: 1, column: 1 }], jt = 0, Ba = [], ta;
        if ("startRule" in s) {
          if (!(s.startRule in l))
            throw new Error(`Can't start parsing from rule "` + s.startRule + '".');
          u = l[s.startRule];
        }
        function Ra(o, y) {
          throw y = y !== void 0 ? y : ka(ue, d), zu(o, y);
        }
        function xe(o, y) {
          return { type: "literal", text: o, ignoreCase: y };
        }
        function We(o, y, E) {
          return { type: "class", parts: o, inverted: y, ignoreCase: E };
        }
        function Xu() {
          return { type: "end" };
        }
        function ps(o) {
          var y = ea[o], E;
          if (y)
            return y;
          for (E = o - 1; !ea[E]; )
            E--;
          for (y = ea[E], y = {
            line: y.line,
            column: y.column
          }; E < o; )
            i.charCodeAt(E) === 10 ? (y.line++, y.column = 1) : y.column++, E++;
          return ea[o] = y, y;
        }
        function ka(o, y) {
          var E = ps(o), D = ps(y);
          return {
            start: {
              offset: o,
              line: E.line,
              column: E.column
            },
            end: {
              offset: y,
              line: D.line,
              column: D.column
            }
          };
        }
        function X(o) {
          d < jt || (d > jt && (jt = d, Ba = []), Ba.push(o));
        }
        function zu(o, y) {
          return new t(o, null, null, y);
        }
        function Ju(o, y, E) {
          return new t(
            t.buildMessage(o, y),
            o,
            y,
            E
          );
        }
        function ms() {
          var o, y, E, D, F;
          for (o = d, y = [], E = gs(); E !== a; )
            y.push(E), E = gs();
          if (y !== a) {
            for (E = [], D = ys(); D !== a; )
              E.push(D), D = ys();
            if (E !== a) {
              for (D = [], F = ce(); F !== a; )
                D.push(F), F = ce();
              D !== a ? (ue = o, y = c(E), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function gs() {
          var o;
          return i.charCodeAt(d) === 65279 ? (o = h, d++) : (o = a, X(f)), o;
        }
        function ys() {
          var o, y, E, D;
          if (o = Qu(), o === a)
            if (o = d, y = rc(), y !== a) {
              for (E = [], D = ce(); D !== a; )
                E.push(D), D = ce();
              E !== a ? (i.charCodeAt(d) === 46 ? (D = m, d++) : (D = a, X(v)), D !== a ? (ue = o, y = w(y), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          return o;
        }
        function Yu() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 35 ? (y = b, d++) : (y = a, X(x)), y !== a) {
            for (E = [], _.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(R)); D !== a; )
              E.push(D), _.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(R));
            E !== a ? (i.charCodeAt(d) === 10 ? (D = G, d++) : (D = a, X(Y)), D !== a ? (ue = o, y = A(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function ce() {
          var o;
          return o = Cc(), o === a && (o = Yu()), o;
        }
        function Qu() {
          var o;
          return o = Zu(), o === a && (o = ec(), o === a && (o = nc(), o === a && (o = tc()))), o;
        }
        function Zu() {
          var o, y, E, D, F, U, P, L, he;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.substr(d, 7) === K ? (E = K, d += 7) : (E = a, X(M)), E !== a) {
              for (D = [], F = ce(); F !== a; )
                D.push(F), F = ce();
              if (D !== a)
                if (F = bs(), F !== a) {
                  for (U = [], P = ce(); P !== a; )
                    U.push(P), P = ce();
                  if (U !== a)
                    if (P = vr(), P !== a) {
                      for (L = [], he = ce(); he !== a; )
                        L.push(he), he = ce();
                      L !== a ? (i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, X(v)), he !== a ? (ue = o, y = j(F, P), o = y) : (d = o, o = a)) : (d = o, o = a);
                    } else
                      d = o, o = a;
                  else
                    d = o, o = a;
                } else
                  d = o, o = a;
              else
                d = o, o = a;
            } else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function ec() {
          var o, y, E, D, F, U, P;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.substr(d, 5) === k ? (E = k, d += 5) : (E = a, X(H)), E !== a) {
              for (D = [], F = ce(); F !== a; )
                D.push(F), F = ce();
              if (D !== a)
                if (F = vr(), F !== a) {
                  for (U = [], P = ce(); P !== a; )
                    U.push(P), P = ce();
                  U !== a ? (i.charCodeAt(d) === 46 ? (P = m, d++) : (P = a, X(v)), P !== a ? (ue = o, y = $(F), o = y) : (d = o, o = a)) : (d = o, o = a);
                } else
                  d = o, o = a;
              else
                d = o, o = a;
            } else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function tc() {
          var o, y, E, D, F, U, P, L;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (q.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, X(ee)), E !== a)
              if (Q.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(S)), D !== a)
                if (V.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, X(Z)), F !== a)
                  if (ae.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(ie)), U !== a) {
                    for (P = [], L = ce(); L !== a; )
                      P.push(L), L = ce();
                    P !== a ? (L = vr(), L !== a ? (ue = o, y = $(L), o = y) : (d = o, o = a)) : (d = o, o = a);
                  } else
                    d = o, o = a;
                else
                  d = o, o = a;
              else
                d = o, o = a;
            else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function nc() {
          var o, y, E, D, F, U, P, L, he, $e, In, Ln;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (oe.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, X(ne)), E !== a)
              if (ge.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Be)), D !== a)
                if (ae.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, X(ie)), F !== a)
                  if (pe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(Ce)), U !== a)
                    if (Me.test(i.charAt(d)) ? (P = i.charAt(d), d++) : (P = a, X(Ye)), P !== a)
                      if (Te.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(qe)), L !== a) {
                        for (he = [], $e = ce(); $e !== a; )
                          he.push($e), $e = ce();
                        if (he !== a)
                          if ($e = bs(), $e !== a) {
                            for (In = [], Ln = ce(); Ln !== a; )
                              In.push(Ln), Ln = ce();
                            In !== a ? (Ln = vr(), Ln !== a ? (ue = o, y = j($e, Ln), o = y) : (d = o, o = a)) : (d = o, o = a);
                          } else
                            d = o, o = a;
                        else
                          d = o, o = a;
                      } else
                        d = o, o = a;
                    else
                      d = o, o = a;
                  else
                    d = o, o = a;
                else
                  d = o, o = a;
              else
                d = o, o = a;
            else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function rc() {
          var o, y, E;
          return o = d, y = ac(), y !== a ? (E = Oa(), E !== a ? (ue = o, y = ht(y, E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a && (o = d, y = vs(), y !== a ? (E = Oa(), E === a && (E = null), E !== a ? (ue = o, y = it(y, E), o = y) : (d = o, o = a)) : (d = o, o = a)), o;
        }
        function Oa() {
          var o, y, E, D, F, U, P, L, he, $e;
          if (o = d, y = Ma(), y !== a)
            if (E = Ua(), E !== a) {
              for (D = [], F = d, U = [], P = ce(); P !== a; )
                U.push(P), P = ce();
              for (U !== a ? (i.charCodeAt(d) === 59 ? (P = De, d++) : (P = a, X(Re)), P !== a ? (L = d, he = Ma(), he !== a ? ($e = Ua(), $e !== a ? (ue = L, he = _e(y, E, he, $e), L = he) : (d = L, L = a)) : (d = L, L = a), L === a && (L = null), L !== a ? (ue = F, U = Ct(y, E, L), F = U) : (d = F, F = a)) : (d = F, F = a)) : (d = F, F = a); F !== a; ) {
                for (D.push(F), F = d, U = [], P = ce(); P !== a; )
                  U.push(P), P = ce();
                U !== a ? (i.charCodeAt(d) === 59 ? (P = De, d++) : (P = a, X(Re)), P !== a ? (L = d, he = Ma(), he !== a ? ($e = Ua(), $e !== a ? (ue = L, he = _e(y, E, he, $e), L = he) : (d = L, L = a)) : (d = L, L = a), L === a && (L = null), L !== a ? (ue = F, U = Ct(y, E, L), F = U) : (d = F, F = a)) : (d = F, F = a)) : (d = F, F = a);
              }
              D !== a ? (ue = o, y = Ve(y, E, D), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function Ua() {
          var o, y, E, D, F, U, P;
          if (o = d, y = yr(), y !== a) {
            for (E = [], D = d, F = [], U = ce(); U !== a; )
              F.push(U), U = ce();
            for (F !== a ? (i.charCodeAt(d) === 44 ? (U = se, d++) : (U = a, X(Fe)), U !== a ? (P = yr(), P !== a ? (ue = D, F = lt(y, P), D = F) : (d = D, D = a)) : (d = D, D = a)) : (d = D, D = a); D !== a; ) {
              for (E.push(D), D = d, F = [], U = ce(); U !== a; )
                F.push(U), U = ce();
              F !== a ? (i.charCodeAt(d) === 44 ? (U = se, d++) : (U = a, X(Fe)), U !== a ? (P = yr(), P !== a ? (ue = D, F = lt(y, P), D = F) : (d = D, D = a)) : (d = D, D = a)) : (d = D, D = a);
            }
            E !== a ? (ue = o, y = St(y, E), o = y) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function Ma() {
          var o, y, E;
          if (o = d, y = ic(), y !== a && (ue = o, y = w(y)), o = y, o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (i.charCodeAt(d) === 97 ? (E = Oe, d++) : (E = a, X(ke)), E !== a ? (ue = o, y = It(), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function ac() {
          var o, y;
          return o = d, y = ws(), y !== a && (ue = o, y = ln(y)), o = y, o === a && (o = Es(), o === a && (o = na())), o;
        }
        function ic() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          return y !== a ? (E = na(), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function yr() {
          var o, y;
          return o = sc(), o === a && (o = d, y = ws(), y !== a && (ue = o, y = bt(y)), o = y, o === a && (o = d, y = Es(), y !== a && (ue = o, y = _n(y)), o = y, o === a && (o = d, y = vs(), y !== a && (ue = o, y = w(y)), o = y, o === a && (o = d, y = na(), y !== a && (ue = o, y = N(y)), o = y)))), o;
        }
        function sc() {
          var o;
          return o = oc(), o === a && (o = lc(), o === a && (o = uc())), o;
        }
        function vs() {
          var o, y, E, D, F, U;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.charCodeAt(d) === 91 ? (E = p, d++) : (E = a, X(g)), E !== a)
              if (D = Oa(), D !== a) {
                for (F = [], U = ce(); U !== a; )
                  F.push(U), U = ce();
                F !== a ? (i.charCodeAt(d) === 93 ? (U = I, d++) : (U = a, X(W)), U !== a ? (ue = o, y = w(D), o = y) : (d = o, o = a)) : (d = o, o = a);
              } else
                d = o, o = a;
            else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function ws() {
          var o, y, E, D, F, U;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.charCodeAt(d) === 40 ? (E = z, d++) : (E = a, X(te)), E !== a) {
              for (D = [], F = yr(); F !== a; )
                D.push(F), F = yr();
              if (D !== a) {
                for (F = [], U = ce(); U !== a; )
                  F.push(U), U = ce();
                F !== a ? (i.charCodeAt(d) === 41 ? (U = Ae, d++) : (U = a, X(Ke)), U !== a ? (ue = o, y = Pe(D), o = y) : (d = o, o = a)) : (d = o, o = a);
              } else
                d = o, o = a;
            } else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function lc() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          return y !== a ? (E = gc(), E === a && (E = mc(), E === a && (E = pc())), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function oc() {
          var o, y, E, D, F, U, P;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (E = Pa(), E !== a) {
              for (D = [], F = ce(); F !== a; )
                D.push(F), F = ce();
              D !== a ? (F = fc(), F !== a ? (ue = o, y = He(E, F), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          else
            d = o, o = a;
          if (o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            if (y !== a)
              if (E = Pa(), E !== a) {
                for (D = [], F = ce(); F !== a; )
                  D.push(F), F = ce();
                if (D !== a)
                  if (i.substr(d, 2) === Le ? (F = Le, d += 2) : (F = a, X(qr)), F !== a) {
                    for (U = [], P = ce(); P !== a; )
                      U.push(P), P = ce();
                    U !== a ? (P = na(), P !== a ? (ue = o, y = pr(E, P), o = y) : (d = o, o = a)) : (d = o, o = a);
                  } else
                    d = o, o = a;
                else
                  d = o, o = a;
              } else
                d = o, o = a;
            else
              d = o, o = a;
            if (o === a) {
              for (o = d, y = [], E = ce(); E !== a; )
                y.push(E), E = ce();
              y !== a ? (E = Pa(), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a);
            }
          }
          return o;
        }
        function uc() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a ? (i.substr(d, 4) === mr ? (E = mr, d += 4) : (E = a, X(C)), E !== a ? (ue = o, y = T(), o = y) : (d = o, o = a)) : (d = o, o = a), o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (i.substr(d, 5) === O ? (E = O, d += 5) : (E = a, X(J)), E !== a ? (ue = o, y = le(), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function Pa() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          return y !== a ? (E = wc(), E === a && (E = Ec(), E === a && (E = vc(), E === a && (E = yc()))), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function na() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a ? (E = vr(), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (E = cc(), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function cc() {
          var o, y;
          return o = dc(), o === a && (o = d, y = Cs(), y !== a && (ue = o, y = Ee(y)), o = y), o;
        }
        function Es() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a ? (E = hc(), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (E = bc(), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function vr() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 60 ? (y = Ge, d++) : (y = a, X(mt)), y !== a) {
            for (E = [], Nt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Ot)), D === a && (D = je()); D !== a; )
              E.push(D), Nt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Ot)), D === a && (D = je());
            E !== a ? (i.charCodeAt(d) === 62 ? (D = Ut, d++) : (D = a, X(on)), D !== a ? (ue = o, y = un(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function Cs() {
          var o, y, E;
          return o = d, y = As(), y === a && (y = null), y !== a ? (i.charCodeAt(d) === 58 ? (E = ft, d++) : (E = a, X(nt)), E !== a ? (ue = o, y = cn(y), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function bs() {
          var o, y, E;
          return o = d, y = As(), y === a && (y = null), y !== a ? (i.charCodeAt(d) === 58 ? (E = ft, d++) : (E = a, X(nt)), E !== a ? (ue = o, y = Sn(y), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function dc() {
          var o, y, E;
          return o = d, y = Cs(), y !== a ? (E = Nc(), E !== a ? (ue = o, y = ot(y, E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function hc() {
          var o, y, E, D, F, U, P, L, he, $e;
          if (o = d, y = d, i.substr(d, 2) === gr ? (E = gr, d += 2) : (E = a, X(wn)), E !== a)
            if (D = qa(), D === a && (Qe.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(st))), D !== a) {
              for (F = [], U = ut(); U !== a; )
                F.push(U), U = ut();
              if (F !== a) {
                if (U = [], P = d, L = [], i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, X(v)), he !== a)
                  for (; he !== a; )
                    L.push(he), i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, X(v));
                else
                  L = a;
                if (L !== a) {
                  if (he = [], $e = ut(), $e !== a)
                    for (; $e !== a; )
                      he.push($e), $e = ut();
                  else
                    he = a;
                  he !== a ? (L = [L, he], P = L) : (d = P, P = a);
                } else
                  d = P, P = a;
                for (; P !== a; ) {
                  if (U.push(P), P = d, L = [], i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, X(v)), he !== a)
                    for (; he !== a; )
                      L.push(he), i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, X(v));
                  else
                    L = a;
                  if (L !== a) {
                    if (he = [], $e = ut(), $e !== a)
                      for (; $e !== a; )
                        he.push($e), $e = ut();
                    else
                      he = a;
                    he !== a ? (L = [L, he], P = L) : (d = P, P = a);
                  } else
                    d = P, P = a;
                }
                U !== a ? (E = [E, D, F, U], y = E) : (d = y, y = a);
              } else
                d = y, y = a;
            } else
              d = y, y = a;
          else
            d = y, y = a;
          return y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function fc() {
          var o, y, E, D, F, U, P, L;
          if (o = d, i.charCodeAt(d) === 64 ? (y = jo, d++) : (y = a, X(Xo)), y !== a) {
            if (E = [], qi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Hi)), D !== a)
              for (; D !== a; )
                E.push(D), qi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Hi));
            else
              E = a;
            if (E !== a) {
              if (D = [], F = d, i.charCodeAt(d) === 45 ? (U = Ia, d++) : (U = a, X(La)), U !== a) {
                if (P = [], Hr.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Wr)), L !== a)
                  for (; L !== a; )
                    P.push(L), Hr.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Wr));
                else
                  P = a;
                P !== a ? (ue = F, U = Wi(E, P), F = U) : (d = F, F = a);
              } else
                d = F, F = a;
              for (; F !== a; )
                if (D.push(F), F = d, i.charCodeAt(d) === 45 ? (U = Ia, d++) : (U = a, X(La)), U !== a) {
                  if (P = [], Hr.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Wr)), L !== a)
                    for (; L !== a; )
                      P.push(L), Hr.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Wr));
                  else
                    P = a;
                  P !== a ? (ue = F, U = Wi(E, P), F = U) : (d = F, F = a);
                } else
                  d = F, F = a;
              D !== a ? (ue = o, y = zo(E, D), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function pc() {
          var o, y, E, D, F, U;
          if (o = d, y = d, E = d, Vr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Kr)), D === a && (D = null), D !== a) {
            if (F = [], Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(st)), U !== a)
              for (; U !== a; )
                F.push(U), Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(st));
            else
              F = a;
            F !== a ? (D = [D, F], E = D) : (d = E, E = a);
          } else
            d = E, E = a;
          return E !== a ? y = i.substring(y, d) : y = E, y !== a && (ue = o, y = Jo(y)), o = y, o;
        }
        function mc() {
          var o, y, E, D, F, U, P, L;
          if (o = d, y = d, E = d, Vr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Kr)), D === a && (D = null), D !== a) {
            for (F = [], Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(st)); U !== a; )
              F.push(U), Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(st));
            if (F !== a)
              if (i.charCodeAt(d) === 46 ? (U = m, d++) : (U = a, X(v)), U !== a) {
                if (P = [], Qe.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(st)), L !== a)
                  for (; L !== a; )
                    P.push(L), Qe.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(st));
                else
                  P = a;
                P !== a ? (D = [D, F, U, P], E = D) : (d = E, E = a);
              } else
                d = E, E = a;
            else
              d = E, E = a;
          } else
            d = E, E = a;
          return E !== a ? y = i.substring(y, d) : y = E, y !== a && (ue = o, y = Yo(y)), o = y, o;
        }
        function gc() {
          var o, y, E, D, F, U, P, L, he;
          if (o = d, y = d, E = d, Vr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Kr)), D === a && (D = null), D !== a) {
            if (F = d, U = [], Qe.test(i.charAt(d)) ? (P = i.charAt(d), d++) : (P = a, X(st)), P !== a)
              for (; P !== a; )
                U.push(P), Qe.test(i.charAt(d)) ? (P = i.charAt(d), d++) : (P = a, X(st));
            else
              U = a;
            if (U !== a)
              if (i.charCodeAt(d) === 46 ? (P = m, d++) : (P = a, X(v)), P !== a) {
                for (L = [], Qe.test(i.charAt(d)) ? (he = i.charAt(d), d++) : (he = a, X(st)); he !== a; )
                  L.push(he), Qe.test(i.charAt(d)) ? (he = i.charAt(d), d++) : (he = a, X(st));
                L !== a ? (he = $a(), he !== a ? (U = [U, P, L, he], F = U) : (d = F, F = a)) : (d = F, F = a);
              } else
                d = F, F = a;
            else
              d = F, F = a;
            if (F === a) {
              if (F = d, i.charCodeAt(d) === 46 ? (U = m, d++) : (U = a, X(v)), U !== a) {
                if (P = [], Qe.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(st)), L !== a)
                  for (; L !== a; )
                    P.push(L), Qe.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(st));
                else
                  P = a;
                P !== a ? (L = $a(), L !== a ? (U = [U, P, L], F = U) : (d = F, F = a)) : (d = F, F = a);
              } else
                d = F, F = a;
              if (F === a) {
                if (F = d, U = [], Qe.test(i.charAt(d)) ? (P = i.charAt(d), d++) : (P = a, X(st)), P !== a)
                  for (; P !== a; )
                    U.push(P), Qe.test(i.charAt(d)) ? (P = i.charAt(d), d++) : (P = a, X(st));
                else
                  U = a;
                U !== a ? (P = $a(), P !== a ? (U = [U, P], F = U) : (d = F, F = a)) : (d = F, F = a);
              }
            }
            F !== a ? (D = [D, F], E = D) : (d = E, E = a);
          } else
            d = E, E = a;
          return E !== a ? y = i.substring(y, d) : y = E, y !== a && (ue = o, y = Qo(y)), o = y, o;
        }
        function $a() {
          var o, y, E, D, F, U;
          if (o = d, y = d, Zo.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, X(eu)), E !== a)
            if (Vr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Kr)), D === a && (D = null), D !== a) {
              if (F = [], Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(st)), U !== a)
                for (; U !== a; )
                  F.push(U), Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, X(st));
              else
                F = a;
              F !== a ? (E = [E, D, F], y = E) : (d = y, y = a);
            } else
              d = y, y = a;
          else
            d = y, y = a;
          return y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function yc() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 34 ? (y = Gr, d++) : (y = a, X(jr)), y !== a) {
            for (E = [], Vi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Ki)), D === a && (D = Je(), D === a && (D = je())); D !== a; )
              E.push(D), Vi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Ki)), D === a && (D = Je(), D === a && (D = je()));
            E !== a ? (i.charCodeAt(d) === 34 ? (D = Gr, d++) : (D = a, X(jr)), D !== a ? (ue = o, y = A(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function vc() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 39 ? (y = Xr, d++) : (y = a, X(zr)), y !== a) {
            for (E = [], Gi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(ji)), D === a && (D = Je(), D === a && (D = je())); D !== a; )
              E.push(D), Gi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(ji)), D === a && (D = Je(), D === a && (D = je()));
            E !== a ? (i.charCodeAt(d) === 39 ? (D = Xr, d++) : (D = a, X(zr)), D !== a ? (ue = o, y = A(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function wc() {
          var o, y, E, D, F, U, P, L;
          if (o = d, i.substr(d, 3) === Jr ? (y = Jr, d += 3) : (y = a, X(Xi)), y !== a) {
            for (E = [], Wt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Vt)), D === a && (D = Je(), D === a && (D = je())); D !== a; )
              E.push(D), Wt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Vt)), D === a && (D = Je(), D === a && (D = je()));
            if (E !== a) {
              if (D = [], F = d, i.substr(d, 2) === Yr ? (U = Yr, d += 2) : (U = a, X(zi)), U !== a) {
                if (P = [], Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                  for (; L !== a; )
                    P.push(L), Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je()));
                else
                  P = a;
                P !== a ? (ue = F, U = Ji(E, P), F = U) : (d = F, F = a);
              } else
                d = F, F = a;
              if (F === a)
                if (F = d, i.charCodeAt(d) === 39 ? (U = Xr, d++) : (U = a, X(zr)), U !== a) {
                  if (P = [], Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                    for (; L !== a; )
                      P.push(L), Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je()));
                  else
                    P = a;
                  P !== a ? (ue = F, U = Yi(E, P), F = U) : (d = F, F = a);
                } else
                  d = F, F = a;
              for (; F !== a; ) {
                if (D.push(F), F = d, i.substr(d, 2) === Yr ? (U = Yr, d += 2) : (U = a, X(zi)), U !== a) {
                  if (P = [], Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                    for (; L !== a; )
                      P.push(L), Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je()));
                  else
                    P = a;
                  P !== a ? (ue = F, U = Ji(E, P), F = U) : (d = F, F = a);
                } else
                  d = F, F = a;
                if (F === a)
                  if (F = d, i.charCodeAt(d) === 39 ? (U = Xr, d++) : (U = a, X(zr)), U !== a) {
                    if (P = [], Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                      for (; L !== a; )
                        P.push(L), Wt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Vt)), L === a && (L = Je(), L === a && (L = je()));
                    else
                      P = a;
                    P !== a ? (ue = F, U = Yi(E, P), F = U) : (d = F, F = a);
                  } else
                    d = F, F = a;
              }
              D !== a ? (i.substr(d, 3) === Jr ? (F = Jr, d += 3) : (F = a, X(Xi)), F !== a ? (ue = o, y = Qi(E, D), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function Ec() {
          var o, y, E, D, F, U, P, L;
          if (o = d, i.substr(d, 3) === Qr ? (y = Qr, d += 3) : (y = a, X(Zi)), y !== a) {
            for (E = [], Kt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Gt)), D === a && (D = Je(), D === a && (D = je())); D !== a; )
              E.push(D), Kt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, X(Gt)), D === a && (D = Je(), D === a && (D = je()));
            if (E !== a) {
              if (D = [], F = d, i.substr(d, 2) === Zr ? (U = Zr, d += 2) : (U = a, X(es)), U !== a) {
                if (P = [], Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                  for (; L !== a; )
                    P.push(L), Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je()));
                else
                  P = a;
                P !== a ? (ue = F, U = ts(E, P), F = U) : (d = F, F = a);
              } else
                d = F, F = a;
              if (F === a)
                if (F = d, i.charCodeAt(d) === 34 ? (U = Gr, d++) : (U = a, X(jr)), U !== a) {
                  if (P = [], Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                    for (; L !== a; )
                      P.push(L), Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je()));
                  else
                    P = a;
                  P !== a ? (ue = F, U = ns(E, P), F = U) : (d = F, F = a);
                } else
                  d = F, F = a;
              for (; F !== a; ) {
                if (D.push(F), F = d, i.substr(d, 2) === Zr ? (U = Zr, d += 2) : (U = a, X(es)), U !== a) {
                  if (P = [], Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                    for (; L !== a; )
                      P.push(L), Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je()));
                  else
                    P = a;
                  P !== a ? (ue = F, U = ts(E, P), F = U) : (d = F, F = a);
                } else
                  d = F, F = a;
                if (F === a)
                  if (F = d, i.charCodeAt(d) === 34 ? (U = Gr, d++) : (U = a, X(jr)), U !== a) {
                    if (P = [], Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je())), L !== a)
                      for (; L !== a; )
                        P.push(L), Kt.test(i.charAt(d)) ? (L = i.charAt(d), d++) : (L = a, X(Gt)), L === a && (L = Je(), L === a && (L = je()));
                    else
                      P = a;
                    P !== a ? (ue = F, U = ns(E, P), F = U) : (d = F, F = a);
                  } else
                    d = F, F = a;
              }
              D !== a ? (i.substr(d, 3) === Qr ? (F = Qr, d += 3) : (F = a, X(Zi)), F !== a ? (ue = o, y = Qi(E, D), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function je() {
          var o, y, E, D, F, U, P, L, he, $e, In;
          return o = d, i.substr(d, 2) === rs ? (y = rs, d += 2) : (y = a, X(tu)), y !== a ? (E = d, D = At(), D !== a ? (F = At(), F !== a ? (U = At(), U !== a ? (P = At(), P !== a ? (L = At(), L !== a ? (he = At(), he !== a ? ($e = At(), $e !== a ? (In = At(), In !== a ? (D = [D, F, U, P, L, he, $e, In], E = D) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a), E !== a ? (ue = o, y = nu(E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a && (o = d, i.substr(d, 2) === as ? (y = as, d += 2) : (y = a, X(ru)), y !== a ? (E = d, D = At(), D !== a ? (F = At(), F !== a ? (U = At(), U !== a ? (P = At(), P !== a ? (D = [D, F, U, P], E = D) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a), E !== a ? (ue = o, y = au(E), o = y) : (d = o, o = a)) : (d = o, o = a)), o;
        }
        function Je() {
          var o, y;
          return o = d, i.substr(d, 2) === is ? (y = is, d += 2) : (y = a, X(iu)), y !== a && (ue = o, y = su()), o = y, o === a && (o = d, i.substr(d, 2) === ss ? (y = ss, d += 2) : (y = a, X(lu)), y !== a && (ue = o, y = ou()), o = y, o === a && (o = d, i.substr(d, 2) === ls ? (y = ls, d += 2) : (y = a, X(uu)), y !== a && (ue = o, y = cu()), o = y, o === a && (o = d, i.substr(d, 2) === os ? (y = os, d += 2) : (y = a, X(du)), y !== a && (ue = o, y = hu()), o = y, o === a && (o = d, i.substr(d, 2) === us ? (y = us, d += 2) : (y = a, X(fu)), y !== a && (ue = o, y = pu()), o = y, o === a && (o = d, i.substr(d, 2) === cs ? (y = cs, d += 2) : (y = a, X(mu)), y !== a && (ue = o, y = gu()), o = y, o === a && (o = d, i.substr(d, 2) === ds ? (y = ds, d += 2) : (y = a, X(yu)), y !== a && (ue = o, y = vu()), o = y, o === a && (o = d, i.substr(d, 2) === hs ? (y = hs, d += 2) : (y = a, X(wu)), y !== a && (ue = o, y = Eu()), o = y))))))), o;
        }
        function Cc() {
          var o;
          return Cu.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, X(bu)), o;
        }
        function bc() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 91 ? (y = p, d++) : (y = a, X(g)), y !== a) {
            for (E = [], D = ce(); D !== a; )
              E.push(D), D = ce();
            E !== a ? (i.charCodeAt(d) === 93 ? (D = I, d++) : (D = a, X(W)), D !== a ? (ue = o, y = Nu(), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function Ns() {
          var o, y, E;
          return o = d, Au.test(i.charAt(d)) ? (y = i.charAt(d), d++) : (y = a, X(xu)), y !== a ? (Tu.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, X(Du)), E !== a ? (ue = o, y = _u(y, E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a && (Su.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, X(Fu))), o;
        }
        function qa() {
          var o;
          return o = Ns(), o === a && (i.charCodeAt(d) === 95 ? (o = Iu, d++) : (o = a, X(Lu))), o;
        }
        function ut() {
          var o;
          return o = qa(), o === a && (i.charCodeAt(d) === 45 ? (o = Ia, d++) : (o = a, X(La)), o === a && (Qe.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, X(st)), o === a && (i.charCodeAt(d) === 183 ? (o = Bu, d++) : (o = a, X(Ru)), o === a && (ku.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, X(Ou)), o === a && (Uu.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, X(Mu))))))), o;
        }
        function As() {
          var o, y, E, D, F, U, P, L, he;
          if (o = d, y = d, E = Ns(), E !== a) {
            for (D = [], F = ut(); F !== a; )
              D.push(F), F = ut();
            if (D !== a) {
              if (F = [], U = d, P = [], i.charCodeAt(d) === 46 ? (L = m, d++) : (L = a, X(v)), L !== a)
                for (; L !== a; )
                  P.push(L), i.charCodeAt(d) === 46 ? (L = m, d++) : (L = a, X(v));
              else
                P = a;
              if (P !== a) {
                if (L = [], he = ut(), he !== a)
                  for (; he !== a; )
                    L.push(he), he = ut();
                else
                  L = a;
                L !== a ? (P = [P, L], U = P) : (d = U, U = a);
              } else
                d = U, U = a;
              for (; U !== a; ) {
                if (F.push(U), U = d, P = [], i.charCodeAt(d) === 46 ? (L = m, d++) : (L = a, X(v)), L !== a)
                  for (; L !== a; )
                    P.push(L), i.charCodeAt(d) === 46 ? (L = m, d++) : (L = a, X(v));
                else
                  P = a;
                if (P !== a) {
                  if (L = [], he = ut(), he !== a)
                    for (; he !== a; )
                      L.push(he), he = ut();
                  else
                    L = a;
                  L !== a ? (P = [P, L], U = P) : (d = U, U = a);
                } else
                  d = U, U = a;
              }
              F !== a ? (E = [E, D, F], y = E) : (d = y, y = a);
            } else
              d = y, y = a;
          } else
            d = y, y = a;
          return y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function Nc() {
          var o, y, E, D, F, U, P, L;
          if (o = d, y = qa(), y === a && (i.charCodeAt(d) === 58 ? (y = ft, d++) : (y = a, X(nt)), y === a && (Qe.test(i.charAt(d)) ? (y = i.charAt(d), d++) : (y = a, X(st)), y === a && (y = Fn()))), y !== a) {
            for (E = [], D = ut(), D === a && (i.charCodeAt(d) === 58 ? (D = ft, d++) : (D = a, X(nt)), D === a && (D = Fn())); D !== a; )
              E.push(D), D = ut(), D === a && (i.charCodeAt(d) === 58 ? (D = ft, d++) : (D = a, X(nt)), D === a && (D = Fn()));
            if (E !== a) {
              if (D = [], F = d, U = [], i.charCodeAt(d) === 46 ? (P = m, d++) : (P = a, X(v)), P !== a)
                for (; P !== a; )
                  U.push(P), i.charCodeAt(d) === 46 ? (P = m, d++) : (P = a, X(v));
              else
                U = a;
              if (U !== a) {
                if (P = [], L = ut(), L === a && (i.charCodeAt(d) === 58 ? (L = ft, d++) : (L = a, X(nt)), L === a && (L = Fn())), L !== a)
                  for (; L !== a; )
                    P.push(L), L = ut(), L === a && (i.charCodeAt(d) === 58 ? (L = ft, d++) : (L = a, X(nt)), L === a && (L = Fn()));
                else
                  P = a;
                P !== a ? (ue = F, U = fs(y, E, U, P), F = U) : (d = F, F = a);
              } else
                d = F, F = a;
              for (; F !== a; ) {
                if (D.push(F), F = d, U = [], i.charCodeAt(d) === 46 ? (P = m, d++) : (P = a, X(v)), P !== a)
                  for (; P !== a; )
                    U.push(P), i.charCodeAt(d) === 46 ? (P = m, d++) : (P = a, X(v));
                else
                  U = a;
                if (U !== a) {
                  if (P = [], L = ut(), L === a && (i.charCodeAt(d) === 58 ? (L = ft, d++) : (L = a, X(nt)), L === a && (L = Fn())), L !== a)
                    for (; L !== a; )
                      P.push(L), L = ut(), L === a && (i.charCodeAt(d) === 58 ? (L = ft, d++) : (L = a, X(nt)), L === a && (L = Fn()));
                  else
                    P = a;
                  P !== a ? (ue = F, U = fs(y, E, U, P), F = U) : (d = F, F = a);
                } else
                  d = F, F = a;
              }
              D !== a ? (ue = o, y = Pu(y, E, D), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function Fn() {
          var o;
          return o = Ac(), o === a && (o = xc()), o;
        }
        function Ac() {
          var o, y, E, D, F;
          return o = d, y = d, i.charCodeAt(d) === 37 ? (E = $u, d++) : (E = a, X(qu)), E !== a ? (D = At(), D !== a ? (F = At(), F !== a ? (E = [E, D, F], y = E) : (d = y, y = a)) : (d = y, y = a)) : (d = y, y = a), y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function At() {
          var o;
          return Hu.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, X(Wu)), o;
        }
        function xc() {
          var o, y, E;
          return o = d, i.charCodeAt(d) === 92 ? (y = Vu, d++) : (y = a, X(Ku)), y !== a ? (Gu.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, X(ju)), E !== a ? (ue = o, y = w(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        var xs = function(o) {
          return o.match(/^[a-z](.*?):(.+?)/g);
        };
        function Tc(o, y) {
          var E = {};
          return E[o] = y, E;
        }
        var Ue = {
          base: [],
          data: {},
          addBase: function(o) {
            if (Ue.base.length === 0) {
              Ue.base.push(o);
              return;
            }
            const y = Ue.base[Ue.base.length - 1];
            y !== o && Ue.base.push(new URL(o, y).toString());
          },
          addPrefix: function(o, y) {
            const E = Ue.data[o];
            E === void 0 ? Ue.data[o] = [{ uri: y, count: 0 }] : E[E.length - 1].uri !== y && E.push({ uri: y, count: 0 });
          },
          hasPrefix: function(o) {
            return this.data[o] !== void 0;
          },
          resolve: function(o, y) {
            const E = Object.keys(Ue.data).find((F) => o.indexOf(F + ":") === 0);
            if (E !== void 0) {
              const F = Ue.data[E];
              if (F.length === 1 && y !== !0 && xs(F[0].uri)) return o;
              const U = F[F.length - 1].uri;
              return o.replace(E + ":", U);
            } else {
              var D = Ue.base.length === 0 ? s.baseIRI : Ue.base[Ue.base.length - 1];
              return !D || o.match(/^(http:|https:|urn:|file:)/) ? o : o.indexOf("//") === 0 && D ? D.split("//")[0] + o : new URL(o, D).toString();
            }
          },
          increment: function(o) {
            const y = Ue.data[o];
            y !== void 0 && y[y.length - 1].count++;
          },
          decrement: function(o) {
            const y = Ue.data[o];
            y !== void 0 && y[y.length - 1].count--;
          },
          toJSON: function() {
            const o = {};
            return Ue.base.length > 0 && (o["@context"] === void 0 && (o["@context"] = {}), o["@context"]["@base"] = Ue.base[0]), Object.keys(Ue.data).forEach((y) => {
              const E = Ue.data[y][0];
              E.uri === "http://www.w3.org/2001/XMLSchema#" && E.count < 1 || xs(E.uri) && (o["@context"] === void 0 && (o["@context"] = {}), o["@context"][y] = E.uri);
            }), o;
          }
        };
        function Ha(o, y) {
          if (o["@list"] === void 0 || !y && !o["@list"].find((F) => F["@list"] !== void 0)) return o;
          if (o["@list"].length === 0)
            return { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" };
          var E = {}, D = null;
          return o["@list"].forEach((F) => {
            D === null ? D = E : (D["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = {}, D = D["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"]), D["http://www.w3.org/1999/02/22-rdf-syntax-ns#first"] = Ha(F, !0), D["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = {
              "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
            };
          }), E;
        }
        if (ta = u(), ta !== a && d === i.length)
          return ta;
        throw ta !== a && d < i.length && X(Xu()), Ju(
          Ba,
          jt < i.length ? i.charAt(jt) : null,
          jt < i.length ? ka(jt, jt + 1) : ka(jt, jt)
        );
      }
      return {
        SyntaxError: t,
        parse: r
      };
    });
  })(ga)), ga.exports;
}
var Kc = Vc(), Va, Ls;
function Gc() {
  if (Ls) return Va;
  Ls = 1;
  const n = {
    acl: "http://www.w3.org/ns/auth/acl#",
    arg: "http://www.w3.org/ns/pim/arg#",
    as: "https://www.w3.org/ns/activitystreams#",
    bookmark: "http://www.w3.org/2002/01/bookmark#",
    cal: "http://www.w3.org/2002/12/cal/ical#",
    cco: "http://www.ontologyrepository.com/CommonCoreOntologies/",
    cert: "http://www.w3.org/ns/auth/cert#",
    contact: "http://www.w3.org/2000/10/swap/pim/contact#",
    dc: "http://purl.org/dc/elements/1.1/",
    dct: "http://purl.org/dc/terms/",
    doap: "http://usefulinc.com/ns/doap#",
    foaf: "http://xmlns.com/foaf/0.1/",
    geo: "http://www.w3.org/2003/01/geo/wgs84_pos#",
    gpx: "http://www.w3.org/ns/pim/gpx#",
    gr: "http://purl.org/goodrelations/v1#",
    http: "http://www.w3.org/2007/ont/http#",
    httph: "http://www.w3.org/2007/ont/httph#",
    icalTZ: "http://www.w3.org/2002/12/cal/icaltzd#",
    // Beware: not cal:
    ldp: "http://www.w3.org/ns/ldp#",
    link: "http://www.w3.org/2007/ont/link#",
    log: "http://www.w3.org/2000/10/swap/log#",
    meeting: "http://www.w3.org/ns/pim/meeting#",
    mo: "http://purl.org/ontology/mo/",
    org: "http://www.w3.org/ns/org#",
    owl: "http://www.w3.org/2002/07/owl#",
    pad: "http://www.w3.org/ns/pim/pad#",
    patch: "http://www.w3.org/ns/pim/patch#",
    prov: "http://www.w3.org/ns/prov#",
    pto: "http://www.productontology.org/id/",
    qu: "http://www.w3.org/2000/10/swap/pim/qif#",
    trip: "http://www.w3.org/ns/pim/trip#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    rss: "http://purl.org/rss/1.0/",
    sched: "http://www.w3.org/ns/pim/schedule#",
    schema: "http://schema.org/",
    // @@ beware confusion with documents no 303
    sioc: "http://rdfs.org/sioc/ns#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    solid: "http://www.w3.org/ns/solid/terms#",
    space: "http://www.w3.org/ns/pim/space#",
    stat: "http://www.w3.org/ns/posix/stat#",
    tab: "http://www.w3.org/2007/ont/link#",
    tabont: "http://www.w3.org/2007/ont/link#",
    ui: "http://www.w3.org/ns/ui#",
    vann: "http://purl.org/vocab/vann/",
    vcard: "http://www.w3.org/2006/vcard/ns#",
    wf: "http://www.w3.org/2005/01/wf/flow#",
    xsd: "http://www.w3.org/2001/XMLSchema#"
  };
  function e(t = { namedNode: (r) => r }) {
    const r = {};
    for (const i in n) {
      const s = n[i];
      r[i] = function(a = "") {
        return t.namedNode(s + a);
      };
    }
    return r;
  }
  return Va = e, Va;
}
var jc = Gc();
const Bs = /* @__PURE__ */ Bl(jc);
var wr = {}, hn = {}, Bn = {}, Rs;
function Sa() {
  if (Rs) return Bn;
  Rs = 1;
  function n(s, a, l) {
    if (l === void 0 && (l = Array.prototype), s && typeof l.find == "function")
      return l.find.call(s, a);
    for (var u = 0; u < s.length; u++)
      if (Object.prototype.hasOwnProperty.call(s, u)) {
        var c = s[u];
        if (a.call(void 0, c, u, s))
          return c;
      }
  }
  function e(s, a) {
    return a === void 0 && (a = Object), a && typeof a.freeze == "function" ? a.freeze(s) : s;
  }
  function t(s, a) {
    if (s === null || typeof s != "object")
      throw new TypeError("target is not an object");
    for (var l in a)
      Object.prototype.hasOwnProperty.call(a, l) && (s[l] = a[l]);
    return s;
  }
  var r = e({
    /**
     * `text/html`, the only mime type that triggers treating an XML document as HTML.
     *
     * @see DOMParser.SupportedType.isHTML
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
     */
    HTML: "text/html",
    /**
     * Helper method to check a mime type if it indicates an HTML document
     *
     * @param {string} [value]
     * @returns {boolean}
     *
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
    isHTML: function(s) {
      return s === r.HTML;
    },
    /**
     * `application/xml`, the standard mime type for XML documents.
     *
     * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
     * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_APPLICATION: "application/xml",
    /**
     * `text/html`, an alias for `application/xml`.
     *
     * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
     * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_TEXT: "text/xml",
    /**
     * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
     * but is parsed as an XML document.
     *
     * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
     * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
     */
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    /**
     * `image/svg+xml`,
     *
     * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
     * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
     * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
     */
    XML_SVG_IMAGE: "image/svg+xml"
  }), i = e({
    /**
     * The XHTML namespace.
     *
     * @see http://www.w3.org/1999/xhtml
     */
    HTML: "http://www.w3.org/1999/xhtml",
    /**
     * Checks if `uri` equals `NAMESPACE.HTML`.
     *
     * @param {string} [uri]
     *
     * @see NAMESPACE.HTML
     */
    isHTML: function(s) {
      return s === i.HTML;
    },
    /**
     * The SVG namespace.
     *
     * @see http://www.w3.org/2000/svg
     */
    SVG: "http://www.w3.org/2000/svg",
    /**
     * The `xml:` namespace.
     *
     * @see http://www.w3.org/XML/1998/namespace
     */
    XML: "http://www.w3.org/XML/1998/namespace",
    /**
     * The `xmlns:` namespace
     *
     * @see https://www.w3.org/2000/xmlns/
     */
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  return Bn.assign = t, Bn.find = n, Bn.freeze = e, Bn.MIME_TYPE = r, Bn.NAMESPACE = i, Bn;
}
var ks;
function Rl() {
  if (ks) return hn;
  ks = 1;
  var n = Sa(), e = n.find, t = n.NAMESPACE;
  function r(C) {
    return C !== "";
  }
  function i(C) {
    return C ? C.split(/[\t\n\f\r ]+/).filter(r) : [];
  }
  function s(C, T) {
    return C.hasOwnProperty(T) || (C[T] = !0), C;
  }
  function a(C) {
    if (!C) return [];
    var T = i(C);
    return Object.keys(T.reduce(s, {}));
  }
  function l(C) {
    return function(T) {
      return C && C.indexOf(T) !== -1;
    };
  }
  function u(C, T) {
    for (var O in C)
      Object.prototype.hasOwnProperty.call(C, O) && (T[O] = C[O]);
  }
  function c(C, T) {
    var O = C.prototype;
    if (!(O instanceof T)) {
      let J = function() {
      };
      J.prototype = T.prototype, J = new J(), u(O, J), C.prototype = O = J;
    }
    O.constructor != C && (typeof C != "function" && console.error("unknown Class:" + C), O.constructor = C);
  }
  var h = {}, f = h.ELEMENT_NODE = 1, m = h.ATTRIBUTE_NODE = 2, v = h.TEXT_NODE = 3, w = h.CDATA_SECTION_NODE = 4, b = h.ENTITY_REFERENCE_NODE = 5, x = h.ENTITY_NODE = 6, _ = h.PROCESSING_INSTRUCTION_NODE = 7, R = h.COMMENT_NODE = 8, G = h.DOCUMENT_NODE = 9, Y = h.DOCUMENT_TYPE_NODE = 10, A = h.DOCUMENT_FRAGMENT_NODE = 11, K = h.NOTATION_NODE = 12, M = {}, j = {};
  M.INDEX_SIZE_ERR = (j[1] = "Index size error", 1), M.DOMSTRING_SIZE_ERR = (j[2] = "DOMString size error", 2);
  var k = M.HIERARCHY_REQUEST_ERR = (j[3] = "Hierarchy request error", 3);
  M.WRONG_DOCUMENT_ERR = (j[4] = "Wrong document", 4), M.INVALID_CHARACTER_ERR = (j[5] = "Invalid character", 5), M.NO_DATA_ALLOWED_ERR = (j[6] = "No data allowed", 6), M.NO_MODIFICATION_ALLOWED_ERR = (j[7] = "No modification allowed", 7);
  var H = M.NOT_FOUND_ERR = (j[8] = "Not found", 8);
  M.NOT_SUPPORTED_ERR = (j[9] = "Not supported", 9);
  var $ = M.INUSE_ATTRIBUTE_ERR = (j[10] = "Attribute in use", 10);
  M.INVALID_STATE_ERR = (j[11] = "Invalid state", 11), M.SYNTAX_ERR = (j[12] = "Syntax error", 12), M.INVALID_MODIFICATION_ERR = (j[13] = "Invalid modification", 13), M.NAMESPACE_ERR = (j[14] = "Invalid namespace", 14), M.INVALID_ACCESS_ERR = (j[15] = "Invalid access", 15);
  function q(C, T) {
    if (T instanceof Error)
      var O = T;
    else
      O = this, Error.call(this, j[C]), this.message = j[C], Error.captureStackTrace && Error.captureStackTrace(this, q);
    return O.code = C, T && (this.message = this.message + ": " + T), O;
  }
  q.prototype = Error.prototype, u(M, q);
  function ee() {
  }
  ee.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
     * @standard level1
     */
    length: 0,
    /**
     * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
     * @standard level1
     * @param index  unsigned long
     *   Index into the collection.
     * @return Node
     * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
     */
    item: function(C) {
      return C >= 0 && C < this.length ? this[C] : null;
    },
    toString: function(C, T) {
      for (var O = [], J = 0; J < this.length; J++)
        Le(this[J], O, C, T);
      return O.join("");
    },
    /**
     * @private
     * @param {function (Node):boolean} predicate
     * @returns {Node[]}
     */
    filter: function(C) {
      return Array.prototype.filter.call(this, C);
    },
    /**
     * @private
     * @param {Node} item
     * @returns {number}
     */
    indexOf: function(C) {
      return Array.prototype.indexOf.call(this, C);
    }
  };
  function Q(C, T) {
    this._node = C, this._refresh = T, S(this);
  }
  function S(C) {
    var T = C._node._inc || C._node.ownerDocument._inc;
    if (C._inc !== T) {
      var O = C._refresh(C._node);
      if (mr(C, "length", O.length), !C.$$length || O.length < C.$$length)
        for (var J = O.length; J in C; J++)
          Object.prototype.hasOwnProperty.call(C, J) && delete C[J];
      u(O, C), C._inc = T;
    }
  }
  Q.prototype.item = function(C) {
    return S(this), this[C] || null;
  }, c(Q, ee);
  function V() {
  }
  function Z(C, T) {
    for (var O = C.length; O--; )
      if (C[O] === T)
        return O;
  }
  function ae(C, T, O, J) {
    if (J ? T[Z(T, J)] = O : T[T.length++] = O, C) {
      O.ownerElement = C;
      var le = C.ownerDocument;
      le && (J && Me(le, C, J), Ce(le, C, O));
    }
  }
  function ie(C, T, O) {
    var J = Z(T, O);
    if (J >= 0) {
      for (var le = T.length - 1; J < le; )
        T[J] = T[++J];
      if (T.length = le, C) {
        var Ee = C.ownerDocument;
        Ee && (Me(Ee, C, O), O.ownerElement = null);
      }
    } else
      throw new q(H, new Error(C.tagName + "@" + O));
  }
  V.prototype = {
    length: 0,
    item: ee.prototype.item,
    getNamedItem: function(C) {
      for (var T = this.length; T--; ) {
        var O = this[T];
        if (O.nodeName == C)
          return O;
      }
    },
    setNamedItem: function(C) {
      var T = C.ownerElement;
      if (T && T != this._ownerElement)
        throw new q($);
      var O = this.getNamedItem(C.nodeName);
      return ae(this._ownerElement, this, C, O), O;
    },
    /* returns Node */
    setNamedItemNS: function(C) {
      var T = C.ownerElement, O;
      if (T && T != this._ownerElement)
        throw new q($);
      return O = this.getNamedItemNS(C.namespaceURI, C.localName), ae(this._ownerElement, this, C, O), O;
    },
    /* returns Node */
    removeNamedItem: function(C) {
      var T = this.getNamedItem(C);
      return ie(this._ownerElement, this, T), T;
    },
    // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
    //for level2
    removeNamedItemNS: function(C, T) {
      var O = this.getNamedItemNS(C, T);
      return ie(this._ownerElement, this, O), O;
    },
    getNamedItemNS: function(C, T) {
      for (var O = this.length; O--; ) {
        var J = this[O];
        if (J.localName == T && J.namespaceURI == C)
          return J;
      }
      return null;
    }
  };
  function oe() {
  }
  oe.prototype = {
    /**
     * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
     * The different implementations fairly diverged in what kind of features were reported.
     * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
     *
     * @deprecated It is deprecated and modern browsers return true in all cases.
     *
     * @param {string} feature
     * @param {string} [version]
     * @returns {boolean} always true
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
     * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
     */
    hasFeature: function(C, T) {
      return !0;
    },
    /**
     * Creates an XML Document object of the specified type with its document element.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
     * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     * - this implementation is not validating names or qualified names
     *   (when parsing XML strings, the SAX parser takes care of that)
     *
     * @param {string|null} namespaceURI
     * @param {string} qualifiedName
     * @param {DocumentType=null} doctype
     * @returns {Document}
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
     *
     * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
     * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
     * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
     */
    createDocument: function(C, T, O) {
      var J = new pe();
      if (J.implementation = this, J.childNodes = new ee(), J.doctype = O || null, O && J.appendChild(O), T) {
        var le = J.createElementNS(C, T);
        J.appendChild(le);
      }
      return J;
    },
    /**
     * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
     *
     * __This behavior is slightly different from the in the specs__:
     * - this implementation is not validating names or qualified names
     *   (when parsing XML strings, the SAX parser takes care of that)
     *
     * @param {string} qualifiedName
     * @param {string} [publicId]
     * @param {string} [systemId]
     * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
     * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
     *
     * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
     * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
     * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
     */
    createDocumentType: function(C, T, O) {
      var J = new p();
      return J.name = C, J.nodeName = C, J.publicId = T || "", J.systemId = O || "", J;
    }
  };
  function ne() {
  }
  ne.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    // Modified in DOM Level 2:
    insertBefore: function(C, T) {
      return lt(this, C, T);
    },
    replaceChild: function(C, T) {
      lt(this, C, T, Fe), T && this.removeChild(T);
    },
    removeChild: function(C) {
      return Te(this, C);
    },
    appendChild: function(C) {
      return this.insertBefore(C, null);
    },
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    cloneNode: function(C) {
      return pr(this.ownerDocument || this, this, C);
    },
    // Modified in DOM Level 2:
    normalize: function() {
      for (var C = this.firstChild; C; ) {
        var T = C.nextSibling;
        T && T.nodeType == v && C.nodeType == v ? (this.removeChild(T), C.appendData(T.data)) : (C.normalize(), C = T);
      }
    },
    // Introduced in DOM Level 2:
    isSupported: function(C, T) {
      return this.ownerDocument.implementation.hasFeature(C, T);
    },
    // Introduced in DOM Level 2:
    hasAttributes: function() {
      return this.attributes.length > 0;
    },
    /**
     * Look up the prefix associated to the given namespace URI, starting from this node.
     * **The default namespace declarations are ignored by this method.**
     * See Namespace Prefix Lookup for details on the algorithm used by this method.
     *
     * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
     *
     * @param {string | null} namespaceURI
     * @returns {string | null}
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
     * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
     * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
     * @see https://github.com/xmldom/xmldom/issues/322
     */
    lookupPrefix: function(C) {
      for (var T = this; T; ) {
        var O = T._nsMap;
        if (O) {
          for (var J in O)
            if (Object.prototype.hasOwnProperty.call(O, J) && O[J] === C)
              return J;
        }
        T = T.nodeType == m ? T.ownerDocument : T.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function(C) {
      for (var T = this; T; ) {
        var O = T._nsMap;
        if (O && Object.prototype.hasOwnProperty.call(O, C))
          return O[C];
        T = T.nodeType == m ? T.ownerDocument : T.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function(C) {
      var T = this.lookupPrefix(C);
      return T == null;
    }
  };
  function ge(C) {
    return C == "<" && "&lt;" || C == ">" && "&gt;" || C == "&" && "&amp;" || C == '"' && "&quot;" || "&#" + C.charCodeAt() + ";";
  }
  u(h, ne), u(h, ne.prototype);
  function Be(C, T) {
    if (T(C))
      return !0;
    if (C = C.firstChild)
      do
        if (Be(C, T))
          return !0;
      while (C = C.nextSibling);
  }
  function pe() {
    this.ownerDocument = this;
  }
  function Ce(C, T, O) {
    C && C._inc++;
    var J = O.namespaceURI;
    J === t.XMLNS && (T._nsMap[O.prefix ? O.localName : ""] = O.value);
  }
  function Me(C, T, O, J) {
    C && C._inc++;
    var le = O.namespaceURI;
    le === t.XMLNS && delete T._nsMap[O.prefix ? O.localName : ""];
  }
  function Ye(C, T, O) {
    if (C && C._inc) {
      C._inc++;
      var J = T.childNodes;
      if (O)
        J[J.length++] = O;
      else {
        for (var le = T.firstChild, Ee = 0; le; )
          J[Ee++] = le, le = le.nextSibling;
        J.length = Ee, delete J[J.length];
      }
    }
  }
  function Te(C, T) {
    var O = T.previousSibling, J = T.nextSibling;
    return O ? O.nextSibling = J : C.firstChild = J, J ? J.previousSibling = O : C.lastChild = O, T.parentNode = null, T.previousSibling = null, T.nextSibling = null, Ye(C.ownerDocument, C), T;
  }
  function qe(C) {
    return C && (C.nodeType === ne.DOCUMENT_NODE || C.nodeType === ne.DOCUMENT_FRAGMENT_NODE || C.nodeType === ne.ELEMENT_NODE);
  }
  function ht(C) {
    return C && (De(C) || Re(C) || it(C) || C.nodeType === ne.DOCUMENT_FRAGMENT_NODE || C.nodeType === ne.COMMENT_NODE || C.nodeType === ne.PROCESSING_INSTRUCTION_NODE);
  }
  function it(C) {
    return C && C.nodeType === ne.DOCUMENT_TYPE_NODE;
  }
  function De(C) {
    return C && C.nodeType === ne.ELEMENT_NODE;
  }
  function Re(C) {
    return C && C.nodeType === ne.TEXT_NODE;
  }
  function _e(C, T) {
    var O = C.childNodes || [];
    if (e(O, De) || it(T))
      return !1;
    var J = e(O, it);
    return !(T && J && O.indexOf(J) > O.indexOf(T));
  }
  function Ct(C, T) {
    var O = C.childNodes || [];
    function J(Ee) {
      return De(Ee) && Ee !== T;
    }
    if (e(O, J))
      return !1;
    var le = e(O, it);
    return !(T && le && O.indexOf(le) > O.indexOf(T));
  }
  function Ve(C, T, O) {
    if (!qe(C))
      throw new q(k, "Unexpected parent node type " + C.nodeType);
    if (O && O.parentNode !== C)
      throw new q(H, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !ht(T) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      it(T) && C.nodeType !== ne.DOCUMENT_NODE
    )
      throw new q(
        k,
        "Unexpected node type " + T.nodeType + " for parent node type " + C.nodeType
      );
  }
  function se(C, T, O) {
    var J = C.childNodes || [], le = T.childNodes || [];
    if (T.nodeType === ne.DOCUMENT_FRAGMENT_NODE) {
      var Ee = le.filter(De);
      if (Ee.length > 1 || e(le, Re))
        throw new q(k, "More than one element or text in fragment");
      if (Ee.length === 1 && !_e(C, O))
        throw new q(k, "Element in fragment can not be inserted before doctype");
    }
    if (De(T) && !_e(C, O))
      throw new q(k, "Only one element can be added and only after doctype");
    if (it(T)) {
      if (e(J, it))
        throw new q(k, "Only one doctype is allowed");
      var Ge = e(J, De);
      if (O && J.indexOf(Ge) < J.indexOf(O))
        throw new q(k, "Doctype can only be inserted before an element");
      if (!O && Ge)
        throw new q(k, "Doctype can not be appended since element is present");
    }
  }
  function Fe(C, T, O) {
    var J = C.childNodes || [], le = T.childNodes || [];
    if (T.nodeType === ne.DOCUMENT_FRAGMENT_NODE) {
      var Ee = le.filter(De);
      if (Ee.length > 1 || e(le, Re))
        throw new q(k, "More than one element or text in fragment");
      if (Ee.length === 1 && !Ct(C, O))
        throw new q(k, "Element in fragment can not be inserted before doctype");
    }
    if (De(T) && !Ct(C, O))
      throw new q(k, "Only one element can be added and only after doctype");
    if (it(T)) {
      if (e(J, function(Nt) {
        return it(Nt) && Nt !== O;
      }))
        throw new q(k, "Only one doctype is allowed");
      var Ge = e(J, De);
      if (O && J.indexOf(Ge) < J.indexOf(O))
        throw new q(k, "Doctype can only be inserted before an element");
    }
  }
  function lt(C, T, O, J) {
    Ve(C, T, O), C.nodeType === ne.DOCUMENT_NODE && (J || se)(C, T, O);
    var le = T.parentNode;
    if (le && le.removeChild(T), T.nodeType === A) {
      var Ee = T.firstChild;
      if (Ee == null)
        return T;
      var Ge = T.lastChild;
    } else
      Ee = Ge = T;
    var mt = O ? O.previousSibling : C.lastChild;
    Ee.previousSibling = mt, Ge.nextSibling = O, mt ? mt.nextSibling = Ee : C.firstChild = Ee, O == null ? C.lastChild = Ge : O.previousSibling = Ge;
    do {
      Ee.parentNode = C;
      var Nt = C.ownerDocument || C;
      St(Ee, Nt);
    } while (Ee !== Ge && (Ee = Ee.nextSibling));
    return Ye(C.ownerDocument || C, C), T.nodeType == A && (T.firstChild = T.lastChild = null), T;
  }
  function St(C, T) {
    if (C.ownerDocument !== T) {
      if (C.ownerDocument = T, C.nodeType === f && C.attributes)
        for (var O = 0; O < C.attributes.length; O++) {
          var J = C.attributes.item(O);
          J && (J.ownerDocument = T);
        }
      for (var le = C.firstChild; le; )
        St(le, T), le = le.nextSibling;
    }
  }
  function Oe(C, T) {
    T.parentNode && T.parentNode.removeChild(T), T.parentNode = C, T.previousSibling = C.lastChild, T.nextSibling = null, T.previousSibling ? T.previousSibling.nextSibling = T : C.firstChild = T, C.lastChild = T, Ye(C.ownerDocument, C, T);
    var O = C.ownerDocument || C;
    return St(T, O), T;
  }
  pe.prototype = {
    //implementation : null,
    nodeName: "#document",
    nodeType: G,
    /**
     * The DocumentType node of the document.
     *
     * @readonly
     * @type DocumentType
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(C, T) {
      if (C.nodeType == A) {
        for (var O = C.firstChild; O; ) {
          var J = O.nextSibling;
          this.insertBefore(O, T), O = J;
        }
        return C;
      }
      return lt(this, C, T), St(C, this), this.documentElement === null && C.nodeType === f && (this.documentElement = C), C;
    },
    removeChild: function(C) {
      return this.documentElement == C && (this.documentElement = null), Te(this, C);
    },
    replaceChild: function(C, T) {
      lt(this, C, T, Fe), St(C, this), T && this.removeChild(T), De(C) && (this.documentElement = C);
    },
    // Introduced in DOM Level 2:
    importNode: function(C, T) {
      return qr(this, C, T);
    },
    // Introduced in DOM Level 2:
    getElementById: function(C) {
      var T = null;
      return Be(this.documentElement, function(O) {
        if (O.nodeType == f && O.getAttribute("id") == C)
          return T = O, !0;
      }), T;
    },
    /**
     * The `getElementsByClassName` method of `Document` interface returns an array-like object
     * of all child elements which have **all** of the given class name(s).
     *
     * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
     *
     *
     * Warning: This is a live LiveNodeList.
     * Changes in the DOM will reflect in the array as the changes occur.
     * If an element selected by this array no longer qualifies for the selector,
     * it will automatically be removed. Be aware of this for iteration purposes.
     *
     * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
     */
    getElementsByClassName: function(C) {
      var T = a(C);
      return new Q(this, function(O) {
        var J = [];
        return T.length > 0 && Be(O.documentElement, function(le) {
          if (le !== O && le.nodeType === f) {
            var Ee = le.getAttribute("class");
            if (Ee) {
              var Ge = C === Ee;
              if (!Ge) {
                var mt = a(Ee);
                Ge = T.every(l(mt));
              }
              Ge && J.push(le);
            }
          }
        }), J;
      });
    },
    //document factory method:
    createElement: function(C) {
      var T = new ke();
      T.ownerDocument = this, T.nodeName = C, T.tagName = C, T.localName = C, T.childNodes = new ee();
      var O = T.attributes = new V();
      return O._ownerElement = T, T;
    },
    createDocumentFragment: function() {
      var C = new z();
      return C.ownerDocument = this, C.childNodes = new ee(), C;
    },
    createTextNode: function(C) {
      var T = new bt();
      return T.ownerDocument = this, T.appendData(C), T;
    },
    createComment: function(C) {
      var T = new _n();
      return T.ownerDocument = this, T.appendData(C), T;
    },
    createCDATASection: function(C) {
      var T = new N();
      return T.ownerDocument = this, T.appendData(C), T;
    },
    createProcessingInstruction: function(C, T) {
      var O = new te();
      return O.ownerDocument = this, O.tagName = O.nodeName = O.target = C, O.nodeValue = O.data = T, O;
    },
    createAttribute: function(C) {
      var T = new It();
      return T.ownerDocument = this, T.name = C, T.nodeName = C, T.localName = C, T.specified = !0, T;
    },
    createEntityReference: function(C) {
      var T = new W();
      return T.ownerDocument = this, T.nodeName = C, T;
    },
    // Introduced in DOM Level 2:
    createElementNS: function(C, T) {
      var O = new ke(), J = T.split(":"), le = O.attributes = new V();
      return O.childNodes = new ee(), O.ownerDocument = this, O.nodeName = T, O.tagName = T, O.namespaceURI = C, J.length == 2 ? (O.prefix = J[0], O.localName = J[1]) : O.localName = T, le._ownerElement = O, O;
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function(C, T) {
      var O = new It(), J = T.split(":");
      return O.ownerDocument = this, O.nodeName = T, O.name = T, O.namespaceURI = C, O.specified = !0, J.length == 2 ? (O.prefix = J[0], O.localName = J[1]) : O.localName = T, O;
    }
  }, c(pe, ne);
  function ke() {
    this._nsMap = {};
  }
  ke.prototype = {
    nodeType: f,
    hasAttribute: function(C) {
      return this.getAttributeNode(C) != null;
    },
    getAttribute: function(C) {
      var T = this.getAttributeNode(C);
      return T && T.value || "";
    },
    getAttributeNode: function(C) {
      return this.attributes.getNamedItem(C);
    },
    setAttribute: function(C, T) {
      var O = this.ownerDocument.createAttribute(C);
      O.value = O.nodeValue = "" + T, this.setAttributeNode(O);
    },
    removeAttribute: function(C) {
      var T = this.getAttributeNode(C);
      T && this.removeAttributeNode(T);
    },
    //four real opeartion method
    appendChild: function(C) {
      return C.nodeType === A ? this.insertBefore(C, null) : Oe(this, C);
    },
    setAttributeNode: function(C) {
      return this.attributes.setNamedItem(C);
    },
    setAttributeNodeNS: function(C) {
      return this.attributes.setNamedItemNS(C);
    },
    removeAttributeNode: function(C) {
      return this.attributes.removeNamedItem(C.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(C, T) {
      var O = this.getAttributeNodeNS(C, T);
      O && this.removeAttributeNode(O);
    },
    hasAttributeNS: function(C, T) {
      return this.getAttributeNodeNS(C, T) != null;
    },
    getAttributeNS: function(C, T) {
      var O = this.getAttributeNodeNS(C, T);
      return O && O.value || "";
    },
    setAttributeNS: function(C, T, O) {
      var J = this.ownerDocument.createAttributeNS(C, T);
      J.value = J.nodeValue = "" + O, this.setAttributeNode(J);
    },
    getAttributeNodeNS: function(C, T) {
      return this.attributes.getNamedItemNS(C, T);
    },
    getElementsByTagName: function(C) {
      return new Q(this, function(T) {
        var O = [];
        return Be(T, function(J) {
          J !== T && J.nodeType == f && (C === "*" || J.tagName == C) && O.push(J);
        }), O;
      });
    },
    getElementsByTagNameNS: function(C, T) {
      return new Q(this, function(O) {
        var J = [];
        return Be(O, function(le) {
          le !== O && le.nodeType === f && (C === "*" || le.namespaceURI === C) && (T === "*" || le.localName == T) && J.push(le);
        }), J;
      });
    }
  }, pe.prototype.getElementsByTagName = ke.prototype.getElementsByTagName, pe.prototype.getElementsByTagNameNS = ke.prototype.getElementsByTagNameNS, c(ke, ne);
  function It() {
  }
  It.prototype.nodeType = m, c(It, ne);
  function ln() {
  }
  ln.prototype = {
    data: "",
    substringData: function(C, T) {
      return this.data.substring(C, C + T);
    },
    appendData: function(C) {
      C = this.data + C, this.nodeValue = this.data = C, this.length = C.length;
    },
    insertData: function(C, T) {
      this.replaceData(C, 0, T);
    },
    appendChild: function(C) {
      throw new Error(j[k]);
    },
    deleteData: function(C, T) {
      this.replaceData(C, T, "");
    },
    replaceData: function(C, T, O) {
      var J = this.data.substring(0, C), le = this.data.substring(C + T);
      O = J + O + le, this.nodeValue = this.data = O, this.length = O.length;
    }
  }, c(ln, ne);
  function bt() {
  }
  bt.prototype = {
    nodeName: "#text",
    nodeType: v,
    splitText: function(C) {
      var T = this.data, O = T.substring(C);
      T = T.substring(0, C), this.data = this.nodeValue = T, this.length = T.length;
      var J = this.ownerDocument.createTextNode(O);
      return this.parentNode && this.parentNode.insertBefore(J, this.nextSibling), J;
    }
  }, c(bt, ln);
  function _n() {
  }
  _n.prototype = {
    nodeName: "#comment",
    nodeType: R
  }, c(_n, ln);
  function N() {
  }
  N.prototype = {
    nodeName: "#cdata-section",
    nodeType: w
  }, c(N, ln);
  function p() {
  }
  p.prototype.nodeType = Y, c(p, ne);
  function g() {
  }
  g.prototype.nodeType = K, c(g, ne);
  function I() {
  }
  I.prototype.nodeType = x, c(I, ne);
  function W() {
  }
  W.prototype.nodeType = b, c(W, ne);
  function z() {
  }
  z.prototype.nodeName = "#document-fragment", z.prototype.nodeType = A, c(z, ne);
  function te() {
  }
  te.prototype.nodeType = _, c(te, ne);
  function Ae() {
  }
  Ae.prototype.serializeToString = function(C, T, O) {
    return Ke.call(C, T, O);
  }, ne.prototype.toString = Ke;
  function Ke(C, T) {
    var O = [], J = this.nodeType == 9 && this.documentElement || this, le = J.prefix, Ee = J.namespaceURI;
    if (Ee && le == null) {
      var le = J.lookupPrefix(Ee);
      if (le == null)
        var Ge = [
          { namespace: Ee, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return Le(this, O, C, T, Ge), O.join("");
  }
  function Pe(C, T, O) {
    var J = C.prefix || "", le = C.namespaceURI;
    if (!le || J === "xml" && le === t.XML || le === t.XMLNS)
      return !1;
    for (var Ee = O.length; Ee--; ) {
      var Ge = O[Ee];
      if (Ge.prefix === J)
        return Ge.namespace !== le;
    }
    return !0;
  }
  function He(C, T, O) {
    C.push(" ", T, '="', O.replace(/[<>&"\t\n\r]/g, ge), '"');
  }
  function Le(C, T, O, J, le) {
    if (le || (le = []), J)
      if (C = J(C), C) {
        if (typeof C == "string") {
          T.push(C);
          return;
        }
      } else
        return;
    switch (C.nodeType) {
      case f:
        var Ee = C.attributes, Ge = Ee.length, ot = C.firstChild, mt = C.tagName;
        O = t.isHTML(C.namespaceURI) || O;
        var Nt = mt;
        if (!O && !C.prefix && C.namespaceURI) {
          for (var Ot, Ut = 0; Ut < Ee.length; Ut++)
            if (Ee.item(Ut).name === "xmlns") {
              Ot = Ee.item(Ut).value;
              break;
            }
          if (!Ot)
            for (var on = le.length - 1; on >= 0; on--) {
              var un = le[on];
              if (un.prefix === "" && un.namespace === C.namespaceURI) {
                Ot = un.namespace;
                break;
              }
            }
          if (Ot !== C.namespaceURI)
            for (var on = le.length - 1; on >= 0; on--) {
              var un = le[on];
              if (un.namespace === C.namespaceURI) {
                un.prefix && (Nt = un.prefix + ":" + mt);
                break;
              }
            }
        }
        T.push("<", Nt);
        for (var ft = 0; ft < Ge; ft++) {
          var nt = Ee.item(ft);
          nt.prefix == "xmlns" ? le.push({ prefix: nt.localName, namespace: nt.value }) : nt.nodeName == "xmlns" && le.push({ prefix: "", namespace: nt.value });
        }
        for (var ft = 0; ft < Ge; ft++) {
          var nt = Ee.item(ft);
          if (Pe(nt, O, le)) {
            var cn = nt.prefix || "", Sn = nt.namespaceURI;
            He(T, cn ? "xmlns:" + cn : "xmlns", Sn), le.push({ prefix: cn, namespace: Sn });
          }
          Le(nt, T, O, J, le);
        }
        if (mt === Nt && Pe(C, O, le)) {
          var cn = C.prefix || "", Sn = C.namespaceURI;
          He(T, cn ? "xmlns:" + cn : "xmlns", Sn), le.push({ prefix: cn, namespace: Sn });
        }
        if (ot || O && !/^(?:meta|link|img|br|hr|input)$/i.test(mt)) {
          if (T.push(">"), O && /^script$/i.test(mt))
            for (; ot; )
              ot.data ? T.push(ot.data) : Le(ot, T, O, J, le.slice()), ot = ot.nextSibling;
          else
            for (; ot; )
              Le(ot, T, O, J, le.slice()), ot = ot.nextSibling;
          T.push("</", Nt, ">");
        } else
          T.push("/>");
        return;
      case G:
      case A:
        for (var ot = C.firstChild; ot; )
          Le(ot, T, O, J, le.slice()), ot = ot.nextSibling;
        return;
      case m:
        return He(T, C.name, C.value);
      case v:
        return T.push(
          C.data.replace(/[<&>]/g, ge)
        );
      case w:
        return T.push("<![CDATA[", C.data, "]]>");
      case R:
        return T.push("<!--", C.data, "-->");
      case Y:
        var gr = C.publicId, wn = C.systemId;
        if (T.push("<!DOCTYPE ", C.name), gr)
          T.push(" PUBLIC ", gr), wn && wn != "." && T.push(" ", wn), T.push(">");
        else if (wn && wn != ".")
          T.push(" SYSTEM ", wn, ">");
        else {
          var Qe = C.internalSubset;
          Qe && T.push(" [", Qe, "]"), T.push(">");
        }
        return;
      case _:
        return T.push("<?", C.target, " ", C.data, "?>");
      case b:
        return T.push("&", C.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        T.push("??", C.nodeName);
    }
  }
  function qr(C, T, O) {
    var J;
    switch (T.nodeType) {
      case f:
        J = T.cloneNode(!1), J.ownerDocument = C;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case A:
        break;
      case m:
        O = !0;
        break;
    }
    if (J || (J = T.cloneNode(!1)), J.ownerDocument = C, J.parentNode = null, O)
      for (var le = T.firstChild; le; )
        J.appendChild(qr(C, le, O)), le = le.nextSibling;
    return J;
  }
  function pr(C, T, O) {
    var J = new T.constructor();
    for (var le in T)
      if (Object.prototype.hasOwnProperty.call(T, le)) {
        var Ee = T[le];
        typeof Ee != "object" && Ee != J[le] && (J[le] = Ee);
      }
    switch (T.childNodes && (J.childNodes = new ee()), J.ownerDocument = C, J.nodeType) {
      case f:
        var Ge = T.attributes, mt = J.attributes = new V(), Nt = Ge.length;
        mt._ownerElement = J;
        for (var Ot = 0; Ot < Nt; Ot++)
          J.setAttributeNode(pr(C, Ge.item(Ot), !0));
        break;
      case m:
        O = !0;
    }
    if (O)
      for (var Ut = T.firstChild; Ut; )
        J.appendChild(pr(C, Ut, O)), Ut = Ut.nextSibling;
    return J;
  }
  function mr(C, T, O) {
    C[T] = O;
  }
  try {
    if (Object.defineProperty) {
      let C = function(T) {
        switch (T.nodeType) {
          case f:
          case A:
            var O = [];
            for (T = T.firstChild; T; )
              T.nodeType !== 7 && T.nodeType !== 8 && O.push(C(T)), T = T.nextSibling;
            return O.join("");
          default:
            return T.nodeValue;
        }
      };
      Object.defineProperty(Q.prototype, "length", {
        get: function() {
          return S(this), this.$$length;
        }
      }), Object.defineProperty(ne.prototype, "textContent", {
        get: function() {
          return C(this);
        },
        set: function(T) {
          switch (this.nodeType) {
            case f:
            case A:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (T || String(T)) && this.appendChild(this.ownerDocument.createTextNode(T));
              break;
            default:
              this.data = T, this.value = T, this.nodeValue = T;
          }
        }
      }), mr = function(T, O, J) {
        T["$$" + O] = J;
      };
    }
  } catch {
  }
  return hn.DocumentType = p, hn.DOMException = q, hn.DOMImplementation = oe, hn.Element = ke, hn.Node = ne, hn.NodeList = ee, hn.XMLSerializer = Ae, hn;
}
var Er = {}, Ka = {}, Os;
function Xc() {
  return Os || (Os = 1, (function(n) {
    var e = Sa().freeze;
    n.XML_ENTITIES = e({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }), n.HTML_ENTITIES = e({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: `
`,
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    }), n.entityMap = n.HTML_ENTITIES;
  })(Ka)), Ka;
}
var aa = {}, Us;
function zc() {
  if (Us) return aa;
  Us = 1;
  var n = Sa().NAMESPACE, e = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, t = new RegExp("[\\-\\.0-9" + e.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), r = new RegExp("^" + e.source + t.source + "*(?::" + e.source + t.source + "*)?$"), i = 0, s = 1, a = 2, l = 3, u = 4, c = 5, h = 6, f = 7;
  function m(k, H) {
    this.message = k, this.locator = H, Error.captureStackTrace && Error.captureStackTrace(this, m);
  }
  m.prototype = new Error(), m.prototype.name = m.name;
  function v() {
  }
  v.prototype = {
    parse: function(k, H, $) {
      var q = this.domBuilder;
      q.startDocument(), Y(H, H = {}), w(
        k,
        H,
        $,
        q,
        this.errorHandler
      ), q.endDocument();
    }
  };
  function w(k, H, $, q, ee) {
    function Q(Oe) {
      if (Oe > 65535) {
        Oe -= 65536;
        var ke = 55296 + (Oe >> 10), It = 56320 + (Oe & 1023);
        return String.fromCharCode(ke, It);
      } else
        return String.fromCharCode(Oe);
    }
    function S(Oe) {
      var ke = Oe.slice(1, -1);
      return Object.hasOwnProperty.call($, ke) ? $[ke] : ke.charAt(0) === "#" ? Q(parseInt(ke.substr(1).replace("x", "0x"))) : (ee.error("entity not found:" + Oe), Oe);
    }
    function V(Oe) {
      if (Oe > pe) {
        var ke = k.substring(pe, Oe).replace(/&#?\w+;/g, S);
        ne && Z(pe), q.characters(ke, 0, Oe - pe), pe = Oe;
      }
    }
    function Z(Oe, ke) {
      for (; Oe >= ie && (ke = oe.exec(k)); )
        ae = ke.index, ie = ae + ke[0].length, ne.lineNumber++;
      ne.columnNumber = Oe - ae + 1;
    }
    for (var ae = 0, ie = 0, oe = /.*(?:\r\n?|\n)|.*$/g, ne = q.locator, ge = [{ currentNSMap: H }], Be = {}, pe = 0; ; ) {
      try {
        var Ce = k.indexOf("<", pe);
        if (Ce < 0) {
          if (!k.substr(pe).match(/^\s*$/)) {
            var Me = q.doc, Ye = Me.createTextNode(k.substr(pe));
            Me.appendChild(Ye), q.currentElement = Ye;
          }
          return;
        }
        switch (Ce > pe && V(Ce), k.charAt(Ce + 1)) {
          case "/":
            var Ve = k.indexOf(">", Ce + 3), Te = k.substring(Ce + 2, Ve).replace(/[ \t\n\r]+$/g, ""), qe = ge.pop();
            Ve < 0 ? (Te = k.substring(Ce + 2).replace(/[\s<].*/, ""), ee.error("end tag name: " + Te + " is not complete:" + qe.tagName), Ve = Ce + 1 + Te.length) : Te.match(/\s</) && (Te = Te.replace(/[\s<].*/, ""), ee.error("end tag name: " + Te + " maybe not complete"), Ve = Ce + 1 + Te.length);
            var ht = qe.localNSMap, it = qe.tagName == Te, De = it || qe.tagName && qe.tagName.toLowerCase() == Te.toLowerCase();
            if (De) {
              if (q.endElement(qe.uri, qe.localName, Te), ht)
                for (var Re in ht)
                  Object.prototype.hasOwnProperty.call(ht, Re) && q.endPrefixMapping(Re);
              it || ee.fatalError("end tag name: " + Te + " is not match the current start tagName:" + qe.tagName);
            } else
              ge.push(qe);
            Ve++;
            break;
          // end elment
          case "?":
            ne && Z(Ce), Ve = K(k, Ce, q);
            break;
          case "!":
            ne && Z(Ce), Ve = A(k, Ce, q, ee);
            break;
          default:
            ne && Z(Ce);
            var _e = new M(), Ct = ge[ge.length - 1].currentNSMap, Ve = x(k, Ce, _e, Ct, S, ee), se = _e.length;
            if (!_e.closed && G(k, Ve, _e.tagName, Be) && (_e.closed = !0, $.nbsp || ee.warning("unclosed xml attribute")), ne && se) {
              for (var Fe = b(ne, {}), lt = 0; lt < se; lt++) {
                var St = _e[lt];
                Z(St.offset), St.locator = b(ne, {});
              }
              q.locator = Fe, _(_e, q, Ct) && ge.push(_e), q.locator = ne;
            } else
              _(_e, q, Ct) && ge.push(_e);
            n.isHTML(_e.uri) && !_e.closed ? Ve = R(k, Ve, _e.tagName, S, q) : Ve++;
        }
      } catch (Oe) {
        if (Oe instanceof m)
          throw Oe;
        ee.error("element parse error: " + Oe), Ve = -1;
      }
      Ve > pe ? pe = Ve : V(Math.max(Ce, pe) + 1);
    }
  }
  function b(k, H) {
    return H.lineNumber = k.lineNumber, H.columnNumber = k.columnNumber, H;
  }
  function x(k, H, $, q, ee, Q) {
    function S(ne, ge, Be) {
      $.attributeNames.hasOwnProperty(ne) && Q.fatalError("Attribute " + ne + " redefined"), $.addValue(
        ne,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        ge.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, ee),
        Be
      );
    }
    for (var V, Z, ae = ++H, ie = i; ; ) {
      var oe = k.charAt(ae);
      switch (oe) {
        case "=":
          if (ie === s)
            V = k.slice(H, ae), ie = l;
          else if (ie === a)
            ie = l;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (ie === l || ie === s)
            if (ie === s && (Q.warning('attribute value must after "="'), V = k.slice(H, ae)), H = ae + 1, ae = k.indexOf(oe, H), ae > 0)
              Z = k.slice(H, ae), S(V, Z, H - 1), ie = c;
            else
              throw new Error("attribute value no end '" + oe + "' match");
          else if (ie == u)
            Z = k.slice(H, ae), S(V, Z, H), Q.warning('attribute "' + V + '" missed start quot(' + oe + ")!!"), H = ae + 1, ie = c;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (ie) {
            case i:
              $.setTagName(k.slice(H, ae));
            case c:
            case h:
            case f:
              ie = f, $.closed = !0;
            case u:
            case s:
              break;
            case a:
              $.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return Q.error("unexpected end of input"), ie == i && $.setTagName(k.slice(H, ae)), ae;
        case ">":
          switch (ie) {
            case i:
              $.setTagName(k.slice(H, ae));
            case c:
            case h:
            case f:
              break;
            //normal
            case u:
            //Compatible state
            case s:
              Z = k.slice(H, ae), Z.slice(-1) === "/" && ($.closed = !0, Z = Z.slice(0, -1));
            case a:
              ie === a && (Z = V), ie == u ? (Q.warning('attribute "' + Z + '" missed quot(")!'), S(V, Z, H)) : ((!n.isHTML(q[""]) || !Z.match(/^(?:disabled|checked|selected)$/i)) && Q.warning('attribute "' + Z + '" missed value!! "' + Z + '" instead!!'), S(Z, Z, H));
              break;
            case l:
              throw new Error("attribute value missed!!");
          }
          return ae;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          oe = " ";
        default:
          if (oe <= " ")
            switch (ie) {
              case i:
                $.setTagName(k.slice(H, ae)), ie = h;
                break;
              case s:
                V = k.slice(H, ae), ie = a;
                break;
              case u:
                var Z = k.slice(H, ae);
                Q.warning('attribute "' + Z + '" missed quot(")!!'), S(V, Z, H);
              case c:
                ie = h;
                break;
            }
          else
            switch (ie) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case a:
                $.tagName, (!n.isHTML(q[""]) || !V.match(/^(?:disabled|checked|selected)$/i)) && Q.warning('attribute "' + V + '" missed value!! "' + V + '" instead2!!'), S(V, V, H), H = ae, ie = s;
                break;
              case c:
                Q.warning('attribute space is required"' + V + '"!!');
              case h:
                ie = s, H = ae;
                break;
              case l:
                ie = u, H = ae;
                break;
              case f:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      ae++;
    }
  }
  function _(k, H, $) {
    for (var q = k.tagName, ee = null, oe = k.length; oe--; ) {
      var Q = k[oe], S = Q.qName, V = Q.value, ne = S.indexOf(":");
      if (ne > 0)
        var Z = Q.prefix = S.slice(0, ne), ae = S.slice(ne + 1), ie = Z === "xmlns" && ae;
      else
        ae = S, Z = null, ie = S === "xmlns" && "";
      Q.localName = ae, ie !== !1 && (ee == null && (ee = {}, Y($, $ = {})), $[ie] = ee[ie] = V, Q.uri = n.XMLNS, H.startPrefixMapping(ie, V));
    }
    for (var oe = k.length; oe--; ) {
      Q = k[oe];
      var Z = Q.prefix;
      Z && (Z === "xml" && (Q.uri = n.XML), Z !== "xmlns" && (Q.uri = $[Z || ""]));
    }
    var ne = q.indexOf(":");
    ne > 0 ? (Z = k.prefix = q.slice(0, ne), ae = k.localName = q.slice(ne + 1)) : (Z = null, ae = k.localName = q);
    var ge = k.uri = $[Z || ""];
    if (H.startElement(ge, ae, q, k), k.closed) {
      if (H.endElement(ge, ae, q), ee)
        for (Z in ee)
          Object.prototype.hasOwnProperty.call(ee, Z) && H.endPrefixMapping(Z);
    } else
      return k.currentNSMap = $, k.localNSMap = ee, !0;
  }
  function R(k, H, $, q, ee) {
    if (/^(?:script|textarea)$/i.test($)) {
      var Q = k.indexOf("</" + $ + ">", H), S = k.substring(H + 1, Q);
      if (/[&<]/.test(S))
        return /^script$/i.test($) ? (ee.characters(S, 0, S.length), Q) : (S = S.replace(/&#?\w+;/g, q), ee.characters(S, 0, S.length), Q);
    }
    return H + 1;
  }
  function G(k, H, $, q) {
    var ee = q[$];
    return ee == null && (ee = k.lastIndexOf("</" + $ + ">"), ee < H && (ee = k.lastIndexOf("</" + $)), q[$] = ee), ee < H;
  }
  function Y(k, H) {
    for (var $ in k)
      Object.prototype.hasOwnProperty.call(k, $) && (H[$] = k[$]);
  }
  function A(k, H, $, q) {
    var ee = k.charAt(H + 2);
    switch (ee) {
      case "-":
        if (k.charAt(H + 3) === "-") {
          var Q = k.indexOf("-->", H + 4);
          return Q > H ? ($.comment(k, H + 4, Q - H - 4), Q + 3) : (q.error("Unclosed comment"), -1);
        } else
          return -1;
      default:
        if (k.substr(H + 3, 6) == "CDATA[") {
          var Q = k.indexOf("]]>", H + 9);
          return $.startCDATA(), $.characters(k, H + 9, Q - H - 9), $.endCDATA(), Q + 3;
        }
        var S = j(k, H), V = S.length;
        if (V > 1 && /!doctype/i.test(S[0][0])) {
          var Z = S[1][0], ae = !1, ie = !1;
          V > 3 && (/^public$/i.test(S[2][0]) ? (ae = S[3][0], ie = V > 4 && S[4][0]) : /^system$/i.test(S[2][0]) && (ie = S[3][0]));
          var oe = S[V - 1];
          return $.startDTD(Z, ae, ie), $.endDTD(), oe.index + oe[0].length;
        }
    }
    return -1;
  }
  function K(k, H, $) {
    var q = k.indexOf("?>", H);
    if (q) {
      var ee = k.substring(H, q).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
      return ee ? (ee[0].length, $.processingInstruction(ee[1], ee[2]), q + 2) : -1;
    }
    return -1;
  }
  function M() {
    this.attributeNames = {};
  }
  M.prototype = {
    setTagName: function(k) {
      if (!r.test(k))
        throw new Error("invalid tagName:" + k);
      this.tagName = k;
    },
    addValue: function(k, H, $) {
      if (!r.test(k))
        throw new Error("invalid attribute:" + k);
      this.attributeNames[k] = this.length, this[this.length++] = { qName: k, value: H, offset: $ };
    },
    length: 0,
    getLocalName: function(k) {
      return this[k].localName;
    },
    getLocator: function(k) {
      return this[k].locator;
    },
    getQName: function(k) {
      return this[k].qName;
    },
    getURI: function(k) {
      return this[k].uri;
    },
    getValue: function(k) {
      return this[k].value;
    }
    //	,getIndex:function(uri, localName)){
    //		if(localName){
    //
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},
  };
  function j(k, H) {
    var $, q = [], ee = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    for (ee.lastIndex = H, ee.exec(k); $ = ee.exec(k); )
      if (q.push($), $[1]) return q;
  }
  return aa.XMLReader = v, aa.ParseError = m, aa;
}
var Ms;
function Jc() {
  if (Ms) return Er;
  Ms = 1;
  var n = Sa(), e = Rl(), t = Xc(), r = zc(), i = e.DOMImplementation, s = n.NAMESPACE, a = r.ParseError, l = r.XMLReader;
  function u(x) {
    return x.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
  }
  function c(x) {
    this.options = x || { locator: {} };
  }
  c.prototype.parseFromString = function(x, _) {
    var R = this.options, G = new l(), Y = R.domBuilder || new f(), A = R.errorHandler, K = R.locator, M = R.xmlns || {}, j = /\/x?html?$/.test(_), k = j ? t.HTML_ENTITIES : t.XML_ENTITIES;
    K && Y.setDocumentLocator(K), G.errorHandler = h(A, Y, K), G.domBuilder = R.domBuilder || Y, j && (M[""] = s.HTML), M.xml = M.xml || s.XML;
    var H = R.normalizeLineEndings || u;
    return x && typeof x == "string" ? G.parse(
      H(x),
      M,
      k
    ) : G.errorHandler.error("invalid doc source"), Y.doc;
  };
  function h(x, _, R) {
    if (!x) {
      if (_ instanceof f)
        return _;
      x = _;
    }
    var G = {}, Y = x instanceof Function;
    R = R || {};
    function A(K) {
      var M = x[K];
      !M && Y && (M = x.length == 2 ? function(j) {
        x(K, j);
      } : x), G[K] = M && function(j) {
        M("[xmldom " + K + "]	" + j + v(R));
      } || function() {
      };
    }
    return A("warning"), A("error"), A("fatalError"), G;
  }
  function f() {
    this.cdata = !1;
  }
  function m(x, _) {
    _.lineNumber = x.lineNumber, _.columnNumber = x.columnNumber;
  }
  f.prototype = {
    startDocument: function() {
      this.doc = new i().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
    },
    startElement: function(x, _, R, G) {
      var Y = this.doc, A = Y.createElementNS(x, R || _), K = G.length;
      b(this, A), this.currentElement = A, this.locator && m(this.locator, A);
      for (var M = 0; M < K; M++) {
        var x = G.getURI(M), j = G.getValue(M), R = G.getQName(M), k = Y.createAttributeNS(x, R);
        this.locator && m(G.getLocator(M), k), k.value = k.nodeValue = j, A.setAttributeNode(k);
      }
    },
    endElement: function(x, _, R) {
      var G = this.currentElement;
      G.tagName, this.currentElement = G.parentNode;
    },
    startPrefixMapping: function(x, _) {
    },
    endPrefixMapping: function(x) {
    },
    processingInstruction: function(x, _) {
      var R = this.doc.createProcessingInstruction(x, _);
      this.locator && m(this.locator, R), b(this, R);
    },
    ignorableWhitespace: function(x, _, R) {
    },
    characters: function(x, _, R) {
      if (x = w.apply(this, arguments), x) {
        if (this.cdata)
          var G = this.doc.createCDATASection(x);
        else
          var G = this.doc.createTextNode(x);
        this.currentElement ? this.currentElement.appendChild(G) : /^\s*$/.test(x) && this.doc.appendChild(G), this.locator && m(this.locator, G);
      }
    },
    skippedEntity: function(x) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    setDocumentLocator: function(x) {
      (this.locator = x) && (x.lineNumber = 0);
    },
    //LexicalHandler
    comment: function(x, _, R) {
      x = w.apply(this, arguments);
      var G = this.doc.createComment(x);
      this.locator && m(this.locator, G), b(this, G);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(x, _, R) {
      var G = this.doc.implementation;
      if (G && G.createDocumentType) {
        var Y = G.createDocumentType(x, _, R);
        this.locator && m(this.locator, Y), b(this, Y), this.doc.doctype = Y;
      }
    },
    /**
     * @see org.xml.sax.ErrorHandler
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(x) {
      console.warn("[xmldom warning]	" + x, v(this.locator));
    },
    error: function(x) {
      console.error("[xmldom error]	" + x, v(this.locator));
    },
    fatalError: function(x) {
      throw new a(x, this.locator);
    }
  };
  function v(x) {
    if (x)
      return `
@` + (x.systemId || "") + "#[line:" + x.lineNumber + ",col:" + x.columnNumber + "]";
  }
  function w(x, _, R) {
    return typeof x == "string" ? x.substr(_, R) : x.length >= _ + R || _ ? new java.lang.String(x, _, R) + "" : x;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(x) {
    f.prototype[x] = function() {
      return null;
    };
  });
  function b(x, _) {
    x.currentElement ? x.currentElement.appendChild(_) : x.doc.appendChild(_);
  }
  return Er.__DOMHandler = f, Er.normalizeLineEndings = u, Er.DOMParser = c, Er;
}
var Ps;
function Yc() {
  if (Ps) return wr;
  Ps = 1;
  var n = Rl();
  return wr.DOMImplementation = n.DOMImplementation, wr.XMLSerializer = n.XMLSerializer, wr.DOMParser = Jc().DOMParser, wr;
}
var $s = Yc();
function Qc(n) {
  return n = n.split(";")[0].trim(), new pt("http://www.w3.org/ns/iana/media-types/" + n + "#Resource");
}
function Zc(n, e) {
  n.callbacks = {};
  for (var t = e.length - 1; t >= 0; t--)
    n.callbacks[e[t]] = [];
  n.addHook = function(r) {
    n.callbacks[r] || (n.callbacks[r] = []);
  }, n.addCallback = function(r, i) {
    n.callbacks[r].push(i);
  }, n.removeCallback = function(r, i) {
    for (var s = 0; s < n.callbacks[r].length; s++)
      if (n.callbacks[r][s].name === i)
        return n.callbacks[r].splice(s, 1), !0;
    return !1;
  }, n.insertCallback = function(r, i) {
    n.callbacks[r].unshift(i);
  }, n.fireCallbacks = function(i, s) {
    var a = [], l = [], u = n.callbacks[i].length, c;
    let h;
    for (c = u - 1; c >= 0; c--)
      h = n.callbacks[i][c], h && h.apply(n, s) && a.push(h);
    for (c = a.length - 1; c >= 0; c--)
      l.push(a[c]);
    for (c = u; c < n.callbacks[i].length; c++)
      l.push(n.callbacks[i][c]);
    n.callbacks[i] = l;
  };
}
function ed(n, e) {
  e = e || {};
  var t = [];
  e && e.selfClosing && e.selfClosing.split(" ").forEach(function(i) {
    t[i] = !0;
  });
  var r = [];
  return e && e.skipAttributes && e.skipAttributes.split(" ").forEach(function(i) {
    r[i] = !0;
  }), kl(n, e, t, r);
}
function kl(n, e, t, r) {
  var i, s = "", a = [!1];
  if (typeof n.nodeType > "u") return s;
  if (n.nodeType === 1) {
    if (n.hasAttribute("class") && e && e.classWithChildText && n.matches(e.classWithChildText.class))
      s += n.querySelector(e.classWithChildText.element).textContent;
    else if (!(e && e.skipNodeWithClass && n.matches("." + e.skipNodeWithClass))) {
      var l = n.nodeName.toLowerCase();
      s += "<" + l;
      var u = [];
      for (i = n.attributes.length - 1; i >= 0; i--) {
        var c = n.attributes[i];
        if (!(r && r.length > 0 && r[c.name]) && !/^\d+$/.test(c.name)) {
          if (c.name === "class" && e && e.replaceClassItemWith && c.value.split(" ").indexOf(e.replaceClassItemWith.source) > -1) {
            var h = new RegExp(e.replaceClassItemWith.source, "g");
            c.value = c.value.replace(h, e.replaceClassItemWith.target).trim();
          }
          c.name === "class" && e && e.skipClassWithValue && e.skipClassWithValue === c.value || u.push(c.name + "='" + c.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&quot;") + "'");
        }
      }
      if (u.length > 0 && (e && e.sortAttributes && u.sort(function(m, v) {
        return m.toLowerCase().localeCompare(v.toLowerCase());
      }), s += " " + u.join(" ")), t && t.ename)
        s += " />";
      else {
        for (s += ">", s += l === "html" ? `
  ` : "", a.push(l === "style" || l === "script"), i = 0; i < n.childNodes.length; i++) s += kl(n.childNodes[i]);
        a.pop(), s += l === "body" ? "</" + l + `>
` : "</" + l + ">";
      }
    }
  } else if (n.nodeType === 8)
    s += "<!--" + n.nodeValue + "-->";
  else if (n.nodeType === 3 || n.nodeType === 4) {
    var f = n.nodeValue.replace(/\n+$/, "");
    s += a[a.length - 1] ? f : f.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  } else
    console.log("Warning; Cannot handle serialising nodes of type: " + n.nodeType), console.log(n);
  return s;
}
function Ga(n, e, t, r) {
  var i = function(l) {
    return l.termType === "BlankNode" ? null : l;
  }, s = function(l) {
    var u = t.statementsMatching(l).map(function(c) {
      return "" + i(c.subject) + " " + i(c.predicate) + " " + i(c.object);
    }).concat(t.statementsMatching(void 0, void 0, l).map(function(c) {
      return "" + i(c.subject) + " " + i(c.predicate) + " " + i(c.object);
    }));
    return u.sort(), u.join(`
`);
  };
  const a = Object.prototype.hasOwnProperty.call(t, "compareTerms") ? t.compareTerms(n, e) : n.compareTerm(e);
  return n.termType === "BlankNode" && e.termType === "BlankNode" ? a === 0 ? 0 : s(n) > s(e) ? 1 : s(n) < s(e) ? -1 : a : r && n.uri && e.uri ? (r[n.uri] || n.uri).localeCompare(r[e.uri] || e.uri) : a;
}
function td(n, e, t, r) {
  return Ga(n.subject, e.subject, t, r) || Ga(n.predicate, e.predicate, t, r) || Ga(n.object, e.object, t, r);
}
function sr(n, e) {
  var t;
  if (e = e || {}, typeof module < "u" && module && module.exports) {
    var r = new $s.DOMParser().parseFromString(n, e.contentType || "application/xhtml+xml");
    return r;
  } else
    typeof window < "u" && window.DOMParser ? t = new window.DOMParser() : t = new $s.DOMParser();
  return t.parseFromString(n, "application/xml");
}
function fi(n, e) {
  for (var t = 0; t < n.length; t++)
    if (n[t].subject.equals(e.subject) && n[t].predicate.equals(e.predicate) && n[t].object.equals(e.object) && n[t].why.equals(e.why)) {
      n.splice(t, 1);
      return;
    }
  throw new Error("RDFArrayRemove: Array did not contain " + e + " " + e.why);
}
function nd(n) {
  var e = "" + n + `
`;
  if (!n.stack)
    return e + `No stack available.
`;
  for (var t = n.stack.toString().split(`
`), r = [], i = 0; i < t.length; i++) {
    var s = t[i];
    if (s.indexOf("ecmaunit.js") > -1)
      break;
    s.charAt(0) == "(" && (s = "function" + s);
    var a = s.split("@");
    r.push(a);
  }
  for (var i = 0; i < r.length; i++)
    e += "  " + r[i][1] + `
    ` + r[i][0];
  return e;
}
function Ol(n = Pt) {
  return {
    boolean: n.namedNode("http://www.w3.org/2001/XMLSchema#boolean"),
    dateTime: n.namedNode("http://www.w3.org/2001/XMLSchema#dateTime"),
    decimal: n.namedNode("http://www.w3.org/2001/XMLSchema#decimal"),
    double: n.namedNode("http://www.w3.org/2001/XMLSchema#double"),
    integer: n.namedNode("http://www.w3.org/2001/XMLSchema#integer"),
    langString: n.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),
    string: n.namedNode("http://www.w3.org/2001/XMLSchema#string")
  };
}
Ol(Pt);
function Ul(n) {
  return new _i(n);
}
class _i {
  constructor(e) {
    re(this, "_notQNameChars", `	\r
 !"#$%&'()*,+/;<=>?@[\\]^\`{|}~`), re(this, "_notNameChars", this._notQNameChars + ":"), re(this, "validPrefix", new RegExp(/^[a-zA-Z][a-zA-Z0-9]*$/)), re(this, "forbidden1", new RegExp(/[\\"\b\f\r\v\t\n\u0080-\uffff]/gm)), re(this, "forbidden3", new RegExp(/[\\"\b\f\r\v\u0080-\uffff]/gm)), this.flags = "", this.base = null, this.prefixes = [], this.namespaces = [];
    const t = Object.keys(Bs());
    for (const r in t) {
      const i = Bs()[t[r]](""), s = t[r];
      this.prefixes[i] = s, this.namespaces[s] = i;
    }
    this.suggestPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.suggestPrefix("xml", "reserved:reservedForFutureUse"), this.namespacesUsed = [], this.keywords = ["a"], this.prefixchars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", this.incoming = null, this.formulas = [], this.store = e, this.rdfFactory = e.rdfFactory || Pt, this.xsd = Ol(this.rdfFactory);
  }
  setBase(e) {
    return this.base = e, this;
  }
  /**
   * Set serializer behavior flags. Letters can be combined with spaces.
   * Examples: 'si', 'deinprstux', 'si dr', 'o'.
   * Notable flags:
   *  - 'o': do not abbreviate to a prefixed name when the local part contains a dot
   */
  setFlags(e) {
    return this.flags = e || "", this;
  }
  toStr(e) {
    var t = e.toNT();
    return e.termType === "Graph" && (this.formulas[t] = e), t;
  }
  fromStr(e) {
    if (e[0] === "{") {
      var t = this.formulas[e];
      return t || console.log("No formula object for " + e), t;
    }
    return this.store.fromNT(e);
  }
  /**
   * Defines a set of [prefix, namespace] pairs to be used by this Serializer instance.
   * Overrides previous prefixes if any
   * @param namespaces
   * @return {Serializer}
   */
  setNamespaces(e) {
    for (var t in e)
      this.setPrefix(t, e[t]);
    return this;
  }
  /**
   * Defines a namespace prefix, overriding any existing prefix for that URI
   * @param prefix
   * @param uri
   */
  setPrefix(e, t) {
    if (e.slice(0, 7) !== "default" && e.slice(0, 2) !== "ns" && !(!e || !t)) {
      for (let r in this.prefixes)
        this.prefixes[r] == e && delete this.prefixes[r];
      this.prefixes[t] = e, this.namespaces[e] = t;
    }
  }
  /* Accumulate Namespaces
  **
  ** These are only hints.  If two overlap, only one gets used
  ** There is therefore no guarantee in general.
  */
  suggestPrefix(e, t) {
    e.slice(0, 7) !== "default" && e.slice(0, 2) !== "ns" && (!e || !t || e in this.namespaces || t in this.prefixes || (this.prefixes[t] = e, this.namespaces[e] = t));
  }
  // Takes a namespace -> prefix map
  suggestNamespaces(e) {
    for (var t in e)
      this.suggestPrefix(t, e[t]);
    return this;
  }
  checkIntegrity() {
    var e, t;
    for (e in this.namespaces)
      if (this.prefixes[this.namespaces[e]] !== e)
        throw new Error("Serializer integity error 1: " + e + ", " + this.namespaces[e] + ", " + this.prefixes[this.namespaces[e]] + "!");
    for (t in this.prefixes)
      if (this.namespaces[this.prefixes[t]] !== t)
        throw new Error("Serializer integity error 2: " + t + ", " + this.prefixs[t] + ", " + this.namespaces[this.prefixes[t]] + "!");
  }
  // Make up an unused prefix for a random namespace
  makeUpPrefix(e) {
    var t = e;
    function r(u) {
      return !this.validPrefix.test(u) || u === "ns" || u in this.namespaces ? !1 : (this.prefixes[e] = u, this.namespaces[u] = e, u);
    }
    var i = r.bind(this);
    "#/".indexOf(t[t.length - 1]) >= 0 && (t = t.slice(0, -1));
    var s = t.lastIndexOf("/");
    s >= 0 && (t = t.slice(s + 1));
    for (var a = 0; a < t.length && this.prefixchars.indexOf(t[a]) >= 0; )
      a++;
    if (t = t.slice(0, a), t.length < 6 && i(t)) return t;
    if (i(t.slice(0, 3))) return t.slice(0, 3);
    if (i(t.slice(0, 2))) return t.slice(0, 2);
    if (i(t.slice(0, 4))) return t.slice(0, 4);
    if (i(t.slice(0, 1))) return t.slice(0, 1);
    if (i(t.slice(0, 5))) return t.slice(0, 5);
    this.validPrefix.test(t) || (t = "n");
    for (var l = 0; ; l++) if (i(t.slice(0, 3) + l)) return t.slice(0, 3) + l;
  }
  rootSubjects(e) {
    for (var t = {}, r = {}, i = {}, s = 0; s < e.length; s++) {
      var a = e[s], l = function(b) {
        t.hasOwnProperty(b) || (t[b] = []), t[b].push(a.subject);
      }, u = [a.subject, a.predicate, a.object];
      u.map(function(b) {
        b.termType === "BlankNode" ? i[b.toNT()] = !0 : b.termType === "Collection" && b.elements.forEach(function(x) {
          l(x);
        });
      }), l(e[s].object);
      var c = r[this.toStr(a.subject)];
      c || (c = []), c.push(a), r[this.toStr(a.subject)] = c;
    }
    var h = [];
    for (var f in r)
      if (r.hasOwnProperty(f)) {
        var m = this.fromStr(f);
        if (m.termType !== "BlankNode" || !t[m] || t[m].length !== 1) {
          h.push(m);
          continue;
        }
      }
    this.incoming = t;
    for (var v = {}, w = 0; w < h.length; w++)
      v[h[w].toNT()] = !0;
    return {
      roots: h,
      subjects: r,
      rootsHash: v,
      incoming: t
    };
  }
  // //////////////////////////////////////////////////////
  toN3(e) {
    return this.statementsToN3(e.statements);
  }
  // Validate if a string is a valid PN_LOCAL per Turtle 1.1 spec
  // Allows dots inside the local name but not as trailing character
  // Also allows empty local names (for URIs ending in / or #)
  isValidPNLocal(e) {
    if (e.length === 0) return !0;
    if (e[e.length - 1] === ".") return !1;
    for (var t = 0; t < e.length; t++) {
      var r = e[t];
      if (r !== "." && this._notNameChars.indexOf(r) >= 0)
        return !1;
    }
    return !0;
  }
  explicitURI(e) {
    return this.flags.indexOf("r") < 0 && this.base ? e = Wa(this.base, e) : this.flags.indexOf("u") >= 0 ? e = ad(e) : e = rd(decodeURI(e)), "<" + e + ">";
  }
  statementsToNTriples(e) {
    var t = e.slice();
    t.sort();
    for (var r = "", i = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", s = this, a = this.store, l = this.rdfFactory, u = function(m) {
      if (m.termType !== "Collection")
        return s.atomicTermToN3(m);
      for (var v = m.elements, w = a.sym(i + "nill"), b = v.length - 1; b >= 0; b--) {
        var x = l.blankNode();
        r += u(x) + " " + u(a.sym(i + "first")) + " " + u(v[b]) + `.
`, r += u(x) + " " + u(a.sym(i + "rest")) + " " + u(w) + `.
`, w = x;
      }
      return s.atomicTermToN3(w);
    }, c = 0; c < t.length; c++) {
      var h = t[c], f = "";
      f += u(h.subject) + " ", f += u(h.predicate) + " ", f += u(h.object) + " ", this.flags.indexOf("q") >= 0 && (f += u(h.why) + " "), f += `.
`, r += f;
    }
    return r;
  }
  statementsToN3(e) {
    var t = 4, r = 80, i = this.store, s = {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": "aaa:00"
    }, a = function(M, j) {
      return td(M, j, i, s);
    };
    e.sort(a), this.base && !this.defaultNamespace && (this.defaultNamespace = this.base + "#");
    var l = {};
    this.flags.indexOf("s") < 0 && (l["http://www.w3.org/2002/07/owl#sameAs"] = "="), this.flags.indexOf("t") < 0 && (l["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] = "a"), this.flags.indexOf("i") < 0 && (l["http://www.w3.org/2000/10/swap/log#implies"] = "=>");
    var u = function(M) {
      for (var j = "", k = 0; k < M; k++) j += " ";
      return j;
    }, c = function(M) {
      for (var j = "", k = 0; k < M.length; k++) {
        var H = M[k], $ = typeof H == "string" ? H : c(H);
        if (k !== 0) {
          var q = j.slice(-1) || " ";
          $ === "," || $ === ";" || $ === "." && !"0123456789.:".includes(q) || (j += " ");
        }
        j += $;
      }
      return j;
    }, h = function(M, j) {
      var k = "", H = 1e5;
      j === void 0 && (j = -1);
      for (var $ = 0; $ < M.length; $++) {
        var q = M[$];
        if (typeof q != "string") {
          var ee = h(q, j + 1);
          if (ee.length < 10 * (r - t * j) && ee.indexOf('"""') < 0) {
            var Q = c(q);
            Q.length < r - t * j && (q = Q, ee = "");
          }
          ee && (H = 1e4), k += ee;
        }
        if (typeof q == "string") {
          if (q.length === 1 && k.slice(-1) === `
` && ",.;".indexOf(q) >= 0) {
            k = k.slice(0, -1), q == "." && "0123456789.:".includes(k.charAt(k.length - 1)) && (k += " ", H += 1), k += q + `
`, H += 1;
            continue;
          }
          if (H < t * j + 4 || // if new line not necessary
          H + q.length + 1 < r && ";.".indexOf(k[k.length - 2]) < 0)
            k = k.slice(0, -1) + " " + q + `
`, H += q.length + 1;
          else {
            let S = u(t * j) + q;
            k += S + `
`, H = S.length, j < 0 && (k += `
`, H = 1e5);
          }
        }
      }
      return k;
    };
    function f(M) {
      for (var j = this.rootSubjects(M), k = j.roots, H = [], $ = 0; $ < k.length; $++) {
        var q = k[$];
        H.push(v(q, j));
      }
      return H;
    }
    var m = f.bind(this);
    function v(M, j) {
      return M.termType === "BlankNode" && !j.incoming[M] ? _(M, j, !0).concat(["."]) : [G(M, j)].concat([b(M, j)]).concat(["."]);
    }
    function w(M, j) {
      var k = [], H = null, $ = j.subjects[this.toStr(M)] || [];
      if (typeof $ > "u")
        throw new Error("Cant find statements for " + M);
      for (var q = [], ee = 0; ee < $.length; ee++) {
        var Q = $[ee];
        Q.predicate.uri === H ? q.push(",") : (H && (k = k.concat([q]).concat([";"]), q = []), k.push(l[Q.predicate.uri] ? l[Q.predicate.uri] : G(Q.predicate, j))), H = Q.predicate.uri, q.push(_(Q.object, j));
      }
      return k = k.concat([q]), k;
    }
    var b = w.bind(this);
    function x(M, j, k) {
      return M.termType === "BlankNode" && (k || j.rootsHash[M.toNT()] === void 0) ? j.subjects[this.toStr(M)] ? ["[", b(M, j), "]"] : "[]" : G(M, j);
    }
    var _ = x.bind(this);
    function R(M, j) {
      var k, H;
      switch (M.termType) {
        case "Graph":
          return H = ["{"], H = H.concat(m(M.statements)), H.concat(["}"]);
        case "Collection":
          for (H = ["("], k = 0; k < M.elements.length; k++)
            H.push([_(M.elements[k], j)]);
          return H.push(")"), H;
        default:
          return this.atomicTermToN3(M);
      }
    }
    _i.prototype.termToN3 = G;
    var G = R.bind(this);
    function Y() {
      var M = "";
      this.flags.indexOf("d") < 0 && this.defaultNamespace && (M += "@prefix : " + this.explicitURI(this.defaultNamespace) + `.
`);
      for (var j in this.prefixes)
        this.prefixes.hasOwnProperty(j) && this.namespacesUsed[j] && (M += "@prefix " + this.prefixes[j] + ": " + this.explicitURI(j) + `.
`);
      return M + `
`;
    }
    var A = Y.bind(this), K = m(e);
    return A() + h(K);
  }
  // //////////////////////////////////////////// Atomic Terms
  //  Deal with term level things and nesting with no bnode structure
  atomicTermToN3(e, t) {
    switch (e.termType) {
      case "BlankNode":
      case "Variable":
        return e.toNT();
      case "Literal":
        var r = e.value;
        if (typeof r != "string")
          throw new TypeError("Value of RDF literal node must be a string");
        if (e.datatype && this.flags.indexOf("x") < 0)
          switch (e.datatype.uri) {
            case "http://www.w3.org/2001/XMLSchema#integer":
              return r;
            case "http://www.w3.org/2001/XMLSchema#decimal":
              return r.indexOf(".") < 0 && (r += ".0"), r;
            case "http://www.w3.org/2001/XMLSchema#double": {
              const s = r.toLowerCase().indexOf("e") > 0;
              return r.indexOf(".") < 0 && !s && (r += ".0"), s || (r += "e0"), r;
            }
            case "http://www.w3.org/2001/XMLSchema#boolean":
              return e.value === "1" ? "true" : "false";
          }
        var i = this.stringToN3(e.value, this.flags);
        return e.language ? i += "@" + e.language : e.datatype.equals(this.xsd.string) || (i += "^^" + this.atomicTermToN3(e.datatype, t)), i;
      case "NamedNode":
        return this.symbolToN3(e);
      case "DefaultGraph":
        return "";
      default:
        throw new Error("Internal: atomicTermToN3 cannot handle " + e + " of termType: " + e.termType);
    }
  }
  stringToN3(e, t) {
    t || (t = "e");
    var r = "", i, s, a, l, u;
    for (e.length > 20 && // Long enough to make sense
    e.slice(-1) !== '"' && // corner case'
    t.indexOf("n") < 0 && // Force single line
    (e.indexOf(`
`) > 0 || e.indexOf('"') > 0) ? (l = '"""', u = this.forbidden3) : (l = '"', u = this.forbidden1), i = 0; i < e.length; ) {
      u.lastIndex = 0;
      var c = u.exec(e.slice(i));
      if (c == null) break;
      s = i + u.lastIndex - 1, r += e.slice(i, s);
      var h = e[s];
      h === '"' && l === '"""' && e.slice(s, s + 3) !== '"""' ? r += h : (a = `\b\f\r	\v
\\"`.indexOf(h), a >= 0 ? r += "\\" + 'bfrtvn\\"'[a] : t.indexOf("e") >= 0 ? r += "\\u" + ("000" + h.charCodeAt(0).toString(16).toLowerCase()).slice(-4) : r += h), i = s + 1;
    }
    return l + r + e.slice(i) + l;
  }
  //  A single symbol, either in  <> or namespace notation
  symbolToN3(e) {
    var t = e.uri, r = t.indexOf("#");
    if (r < 0 && this.flags.indexOf("/") < 0 && (r = t.lastIndexOf("/")), r >= 0 && this.flags.indexOf("p") < 0 && // Can split at namespace but only if http[s]: URI or file: or ws[s] (why not others?)
    (t.indexOf("http") === 0 || t.indexOf("ws") === 0 || t.indexOf("file") === 0)) {
      var i = t.slice(r + 1), s = t.slice(0, r + 1), a = t.indexOf("://") + 4, l = this.base ? this.base.slice(0, Math.max(this.base.lastIndexOf("/"), this.base.lastIndexOf("#")) + 1) : null, u = l && s === l, c = this.flags.indexOf("o") >= 0 && i.indexOf(".") >= 0, h = !u && !c && s.length > a && this.isValidPNLocal(i);
      if (h) {
        if (this.defaultNamespace && this.defaultNamespace === s && this.flags.indexOf("d") < 0)
          return this.flags.indexOf("k") >= 0 && this.keyords.indexOf(i) < 0 ? i : ":" + i;
        var f = this.prefixes[s];
        if (f || (f = this.makeUpPrefix(s)), f)
          return this.namespacesUsed[s] = !0, f + ":" + i;
      }
    }
    return this.explicitURI(t);
  }
  // /////////////////////////// Quad store serialization
  // @para. write  - a function taking a single string to be output
  //
  writeStore(e) {
    var t = this.store, r = t.fetcher, i = r && r.appNode, s = this.store.index[3];
    for (var a in s) {
      var l = t.fromNT(a);
      i && l.equals(i) || e(`
` + this.atomicTermToN3(l) + " " + this.atomicTermToN3(t.sym("http://www.w3.org/2000/10/swap/log#semantics")) + " { " + this.statementsToN3(t.statementsMatching(void 0, void 0, void 0, l)) + ` }.
`);
    }
    t.statementsMatching(void 0, t.sym("http://www.w3.org/2007/ont/link#requestedURI")).map(function(h) {
      e(`
<` + h.object.value + `> log:metadata {
`);
      var f = t.statementsMatching(void 0, void 0, void 0, h.subject);
      e(this.statementsToN3(this.statementsToN3(f))), e(`}.
`);
    });
    var u = [];
    i && u.push(i);
    var c = [];
    u.map(function(h) {
      c = c.concat(t.statementsMatching(void 0, void 0, void 0, h));
    }), e(this.statementsToN3(c));
  }
  // ////////////////////////////////////////////// XML serialization
  statementsToXML(e) {
    var t = 4, r = 80, i = [];
    i["http://www.w3.org/1999/02/22-rdf-syntax-ns#"] = !0;
    var s = "http://www.w3.org/1999/02/22-rdf-syntax-ns#_", a = function(H) {
      for (var $ = "", q = 0; q < H; q++) $ += " ";
      return $;
    }, l = function(H) {
      for (var $ = "", q = 0; q < H.length; q++) {
        var ee = H[q], Q = typeof ee == "string" ? ee : l(ee);
        $ += Q;
      }
      return $;
    }, u = function(H, $) {
      var q = "", ee, Q = 1e5;
      $ || ($ = 0);
      for (var S = 0; S < H.length; S++) {
        var V = H[S];
        if (typeof V != "string") {
          var Z = u(V, $ + 1);
          Z.length < 10 * (r - t * $) && Z.indexOf('"""') < 0 && (ee = l(V), ee.length < r - t * $ && (V = "   " + ee, Z = "")), Z && (Q = 1e4), q += Z;
        }
        typeof V == "string" && (Q < t * $ + 4 ? (q = q.slice(0, -1) + " " + V + `
`, Q += V.length + 1) : (ee = a(t * $) + V, q += ee + `
`, Q = ee.length));
      }
      return q;
    };
    function c(H) {
      this.suggestPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
      for (var $ = this.rootSubjects(H), q = $.roots, ee = [], Q = 0; Q < q.length; Q++) {
        var S = q[Q];
        ee.push(b(S, $));
      }
      return ee;
    }
    var h = c.bind(this);
    function f(H) {
      return typeof H > "u" ? "@@@undefined@@@@" : H.replace(/[&<"]/g, function($) {
        switch ($[0]) {
          case "&":
            return "&amp;";
          case "<":
            return "&lt;";
          case '"':
            return "&quot;";
        }
      });
    }
    function m(H) {
      return f(this.base ? Wa(this.base, H.uri) : H.uri);
    }
    var v = m.bind(this);
    function w(H, $) {
      var q = [], ee, Q, S, V, Z = $.subjects[this.toStr(H)];
      if (typeof Z > "u")
        return R(H, $);
      Z.sort(function(Be, pe) {
        var Ce = Be.predicate.uri, Me = pe.predicate.uri;
        if (Ce.substring(0, s.length) === s || Me.substring(0, s.length) === s)
          return Ce.localeCompare(Me);
        var Ye = Ce.substring(s.length), Te = Me.substring(s.length), qe = parseInt(Ye, 10), ht = parseInt(Te, 10);
        return isNaN(qe) || isNaN(ht) || qe !== Ye || ht !== Te ? Ce.localeCompare(Me) : qe - ht;
      });
      for (var ae = 0; ae < Z.length; ae++) {
        if (S = Z[ae], S.predicate.uri === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && !ee && S.object.termType === "NamedNode") {
          ee = S.object;
          continue;
        }
        if (V = S.predicate, V.uri.substr(0, s.length) === s) {
          var ie = V.uri.substr(s.length), oe = parseInt(ie, 10);
          ie === oe.toString() && (V = this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#li"));
        }
        switch (Q = Y(V), S.object.termType) {
          case "BlankNode":
            $.incoming[S.object].length === 1 ? q = q.concat(["<" + Q + ' rdf:parseType="Resource">', b(S.object, $), "</" + Q + ">"]) : q = q.concat(["<" + Q + ' rdf:nodeID="' + S.object.toNT().slice(2) + '"/>']);
            break;
          case "NamedNode":
            q = q.concat(["<" + Q + ' rdf:resource="' + v(S.object) + '"/>']);
            break;
          case "Literal":
            q = q.concat(["<" + Q + (S.object.language ? ' xml:lang="' + S.object.language + '"' : S.object.datatype.equals(this.xsd.string) ? "" : ' rdf:datatype="' + f(S.object.datatype.uri) + '"') + ">" + f(S.object.value) + "</" + Q + ">"]);
            break;
          case "Collection":
            q = q.concat(["<" + Q + ' rdf:parseType="Collection">', x(S.object, $), "</" + Q + ">"]);
            break;
          default:
            throw new Error("Can't serialize object of type " + S.object.termType + " into XML");
        }
      }
      var ne = ee ? Y(ee) : "rdf:Description", ge = "";
      return H.termType === "BlankNode" ? (!$.incoming[H] || $.incoming[H].length !== 1) && (ge = ' rdf:nodeID="' + H.toNT().slice(2) + '"') : ge = ' rdf:about="' + v(H) + '"', ["<" + ne + ge + ">"].concat([q]).concat(["</" + ne + ">"]);
    }
    var b = w.bind(this);
    function x(H, $) {
      for (var q = [], ee = 0; ee < H.elements.length; ee++)
        q.push(b(H.elements[ee], $));
      return q;
    }
    function _(H, $) {
      var q = [], ee = $.subjects[this.toStr(H)];
      if (!ee) return q;
      ee.sort();
      for (var Q = 0; Q < ee.length; Q++) {
        var S = ee[Q];
        switch (S.object.termType) {
          case "BlankNode":
            $.rootsHash[S.object.toNT()] ? q = q.concat(["<" + Y(S.predicate) + ' rdf:nodeID="' + S.object.toNT().slice(2) + '">', "</" + Y(S.predicate) + ">"]) : q = q.concat(["<" + Y(S.predicate) + ' rdf:parseType="Resource">', R(S.object, $), "</" + Y(S.predicate) + ">"]);
            break;
          case "NamedNode":
            q = q.concat(["<" + Y(S.predicate) + ' rdf:resource="' + v(S.object) + '"/>']);
            break;
          case "Literal":
            q = q.concat(["<" + Y(S.predicate) + (S.object.language ? ' xml:lang="' + S.object.language + '"' : S.object.datatype.equals(this.xsd.string) ? "" : ' rdf:datatype="' + f(S.object.datatype.value) + '"') + ">" + f(S.object.value) + "</" + Y(S.predicate) + ">"]);
            break;
          case "Collection":
            q = q.concat(["<" + Y(S.predicate) + ' rdf:parseType="Collection">', x(S.object, $), "</" + Y(S.predicate) + ">"]);
            break;
          default:
            throw new Error("Can't serialize object of type " + S.object.termType + " into XML");
        }
      }
      return q;
    }
    var R = _.bind(this);
    function G(H) {
      var $ = H.uri, q = $.indexOf("#");
      if (q < 0 && this.flags.indexOf("/") < 0 && (q = $.lastIndexOf("/")), q < 0) throw new Error("Cannot make qname out of <" + $ + ">");
      for (var ee = q + 1; ee < $.length; ee++)
        if (this._notNameChars.indexOf($[ee]) >= 0)
          throw new Error('Invalid character "' + $[ee] + '" cannot be in XML qname for URI: ' + $);
      var Q = $.slice(q + 1), S = $.slice(0, q + 1);
      if (this.defaultNamespace && this.defaultNamespace === S && this.flags.indexOf("d") < 0)
        return Q;
      var V = this.prefixes[S];
      return V || (V = this.makeUpPrefix(S)), i[S] = !0, V + ":" + Q;
    }
    var Y = G.bind(this), A = h(e), K = "<rdf:RDF";
    this.defaultNamespace && (K += ' xmlns="' + f(this.defaultNamespace) + '"');
    for (var M in i)
      if (i.hasOwnProperty(M)) {
        var j = this.base && this.flags.includes("z") ? Wa(this.base, M) : M;
        K += `
 xmlns:` + this.prefixes[M] + '="' + f(j) + '"';
      }
    K += ">";
    var k = [K, A, "</rdf:RDF>"];
    return u(k, -1);
  }
  // End @@ body
  statementsToJsonld(e) {
    const t = this.statementsToN3(e), r = Kc.parse(t);
    return JSON.stringify(r, null, 2);
  }
}
function rd(n) {
  return encodeURI(n);
}
function ad(n) {
  for (var e = "", t, r = 0; r < n.length; r++)
    t = n.charCodeAt(r), t > 65535 ? e += "\\U" + ("00000000" + t.toString(16)).slice(-8) : t > 126 ? e += "\\u" + ("0000" + t.toString(16)).slice(-4) : e += n[r];
  return e;
}
function Or(n, e, t, r, i, s) {
  t = t || n?.value;
  const a = s || {};
  r = r || Hn;
  var l = void 0;
  try {
    var u = Ul(e);
    a.flags && u.setFlags(a.flags);
    var c = e.statementsMatching(void 0, void 0, void 0, n);
    switch ("namespaces" in e && u.suggestNamespaces(e.namespaces), a.namespaces && u.setNamespaces(a.namespaces), u.setBase(t), r) {
      case Rr:
        return l = u.statementsToXML(c), h(null, l);
      case _l:
      case Sc:
        return l = u.statementsToN3(c), h(null, l);
      case Hn:
      case Bc:
        return u.setFlags("si" + (a.flags ? " " + a.flags : "")), l = u.statementsToN3(c), h(null, l);
      case Fc:
        return u.setFlags("deinprstux"), l = u.statementsToNTriples(c), h(null, l);
      case ui:
        return u.setFlags("si dr" + (a.flags ? " " + a.flags : "")), l = u.statementsToJsonld(c), h(null, l);
      case di:
      case ci:
        return u.setFlags("deinprstux q"), l = u.statementsToNTriples(c), h(null, l);
      default:
        throw new Error("Serialize: Content-type " + r + " not supported for data write.");
    }
  } catch (f) {
    if (i)
      return i(f, void 0);
    throw f;
  }
  function h(f, m) {
    if (i) {
      i(f, m);
      return;
    } else
      return m;
  }
}
const id = ["blankNode", "defaultGraph", "literal", "namedNode", "quad", "variable", "supports"], ia = {
  first: "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
  rest: "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
  nil: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
};
function Ml(n, e, t) {
  const r = [];
  return t.reduce((i, s, a, l) => {
    r.push(n.quad(i, n.namedNode(ia.first), l[a]));
    let u;
    return a < l.length - 1 ? (u = n.blankNode(), r.push(n.quad(i, n.namedNode(ia.rest), u))) : r.push(n.quad(i, n.namedNode(ia.rest), n.namedNode(ia.nil))), u;
  }, e), r;
}
function Bt(n, e, t = 0) {
  var r = n.length;
  for (t < 0 && (t = r + t); t < r; t++)
    if (n[t] === e)
      return t;
  return -1;
}
class Ur extends Xe {
  /**
   * Initializes this formula
   * @constructor
   * @param statements - Initial array of statements
   * @param constraints - initial array of constraints
   * @param initBindings - initial bindings used in Query
   * @param optional - optional
   * @param opts
   * @param opts.rdfFactory - The rdf factory that should be used by the store
  */
  constructor(e = [], t = [], r = [], i = [], s = {}) {
    super(""), this.statements = e, this.constraints = t, this.initBindings = r, this.optional = i, re(this, "termType", Pr), re(this, "classOrder", tn.Graph), re(this, "fetcher", void 0), re(this, "isVar", 0), re(this, "ns", Ne), re(this, "rdfFactory", void 0), this.rdfFactory = s && s.rdfFactory || Pt;
    for (const a of id)
      this[a] = (...l) => this.rdfFactory[a](...l);
  }
  /** Add a statement from its parts
   * @param subject - the first part of the statement
   * @param predicate - the second part of the statement
   * @param object - the third part of the statement
   * @param graph - the last part of the statement
   */
  add(e, t, r, i) {
    return arguments.length === 1 && e.forEach((s) => this.add(s.subject, s.predicate, s.object, s.graph)), this.statements.push(this.rdfFactory.quad(e, t, r, i));
  }
  /** Add a statment object
   * @param {Statement} statement - An existing constructed statement to add
   */
  addStatement(e) {
    return this.add(e);
  }
  /**
   * Shortcut for adding blankNodes
   * @param [id]
   */
  bnode(e) {
    return this.rdfFactory.blankNode(e);
  }
  /**
   * Adds all the statements to this formula
   * @param statements - A collection of statements
   */
  addAll(e) {
    e.forEach((t) => {
      this.add(t.subject, t.predicate, t.object, t.graph);
    });
  }
  /** Follow link from one node, using one wildcard, looking for one
  *
  * For example, any(me, knows, null, profile)  - a person I know accoring to my profile .
  * any(me, knows, null, null)  - a person I know accoring to anything in store .
  * any(null, knows, me, null)  - a person who know me accoring to anything in store .
  *
  * @param s - A node to search for as subject, or if null, a wildcard
  * @param p - A node to search for as predicate, or if null, a wildcard
  * @param o - A node to search for as object, or if null, a wildcard
  * @param g - A node to search for as graph, or if null, a wildcard
  * @returns A node which match the wildcard position, or null
  */
  any(e, t, r, i) {
    const s = this.anyStatementMatching(e, t, r, i);
    return s == null ? null : e == null ? s.subject : t == null ? s.predicate : r == null ? s.object : null;
  }
  /**
   * Gets the value of a node that matches the specified pattern
   * @param s The subject
   * @param p The predicate
   * @param o The object
   * @param g The graph that contains the statement
   */
  anyValue(e, t, r, i) {
    const s = this.any(e, t, r, i);
    return s ? s.value : void 0;
  }
  /**
   * Gets the first JavaScript object equivalent to a node based on the specified pattern
   * @param s The subject
   * @param p The predicate
   * @param o The object
   * @param g The graph that contains the statement
   */
  anyJS(e, t, r, i) {
    const s = this.any(e, t, r, i);
    return s ? Xe.toJS(s) : void 0;
  }
  /**
   * Gets the first statement that matches the specified pattern
   */
  anyStatementMatching(e, t, r, i) {
    let s = this.statementsMatching(e, t, r, i, !0);
    if (!(!s || s.length === 0))
      return s[0];
  }
  /**
   * Returns a unique index-safe identifier for the given term.
   *
   * Falls back to the rdflib hashString implementation if the given factory doesn't support id.
   */
  id(e) {
    return this.rdfFactory.id(e);
  }
  /**
   * Search the Store
   * This is really a teaching method as to do this properly you would use IndexedFormula
   *
   * @param s - A node to search for as subject, or if null, a wildcard
   * @param p - A node to search for as predicate, or if null, a wildcard
   * @param o - A node to search for as object, or if null, a wildcard
   * @param g - A node to search for as graph, or if null, a wildcard
   * @param justOne - flag - stop when found one rather than get all of them?
   * @returns {Array<Node>} - An array of nodes which match the wildcard position
   */
  statementsMatching(e, t, r, i, s) {
    const a = this.statements.filter((l) => (!e || e.equals(l.subject)) && (!t || t.equals(l.predicate)) && (!r || r.equals(l.object)) && (!i || i.equals(l.graph)));
    return s ? a.length === 0 ? [] : [a[0]] : a;
  }
  /**
   * Finds the types in the list which have no *stored* subtypes
   * These are a set of classes which provide by themselves complete
   * information -- the other classes are redundant for those who
   * know the class DAG.
   * @param types A map of the types
   */
  bottomTypeURIs(e) {
    let t, r, i, s, a, l, u, c;
    t = [];
    for (let h in e)
      if (e.hasOwnProperty(h)) {
        for (c = e[h], u = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), this.rdfFactory.namedNode(h)), r = !0, s = 0, a = u.length; s < a; s++)
          if (i = u[s], l = i.uri, l in e) {
            r = !1;
            break;
          }
        r && (t[h] = c);
      }
    return t;
  }
  /** Creates a new collection */
  collection() {
    return new Ht();
  }
  /** Follow links from one node, using one wildcard.
  *
  * For example, each(me, knows, null, profile)  - people I know accoring to my profile .
  * each(me, knows, null, null)  - people I know accoring to anything in store .
  * each(null, knows, me, null)  - people who know me accoring to anything in store .
  *
  * @param s - A node to search for as subject, or if null, a wildcard
  * @param p - A node to search for as predicate, or if null, a wildcard
  * @param o - A node to search for as object, or if null, a wildcard
  * @param g - A node to search for as graph, or if null, a wildcard
  * @returns {Array<Node>} - An array of nodes which match the wildcard position
  */
  each(e, t, r, i) {
    const s = [];
    let a = this.statementsMatching(e, t, r, i, !1);
    if (e == null)
      for (let l = 0, u = a.length; l < u; l++)
        s.push(a[l].subject);
    else if (t == null)
      for (let l = 0, u = a.length; l < u; l++)
        s.push(a[l].predicate);
    else if (r == null)
      for (let l = 0, u = a.length; l < u; l++)
        s.push(a[l].object);
    else if (i == null)
      for (let l = 0, u = a.length; l < u; l++)
        s.push(new pt(a[l].graph.value));
    return s;
  }
  /**
   * Test whether this formula is equals to {other}
   * @param other - The other formula
   */
  equals(e) {
    return e ? this.hashString() === e.hashString() : !1;
  }
  /**
   * For thisClass or any subclass, anything which has it is its type
   * or is the object of something which has the type as its range, or subject
   * of something which has the type as its domain
   * We don't bother doing subproperty (yet?)as it doesn't seeem to be used
   * much.
   * Get all the Classes of which we can RDFS-infer the subject is a member
   * @return a hash of URIs
   */
  findMembersNT(e) {
    let t, r, i, s, a, l, u, c, h, f, m, v, w, b;
    v = {}, v[e.toNT()] = !0, s = {}, l = this.transitiveClosure(v, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
    for (let x in l)
      if (l.hasOwnProperty(x)) {
        u = this.statementsMatching(void 0, this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), this.fromNT(x));
        for (let _ = 0, R = u.length; _ < R; _++)
          w = u[_], s[w.subject.toNT()] = w;
        c = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"), this.fromNT(x));
        for (let _ = 0, R = c.length; _ < R; _++)
          for (a = c[_], h = this.statementsMatching(void 0, a), i = 0, t = h.length; i < t; i++)
            w = h[i], s[w.subject.toNT()] = w;
        f = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"), this.fromNT(x));
        for (let _ = 0, R = f.length; _ < R; _++)
          for (a = f[_], m = this.statementsMatching(void 0, a), b = 0, r = m.length; b < r; b++)
            w = m[b], s[w.object.toNT()] = w;
      }
    return s;
  }
  /**
   * For thisClass or any subclass, anything which has it is its type
   * or is the object of something which has the type as its range, or subject
   * of something which has the type as its domain
   * We don't bother doing subproperty (yet?)as it doesn't seeem to be used
   * much.
   * Get all the Classes of which we can RDFS-infer the subject is a member
   * @param subject - A named node
   */
  findMemberURIs(e) {
    return this.NTtoURI(this.findMembersNT(e));
  }
  /**
   * Get all the Classes of which we can RDFS-infer the subject is a superclass
   * Returns a hash table where key is NT of type and value is statement why we
   * think so.
   * Does NOT return terms, returns URI strings.
   * We use NT representations in this version because they handle blank nodes.
   */
  findSubClassesNT(e) {
    let t = {};
    return t[e.toNT()] = !0, this.transitiveClosure(t, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
  }
  /**
   * Get all the Classes of which we can RDFS-infer the subject is a subclass
   * @param {RDFlibNamedNode} subject - The thing whose classes are to be found
   * @returns a hash table where key is NT of type and value is statement why we
   * think so.
   * Does NOT return terms, returns URI strings.
   * We use NT representations in this version because they handle blank nodes.
   */
  findSuperClassesNT(e) {
    let t = {};
    return t[e.toNT()] = !0, this.transitiveClosure(t, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !1);
  }
  /**
   * Get all the Classes of which we can RDFS-infer the subject is a member
   * todo: This will loop is there is a class subclass loop (Sublass loops are
   * not illegal)
   * @param {RDFlibNamedNode} subject - The thing whose classes are to be found
   * @returns a hash table where key is NT of type and value is statement why we think so.
   * Does NOT return terms, returns URI strings.
   * We use NT representations in this version because they handle blank nodes.
   */
  findTypesNT(e) {
    let t, r, i, s, a, l, u, c, h;
    i = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", h = [], s = this.statementsMatching(e, void 0, void 0);
    for (let f = 0, m = s.length; f < m; f++)
      if (c = s[f], c.predicate.uri === i)
        h[c.object.toNT()] = c;
      else {
        a = this.each(c.predicate, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"));
        for (let v = 0, w = a.length; v < w; v++)
          r = a[v], h[r.toNT()] = c;
      }
    l = this.statementsMatching(void 0, void 0, e);
    for (let f = 0, m = l.length; f < m; f++) {
      c = l[f], u = this.each(c.predicate, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"));
      for (let v = 0, w = u.length; v < w; v++)
        t = u[v], h[t.toNT()] = c;
    }
    return this.transitiveClosure(h, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !1);
  }
  /**
   * Get all the Classes of which we can RDFS-infer the subject is a member
   * todo: This will loop is there is a class subclass loop (Sublass loops are
   * not illegal)
   * Returns a hash table where key is NT of type and value is statement why we
   * think so.
   * Does NOT return terms, returns URI strings.
   * We use NT representations in this version because they handle blank nodes.
   * @param subject - A subject node
   */
  findTypeURIs(e) {
    return this.NTtoURI(this.findTypesNT(e));
  }
  /** Trace statements which connect directly, or through bnodes
   *
   * @param subject - The node to start looking for statments
   * @param doc - The document to be searched, or null to search all documents
   * @returns an array of statements, duplicate statements are suppresssed.
   */
  connectedStatements(e, t, r) {
    r = r || [];
    let i = [e], s = {}, a = {}, l = [], u = this, c = function(h) {
      let f = function(v) {
        v.termType === "BlankNode" && !s[v.value] && (s[v.value] = !0, i.push(v));
      }, m = u.statementsMatching(null, null, h, t).concat(u.statementsMatching(h, null, null, t));
      m = m.filter(function(v) {
        if (r[v.predicate.value]) return !1;
        let w = v.toNT();
        return a[w] ? !1 : (a[w] = !0, !0);
      }), m.forEach(function(v) {
        f(v.subject), f(v.object);
      }), l = l.concat(m);
    };
    for (; i.length; )
      c(i.shift());
    return l;
  }
  /**
   * Creates a new empty formula
   *
   * @param _features - Not applicable, but necessary for typing to pass
   */
  formula(e) {
    return new Ur();
  }
  /**
   * Transforms an NTriples string format into a Node.
   * The blank node bit should not be used on program-external values; designed
   * for internal work such as storing a blank node id in an HTML attribute.
   * This will only parse the strings generated by the various toNT() methods.
   */
  fromNT(e) {
    let t, r, i;
    switch (e[0]) {
      case "<":
        return this.sym(e.slice(1, -1));
      case '"':
        if (i = void 0, t = void 0, r = e.lastIndexOf('"'), r < e.length - 1)
          if (e[r + 1] === "@")
            i = e.slice(r + 2);
          else if (e.slice(r + 1, r + 3) === "^^")
            t = this.fromNT(e.slice(r + 3));
          else
            throw new Error("Can't convert string from NT: " + e);
        return e = e.slice(1, r), e = e.replace(/\\"/g, '"'), e = e.replace(/\\n/g, `
`), e = e.replace(/\\\\/g, "\\"), this.rdfFactory.literal(e, i || t);
      case "_":
        return this.rdfFactory.blankNode(e.slice(2));
      case "?":
        return new jn(e.slice(1));
    }
    throw new Error("Can't convert from NT: " + e);
  }
  /** Returns true if this formula holds the specified statement(s) */
  holds(e, t, r, i) {
    let s;
    if (arguments.length === 1) {
      if (!e)
        return !0;
      if (e instanceof Array) {
        for (s = 0; s < e.length; s++)
          if (!this.holds(e[s]))
            return !1;
        return !0;
      } else {
        if (Rc(e))
          return this.holds(e.subject, e.predicate, e.object, e.graph);
        if (e.statements)
          return this.holds(e.statements);
      }
    }
    return this.anyStatementMatching(e, t, r, i) != null;
  }
  /**
   * Returns true if this formula holds the specified {statement}
   */
  holdsStatement(e) {
    return this.holds(e.subject, e.predicate, e.object, e.graph);
  }
  /**
   * Used by the n3parser to generate list elements
   * @param values - The values of the collection
   * @param context - The store
   * @return {BlankNode|Collection} - The term for the statement
   */
  list(e, t) {
    if (t.rdfFactory.supports.COLLECTIONS) {
      const r = t.rdfFactory.collection();
      return e.forEach(function(i) {
        r.append(i);
      }), r;
    } else {
      const r = t.rdfFactory.blankNode(), i = Ml(t.rdfFactory, r, e);
      return t.addAll(i), r;
    }
  }
  /**
   * Transform a collection of NTriple URIs into their URI strings
   * @param t - Some iterable collection of NTriple URI strings
   * @return A collection of the URIs as strings
   * todo: explain why it is important to go through NT
   */
  NTtoURI(e) {
    let t, r, i = {};
    for (t in e)
      e.hasOwnProperty(t) && (r = e[t], t[0] === "<" && (i[t.slice(1, -1)] = r));
    return i;
  }
  /**
   * Serializes this formula
   * @param base - The base string
   * @param contentType - The content type of the syntax to use
   * @param provenance - The provenance URI
   * @param options  - options to pass to the serializer, as defined in serialize method
   */
  serialize(e, t, r, i) {
    return Or(r, this, e, t, void 0, i);
  }
  /**
   * Creates a new formula with the substituting bindings applied
   * @param bindings - The bindings to substitute
   */
  substitute(e) {
    let t = this.statements.map(function(i) {
      return i.substitute(e);
    });
    const r = new Ur();
    return r.addAll(t), r;
  }
  sym(e, t) {
    if (t)
      throw new Error("This feature (kb.sym with 2 args) is removed. Do not assume prefix mappings.");
    return this.rdfFactory.namedNode(e);
  }
  /**
   * Gets the node matching the specified pattern. Throws when no match could be made.
   * @param s - The subject
   * @param p - The predicate
   * @param o - The object
   * @param g - The graph that contains the statement
   */
  the(e, t, r, i) {
    return this.any(e, t, r, i);
  }
  /**
   * RDFS Inference
   * These are hand-written implementations of a backward-chaining reasoner
   * over the RDFS axioms.
   * @param seeds - A hash of NTs of classes to start with
   * @param predicate - The property to trace though
   * @param inverse - Trace inverse direction
   */
  transitiveClosure(e, t, r) {
    let i, s, a, l, u, c, h = {};
    Object.assign(h, e);
    let f = {};
    for (; ; ) {
      if (c = (function() {
        for (let m in h)
          if (h.hasOwnProperty(m))
            return m;
      })(), c == null)
        return f;
      for (u = r ? this.each(void 0, t, this.fromNT(c)) : this.each(this.fromNT(c), t), s = 0, a = u.length; s < a; s++)
        i = u[s], l = i.toNT(), !(l in f) && (l in h || (h[l] = h[c]));
      f[c] = h[c], delete h[c];
    }
  }
  /**
   * Finds the types in the list which have no *stored* supertypes
   * We exclude the universal class, owl:Things and rdf:Resource, as it is
   * information-free.
   * @param types - The types
   */
  topTypeURIs(e) {
    let t, r, i, s, a, l, u, c;
    u = [];
    for (i in e)
      if (e.hasOwnProperty(i)) {
        for (c = e[i], a = 0, l = this.each(this.rdfFactory.namedNode(i), this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf")), t = 0, s = l.length; t < s; t++)
          if (r = l[t], r.uri !== "http://www.w3.org/2000/01/rdf-schema#Resource") {
            a++;
            break;
          }
        a || (u[i] = c);
      }
    return u["http://www.w3.org/2000/01/rdf-schema#Resource"] && delete u["http://www.w3.org/2000/01/rdf-schema#Resource"], u["http://www.w3.org/2002/07/owl#Thing"] && delete u["http://www.w3.org/2002/07/owl#Thing"], u;
  }
  /**
   * Serializes this formula to a string
   */
  toString() {
    return "{" + this.statements.join(`
`) + "}";
  }
  /**
   * Gets a new variable
   * @param name - The variable's name
   */
  variable(e) {
    return new jn(e);
  }
  /**
   * Gets the number of statements in this formula that matches the specified pattern
   * @param s - The subject
   * @param p - The predicate
   * @param o - The object
   * @param g - The graph that contains the statement
   */
  whether(e, t, r, i) {
    return this.statementsMatching(e, t, r, i, !1).length;
  }
}
Xe.fromValue = Fl;
const Jn = {
  xsd: Ne("http://www.w3.org/2001/XMLSchema#")
};
Xe.toJS = function(n) {
  return Ti(n) ? n.elements.map(Xe.toJS) : Sl(n) ? n.datatype.equals(Jn.xsd("boolean")) ? n.value === "1" || n.value === "true" : n.datatype.equals(Jn.xsd("dateTime")) || n.datatype.equals(Jn.xsd("date")) ? new Date(n.value) : n.datatype.equals(Jn.xsd("integer")) || n.datatype.equals(Jn.xsd("float")) || n.datatype.equals(Jn.xsd("decimal")) ? Number(n.value) : n.value : n;
};
class sd {
  constructor(e, t) {
    this.pat = new yn(), this.vars = [], this.name = e, this.id = t;
  }
}
function qs(n, e, t, r) {
  function i(A) {
    var K = "", M;
    for (M in A)
      A.hasOwnProperty(M) && (K += "    " + M + " -> " + A[M]);
    return K;
  }
  function s(A) {
    var K = "Bindings: ", M, j = A.length;
    for (M = 0; M < j; M++)
      K += i(A[M][0]) + `;
	`;
    return K;
  }
  function a(A, K, M, j) {
    var k = M[A];
    if (k === void 0) {
      if (A.isVar) {
        var H = [];
        return H[A] = K, [[H, null]];
      }
      k = A;
    }
    if (!k.complexType)
      return j.redirections[k] && (k = j.redirections[k]), j.redirections[K] && (K = j.redirections[K]), k.equals(K) || k.uri && k.uri === kr ? [[[], null]] : [];
    if (A instanceof Array)
      return K instanceof Array ? l(A, K, M) : [];
    throw new Error("query.js: oops - code not written yet");
  }
  function l(A, K, M, j) {
    var k;
    if (A.length !== K.length)
      return [];
    if (!A.length)
      return [[[], null]];
    var H = a(A[0], K[0], M, j);
    if (H.length === 0)
      return H;
    var $ = [], q, ee = H.length, Q, S, V, Z, ae, ie;
    for (q = 0; q < ee; q++) {
      Q = H[q][0], ie = [];
      for (Z in Q)
        Q.hasOwnProperty(Z) && (ie[Z] = Q[Z]);
      for (Z in M)
        M.hasOwnProperty(Z) && (ie[Z] = M[Z]);
      for (k = l(A.slice(1), K.slice(1), ie, j), V = k.length, S = 0; S < V; S++) {
        ae = k[S][0];
        for (Z in Q)
          Q.hasOwnProperty(Z) && (ae[Z] = Q[Z]);
        $.push([ae, null]);
      }
    }
    return $;
  }
  function u(A, K) {
    var M = K[A];
    return M === void 0 ? A : M;
  }
  function c(A, K) {
    var M = {}, j;
    for (j in A)
      A.hasOwnProperty(j) && (M[j] = A[j]);
    for (j in K)
      K.hasOwnProperty(j) && (M[j] = K[j]);
    return M;
  }
  function h(A, K) {
    return this.trunkBindings = K, this.originalCallback = A, this.branches = [], this;
  }
  h.prototype.checkAllDone = function() {
    var A;
    for (A = 0; A < this.branches.length; A++)
      if (!this.branches[A].done)
        return;
    this.doCallBacks(this.branches.length - 1, this.trunkBindings);
  }, h.prototype.doCallBacks = function(A, K) {
    var M;
    if (A < 0)
      return this.originalCallback(K);
    for (M = 0; M < this.branches[A].results.length; M++)
      this.doCallBacks(A - 1, c(K, this.branches[A].results[M]));
  };
  function f(A, K) {
    return this.count = 0, this.success = !1, this.done = !1, this.callback = A, this.onDone = K, this;
  }
  f.prototype.reportMatch = function(A) {
    this.callback(A), this.success = !0;
  }, f.prototype.reportDone = function() {
    this.done = !0, this.onDone !== void 0 && this.onDone();
  };
  var m = function(A) {
    return this.count = 0, this.done = !1, this.results = [], this.junction = A, A.branches.push(this), this;
  };
  m.prototype.reportMatch = function(A) {
    this.results.push(A);
  }, m.prototype.reportDone = function() {
    Xt.debug("Optional branch finished - results.length = " + this.results.length), this.results.length === 0 && this.results.push({}), this.done = !0, this.junction.checkAllDone();
  };
  function v(A, K, M) {
    var j, k, H, $;
    for (K.nvars = 0, K.index = null, j = [K.subject, K.predicate, K.object, K.why], $ = [A.subjectIndex, A.predicateIndex, A.objectIndex, A.whyIndex], H = 0; H < 4; H++) {
      let q = j[H];
      if (!(q.uri && q.uri === kr)) if (q.isVar && M[q] === void 0)
        K.nvars++;
      else {
        if (q = u(j[H], M), A.redirections[A.id(q)] && (q = A.redirections[A.id(q)]), k = $[H][A.id(q)], !k)
          return K.index = [], !1;
        (K.index === null || K.index.length > k.length) && (K.index = k);
      }
    }
    return K.index === null && (K.index = A.statements), !0;
  }
  function w(A, K) {
    return A.nvars !== K.nvars ? A.nvars - K.nvars : A.index.length - K.index.length;
  }
  var b = 0, x = function(A, K, M, j, k, H, $) {
    Xt.debug("Match begins, Branch count now: " + $.count + " for " + $.pattern_debug);
    var q = K.statements;
    if (q.length === 0) {
      if (Xt.debug("FOUND MATCH WITH BINDINGS:" + i(M)), K.optional.length === 0)
        $.reportMatch(M);
      else {
        Xt.debug("OPTIONAL: " + K.optional);
        var ee = new h(e, M), Q = [], S;
        for (S = 0; S < K.optional.length; S++)
          Q[S] = new m(ee), Q[S].pattern_debug = K.optional[S];
        for (S = 0; S < K.optional.length; S++)
          Q[S].count = Q[S].count + 1, x(A, K.optional[S], M, "", k, e, Q[S]);
      }
      $.count--, Xt.debug("Match ends -- success , Branch count now: " + $.count + " for " + $.pattern_debug);
      return;
    }
    var V, Z, ae = q.length;
    if (k) {
      var ie = "match" + b++, oe = function(ne, ge) {
        var Be = ne.uri.split("#")[0];
        k.nowOrWhenFetched(Be, void 0, function(pe, Ce, Me) {
          pe || console.log("Error following link to <" + ne.uri + "> in query: " + Ce), x(
            A,
            K,
            M,
            j,
            k,
            // match not match2 to look up any others necessary.
            H,
            $
          );
        });
      };
      for (Z = 0; Z < ae; Z++) {
        if (V = q[Z], M[V.subject] !== void 0 && M[V.subject].uri && k && k.getState($n(M[V.subject].uri)) === "unrequested") {
          oe(M[V.subject], ie);
          return;
        }
        if (M[V.object] !== void 0 && M[V.object].uri && k && k.getState($n(M[V.object].uri)) === "unrequested") {
          oe(M[V.object], ie);
          return;
        }
      }
    }
    R(A, K, M, j, k, H, $);
  }, _ = function(A, K) {
    var M = !0, j, k;
    for (j in A)
      A.hasOwnProperty(j) && K[j] && (k = K[j].test, k && !k(A[j]) && (M = !1));
    return M;
  }, R = function(A, K, M, j, k, H, $) {
    var q = K.statements, ee = q.length, Q, S, V, Z, ae, ie, oe;
    for (Q = 0; Q < ee; Q++)
      oe = q[Q], v(A, oe, M);
    q.sort(w), oe = q[0];
    var ne = A.formula();
    ne.optional = K.optional, ne.constraints = K.constraints, ne.statements = q.slice(1), Xt.debug(j + "match2 searching " + oe.index.length + " for " + oe + "; bindings so far=" + i(M));
    var ge, Be = oe.index.length, pe, Ce;
    for (ge = 0; ge < Be; ge++)
      for (Ce = oe.index[ge], pe = l([oe.subject, oe.predicate, oe.object, oe.why], [Ce.subject, Ce.predicate, Ce.object, Ce.why], M, A), Xt.info(j + " From first: " + pe.length + ": " + s(pe)), V = pe.length, S = 0; S < V; S++)
        if (ae = [], ie = pe[S][0], !_(ie, K.constraints))
          Xt.debug("Branch count CS: " + $.count);
        else {
          for (Z in ie)
            ie.hasOwnProperty(Z) && (ae[Z] = ie[Z]);
          for (Z in M)
            M.hasOwnProperty(Z) && (ae[Z] = M[Z]);
          $.count++, x(A, ne, ae, j + "  ", k, H, $);
        }
    $.count--, Xt.debug("Match2 ends, Branch count: " + $.count + " for " + $.pattern_debug), $.count === 0 && $.reportDone();
  }, G = this;
  Xt.debug("Query on " + this.statements.length);
  var Y = new f(e, r);
  Y.count++, n.sync ? x(G, n.pat, n.pat.initBindings, "", t, e, Y) : setTimeout(function() {
    x(G, n.pat, n.pat.initBindings, "", t, e, Y);
  }, 0);
}
const ja = "http://www.w3.org/2002/07/owl#";
function ld(n, e, t, r) {
  var i = n.any(e, t, void 0);
  return i ? (n.equate(i, r), !0) : !1;
}
function od(n, e, t, r) {
  var i = n.any(void 0, t, r);
  return i ? (n.equate(i, e), !0) : !1;
}
function Pl(n, e, t, r, i) {
  n.typeCallback && n.typeCallback(n, r, i);
  var s = n.classActions[n.id(r)], a = !1;
  if (s)
    for (var l = 0; l < s.length; l++)
      a = a || s[l](n, e, t, r, i);
  return a;
}
class yn extends Ur {
  /**
   * Creates a new formula
   * @param features - What sort of automatic processing to do? Array of string
   * @param features.sameAs - Smush together A and B nodes whenever { A sameAs B }
   * @param opts
   * @param [opts.rdfFactory] - The data factory that should be used by the store
   * @param [opts.rdfArrayRemove] - Function which removes statements from the store
   * @param [opts.dataCallback] - Callback when a statement is added to the store, will not trigger when adding duplicates
   */
  constructor(e, t = {}) {
    super(void 0, void 0, void 0, void 0, t), re(this, "updater", void 0), re(this, "namespaces", void 0), re(this, "classActions", void 0), re(this, "propertyActions", void 0), re(this, "redirections", void 0), re(this, "aliases", void 0), re(this, "HTTPRedirects", void 0), re(this, "subjectIndex", void 0), re(this, "predicateIndex", void 0), re(this, "objectIndex", void 0), re(this, "whyIndex", void 0), re(this, "index", void 0), re(this, "features", void 0), re(this, "_universalVariables", void 0), re(this, "_existentialVariables", void 0), re(this, "rdfArrayRemove", void 0), re(this, "dataCallbacks", []), re(this, "dataRemovalCallbacks", []), this.propertyActions = {}, this.classActions = {}, this.redirections = [], this.aliases = [], this.HTTPRedirects = [], this.subjectIndex = [], this.predicateIndex = [], this.objectIndex = [], this.whyIndex = [], this.index = [this.subjectIndex, this.predicateIndex, this.objectIndex, this.whyIndex], this.namespaces = {}, this.features = e || [
      // By default, devs do not expect these features.
      // See https://github.com/linkeddata/rdflib.js/issues/458
      //      'sameAs',
      //      'InverseFunctionalProperty',
      //      'FunctionalProperty',
    ], this.rdfArrayRemove = t.rdfArrayRemove || fi, t.dataCallback && (this.dataCallbacks = [t.dataCallback]), t.dataRemovalCallback && (this.dataRemovalCallbacks = [t.dataRemovalCallback]), this.initPropertyActions(this.features);
  }
  /**
   * Gets the URI of the default graph
   */
  static get defaultGraphURI() {
    return kr;
  }
  /**
   * Gets this graph with the bindings substituted
   * @param bindings The bindings
   */
  substitute(e) {
    var t = this.statements.map(function(i) {
      return i.substitute(e);
    }), r = new yn();
    return r.add(t), r;
  }
  /**
   * Add a callback which will be triggered after a statement has been added to the store.
   * @param cb
   */
  addDataCallback(e) {
    this.dataCallbacks.push(e);
  }
  addDataRemovalCallback(e) {
    this.dataRemovalCallbacks.push(e);
  }
  /**
   * Apply a set of statements to be deleted and to be inserted
   *
   * @param patch - The set of statements to be deleted and to be inserted
   * @param target - The name of the document to patch
   * @param patchCallback - Callback to be called when patching is complete
   */
  applyPatch(e, t, r) {
    var i = this, s, a = null;
    function l(h) {
      if (e.delete) {
        s = e.delete, a && (s = s.substitute(a)), s = s.statements;
        var f = [], m = s.map(function(v) {
          var w = i.statementsMatching(v.subject, v.predicate, v.object, t);
          return w.length === 0 ? (f.push(v), null) : w[0];
        });
        if (f.length)
          return r("Could not find to delete: " + f.join(`
 or `));
        m.map(function(v) {
          i.remove(v);
        });
      }
      e.insert && (s = e.insert, a && (s = s.substitute(a)), s = s.statements, s.map(function(v) {
        v.graph = t, i.add(v.subject, v.predicate, v.object, v.graph);
      })), h();
    }
    if (e.where) {
      var u = new sd("patch");
      u.pat = e.where, u.pat.statements.map(function(h) {
        h.graph = mn(t.value);
      }), u.sync = !0;
      var c = [];
      i.query(u, function(f) {
        c.push(f);
      }, i.fetcher, function() {
        if (c.length === 0)
          return r("No match found to be patched:" + e.where);
        if (c.length > 1)
          return r("Patch ambiguous. No patch done.");
        a = c[0], l(r);
      });
    } else
      l(r);
  }
  /**
   * N3 allows for declaring blank nodes, this function enables that support
   *
   * @param x The blank node to be declared, supported in N3
   */
  declareExistential(e) {
    return this._existentialVariables || (this._existentialVariables = []), this._existentialVariables.push(e), e;
  }
  /**
   * @param features
   */
  initPropertyActions(e) {
    this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))] = [Pl], Bt(e, "sameAs") >= 0 && (this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${ja}sameAs`))] = [function(t, r, i, s, a) {
      return t.equate(r, s), !0;
    }]), Bt(e, "InverseFunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${ja}InverseFunctionalProperty`))] = [function(t, r, i, s, a) {
      return t.newPropertyAction(r, od);
    }]), Bt(e, "FunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${ja}FunctionalProperty`))] = [function(t, r, i, s, a) {
      return t.newPropertyAction(r, ld);
    }]);
  }
  /** @deprecated Use {add} instead */
  addStatement(e) {
    return this.add(e.subject, e.predicate, e.object, e.graph), this.statements.length;
  }
  /**
   * Adds a triple (quad) to the store.
   *
   * @param subj - The thing about which the fact a relationship is asserted.
   *        Also accepts a statement or an array of Statements.
   * @param pred - The relationship which is asserted
   * @param obj - The object of the relationship, e.g. another thing or a value. If passed a string, this will become a literal.
   * @param why - The document in which the triple (S,P,O) was or will be stored on the web
   * @returns The statement added to the store, or the store
   */
  add(e, t, r, i) {
    var s;
    if (arguments.length === 1) {
      if (e instanceof Array)
        for (s = 0; s < e.length; s++)
          this.add(e[s]);
      else nr(e) ? this.add(e.subject, e.predicate, e.object, e.graph) : Na(e) && this.add(e.statements);
      return this;
    }
    var a, l;
    i || (i = this.fetcher ? this.fetcher.appNode : this.rdfFactory.defaultGraph()), typeof e == "string" && (e = this.rdfFactory.namedNode(e)), t = Xe.fromValue(t);
    const u = Xe.fromValue(r);
    if (i = Xe.fromValue(i), !Oc(e))
      throw new Error("Subject is not a subject type");
    if (!Uc(t))
      throw new Error(`Predicate ${t} is not a predicate type`);
    if (!kc(u))
      throw new Error(`Object ${u} is not an object type`);
    if (!$c(i))
      throw new Error("Why is not a graph type");
    this.predicateCallback && this.predicateCallback(this, t, i);
    var c = this.id(this.canon(t));
    a = this.propertyActions[c];
    var h = !1;
    if (a)
      for (s = 0; s < a.length; s++)
        h = h || a[s](this, e, t, u, i);
    if (this.holds(e, t, u, i))
      return null;
    var f = [this.id(this.canon(e)), c, this.id(this.canon(u)), this.id(this.canon(i))];
    for (l = this.rdfFactory.quad(e, t, u, i), s = 0; s < 4; s++) {
      var m = this.index[s], v = f[s];
      m[v] || (m[v] = []), m[v].push(l);
    }
    this.statements.push(l);
    for (const w of this.dataCallbacks)
      w(l);
    return l;
  }
  /**
   * Returns the symbol with canonical URI as smushed
   * @param term - An RDF node
   */
  canon(e) {
    if (!e)
      return e;
    const t = this.redirections[this.id(e)];
    if (t)
      return t;
    switch (e.termType) {
      case zn:
        return new nn(e.value);
      case Tn:
        return e;
      // non-RDF/JS type, should just need to cast
      case Gn:
        return new Di();
      case Dl:
        return e;
      case Pr:
        return e;
      case fr:
        return new en(e.value, e.language, e.datatype);
      case Xn:
        return new pt(e.value);
      case xn:
        return new jn(e.value);
      default:
        throw new Error(`Term Type not recognized for canonization: ${e.termType}`);
    }
  }
  /**
   * Checks this formula for consistency
   */
  check() {
    this.checkStatementList(this.statements);
    for (var e = 0; e < 4; e++) {
      var t = this.index[e];
      for (var r in t)
        t.hasOwnProperty(r) && this.checkStatementList(t[r], e);
    }
  }
  /**
   * Checks a list of statements for consistency
   * @param sts - The list of statements to check
   * @param from - An index with the array ['subject', 'predicate', 'object', 'why']
   */
  checkStatementList(e, t) {
    t === void 0 && (t = 0);
    for (var r = ["subject", "predicate", "object", "why"], i = " found in " + r[t] + " index.", s, a = 0; a < e.length; a++) {
      s = e[a];
      for (var l = [s.subject, s.predicate, s.object, s.graph], u = function(m, v) {
        for (var w = 0; w < m.length; w++)
          if (m[w].subject.equals(v.subject) && m[w].predicate.equals(v.predicate) && m[w].object.equals(v.object) && m[w].why.equals(v.graph))
            return !0;
      }, c = 0; c < 4; c++) {
        var h = this.canon(l[c]), f = this.id(h);
        this.index[c][f] && u(this.index[c][f], s);
      }
      if (!u(this.statements, s))
        throw new Error("Statement list does not statement " + s + "@" + s.graph + i);
    }
  }
  /**
   * Closes this formula (and return it)
   */
  close() {
    return this;
  }
  compareTerms(e, t) {
    return Object.prototype.hasOwnProperty.call(e, "compareTerm") ? e.compareTerm(t) : tn[e.termType] < tn[t.termType] ? -1 : tn[e.termType] > tn[t.termType] ? 1 : e.value < t.value ? -1 : e.value > t.value ? 1 : 0;
  }
  /**
   * replaces @template with @target and add appropriate triples
   * removes no triples by default and is a one-direction replication
   * @param template node to copy
   * @param target node to copy to
   * @param flags Whether or not to do a two-directional copy and/or delete triples
   */
  copyTo(e, t, r) {
    r || (r = []);
    var i = this.statementsMatching(e);
    Bt(r, "two-direction") !== -1 && i.concat(this.statementsMatching(void 0, void 0, e));
    for (var s = 0; s < i.length; s++) {
      var a = i[s];
      switch (a.object.termType) {
        case "NamedNode":
          this.add(t, a.predicate, a.object);
          break;
        case "Literal":
        case "BlankNode":
        // @ts-ignore Collections can appear here
        case "Collection":
          this.add(t, a.predicate, a.object.copy(this));
      }
      Bt(r, "delete") !== -1 && this.remove(a);
    }
  }
  /**
   * Simplify graph in store when we realize two identifiers are equivalent
   * We replace the bigger with the smaller.
   * @param u1in The first node
   * @param u2in The second node
   */
  equate(e, t) {
    const r = this.canon(e), i = this.canon(t);
    var s = this.compareTerms(r, i);
    return s ? s < 0 ? this.replaceWith(i, r) : this.replaceWith(r, i) : !0;
  }
  /**
   * Creates a new empty indexed formula
   * Only applicable for IndexedFormula, but TypeScript won't allow a subclass to override a property
   * @param features The list of features
   */
  formula(e) {
    return new yn(e);
  }
  /**
   * Returns the number of statements contained in this IndexedFormula.
   * (Getter proxy to this.statements).
   * Usage:
   *    ```
   *    var kb = rdf.graph()
   *    kb.length  // -> 0
   *    ```
   * @returns {Number}
   */
  get length() {
    return this.statements.length;
  }
  /**
   * Returns any quads matching the given arguments.
   * Standard RDFJS spec method for Source objects, implemented as an
   * alias to `statementsMatching()`
   * @param subject The subject
   * @param predicate The predicate
   * @param object The object
   * @param graph The graph that contains the statement
   */
  match(e, t, r, i) {
    return this.statementsMatching(Xe.fromValue(e), Xe.fromValue(t), Xe.fromValue(r), Xe.fromValue(i));
  }
  /**
   * Find out whether a given URI is used as symbol in the formula
   * @param uri The URI to look for
   */
  mentionsURI(e) {
    var t = "<" + e + ">";
    return !!this.subjectIndex[t] || !!this.objectIndex[t] || !!this.predicateIndex[t];
  }
  /**
   * Existentials are BNodes - something exists without naming
   * @param uri An URI
   */
  newExistential(e) {
    if (!e) return this.bnode();
    var t = this.sym(e);
    return this.declareExistential(t);
  }
  /**
   * Adds a new property action
   * @param pred the predicate that the function should be triggered on
   * @param action the function that should trigger
   */
  newPropertyAction(e, t) {
    var r = this.id(e);
    this.propertyActions[r] || (this.propertyActions[r] = []), this.propertyActions[r].push(t);
    for (var i = this.statementsMatching(void 0, e, void 0), s = !1, a = 0; a < i.length; a++)
      s = s || t(this, i[a].subject, e, i[a].object);
    return s;
  }
  /**
   * Creates a new universal node
   * Universals are Variables
   * @param uri An URI
   */
  newUniversal(e) {
    var t = this.sym(e);
    return this._universalVariables || (this._universalVariables = []), this._universalVariables.push(t), t;
  }
  // convenience function used by N3 parser
  variable(e) {
    return new jn(e);
  }
  /**
   * Find an unused id for a file being edited: return a symbol
   * (Note: Slow iff a lot of them -- could be O(log(k)) )
   * @param doc A document named node
   */
  nextSymbol(e) {
    for (var t = 0; ; t++) {
      var r = e.value + "#n" + t;
      if (!this.mentionsURI(r)) return this.sym(r);
    }
  }
  /**
   * Query this store asynchronously, return bindings in callback
   *
   * @param myQuery The query to be run
   * @param callback Function to call when bindings
   * @param Fetcher | null  If you want the query to do link following
   * @param onDone OBSOLETE - do not use this // @@ Why not ?? Called when query complete
   */
  query(e, t, r, i) {
    return qs.call(this, e, t, r, i);
  }
  /**
   * Query this store synchronously and return bindings
   *
   * @param myQuery The query to be run
   */
  querySync(e) {
    var t = [];
    function r(a) {
      t.push(a);
    }
    function i() {
      s = !0;
    }
    var s = !1;
    if (e.sync = !0, qs.call(this, e, r, null, i), !s)
      throw new Error("Sync query should have called done function");
    return t;
  }
  /**
   * Removes one or multiple statement(s) from this formula
   * @param st - A Statement or array of Statements to remove
   */
  remove(e) {
    if (e instanceof Array) {
      for (var t = 0; t < e.length; t++)
        this.remove(e[t]);
      return this;
    }
    if (Na(e))
      return this.remove(e.statements);
    var r = this.statementsMatching(e.subject, e.predicate, e.object, e.graph);
    if (!r.length)
      throw new Error("Statement to be removed is not on store: " + e);
    return this.removeStatement(r[0]), this;
  }
  /**
   * Removes all statements in a doc, along with the related metadata including request/response/status
   * @param doc - The document / graph
   */
  removeDocument(e) {
    this.removeMetadata(e);
    for (var t = this.statementsMatching(void 0, void 0, void 0, e).slice(), r = 0; r < t.length; r++)
      this.removeStatement(t[r]);
    return this.removeMatches(e, null, null), this;
  }
  removeMetadata(e) {
    const t = this.sym("chrome://TheCurrentSession"), r = "http://www.w3.org/2007/ont/link#", i = this.statementsMatching(void 0, this.sym(`${r}requestedURI`), this.rdfFactory.literal(e.value), t).map((l) => l.subject);
    for (var s = 0; s < i.length; s++) {
      const l = i[s];
      if (l != null) {
        let u;
        const c = this.any(l, this.sym(`${r}status`), null, t);
        if (c != null) {
          u = this.statementsMatching(c, this.sym(`${r}status`), null, t).slice();
          for (var a = 0; a < u.length; a++)
            this.removeStatement(u[a]);
        }
        const h = this.any(l, this.sym(`${r}response`), null, t);
        if (h != null) {
          u = this.statementsMatching(h, null, null, t).slice();
          for (var a = 0; a < u.length; a++)
            this.removeStatement(u[a]);
        }
        u = this.statementsMatching(l, null, null, t).slice();
        for (var a = 0; a < u.length; a++)
          this.removeStatement(u[a]);
      }
    }
    return this.removeMatches(this.sym(e.value), null, null, t), this;
  }
  /**
   * Remove all statements matching args (within limit) *
   * @param subj The subject
   * @param pred The predicate
   * @param obj The object
   * @param why The graph that contains the statement
   * @param limit The number of statements to remove
   */
  removeMany(e, t, r, i, s) {
    for (var a = this.statementsMatching(e, t, r, i, !1), l = [], u = 0; u < a.length; u++) l.push(a[u]);
    for (s && (l = l.slice(0, s)), u = 0; u < l.length; u++) this.remove(l[u]);
  }
  /**
   * Remove all matching statements
   * @param subject The subject
   * @param predicate The predicate
   * @param object The object
   * @param graph The graph that contains the statement
   */
  removeMatches(e, t, r, i) {
    return this.removeMany(e, t, r, i), this;
  }
  /**
   * Remove a particular statement object from the store
   *
   * @param st - a statement which is already in the store and indexed.
   *        Make sure you only use this for these.
   *        Otherwise, you should use remove() above.
   */
  removeStatement(e) {
    for (var t = [e.subject, e.predicate, e.object, e.graph], r = 0; r < 4; r++) {
      var i = this.canon(t[r]), s = this.id(i);
      this.index[r][s] && this.rdfArrayRemove(this.index[r][s], e);
    }
    this.rdfArrayRemove(this.statements, e);
    for (const a of this.dataRemovalCallbacks)
      a(e);
    return this;
  }
  /**
   * Removes statements
   * @param sts The statements to remove
   */
  removeStatements(e) {
    for (var t = 0; t < e.length; t++)
      this.remove(e[t]);
    return this;
  }
  /**
   * Replace big with small, obsoleted with obsoleting.
   */
  replaceWith(e, t) {
    for (var r = this.id(e), i = this.id(t), s = function(l) {
      var u = l[r];
      if (u) {
        var c = l[i];
        c ? l[i] = u.concat(c) : l[i] = u, delete l[r];
      }
    }, a = 0; a < 4; a++)
      s(this.index[a]);
    if (this.redirections[r] = t, e.value) {
      if (this.aliases[i] || (this.aliases[i] = []), this.aliases[i].push(e), this.aliases[r])
        for (a = 0; a < this.aliases[r].length; a++)
          this.redirections[this.id(this.aliases[r][a])] = t, this.aliases[i].push(this.aliases[r][a]);
      this.add(t, this.sym("http://www.w3.org/2007/ont/link#uri"), e), this.fetcher && this.fetcher.nowKnownAs(e, t);
    }
    return s(this.classActions), s(this.propertyActions), !0;
  }
  /**
   * Return all equivalent URIs by which this is known
   * @param x A named node
   */
  allAliases(e) {
    var t = this.aliases[this.id(this.canon(e))] || [];
    return t.push(this.canon(e)), t;
  }
  /**
   * Compare by canonical URI as smushed
   * @param x A named node
   * @param y Another named node
   */
  sameThings(e, t) {
    if (e.equals(t))
      return !0;
    var r = this.canon(e);
    if (!r) return !1;
    var i = this.canon(t);
    return i ? r.value === i.value : !1;
  }
  setPrefixForURI(e, t) {
    if (!(e === "tab" && this.namespaces.tab) && !(e.slice(0, 2) === "ns" || e.slice(0, 7) === "default")) {
      for (let r in this.namespaces)
        this.namespaces[r] == t && delete this.namespaces[r];
      this.namespaces[e] = t;
    }
  }
  /** Search the Store
   *
   * ALL CONVENIENCE LOOKUP FUNCTIONS RELY ON THIS!
   * @param subj - A node to search for as subject, or if null, a wildcard
   * @param pred - A node to search for as predicate, or if null, a wildcard
   * @param obj - A node to search for as object, or if null, a wildcard
   * @param why - A node to search for as graph, or if null, a wildcard
   * @param justOne - flag - stop when found one rather than get all of them?
   * @returns An array of nodes which match the wildcard position
   */
  statementsMatching(e, t, r, i, s) {
    var a = [e, t, r, i], l = [], u = [], c = [], h, f;
    for (h = 0; h < 4; h++)
      l[h] = this.canon(Xe.fromValue(a[h])), l[h] && (c.push(h), u[h] = this.id(l[h]));
    if (c.length === 0)
      return this.statements;
    if (c.length === 1)
      return h = c[0], f = this.index[h][u[h]], f && s && f.length > 1 && (f = f.slice(0, 1)), f = f || [], f;
    var m = 1e10, v, w;
    for (w = 0; w < c.length; w++) {
      if (h = c[w], f = this.index[h][u[h]], !f)
        return [];
      f.length < m && (m = f.length, v = w);
    }
    for (var b = c[v], x = this.index[b][u[b]], _ = c.slice(0, v).concat(c.slice(v + 1)), R = [], G = ["subject", "predicate", "object", "why"], Y = 0; Y < x.length; Y++) {
      var A = x[Y];
      for (w = 0; w < _.length; w++)
        if (h = _[w], !this.canon(A[G[h]]).equals(l[h])) {
          A = null;
          break;
        }
      if (A != null && (R.push(A), s))
        break;
    }
    return R;
  }
  /**
   * A list of all the URIs by which this thing is known
   * @param term
   */
  uris(e) {
    var t = this.canon(e), r = this.aliases[this.id(t)];
    if (!t.value) return [];
    var i = [t.value];
    if (r)
      for (var s = 0; s < r.length; s++)
        i.push(r[s].uri);
    return i;
  }
  serialize(e, t, r, i) {
    const s = i?.namespaces ? {
      ...this.namespaces,
      ...i.namespaces
    } : {
      ...this.namespaces
    };
    return i = {
      ...i || {},
      namespaces: s
    }, Or(r, this, e, t, void 0, i);
  }
}
re(yn, "handleRDFType", void 0);
yn.handleRDFType = Pl;
const Mn = Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
function ud(n, e, t, r) {
  for (const i of n.statementsMatching(t, null, null, r)) {
    const s = new qt(e, i.predicate, i.object, r);
    n.remove(i), n.add(s);
  }
  for (const i of n.statementsMatching(null, t, null, r))
    n.remove(i), n.add(new qt(i.subject, e, i.object, r));
  for (const i of n.statementsMatching(null, null, t, r))
    n.remove(i), n.add(new qt(i.subject, i.predicate, e, r));
}
function cd(n, e) {
  const t = Mn("nil");
  for (const r of n.statementsMatching(t, null, null, e)) {
    n.remove(r);
    const i = new Ht();
    n.add(new qt(i, r.predicate, r.object, e));
  }
  for (const r of n.statementsMatching(null, null, t, e))
    if (!r.predicate.sameTerm(Mn("rest"))) {
      n.remove(r);
      const i = new Ht();
      n.add(new qt(r.subject, r.predicate, i, e));
    }
}
function dd(n, e) {
  function t(i, s, a) {
    const l = n.statementsMatching(i, Mn("rest"), null, e);
    if (l.length !== 1) throw new Error(`Bad list structure: no rest at ${i}`);
    const u = n.statementsMatching(i, Mn("first"), null, e);
    if (u.length !== 1) throw new Error(`Bad list structure: rest but ${u.length} firsts at ${i}`);
    const h = [u[0].object].concat(s), f = a.concat(l).concat(u), m = n.statementsMatching(null, Mn("rest"), i, e);
    if (m.length === 0) {
      const w = new Ht(h);
      n.remove(f), ud(n, w, i, e);
      return;
    }
    if (m.length !== 1) throw new Error(`Bad list structure: ${m.length} pres at ${i}`);
    const v = m[0].subject;
    if (v.termType !== "BlankNode") throw new Error(`Bad list element node ${v} type: ${v.termType} `);
    t(v, h, f);
  }
  cd(n, e), n.statementsMatching(null, Mn("rest"), Mn("nil"), e).forEach((i) => {
    if (i.subject.termType !== "BlankNode") throw new Error(`Bad list element node ${i.subject} type: ${i.subject.termType} `);
    t(i.subject, [], []);
  });
}
function hd(n) {
  return encodeURI(n);
}
var fd = {
  // public method for url encoding
  encode: function(n) {
    n = n.replace(/\r\n/g, `
`);
    for (var e = "", t = 0; t < n.length; t++) {
      var r = n.charCodeAt(t);
      r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192), e += String.fromCharCode(r & 63 | 128)) : (e += String.fromCharCode(r >> 12 | 224), e += String.fromCharCode(r >> 6 & 63 | 128), e += String.fromCharCode(r & 63 | 128));
    }
    return e;
  },
  // public method for url decoding
  decode: function(n) {
    for (var e = "", t = 0; t < n.length; ) {
      var r = n.charCodeAt(t);
      r < 128 ? (e += String.fromCharCode(r), t++) : r > 191 && r < 224 ? (e += String.fromCharCode((r & 31) << 6 | n.charCodeAt(t + 1) & 63), t += 2) : (e += String.fromCharCode((r & 15) << 12 | (n.charCodeAt(t + 1) & 63) << 6 | n.charCodeAt(t + 2) & 63), t += 3);
    }
    return e;
  }
}, Xa = "http://www.w3.org/2000/10/swap/log#", ct = function(n) {
  return n;
}, dt = function(n) {
  return n;
}, Cr = function(n) {
  if (n.length > 0) throw "missing.js: oops nnonempty dict not imp";
  return [];
}, Lt = function(n) {
  return n.length;
}, za = function(n, e, t) {
  if (typeof n.slice > "u") throw "@@ mising.js: No .slice function for " + n + " of type " + typeof n;
  return typeof t > "u" || t == null ? n.slice(e) : n.slice(e, t);
}, Dr = Error("dummy error stop iteration"), sa = function(n) {
  return this.last = 0, this.li = n, this.next = function() {
    if (this.last == this.li.length) throw Dr;
    return this.li[this.last++];
  }, this;
}, Ja = function(n, e) {
  return n.indexOf(e);
}, Rn = function(n, e) {
  if (!n)
    throw e ? "python Assertion failed: " + e : "(python) Assertion failed.";
}, pd = function(n) {
  return String.fromCharCode(n);
};
String.prototype.encode = function(n) {
  if (n != "utf-8") throw "UTF8_converter: can only do utf-8";
  return fd.encode(this);
};
String.prototype.decode = function(n) {
  if (n != "utf-8") throw "UTF8_converter: can only do utf-8";
  return this;
};
var Ya = function(n, e) {
  return Dt(e, n);
}, md = null, gd = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", Hs = "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil", Ws = "http://www.w3.org/2002/07/owl#sameAs", yd = "#", vd = "http://www.w3.org/2001/XMLSchema#integer", wd = "http://www.w3.org/2001/XMLSchema#double", Ed = "http://www.w3.org/2001/XMLSchema#decimal", Cd = "http://www.w3.org/2001/XMLSchema#date", bd = "http://www.w3.org/2001/XMLSchema#dateTime", $l = `	\r
 !"#$%&'()*.,+/;<=>?@[\\]^\`{|}~`, Yn = $l + ":", Qa = new RegExp("^([-+]?[0-9]+)(\\.[0-9]+)?([eE][-+]?[0-9]+)?", "g"), Vs = new RegExp("^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9](T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\\.[0-9]*)?)?)?Z?"), Nd = new RegExp("[\\s#]"), Za = new RegExp('[\\\\\\r\\n\\"]', "g"), ei = new RegExp("^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*", "g");
function la(n, e) {
  var t = n.charAt(e + 1);
  return t === "" || Nd.test(t);
}
function Si(n, e, t, r, i, s, a, l) {
  return new Ad(n, e, t, r, i, s, a, l);
}
class Ad {
  constructor(e, t, r, i, s, a, l, u) {
    typeof t > "u" && (t = null), typeof r > "u" && (r = ""), typeof i > "u" && (i = null), typeof s > "u" && (s = ""), typeof l > "u" && (l = ""), typeof u > "u" && (u = null), this._bindings = new Cr([]), this._flags = l, r != "" && (Rn(r.indexOf(":") >= 0, "Document URI not absolute: " + r), this._bindings[""] = r + "#"), this._store = e, s && e.setGenPrefix(s), this._thisDoc = r, this.source = e.sym(r), this.lines = 0, this.statementCount = 0, this.hasNil = !1, this.startOfLine = 0, this.previousLine = 0, this._genPrefix = s, this.keywords = new dt(["a", "this", "bind", "has", "is", "of", "true", "false"]), this.keywordsSet = 0, this._anonymousNodes = new Cr([]), this._variables = new Cr([]), this._parentVariables = new Cr([]), this._reason = u, this._reason2 = null, i ? this._baseURI = i : r ? this._baseURI = r : this._baseURI = null, Rn(!this._baseURI || this._baseURI.indexOf(":") >= 0), this._genPrefix || (this._thisDoc ? this._genPrefix = this._thisDoc + "#_g" : this._genPrefix = RDFSink_uniqueURI()), t == null ? this._thisDoc ? this._formula = e.formula(r + "#_formula") : this._formula = e.formula() : this._formula = t, this._context = this._formula, this._parentContext = null;
  }
  here(e) {
    return this._genPrefix + "_L" + this.lines + "C" + (e - this.startOfLine + 1);
  }
  formula() {
    return this._formula;
  }
  loadStream(e) {
    return this.loadBuf(e.read());
  }
  loadBuf(e) {
    return this.startDoc(), this.feed(e), this.endDoc();
  }
  feed(e) {
    for (var t = e.decode("utf-8"), r = 0; r >= 0; ) {
      var i = this.skipSpace(t, r);
      if (i < 0)
        return;
      var r = this.directiveOrStatement(t, i);
      if (r < 0)
        throw ye(this._thisDoc, this.lines, t, i, "expected directive or statement");
    }
  }
  directiveOrStatement(e, t) {
    var r = this.skipSpace(e, t);
    if (r < 0)
      return r;
    var i = this.directive(e, r);
    if (i >= 0)
      return this.checkDot(e, i);
    var i = this.statement(e, r);
    return i >= 0 ? this.checkDot(e, i) : i;
  }
  tok(e, t, r) {
    if (t.slice(r, r + 1) == "@")
      var r = r + 1;
    else if (Bt(this.keywords, e) < 0)
      return -1;
    var i = r + Lt(e);
    return t.slice(r, i) == e && $l.indexOf(t.charAt(i)) >= 0 ? i : -1;
  }
  directive(e, t) {
    var u = this.skipSpace(e, t);
    if (u < 0)
      return u;
    var r = new dt([]), u = this.tok("bind", e, t);
    if (u > 0)
      throw ye(this._thisDoc, this.lines, e, t, "keyword bind is obsolete: use @prefix");
    var u = this.tok("keywords", e, t);
    if (u > 0) {
      var t = this.commaSeparatedList(e, u, r, !1);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, t, "'@keywords' needs comma separated list of words");
      return this.setKeywords(za(r, null, null)), t;
    }
    var u = this.tok("forAll", e, t);
    if (u > 0) {
      var t = this.commaSeparatedList(e, u, r, !0);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, t, "Bad variable list after @forAll");
      var i = new sa(r);
      try {
        for (; ; ) {
          var s = i.next();
          (Bt(this._variables, s) < 0 || Bt(this._parentVariables, s) >= 0) && (this._variables[s] = this._context.newUniversal(s));
        }
      } catch (h) {
        if (h != Dr)
          throw h;
      }
      return t;
    }
    var u = this.tok("forSome", e, t);
    if (u > 0) {
      var t = this.commaSeparatedList(e, u, r, this.uri_ref2);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, t, "Bad variable list after @forSome");
      var i = new sa(r);
      try {
        for (; ; ) {
          var s = i.next();
          this._context.declareExistential(s);
        }
      } catch (f) {
        if (f != Dr)
          throw f;
      }
      return t;
    }
    var u = this.tok("prefix", e, t);
    if (u >= 0) {
      var a = new dt([]), t = this.qname(e, u, a);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, u, "expected qname after @prefix");
      var u = this.uri_ref2(e, t, a);
      if (u < 0)
        throw ye(this._thisDoc, this.lines, e, t, "expected <uriref> after @prefix _qname_");
      var l = a[1].uri;
      if (this._baseURI)
        var l = Ya(this._baseURI, l);
      else
        Rn(l.indexOf(":") >= 0, "With no base URI, cannot handle relative URI for NS");
      return Rn(l.indexOf(":") >= 0), this._bindings[a[0][0]] = l, this.bind(a[0][0], hd(l)), u;
    }
    var u = this.tok("base", e, t);
    if (u >= 0) {
      var a = new dt([]), t = this.uri_ref2(e, u, a);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, u, "expected <uri> after @base ");
      var l = a[0].uri;
      if (this._baseURI)
        var l = Ya(this._baseURI, l);
      else
        throw ye(this._thisDoc, this.lines, e, u, "With no previous base URI, cannot use relative URI in @base  <" + l + ">");
      return Rn(l.indexOf(":") >= 0), this._baseURI = l, t;
    }
    return -1;
  }
  bind(e, t) {
    e == "" || this._store.setPrefixForURI(e, t);
  }
  setKeywords(e) {
    e == null ? this.keywordsSet = 0 : (this.keywords = e, this.keywordsSet = 1);
  }
  startDoc() {
  }
  /* Signal end of document and stop parsing. returns formula */
  endDoc() {
    return this.hasNil && this._store.rdfFactory.supports.COLLECTIONS && dd(this._store, this.source), this._formula;
  }
  makeStatement(e) {
    e[0].add(e[2], e[1], e[3], this.source), (e[2].uri && e[2].uri === Hs || e[3].uri && e[3].uri === Hs) && (this.hasNil = !0), this.statementCount += 1;
  }
  statement(e, i) {
    var r = new dt([]), i = this.object(e, i, r);
    if (i < 0)
      return i;
    var s = this.property_list(e, i, r[0]);
    if (s < 0)
      throw ye(this._thisDoc, this.lines, e, i, "expected propertylist");
    return s;
  }
  subject(e, t, r) {
    return this.item(e, t, r);
  }
  verb(e, t, r) {
    var s = this.skipSpace(e, t);
    if (s < 0)
      return s;
    var i = new dt([]), s = this.tok("has", e, t);
    if (s >= 0) {
      var t = this.prop(e, s, i);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, s, "expected property after 'has'");
      return r.push(new ct(["->", i[0]])), t;
    }
    var s = this.tok("is", e, t);
    if (s >= 0) {
      var t = this.prop(e, s, i);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, s, "expected <property> after 'is'");
      var s = this.skipSpace(e, t);
      if (s < 0)
        throw ye(this._thisDoc, this.lines, e, t, "End of file found, expected property after 'is'");
      var t = s, s = this.tok("of", e, t);
      if (s < 0)
        throw ye(this._thisDoc, this.lines, e, t, "expected 'of' after 'is' <prop>");
      return r.push(new ct(["<-", i[0]])), s;
    }
    var s = this.tok("a", e, t);
    if (s >= 0)
      return r.push(new ct(["->", this._store.sym(gd)])), s;
    if (e.slice(t, t + 2) == "<=")
      return r.push(new ct(["<-", this._store.sym(Xa + "implies")])), t + 2;
    if (e.slice(t, t + 1) == "=")
      return e.slice(t + 1, t + 2) == ">" ? (r.push(new ct(["->", this._store.sym(Xa + "implies")])), t + 2) : (r.push(new ct(["->", this._store.sym(Ws)])), t + 1);
    if (e.slice(t, t + 2) == ":=")
      return r.push(new ct(["->", Xa + "becomes"])), t + 2;
    var s = this.prop(e, t, i);
    if (s >= 0)
      return r.push(new ct(["->", i[0]])), s;
    if (e.slice(t, t + 2) == ">-" || e.slice(t, t + 2) == "<-")
      throw ye(this._thisDoc, this.lines, e, s, ">- ... -> syntax is obsolete.");
    return -1;
  }
  prop(e, t, r) {
    return this.item(e, t, r);
  }
  item(e, t, r) {
    return this.path(e, t, r);
  }
  blankNode(e) {
    return this._context.bnode(e, this._reason2);
  }
  path(e, t, r) {
    var i = this.nodeOrLiteral(e, t, r);
    if (i < 0)
      return i;
    for (; "!^.".indexOf(e.slice(i, i + 1)) >= 0; ) {
      var s = e.slice(i, i + 1);
      if (s == "." && la(e, i))
        break;
      var a = r.pop(), l = this.blankNode(this.here(i)), i = this.node(e, i + 1, r);
      if (i < 0)
        throw ye(this._thisDoc, this.lines, e, i, "EOF found in middle of path syntax");
      var u = r.pop();
      s == "^" ? this.makeStatement(new ct([this._context, u, l, a])) : this.makeStatement(new ct([this._context, u, a, l])), r.push(l);
    }
    return i;
  }
  anonymousNode(e) {
    var t = this._anonymousNodes[e];
    if (t)
      return t;
    var t = this._store.bnode(e);
    return this._anonymousNodes[e] = t, t;
  }
  node(e, a, r, i) {
    typeof i > "u" && (i = null);
    var s = i, A = this.skipSpace(e, a);
    if (A < 0)
      return A;
    var a = A, l = e.slice(a, a + 1);
    if (l == "[") {
      var u = this.here(a), A = this.skipSpace(e, a + 1);
      if (A < 0)
        throw ye(this._thisDoc, this.lines, e, a, "EOF after '['");
      if (e.slice(A, A + 1) == "=") {
        var a = A + 1, c = new dt([]), A = this.objectList(e, a, c);
        if (A >= 0) {
          var s = c[0];
          if (Lt(c) > 1) {
            var h = new sa(c);
            try {
              for (; ; ) {
                var f = h.next();
                this.makeStatement(new ct([this._context, this._store.sym(Ws), s, f]));
              }
            } catch (q) {
              if (q != Dr)
                throw q;
            }
          }
          var A = this.skipSpace(e, A);
          if (A < 0)
            throw ye(this._thisDoc, this.lines, e, a, "EOF when objectList expected after [ = ");
          if (e.slice(A, A + 1) == ";")
            var A = A + 1;
        } else
          throw ye(this._thisDoc, this.lines, e, a, "objectList expected after [= ");
      }
      if (s == null)
        var s = this.blankNode(u);
      var a = this.property_list(e, A, s);
      if (a < 0)
        throw ye(this._thisDoc, this.lines, e, A, "property_list expected");
      var A = this.skipSpace(e, a);
      if (A < 0)
        throw ye(this._thisDoc, this.lines, e, a, "EOF when ']' expected after [ <propertyList>");
      if (e.slice(A, A + 1) == ".")
        return r.push(s), A;
      if (e.slice(A, A + 1) != "]")
        throw ye(this._thisDoc, this.lines, e, A, "']' expected");
      return r.push(s), A + 1;
    }
    if (l == "{") {
      var m = e.slice(a + 1, a + 2);
      if (m == "$") {
        a += 1;
        for (var A = a + 1, v = new dt([]), w = !0; ; ) {
          var a = this.skipSpace(e, A);
          if (a < 0)
            throw ye(this._thisDoc, this.lines, e, a, "needed '$}', found end.");
          if (e.slice(a, a + 2) == "$}") {
            var A = a + 2;
            break;
          }
          if (w)
            var w = !1;
          else if (e.slice(a, a + 1) == ",")
            a += 1;
          else
            throw ye(this._thisDoc, this.lines, e, a, "expected: ','");
          var b = new dt([]), A = this.item(e, a, b);
          if (A < 0)
            throw ye(this._thisDoc, this.lines, e, a, "expected item in set or '$}'");
          v.push(b[0]);
        }
        return r.push(this._store.newSet(v, this._context)), A;
      } else {
        var A = a + 1, x = this._parentContext;
        this._parentContext = this._context;
        var _ = this._anonymousNodes, R = this._parentVariables;
        this._parentVariables = this._variables, this._anonymousNodes = new Cr([]), this._variables = this._variables.slice();
        var G = this._reason2;
        if (this._reason2 = md, s == null)
          var s = this._store.formula();
        for (this._context = s; ; ) {
          var a = this.skipSpace(e, A);
          if (a < 0)
            throw ye(this._thisDoc, this.lines, e, a, "needed '}', found end.");
          if (e.slice(a, a + 1) == "}") {
            var A = a + 1;
            break;
          }
          var A = this.directiveOrStatement(e, a);
          if (A < 0)
            throw ye(this._thisDoc, this.lines, e, a, "expected statement or '}'");
        }
        return this._anonymousNodes = _, this._variables = this._parentVariables, this._parentVariables = R, this._context = this._parentContext, this._reason2 = G, this._parentContext = x, r.push(s.close()), A;
      }
    }
    if (l == "(") {
      var Y = this._store.list, m = e.slice(a + 1, a + 2);
      if (m == "$") {
        var Y = this._store.newSet;
        a += 1;
      }
      for (var A = a + 1, v = new dt([]); ; ) {
        var a = this.skipSpace(e, A);
        if (a < 0)
          throw ye(this._thisDoc, this.lines, e, a, "needed ')', found end.");
        if (e.slice(a, a + 1) == ")") {
          var A = a + 1;
          break;
        }
        var b = new dt([]), A = this.item(e, a, b);
        if (A < 0)
          throw ye(this._thisDoc, this.lines, e, a, "expected item in list or ')'");
        v.push(b[0]);
      }
      return r.push(Y(v, this._context)), A;
    }
    var A = this.tok("this", e, a);
    if (A >= 0)
      throw ye(this._thisDoc, this.lines, e, a, "Keyword 'this' was ancient N3. Now use @forSome and @forAll keywords.");
    var A = this.tok("true", e, a);
    if (A >= 0)
      return r.push(!0), A;
    var A = this.tok("false", e, a);
    if (A >= 0)
      return r.push(!1), A;
    if (s == null) {
      var A = this.uri_ref2(e, a, r);
      if (A >= 0)
        return A;
    }
    return -1;
  }
  property_list(e, t, r) {
    for (; ; ) {
      var m = this.skipSpace(e, t);
      if (m < 0)
        throw ye(this._thisDoc, this.lines, e, t, "EOF found when expected verb in property list");
      if (e.slice(m, m + 2) == ":-") {
        var t = m + 2, i = new dt([]), m = this.node(e, t, i, r);
        if (m < 0)
          throw ye(this._thisDoc, this.lines, e, t, "bad {} or () or [] node after :- ");
        var t = m;
        continue;
      }
      var t = m, s = new dt([]), m = this.verb(e, t, s);
      if (m <= 0)
        return t;
      var a = new dt([]), t = this.objectList(e, m, a);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, m, "objectList expected");
      var l = new sa(a);
      try {
        for (; ; ) {
          var u = l.next(), c = s[0], h = c[0], f = c[1];
          h == "->" ? this.makeStatement(new ct([this._context, f, r, u])) : this.makeStatement(new ct([this._context, f, u, r]));
        }
      } catch (w) {
        if (w != Dr)
          throw w;
      }
      var m = this.skipSpace(e, t);
      if (m < 0)
        throw ye(this._thisDoc, this.lines, e, m, "EOF found in list of objects");
      if (e.slice(t, t + 1) != ";")
        return t;
      var t = t + 1;
    }
  }
  commaSeparatedList(e, t, r, i) {
    var s = this.skipSpace(e, t);
    if (s < 0)
      throw ye(this._thisDoc, this.lines, e, s, "EOF found expecting comma sep list");
    if (e.charAt(s) == ".")
      return t;
    if (i)
      var s = this.uri_ref2(e, s, r);
    else
      var s = this.bareWord(e, s, r);
    if (s < 0)
      return -1;
    for (; ; ) {
      var t = this.skipSpace(e, s);
      if (t < 0)
        return t;
      var a = e.slice(t, t + 1);
      if (a != ",")
        return a != "." ? -1 : t;
      if (i)
        var s = this.uri_ref2(e, t + 1, r);
      else
        var s = this.bareWord(e, t + 1, r);
      if (s < 0)
        throw ye(this._thisDoc, this.lines, e, s, "bad list content");
    }
  }
  objectList(e, i, r) {
    var i = this.object(e, i, r);
    if (i < 0)
      return -1;
    for (; ; ) {
      var s = this.skipSpace(e, i);
      if (s < 0)
        throw ye(this._thisDoc, this.lines, e, s, "EOF found after object");
      if (e.slice(s, s + 1) != ",")
        return s;
      var i = this.object(e, s + 1, r);
      if (i < 0)
        return i;
    }
  }
  checkDot(e, t) {
    var r = this.skipSpace(e, t);
    if (r < 0)
      return r;
    if (e.slice(r, r + 1) == ".")
      return r + 1;
    if (e.slice(r, r + 1) == "}" || e.slice(r, r + 1) == "]")
      return r;
    throw ye(this._thisDoc, this.lines, e, r, "expected '.' or '}' or ']' at end of statement");
  }
  uri_ref2(e, f, r) {
    var i = new dt([]), s = this.qname(e, f, i);
    if (s >= 0) {
      var a = i[0], l = a[0], u = a[1];
      if (l == null) {
        Rn(0, "not used?");
        var c = this._baseURI + yd;
      } else {
        var c = this._bindings[l];
        if (!c) {
          if (l == "_")
            return r.push(this.anonymousNode(u)), s;
          throw ye(this._thisDoc, this.lines, e, f, "Prefix " + l + " not bound.");
        }
      }
      var h = this._store.sym(c + u);
      return Bt(this._variables, h) >= 0 ? r.push(this._variables[h]) : r.push(h), s;
    }
    var f = this.skipSpace(e, f);
    if (f < 0)
      return -1;
    if (e.charAt(f) == "?") {
      var m = new dt([]), s = this.variable(e, f, m);
      return s > 0 ? (r.push(m[0]), s) : -1;
    } else if (e.charAt(f) == "<") {
      for (var f = f + 1, v = f; f < Lt(e); ) {
        if (e.charAt(f) == ">") {
          var w = e.slice(v, f);
          if (this._baseURI)
            var w = Ya(this._baseURI, w);
          else
            Rn(w.indexOf(":") >= 0, "With no base URI, cannot deal with relative URIs");
          if (e.slice(f - 1, f) == "#" && za(w, -1, null) != "#")
            var w = w + "#";
          var h = this._store.sym(w);
          return Bt(this._variables, h) >= 0 ? r.push(this._variables[h]) : r.push(h), f + 1;
        }
        var f = f + 1;
      }
      throw ye(this._thisDoc, this.lines, e, s, "unterminated URI reference");
    } else if (this.keywordsSet) {
      var m = new dt([]), s = this.bareWord(e, f, m);
      if (s < 0)
        return -1;
      if (Bt(this.keywords, m[0]) >= 0)
        throw ye(this._thisDoc, this.lines, e, f, 'Keyword "' + m[0] + '" not allowed here.');
      return r.push(this._store.sym(this._bindings[""] + m[0])), s;
    } else
      return -1;
  }
  skipSpace(e, t) {
    for (var r = ` 
\r	\f\v            ​\u2028\u2029　`, i = t || 0; i < e.length; i++) {
      var s = e.charAt(i);
      if (r.indexOf(s) < 0)
        if (e.charAt(i) === "#")
          for (; ; i++) {
            if (i === e.length)
              return -1;
            if (e.charAt(i) === `
`) {
              this.lines = this.lines + 1;
              break;
            }
          }
        else
          return i;
      else
        e.charAt(i) === `
` && (this.lines = this.lines + 1);
    }
    return -1;
  }
  variable(e, s, r) {
    var i = this.skipSpace(e, s);
    if (i < 0 || e.slice(i, i + 1) != "?")
      return -1;
    var i = i + 1, s = i;
    if ("0123456789-".indexOf(e.charAt(i)) >= 0)
      throw ye(this._thisDoc, this.lines, e, i, "Varible name can't start with '" + e.charAt(i) + "s'");
    for (; s < Lt(e) && Yn.indexOf(e.charAt(s)) < 0; )
      var s = s + 1;
    if (this._parentContext == null)
      throw ye(this._thisDoc, this.lines, e, i, "Can't use ?xxx syntax for variable in outermost level: " + e.slice(i - 1, s));
    return r.push(this._store.variable(e.slice(i, s))), s;
  }
  bareWord(e, a, r) {
    var i = this.skipSpace(e, a);
    if (i < 0)
      return -1;
    var s = e.charAt(i);
    if ("0123456789-".indexOf(s) >= 0 || Yn.indexOf(s) >= 0)
      return -1;
    for (var a = i; a < Lt(e); ) {
      var l = e.charAt(a);
      if (l === ".") {
        if (la(e, a))
          break;
      } else if (Yn.indexOf(l) >= 0)
        break;
      var a = a + 1;
    }
    return r.push(e.slice(i, a)), a;
  }
  qname(e, i, r) {
    var i = this.skipSpace(e, i);
    if (i < 0)
      return -1;
    var s = e.charAt(i);
    if ("0123456789-+".indexOf(s) >= 0)
      return -1;
    if (Yn.indexOf(s) < 0)
      for (var a = s, i = i + 1; i < Lt(e); ) {
        var s = e.charAt(i);
        if (s === ".") {
          if (la(e, i))
            break;
        } else if (Yn.indexOf(s) >= 0)
          break;
        var a = a + s, i = i + 1;
      }
    else
      var a = "";
    if (i < Lt(e) && e.charAt(i) == ":") {
      for (var l = a, i = i + 1, a = ""; i < Lt(e); ) {
        var s = e.charAt(i);
        if (s === ".") {
          if (la(e, i))
            break;
        } else if (Yn.indexOf(s) >= 0)
          break;
        var a = a + s, i = i + 1;
      }
      return r.push(new ct([l, a])), i;
    } else
      return a && this.keywordsSet && Bt(this.keywords, a) < 0 ? (r.push(new ct(["", a])), i) : -1;
  }
  object(e, t, r) {
    var i = this.subject(e, t, r);
    if (i >= 0)
      return i;
    {
      var i = this.skipSpace(e, t);
      if (i < 0)
        return -1;
      var t = i, s = null;
      let c = e.charAt(t);
      if (c == '"' || c == "'") {
        e.slice(t, t + 3 == c + c) ? s = c + c + c : s = c;
        var t = t + Lt(s), a = this.strconst(e, t, s), i = a[0], l = a[1];
        return r.push(this._store.literal(l)), i;
      } else
        return -1;
    }
  }
  nodeOrLiteral(e, t, r) {
    var i = this.node(e, t, r);
    if (i >= 0)
      return i;
    var i = this.skipSpace(e, t);
    if (i < 0)
      return -1;
    var t = i, s = e.charAt(t);
    if ("-+0987654321".indexOf(s) >= 0) {
      Vs.lastIndex = 0;
      var a = Vs.exec(e.slice(t));
      if (a != null) {
        var l = a[0];
        i = t + l.length, l.indexOf("T") >= 0 ? r.push(this._store.literal(l, this._store.sym(bd))) : r.push(this._store.literal(l, this._store.sym(Cd)));
      } else {
        Qa.lastIndex = 0;
        var a = Qa.exec(e.slice(t));
        if (a == null)
          throw ye(this._thisDoc, this.lines, e, t, "Bad number or date syntax");
        i = t + Qa.lastIndex;
        var l = e.slice(t, i);
        l.indexOf("e") >= 0 ? r.push(this._store.literal(parseFloat(l), this._store.sym(wd))) : e.slice(t, i).indexOf(".") >= 0 ? r.push(this._store.literal(parseFloat(l), this._store.sym(Ed))) : r.push(this._store.literal(parseInt(l), this._store.sym(vd)));
      }
      return i;
    }
    if (e.charAt(t) == '"') {
      if (e.slice(t, t + 3) == '"""')
        var u = '"""';
      else
        var u = '"';
      var t = t + Lt(u), c = null, h = this.strconst(e, t, u), i = h[0], f = h[1], m = null;
      if (e.slice(i, i + 1) == "@") {
        ei.lastIndex = 0;
        var a = ei.exec(e.slice(i + 1));
        if (a == null)
          throw ye(this._thisDoc, startline, e, t, "Bad language code syntax on string literal, after @");
        var t = ei.lastIndex + i + 1, m = e.slice(i + 1, t), i = t;
      }
      if (e.slice(i, i + 2) == "^^")
        var v = new dt([]), i = this.uri_ref2(e, i + 2, v), c = v[0];
      return r.push(this._store.literal(f, m || c)), i;
    } else
      return -1;
  }
  strconst(e, t, r) {
    for (var i = t, s = "", a = this.lines; i < Lt(e); ) {
      var t = i + Lt(r);
      if (e.slice(i, t) == r)
        return new ct([t, s]);
      if (e.charAt(i) == '"') {
        var s = s + '"', i = i + 1;
        continue;
      }
      Za.lastIndex = 0;
      var l = Za.exec(e.slice(i));
      if (!l)
        throw ye(this._thisDoc, a, e, i, "Closing quote missing in string at ^ in " + e.slice(i - 20, i) + "^" + e.slice(i, i + 20));
      var t = i + Za.lastIndex - 1, s = s + e.slice(i, t), u = e.charAt(t);
      if (u == '"') {
        var i = t;
        continue;
      } else if (u == "\r") {
        var i = t + 1;
        continue;
      } else if (u == `
`) {
        if (r == '"')
          throw ye(this._thisDoc, a, e, t, "newline found in string literal");
        this.lines = this.lines + 1;
        var s = s + u, i = t + 1;
        this.previousLine = this.startOfLine, this.startOfLine = i;
      } else if (u == "\\") {
        var i = t + 1, u = e.slice(i, i + 1);
        if (!u)
          throw ye(this._thisDoc, a, e, t, "unterminated string literal (2)");
        var c = Ja('abfrtvn\\"', u);
        if (c >= 0)
          var h = `a\b\f\r	\v
\\"`.charAt(c), s = s + h, i = i + 1;
        else if (u == "u")
          var f = this.uEscape(e, i + 1, a), i = f[0], u = f[1], s = s + u;
        else if (u == "U")
          var f = this.UEscape(e, i + 1, a), i = f[0], u = f[1], s = s + u;
        else
          throw ye(this._thisDoc, this.lines, e, t, "bad escape");
      }
    }
    throw ye(this._thisDoc, this.lines, e, t, "unterminated string literal");
  }
  uEscape(e, t, r) {
    for (var i = t, s = 0, a = 0; s < 4; ) {
      var l = e.slice(i, i + 1), u = l.toLowerCase(), i = i + 1;
      if (u == "")
        throw ye(this._thisDoc, r, e, t, "unterminated string literal(3)");
      var c = Ja("0123456789abcdef", u);
      if (c < 0)
        throw ye(this._thisDoc, r, e, t, "bad string literal hex escape");
      var a = a * 16 + c, s = s + 1;
    }
    var h = String.fromCharCode(a);
    return new ct([i, h]);
  }
  UEscape(e, t, r) {
    for (var i = t, s = 0, a = "\\U"; s < 8; ) {
      var l = e.slice(i, i + 1), u = l.toLowerCase(), i = i + 1;
      if (u == "")
        throw ye(this._thisDoc, r, e, t, "unterminated string literal(3)");
      var c = Ja("0123456789abcdef", u);
      if (c < 0)
        throw ye(this._thisDoc, r, e, t, "bad string literal hex escape");
      var a = a + u, s = s + 1;
    }
    var h = pd("0x" + za(a, 2, 10) - 0);
    return new ct([i, h]);
  }
}
function ye(n, e, t, r, i) {
  let s = e + 1, a = "Line " + s + " of <" + n + ">: Bad syntax: " + i + `
at: "` + t.slice(r, r + 30) + '"', l = new SyntaxError(a, n, s);
  return l.lineNo = s, l.characterInFile = r, l.syntaxProblem = i, l;
}
const pi = {
  ...Pt,
  supports: {
    [xt.collections]: !0,
    [xt.defaultGraphType]: !1,
    [xt.equalsMethod]: !0,
    [xt.identity]: !1,
    [xt.id]: !0,
    [xt.reversibleId]: !1,
    [xt.variableType]: !0
  },
  /**
   * Creates a new collection
   * @param elements - The initial element
   */
  collection(n) {
    return new Ht(n);
  },
  id(n) {
    return Ti(n) ? `( ${n.elements.map((e) => this.id(e)).join(", ")} )` : Mc(n) ? jn.toString(n) : Pt.id(n);
  },
  termToNQ(n) {
    return n.termType === Tn ? Ht.toNT(n) : Pt.termToNQ(n);
  }
};
function Fi(n, e) {
  return typeof e == "string" ? n.rdfFactory.literal(e) : Object.prototype.hasOwnProperty.call(e, "@list") ? n.rdfFactory.supports.COLLECTIONS === !0 ? Td(n, e["@list"]) : xd(n, e) : Object.prototype.hasOwnProperty.call(e, "@id") ? Ii(n, e) : Object.prototype.hasOwnProperty.call(e, "@language") ? n.rdfFactory.literal(e["@value"], e["@language"]) : Object.prototype.hasOwnProperty.call(e, "@type") ? n.rdfFactory.literal(e["@value"], n.rdfFactory.namedNode(e["@type"])) : Object.prototype.hasOwnProperty.call(e, "@value") ? n.rdfFactory.literal(e["@value"]) : n.rdfFactory.literal(e);
}
function xd(n, e) {
  const t = e["@id"] ? Ii(n, e) : n.rdfFactory.blankNode(), r = e["@list"].map((s) => Fi(n, s)), i = Ml(n.rdfFactory, t, r);
  return n.addAll(i), t;
}
function Td(n, e) {
  if (!Array.isArray(e))
    throw new TypeError("Object must be an array");
  return n.rdfFactory.collection(e.map((t) => Fi(n, t)));
}
async function ql(n, e, t) {
  const r = t && Object.prototype.hasOwnProperty.call(t, "termType") ? t.value : t;
  return (await (await import("./jsonld-DQidnTew.js").then((a) => a.j)).default.flatten(JSON.parse(n), null, {
    base: r
  })).reduce((a, l) => Hl(a, t, l), e);
}
function Ii(n, e) {
  return e["@id"].startsWith("_:") ? n.rdfFactory.blankNode(e["@id"].substring(2)) : n.rdfFactory.namedNode(e["@id"]);
}
function Hl(n, e, t) {
  const r = t["@id"] ? Ii(n, t) : n.rdfFactory.blankNode();
  for (const i of Object.keys(t)) {
    if (i === "@id")
      continue;
    if (i == "@graph") {
      const a = r, l = t[i];
      for (let u = 0; u < l.length; u++)
        n = Hl(n, a, l[u]);
    }
    const s = t[i];
    if (Array.isArray(s))
      for (let a = 0; a < s.length; a++)
        n.addStatement(Ks(n, r, i, s[a], e));
    else
      n.addStatement(Ks(n, r, i, s, e));
  }
  return n;
}
function Ks(n, e, t, r, i) {
  let s, a;
  return t === "@type" ? (s = n.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), a = n.rdfFactory.namedNode(r)) : (s = n.rdfFactory.namedNode(t), a = Fi(n, r)), n.rdfFactory.quad(e, s, a, n.rdfFactory.namedNode(i));
}
var ti = {}, br = {}, Gs;
function Dd() {
  if (Gs) return br;
  Gs = 1, br.byteLength = l, br.toByteArray = c, br.fromByteArray = m;
  for (var n = [], e = [], t = typeof Uint8Array < "u" ? Uint8Array : Array, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = r.length; i < s; ++i)
    n[i] = r[i], e[r.charCodeAt(i)] = i;
  e[45] = 62, e[95] = 63;
  function a(v) {
    var w = v.length;
    if (w % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var b = v.indexOf("=");
    b === -1 && (b = w);
    var x = b === w ? 0 : 4 - b % 4;
    return [b, x];
  }
  function l(v) {
    var w = a(v), b = w[0], x = w[1];
    return (b + x) * 3 / 4 - x;
  }
  function u(v, w, b) {
    return (w + b) * 3 / 4 - b;
  }
  function c(v) {
    var w, b = a(v), x = b[0], _ = b[1], R = new t(u(v, x, _)), G = 0, Y = _ > 0 ? x - 4 : x, A;
    for (A = 0; A < Y; A += 4)
      w = e[v.charCodeAt(A)] << 18 | e[v.charCodeAt(A + 1)] << 12 | e[v.charCodeAt(A + 2)] << 6 | e[v.charCodeAt(A + 3)], R[G++] = w >> 16 & 255, R[G++] = w >> 8 & 255, R[G++] = w & 255;
    return _ === 2 && (w = e[v.charCodeAt(A)] << 2 | e[v.charCodeAt(A + 1)] >> 4, R[G++] = w & 255), _ === 1 && (w = e[v.charCodeAt(A)] << 10 | e[v.charCodeAt(A + 1)] << 4 | e[v.charCodeAt(A + 2)] >> 2, R[G++] = w >> 8 & 255, R[G++] = w & 255), R;
  }
  function h(v) {
    return n[v >> 18 & 63] + n[v >> 12 & 63] + n[v >> 6 & 63] + n[v & 63];
  }
  function f(v, w, b) {
    for (var x, _ = [], R = w; R < b; R += 3)
      x = (v[R] << 16 & 16711680) + (v[R + 1] << 8 & 65280) + (v[R + 2] & 255), _.push(h(x));
    return _.join("");
  }
  function m(v) {
    for (var w, b = v.length, x = b % 3, _ = [], R = 16383, G = 0, Y = b - x; G < Y; G += R)
      _.push(f(v, G, G + R > Y ? Y : G + R));
    return x === 1 ? (w = v[b - 1], _.push(
      n[w >> 2] + n[w << 4 & 63] + "=="
    )) : x === 2 && (w = (v[b - 2] << 8) + v[b - 1], _.push(
      n[w >> 10] + n[w >> 4 & 63] + n[w << 2 & 63] + "="
    )), _.join("");
  }
  return br;
}
var oa = {};
var js;
function _d() {
  return js || (js = 1, oa.read = function(n, e, t, r, i) {
    var s, a, l = i * 8 - r - 1, u = (1 << l) - 1, c = u >> 1, h = -7, f = t ? i - 1 : 0, m = t ? -1 : 1, v = n[e + f];
    for (f += m, s = v & (1 << -h) - 1, v >>= -h, h += l; h > 0; s = s * 256 + n[e + f], f += m, h -= 8)
      ;
    for (a = s & (1 << -h) - 1, s >>= -h, h += r; h > 0; a = a * 256 + n[e + f], f += m, h -= 8)
      ;
    if (s === 0)
      s = 1 - c;
    else {
      if (s === u)
        return a ? NaN : (v ? -1 : 1) * (1 / 0);
      a = a + Math.pow(2, r), s = s - c;
    }
    return (v ? -1 : 1) * a * Math.pow(2, s - r);
  }, oa.write = function(n, e, t, r, i, s) {
    var a, l, u, c = s * 8 - i - 1, h = (1 << c) - 1, f = h >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, v = r ? 0 : s - 1, w = r ? 1 : -1, b = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (l = isNaN(e) ? 1 : 0, a = h) : (a = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), a + f >= 1 ? e += m / u : e += m * Math.pow(2, 1 - f), e * u >= 2 && (a++, u /= 2), a + f >= h ? (l = 0, a = h) : a + f >= 1 ? (l = (e * u - 1) * Math.pow(2, i), a = a + f) : (l = e * Math.pow(2, f - 1) * Math.pow(2, i), a = 0)); i >= 8; n[t + v] = l & 255, v += w, l /= 256, i -= 8)
      ;
    for (a = a << i | l, c += i; c > 0; n[t + v] = a & 255, v += w, a /= 256, c -= 8)
      ;
    n[t + v - w] |= b * 128;
  }), oa;
}
var Xs;
function Sd() {
  return Xs || (Xs = 1, (function(n) {
    const e = Dd(), t = _d(), r = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
    n.Buffer = l, n.SlowBuffer = R, n.INSPECT_MAX_BYTES = 50;
    const i = 2147483647;
    n.kMaxLength = i, l.TYPED_ARRAY_SUPPORT = s(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function s() {
      try {
        const N = new Uint8Array(1), p = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(p, Uint8Array.prototype), Object.setPrototypeOf(N, p), N.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(l.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (l.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(l.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (l.isBuffer(this))
          return this.byteOffset;
      }
    });
    function a(N) {
      if (N > i)
        throw new RangeError('The value "' + N + '" is invalid for option "size"');
      const p = new Uint8Array(N);
      return Object.setPrototypeOf(p, l.prototype), p;
    }
    function l(N, p, g) {
      if (typeof N == "number") {
        if (typeof p == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return f(N);
      }
      return u(N, p, g);
    }
    l.poolSize = 8192;
    function u(N, p, g) {
      if (typeof N == "string")
        return m(N, p);
      if (ArrayBuffer.isView(N))
        return w(N);
      if (N == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N
        );
      if (ke(N, ArrayBuffer) || N && ke(N.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ke(N, SharedArrayBuffer) || N && ke(N.buffer, SharedArrayBuffer)))
        return b(N, p, g);
      if (typeof N == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const I = N.valueOf && N.valueOf();
      if (I != null && I !== N)
        return l.from(I, p, g);
      const W = x(N);
      if (W) return W;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof N[Symbol.toPrimitive] == "function")
        return l.from(N[Symbol.toPrimitive]("string"), p, g);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N
      );
    }
    l.from = function(N, p, g) {
      return u(N, p, g);
    }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
    function c(N) {
      if (typeof N != "number")
        throw new TypeError('"size" argument must be of type number');
      if (N < 0)
        throw new RangeError('The value "' + N + '" is invalid for option "size"');
    }
    function h(N, p, g) {
      return c(N), N <= 0 ? a(N) : p !== void 0 ? typeof g == "string" ? a(N).fill(p, g) : a(N).fill(p) : a(N);
    }
    l.alloc = function(N, p, g) {
      return h(N, p, g);
    };
    function f(N) {
      return c(N), a(N < 0 ? 0 : _(N) | 0);
    }
    l.allocUnsafe = function(N) {
      return f(N);
    }, l.allocUnsafeSlow = function(N) {
      return f(N);
    };
    function m(N, p) {
      if ((typeof p != "string" || p === "") && (p = "utf8"), !l.isEncoding(p))
        throw new TypeError("Unknown encoding: " + p);
      const g = G(N, p) | 0;
      let I = a(g);
      const W = I.write(N, p);
      return W !== g && (I = I.slice(0, W)), I;
    }
    function v(N) {
      const p = N.length < 0 ? 0 : _(N.length) | 0, g = a(p);
      for (let I = 0; I < p; I += 1)
        g[I] = N[I] & 255;
      return g;
    }
    function w(N) {
      if (ke(N, Uint8Array)) {
        const p = new Uint8Array(N);
        return b(p.buffer, p.byteOffset, p.byteLength);
      }
      return v(N);
    }
    function b(N, p, g) {
      if (p < 0 || N.byteLength < p)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (N.byteLength < p + (g || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let I;
      return p === void 0 && g === void 0 ? I = new Uint8Array(N) : g === void 0 ? I = new Uint8Array(N, p) : I = new Uint8Array(N, p, g), Object.setPrototypeOf(I, l.prototype), I;
    }
    function x(N) {
      if (l.isBuffer(N)) {
        const p = _(N.length) | 0, g = a(p);
        return g.length === 0 || N.copy(g, 0, 0, p), g;
      }
      if (N.length !== void 0)
        return typeof N.length != "number" || It(N.length) ? a(0) : v(N);
      if (N.type === "Buffer" && Array.isArray(N.data))
        return v(N.data);
    }
    function _(N) {
      if (N >= i)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
      return N | 0;
    }
    function R(N) {
      return +N != N && (N = 0), l.alloc(+N);
    }
    l.isBuffer = function(p) {
      return p != null && p._isBuffer === !0 && p !== l.prototype;
    }, l.compare = function(p, g) {
      if (ke(p, Uint8Array) && (p = l.from(p, p.offset, p.byteLength)), ke(g, Uint8Array) && (g = l.from(g, g.offset, g.byteLength)), !l.isBuffer(p) || !l.isBuffer(g))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (p === g) return 0;
      let I = p.length, W = g.length;
      for (let z = 0, te = Math.min(I, W); z < te; ++z)
        if (p[z] !== g[z]) {
          I = p[z], W = g[z];
          break;
        }
      return I < W ? -1 : W < I ? 1 : 0;
    }, l.isEncoding = function(p) {
      switch (String(p).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, l.concat = function(p, g) {
      if (!Array.isArray(p))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (p.length === 0)
        return l.alloc(0);
      let I;
      if (g === void 0)
        for (g = 0, I = 0; I < p.length; ++I)
          g += p[I].length;
      const W = l.allocUnsafe(g);
      let z = 0;
      for (I = 0; I < p.length; ++I) {
        let te = p[I];
        if (ke(te, Uint8Array))
          z + te.length > W.length ? (l.isBuffer(te) || (te = l.from(te)), te.copy(W, z)) : Uint8Array.prototype.set.call(
            W,
            te,
            z
          );
        else if (l.isBuffer(te))
          te.copy(W, z);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        z += te.length;
      }
      return W;
    };
    function G(N, p) {
      if (l.isBuffer(N))
        return N.length;
      if (ArrayBuffer.isView(N) || ke(N, ArrayBuffer))
        return N.byteLength;
      if (typeof N != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof N
        );
      const g = N.length, I = arguments.length > 2 && arguments[2] === !0;
      if (!I && g === 0) return 0;
      let W = !1;
      for (; ; )
        switch (p) {
          case "ascii":
          case "latin1":
          case "binary":
            return g;
          case "utf8":
          case "utf-8":
            return se(N).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return g * 2;
          case "hex":
            return g >>> 1;
          case "base64":
            return St(N).length;
          default:
            if (W)
              return I ? -1 : se(N).length;
            p = ("" + p).toLowerCase(), W = !0;
        }
    }
    l.byteLength = G;
    function Y(N, p, g) {
      let I = !1;
      if ((p === void 0 || p < 0) && (p = 0), p > this.length || ((g === void 0 || g > this.length) && (g = this.length), g <= 0) || (g >>>= 0, p >>>= 0, g <= p))
        return "";
      for (N || (N = "utf8"); ; )
        switch (N) {
          case "hex":
            return ie(this, p, g);
          case "utf8":
          case "utf-8":
            return Q(this, p, g);
          case "ascii":
            return Z(this, p, g);
          case "latin1":
          case "binary":
            return ae(this, p, g);
          case "base64":
            return ee(this, p, g);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return oe(this, p, g);
          default:
            if (I) throw new TypeError("Unknown encoding: " + N);
            N = (N + "").toLowerCase(), I = !0;
        }
    }
    l.prototype._isBuffer = !0;
    function A(N, p, g) {
      const I = N[p];
      N[p] = N[g], N[g] = I;
    }
    l.prototype.swap16 = function() {
      const p = this.length;
      if (p % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let g = 0; g < p; g += 2)
        A(this, g, g + 1);
      return this;
    }, l.prototype.swap32 = function() {
      const p = this.length;
      if (p % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let g = 0; g < p; g += 4)
        A(this, g, g + 3), A(this, g + 1, g + 2);
      return this;
    }, l.prototype.swap64 = function() {
      const p = this.length;
      if (p % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let g = 0; g < p; g += 8)
        A(this, g, g + 7), A(this, g + 1, g + 6), A(this, g + 2, g + 5), A(this, g + 3, g + 4);
      return this;
    }, l.prototype.toString = function() {
      const p = this.length;
      return p === 0 ? "" : arguments.length === 0 ? Q(this, 0, p) : Y.apply(this, arguments);
    }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(p) {
      if (!l.isBuffer(p)) throw new TypeError("Argument must be a Buffer");
      return this === p ? !0 : l.compare(this, p) === 0;
    }, l.prototype.inspect = function() {
      let p = "";
      const g = n.INSPECT_MAX_BYTES;
      return p = this.toString("hex", 0, g).replace(/(.{2})/g, "$1 ").trim(), this.length > g && (p += " ... "), "<Buffer " + p + ">";
    }, r && (l.prototype[r] = l.prototype.inspect), l.prototype.compare = function(p, g, I, W, z) {
      if (ke(p, Uint8Array) && (p = l.from(p, p.offset, p.byteLength)), !l.isBuffer(p))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof p
        );
      if (g === void 0 && (g = 0), I === void 0 && (I = p ? p.length : 0), W === void 0 && (W = 0), z === void 0 && (z = this.length), g < 0 || I > p.length || W < 0 || z > this.length)
        throw new RangeError("out of range index");
      if (W >= z && g >= I)
        return 0;
      if (W >= z)
        return -1;
      if (g >= I)
        return 1;
      if (g >>>= 0, I >>>= 0, W >>>= 0, z >>>= 0, this === p) return 0;
      let te = z - W, Ae = I - g;
      const Ke = Math.min(te, Ae), Pe = this.slice(W, z), He = p.slice(g, I);
      for (let Le = 0; Le < Ke; ++Le)
        if (Pe[Le] !== He[Le]) {
          te = Pe[Le], Ae = He[Le];
          break;
        }
      return te < Ae ? -1 : Ae < te ? 1 : 0;
    };
    function K(N, p, g, I, W) {
      if (N.length === 0) return -1;
      if (typeof g == "string" ? (I = g, g = 0) : g > 2147483647 ? g = 2147483647 : g < -2147483648 && (g = -2147483648), g = +g, It(g) && (g = W ? 0 : N.length - 1), g < 0 && (g = N.length + g), g >= N.length) {
        if (W) return -1;
        g = N.length - 1;
      } else if (g < 0)
        if (W) g = 0;
        else return -1;
      if (typeof p == "string" && (p = l.from(p, I)), l.isBuffer(p))
        return p.length === 0 ? -1 : M(N, p, g, I, W);
      if (typeof p == "number")
        return p = p & 255, typeof Uint8Array.prototype.indexOf == "function" ? W ? Uint8Array.prototype.indexOf.call(N, p, g) : Uint8Array.prototype.lastIndexOf.call(N, p, g) : M(N, [p], g, I, W);
      throw new TypeError("val must be string, number or Buffer");
    }
    function M(N, p, g, I, W) {
      let z = 1, te = N.length, Ae = p.length;
      if (I !== void 0 && (I = String(I).toLowerCase(), I === "ucs2" || I === "ucs-2" || I === "utf16le" || I === "utf-16le")) {
        if (N.length < 2 || p.length < 2)
          return -1;
        z = 2, te /= 2, Ae /= 2, g /= 2;
      }
      function Ke(He, Le) {
        return z === 1 ? He[Le] : He.readUInt16BE(Le * z);
      }
      let Pe;
      if (W) {
        let He = -1;
        for (Pe = g; Pe < te; Pe++)
          if (Ke(N, Pe) === Ke(p, He === -1 ? 0 : Pe - He)) {
            if (He === -1 && (He = Pe), Pe - He + 1 === Ae) return He * z;
          } else
            He !== -1 && (Pe -= Pe - He), He = -1;
      } else
        for (g + Ae > te && (g = te - Ae), Pe = g; Pe >= 0; Pe--) {
          let He = !0;
          for (let Le = 0; Le < Ae; Le++)
            if (Ke(N, Pe + Le) !== Ke(p, Le)) {
              He = !1;
              break;
            }
          if (He) return Pe;
        }
      return -1;
    }
    l.prototype.includes = function(p, g, I) {
      return this.indexOf(p, g, I) !== -1;
    }, l.prototype.indexOf = function(p, g, I) {
      return K(this, p, g, I, !0);
    }, l.prototype.lastIndexOf = function(p, g, I) {
      return K(this, p, g, I, !1);
    };
    function j(N, p, g, I) {
      g = Number(g) || 0;
      const W = N.length - g;
      I ? (I = Number(I), I > W && (I = W)) : I = W;
      const z = p.length;
      I > z / 2 && (I = z / 2);
      let te;
      for (te = 0; te < I; ++te) {
        const Ae = parseInt(p.substr(te * 2, 2), 16);
        if (It(Ae)) return te;
        N[g + te] = Ae;
      }
      return te;
    }
    function k(N, p, g, I) {
      return Oe(se(p, N.length - g), N, g, I);
    }
    function H(N, p, g, I) {
      return Oe(Fe(p), N, g, I);
    }
    function $(N, p, g, I) {
      return Oe(St(p), N, g, I);
    }
    function q(N, p, g, I) {
      return Oe(lt(p, N.length - g), N, g, I);
    }
    l.prototype.write = function(p, g, I, W) {
      if (g === void 0)
        W = "utf8", I = this.length, g = 0;
      else if (I === void 0 && typeof g == "string")
        W = g, I = this.length, g = 0;
      else if (isFinite(g))
        g = g >>> 0, isFinite(I) ? (I = I >>> 0, W === void 0 && (W = "utf8")) : (W = I, I = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const z = this.length - g;
      if ((I === void 0 || I > z) && (I = z), p.length > 0 && (I < 0 || g < 0) || g > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      W || (W = "utf8");
      let te = !1;
      for (; ; )
        switch (W) {
          case "hex":
            return j(this, p, g, I);
          case "utf8":
          case "utf-8":
            return k(this, p, g, I);
          case "ascii":
          case "latin1":
          case "binary":
            return H(this, p, g, I);
          case "base64":
            return $(this, p, g, I);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return q(this, p, g, I);
          default:
            if (te) throw new TypeError("Unknown encoding: " + W);
            W = ("" + W).toLowerCase(), te = !0;
        }
    }, l.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function ee(N, p, g) {
      return p === 0 && g === N.length ? e.fromByteArray(N) : e.fromByteArray(N.slice(p, g));
    }
    function Q(N, p, g) {
      g = Math.min(N.length, g);
      const I = [];
      let W = p;
      for (; W < g; ) {
        const z = N[W];
        let te = null, Ae = z > 239 ? 4 : z > 223 ? 3 : z > 191 ? 2 : 1;
        if (W + Ae <= g) {
          let Ke, Pe, He, Le;
          switch (Ae) {
            case 1:
              z < 128 && (te = z);
              break;
            case 2:
              Ke = N[W + 1], (Ke & 192) === 128 && (Le = (z & 31) << 6 | Ke & 63, Le > 127 && (te = Le));
              break;
            case 3:
              Ke = N[W + 1], Pe = N[W + 2], (Ke & 192) === 128 && (Pe & 192) === 128 && (Le = (z & 15) << 12 | (Ke & 63) << 6 | Pe & 63, Le > 2047 && (Le < 55296 || Le > 57343) && (te = Le));
              break;
            case 4:
              Ke = N[W + 1], Pe = N[W + 2], He = N[W + 3], (Ke & 192) === 128 && (Pe & 192) === 128 && (He & 192) === 128 && (Le = (z & 15) << 18 | (Ke & 63) << 12 | (Pe & 63) << 6 | He & 63, Le > 65535 && Le < 1114112 && (te = Le));
          }
        }
        te === null ? (te = 65533, Ae = 1) : te > 65535 && (te -= 65536, I.push(te >>> 10 & 1023 | 55296), te = 56320 | te & 1023), I.push(te), W += Ae;
      }
      return V(I);
    }
    const S = 4096;
    function V(N) {
      const p = N.length;
      if (p <= S)
        return String.fromCharCode.apply(String, N);
      let g = "", I = 0;
      for (; I < p; )
        g += String.fromCharCode.apply(
          String,
          N.slice(I, I += S)
        );
      return g;
    }
    function Z(N, p, g) {
      let I = "";
      g = Math.min(N.length, g);
      for (let W = p; W < g; ++W)
        I += String.fromCharCode(N[W] & 127);
      return I;
    }
    function ae(N, p, g) {
      let I = "";
      g = Math.min(N.length, g);
      for (let W = p; W < g; ++W)
        I += String.fromCharCode(N[W]);
      return I;
    }
    function ie(N, p, g) {
      const I = N.length;
      (!p || p < 0) && (p = 0), (!g || g < 0 || g > I) && (g = I);
      let W = "";
      for (let z = p; z < g; ++z)
        W += ln[N[z]];
      return W;
    }
    function oe(N, p, g) {
      const I = N.slice(p, g);
      let W = "";
      for (let z = 0; z < I.length - 1; z += 2)
        W += String.fromCharCode(I[z] + I[z + 1] * 256);
      return W;
    }
    l.prototype.slice = function(p, g) {
      const I = this.length;
      p = ~~p, g = g === void 0 ? I : ~~g, p < 0 ? (p += I, p < 0 && (p = 0)) : p > I && (p = I), g < 0 ? (g += I, g < 0 && (g = 0)) : g > I && (g = I), g < p && (g = p);
      const W = this.subarray(p, g);
      return Object.setPrototypeOf(W, l.prototype), W;
    };
    function ne(N, p, g) {
      if (N % 1 !== 0 || N < 0) throw new RangeError("offset is not uint");
      if (N + p > g) throw new RangeError("Trying to access beyond buffer length");
    }
    l.prototype.readUintLE = l.prototype.readUIntLE = function(p, g, I) {
      p = p >>> 0, g = g >>> 0, I || ne(p, g, this.length);
      let W = this[p], z = 1, te = 0;
      for (; ++te < g && (z *= 256); )
        W += this[p + te] * z;
      return W;
    }, l.prototype.readUintBE = l.prototype.readUIntBE = function(p, g, I) {
      p = p >>> 0, g = g >>> 0, I || ne(p, g, this.length);
      let W = this[p + --g], z = 1;
      for (; g > 0 && (z *= 256); )
        W += this[p + --g] * z;
      return W;
    }, l.prototype.readUint8 = l.prototype.readUInt8 = function(p, g) {
      return p = p >>> 0, g || ne(p, 1, this.length), this[p];
    }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(p, g) {
      return p = p >>> 0, g || ne(p, 2, this.length), this[p] | this[p + 1] << 8;
    }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(p, g) {
      return p = p >>> 0, g || ne(p, 2, this.length), this[p] << 8 | this[p + 1];
    }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(p, g) {
      return p = p >>> 0, g || ne(p, 4, this.length), (this[p] | this[p + 1] << 8 | this[p + 2] << 16) + this[p + 3] * 16777216;
    }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(p, g) {
      return p = p >>> 0, g || ne(p, 4, this.length), this[p] * 16777216 + (this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3]);
    }, l.prototype.readBigUInt64LE = bt(function(p) {
      p = p >>> 0, Re(p, "offset");
      const g = this[p], I = this[p + 7];
      (g === void 0 || I === void 0) && _e(p, this.length - 8);
      const W = g + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24, z = this[++p] + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + I * 2 ** 24;
      return BigInt(W) + (BigInt(z) << BigInt(32));
    }), l.prototype.readBigUInt64BE = bt(function(p) {
      p = p >>> 0, Re(p, "offset");
      const g = this[p], I = this[p + 7];
      (g === void 0 || I === void 0) && _e(p, this.length - 8);
      const W = g * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p], z = this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + I;
      return (BigInt(W) << BigInt(32)) + BigInt(z);
    }), l.prototype.readIntLE = function(p, g, I) {
      p = p >>> 0, g = g >>> 0, I || ne(p, g, this.length);
      let W = this[p], z = 1, te = 0;
      for (; ++te < g && (z *= 256); )
        W += this[p + te] * z;
      return z *= 128, W >= z && (W -= Math.pow(2, 8 * g)), W;
    }, l.prototype.readIntBE = function(p, g, I) {
      p = p >>> 0, g = g >>> 0, I || ne(p, g, this.length);
      let W = g, z = 1, te = this[p + --W];
      for (; W > 0 && (z *= 256); )
        te += this[p + --W] * z;
      return z *= 128, te >= z && (te -= Math.pow(2, 8 * g)), te;
    }, l.prototype.readInt8 = function(p, g) {
      return p = p >>> 0, g || ne(p, 1, this.length), this[p] & 128 ? (255 - this[p] + 1) * -1 : this[p];
    }, l.prototype.readInt16LE = function(p, g) {
      p = p >>> 0, g || ne(p, 2, this.length);
      const I = this[p] | this[p + 1] << 8;
      return I & 32768 ? I | 4294901760 : I;
    }, l.prototype.readInt16BE = function(p, g) {
      p = p >>> 0, g || ne(p, 2, this.length);
      const I = this[p + 1] | this[p] << 8;
      return I & 32768 ? I | 4294901760 : I;
    }, l.prototype.readInt32LE = function(p, g) {
      return p = p >>> 0, g || ne(p, 4, this.length), this[p] | this[p + 1] << 8 | this[p + 2] << 16 | this[p + 3] << 24;
    }, l.prototype.readInt32BE = function(p, g) {
      return p = p >>> 0, g || ne(p, 4, this.length), this[p] << 24 | this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3];
    }, l.prototype.readBigInt64LE = bt(function(p) {
      p = p >>> 0, Re(p, "offset");
      const g = this[p], I = this[p + 7];
      (g === void 0 || I === void 0) && _e(p, this.length - 8);
      const W = this[p + 4] + this[p + 5] * 2 ** 8 + this[p + 6] * 2 ** 16 + (I << 24);
      return (BigInt(W) << BigInt(32)) + BigInt(g + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24);
    }), l.prototype.readBigInt64BE = bt(function(p) {
      p = p >>> 0, Re(p, "offset");
      const g = this[p], I = this[p + 7];
      (g === void 0 || I === void 0) && _e(p, this.length - 8);
      const W = (g << 24) + // Overflow
      this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p];
      return (BigInt(W) << BigInt(32)) + BigInt(this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + I);
    }), l.prototype.readFloatLE = function(p, g) {
      return p = p >>> 0, g || ne(p, 4, this.length), t.read(this, p, !0, 23, 4);
    }, l.prototype.readFloatBE = function(p, g) {
      return p = p >>> 0, g || ne(p, 4, this.length), t.read(this, p, !1, 23, 4);
    }, l.prototype.readDoubleLE = function(p, g) {
      return p = p >>> 0, g || ne(p, 8, this.length), t.read(this, p, !0, 52, 8);
    }, l.prototype.readDoubleBE = function(p, g) {
      return p = p >>> 0, g || ne(p, 8, this.length), t.read(this, p, !1, 52, 8);
    };
    function ge(N, p, g, I, W, z) {
      if (!l.isBuffer(N)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (p > W || p < z) throw new RangeError('"value" argument is out of bounds');
      if (g + I > N.length) throw new RangeError("Index out of range");
    }
    l.prototype.writeUintLE = l.prototype.writeUIntLE = function(p, g, I, W) {
      if (p = +p, g = g >>> 0, I = I >>> 0, !W) {
        const Ae = Math.pow(2, 8 * I) - 1;
        ge(this, p, g, I, Ae, 0);
      }
      let z = 1, te = 0;
      for (this[g] = p & 255; ++te < I && (z *= 256); )
        this[g + te] = p / z & 255;
      return g + I;
    }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(p, g, I, W) {
      if (p = +p, g = g >>> 0, I = I >>> 0, !W) {
        const Ae = Math.pow(2, 8 * I) - 1;
        ge(this, p, g, I, Ae, 0);
      }
      let z = I - 1, te = 1;
      for (this[g + z] = p & 255; --z >= 0 && (te *= 256); )
        this[g + z] = p / te & 255;
      return g + I;
    }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 1, 255, 0), this[g] = p & 255, g + 1;
    }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 2, 65535, 0), this[g] = p & 255, this[g + 1] = p >>> 8, g + 2;
    }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 2, 65535, 0), this[g] = p >>> 8, this[g + 1] = p & 255, g + 2;
    }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 4, 4294967295, 0), this[g + 3] = p >>> 24, this[g + 2] = p >>> 16, this[g + 1] = p >>> 8, this[g] = p & 255, g + 4;
    }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 4, 4294967295, 0), this[g] = p >>> 24, this[g + 1] = p >>> 16, this[g + 2] = p >>> 8, this[g + 3] = p & 255, g + 4;
    };
    function Be(N, p, g, I, W) {
      De(p, I, W, N, g, 7);
      let z = Number(p & BigInt(4294967295));
      N[g++] = z, z = z >> 8, N[g++] = z, z = z >> 8, N[g++] = z, z = z >> 8, N[g++] = z;
      let te = Number(p >> BigInt(32) & BigInt(4294967295));
      return N[g++] = te, te = te >> 8, N[g++] = te, te = te >> 8, N[g++] = te, te = te >> 8, N[g++] = te, g;
    }
    function pe(N, p, g, I, W) {
      De(p, I, W, N, g, 7);
      let z = Number(p & BigInt(4294967295));
      N[g + 7] = z, z = z >> 8, N[g + 6] = z, z = z >> 8, N[g + 5] = z, z = z >> 8, N[g + 4] = z;
      let te = Number(p >> BigInt(32) & BigInt(4294967295));
      return N[g + 3] = te, te = te >> 8, N[g + 2] = te, te = te >> 8, N[g + 1] = te, te = te >> 8, N[g] = te, g + 8;
    }
    l.prototype.writeBigUInt64LE = bt(function(p, g = 0) {
      return Be(this, p, g, BigInt(0), BigInt("0xffffffffffffffff"));
    }), l.prototype.writeBigUInt64BE = bt(function(p, g = 0) {
      return pe(this, p, g, BigInt(0), BigInt("0xffffffffffffffff"));
    }), l.prototype.writeIntLE = function(p, g, I, W) {
      if (p = +p, g = g >>> 0, !W) {
        const Ke = Math.pow(2, 8 * I - 1);
        ge(this, p, g, I, Ke - 1, -Ke);
      }
      let z = 0, te = 1, Ae = 0;
      for (this[g] = p & 255; ++z < I && (te *= 256); )
        p < 0 && Ae === 0 && this[g + z - 1] !== 0 && (Ae = 1), this[g + z] = (p / te >> 0) - Ae & 255;
      return g + I;
    }, l.prototype.writeIntBE = function(p, g, I, W) {
      if (p = +p, g = g >>> 0, !W) {
        const Ke = Math.pow(2, 8 * I - 1);
        ge(this, p, g, I, Ke - 1, -Ke);
      }
      let z = I - 1, te = 1, Ae = 0;
      for (this[g + z] = p & 255; --z >= 0 && (te *= 256); )
        p < 0 && Ae === 0 && this[g + z + 1] !== 0 && (Ae = 1), this[g + z] = (p / te >> 0) - Ae & 255;
      return g + I;
    }, l.prototype.writeInt8 = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 1, 127, -128), p < 0 && (p = 255 + p + 1), this[g] = p & 255, g + 1;
    }, l.prototype.writeInt16LE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 2, 32767, -32768), this[g] = p & 255, this[g + 1] = p >>> 8, g + 2;
    }, l.prototype.writeInt16BE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 2, 32767, -32768), this[g] = p >>> 8, this[g + 1] = p & 255, g + 2;
    }, l.prototype.writeInt32LE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 4, 2147483647, -2147483648), this[g] = p & 255, this[g + 1] = p >>> 8, this[g + 2] = p >>> 16, this[g + 3] = p >>> 24, g + 4;
    }, l.prototype.writeInt32BE = function(p, g, I) {
      return p = +p, g = g >>> 0, I || ge(this, p, g, 4, 2147483647, -2147483648), p < 0 && (p = 4294967295 + p + 1), this[g] = p >>> 24, this[g + 1] = p >>> 16, this[g + 2] = p >>> 8, this[g + 3] = p & 255, g + 4;
    }, l.prototype.writeBigInt64LE = bt(function(p, g = 0) {
      return Be(this, p, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), l.prototype.writeBigInt64BE = bt(function(p, g = 0) {
      return pe(this, p, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function Ce(N, p, g, I, W, z) {
      if (g + I > N.length) throw new RangeError("Index out of range");
      if (g < 0) throw new RangeError("Index out of range");
    }
    function Me(N, p, g, I, W) {
      return p = +p, g = g >>> 0, W || Ce(N, p, g, 4), t.write(N, p, g, I, 23, 4), g + 4;
    }
    l.prototype.writeFloatLE = function(p, g, I) {
      return Me(this, p, g, !0, I);
    }, l.prototype.writeFloatBE = function(p, g, I) {
      return Me(this, p, g, !1, I);
    };
    function Ye(N, p, g, I, W) {
      return p = +p, g = g >>> 0, W || Ce(N, p, g, 8), t.write(N, p, g, I, 52, 8), g + 8;
    }
    l.prototype.writeDoubleLE = function(p, g, I) {
      return Ye(this, p, g, !0, I);
    }, l.prototype.writeDoubleBE = function(p, g, I) {
      return Ye(this, p, g, !1, I);
    }, l.prototype.copy = function(p, g, I, W) {
      if (!l.isBuffer(p)) throw new TypeError("argument should be a Buffer");
      if (I || (I = 0), !W && W !== 0 && (W = this.length), g >= p.length && (g = p.length), g || (g = 0), W > 0 && W < I && (W = I), W === I || p.length === 0 || this.length === 0) return 0;
      if (g < 0)
        throw new RangeError("targetStart out of bounds");
      if (I < 0 || I >= this.length) throw new RangeError("Index out of range");
      if (W < 0) throw new RangeError("sourceEnd out of bounds");
      W > this.length && (W = this.length), p.length - g < W - I && (W = p.length - g + I);
      const z = W - I;
      return this === p && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(g, I, W) : Uint8Array.prototype.set.call(
        p,
        this.subarray(I, W),
        g
      ), z;
    }, l.prototype.fill = function(p, g, I, W) {
      if (typeof p == "string") {
        if (typeof g == "string" ? (W = g, g = 0, I = this.length) : typeof I == "string" && (W = I, I = this.length), W !== void 0 && typeof W != "string")
          throw new TypeError("encoding must be a string");
        if (typeof W == "string" && !l.isEncoding(W))
          throw new TypeError("Unknown encoding: " + W);
        if (p.length === 1) {
          const te = p.charCodeAt(0);
          (W === "utf8" && te < 128 || W === "latin1") && (p = te);
        }
      } else typeof p == "number" ? p = p & 255 : typeof p == "boolean" && (p = Number(p));
      if (g < 0 || this.length < g || this.length < I)
        throw new RangeError("Out of range index");
      if (I <= g)
        return this;
      g = g >>> 0, I = I === void 0 ? this.length : I >>> 0, p || (p = 0);
      let z;
      if (typeof p == "number")
        for (z = g; z < I; ++z)
          this[z] = p;
      else {
        const te = l.isBuffer(p) ? p : l.from(p, W), Ae = te.length;
        if (Ae === 0)
          throw new TypeError('The value "' + p + '" is invalid for argument "value"');
        for (z = 0; z < I - g; ++z)
          this[z + g] = te[z % Ae];
      }
      return this;
    };
    const Te = {};
    function qe(N, p, g) {
      Te[N] = class extends g {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: p.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${N}]`, this.stack, delete this.name;
        }
        get code() {
          return N;
        }
        set code(W) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: W,
            writable: !0
          });
        }
        toString() {
          return `${this.name} [${N}]: ${this.message}`;
        }
      };
    }
    qe(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(N) {
        return N ? `${N} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), qe(
      "ERR_INVALID_ARG_TYPE",
      function(N, p) {
        return `The "${N}" argument must be of type number. Received type ${typeof p}`;
      },
      TypeError
    ), qe(
      "ERR_OUT_OF_RANGE",
      function(N, p, g) {
        let I = `The value of "${N}" is out of range.`, W = g;
        return Number.isInteger(g) && Math.abs(g) > 2 ** 32 ? W = ht(String(g)) : typeof g == "bigint" && (W = String(g), (g > BigInt(2) ** BigInt(32) || g < -(BigInt(2) ** BigInt(32))) && (W = ht(W)), W += "n"), I += ` It must be ${p}. Received ${W}`, I;
      },
      RangeError
    );
    function ht(N) {
      let p = "", g = N.length;
      const I = N[0] === "-" ? 1 : 0;
      for (; g >= I + 4; g -= 3)
        p = `_${N.slice(g - 3, g)}${p}`;
      return `${N.slice(0, g)}${p}`;
    }
    function it(N, p, g) {
      Re(p, "offset"), (N[p] === void 0 || N[p + g] === void 0) && _e(p, N.length - (g + 1));
    }
    function De(N, p, g, I, W, z) {
      if (N > g || N < p) {
        const te = typeof p == "bigint" ? "n" : "";
        let Ae;
        throw p === 0 || p === BigInt(0) ? Ae = `>= 0${te} and < 2${te} ** ${(z + 1) * 8}${te}` : Ae = `>= -(2${te} ** ${(z + 1) * 8 - 1}${te}) and < 2 ** ${(z + 1) * 8 - 1}${te}`, new Te.ERR_OUT_OF_RANGE("value", Ae, N);
      }
      it(I, W, z);
    }
    function Re(N, p) {
      if (typeof N != "number")
        throw new Te.ERR_INVALID_ARG_TYPE(p, "number", N);
    }
    function _e(N, p, g) {
      throw Math.floor(N) !== N ? (Re(N, g), new Te.ERR_OUT_OF_RANGE("offset", "an integer", N)) : p < 0 ? new Te.ERR_BUFFER_OUT_OF_BOUNDS() : new Te.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${p}`,
        N
      );
    }
    const Ct = /[^+/0-9A-Za-z-_]/g;
    function Ve(N) {
      if (N = N.split("=")[0], N = N.trim().replace(Ct, ""), N.length < 2) return "";
      for (; N.length % 4 !== 0; )
        N = N + "=";
      return N;
    }
    function se(N, p) {
      p = p || 1 / 0;
      let g;
      const I = N.length;
      let W = null;
      const z = [];
      for (let te = 0; te < I; ++te) {
        if (g = N.charCodeAt(te), g > 55295 && g < 57344) {
          if (!W) {
            if (g > 56319) {
              (p -= 3) > -1 && z.push(239, 191, 189);
              continue;
            } else if (te + 1 === I) {
              (p -= 3) > -1 && z.push(239, 191, 189);
              continue;
            }
            W = g;
            continue;
          }
          if (g < 56320) {
            (p -= 3) > -1 && z.push(239, 191, 189), W = g;
            continue;
          }
          g = (W - 55296 << 10 | g - 56320) + 65536;
        } else W && (p -= 3) > -1 && z.push(239, 191, 189);
        if (W = null, g < 128) {
          if ((p -= 1) < 0) break;
          z.push(g);
        } else if (g < 2048) {
          if ((p -= 2) < 0) break;
          z.push(
            g >> 6 | 192,
            g & 63 | 128
          );
        } else if (g < 65536) {
          if ((p -= 3) < 0) break;
          z.push(
            g >> 12 | 224,
            g >> 6 & 63 | 128,
            g & 63 | 128
          );
        } else if (g < 1114112) {
          if ((p -= 4) < 0) break;
          z.push(
            g >> 18 | 240,
            g >> 12 & 63 | 128,
            g >> 6 & 63 | 128,
            g & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return z;
    }
    function Fe(N) {
      const p = [];
      for (let g = 0; g < N.length; ++g)
        p.push(N.charCodeAt(g) & 255);
      return p;
    }
    function lt(N, p) {
      let g, I, W;
      const z = [];
      for (let te = 0; te < N.length && !((p -= 2) < 0); ++te)
        g = N.charCodeAt(te), I = g >> 8, W = g % 256, z.push(W), z.push(I);
      return z;
    }
    function St(N) {
      return e.toByteArray(Ve(N));
    }
    function Oe(N, p, g, I) {
      let W;
      for (W = 0; W < I && !(W + g >= p.length || W >= N.length); ++W)
        p[W + g] = N[W];
      return W;
    }
    function ke(N, p) {
      return N instanceof p || N != null && N.constructor != null && N.constructor.name != null && N.constructor.name === p.name;
    }
    function It(N) {
      return N !== N;
    }
    const ln = (function() {
      const N = "0123456789abcdef", p = new Array(256);
      for (let g = 0; g < 16; ++g) {
        const I = g * 16;
        for (let W = 0; W < 16; ++W)
          p[I + W] = N[g] + N[W];
      }
      return p;
    })();
    function bt(N) {
      return typeof BigInt > "u" ? _n : N;
    }
    function _n() {
      throw new Error("BigInt not supported");
    }
  })(ti)), ti;
}
var Fd = Sd();
const Nr = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", Ar = "http://www.w3.org/2001/XMLSchema#", ua = "http://www.w3.org/2000/10/swap/", Mt = {
  xsd: {
    decimal: `${Ar}decimal`,
    boolean: `${Ar}boolean`,
    double: `${Ar}double`,
    integer: `${Ar}integer`,
    string: `${Ar}string`
  },
  rdf: {
    type: `${Nr}type`,
    nil: `${Nr}nil`,
    first: `${Nr}first`,
    rest: `${Nr}rest`,
    langString: `${Nr}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${ua}reify#forSome`,
    forAll: `${ua}reify#forAll`
  },
  log: {
    implies: `${ua}log#implies`,
    isImpliedBy: `${ua}log#isImpliedBy`
  }
}, { xsd: ca } = Mt, Id = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, zs = {
  "\\": "\\",
  "'": "'",
  '"': '"',
  n: `
`,
  r: "\r",
  t: "	",
  f: "\f",
  b: "\b",
  _: "_",
  "~": "~",
  ".": ".",
  "-": "-",
  "!": "!",
  $: "$",
  "&": "&",
  "(": "(",
  ")": ")",
  "*": "*",
  "+": "+",
  ",": ",",
  ";": ";",
  "=": "=",
  "/": "/",
  "?": "?",
  "#": "#",
  "@": "@",
  "%": "%"
}, Ld = /[\x00-\x20<>\\"\{\}\|\^\`]/, Bd = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Rd = /$0^/;
class kd {
  constructor(e) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, e = e || {}, this._isImpliedBy = e.isImpliedBy, this._lineMode = !!e.lineMode) {
      this._n3Mode = !1;
      for (const t in this)
        !(t in Bd) && this[t] instanceof RegExp && (this[t] = Rd);
    } else
      this._n3Mode = e.n3 !== !1;
    this.comments = !!e.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(e, t) {
    let r = this._input, i = r.length;
    for (; ; ) {
      let l, u;
      for (; l = this._newline.exec(r); )
        this.comments && (u = this._comment.exec(l[0])) && s("comment", u[1], "", this._line, l[0].length), r = r.substr(l[0].length, r.length), i = r.length, this._line++;
      if (!l && (l = this._whitespace.exec(r)) && (r = r.substr(l[0].length, r.length)), this._endOfFile.test(r))
        return t && (this.comments && (u = this._comment.exec(r)) && s("comment", u[1], "", this._line, r.length), r = null, s("eof", "", "", this._line, 0)), this._input = r;
      const c = this._line, h = r[0];
      let f = "", m = "", v = "", w = null, b = 0, x = !1;
      switch (h) {
        case "^":
          if (r.length < 3)
            break;
          if (r[1] === "^") {
            if (this._previousMarker = "^^", r = r.substr(2), r[0] !== "<") {
              x = !0;
              break;
            }
          } else {
            this._n3Mode && (b = 1, f = "^");
            break;
          }
        // Fall through in case the type is an IRI
        case "<":
          if (w = this._unescapedIri.exec(r))
            f = "IRI", m = w[1];
          else if (w = this._iri.exec(r)) {
            if (m = this._unescape(w[1]), m === null || Ld.test(m))
              return a(this);
            f = "IRI";
          } else r.length > 1 && r[1] === "<" ? (f = "<<", b = 2) : this._n3Mode && r.length > 1 && r[1] === "=" && (b = 2, this._isImpliedBy ? (f = "abbreviation", m = "<") : (f = "inverse", m = ">"));
          break;
        case ">":
          r.length > 1 && r[1] === ">" && (f = ">>", b = 2);
          break;
        case "_":
          ((w = this._blank.exec(r)) || t && (w = this._blank.exec(`${r} `))) && (f = "blank", v = "_", m = w[1]);
          break;
        case '"':
          if (w = this._simpleQuotedString.exec(r))
            m = w[1];
          else if ({ value: m, matchLength: b } = this._parseLiteral(r), m === null)
            return a(this);
          (w !== null || b !== 0) && (f = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (w = this._simpleApostropheString.exec(r))
              m = w[1];
            else if ({ value: m, matchLength: b } = this._parseLiteral(r), m === null)
              return a(this);
            (w !== null || b !== 0) && (f = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (w = this._variable.exec(r)) && (f = "var", m = w[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (w = this._langcode.exec(r)) ? (f = "langcode", m = w[1]) : (w = this._keyword.exec(r)) && (f = w[0]);
          break;
        case ".":
          if (r.length === 1 ? t : r[1] < "0" || r[1] > "9") {
            f = ".", b = 1;
            break;
          }
        // Fall through to numerical case (could be a decimal dot)
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
          (w = this._number.exec(r) || t && (w = this._number.exec(`${r} `))) && (f = "literal", m = w[0], v = typeof w[1] == "string" ? ca.double : typeof w[2] == "string" ? ca.decimal : ca.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (w = this._sparqlKeyword.exec(r)) ? f = w[0].toUpperCase() : x = !0;
          break;
        case "f":
        case "t":
          (w = this._boolean.exec(r)) ? (f = "literal", m = w[0], v = ca.boolean) : x = !0;
          break;
        case "a":
          (w = this._shortPredicates.exec(r)) ? (f = "abbreviation", m = "a") : x = !0;
          break;
        case "=":
          this._n3Mode && r.length > 1 && (f = "abbreviation", r[1] !== ">" ? (b = 1, m = "=") : (b = 2, m = ">"));
          break;
        case "!":
          if (!this._n3Mode)
            break;
        case ",":
        case ";":
        case "[":
        case "]":
        case "(":
        case ")":
        case "}":
          this._lineMode || (b = 1, f = h);
          break;
        case "{":
          !this._lineMode && r.length >= 2 && (r[1] === "|" ? (f = "{|", b = 2) : (f = h, b = 1));
          break;
        case "|":
          r.length >= 2 && r[1] === "}" && (f = "|}", b = 2);
          break;
        default:
          x = !0;
      }
      if (x && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (w = this._prefix.exec(r)) ? (f = "prefix", m = w[1] || "") : ((w = this._prefixed.exec(r)) || t && (w = this._prefixed.exec(`${r} `))) && (f = "prefixed", v = w[1] || "", m = this._unescape(w[2]))), this._previousMarker === "^^")
        switch (f) {
          case "prefixed":
            f = "type";
            break;
          case "IRI":
            f = "typeIRI";
            break;
          default:
            f = "";
        }
      if (!f)
        return t || !/^'''|^"""/.test(r) && /\n|\r/.test(r) ? a(this) : this._input = r;
      const _ = b || w[0].length, R = s(f, m, v, c, _);
      this.previousToken = R, this._previousMarker = f, r = r.substr(_, r.length);
    }
    function s(l, u, c, h, f) {
      const m = r ? i - r.length : i, v = m + f, w = { type: l, value: u, prefix: c, line: h, start: m, end: v };
      return e(null, w), w;
    }
    function a(l) {
      e(l._syntaxError(/^\S*/.exec(r)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(e) {
    let t = !1;
    const r = e.replace(Id, (i, s, a, l) => {
      if (typeof s == "string")
        return String.fromCharCode(Number.parseInt(s, 16));
      if (typeof a == "string") {
        let u = Number.parseInt(a, 16);
        return u <= 65535 ? String.fromCharCode(Number.parseInt(a, 16)) : String.fromCharCode(55296 + ((u -= 65536) >> 10), 56320 + (u & 1023));
      }
      return l in zs ? zs[l] : (t = !0, "");
    });
    return t ? null : r;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(e) {
    if (e.length >= 3) {
      const t = e.match(/^(?:"""|"|'''|'|)/)[0], r = t.length;
      let i = Math.max(this._literalClosingPos, r);
      for (; (i = e.indexOf(t, i)) > 0; ) {
        let s = 0;
        for (; e[i - s - 1] === "\\"; )
          s++;
        if (s % 2 === 0) {
          const a = e.substring(r, i), l = a.split(/\r\n|\r|\n/).length - 1, u = i + r;
          if (r === 1 && l !== 0 || r === 3 && this._lineMode)
            break;
          return this._line += l, { value: this._unescape(a), matchLength: u };
        }
        i++;
      }
      this._literalClosingPos = e.length - r + 1;
    }
    return { value: "", matchLength: 0 };
  }
  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError(e) {
    this._input = null;
    const t = new Error(`Unexpected "${e}" on line ${this._line}.`);
    return t.context = {
      token: void 0,
      line: this._line,
      previousToken: this.previousToken
    }, t;
  }
  // ### Strips off any starting UTF BOM mark.
  _readStartingBom(e) {
    return e.startsWith("\uFEFF") ? e.substr(1) : e;
  }
  // ## Public methods
  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize(e, t) {
    if (this._line = 1, typeof e == "string")
      if (this._input = this._readStartingBom(e), typeof t == "function")
        queueMicrotask(() => this._tokenizeToEnd(t, !0));
      else {
        const r = [];
        let i;
        if (this._tokenizeToEnd((s, a) => s ? i = s : r.push(a), !0), i) throw i;
        return r;
      }
    else
      this._pendingBuffer = null, typeof e.setEncoding == "function" && e.setEncoding("utf8"), e.on("data", (r) => {
        this._input !== null && r.length !== 0 && (this._pendingBuffer && (r = Fd.Buffer.concat([this._pendingBuffer, r]), this._pendingBuffer = null), r[r.length - 1] & 128 ? this._pendingBuffer = r : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof r == "string" ? r : r.toString()) : this._input += r, this._tokenizeToEnd(t, !1)));
      }), e.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(t, !0);
      }), e.on("error", t);
  }
}
const { rdf: Od, xsd: ar } = Mt;
let $r, Ud = 0;
const Md = {
  namedNode: Kl,
  blankNode: Gl,
  variable: Xl,
  literal: jl,
  defaultGraph: Hd,
  quad: mi,
  triple: mi,
  fromTerm: _r,
  fromQuad: zl
};
class vn {
  constructor(e) {
    this.id = e;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof vn ? this.id === e.id : !!e && this.termType === e.termType && this.value === e.value;
  }
  // ### Implement hashCode for Immutable.js, since we implement `equals`
  // https://immutable-js.com/docs/v4.0.0/ValueObject/#hashCode()
  hashCode() {
    return 0;
  }
  // ### Returns a plain object representation of this term
  toJSON() {
    return {
      termType: this.termType,
      value: this.value
    };
  }
}
class Wl extends vn {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class Sr extends vn {
  // ### The term type of this term
  get termType() {
    return "Literal";
  }
  // ### The text value of this literal
  get value() {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  }
  // ### The language of this literal
  get language() {
    const e = this.id;
    let t = e.lastIndexOf('"') + 1;
    return t < e.length && e[t++] === "@" ? e.substr(t).toLowerCase() : "";
  }
  // ### The datatype IRI of this literal
  get datatype() {
    return new Wl(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const e = this.id, t = e.lastIndexOf('"') + 1, r = t < e.length ? e[t] : "";
    return r === "^" ? e.substr(t + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      r !== "@" ? ar.string : Od.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof Sr ? this.id === e.id : !!e && !!e.datatype && this.termType === e.termType && this.value === e.value && this.language === e.language && this.datatype.value === e.datatype.value;
  }
  toJSON() {
    return {
      termType: this.termType,
      value: this.value,
      language: this.language,
      datatype: { termType: "NamedNode", value: this.datatypeString }
    };
  }
}
class Pd extends vn {
  constructor(e) {
    super(`_:${e}`);
  }
  // ### The term type of this term
  get termType() {
    return "BlankNode";
  }
  // ### The name of this blank node
  get value() {
    return this.id.substr(2);
  }
}
class $d extends vn {
  constructor(e) {
    super(`?${e}`);
  }
  // ### The term type of this term
  get termType() {
    return "Variable";
  }
  // ### The name of this variable
  get value() {
    return this.id.substr(1);
  }
}
class qd extends vn {
  constructor() {
    return super(""), $r || this;
  }
  // ### The term type of this term
  get termType() {
    return "DefaultGraph";
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return this === e || !!e && this.termType === e.termType;
  }
}
$r = new qd();
class Vl extends vn {
  constructor(e, t, r, i) {
    super(""), this._subject = e, this._predicate = t, this._object = r, this._graph = i || $r;
  }
  // ### The term type of this term
  get termType() {
    return "Quad";
  }
  get subject() {
    return this._subject;
  }
  get predicate() {
    return this._predicate;
  }
  get object() {
    return this._object;
  }
  get graph() {
    return this._graph;
  }
  // ### Returns a plain object representation of this quad
  toJSON() {
    return {
      termType: this.termType,
      subject: this._subject.toJSON(),
      predicate: this._predicate.toJSON(),
      object: this._object.toJSON(),
      graph: this._graph.toJSON()
    };
  }
  // ### Returns whether this object represents the same quad as the other
  equals(e) {
    return !!e && this._subject.equals(e.subject) && this._predicate.equals(e.predicate) && this._object.equals(e.object) && this._graph.equals(e.graph);
  }
}
function Kl(n) {
  return new Wl(n);
}
function Gl(n) {
  return new Pd(n || `n3-${Ud++}`);
}
function jl(n, e) {
  if (typeof e == "string")
    return new Sr(`"${n}"@${e.toLowerCase()}`);
  let t = e ? e.value : "";
  return t === "" && (typeof n == "boolean" ? t = ar.boolean : typeof n == "number" && (Number.isFinite(n) ? t = Number.isInteger(n) ? ar.integer : ar.double : (t = ar.double, Number.isNaN(n) || (n = n > 0 ? "INF" : "-INF")))), t === "" || t === ar.string ? new Sr(`"${n}"`) : new Sr(`"${n}"^^${t}`);
}
function Xl(n) {
  return new $d(n);
}
function Hd() {
  return $r;
}
function mi(n, e, t, r) {
  return new Vl(n, e, t, r);
}
function _r(n) {
  if (n instanceof vn)
    return n;
  switch (n.termType) {
    case "NamedNode":
      return Kl(n.value);
    case "BlankNode":
      return Gl(n.value);
    case "Variable":
      return Xl(n.value);
    case "DefaultGraph":
      return $r;
    case "Literal":
      return jl(n.value, n.language || n.datatype);
    case "Quad":
      return zl(n);
    default:
      throw new Error(`Unexpected termType: ${n.termType}`);
  }
}
function zl(n) {
  if (n instanceof Vl)
    return n;
  if (n.termType !== "Quad")
    throw new Error(`Unexpected termType: ${n.termType}`);
  return mi(_r(n.subject), _r(n.predicate), _r(n.object), _r(n.graph));
}
let Js = 0;
class Jl {
  constructor(e) {
    this._contextStack = [], this._graph = null, e = e || {}, this._setBase(e.baseIRI), e.factory && Yl(this, e.factory);
    const t = typeof e.format == "string" ? e.format.match(/\w*$/)[0].toLowerCase() : "", r = /turtle/.test(t), i = /trig/.test(t), s = /triple/.test(t), a = /quad/.test(t), l = this._n3Mode = /n3/.test(t), u = s || a;
    (this._supportsNamedGraphs = !(r || l)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(r || i || s || l), this._isImpliedBy = e.isImpliedBy, this._supportsRDFStar = t === "" || /star|\*$/.test(t), u && (this._resolveRelativeIRI = (c) => null), this._blankNodePrefix = typeof e.blankNodePrefix != "string" ? "" : e.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = e.lexer || new kd({ lineMode: u, n3: l, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!e.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    Js = 0;
  }
  // ## Private methods
  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase(e) {
    if (!e)
      this._base = "", this._basePath = "";
    else {
      const t = e.indexOf("#");
      t >= 0 && (e = e.substr(0, t)), this._base = e, this._basePath = e.indexOf("/") < 0 ? e : e.replace(/[^\/?]*(?:\?.*)?$/, ""), e = e.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i), this._baseRoot = e[0], this._baseScheme = e[1];
    }
  }
  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext(e, t, r, i, s) {
    const a = this._n3Mode;
    this._contextStack.push({
      type: e,
      subject: r,
      predicate: i,
      object: s,
      graph: t,
      inverse: a ? this._inversePredicate : !1,
      blankPrefix: a ? this._prefixes._ : "",
      quantified: a ? this._quantified : null
    }), a && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
  }
  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext(e, t) {
    const r = this._contextStack.pop();
    if (!r || r.type !== e)
      return this._error(`Unexpected ${t.type}`, t);
    this._subject = r.subject, this._predicate = r.predicate, this._object = r.object, this._graph = r.graph, this._n3Mode && (this._inversePredicate = r.inverse, this._prefixes._ = r.blankPrefix, this._quantified = r.quantified);
  }
  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext(e) {
    switch (e.type) {
      // If an EOF token arrives in the top context, signal that we're done
      case "eof":
        return this._graph !== null ? this._error("Unclosed graph", e) : (delete this._prefixes._, this._callback(null, null, this._prefixes));
      // It could be a prefix declaration
      case "PREFIX":
        this._sparqlStyle = !0;
      case "@prefix":
        return this._readPrefix;
      // It could be a base declaration
      case "BASE":
        this._sparqlStyle = !0;
      case "@base":
        return this._readBaseIRI;
      // It could be a graph
      case "{":
        if (this._supportsNamedGraphs)
          return this._graph = "", this._subject = null, this._readSubject;
      case "GRAPH":
        if (this._supportsNamedGraphs)
          return this._readNamedGraphLabel;
      // Otherwise, the next token must be a subject
      default:
        return this._readSubject(e);
    }
  }
  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity(e, t) {
    let r;
    switch (e.type) {
      // Read a relative or absolute IRI
      case "IRI":
      case "typeIRI":
        const i = this._resolveIRI(e.value);
        if (i === null)
          return this._error("Invalid IRI", e);
        r = this._factory.namedNode(i);
        break;
      // Read a prefixed name
      case "type":
      case "prefixed":
        const s = this._prefixes[e.prefix];
        if (s === void 0)
          return this._error(`Undefined prefix "${e.prefix}:"`, e);
        r = this._factory.namedNode(s + e.value);
        break;
      // Read a blank node
      case "blank":
        r = this._factory.blankNode(this._prefixes[e.prefix] + e.value);
        break;
      // Read a variable
      case "var":
        r = this._factory.variable(e.value.substr(1));
        break;
      // Everything else is not an entity
      default:
        return this._error(`Expected entity but got ${e.type}`, e);
    }
    return !t && this._n3Mode && r.id in this._quantified && (r = this._quantified[r.id]), r;
  }
  // ### `_readSubject` reads a quad's subject
  _readSubject(e) {
    switch (this._predicate = null, e.type) {
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject = this._factory.blankNode(),
          null,
          null
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this.RDF_NIL, null, null), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._graph = this._factory.blankNode(),
          null,
          null
        ), this._readSubject) : this._error("Unexpected graph", e);
      case "}":
        return this._readPunctuation(e);
      case "@forSome":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = "blankNode", this._readQuantifierList) : this._error('Unexpected "@forSome"', e);
      case "@forAll":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = "variable", this._readQuantifierList) : this._error('Unexpected "@forAll"', e);
      case "literal":
        if (!this._n3Mode)
          return this._error("Unexpected literal", e);
        if (e.prefix.length === 0)
          return this._literalValue = e.value, this._completeSubjectLiteral;
        this._subject = this._factory.literal(e.value, this._factory.namedNode(e.prefix));
        break;
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, null, null, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", e);
      default:
        if ((this._subject = this._readEntity(e)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._readPredicateOrNamedGraph);
    }
    return this._readPredicateOrNamedGraph;
  }
  // ### `_readPredicate` reads a quad's predicate
  _readPredicate(e) {
    const t = e.type;
    switch (t) {
      case "inverse":
        this._inversePredicate = !0;
      case "abbreviation":
        this._predicate = this.ABBREVIATIONS[e.value];
        break;
      case ".":
      case "]":
      case "}":
        return this._predicate === null ? this._error(`Unexpected ${t}`, e) : (this._subject = null, t === "]" ? this._readBlankNodeTail(e) : this._readPunctuation(e));
      case ";":
        return this._predicate !== null ? this._readPredicate : this._error("Expected predicate but got ;", e);
      case "[":
        if (this._n3Mode)
          return this._saveContext(
            "blank",
            this._graph,
            this._subject,
            this._subject = this._factory.blankNode(),
            null
          ), this._readBlankNodeHead;
      case "blank":
        if (!this._n3Mode)
          return this._error("Disallowed blank node as predicate", e);
      default:
        if ((this._predicate = this._readEntity(e)) === void 0)
          return;
    }
    return this._readObject;
  }
  // ### `_readObject` reads a quad's object
  _readObject(e) {
    switch (e.type) {
      case "literal":
        if (e.prefix.length === 0)
          return this._literalValue = e.value, this._readDataTypeOrLang;
        this._object = this._factory.literal(e.value, this._factory.namedNode(e.prefix));
        break;
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject,
          this._predicate,
          this._subject = this._factory.blankNode()
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", e);
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", e);
      default:
        if ((this._object = this._readEntity(e)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  }
  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph(e) {
    return e.type === "{" ? this._readGraph(e) : this._readPredicate(e);
  }
  // ### `_readGraph` reads a graph
  _readGraph(e) {
    return e.type !== "{" ? this._error(`Expected graph but got ${e.type}`, e) : (this._graph = this._subject, this._subject = null, this._readSubject);
  }
  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead(e) {
    return e.type === "]" ? (this._subject = null, this._readBlankNodeTail(e)) : (this._predicate = null, this._readPredicate(e));
  }
  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail(e) {
    if (e.type !== "]")
      return this._readBlankNodePunctuation(e);
    this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph);
    const t = this._predicate === null;
    return this._restoreContext("blank", e), this._object !== null ? this._getContextEndReader() : this._predicate !== null ? this._readObject : t ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
  }
  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank(e) {
    switch (e.type) {
      case ".":
      case "}":
        return this._subject = null, this._readPunctuation(e);
      default:
        return this._readPredicate(e);
    }
  }
  // ### `_readListItem` reads items from a list
  _readListItem(e) {
    let t = null, r = null, i = this._readListItem;
    const s = this._subject, a = this._contextStack, l = a[a.length - 1];
    switch (e.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          r = this._factory.blankNode(),
          this.RDF_FIRST,
          this._subject = t = this._factory.blankNode()
        ), i = this._readBlankNodeHead;
        break;
      case "(":
        this._saveContext(
          "list",
          this._graph,
          r = this._factory.blankNode(),
          this.RDF_FIRST,
          this.RDF_NIL
        ), this._subject = null;
        break;
      case ")":
        if (this._restoreContext("list", e), a.length !== 0 && a[a.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (i = this._readPredicate, this._subject === this.RDF_NIL)
            return i;
        } else if (i = this._getContextEndReader(), this._object === this.RDF_NIL)
          return i;
        r = this.RDF_NIL;
        break;
      case "literal":
        e.prefix.length === 0 ? (this._literalValue = e.value, i = this._readListItemDataTypeOrLang) : (t = this._factory.literal(e.value, this._factory.namedNode(e.prefix)), i = this._getContextEndReader());
        break;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", e);
      default:
        if ((t = this._readEntity(e)) === void 0)
          return;
    }
    if (r === null && (this._subject = r = this._factory.blankNode()), s === null ? l.predicate === null ? l.subject = r : l.object = r : this._emit(s, this.RDF_REST, r, this._graph), t !== null) {
      if (this._n3Mode && (e.type === "IRI" || e.type === "prefixed"))
        return this._saveContext("item", this._graph, r, this.RDF_FIRST, t), this._subject = t, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(r, this.RDF_FIRST, t, this._graph);
    }
    return i;
  }
  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang(e) {
    return this._completeObjectLiteral(e, !1);
  }
  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang(e) {
    return this._completeObjectLiteral(e, !0);
  }
  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral(e) {
    let t = this._factory.literal(this._literalValue);
    switch (e.type) {
      // Create a datatyped literal
      case "type":
      case "typeIRI":
        const r = this._readEntity(e);
        if (r === void 0) return;
        t = this._factory.literal(this._literalValue, r), e = null;
        break;
      // Create a language-tagged string
      case "langcode":
        t = this._factory.literal(this._literalValue, e.value), e = null;
        break;
    }
    return { token: e, literal: t };
  }
  // Completes a literal in subject position
  _completeSubjectLiteral(e) {
    return this._subject = this._completeLiteral(e).literal, this._readPredicateOrNamedGraph;
  }
  // Completes a literal in object position
  _completeObjectLiteral(e, t) {
    const r = this._completeLiteral(e);
    if (r)
      return this._object = r.literal, t && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), r.token === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(r.token));
  }
  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail(e) {
    return e.type !== "}" ? this._readPunctuation(e) : (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", e), this._object === null ? this._readPredicate : this._getContextEndReader());
  }
  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation(e) {
    let t, r = this._graph;
    const i = this._subject, s = this._inversePredicate;
    switch (e.type) {
      // A closing brace ends a graph
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", e);
        if (this._n3Mode)
          return this._readFormulaTail(e);
        this._graph = null;
      // A dot just ends the statement, without sharing anything with the next
      case ".":
        this._subject = null, t = this._contextStack.length ? this._readSubject : this._readInTopContext, s && (this._inversePredicate = !1);
        break;
      // Semicolon means the subject is shared; predicate and object are different
      case ";":
        t = this._readPredicate;
        break;
      // Comma means both the subject and predicate are shared; the object is different
      case ",":
        t = this._readObject;
        break;
      // {| means that the current triple is annotated with predicate-object pairs.
      case "{|":
        if (!this._supportsRDFStar)
          return this._error("Unexpected RDF-star syntax", e);
        const a = this._predicate, l = this._object;
        this._subject = this._factory.quad(i, a, l, this.DEFAULTGRAPH), t = this._readPredicate;
        break;
      // |} means that the current quoted triple in annotation syntax is finalized.
      case "|}":
        if (this._subject.termType !== "Quad")
          return this._error("Unexpected asserted triple closing", e);
        this._subject = null, t = this._readPunctuation;
        break;
      default:
        if (this._supportsQuads && this._graph === null && (r = this._readEntity(e)) !== void 0) {
          t = this._readQuadPunctuation;
          break;
        }
        return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
    }
    if (i !== null) {
      const a = this._predicate, l = this._object;
      s ? this._emit(l, a, i, r) : this._emit(i, a, l, r);
    }
    return t;
  }
  // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation(e) {
    let t;
    switch (e.type) {
      // Semicolon means the subject is shared; predicate and object are different
      case ";":
        t = this._readPredicate;
        break;
      // Comma means both the subject and predicate are shared; the object is different
      case ",":
        t = this._readObject;
        break;
      default:
        return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
    }
    return this._emit(this._subject, this._predicate, this._object, this._graph), t;
  }
  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation(e) {
    return e.type !== "." ? this._error("Expected dot to follow quad", e) : this._readInTopContext;
  }
  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix(e) {
    return e.type !== "prefix" ? this._error("Expected prefix to follow @prefix", e) : (this._prefix = e.value, this._readPrefixIRI);
  }
  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI(e) {
    if (e.type !== "IRI")
      return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, e);
    const t = this._readEntity(e);
    return this._prefixes[this._prefix] = t.value, this._prefixCallback(this._prefix, t), this._readDeclarationPunctuation;
  }
  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI(e) {
    const t = e.type === "IRI" && this._resolveIRI(e.value);
    return t ? (this._setBase(t), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", e);
  }
  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel(e) {
    switch (e.type) {
      case "IRI":
      case "blank":
      case "prefixed":
        return this._readSubject(e), this._readGraph;
      case "[":
        return this._readNamedGraphBlankLabel;
      default:
        return this._error("Invalid graph label", e);
    }
  }
  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel(e) {
    return e.type !== "]" ? this._error("Invalid graph label", e) : (this._subject = this._factory.blankNode(), this._readGraph);
  }
  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation(e) {
    return this._sparqlStyle ? (this._sparqlStyle = !1, this._readInTopContext(e)) : e.type !== "." ? this._error("Expected declaration to end with a dot", e) : this._readInTopContext;
  }
  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList(e) {
    let t;
    switch (e.type) {
      case "IRI":
      case "prefixed":
        if ((t = this._readEntity(e, !0)) !== void 0)
          break;
      default:
        return this._error(`Unexpected ${e.type}`, e);
    }
    return this._explicitQuantifiers ? (this._subject === null ? this._emit(
      this._graph || this.DEFAULTGRAPH,
      this._predicate,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ) : this._emit(
      this._subject,
      this.RDF_REST,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ), this._emit(this._subject, this.RDF_FIRST, t, this.QUANTIFIERS_GRAPH)) : this._quantified[t.id] = this._factory[this._quantifier](this._factory.blankNode().value), this._readQuantifierPunctuation;
  }
  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation(e) {
    return e.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(e));
  }
  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader(e) {
    return this._afterPath = e, this._readPath;
  }
  // ### `_readPath` reads a potential path
  _readPath(e) {
    switch (e.type) {
      // Forward path
      case "!":
        return this._readForwardPath;
      // Backward path
      case "^":
        return this._readBackwardPath;
      // Not a path; resume reading where we left off
      default:
        const t = this._contextStack, r = t.length && t[t.length - 1];
        if (r && r.type === "item") {
          const i = this._subject;
          this._restoreContext("item", e), this._emit(this._subject, this.RDF_FIRST, i, this._graph);
        }
        return this._afterPath(e);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(e) {
    let t, r;
    const i = this._factory.blankNode();
    if ((r = this._readEntity(e)) !== void 0)
      return this._predicate === null ? (t = this._subject, this._subject = i) : (t = this._object, this._object = i), this._emit(t, r, i, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(e) {
    const t = this._factory.blankNode();
    let r, i;
    if ((r = this._readEntity(e)) !== void 0)
      return this._predicate === null ? (i = this._subject, this._subject = t) : (i = this._object, this._object = t), this._emit(t, r, i, this._graph), this._readPath;
  }
  // ### `_readRDFStarTailOrGraph` reads the graph of a nested RDF-star quad or the end of a nested RDF-star triple
  _readRDFStarTailOrGraph(e) {
    return e.type !== ">>" ? this._supportsQuads && this._graph === null && (this._graph = this._readEntity(e)) !== void 0 ? this._readRDFStarTail : this._error(`Expected >> to follow "${this._object.id}"`, e) : this._readRDFStarTail(e);
  }
  // ### `_readRDFStarTail` reads the end of a nested RDF-star triple
  _readRDFStarTail(e) {
    if (e.type !== ">>")
      return this._error(`Expected >> but got ${e.type}`, e);
    const t = this._factory.quad(
      this._subject,
      this._predicate,
      this._object,
      this._graph || this.DEFAULTGRAPH
    );
    return this._restoreContext("<<", e), this._subject === null ? (this._subject = t, this._readPredicate) : (this._object = t, this._getContextEndReader());
  }
  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader() {
    const e = this._contextStack;
    if (!e.length)
      return this._readPunctuation;
    switch (e[e.length - 1].type) {
      case "blank":
        return this._readBlankNodeTail;
      case "list":
        return this._readListItem;
      case "formula":
        return this._readFormulaTail;
      case "<<":
        return this._readRDFStarTailOrGraph;
    }
  }
  // ### `_emit` sends a quad through the callback
  _emit(e, t, r, i) {
    this._callback(null, this._factory.quad(e, t, r, i || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(e, t) {
    const r = new Error(`${e} on line ${t.line}.`);
    r.context = {
      token: t,
      line: t.line,
      previousToken: this._lexer.previousToken
    }, this._callback(r), this._callback = da;
  }
  // ### `_resolveIRI` resolves an IRI against the base path
  _resolveIRI(e) {
    return /^[a-z][a-z0-9+.-]*:/i.test(e) ? e : this._resolveRelativeIRI(e);
  }
  // ### `_resolveRelativeIRI` resolves an IRI against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveRelativeIRI(e) {
    if (!e.length)
      return this._base;
    switch (e[0]) {
      // Resolve relative fragment IRIs against the base IRI
      case "#":
        return this._base + e;
      // Resolve relative query string IRIs by replacing the query string
      case "?":
        return this._base.replace(/(?:\?.*)?$/, e);
      // Resolve root-relative IRIs at the root of the base IRI
      case "/":
        return (e[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(e);
      // Resolve all other IRIs at the base IRI's path
      default:
        return /^[^/:]*:/.test(e) ? null : this._removeDotSegments(this._basePath + e);
    }
  }
  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments(e) {
    if (!/(^|\/)\.\.?($|[/#?])/.test(e))
      return e;
    const t = e.length;
    let r = "", i = -1, s = -1, a = 0, l = "/";
    for (; i < t; ) {
      switch (l) {
        // The path starts with the first slash after the authority
        case ":":
          if (s < 0 && e[++i] === "/" && e[++i] === "/")
            for (; (s = i + 1) < t && e[s] !== "/"; )
              i = s;
          break;
        // Don't modify a query string or fragment
        case "?":
        case "#":
          i = t;
          break;
        // Handle '/.' or '/..' path segments
        case "/":
          if (e[i + 1] === ".")
            switch (l = e[++i + 1], l) {
              // Remove a '/.' segment
              case "/":
                r += e.substring(a, i - 1), a = i + 1;
                break;
              // Remove a trailing '/.' segment
              case void 0:
              case "?":
              case "#":
                return r + e.substring(a, i) + e.substr(i + 1);
              // Remove a '/..' segment
              case ".":
                if (l = e[++i + 1], l === void 0 || l === "/" || l === "?" || l === "#") {
                  if (r += e.substring(a, i - 2), (a = r.lastIndexOf("/")) >= s && (r = r.substr(0, a)), l !== "/")
                    return `${r}/${e.substr(i + 1)}`;
                  a = i + 1;
                }
            }
      }
      l = e[++i];
    }
    return r + e.substring(a);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(e, t, r) {
    let i, s, a;
    if (t && (t.onQuad || t.onPrefix || t.onComment) ? (i = t.onQuad, s = t.onPrefix, a = t.onComment) : (i = t, s = r), this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Js++}_`, this._prefixCallback = s || da, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !i) {
      const u = [];
      let c;
      if (this._callback = (h, f) => {
        h ? c = h : f && u.push(f);
      }, this._lexer.tokenize(e).every((h) => this._readCallback = this._readCallback(h)), c) throw c;
      return u;
    }
    let l = (u, c) => {
      u !== null ? (this._callback(u), this._callback = da) : this._readCallback && (this._readCallback = this._readCallback(c));
    };
    a && (this._lexer.comments = !0, l = (u, c) => {
      u !== null ? (this._callback(u), this._callback = da) : this._readCallback && (c.type === "comment" ? a(c.value) : this._readCallback = this._readCallback(c));
    }), this._callback = i, this._lexer.tokenize(e, l);
  }
}
function da() {
}
function Yl(n, e) {
  n._factory = e, n.DEFAULTGRAPH = e.defaultGraph(), n.RDF_FIRST = e.namedNode(Mt.rdf.first), n.RDF_REST = e.namedNode(Mt.rdf.rest), n.RDF_NIL = e.namedNode(Mt.rdf.nil), n.N3_FORALL = e.namedNode(Mt.r.forAll), n.N3_FORSOME = e.namedNode(Mt.r.forSome), n.ABBREVIATIONS = {
    a: e.namedNode(Mt.rdf.type),
    "=": e.namedNode(Mt.owl.sameAs),
    ">": e.namedNode(Mt.log.implies),
    "<": e.namedNode(Mt.log.isImpliedBy)
  }, n.QUANTIFIERS_GRAPH = e.namedNode("urn:n3:quantifiers");
}
Yl(Jl.prototype, Md);
if (typeof En > "u")
  var En = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  };
class ve {
  constructor(e, t) {
    this.options = t || {}, this.kb = e, this.target = t.target || {
      graph: {
        subjects: {},
        prefixes: {},
        terms: {}
      }
    }, this.blankNodes = [], this.htmlOptions = {
      selfClosing: "br img input area base basefont col colgroup source wbr isindex link meta param hr"
    }, this.theOne = "_:" + (/* @__PURE__ */ new Date()).getTime(), this.language = null, this.vocabulary = null, this.blankCounter = 0, this.langAttributes = [{
      namespaceURI: "http://www.w3.org/XML/1998/namespace",
      localName: "lang"
    }], this.inXHTMLMode = !1, this.absURIRE = /[\w\_\-]+:\S+/, this.finishedHandlers = [], this.init();
  }
  addTriple(e, t, r, i) {
    var s, a, l, u;
    typeof t > "u" ? s = Pt.namedNode(this.options.base) : s = this.toRDFNodeObject(t), l = this.toRDFNodeObject(r), a = this.toRDFNodeObject(i), u = Pt.namedNode(this.options.base), this.kb.add(s, l, a, u);
  }
  ancestorPath(e) {
    for (var t = ""; e && e.nodeType !== En.DOCUMENT_NODE; )
      t = "/" + e.localName + t, e = e.parentNode;
    return t;
  }
  copyMappings(e) {
    var t = {};
    for (var r in e)
      t[r] = e[r];
    return t;
  }
  copyProperties() {
  }
  deriveDateTimeType(e) {
    for (var t = 0; t < ve.dateTimeTypes.length; t++) {
      var r = ve.dateTimeTypes[t].pattern.exec(e);
      if (r && r[0].length === e.length)
        return ve.dateTimeTypes[t].type;
    }
    return null;
  }
  init() {
  }
  newBlankNode() {
    return this.blankCounter++, "_:" + this.blankCounter;
  }
  newSubjectOrigin(e, t) {
  }
  parseCURIE(e, t, r) {
    var i = e.indexOf(":"), s;
    if (i >= 0) {
      var a = e.substring(0, i);
      if (a === "")
        return s = t[""], s ? s + e.substring(i + 1) : null;
      if (a === "_")
        return "_:" + e.substring(i + 1);
      if (ve.NCNAME.test(a) && (s = t[a], s))
        return s + e.substring(i + 1);
    }
    return null;
  }
  parseCURIEOrURI(e, t, r) {
    var i = this.parseCURIE(e, t, r);
    return i || this.resolveAndNormalize(r, e);
  }
  parsePredicate(e, t, r, i, s, a) {
    if (e === "")
      return null;
    var l = this.parseTermOrCURIEOrAbsURI(e, t, a ? null : r, i, s);
    return l && l.indexOf("_:") === 0 ? null : l;
  }
  parsePrefixMappings(e, t) {
    for (var r = this.tokenize(e), i = null, s = 0; s < r.length; s++)
      r[s][r[s].length - 1] === ":" ? i = r[s].substring(0, r[s].length - 1) : i && (t[i] = this.options.base ? Dt(r[s], this.options.base) : r[s], i = null);
  }
  static parseRDFaDOM(e, t, r) {
    var i = new ve(t, {
      base: r
    });
    e.baseURI || (e.baseURI = r), i.process(e, {
      baseURI: r
    });
  }
  parseSafeCURIEOrCURIEOrURI(e, t, r) {
    return e = this.trim(e), e.charAt(0) === "[" && e.charAt(e.length - 1) === "]" ? (e = e.substring(1, e.length - 1), e = e.trim(e), e.length === 0 ? null : e === "_:" ? this.theOne : this.parseCURIE(e, t, r)) : this.parseCURIEOrURI(e, t, r);
  }
  parseTermOrCURIEOrAbsURI(e, t, r, i, s) {
    e = this.trim(e);
    var a = this.parseCURIE(e, i, s);
    if (a)
      return a;
    if (r) {
      if (t && !this.absURIRE.exec(e))
        return t + e;
      var l = r[e];
      if (l)
        return l;
      var u = e.toLowerCase();
      if (l = r[u], l)
        return l;
    }
    return this.absURIRE.exec(e) ? this.resolveAndNormalize(s, e) : null;
  }
  parseTermOrCURIEOrURI(e, t, r, i, s) {
    e = this.trim(e);
    var a = this.parseCURIE(e, i, s);
    if (a)
      return a;
    var l = r[e];
    if (l)
      return l;
    var u = e.toLowerCase();
    return l = r[u], l || (t && !this.absURIRE.exec(e) ? t + e : this.resolveAndNormalize(s, e));
  }
  parseURI(e) {
    return e;
  }
  process(e, t) {
    t = t || {};
    var r;
    e.nodeType === En.DOCUMENT_NODE ? (e.baseURI && !t.baseURI && (t.baseURI = e.baseURI), r = e.baseURI, e = e.documentElement, e.baseURI || (e.baseURI = r), this.setContext(e)) : e.parentNode.nodeType === En.DOCUMENT_NODE && this.setContext(e);
    var i = [], s = function(se) {
      if (!se && t && t.baseURI)
        return t.baseURI;
      var Fe = se.indexOf("#");
      return Fe >= 0 && (se = se.substring(0, Fe)), t && t.baseURIMap && (se = t.baseURIMap(se)), se;
    };
    for (i.push({
      current: e,
      context: this.push(null, s(e.baseURI))
    }); i.length > 0; ) {
      var a = i.shift();
      if (a.parent) {
        if (a.context.parent && a.context.parent.listMapping === a.listMapping)
          continue;
        for (let se in a.listMapping) {
          var l = a.listMapping[se];
          if (l.length === 0) {
            this.addTriple(a.parent, a.subject, se, {
              type: ve.objectURI,
              value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
            });
            continue;
          }
          var u = [];
          for (let Fe = 0; Fe < l.length; Fe++)
            u.push(this.newBlankNode());
          for (let Fe = 0; Fe < u.length; Fe++)
            this.addTriple(a.parent, u[Fe], "http://www.w3.org/1999/02/22-rdf-syntax-ns#first", l[Fe]), this.addTriple(a.parent, u[Fe], "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest", {
              type: ve.objectURI,
              value: Fe + 1 < u.length ? u[Fe + 1] : "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
            });
          this.addTriple(a.parent, a.subject, se, {
            type: ve.objectURI,
            value: u[0]
          });
        }
        continue;
      }
      var c = a.current, h = a.context, f = !1, m = null, v = null, w = null, b = h.prefixes, x = !1, _ = [], R = h.listMapping, G = !h.parent, Y = h.language, A = h.vocabulary;
      r = this.parseURI(s(c.baseURI)), c.item = null;
      var K = c.getAttributeNode("vocab");
      if (K) {
        let se = this.trim(K.value);
        if (se.length > 0) {
          A = se;
          var M = r.spec;
          this.addTriple(c, M, "http://www.w3.org/ns/rdfa#usesVocabulary", {
            type: ve.objectURI,
            value: A
          });
        } else
          A = this.vocabulary;
      }
      for (var j = 0; j < c.attributes.length; j++) {
        var k = c.attributes[j];
        if (k.nodeName.charAt(0) === "x" && k.nodeName.indexOf("xmlns:") === 0) {
          x || (b = this.copyMappings(b), x = !0);
          var H = k.nodeName.substring(6), $ = ve.trim(k.value);
          b[H] = this.options.base ? Dt($, this.options.base) : $;
        }
      }
      var q = c.getAttributeNode("prefix");
      q && (x || (b = this.copyMappings(b), x = !0), this.parsePrefixMappings(q.value, b));
      var ee = null;
      for (let se = 0; !ee && se < this.langAttributes.length; se++)
        ee = c.getAttributeNodeNS(this.langAttributes[se].namespaceURI, this.langAttributes[se].localName);
      if (ee) {
        let se = ve.trim(ee.value);
        se.length > 0 ? Y = se : Y = null;
      }
      var Q = c.getAttributeNode("rel"), S = c.getAttributeNode("rev"), V = c.getAttributeNode("typeof"), Z = c.getAttributeNode("property"), ae = c.getAttributeNode("datatype"), ie = this.inHTMLMode ? c.getAttributeNode("datetime") : null, oe = c.getAttributeNode("content"), ne = c.getAttributeNode("about"), ge = c.getAttributeNode("src"), Be = c.getAttributeNode("resource"), pe = c.getAttributeNode("href"), Ce = c.getAttributeNode("inlist"), Me = [], Ye, Te;
      if (Q) {
        Te = this.tokenize(Q.value);
        for (let se = 0; se < Te.length; se++)
          Ye = this.parsePredicate(Te[se], A, h.terms, b, r, this.inHTMLMode && Z !== null), Ye && Me.push(Ye);
      }
      var qe = [];
      if (S) {
        Te = this.tokenize(S.value);
        for (let se = 0; se < Te.length; se++)
          Ye = this.parsePredicate(Te[se], A, h.terms, b, r, this.inHTMLMode && Z), Ye && qe.push(Ye);
      }
      if (this.inHTMLMode && (Q || S) && Z && (Me.length === 0 && (Q = null), qe.length === 0 && (S = null)), Q || S ? (ne && (m = this.parseSafeCURIEOrCURIEOrURI(ne.value, b, r)), V && (w = m), m || (c.parentNode.nodeType === En.DOCUMENT_NODE ? m = s(c.baseURI) : h.parentObject && (m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject)), Be && (v = this.parseSafeCURIEOrCURIEOrURI(Be.value, b, r)), v || (pe ? v = this.resolveAndNormalize(r, encodeURI(pe.value)) : ge ? v = this.resolveAndNormalize(r, encodeURI(ge.value)) : V && !ne && !(this.inXHTMLMode && (c.localName === "head" || c.localName === "body")) && (v = this.newBlankNode())), V && !ne && this.inXHTMLMode && (c.localName === "head" || c.localName === "body") ? w = m : V && !ne && (w = v)) : Z && !oe && !ae ? (ne && (m = this.parseSafeCURIEOrCURIEOrURI(ne.value, b, r), V && (w = m)), !m && c.parentNode.nodeType === En.DOCUMENT_NODE ? (m = s(c.baseURI), V && (w = m)) : !m && h.parentObject && (m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject), V && !w && (Be && (w = this.parseSafeCURIEOrCURIEOrURI(Be.value, b, r)), !w && pe && (w = this.resolveAndNormalize(r, encodeURI(pe.value))), !w && ge && (w = this.resolveAndNormalize(r, encodeURI(ge.value))), !w && (this.inXHTMLMode || this.inHTMLMode) && (c.localName === "head" || c.localName === "body") && (w = m), w || (w = this.newBlankNode()), v = w)) : (ne && (m = this.parseSafeCURIEOrCURIEOrURI(ne.value, b, r)), !m && Be && (m = this.parseSafeCURIEOrCURIEOrURI(Be.value, b, r)), !m && pe && (m = this.resolveAndNormalize(r, encodeURI(pe.value))), !m && ge && (m = this.resolveAndNormalize(r, encodeURI(ge.value))), m || (c.parentNode.nodeType === En.DOCUMENT_NODE ? m = s(c.baseURI) : (this.inXHTMLMode || this.inHTMLMode) && (c.localName === "head" || c.localName === "body") ? m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject : V ? m = this.newBlankNode() : h.parentObject && (m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject, Z || (f = !0))), V && (w = m)), m && (ne || Be || w)) {
        var ht = m;
        V && !ne && !Be && v && (ht = v), this.newSubjectOrigin(c, ht);
      }
      if (w) {
        Te = this.tokenize(V.value);
        for (let se = 0; se < Te.length; se++) {
          var it = this.parseTermOrCURIEOrAbsURI(Te[se], A, h.terms, b, r);
          it && this.addTriple(c, w, ve.typeURI, {
            type: ve.objectURI,
            value: it
          });
        }
      }
      if (m && m !== h.parentObject && (R = {}, G = !0), v) {
        if (Q && Ce)
          for (let se = 0; se < Me.length; se++) {
            let Fe = R[Me[se]];
            Fe || (Fe = [], R[Me[se]] = Fe), Fe.push({
              type: ve.objectURI,
              value: v
            });
          }
        else if (Q)
          for (let se = 0; se < Me.length; se++)
            this.addTriple(c, m, Me[se], {
              type: ve.objectURI,
              value: v
            });
        if (S)
          for (let se = 0; se < qe.length; se++)
            this.addTriple(c, v, qe[se], {
              type: ve.objectURI,
              value: m
            });
      } else {
        if (m && !v && (Q || S) && (v = this.newBlankNode()), Q && Ce)
          for (let se = 0; se < Me.length; se++) {
            let Fe = R[Me[se]];
            Fe || (Fe = [], R[Ye] = Fe), _.push({
              predicate: Me[se],
              list: Fe
            });
          }
        else if (Q)
          for (let se = 0; se < Me.length; se++)
            _.push({
              predicate: Me[se],
              forward: !0
            });
        if (S)
          for (let se = 0; se < qe.length; se++)
            _.push({
              predicate: qe[se],
              forward: !1
            });
      }
      if (Z) {
        var De = null, Re = null;
        ae ? (De = ae.value === "" ? ve.PlainLiteralURI : this.parseTermOrCURIEOrAbsURI(ae.value, A, h.terms, b, r), ie && !oe ? Re = ie.value : Re = De === ve.XMLLiteralURI || De === ve.HTMLLiteralURI ? null : oe ? oe.value : c.textContent) : oe ? (De = ve.PlainLiteralURI, Re = oe.value) : ie ? (Re = ie.value, De = ve.deriveDateTimeType(Re), De || (De = ve.PlainLiteralURI)) : !Q && !S && (Be && (Re = this.parseSafeCURIEOrCURIEOrURI(Be.value, b, r)), !Re && pe ? Re = this.resolveAndNormalize(r, encodeURI(pe.value)) : !Re && ge && (Re = this.resolveAndNormalize(r, encodeURI(ge.value))), Re && (De = ve.objectURI)), De || (V && !ne ? (De = ve.objectURI, Re = w) : (Re = c.textContent, this.inHTMLMode && c.localName === "time" && (De = ve.deriveDateTimeType(Re)), De || (De = ve.PlainLiteralURI))), Te = this.tokenize(Z.value);
        for (let se = 0; se < Te.length; se++) {
          let Fe = this.parsePredicate(Te[se], A, h.terms, b, r);
          if (Fe)
            if (Ce) {
              let lt = R[Fe];
              lt || (lt = [], R[Fe] = lt), lt.push(De === ve.XMLLiteralURI || De === ve.HTMLLiteralURI ? {
                type: De,
                value: c.childNodes
              } : {
                type: De || ve.PlainLiteralURI,
                value: Re,
                language: Y
              });
            } else
              De === ve.XMLLiteralURI || De === ve.HTMLLiteralURI ? this.addTriple(c, m, Fe, {
                type: De,
                value: c.childNodes
              }) : this.addTriple(c, m, Fe, {
                type: De || ve.PlainLiteralURI,
                value: Re,
                language: Y
              });
        }
      }
      if (m && !f)
        for (let se = 0; se < h.incomplete.length; se++)
          h.incomplete[se].list ? h.incomplete[se].list.push({
            type: ve.objectURI,
            value: m
          }) : h.incomplete[se].forward ? this.addTriple(c, h.subject, h.incomplete[se].predicate, {
            type: ve.objectURI,
            value: m
          }) : this.addTriple(c, m, h.incomplete[se].predicate, {
            type: ve.objectURI,
            value: h.subject
          });
      var _e = null, Ct = m;
      f ? (_e = this.push(h, h.subject), _e.parentObject = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject, _e.incomplete = h.incomplete, _e.language = Y, _e.prefixes = b, _e.vocabulary = A) : (_e = this.push(h, m), _e.parentObject = v || m || h.subject, _e.prefixes = b, _e.incomplete = _, v && (Ct = v, R = {}, G = !0), _e.listMapping = R, _e.language = Y, _e.vocabulary = A), G && i.unshift({
        parent: c,
        context: h,
        subject: Ct,
        listMapping: R
      });
      for (var Ve = c.lastChild; Ve; Ve = Ve.previousSibling)
        Ve.nodeType === En.ELEMENT_NODE && i.unshift({
          current: Ve,
          context: _e
        });
    }
    this.inHTMLMode && this.copyProperties();
    for (let se = 0; se < this.finishedHandlers.length; se++)
      this.finishedHandlers[se](e);
  }
  push(e, t) {
    return {
      parent: e,
      subject: t || (e ? e.subject : null),
      parentObject: null,
      incomplete: [],
      listMapping: e ? e.listMapping : {},
      language: e ? e.language : this.language,
      prefixes: e ? e.prefixes : this.target.graph.prefixes,
      terms: e ? e.terms : this.target.graph.terms,
      vocabulary: e ? e.vocabulary : this.vocabulary
    };
  }
  resolveAndNormalize(e, t) {
    return Dt(t, e);
  }
  setContext(e) {
    e.localName === "html" && e.getAttribute("version") === "XHTML+RDFa 1.1" ? this.setXHTMLContext() : e.localName === "html" || e.namespaceURI === "http://www.w3.org/1999/xhtml" ? typeof document < "u" && document.doctype ? document.doctype.publicId === "-//W3C//DTD XHTML+RDFa 1.0//EN" && document.doctype.systemId === "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd" ? (console.log("WARNING: RDF 1.0 is not supported.  Defaulting to HTML5 mode."), this.setHTMLContext()) : document.doctype.publicId === "-//W3C//DTD XHTML+RDFa 1.1//EN" && document.doctype.systemId === "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-2.dtd" ? this.setXHTMLContext() : this.setHTMLContext() : this.setHTMLContext() : this.setXMLContext();
  }
  setHTMLContext() {
    this.setInitialContext(), this.langAttributes = [{
      namespaceURI: "http://www.w3.org/XML/1998/namespace",
      localName: "lang"
    }, {
      namespaceURI: null,
      localName: "lang"
    }], this.inXHTMLMode = !1, this.inHTMLMode = !0;
  }
  setInitialContext() {
    this.vocabulary = null, this.langAttributes = [{
      namespaceURI: "http://www.w3.org/XML/1998/namespace",
      localName: "lang"
    }];
  }
  setXHTMLContext() {
    this.setInitialContext(), this.inXHTMLMode = !0, this.inHTMLMode = !1, this.langAttributes = [{
      namespaceURI: "http://www.w3.org/XML/1998/namespace",
      localName: "lang"
    }, {
      namespaceURI: null,
      localName: "lang"
    }], this.target.graph.terms.alternate = "http://www.w3.org/1999/xhtml/vocab#alternate", this.target.graph.terms.appendix = "http://www.w3.org/1999/xhtml/vocab#appendix", this.target.graph.terms.bookmark = "http://www.w3.org/1999/xhtml/vocab#bookmark", this.target.graph.terms.cite = "http://www.w3.org/1999/xhtml/vocab#cite", this.target.graph.terms.chapter = "http://www.w3.org/1999/xhtml/vocab#chapter", this.target.graph.terms.contents = "http://www.w3.org/1999/xhtml/vocab#contents", this.target.graph.terms.copyright = "http://www.w3.org/1999/xhtml/vocab#copyright", this.target.graph.terms.first = "http://www.w3.org/1999/xhtml/vocab#first", this.target.graph.terms.glossary = "http://www.w3.org/1999/xhtml/vocab#glossary", this.target.graph.terms.help = "http://www.w3.org/1999/xhtml/vocab#help", this.target.graph.terms.icon = "http://www.w3.org/1999/xhtml/vocab#icon", this.target.graph.terms.index = "http://www.w3.org/1999/xhtml/vocab#index", this.target.graph.terms.last = "http://www.w3.org/1999/xhtml/vocab#last", this.target.graph.terms.license = "http://www.w3.org/1999/xhtml/vocab#license", this.target.graph.terms.meta = "http://www.w3.org/1999/xhtml/vocab#meta", this.target.graph.terms.next = "http://www.w3.org/1999/xhtml/vocab#next", this.target.graph.terms.prev = "http://www.w3.org/1999/xhtml/vocab#prev", this.target.graph.terms.previous = "http://www.w3.org/1999/xhtml/vocab#previous", this.target.graph.terms.section = "http://www.w3.org/1999/xhtml/vocab#section", this.target.graph.terms.stylesheet = "http://www.w3.org/1999/xhtml/vocab#stylesheet", this.target.graph.terms.subsection = "http://www.w3.org/1999/xhtml/vocab#subsection", this.target.graph.terms.start = "http://www.w3.org/1999/xhtml/vocab#start", this.target.graph.terms.top = "http://www.w3.org/1999/xhtml/vocab#top", this.target.graph.terms.up = "http://www.w3.org/1999/xhtml/vocab#up", this.target.graph.terms.p3pv1 = "http://www.w3.org/1999/xhtml/vocab#p3pv1", this.target.graph.terms.related = "http://www.w3.org/1999/xhtml/vocab#related", this.target.graph.terms.role = "http://www.w3.org/1999/xhtml/vocab#role", this.target.graph.terms.transformation = "http://www.w3.org/1999/xhtml/vocab#transformation";
  }
  setXMLContext() {
    this.setInitialContext(), this.inXHTMLMode = !1, this.inHTMLMode = !1;
  }
  tokenize(e) {
    return this.trim(e).split(/\s+/);
  }
  static tokenize(e) {
    return this.trim(e).split(/\s+/);
  }
  toRDFNodeObject(e) {
    if (!(typeof e > "u")) {
      if (typeof e == "string")
        return e.substring(0, 2) === "_:" ? (typeof this.blankNodes[e.substring(2)] > "u" && (this.blankNodes[e.substring(2)] = new nn(e.substring(2))), this.blankNodes[e.substring(2)]) : Pt.namedNode(e);
      switch (e.type) {
        case ve.objectURI:
          return e.value.substring(0, 2) === "_:" ? (typeof this.blankNodes[e.value.substring(2)] > "u" && (this.blankNodes[e.value.substring(2)] = new nn(e.value.substring(2))), this.blankNodes[e.value.substring(2)]) : Pt.namedNode(e.value);
        case ve.PlainLiteralURI:
          return new en(e.value, e.language || "");
        case ve.XMLLiteralURI:
        case ve.HTMLLiteralURI:
          var t = "";
          return Object.keys(e.value).forEach((r) => {
            t += ed(e.value[r], this.htmlOptions);
          }), new en(t, "", new pt(e.type));
        default:
          return new en(e.value, "", new pt(e.type));
      }
    }
  }
  trim(e) {
    return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  static trim(e) {
    return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
}
ve.XMLLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral";
ve.HTMLLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML";
ve.PlainLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral";
ve.objectURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#object";
ve.typeURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
ve.nameChar = "[-A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�က0-F.0-9·̀-ͯ‿-⁀]";
ve.nameStartChar = "[A-Za-zÀ-ÖØ-öø-ÿĀ-ıĴ-ľŁ-ňŊ-žƀ-ǃǍ-ǰǴ-ǵǺ-ȗɐ-ʨʻ-ˁΆΈ-ΊΌΎ-ΡΣ-ώϐ-ϖϚϜϞϠϢ-ϳЁ-ЌЎ-яё-ќў-ҁҐ-ӄӇ-ӈӋ-ӌӐ-ӫӮ-ӵӸ-ӹԱ-Ֆՙա-ֆא-תװ-ײء-غف-يٱ-ڷں-ھۀ-ێې-ۓەۥ-ۦअ-हऽक़-ॡঅ-ঌএ-ঐও-নপ-রলশ-হড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઋઍએ-ઑઓ-નપ-રલ-ળવ-હઽૠଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଶ-ହଽଡ଼-ଢ଼ୟ-ୡஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-வஷ-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹೞೠ-ೡഅ-ഌഎ-ഐഒ-നപ-ഹൠ-ൡก-ฮะา-ำเ-ๅກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ຮະາ-ຳຽເ-ໄཀ-ཇཉ-ཀྵႠ-Ⴥა-ჶᄀᄂ-ᄃᄅ-ᄇᄉᄋ-ᄌᄎ-ᄒᄼᄾᅀᅌᅎᅐᅔ-ᅕᅙᅟ-ᅡᅣᅥᅧᅩᅭ-ᅮᅲ-ᅳᅵᆞᆨᆫᆮ-ᆯᆷ-ᆸᆺᆼ-ᇂᇫᇰᇹḀ-ẛẠ-ỹἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼΩK-Å℮ↀ-ↂぁ-ゔァ-ヺㄅ-ㄬ가-힣一-龥〇〡-〩_]";
ve.NCNAME = new RegExp("^" + ve.nameStartChar + ve.nameChar + "*$");
ve.dateTimeTypes = [{
  pattern: /-?P(?:[0-9]+Y)?(?:[0-9]+M)?(?:[0-9]+D)?(?:T(?:[0-9]+H)?(?:[0-9]+M)?(?:[0-9]+(?:\.[0-9]+)?S)?)?/,
  type: "http://www.w3.org/2001/XMLSchema#duration"
}, {
  pattern: /-?(?:[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9])-[0-9][0-9]-[0-9][0-9]T(?:[0-1][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9](?:\.[0-9]+)?(?:Z|[+\-][0-9][0-9]:[0-9][0-9])?/,
  type: "http://www.w3.org/2001/XMLSchema#dateTime"
}, {
  pattern: /-?(?:[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9])-[0-9][0-9]-[0-9][0-9](?:Z|[+\-][0-9][0-9]:[0-9][0-9])?/,
  type: "http://www.w3.org/2001/XMLSchema#date"
}, {
  pattern: /(?:[0-1][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9](?:\.[0-9]+)?(?:Z|[+\-][0-9][0-9]:[0-9][0-9])?/,
  type: "http://www.w3.org/2001/XMLSchema#time"
}, {
  pattern: /-?(?:[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9])-[0-9][0-9]/,
  type: "http://www.w3.org/2001/XMLSchema#gYearMonth"
}, {
  pattern: /-?[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9]/,
  type: "http://www.w3.org/2001/XMLSchema#gYear"
}];
const Aa = ve.parseRDFaDOM;
class Se {
  /*
   * @constructor
   * @param {RDFStore} store An RDFStore object
   */
  constructor(e) {
    this.store = e, this.bnodes = {}, this.why = null, this.reify = !1;
  }
  /** Standard namespaces that we know how to handle @final
   *  @member RDFParser
   */
  /**
   * Frame class for namespace and base URI lookups
   * Base lookups will always resolve because the parser knows
   * the default base.
   *
   * @private
   */
  frameFactory(e, t, r) {
    return {
      NODE: 1,
      ARC: 2,
      parent: t,
      parser: e,
      store: e.store,
      element: r,
      lastChild: 0,
      base: null,
      lang: null,
      node: null,
      nodeType: null,
      listIndex: 1,
      rdfid: null,
      datatype: null,
      collection: !1,
      /** Terminate the frame and notify the store that we're done */
      terminateFrame: function() {
        this.collection && this.node.close();
      },
      /** Add a symbol of a certain type to the this frame */
      addSymbol: function(i, s) {
        s = Dt(s, this.base), this.node = this.store.sym(s), this.nodeType = i;
      },
      /** Load any constructed triples into the store */
      loadTriple: function() {
        if (this.parent.parent.collection ? this.parent.parent.node.append(this.node) : this.store.add(this.parent.parent.node, this.parent.node, this.node, this.parser.why), this.parent.rdfid != null) {
          var i = this.store.sym(Dt("#" + this.parent.rdfid, this.base));
          this.store.add(i, this.store.sym(Se.ns.RDF + "type"), this.store.sym(Se.ns.RDF + "Statement"), this.parser.why), this.store.add(i, this.store.sym(Se.ns.RDF + "subject"), this.parent.parent.node, this.parser.why), this.store.add(i, this.store.sym(Se.ns.RDF + "predicate"), this.parent.node, this.parser.why), this.store.add(i, this.store.sym(Se.ns.RDF + "object"), this.node, this.parser.why);
        }
      },
      /** Check if it's OK to load a triple */
      isTripleToLoad: function() {
        return this.parent != null && this.parent.parent != null && this.nodeType === this.NODE && this.parent.nodeType === this.ARC && this.parent.parent.nodeType === this.NODE;
      },
      /** Add a symbolic node to this frame */
      addNode: function(i) {
        this.addSymbol(this.NODE, i), this.isTripleToLoad() && this.loadTriple();
      },
      /** Add a collection node to this frame */
      addCollection: function() {
        this.nodeType = this.NODE, this.node = this.store.collection(), this.collection = !0, this.isTripleToLoad() && this.loadTriple();
      },
      /** Add a collection arc to this frame */
      addCollectionArc: function() {
        this.nodeType = this.ARC;
      },
      /** Add a bnode to this frame */
      addBNode: function(i) {
        i != null ? this.parser.bnodes[i] != null ? this.node = this.parser.bnodes[i] : this.node = this.parser.bnodes[i] = this.store.bnode() : this.node = this.store.bnode(), this.nodeType = this.NODE, this.isTripleToLoad() && this.loadTriple();
      },
      /** Add an arc or property to this frame */
      addArc: function(i) {
        i === Se.ns.RDF + "li" && (i = Se.ns.RDF + "_" + this.parent.listIndex, this.parent.listIndex++), this.addSymbol(this.ARC, i);
      },
      /** Add a literal to this frame */
      addLiteral: function(i) {
        this.parent.datatype && this.parent.datatype !== Se.ns.RDF + "langString" ? this.node = this.store.literal(i, this.store.sym(this.parent.datatype)) : this.node = this.store.literal(i, this.lang), this.nodeType = this.NODE, this.isTripleToLoad() && this.loadTriple();
      }
    };
  }
  // from the OpenLayers source .. needed to get around IE problems.
  getAttributeNodeNS(e, t, r) {
    var i = null;
    if (e.getAttributeNodeNS)
      i = e.getAttributeNodeNS(t, r);
    else
      for (var s = e.attributes, a, l, u = 0; u < s.length; ++u)
        if (a = s[u], a.namespaceURI === t && (l = a.prefix ? a.prefix + ":" + r : r, l === a.nodeName)) {
          i = a;
          break;
        }
    return i;
  }
  /**
   * Build our initial scope frame and parse the DOM into triples
   * @param {HTMLDocument} document The DOM to parse
   * @param {String} base The base URL to use
   * @param {Object} why The context to which this resource belongs
   */
  parse(e, t, r) {
    var i = e.childNodes;
    this.cleanParser();
    var s;
    if (e.nodeType === Se.nodeType.DOCUMENT) {
      for (var a = 0; a < i.length; a++)
        if (i[a].nodeType === Se.nodeType.ELEMENT) {
          s = i[a];
          break;
        }
    } else if (e.nodeType === Se.nodeType.ELEMENT)
      s = e;
    else
      throw new Error("RDFParser: can't find root in " + t + ". Halting. ");
    this.why = r;
    var l = this.frameFactory(this);
    return this.base = t, l.base = t, l.lang = null, this.parseDOM(this.buildFrame(l, s)), !0;
  }
  parseDOM(e) {
    for (var t, r = (function(Y) {
      var A = "";
      if (Y.namespaceURI == null)
        throw new Error("RDF/XML syntax error: No namespace for " + Y.localName + " in " + this.base);
      return Y.namespaceURI && (A = A + Y.namespaceURI), Y.localName ? A = A + Y.localName : Y.nodeName && (Y.nodeName.indexOf(":") >= 0 ? A = A + Y.nodeName.split(":")[1] : A = A + Y.nodeName), A;
    }).bind(this), i = !0; e.parent; ) {
      var s = e.element, a = s.attributes;
      if (s.nodeType === Se.nodeType.TEXT || s.nodeType === Se.nodeType.CDATA_SECTION)
        e.parent.nodeType === e.NODE && (e.addArc(Se.ns.RDF + "value"), e = this.buildFrame(e)), e.addLiteral(s.nodeValue);
      else if (r(s) !== Se.ns.RDF + "RDF")
        if (e.parent && e.parent.collection && (e.addCollectionArc(), e = this.buildFrame(e, e.element), e.parent.element = null), !e.parent || !e.parent.nodeType || e.parent.nodeType === e.ARC) {
          var l = this.getAttributeNodeNS(s, Se.ns.RDF, "about");
          if (t = this.getAttributeNodeNS(s, Se.ns.RDF, "ID"), l && t)
            throw new Error("RDFParser: " + s.nodeName + " has both rdf:id and rdf:about. Halting. Only one of these properties may be specified on a node.");
          if (!l && t)
            e.addNode("#" + t.nodeValue), s.removeAttributeNode(t);
          else if (l == null && t == null) {
            var u = this.getAttributeNodeNS(s, Se.ns.RDF, "nodeID");
            u ? (e.addBNode(u.nodeValue), s.removeAttributeNode(u)) : e.addBNode();
          } else
            e.addNode(l.nodeValue), s.removeAttributeNode(l);
          var c = this.getAttributeNodeNS(s, Se.ns.RDF, "type");
          Se.ns.RDF + "Description" !== r(s) && (c = {
            nodeValue: r(s)
          }), c != null && (this.store.add(e.node, this.store.sym(Se.ns.RDF + "type"), this.store.sym(Dt(c.nodeValue, e.base)), this.why), c.nodeName && s.removeAttributeNode(c));
          for (var h = a.length - 1; h >= 0; h--)
            this.store.add(e.node, this.store.sym(r(a[h])), this.store.literal(a[h].nodeValue, e.lang), this.why);
        } else {
          e.addArc(r(s)), this.reify && (t = this.getAttributeNodeNS(s, Se.ns.RDF, "ID"), t && (e.rdfid = t.nodeValue, s.removeAttributeNode(t)));
          var f = this.getAttributeNodeNS(s, Se.ns.RDF, "parseType"), m = this.getAttributeNodeNS(s, Se.ns.RDF, "datatype");
          if (m && (e.datatype = m.nodeValue, s.removeAttributeNode(m)), f) {
            var v = f.nodeValue;
            v === "Literal" ? (e.datatype = Se.ns.RDF + "XMLLiteral", e = this.buildFrame(e), e.addLiteral(s.innerHTML || s.childNodes), i = !1) : v === "Resource" ? (e = this.buildFrame(e, e.element), e.parent.element = null, e.addBNode()) : v === "Collection" && (e = this.buildFrame(e, e.element), e.parent.element = null, e.addCollection()), s.removeAttributeNode(f);
          }
          if (a.length !== 0) {
            var w = this.getAttributeNodeNS(s, Se.ns.RDF, "resource"), b = this.getAttributeNodeNS(s, Se.ns.RDF, "nodeID");
            e = this.buildFrame(e), w ? (e.addNode(w.nodeValue), s.removeAttributeNode(w)) : b ? (e.addBNode(b.nodeValue), s.removeAttributeNode(b)) : e.addBNode();
            for (var x = a.length - 1; x >= 0; x--) {
              var _ = this.buildFrame(e);
              _.addArc(r(a[x])), r(a[x]) === Se.ns.RDF + "type" ? this.buildFrame(_).addNode(a[x].nodeValue) : this.buildFrame(_).addLiteral(a[x].nodeValue);
            }
          } else s.childNodes.length === 0 && this.buildFrame(e).addLiteral("");
        }
      for (s = e.element; e.parent; ) {
        for (var R = e; s == null; )
          e = e.parent, s = e.element;
        var G = s.childNodes && s.childNodes[e.lastChild];
        if (!G || !i) {
          if (e.terminateFrame(), !(e = e.parent))
            break;
          s = e.element, i = !0;
        } else if (G.nodeType !== Se.nodeType.ELEMENT && G.nodeType !== Se.nodeType.TEXT && G.nodeType !== Se.nodeType.CDATA_SECTION || (G.nodeType === Se.nodeType.TEXT || G.nodeType === Se.nodeType.CDATA_SECTION) && s.childNodes.length !== 1)
          e.lastChild++;
        else {
          e.lastChild++, e = this.buildFrame(R, s.childNodes[e.lastChild - 1]);
          break;
        }
      }
    }
  }
  /**
   * Cleans out state from a previous parse run
   * @private
   */
  cleanParser() {
    this.bnodes = {}, this.why = null;
  }
  /**
   * Builds scope frame
   * @private
   */
  buildFrame(e, t) {
    var r = this.frameFactory(this, e, t);
    if (e && (r.base = e.base, r.lang = e.lang), !t || t.nodeType === Se.nodeType.TEXT || t.nodeType === Se.nodeType.CDATA_SECTION)
      return r;
    var i = t.attributes, s = t.getAttributeNode("xml:base");
    s != null && (r.base = s.nodeValue, t.removeAttribute("xml:base"));
    var a = t.getAttributeNode("xml:lang");
    a != null && (r.lang = a.nodeValue, t.removeAttribute("xml:lang"));
    for (var l = i.length - 1; l >= 0; l--)
      if (i[l].nodeName.substr(0, 3) === "xml") {
        if (i[l].name.slice(0, 6) === "xmlns:") {
          var u = i[l].nodeValue;
          this.base && (u = Dt(u, this.base)), this.store.setPrefixForURI(i[l].name.slice(6), u);
        }
        t.removeAttributeNode(i[l]);
      }
    return r;
  }
}
re(Se, "ns", {
  RDF: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  RDFS: "http://www.w3.org/2000/01/rdf-schema#"
});
re(Se, "nodeType", {
  ELEMENT: 1,
  ATTRIBUTE: 2,
  TEXT: 3,
  CDATA_SECTION: 4,
  ENTITY_REFERENCE: 5,
  ENTITY: 6,
  PROCESSING_INSTRUCTION: 7,
  COMMENT: 8,
  DOCUMENT: 9,
  DOCUMENT_TYPE: 10,
  DOCUMENT_FRAGMENT: 11,
  NOTATION: 12
});
function Wd(n, e, t) {
  var r, i, s, a = ["INSERT", "DELETE", "WHERE"], l = Ne("http://www.w3.org/ns/pim/patch#"), u = Si(e, e, t, t, null, null, "", null), c = {}, h = function(b, x, _, R, G) {
    return "Line " + (x + 1) + " of <" + b + `>: Bad syntax:
   ` + G + `
   at: "` + _.slice(R, R + 30) + '"';
  };
  r = 0;
  var f = e.sym(t + "#query");
  for (c.query = f; ; ) {
    if (i = u.skipSpace(n, r), i < 0)
      return c;
    if (n[i] === ";") {
      if (r = u.skipSpace(n, i + 1), r < 0)
        return c;
      i = r;
    }
    var m = !1;
    for (s = 0; s < a.length; s++) {
      var v = a[s];
      if (n.slice(i, i + v.length) === v) {
        if (r = u.skipSpace(n, i + v.length), r < 0)
          throw h(u._thisDoc, u.lines, n, i + v.length, "found EOF, needed {...} after " + v);
        if ((v === "INSERT" || v === "DELETE") && n.slice(r, r + 4) === "DATA") {
          if (i = u.skipSpace(n, r + 4), i < 0)
            throw h(u._thisDoc, u.lines, n, r + 4, "needed {...} after INSERT DATA " + v);
          r = i;
        }
        var w = [];
        if (i = u.node(n, r, w), i < 0)
          throw h(u._thisDoc, u.lines, n, r, "bad syntax or EOF in {...} after " + v);
        c[v.toLowerCase()] = w[0], e.add(f, l(v.toLowerCase()), w[0]), m = !0, r = i;
      }
    }
    if (!m && n.slice(i, i + 7) === "@prefix") {
      if (r = u.directive(n, i), r < 0)
        throw h(u._thisDoc, u.lines, n, r, "bad syntax or EOF after @prefix ");
      r = u.checkDot(n, r), m = !0;
    }
    if (!m)
      throw h(u._thisDoc, u.lines, n, i, "Unknown syntax at start of statememt: '" + n.slice(i).slice(0, 20) + "'");
  }
}
function xa(n, e, t, r = "text/turtle", i) {
  r = r || Hn, r = r.split(";")[0];
  try {
    if (r === _l || r === Hn) {
      var s = Si(e, e, t, t, null, null, "", null);
      s.loadBuf(n), u();
    } else if (r === Rr) {
      var a = new Se(e);
      a.parse(sr(n), t, e.sym(t)), u();
    } else if (r === hi)
      Aa(sr(n, {
        contentType: hi
      }), e, t), u();
    else if (r === Ts)
      Aa(sr(n, {
        contentType: Ts
      }), e, t), u();
    else if (r === Ic || r === Lc)
      Wd(n, e, t), u();
    else if (r === ui)
      ql(n, e, t).then(u).catch(c);
    else if (r === di || r === ci) {
      var l = new Jl({
        factory: pi
      });
      h(null, n);
    } else throw r === void 0 ? new Error("contentType is undefined") : new Error("Don't know how to parse " + r + " yet");
  } catch (m) {
    c(m);
  }
  xa.handled = {
    "text/n3": !0,
    "text/turtle": !0,
    "application/rdf+xml": !0,
    "application/xhtml+xml": !0,
    "text/html": !0,
    "application/sparql-update": !0,
    "application/sparql-update-single-match": !0,
    "application/ld+json": !0,
    "application/nquads": !0,
    "application/n-quads": !0
  };
  function u() {
    if (i)
      i(null, e);
    else
      return;
  }
  function c(m) {
    if (
      // TODO: Always true, what is the right behavior
      r !== ui || // @ts-ignore always true?
      r !== di || // @ts-ignore always true?
      r !== ci
    )
      if (i)
        i(m, e);
      else {
        let v = new Error("" + m + " while trying to parse <" + t + "> as " + r);
        throw v.cause = m, v;
      }
  }
  function h(m, v) {
    try {
      l.parse(v, f);
    } catch (w) {
      i(w, e);
    }
  }
  function f(m, v) {
    v ? e.add(v.subject, v.predicate, v.object, v.graph) : i(m, e);
  }
}
var ha = { exports: {} }, Ys;
function Vd() {
  return Ys || (Ys = 1, (function(n, e) {
    var t = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof ra < "u" && ra, r = (function() {
      function s() {
        this.fetch = !1, this.DOMException = t.DOMException;
      }
      return s.prototype = t, new s();
    })();
    (function(s) {
      (function(a) {
        var l = typeof s < "u" && s || typeof self < "u" && self || // eslint-disable-next-line no-undef
        typeof ra < "u" && ra || {}, u = {
          searchParams: "URLSearchParams" in l,
          iterable: "Symbol" in l && "iterator" in Symbol,
          blob: "FileReader" in l && "Blob" in l && (function() {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          })(),
          formData: "FormData" in l,
          arrayBuffer: "ArrayBuffer" in l
        };
        function c(S) {
          return S && DataView.prototype.isPrototypeOf(S);
        }
        if (u.arrayBuffer)
          var h = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ], f = ArrayBuffer.isView || function(S) {
            return S && h.indexOf(Object.prototype.toString.call(S)) > -1;
          };
        function m(S) {
          if (typeof S != "string" && (S = String(S)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(S) || S === "")
            throw new TypeError('Invalid character in header field name: "' + S + '"');
          return S.toLowerCase();
        }
        function v(S) {
          return typeof S != "string" && (S = String(S)), S;
        }
        function w(S) {
          var V = {
            next: function() {
              var Z = S.shift();
              return { done: Z === void 0, value: Z };
            }
          };
          return u.iterable && (V[Symbol.iterator] = function() {
            return V;
          }), V;
        }
        function b(S) {
          this.map = {}, S instanceof b ? S.forEach(function(V, Z) {
            this.append(Z, V);
          }, this) : Array.isArray(S) ? S.forEach(function(V) {
            if (V.length != 2)
              throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + V.length);
            this.append(V[0], V[1]);
          }, this) : S && Object.getOwnPropertyNames(S).forEach(function(V) {
            this.append(V, S[V]);
          }, this);
        }
        b.prototype.append = function(S, V) {
          S = m(S), V = v(V);
          var Z = this.map[S];
          this.map[S] = Z ? Z + ", " + V : V;
        }, b.prototype.delete = function(S) {
          delete this.map[m(S)];
        }, b.prototype.get = function(S) {
          return S = m(S), this.has(S) ? this.map[S] : null;
        }, b.prototype.has = function(S) {
          return this.map.hasOwnProperty(m(S));
        }, b.prototype.set = function(S, V) {
          this.map[m(S)] = v(V);
        }, b.prototype.forEach = function(S, V) {
          for (var Z in this.map)
            this.map.hasOwnProperty(Z) && S.call(V, this.map[Z], Z, this);
        }, b.prototype.keys = function() {
          var S = [];
          return this.forEach(function(V, Z) {
            S.push(Z);
          }), w(S);
        }, b.prototype.values = function() {
          var S = [];
          return this.forEach(function(V) {
            S.push(V);
          }), w(S);
        }, b.prototype.entries = function() {
          var S = [];
          return this.forEach(function(V, Z) {
            S.push([Z, V]);
          }), w(S);
        }, u.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);
        function x(S) {
          if (!S._noBody) {
            if (S.bodyUsed)
              return Promise.reject(new TypeError("Already read"));
            S.bodyUsed = !0;
          }
        }
        function _(S) {
          return new Promise(function(V, Z) {
            S.onload = function() {
              V(S.result);
            }, S.onerror = function() {
              Z(S.error);
            };
          });
        }
        function R(S) {
          var V = new FileReader(), Z = _(V);
          return V.readAsArrayBuffer(S), Z;
        }
        function G(S) {
          var V = new FileReader(), Z = _(V), ae = /charset=([A-Za-z0-9_-]+)/.exec(S.type), ie = ae ? ae[1] : "utf-8";
          return V.readAsText(S, ie), Z;
        }
        function Y(S) {
          for (var V = new Uint8Array(S), Z = new Array(V.length), ae = 0; ae < V.length; ae++)
            Z[ae] = String.fromCharCode(V[ae]);
          return Z.join("");
        }
        function A(S) {
          if (S.slice)
            return S.slice(0);
          var V = new Uint8Array(S.byteLength);
          return V.set(new Uint8Array(S)), V.buffer;
        }
        function K() {
          return this.bodyUsed = !1, this._initBody = function(S) {
            this.bodyUsed = this.bodyUsed, this._bodyInit = S, S ? typeof S == "string" ? this._bodyText = S : u.blob && Blob.prototype.isPrototypeOf(S) ? this._bodyBlob = S : u.formData && FormData.prototype.isPrototypeOf(S) ? this._bodyFormData = S : u.searchParams && URLSearchParams.prototype.isPrototypeOf(S) ? this._bodyText = S.toString() : u.arrayBuffer && u.blob && c(S) ? (this._bodyArrayBuffer = A(S.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(S) || f(S)) ? this._bodyArrayBuffer = A(S) : this._bodyText = S = Object.prototype.toString.call(S) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof S == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(S) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, u.blob && (this.blob = function() {
            var S = x(this);
            if (S)
              return S;
            if (this._bodyBlob)
              return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }), this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var S = x(this);
              return S || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              ) : Promise.resolve(this._bodyArrayBuffer));
            } else {
              if (u.blob)
                return this.blob().then(R);
              throw new Error("could not read as ArrayBuffer");
            }
          }, this.text = function() {
            var S = x(this);
            if (S)
              return S;
            if (this._bodyBlob)
              return G(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(Y(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }, u.formData && (this.formData = function() {
            return this.text().then(H);
          }), this.json = function() {
            return this.text().then(JSON.parse);
          }, this;
        }
        var M = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
        function j(S) {
          var V = S.toUpperCase();
          return M.indexOf(V) > -1 ? V : S;
        }
        function k(S, V) {
          if (!(this instanceof k))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          V = V || {};
          var Z = V.body;
          if (S instanceof k) {
            if (S.bodyUsed)
              throw new TypeError("Already read");
            this.url = S.url, this.credentials = S.credentials, V.headers || (this.headers = new b(S.headers)), this.method = S.method, this.mode = S.mode, this.signal = S.signal, !Z && S._bodyInit != null && (Z = S._bodyInit, S.bodyUsed = !0);
          } else
            this.url = String(S);
          if (this.credentials = V.credentials || this.credentials || "same-origin", (V.headers || !this.headers) && (this.headers = new b(V.headers)), this.method = j(V.method || this.method || "GET"), this.mode = V.mode || this.mode || null, this.signal = V.signal || this.signal || (function() {
            if ("AbortController" in l) {
              var oe = new AbortController();
              return oe.signal;
            }
          })(), this.referrer = null, (this.method === "GET" || this.method === "HEAD") && Z)
            throw new TypeError("Body not allowed for GET or HEAD requests");
          if (this._initBody(Z), (this.method === "GET" || this.method === "HEAD") && (V.cache === "no-store" || V.cache === "no-cache")) {
            var ae = /([?&])_=[^&]*/;
            if (ae.test(this.url))
              this.url = this.url.replace(ae, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            else {
              var ie = /\?/;
              this.url += (ie.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
        k.prototype.clone = function() {
          return new k(this, { body: this._bodyInit });
        };
        function H(S) {
          var V = new FormData();
          return S.trim().split("&").forEach(function(Z) {
            if (Z) {
              var ae = Z.split("="), ie = ae.shift().replace(/\+/g, " "), oe = ae.join("=").replace(/\+/g, " ");
              V.append(decodeURIComponent(ie), decodeURIComponent(oe));
            }
          }), V;
        }
        function $(S) {
          var V = new b(), Z = S.replace(/\r?\n[\t ]+/g, " ");
          return Z.split("\r").map(function(ae) {
            return ae.indexOf(`
`) === 0 ? ae.substr(1, ae.length) : ae;
          }).forEach(function(ae) {
            var ie = ae.split(":"), oe = ie.shift().trim();
            if (oe) {
              var ne = ie.join(":").trim();
              try {
                V.append(oe, ne);
              } catch (ge) {
                console.warn("Response " + ge.message);
              }
            }
          }), V;
        }
        K.call(k.prototype);
        function q(S, V) {
          if (!(this instanceof q))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          if (V || (V = {}), this.type = "default", this.status = V.status === void 0 ? 200 : V.status, this.status < 200 || this.status > 599)
            throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
          this.ok = this.status >= 200 && this.status < 300, this.statusText = V.statusText === void 0 ? "" : "" + V.statusText, this.headers = new b(V.headers), this.url = V.url || "", this._initBody(S);
        }
        K.call(q.prototype), q.prototype.clone = function() {
          return new q(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new b(this.headers),
            url: this.url
          });
        }, q.error = function() {
          var S = new q(null, { status: 200, statusText: "" });
          return S.ok = !1, S.status = 0, S.type = "error", S;
        };
        var ee = [301, 302, 303, 307, 308];
        q.redirect = function(S, V) {
          if (ee.indexOf(V) === -1)
            throw new RangeError("Invalid status code");
          return new q(null, { status: V, headers: { location: S } });
        }, a.DOMException = l.DOMException;
        try {
          new a.DOMException();
        } catch {
          a.DOMException = function(V, Z) {
            this.message = V, this.name = Z;
            var ae = Error(V);
            this.stack = ae.stack;
          }, a.DOMException.prototype = Object.create(Error.prototype), a.DOMException.prototype.constructor = a.DOMException;
        }
        function Q(S, V) {
          return new Promise(function(Z, ae) {
            var ie = new k(S, V);
            if (ie.signal && ie.signal.aborted)
              return ae(new a.DOMException("Aborted", "AbortError"));
            var oe = new XMLHttpRequest();
            function ne() {
              oe.abort();
            }
            oe.onload = function() {
              var pe = {
                statusText: oe.statusText,
                headers: $(oe.getAllResponseHeaders() || "")
              };
              ie.url.indexOf("file://") === 0 && (oe.status < 200 || oe.status > 599) ? pe.status = 200 : pe.status = oe.status, pe.url = "responseURL" in oe ? oe.responseURL : pe.headers.get("X-Request-URL");
              var Ce = "response" in oe ? oe.response : oe.responseText;
              setTimeout(function() {
                Z(new q(Ce, pe));
              }, 0);
            }, oe.onerror = function() {
              setTimeout(function() {
                ae(new TypeError("Network request failed"));
              }, 0);
            }, oe.ontimeout = function() {
              setTimeout(function() {
                ae(new TypeError("Network request timed out"));
              }, 0);
            }, oe.onabort = function() {
              setTimeout(function() {
                ae(new a.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function ge(pe) {
              try {
                return pe === "" && l.location.href ? l.location.href : pe;
              } catch {
                return pe;
              }
            }
            if (oe.open(ie.method, ge(ie.url), !0), ie.credentials === "include" ? oe.withCredentials = !0 : ie.credentials === "omit" && (oe.withCredentials = !1), "responseType" in oe && (u.blob ? oe.responseType = "blob" : u.arrayBuffer && (oe.responseType = "arraybuffer")), V && typeof V.headers == "object" && !(V.headers instanceof b || l.Headers && V.headers instanceof l.Headers)) {
              var Be = [];
              Object.getOwnPropertyNames(V.headers).forEach(function(pe) {
                Be.push(m(pe)), oe.setRequestHeader(pe, v(V.headers[pe]));
              }), ie.headers.forEach(function(pe, Ce) {
                Be.indexOf(Ce) === -1 && oe.setRequestHeader(Ce, pe);
              });
            } else
              ie.headers.forEach(function(pe, Ce) {
                oe.setRequestHeader(Ce, pe);
              });
            ie.signal && (ie.signal.addEventListener("abort", ne), oe.onreadystatechange = function() {
              oe.readyState === 4 && ie.signal.removeEventListener("abort", ne);
            }), oe.send(typeof ie._bodyInit > "u" ? null : ie._bodyInit);
          });
        }
        return Q.polyfill = !0, l.fetch || (l.fetch = Q, l.Headers = b, l.Request = k, l.Response = q), a.Headers = b, a.Request = k, a.Response = q, a.fetch = Q, a;
      })({});
    })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
    var i = t.fetch ? t : r;
    e = i.fetch, e.default = i.fetch, e.fetch = i.fetch, e.Headers = i.Headers, e.Request = i.Request, e.Response = i.Response, n.exports = e;
  })(ha, ha.exports)), ha.exports;
}
var gi = Vd();
const Kd = /* @__PURE__ */ Bl(gi), Gd = {
  "text/n3": !0,
  "text/turtle": !0,
  "application/rdf+xml": !0,
  "application/xhtml+xml": !0,
  "text/html": !0,
  "application/ld+json": !0
}, Ql = {
  rdf: Rr,
  owl: Rr,
  n3: "text/n3",
  ttl: "text/turtle",
  nt: "text/n3",
  acl: "text/n3",
  html: "text/html",
  xml: "text/xml"
}, Zl = (n) => ({
  link: Ne("http://www.w3.org/2007/ont/link#", n),
  http: Ne("http://www.w3.org/2007/ont/http#", n),
  httph: Ne("http://www.w3.org/2007/ont/httph#", n),
  // headers
  rdf: Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#", n),
  rdfs: Ne("http://www.w3.org/2000/01/rdf-schema#", n),
  dc: Ne("http://purl.org/dc/elements/1.1/", n),
  ldp: Ne("http://www.w3.org/ns/ldp#", n)
}), Rt = Zl();
class Dn {
  constructor(e, t) {
    re(this, "response", void 0), re(this, "dom", void 0), this.response = e, this.dom = t;
  }
}
re(Dn, "pattern", void 0);
class Li extends Dn {
  static toString() {
    return "RDFXMLHandler";
  }
  static register(e) {
    e.mediatypes[Rr] = {
      q: 0.9
    };
  }
  parse(e, t, r) {
    let i = e.store;
    this.dom || (this.dom = sr(t));
    let s = this.dom.documentElement;
    if (s && s.nodeName === "parsererror")
      return e.failFetch(r, "Badly formed XML in " + r.resource.value, "parse_error");
    let a = new Se(i);
    try {
      a.parse(this.dom, r.original.value, r.original);
    } catch (l) {
      return e.failFetch(r, "Syntax error parsing RDF/XML! " + l, "parse_error");
    }
    return r.noMeta || i.add(r.original, Rt.rdf("type"), Rt.link("RDFDocument"), e.appNode), e.doneFetch(r, this.response);
  }
}
Li.pattern = new RegExp("application/rdf\\+xml");
class Wn extends Dn {
  static toString() {
    return "XHTMLHandler";
  }
  static register(e) {
    e.mediatypes[hi] = {
      q: 0.8
    };
  }
  parse(e, t, r) {
    let i, s;
    this.dom || (this.dom = sr(t));
    let a = e.store, l = this.dom.getElementsByTagName("title");
    l.length > 0 && a.add(r.resource, Rt.dc("title"), a.rdfFactory.literal(l[0].textContent), r.resource);
    let u = this.dom.getElementsByTagName("link");
    for (let h = u.length - 1; h >= 0; h--)
      i = u[h].getAttribute("rel"), s = !1, i || (i = u[h].getAttribute("rev"), s = !0), i && e.linkData(r.original, i, u[h].getAttribute("href"), r.resource, s);
    let c = this.dom.getElementsByTagName("script");
    for (let h = 0; h < c.length; h++) {
      let f = c[h].getAttribute("type");
      Gd[f] && (xa(c[h].textContent, a, r.original.value, f), xa(c[h].textContent, a, r.original.value, f));
    }
    if (r.noMeta || a.add(r.resource, Rt.rdf("type"), Rt.link("WebPage"), e.appNode), !r.noRDFa && Aa)
      try {
        Aa(this.dom, a, r.original.value);
      } catch (h) {
        let f = "Error trying to parse " + r.resource + ` as RDFa:
` + h + `:
` + h.stack;
        return e.failFetch(r, f, "parse_error");
      }
    return e.doneFetch(r, this.response);
  }
}
Wn.pattern = new RegExp("application/xhtml");
class cr extends Dn {
  static toString() {
    return "XMLHandler";
  }
  static register(e) {
    e.mediatypes["text/xml"] = {
      q: 0.5
    }, e.mediatypes["application/xml"] = {
      q: 0.5
    };
  }
  static isElement(e) {
    return e.nodeType === Node.ELEMENT_NODE;
  }
  parse(e, t, r) {
    let i = sr(t);
    for (let a = 0; a < i.childNodes.length; a++) {
      const l = i.childNodes[a];
      if (cr.isElement(l)) {
        let u = l.namespaceURI;
        if (u && u === u.rdf)
          return e.addStatus(r.req, "Has XML root element in the RDF namespace, so assume RDF/XML."), new Li(this.response, i).parse(e, t, r);
        break;
      }
    }
    if (i.doctype && i.doctype.name === "html" && i.doctype.publicId.match(/^-\/\/W3C\/\/DTD XHTML/) && i.doctype.systemId.match(/http:\/\/www.w3.org\/TR\/xhtml/))
      return e.addStatus(r.req, `Has XHTML DOCTYPE. Switching to XHTML Handler.
`), new Wn(this.response, i).parse(e, t, r);
    let s = i.getElementsByTagName("html")[0];
    if (s) {
      let a = s.getAttribute("xmlns");
      if (a && a.match(/^http:\/\/www.w3.org\/1999\/xhtml/))
        return e.addStatus(r.req, `Has a default namespace for XHTML. Switching to XHTMLHandler.
`), new Wn(this.response, i).parse(e, t, r);
    }
    return e.failFetch(r, `Unsupported dialect of XML: not RDF or XHTML namespace, etc.
` + t.slice(0, 80), 901);
  }
}
cr.pattern = new RegExp("(text|application)/(.*)xml");
class eo extends Dn {
  static toString() {
    return "HTMLHandler";
  }
  static register(e) {
    e.mediatypes["text/html"] = {
      q: 0.8
    };
  }
  parse(e, t, r) {
    let i = e.store;
    if (ao(t))
      return e.addStatus(r.req, `Has an XML declaration. We'll assume it's XHTML as the content-type was text/html.
`), new Wn(this.response).parse(e, t, r);
    if (jd(t))
      return e.addStatus(r.req, `Has XHTML DOCTYPE. Switching to XHTMLHandler.
`), new Wn(this.response).parse(e, t, r);
    if (Xd(t))
      return e.addStatus(r.req, `Has default namespace for XHTML, so switching to XHTMLHandler.
`), new Wn(this.response).parse(e, t, r);
    let s = new RegExp("<title>([\\s\\S]+?)</title>", "im").exec(t);
    return s && i.add(r.resource, Rt.dc("title"), i.rdfFactory.literal(s[1]), r.resource), i.add(r.resource, Rt.rdf("type"), Rt.link("WebPage"), e.appNode), e.addStatus(r.req, "non-XML HTML document, not parsed for data."), e.doneFetch(r, this.response);
  }
}
eo.pattern = new RegExp("text/html");
class to extends Dn {
  static toString() {
    return "JsonLdHandler";
  }
  static register(e) {
    e.mediatypes["application/ld+json"] = {
      q: 0.9
    };
  }
  async parse(e, t, r, i) {
    const s = e.store;
    try {
      return await ql(t, s, r.original.value), e.store.add(r.original, Rt.rdf("type"), Rt.link("RDFDocument"), e.appNode), e.doneFetch(r, i);
    } catch (a) {
      const l = "Error trying to parse " + r.resource + ` as JSON-LD:
` + a;
      return e.failFetch(r, l, "parse_error", i);
    }
  }
}
to.pattern = /application\/(ld\+json|activity\+json)/;
class no extends Dn {
  static toString() {
    return "TextHandler";
  }
  static register(e) {
    e.mediatypes["text/plain"] = {
      q: 0.5
    };
  }
  parse(e, t, r) {
    return ao(t) ? (e.addStatus(r.req, "Warning: " + r.resource + ` has an XML declaration. We'll assume it's XML but its content-type wasn't XML.
`), new cr(this.response).parse(e, t, r)) : t.slice(0, 500).match(/xmlns:/) ? (e.addStatus(r.req, `May have an XML namespace. We'll assume it's XML but its content-type wasn't XML.
`), new cr(this.response).parse(e, t, r)) : (e.addStatus(r.req, "Plain text document, no known RDF semantics."), e.doneFetch(r, this.response));
  }
}
no.pattern = new RegExp("text/plain");
class ro extends Dn {
  static toString() {
    return "N3Handler";
  }
  static register(e) {
    e.mediatypes["text/n3"] = {}, e.mediatypes["text/turtle"] = {};
  }
  parse(e, t, r, i) {
    let s = e.store, a = Si(s, s, r.original.value, r.original.value, null, null, "", null);
    try {
      a.loadBuf(t);
    } catch (l) {
      let u = "Error trying to parse " + r.resource + ` as Notation3:
` + l;
      return e.failFetch(r, u, "parse_error", i);
    }
    return e.addStatus(r.req, "N3 parsed: " + a.statementCount + " triples in " + a.lines + " lines."), e.store.add(r.original, Rt.rdf("type"), Rt.link("RDFDocument"), e.appNode), e.doneFetch(r, this.response);
  }
}
ro.pattern = new RegExp("(application|text)/(x-)?(rdf\\+)?(n3|turtle)");
const yi = {
  RDFXMLHandler: Li,
  XHTMLHandler: Wn,
  XMLHandler: cr,
  HTMLHandler: eo,
  TextHandler: no,
  N3Handler: ro,
  JsonLdHandler: to
};
function jd(n) {
  const e = n.indexOf("<!DOCTYPE html"), t = n.indexOf(">");
  return e === -1 || t === -1 || e > t ? !1 : n.substr(e, t - e).indexOf("XHTML") !== -1;
}
function ao(n) {
  return !!n.match(/\s*<\?xml\s+version\s*=[^<>]+\?>/);
}
function Xd(n) {
  return !!n.match(/[^(<html)]*<html\s+[^<]*xmlns=['"]http:\/\/www.w3.org\/1999\/xhtml["'][^<]*>/);
}
class rt {
  constructor(e, t = {}) {
    re(this, "store", void 0), re(this, "timeout", void 0), re(this, "_fetch", void 0), re(this, "mediatypes", void 0), re(this, "appNode", void 0), re(this, "requested", void 0), re(this, "timeouts", void 0), re(this, "redirectedTo", void 0), re(this, "fetchQueue", void 0), re(this, "fetchCallbacks", void 0), re(this, "nonexistent", void 0), re(this, "lookedUp", void 0), re(this, "handlers", void 0), re(this, "ns", void 0), re(this, "fireCallbacks", void 0), this.store = e || new yn(), this.ns = Zl(this.store.rdfFactory), this.timeout = t.timeout || 3e4;
    let r = t.fetch || typeof global < "u" && (global.solidFetcher || global.solidFetch) || typeof window < "u" && (window.solidFetcher || window.solidFetch) || Kd;
    if (!r)
      throw new Error("No _fetch function available for Fetcher");
    typeof window < "u" && r === window.fetch ? this._fetch = r.bind(window) : typeof global < "u" && r === global.fetch ? this._fetch = r.bind(global) : this._fetch = r, this.appNode = this.store.sym("chrome://TheCurrentSession"), this.store.fetcher = this, this.requested = {}, this.timeouts = {}, this.redirectedTo = {}, this.fetchQueue = {}, this.fetchCallbacks = {}, this.nonexistent = {}, this.lookedUp = {}, this.handlers = [], this.mediatypes = {
      "image/*": {
        q: 0.9
      },
      "*/*": {
        q: 0.1
      }
      // Must allow access to random content
    }, Zc(this, ["request", "fail", "refresh", "retract", "done"]), Object.keys(t.handlers || yi).map((i) => this.addHandler(yi[i]));
  }
  static crossSiteProxy(e) {
    if (rt.crossSiteProxyTemplate)
      return rt.crossSiteProxyTemplate.replace("{uri}", encodeURIComponent(e));
  }
  static offlineOverride(e) {
    let t = e;
    var r;
    return typeof window < "u" && window.panes && (r = window.panes.UI) && r.preferences && r.preferences.get("offlineModeUsingLocalhost") && t.slice(0, 7) === "http://" && t.slice(7, 17) !== "localhost/" && (t = "http://localhost/" + t.slice(7)), t;
  }
  static proxyIfNecessary(e) {
    var t;
    if (typeof window < "u" && window.panes && (t = window.panes.UI) && t.isExtension)
      return e;
    if (typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.localSiteMap) {
      let r = e.split("/").slice(2);
      const i = (a, l) => {
        let u = l[a.shift()];
        return u ? typeof u == "string" ? u + a.join("/") : a ? i(a, u) : null : null;
      }, s = i(r, $SolidTestEnvironment.localSiteMap);
      if (s)
        return s;
    }
    return rt.crossSiteProxyTemplate && typeof document < "u" && document.location && ("" + document.location).slice(0, 6) === "https:" && // origin is secure
    e.slice(0, 5) === "http:" ? rt.crossSiteProxyTemplate.replace("{uri}", encodeURIComponent(e)) : e;
  }
  /**
   * Tests whether the uri's protocol is supported by the Fetcher.
   * @param uri
   */
  static unsupportedProtocol(e) {
    let t = Ss(e);
    return t === "tel" || t === "mailto" || t === "urn";
  }
  /** Decide on credentials using old XXHR api or new fetch()  one
   * @param requestedURI
   * @param options
   */
  static setCredentials(e, t = {}) {
    t.credentials === void 0 && (t.withCredentials !== void 0 ? t.credentials = t.withCredentials ? "include" : "omit" : t.credentials = "include");
  }
  /**
   * Promise-based load function
   *
   * Loads a web resource or resources into the store.
   *
   * A resource may be given as NamedNode object, or as a plain URI.
   * an array of resources will be given, in which they will be fetched in parallel.
   * By default, the HTTP headers are recorded also, in the same store, in a separate graph.
   * This allows code like editable() for example to test things about the resource.
   *
   * @param uri {Array<RDFlibNamedNode>|Array<string>|RDFlibNamedNode|string}
   *
   * @param [options={}] {Object}
   *
   * @param [options.fetch] {Function}
   *
   * @param [options.referringTerm] {RDFlibNamedNode} Referring term, the resource which
   *   referred to this (for tracking bad links)
   *
   * @param [options.contentType] {string} Provided content type (for writes)
   *
   * @param [options.forceContentType] {string} Override the incoming header to
   *   force the data to be treated as this content-type (for reads)
   *
   * @param [options.force] {boolean} Load the data even if loaded before.
   *   Also sets the `Cache-Control:` header to `no-cache`
   *
   * @param [options.baseURI=docuri] {Node|string} Original uri to preserve
   *   through proxying etc (`xhr.original`).
   *
   * @param [options.proxyUsed] {boolean} Whether this request is a retry via
   *   a proxy (generally done from an error handler)
   *
   * @param [options.withCredentials] {boolean} flag for XHR/CORS etc
   *
   * @param [options.clearPreviousData] {boolean} Before we parse new data,
   *   clear old, but only on status 200 responses
   *
   * @param [options.noMeta] {boolean} Prevents the addition of various metadata
   *   triples (about the fetch request) to the store
   *
   * @param [options.noRDFa] {boolean}
   *
   * @returns {Promise<Result>}
   */
  load(e, t = {}) {
    if (t = Object.assign({}, t), e instanceof Array)
      return Promise.all(e.map((c) => this.load(c, Object.assign({}, t))));
    let i = Un(e);
    i = i.split("#")[0], t = this.initFetchOptions(i, t);
    const s = this.appNode, a = this.store, l = a.statementsMatching(void 0, this.ns.link("requestedURI"), a.sym(i), s).map((c) => c.subject);
    for (const c of l) {
      const h = a.any(c, this.ns.link("response"), null, s);
      if (h != null) {
        const f = a.statementsMatching(h, this.ns.link("outOfDate"), !0, s);
        a.remove(f), t.force = !0, t.clearPreviousData = !0;
      }
    }
    const u = this.initFetchOptions(i, t);
    return this.pendingFetchPromise(i, u.baseURI, u);
  }
  async pendingFetchPromise(e, t, r) {
    let i;
    return !r.force && await this.fetchQueue[t] ? i = this.fetchQueue[t] : (i = Promise.race([this.setRequestTimeout(e, r), this.fetchUri(e, r)]), this.fetchQueue[t] = i, this.cleanupFetchRequest(t, void 0, this.timeout)), i.then((s) => (e in this.timeouts && (this.timeouts[e].forEach(clearTimeout), delete this.timeouts[e]), s));
  }
  /**
   * @param _options - DEPRECATED
   */
  cleanupFetchRequest(e, t, r) {
    t !== void 0 && console.warn("_options is deprecated"), this.timeouts[e] = (this.timeouts[e] || []).concat(setTimeout(() => {
      this.isPending(e) || delete this.fetchQueue[e];
    }, r));
  }
  initFetchOptions(e, t) {
    let r = this.store;
    !t.method || t.method.toUpperCase() === "GET" || (t.force = !0), t.resource = r.rdfFactory.namedNode(e), t.baseURI = t.baseURI || e, t.original = r.rdfFactory.namedNode(t.baseURI), t.req = r.bnode(), t.headers = t.headers || {}, t.contentType && (t.headers["content-type"] = t.contentType), t.force && (t.cache = "no-cache");
    let s = this.acceptString();
    t.headers.accept = s;
    let a = rt.offlineOverride(e);
    t.requestedURI = a, rt.setCredentials(a, t);
    let l = rt.proxyIfNecessary(a);
    return a !== l && (t.proxyUsed = !0), t.actualProxyURI = l, t;
  }
  /**
   * (The promise chain ends in either a `failFetch()` or a `doneFetch()`)
   *
   * @param docuri {string}
   * @param options {Object}
   *
   * @returns {Promise<Object>} fetch() result or an { error, status } object
   */
  fetchUri(e, t) {
    if (!e)
      return Promise.reject(new Error("Cannot fetch an empty uri"));
    if (rt.unsupportedProtocol(e))
      return this.failFetch(t, "fetcher: Unsupported protocol", "unsupported_protocol");
    let r = this.getState(e);
    if (t.force)
      delete this.nonexistent[e];
    else {
      if (r === "fetched")
        return Promise.resolve(
          // @ts-ignore This is not a valid response object
          this.doneFetch(t, {
            status: 200,
            ok: !0,
            statusText: "Already loaded into quadstore."
          })
        );
      if (r === "failed" && this.requested[e] === 404) {
        let s = "Previously failed: " + this.requested[e], a = {
          url: e,
          // This does not comply to Fetch spec, it can be a string value in rdflib
          status: this.requested[e],
          statusText: s,
          responseText: s,
          headers: new gi.Headers(),
          // Headers() ???
          ok: !1,
          body: null,
          bodyUsed: !1,
          size: 0,
          timeout: 0
        };
        return this.failFetch(t, s, this.requested[e], a);
      }
    }
    this.fireCallbacks("request", [e]), this.requested[e] = !0, t.noMeta || this.saveRequestMetadata(e, t);
    let {
      actualProxyURI: i
    } = t;
    return this._fetch(i, t).then((s) => this.handleResponse(s, e, t), (s) => {
      let a = {
        url: i,
        status: 999,
        // @@ what number/string should fetch failures report?
        statusText: (s.name || "network failure") + ": " + (s.errno || s.code || s.type),
        responseText: s.message,
        headers: new gi.Headers(),
        // Headers() ???
        ok: !1,
        body: null,
        bodyUsed: !1,
        size: 0,
        timeout: 0
      };
      return this.handleError(a, e, t);
    });
  }
  /**
   * Asks for a doc to be loaded if necessary then calls back
   *
   * Calling methods:
   *   nowOrWhenFetched (uri, userCallback)
   *   nowOrWhenFetched (uri, options, userCallback)
   *   nowOrWhenFetched (uri, referringTerm, userCallback, options)  <-- old
   *   nowOrWhenFetched (uri, referringTerm, userCallback) <-- old
   *
   *  Options include:
   *   referringTerm    The document in which this link was found.
   *                    this is valuable when finding the source of bad URIs
   *   force            boolean.  Never mind whether you have tried before,
   *                    load this from scratch.
   *   forceContentType Override the incoming header to force the data to be
   *                    treated as this content-type.
   *
   *  Callback function takes:
   *
   *    ok               True if the fetch worked, and got a 200 response.
   *                     False if any error happened
   *
   *    errmessage       Text error message if not OK.
   *
   *    response         The fetch Response object (was: XHR) if there was was one
   *                     includes response.status as the HTTP status if any.
   */
  nowOrWhenFetched(e, t, r, i = {}) {
    const s = Un(e);
    typeof t == "function" ? r = t : typeof t > "u" || (Ds(t) ? i.referringTerm = t : i = t), this.load(s, i).then((a) => {
      if (r)
        if (a)
          if (a.ok)
            r(!0, "OK", a);
          else {
            let l = "HTTP error: Status " + a.status + " (" + a.statusText + ")";
            a.responseText && (l += " " + a.responseText), r(!1, l, a);
          }
        else
          r(!1, "@@ nowOrWhenFetched:  no response object!");
    }, function(a) {
      var l = a.message || a.statusText;
      l = "Failed to load  <" + s + "> " + l, a.response && a.response.status && (l += " status: " + a.response.status), r(!1, l, a.response);
    });
  }
  /**
   * Records a status message (as a literal node) by appending it to the
   * request's metadata status collection.
   *
   */
  addStatus(e, t) {
    let r = /* @__PURE__ */ new Date();
    t = "[" + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds() + "." + r.getMilliseconds() + "] " + t;
    let i = this.store;
    const s = i.the(e, this.ns.link("status"));
    Ti(s) && s.append(i.rdfFactory.literal(t));
  }
  /**
   * Records errors in the system on failure:
   *
   *  - Adds an entry to the request status collection
   *  - Adds an error triple with the fail message to the metadata
   *  - Fires the 'fail' callback
   *  - Rejects with an error result object, which has a response object if any
   */
  failFetch(e, t, r, i) {
    this.addStatus(e.req, t), e.noMeta || this.store.add(e.original, this.ns.link("error"), this.store.rdfFactory.literal(t));
    let s = (e.method || "GET").toUpperCase();
    (s === "GET" || s === "HEAD") && (e.resource.equals(e.original), this.requested[$n(e.original.value)] = r, this.fireCallbacks("fail", [e.original.value, t]));
    var l = new Error("Fetcher: " + t);
    return l.status = r, l.statusText = t, l.response = i, Promise.reject(l);
  }
  // in the why part of the quad distinguish between HTML and HTTP header
  // Reverse is set iif the link was rev= as opposed to rel=
  linkData(e, t, r, i, s) {
    if (!r) return;
    let a = this.store, l, u = a.rdfFactory.namedNode(Dt(r, e.value));
    if (t === "alternate" || t === "seeAlso" || t === "meta" || t === "describedby") {
      if (u.value === e.value)
        return;
      l = this.ns.rdfs("seeAlso");
    } else t === "type" ? l = a.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type") : l = a.rdfFactory.namedNode(Dt(encodeURIComponent(t), "http://www.iana.org/assignments/link-relations/"));
    s ? a.add(u, l, e, i) : a.add(e, l, u, i);
  }
  parseLinkHeader(e, t, r) {
    if (!e)
      return;
    const i = /<[^>]*>\s*(\s*;\s*[^()<>@,;:"/[\]?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g, s = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g, a = e.match(i);
    if (a != null)
      for (let l = 0; l < a.length; l++) {
        let u = a[l].split(">"), c = u[0].substring(1), f = u[1].match(s);
        if (f == null) return;
        for (let m = 0; m < f.length; m++) {
          let b = f[m].split("=")[1].replace(/["']/g, "");
          this.linkData(t, b, c, r);
        }
      }
  }
  doneFetch(e, t) {
    return this.addStatus(e.req, "Done."), this.requested[e.original.value] = "done", this.fireCallbacks("done", [e.original.value]), t.req = e.req, t;
  }
  /**
   * Note two nodes are now smushed
   * If only one was flagged as looked up, then the new node is looked up again,
   * which will make sure all the URIs are dereferenced
   */
  nowKnownAs(e, t) {
    this.lookedUp[e.value] ? this.lookedUp[t.value] || this.lookUpThing(t, e) : this.lookedUp[t.value] && (this.lookedUp[e.value] || this.lookUpThing(e, t));
  }
  /**
   * Writes back to the web what we have in the store for this uri
   */
  putBack(e, t = {}) {
    const r = Un(e);
    let i = new pt(r).doc();
    return t.contentType = t["content-type"] || t["Content-Type"] || t.contentType || Hn, t.contentType === "application/ld+json" ? new Promise((s, a) => {
      Or(i, this.store, i.uri, t.contentType, (l, u) => {
        l ? a(l) : (t.data = u, this.webOperation("PUT", e, t).then((c) => s(c)).catch((c) => a(c)));
      });
    }) : (t.data = Or(i, this.store, i.value, t.contentType), this.webOperation("PUT", r, t));
  }
  webCopy(e, t, r) {
    return this.webOperation("GET", e).then((i) => this.webOperation(
      "PUT",
      // change to binary from text
      t,
      {
        data: i.responseText,
        contentType: r
      }
    ));
  }
  delete(e, t) {
    return this.webOperation("DELETE", e, t).then((r) => (this.requested[e] = 404, this.nonexistent[e] = !0, this.unload(this.store.rdfFactory.namedNode(e)), r));
  }
  /** Create an empty resource if it really does not exist
   *  Be absolutely sure something does not exist before creating a new empty file
   * as otherwise existing could  be deleted.
   * @param doc - The resource
  */
  async createIfNotExists(e, t = Hn, r = "") {
    const i = this;
    try {
      var s = await i.load(e);
    } catch (a) {
      if (a.response.status === 404) {
        try {
          s = await i.webOperation("PUT", e.value, {
            data: r,
            contentType: t
          });
        } catch (l) {
          throw l;
        }
        return delete i.requested[e.value], s;
      } else
        throw a;
    }
    return s;
  }
  /**
   * @param parentURI URI of parent container
   * @param folderName - Optional folder name (slug)
   * @param data - Optional folder metadata
   */
  createContainer(e, t, r) {
    let i = {
      // Force the right mime type for containers
      "content-type": Hn,
      link: this.ns.ldp("BasicContainer") + '; rel="type"'
    };
    t && (i.slug = t);
    let s = {
      headers: i
    };
    return r && (s.body = r), this.webOperation("POST", e, s);
  }
  invalidateCache(e) {
    const t = Un(e), r = this;
    if (r.fetchQueue && r.fetchQueue[t]) {
      var i = r.fetchQueue[t];
      i.PromiseStatus, delete r.fetchQueue[t];
    }
    if (r.requested[t] && r.requested[t] !== "done" && r.requested[t] !== "failed" && r.requested[t] !== 404) {
      let s = `Rdflib: fetcher: Destructive operation on <${r.requested[t]}> file being fetched! ` + t;
      console.error(s);
    } else
      delete r.requested[t], delete r.nonexistent[t];
  }
  /**
   * A generic web operation, at the fetch() level.
   * does not involve the quad store.
   *
   *  Returns promise of Response
   *  If data is returned, copies it to response.responseText before returning
   */
  webOperation(e, t, r = {}) {
    const i = Un(t);
    r.method = e, r.body = r.data || r.body, r.force = !0;
    const s = this;
    if (r.body && !r.contentType)
      throw new Error("Web operation sending data must have a defined contentType.");
    return r.contentType && (r.headers = r.headers || {}, r.headers["content-type"] = r.contentType), rt.setCredentials(i, r), new Promise(function(a, l) {
      s._fetch(i, r).then((u) => {
        if (u.ok)
          (e === "PUT" || e === "PATCH" || e === "POST" || e === "DELETE") && s.invalidateCache(i), u.text ? u.text().then((c) => {
            u.responseText = c, a(u);
          }) : a(u);
        else {
          let c = "Web error: " + u.status;
          u.statusText && (c += " (" + u.statusText + ")"), c += " on " + e + " of <" + i + ">", u.responseText && (c += ": " + u.responseText);
          let h = new Error(c);
          h.response = u, l(h);
        }
      }, (u) => {
        let c = "Fetch error for " + e + " of <" + i + ">:" + u;
        l(new Error(c));
      });
    });
  }
  /**
   * Looks up something.
   * Looks up all the URIs a things has.
   *
   * @param term - canonical term for the thing whose URI is
   *   to be dereferenced
   * @param rterm - the resource which referred to this
   *   (for tracking bad links)
   */
  lookUpThing(e, t) {
    let r = this.store.uris(e);
    return r = r.map((i) => $n(i)), r.forEach((i) => {
      this.lookedUp[i] = !0;
    }), this.load(r, {
      referringTerm: t
    });
  }
  /**
   * Looks up response header.
   *
   * @returns {Array|undefined} a list of header values found in a stored HTTP
   *   response, or [] if response was found but no header found,
   *   or undefined if no response is available.
   * Looks for { [] link:requestedURI ?uri; link:response [ httph:header-name  ?value ] }
   */
  getHeader(e, t) {
    const r = this.store, i = e.value, s = r.each(void 0, this.ns.link("requestedURI"), r.rdfFactory.literal(i));
    for (let a = 0; a < s.length; a++) {
      let l = s[a];
      if (l !== void 0) {
        let u = r.any(l, this.ns.link("response"));
        if (u !== void 0 && r.anyValue(u, this.ns.http("status")) && r.anyValue(u, this.ns.http("status")).startsWith("2")) {
          let c = r.each(u, this.ns.httph(t.toLowerCase()));
          return c.length ? c.map((h) => h.value) : [];
        }
      }
    }
  }
  saveRequestMetadata(e, t) {
    let r = t.req, i = this.store, s = t.referringTerm;
    this.addStatus(t.req, "Accept: " + t.headers.accept), Ds(s) && i.add(i.rdfFactory.namedNode(e), this.ns.link("requestedBy"), s, this.appNode), t.original && t.original.value !== e && i.add(r, this.ns.link("orginalURI"), i.rdfFactory.literal(t.original.value), this.appNode);
    const a = /* @__PURE__ */ new Date(), l = "[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + "] ";
    i.add(r, this.ns.rdfs("label"), i.rdfFactory.literal(l + " Request for " + e), this.appNode), i.add(r, this.ns.link("requestedURI"), i.rdfFactory.literal(e), this.appNode), i.add(r, this.ns.link("status"), i.collection(), this.appNode);
  }
  saveResponseMetadata(e, t) {
    const r = this.store;
    let i = r.bnode();
    return r.add(t.req, this.ns.link("response"), i, this.appNode), r.add(i, this.ns.http("status"), r.rdfFactory.literal(e.status), this.appNode), r.add(i, this.ns.http("statusText"), r.rdfFactory.literal(e.statusText), this.appNode), e.headers.forEach((s, a) => {
      r.add(i, this.ns.httph(a), this.store.rdfFactory.literal(s), this.appNode), a === "content-type" && r.add(
        t.resource,
        this.ns.rdf("type"),
        r.rdfFactory.namedNode(Qc(s).value),
        this.appNode
        // responseNode
      );
    }), i;
  }
  objectRefresh(e) {
    let t = this.store.uris(e);
    if (typeof t < "u")
      for (let r = 0; r < t.length; r++)
        this.refresh(this.store.rdfFactory.namedNode($n(t[r])));
  }
  /* refresh  Reload data from a given document
  **
  ** @param term - An RDF Named Node for the eodcument in question
  ** @param userCallback - A function userCallback(ok, message, response)
  */
  refresh(e, t) {
    this.fireCallbacks("refresh", arguments), this.nowOrWhenFetched(e, {
      force: !0,
      clearPreviousData: !0
    }, t);
  }
  /* refreshIfExpired   Conditional refresh if Expired
  **
  ** @param term - An RDF Named Node for the eodcument in question
  ** @param userCallback - A function userCallback(ok, message, response)
  */
  refreshIfExpired(e, t) {
    let r = this.getHeader(e, "Expires");
    !r || new Date(r[0]).getTime() <= (/* @__PURE__ */ new Date()).getTime() ? this.refresh(e, t) : t(!0, "Not expired", {});
  }
  retract(e) {
    this.store.removeMany(void 0, void 0, void 0, e), e.value && delete this.requested[$n(e.value)], this.fireCallbacks("retract", arguments);
  }
  getState(e) {
    return typeof this.requested[e] > "u" ? "unrequested" : this.requested[e] === !0 ? "requested" : this.requested[e] === "done" ? "fetched" : this.requested[e] === "redirected" ? this.getState(this.redirectedTo[e]) : "failed";
  }
  isPending(e) {
    return this.requested[e] === !0;
  }
  unload(e) {
    this.store.removeDocument(e), delete this.requested[e.value];
  }
  addHandler(e) {
    this.handlers.push(e), e.register(this);
  }
  retryNoCredentials(e, t) {
    t.retriedWithNoCredentials = !0, delete this.requested[e], delete this.fetchQueue[e];
    let r = Object.assign({}, t, {
      credentials: "omit"
    });
    return this.addStatus(t.req, "Abort: Will retry with credentials SUPPRESSED to see if that helps"), this.load(e, r);
  }
  /**
   * Tests whether a request is being made to a cross-site URI (for purposes
   * of retrying with a proxy)
   */
  isCrossSite(e) {
    if (typeof document > "u" || !document.location)
      return !1;
    const t = Hc, r = "" + document.location;
    return (t(r) && t(e) && t(r)) !== t(e);
  }
  /**
   * Called when there's a network error in fetch(), or a response
   * with status of 0.
   */
  handleError(e, t, r) {
    if (this.isCrossSite(t)) {
      if (r.credentials && r.credentials === "include" && !r.retriedWithNoCredentials)
        return this.retryNoCredentials(t, r);
      let s = rt.crossSiteProxy(t);
      if (s && !r.proxyUsed)
        return this.redirectToProxy(s, r);
    }
    var i;
    return e instanceof Error ? i = "Fetch error: " + e.message : (i = e.statusText, e.responseText && (i += ` ${e.responseText}`)), this.failFetch(r, i, e.status || 998, e);
  }
  // deduce some things from the HTTP transaction
  addType(e, t, r, i) {
    let s = t;
    if (i) {
      var a = r.any(s, this.ns.link("requestedURI"));
      a && a.value !== i && r.add(r.rdfFactory.namedNode(i), this.ns.rdf("type"), e, this.appNode);
    }
    for (; ; ) {
      const c = r.any(s, this.ns.link("requestedURI"));
      if (c && c.value && r.add(r.rdfFactory.namedNode(c.value), this.ns.rdf("type"), e, this.appNode), s = r.any(void 0, r.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#redirectedRequest"), s), !s)
        break;
      var l = r.any(s, r.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#response"));
      if (!l)
        break;
      var u = r.any(l, r.rdfFactory.namedNode("http://www.w3.org/2007/ont/http#status"));
      if (!u || u !== "301" && u !== "302")
        break;
    }
  }
  /**
   * Handle fetch() response
   */
  handleResponse(e, t, r) {
    const i = this.store, s = e.headers, a = r.req, l = this.saveResponseMetadata(e, r), u = this.normalizedContentType(r, s) || "";
    let c = s.get("content-location");
    if (e.status === 0)
      return this.handleError(e, t, r);
    if (e.status >= 400)
      return e.status === 404 && (this.nonexistent[r.original.value] = !0, this.nonexistent[t] = !0), this.saveErrorResponse(e, l).then(() => {
        let v = r.resource + " " + e.statusText;
        return this.failFetch(r, v, e.status, e);
      });
    var h = null, f = null;
    if (c && (f = Dt(c, t), f !== t && (h = f)), e.status === 200) {
      if (this.addType(this.ns.link("Document"), a, i, t), h && this.addType(this.ns.link("Document"), a, i, h), r.clearPreviousData) {
        const w = i.statementsMatching(void 0, void 0, void 0, r.resource).slice();
        for (let b = 0; b < w.length; b++)
          i.removeStatement(w[b]);
      }
      let v = u.includes("image/") || u.includes("application/pdf");
      u && v && (this.addType(i.rdfFactory.namedNode("http://purl.org/dc/terms/Image"), a, i, t), h && this.addType(i.rdfFactory.namedNode("http://purl.org/dc/terms/Image"), a, i, h));
    }
    if (c) {
      if (!r.force && h && this.requested[f] === "done")
        return this.doneFetch(r, e);
      this.requested[f] = !0;
    }
    this.parseLinkHeader(s.get("link"), r.original, a);
    let m = this.handlerForContentType(u, e);
    return m ? e.text().then((v) => (e.responseText = v, m.parse(this, v, r, e))) : (this.addStatus(a, "Fetch over. No data handled."), this.doneFetch(r, e));
  }
  saveErrorResponse(e, t) {
    let r = this.store;
    return e.text().then((i) => {
      i.length > 10 && r.add(t, this.ns.http("content"), r.rdfFactory.literal(i), t);
    });
  }
  handlerForContentType(e, t) {
    if (!e)
      return null;
    let r = this.handlers.find((i) => e.match(i.pattern));
    return r ? new r(t) : null;
  }
  guessContentType(e) {
    return Ql[e.split(".").pop()];
  }
  normalizedContentType(e, t) {
    if (e.forceContentType)
      return e.forceContentType;
    let r = t.get("content-type");
    if (!r || r.includes("application/octet-stream")) {
      let s = this.guessContentType(e.resource.value);
      if (s)
        return s;
    }
    let i = Ss(e.resource.value);
    return !r && ["file", "chrome"].includes(i) ? "text/xml" : r;
  }
  /**
   * Sends a new request to the specified uri. (Extracted from `onerrorFactory()`)
   */
  redirectToProxy(e, t) {
    this.addStatus(t.req, "BLOCKED -> Cross-site Proxy to <" + e + ">"), t.proxyUsed = !0;
    const r = this.store, i = t.req;
    t.noMeta || (r.add(i, this.ns.link("redirectedTo"), r.rdfFactory.namedNode(e), i), this.addStatus(i, "redirected to new request")), this.requested[t.resource.value] = "redirected", this.redirectedTo[t.resource.value] = e;
    let s = Object.assign({}, t);
    return s.baseURI = t.resource.value, this.fetchUri(e, s).then((a) => (s.noMeta || r.add(i, this.ns.link("redirectedRequest"), s.req, this.appNode), a));
  }
  setRequestTimeout(e, t) {
    return new Promise((r) => {
      this.timeouts[e] = (this.timeouts[e] || []).concat(setTimeout(() => {
        this.isPending(e) && !t.retriedWithNoCredentials && !t.proxyUsed && r(this.failFetch(t, `Request to ${e} timed out`, "timeout"));
      }, this.timeout));
    });
  }
  addFetchCallback(e, t) {
    this.fetchCallbacks[e] ? this.fetchCallbacks[e].push(t) : this.fetchCallbacks[e] = [t];
  }
  acceptString() {
    let e = "";
    for (let t in this.mediatypes) {
      e !== "" && (e += ", "), e += t;
      for (let r in this.mediatypes[t])
        e += ";" + r + "=" + this.mediatypes[t][r];
    }
    return e;
  }
  // var updatesVia = new $rdf.UpdatesVia(this) // Subscribe to headers
  // @@@@@@@@ This is turned off because it causes a websocket to be set up for ANY fetch
  // whether we want to track it ot not. including ontologies loaed though the XSSproxy
}
re(rt, "HANDLERS", void 0);
re(rt, "CONTENT_TYPE_BY_EXT", void 0);
re(rt, "crossSiteProxyTemplate", void 0);
rt.HANDLERS = yi;
rt.CONTENT_TYPE_BY_EXT = Ql;
class zd {
  /**
   * @param  store - The quadstore to store data and metadata. Created if not passed.
  */
  constructor(e) {
    if (re(this, "store", void 0), re(this, "ifps", void 0), re(this, "fps", void 0), re(this, "patchControl", void 0), re(this, "ns", void 0), e = e || new yn(), e.updater)
      throw new Error("You can't have two UpdateManagers for the same store");
    e.fetcher || (e.fetcher = new rt(e)), this.store = e, e.updater = this, this.ifps = {}, this.fps = {}, this.ns = {}, this.ns.link = Ne("http://www.w3.org/2007/ont/link#"), this.ns.http = Ne("http://www.w3.org/2007/ont/http#"), this.ns.httph = Ne("http://www.w3.org/2007/ont/httph#"), this.ns.ldp = Ne("http://www.w3.org/ns/ldp#"), this.ns.rdf = Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.ns.rdfs = Ne("http://www.w3.org/2000/01/rdf-schema#"), this.ns.rdf = Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.ns.owl = Ne("http://www.w3.org/2002/07/owl#"), this.patchControl = [];
  }
  patchControlFor(e) {
    return this.patchControl[e.value] || (this.patchControl[e.value] = []), this.patchControl[e.value];
  }
  isHttpUri(e) {
    return e.slice(0, 4) === "http";
  }
  /** Remove from the store HTTP authorization metadata
  * The editable function below relies on copies we have in the store
  * of the results of previous HTTP transactions. However, when
  * the user logs in, then that data misrepresents what would happen
  * if the user tried again.
  */
  flagAuthorizationMetadata(e) {
    e || (e = this.store);
    const t = e.fetcher?.appNode, r = e.statementsMatching(void 0, this.ns.link("requestedURI"), void 0, t).map((i) => i.subject);
    for (const i of r) {
      const s = e.any(i, this.ns.link("response"), null, t);
      s != null && e.add(s, this.ns.link("outOfDate"), !0, t);
    }
  }
  /**
   * Tests whether a file is editable.
   * If the file has a specific annotation that it is machine written,
   * for safety, it is editable (this doesn't actually check for write access)
   * If the file has wac-allow and accept patch headers, those are respected.
   * and local write access is determined by those headers.
   * This async version not only looks at past HTTP requests, it also makes new ones if necessary.
   *
   * @returns The method string N3PATCH or SPARQL or DAV or
   *   LOCALFILE or false if known, undefined if not known.
   */
  async checkEditable(e, t) {
    if (!e)
      return !1;
    t || (t = this.store);
    const r = this.editable(e, t);
    return r !== void 0 ? r : (await t.fetcher?.load(e), this.editable(e, t));
  }
  /**
   * Tests whether a file is editable.
   * If the file has a specific annotation that it is machine written,
   * for safety, it is editable (this doesn't actually check for write access)
   * If the file has wac-allow and accept patch headers, those are respected.
   * and local write access is determined by those headers.
   * This synchronous version only looks at past HTTP requests, does not make new ones.
   *
   * @returns The method string SPARQL or DAV or
   *   LOCALFILE or false if known, undefined if not known.
   */
  editable(e, t) {
    if (!e)
      return !1;
    if (t || (t = this.store), e = Un(e), !this.isHttpUri(e) && t.holds(t.rdfFactory.namedNode(e), t.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), t.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#MachineEditableDocument")))
      return "LOCALFILE";
    var r, i = !1;
    const s = t.fetcher?.appNode;
    for (var a = t.each(void 0, this.ns.link("requestedURI"), $n(e), s), l, u = 0; u < a.length; u++)
      if (r = a[u], r !== void 0) {
        const b = t.any(r, this.ns.link("response"), null, s);
        if (b !== void 0) {
          if (t.anyJS(b, this.ns.link("outOfDate"), null, s)) continue;
          var c = t.anyValue(b, this.ns.httph("wac-allow"));
          if (c)
            for (var h of c.split(",")) {
              var f = h.split("=");
              if (f[0].includes("user") && !f[1].includes("write") && !f[1].includes("append"))
                return !1;
            }
          var m = t.each(b, this.ns.httph("accept-patch"));
          if (m.length)
            for (let _ = 0; _ < m.length; _++) {
              if (l = m[_].value.trim(), l.indexOf("application/sparql-update") >= 0 || l.indexOf("application/sparql-update-single-match") >= 0) return "SPARQL";
              if (l.indexOf("text/n3") >= 0) return "N3PATCH";
            }
          var v = t.each(b, this.ns.httph("ms-author-via"));
          if (v.length)
            for (let _ = 0; _ < v.length; _++) {
              if (l = v[_].value.trim(), l.indexOf("SPARQL") >= 0)
                return "SPARQL";
              if (l.indexOf("DAV") >= 0)
                return "DAV";
            }
          if (!this.isHttpUri(e))
            return c ? "LOCALFILE" : !1;
          var w = t.each(b, this.ns.http("status"));
          if (w.length)
            for (let _ = 0; _ < w.length; _++)
              (w[_] === 200 || w[_] === 404) && (i = !0);
        }
      }
    if (a.length !== 0) {
      if (i)
        return !1;
    }
  }
  anonymize(e) {
    return e.toNT().substr(0, 2) === "_:" && this.mentioned(e) ? "?" + e.toNT().substr(2) : e.toNT();
  }
  anonymizeNT(e) {
    return this.anonymize(e.subject) + " " + this.anonymize(e.predicate) + " " + this.anonymize(e.object) + " .";
  }
  nTriples(e) {
    return `${e.subject.toNT()} ${e.predicate.toNT()} ${e.object.toNT()} .`;
  }
  /**
   * Returns a list of all bnodes occurring in a statement
   * @private
   */
  statementBnodes(e) {
    return [e.subject, e.predicate, e.object].filter(function(t) {
      return Pc(t);
    });
  }
  /**
   * Returns a list of all bnodes occurring in a list of statements
   * @private
   */
  statementArrayBnodes(e) {
    var t = [];
    for (let i = 0; i < e.length; i++)
      t = t.concat(this.statementBnodes(e[i]));
    t.sort();
    var r = [];
    for (let i = 0; i < t.length; i++)
      (i === 0 || !t[i].equals(t[i - 1])) && r.push(t[i]);
    return r;
  }
  /**
   * Makes a cached list of [Inverse-]Functional properties
   * @private
   */
  cacheIfps() {
    this.ifps = {};
    var e = this.store.each(void 0, this.ns.rdf("type"), this.ns.owl("InverseFunctionalProperty"));
    for (let t = 0; t < e.length; t++)
      this.ifps[e[t].value] = !0;
    this.fps = {}, e = this.store.each(void 0, this.ns.rdf("type"), this.ns.owl("FunctionalProperty"));
    for (let t = 0; t < e.length; t++)
      this.fps[e[t].value] = !0;
  }
  /**
   * Returns a context to bind a given node, up to a given depth
   * @private
   */
  bnodeContext2(e, t, r) {
    var i = this.store.statementsMatching(void 0, void 0, e, t), s, a;
    for (let l = 0; l < i.length; l++)
      if (this.fps[i[l].predicate.value]) {
        if (s = i[l].subject, !s.isBlank)
          return [i[l]];
        if (r && (a = this.bnodeContext2(s, t, r - 1), a))
          return a.concat([i[l]]);
      }
    i = this.store.statementsMatching(e, void 0, void 0, t);
    for (let l = 0; l < i.length; l++)
      if (this.ifps[i[l].predicate.value]) {
        if (s = i[l].object, !s.isBlank)
          return [i[l]];
        if (r && (a = this.bnodeContext2(s, t, r - 1), a))
          return a.concat([i[l]]);
      }
    return null;
  }
  /**
   * Returns the smallest context to bind a given single bnode
   * @private
   */
  bnodeContext1(e, t) {
    for (var r = 0; r < 3; r++) {
      var i = this.bnodeContext2(e, t, r);
      if (i !== null) return i;
    }
    return this.store.connectedStatements(e, t);
  }
  /**
   * @private
   */
  mentioned(e) {
    return this.store.statementsMatching(e, null, null, null).length !== 0 || // Don't pin fresh bnodes
    this.store.statementsMatching(null, e).length !== 0 || this.store.statementsMatching(null, null, e).length !== 0;
  }
  /**
   * @private
   */
  bnodeContext(e, t) {
    var r = [];
    if (e.length) {
      this.cacheIfps();
      for (let s = 0; s < e.length; s++) {
        var i = e[s];
        this.mentioned(i) && (r = r.concat(this.bnodeContext1(i, t)));
      }
    }
    return r;
  }
  /**
   * Returns the best context for a single statement
   * @private
   */
  statementContext(e) {
    var t = this.statementBnodes(e);
    return this.bnodeContext(t, e.graph);
  }
  /**
   * @private
   */
  contextWhere(e) {
    var t = this;
    return !e || e.length === 0 ? "" : "WHERE { " + e.map(function(r) {
      return t.anonymizeNT(r);
    }).join(`
`) + ` }
`;
  }
  /**
   * @private
   */
  fire(e, t, r, i = {}) {
    return Promise.resolve().then(() => {
      if (!e)
        throw new Error("No URI given for remote editing operation: " + t);
      return i.noMeta = !0, i.contentType = i.contentType || "application/sparql-update", i.body = t, this.store.fetcher.webOperation("PATCH", e, i);
    }).then((s) => {
      if (!s.ok) {
        let a = "UpdateManager: update failed for <" + e + "> status=" + s.status + ", " + s.statusText + `
   for query: ` + t;
        throw new Error(a);
      }
      r(e, s.ok, s.responseText, s);
    }).catch((s) => {
      r(e, !1, s.message, s);
    });
  }
  // ARE THESE THREE FUNCTIONS USED? DEPRECATE?
  /** return a statemnet updating function
   *
   * This does NOT update the statement.
   * It returns an object which includes
   *  function which can be used to change the object of the statement.
   */
  update_statement(e) {
    if (!(e && !e.graph)) {
      var t = this, r = this.statementContext(e);
      return {
        statement: e ? [e.subject, e.predicate, e.object, e.graph] : void 0,
        statementNT: e ? this.anonymizeNT(e) : void 0,
        where: t.contextWhere(r),
        set_object: function(i, s) {
          var a = this.where;
          a += "DELETE DATA { " + this.statementNT + ` } ;
`, a += "INSERT DATA { " + // @ts-ignore `this` might refer to the wrong scope. Does this work?
          this.anonymize(this.statement[0]) + " " + // @ts-ignore
          this.anonymize(this.statement[1]) + " " + // @ts-ignore
          this.anonymize(i) + `  . }
`, t.fire(this.statement[3].value, a, s);
        }
      };
    }
  }
  insert_statement(e, t) {
    var r = e instanceof Array ? e[0] : e, i = this.contextWhere(this.statementContext(r));
    if (e instanceof Array) {
      var s = "";
      for (let a = 0; a < e.length; a++) s += e[a] + `
`;
      i += "INSERT DATA { " + s + ` }
`;
    } else
      i += "INSERT DATA { " + this.anonymize(e.subject) + " " + this.anonymize(e.predicate) + " " + this.anonymize(e.object) + `  . }
`;
    this.fire(r.graph.value, i, t);
  }
  delete_statement(e, t) {
    var r = e instanceof Array ? e[0] : e, i = this.contextWhere(this.statementContext(r));
    if (e instanceof Array) {
      var s = "";
      for (let a = 0; a < e.length; a++) s += e[a] + `
`;
      i += "DELETE DATA { " + s + ` }
`;
    } else
      i += "DELETE DATA { " + this.anonymize(e.subject) + " " + this.anonymize(e.predicate) + " " + this.anonymize(e.object) + `  . }
`;
    this.fire(r.graph.value, i, t);
  }
  /// //////////////////////
  /**
   * Requests a now or future action to refresh changes coming downstream
   * This is designed to allow the system to re-request the server version,
   * when a websocket has pinged to say there are changes.
   * If the websocket, by contrast, has sent a patch, then this may not be necessary.
   *
   * @param doc
   * @param action
   */
  requestDownstreamAction(e, t) {
    var r = this.patchControlFor(e);
    if (!r.pendingUpstream)
      t(e);
    else if (r.downstreamAction) {
      if ("" + r.downstreamAction != "" + t)
        throw new Error("Can't wait for > 1 different downstream actions");
    } else
      r.downstreamAction = t;
  }
  /**
   * We want to start counting websocket notifications
   * to distinguish the ones from others from our own.
   */
  clearUpstreamCount(e) {
    var t = this.patchControlFor(e);
    t.upstreamCount = 0;
  }
  getUpdatesVia(e) {
    var t = this.store.fetcher.getHeader(e, "updates-via");
    return !t || !t.length ? null : t[0].trim();
  }
  addDownstreamChangeListener(e, t) {
    var r = this.patchControlFor(e);
    r.downstreamChangeListeners || (r.downstreamChangeListeners = []), r.downstreamChangeListeners.push(t), this.setRefreshHandler(e, (i) => {
      this.reloadAndSync(i);
    });
  }
  reloadAndSync(e) {
    var t = this.patchControlFor(e), r = this;
    if (t.reloading) {
      t.outOfDate = !0;
      return;
    }
    t.reloading = !0;
    var i = 1e3, s = function() {
      r.reload(r.store, e, function(a, l, u) {
        if (a) {
          if (t.downstreamChangeListeners)
            for (let c = 0; c < t.downstreamChangeListeners.length; c++)
              t.downstreamChangeListeners[c]();
          t.reloading = !1, t.outOfDate && (t.outOfDate = !1, s());
        } else
          t.reloading = !1, u && u.status === 0 && (t.reloading = !0, i = i * 2, setTimeout(s, i));
      });
    };
    s();
  }
  /**
   * Sets up websocket to listen on
   *
   * There is coordination between upstream changes and downstream ones
   * so that a reload is not done in the middle of an upstream patch.
   * If you use this API then you get called when a change happens, and you
   * have to reload the file yourself, and then refresh the UI.
   * Alternative is addDownstreamChangeListener(), where you do not
   * have to do the reload yourself. Do mot mix them.
   *
   * kb contains the HTTP  metadata from previous operations
   *
   * @param doc
   * @param handler
   *
   * @returns {boolean}
   */
  setRefreshHandler(e, t) {
    let r = this.getUpdatesVia(e);
    var i = t, s = this, a = this, l = 1500, u = 0;
    if (!r)
      return !1;
    r = Dt(r, e.value);
    const c = r.replace(/^http:/, "ws:").replace(/^https:/, "wss:");
    var h = function() {
      var f;
      if (typeof WebSocket < "u")
        f = new WebSocket(c);
      else if (typeof window < "u" && window.WebSocket)
        f = window.WebSocket(c);
      else
        return;
      f.onopen = function() {
        l = 1500, this.send("sub " + e.value), u && a.requestDownstreamAction(e, i);
      };
      var m = s.patchControlFor(e);
      m.upstreamCount = 0, f.onerror = function(w) {
      }, f.onclose = function(v) {
        l *= 2, u += 1, setTimeout(function() {
          h();
        }, l);
      }, f.onmessage = function(v) {
        if (v.data && v.data.slice(0, 3) === "pub") {
          if ("upstreamCount" in m && (m.upstreamCount -= 1, m.upstreamCount >= 0))
            return;
          m.upstreamCount = 0, s.requestDownstreamAction(e, i);
        }
      };
    };
    return h(), !0;
  }
  /**
   * This high-level function updates the local store iff the web is changed successfully.
   * Deletions, insertions may be undefined or single statements or lists or formulae (may contain bnodes which can be indirectly identified by a where clause).
   * The `why` property of each statement must be the give the web document to be updated.
   * The statements to be deleted and inserted may span more than one web document.
   * @param deletions - Statement or statements to be deleted.
   * @param insertions - Statement or statements to be inserted.
   * @returns a promise
   */
  updateMany(e, t = []) {
    const r = e.concat(t).map((l) => l.why), i = this, s = [];
    r.forEach((l) => {
      s.find((u) => u.equals(l)) || s.push(l);
    });
    const a = s.map((l) => i.update(e.filter((u) => u.why.equals(l)), t.filter((u) => u.why.equals(l))));
    return Promise.all(a);
  }
  /**
   * @private
   * 
   * This helper function constructs SPARQL Update query from resolved arguments.
   * 
   * @param ds: deletions array.
   * @param is: insertions array.
   * @param bnodes_context: Additional context to uniquely identify any blank nodes.
   */
  constructSparqlUpdateQuery(e, t, r) {
    var i = this.contextWhere(r), s = "";
    if (i.length) {
      if (e.length) {
        s += "DELETE { ";
        for (let a = 0; a < e.length; a++)
          s += this.anonymizeNT(e[a]) + `
`;
        s += ` }
`;
      }
      if (t.length) {
        s += "INSERT { ";
        for (let a = 0; a < t.length; a++)
          s += this.anonymizeNT(t[a]) + `
`;
        s += ` }
`;
      }
      s += i;
    } else {
      if (e.length) {
        s += "DELETE DATA { ";
        for (let a = 0; a < e.length; a++)
          s += this.anonymizeNT(e[a]) + `
`;
        s += ` } 
`;
      }
      if (t.length) {
        e.length && (s += " ; "), s += "INSERT DATA { ";
        for (let a = 0; a < t.length; a++)
          s += this.nTriples(t[a]) + `
`;
        s += ` }
`;
      }
    }
    return s;
  }
  /**
   * @private
   * 
   * This helper function constructs n3-patch query from resolved arguments.
   * 
   * @param ds: deletions array.
   * @param is: insertions array.
   * @param bnodes_context: Additional context to uniquely identify any blanknodes.
   */
  constructN3PatchQuery(e, t, r) {
    var i = `
@prefix solid: <http://www.w3.org/ns/solid/terms#>.
@prefix ex: <http://www.example.org/terms#>.

_:patch
`;
    return r && r.length > 0 && (i += `
      solid:where {
        ${r.map((s) => this.anonymizeNT(s)).join(`
        `)}
      };`), e.length > 0 && (i += `
      solid:deletes {
        ${e.map((s) => this.anonymizeNT(s)).join(`
        `)}
      };`), t.length > 0 && (i += `
      solid:inserts {
        ${t.map((s) => this.anonymizeNT(s)).join(`
        `)}
      };`), i += `   a solid:InsertDeletePatch .
`, i;
  }
  /**
   * This high-level function updates the local store if the web is changed successfully.
   * Deletions, insertions may be undefined or single statements or lists or formulae (may contain bnodes which can be indirectly identified by a where clause).
   * The `why` property of each statement must be the same and give the web document to be updated.
   * @param deletions - Statement or statements to be deleted.
   * @param insertions - Statement or statements to be inserted.
   * @param callback - called as callbackFunction(uri, success, errorbody)
   *           OR returns a promise
   * @param options - Options for the fetch call
   */
  update(e, t, r, i, s = {}) {
    if (!r) {
      var a = this;
      return new Promise(function(A, K) {
        a.update(e, t, function(M, j, k) {
          j ? A() : K(new Error(k));
        }, i, s);
      });
    }
    try {
      var l = this.store, u = e ? Na(e) ? e.statements : e instanceof Array ? e : [e] : [], c = t ? Na(t) ? t.statements : t instanceof Array ? t : [t] : [];
      if (!(u instanceof Array))
        throw new Error("Type Error " + typeof u + ": " + u);
      if (!(c instanceof Array))
        throw new Error("Type Error " + typeof c + ": " + c);
      if (u.length === 0 && c.length === 0)
        return r(null, !0);
      var h = u.length ? u[0].graph : c[0].graph;
      if (!h) {
        let A = "Error patching: statement does not specify which document to patch:" + u[0] + ", " + c[0];
        throw new Error(A);
      }
      if (h.termType !== "NamedNode") {
        let A = "Error patching: document not a NamedNode:" + u[0] + ", " + c[0];
        throw new Error(A);
      }
      var f = this.patchControlFor(h), m = Date.now(), v = ["subject", "predicate", "object", "why"], w = ["insert", "delete"], b = {
        delete: u,
        insert: c
      };
      w.map(function(A) {
        b[A].map(function(K) {
          if (!h.equals(K.graph))
            throw new Error("update: destination " + h + " inconsistent with delete quad " + K.graph);
          v.map(function(M) {
            if (typeof K[M] > "u")
              throw new Error("update: undefined " + M + " of statement.");
          });
        });
      });
      var x = this.editable(h.value, l);
      if (x === !1)
        throw new Error("Update: Can't make changes in uneditable " + h);
      if (x === void 0) {
        if (i)
          throw new Error("Update: Loaded " + h + "but still can't figure out what editing protocol it supports.");
        this.store.fetcher.load(h).then((A) => {
          this.update(e, t, r, !0, s);
        }, (A) => {
          if (A.response.status === 404)
            this.update(e, t, r, !0, s);
          else
            throw new Error(`Update: Can't get updatability status ${h} before patching: ${A}`);
        });
        return;
      } else if (x.indexOf("SPARQL") >= 0 || x.indexOf("N3PATCH") >= 0) {
        var _ = x.indexOf("SPARQL") >= 0, R = [];
        u.length && (R = this.statementArrayBnodes(u)), c.length && (R = R.concat(this.statementArrayBnodes(c)));
        var G = this.bnodeContext(R, h), Y = _ ? this.constructSparqlUpdateQuery(u, c, G) : this.constructN3PatchQuery(u, c, G);
        s.contentType = _ ? "application/sparql-update" : "text/n3", f.pendingUpstream = f.pendingUpstream ? f.pendingUpstream + 1 : 1, "upstreamCount" in f && (f.upstreamCount += 1), this.fire(h.value, Y, (A, K, M, j) => {
          if (j.elapsedTimeMs = Date.now() - m, K) {
            try {
              l.remove(u);
            } catch (H) {
              K = !1, M = "Remote Ok BUT error deleting " + u.length + " from store!!! " + H;
            }
            for (let H = 0; H < c.length; H++)
              l.add(c[H].subject, c[H].predicate, c[H].object, h);
          }
          if (r(A, K, M, j), f.pendingUpstream -= 1, f.pendingUpstream === 0 && f.downstreamAction) {
            var k = f.downstreamAction;
            delete f.downstreamAction, k(h);
          }
        }, s);
      } else if (x.indexOf("DAV") >= 0)
        this.updateDav(h, u, c, r, s);
      else if (x.indexOf("LOCALFILE") >= 0)
        try {
          this.updateLocalFile(h, u, c, r, s);
        } catch {
          r(
            h.value,
            !1,
            "Exception trying to write back file <" + h.value + `>
`
            // + tabulator.Util.stackString(e))
          );
        }
      else
        throw new Error("Unhandled edit method: '" + x + "' for " + h);
    } catch (A) {
      r(void 0, !1, "Exception in update: " + A + `
` + nd(A));
    }
  }
  updateDav(e, t, r, i, s = {}) {
    let a = this.store;
    var l = a.any(e, this.ns.link("request"));
    if (!l)
      throw new Error("No record of our HTTP GET request for document: " + e);
    var u = a.any(l, this.ns.link("response"));
    if (!u)
      return null;
    var c = a.the(u, this.ns.httph("content-type")).value;
    let h = a.statementsMatching(void 0, void 0, void 0, e).slice();
    for (let w = 0; w < t.length; w++)
      fi(h, t[w]);
    for (let w = 0; w < r.length; w++)
      h.push(r[w]);
    const f = this.serialize(e.value, h, c);
    var m = a.the(u, this.ns.httph("content-location")), v;
    return m && (v = Dt(m.value, v)), s.contentType = c, s.noMeta = !0, s.body = f, a.fetcher.webOperation("PUT", v, s).then((w) => {
      if (!w.ok)
        throw new Error(w.error);
      for (let b = 0; b < t.length; b++)
        a.remove(t[b]);
      for (let b = 0; b < r.length; b++)
        a.add(r[b].subject, r[b].predicate, r[b].object, e);
      i(e.value, w.ok, w.responseText, w);
    }).catch((w) => {
      i(e.value, !1, w.message, w);
    });
  }
  /**
   * Likely deprecated, since this lib no longer deals with browser extension
   *
   * @param doc
   * @param ds
   * @param is
   * @param callbackFunction
   * @param options
   */
  updateLocalFile(e, t, r, i, s = {}) {
    const a = this.store;
    let l = a.statementsMatching(void 0, void 0, void 0, e).slice();
    for (let f = 0; f < t.length; f++)
      fi(l, t[f]);
    for (let f = 0; f < r.length; f++)
      l.push(r[f]);
    var u = e.value.lastIndexOf(".");
    if (u < 1)
      throw new Error("Rewriting file: No filename extension: " + e.value);
    var c = e.value.slice(u + 1);
    let h = rt.CONTENT_TYPE_BY_EXT[c];
    if (!h)
      throw new Error("File extension ." + c + " not supported for data write");
    s.body = this.serialize(e.value, l, h), s.contentType = h, a.fetcher.webOperation("PUT", e.value, s).then((f) => {
      if (!f.ok) return i(e.value, !1, f.error);
      for (let m = 0; m < t.length; m++)
        a.remove(t[m]);
      for (let m = 0; m < r.length; m++)
        a.add(r[m].subject, r[m].predicate, r[m].object, e);
      i(e.value, !0, "");
    });
  }
  /**
   * @throws {Error} On unsupported content type
   *
   * @returns {string}
   */
  serialize(e, t, r) {
    const i = this.store;
    let s;
    if (typeof t == "string")
      return t;
    var a = Ul(i);
    switch (a.suggestNamespaces(i.namespaces), a.setBase(e), r) {
      case "text/xml":
      case "application/rdf+xml":
        s = a.statementsToXML(t);
        break;
      case "text/n3":
      case "text/turtle":
      case "application/x-turtle":
      // Legacy
      case "application/n3":
        s = a.statementsToN3(t);
        break;
      default:
        throw new Error("Content-type " + r + " not supported for data serialization");
    }
    return s;
  }
  /**
   * This is suitable for an initial creation of a document.
   */
  put(e, t, r, i) {
    const s = this.store;
    let a;
    return Promise.resolve().then(() => (a = this.serialize(e.value, t, r), s.fetcher.webOperation("PUT", e.value, {
      contentType: r,
      body: a
    }))).then((l) => {
      if (!l.ok)
        return i(e.value, l.ok, l.error, l);
      delete s.fetcher.nonexistent[e.value], delete s.fetcher.requested[e.value], typeof t != "string" && t.map((u) => {
        s.addStatement(u);
      }), i(e.value, l.ok, "", l);
    }).catch((l) => {
      i(e.value, !1, l.message);
    });
  }
  /**
   * Reloads a document.
   *
   * Fast and cheap, no metadata. Measure times for the document.
   * Load it provisionally.
   * Don't delete the statements before the load, or it will leave a broken
   * document in the meantime.
   *
   * @param kb
   * @param doc {RDFlibNamedNode}
   * @param callbackFunction
   */
  reload(e, t, r) {
    var i = Date.now();
    const s = {
      force: !0,
      noMeta: !0,
      clearPreviousData: !0
    };
    e.fetcher.nowOrWhenFetched(t.value, s, function(a, l, u) {
      if (!a)
        r(!1, "Error reloading data: " + l, u);
      else if (u.onErrorWasCalled || u.status !== 200)
        r(!1, "Non-HTTP error reloading data: " + l, u);
      else {
        var c = Date.now() - i;
        t.reloadTimeTotal || (t.reloadTimeTotal = 0), t.reloadTimeCount || (t.reloadTimeCount = 0), t.reloadTimeTotal += c, t.reloadTimeCount += 1, r(!0);
      }
    });
  }
}
const fa = {
  ...pi,
  /**
   * Creates a new fetcher
   * @param store - The store to use
   * @param options - The options
   */
  fetcher(n, e) {
    return new rt(n, e);
  },
  /**
   * Creates a new graph (store)
   */
  graph(n = void 0, e = void 0) {
    return new yn(n, e || {
      rdfFactory: pi
    });
  },
  /**
   * Creates a new literal node
   * @param val The lexical value
   * @param lang The language
   * @param dt The datatype
   */
  lit(n, e, t) {
    return this.literal("" + n, e || t);
  },
  /**
   * Creates a new statement
   * @param subject The subject
   * @param predicate The predicate
   * @param object The object
   * @param graph The containing graph
   */
  st(n, e, t, r) {
    return this.quad(n, e, t, r);
  }
}, io = {};
for (const n in fa)
  typeof fa[n] == "function" && (io[n] = fa[n].bind(fa));
const {
  graph: Jd,
  lit: Qs,
  namedNode: mn
} = io;
new Ur();
Xe.fromValue;
nn.nextId;
function so(n) {
  const e = Jd(), t = {};
  n?.fetch && (t.fetch = n.fetch);
  const r = new rt(e, t);
  e.updater = new zd(e);
  async function i(s) {
    const a = s.replace(/#.*$/, ""), l = mn(a);
    return await r.load(l), l;
  }
  return { store: e, fetcher: r, fetchDocument: i };
}
const ya = [];
function Ie(n) {
  ya.push(n);
}
function Ta(n, e) {
  const t = [];
  for (let r = ya.length - 1; r >= 0; r--)
    try {
      ya[r].canHandle(n, e) && t.push(ya[r]);
    } catch {
    }
  return t;
}
const Da = new TextEncoder(), dr = new TextDecoder();
function lo(...n) {
  const e = n.reduce((i, { length: s }) => i + s, 0), t = new Uint8Array(e);
  let r = 0;
  for (const i of n)
    t.set(i, r), r += i.length;
  return t;
}
function Vn(n) {
  const e = new Uint8Array(n.length);
  for (let t = 0; t < n.length; t++) {
    const r = n.charCodeAt(t);
    if (r > 127)
      throw new TypeError("non-ASCII string encountered in encode()");
    e[t] = r;
  }
  return e;
}
function Yd(n) {
  if (Uint8Array.prototype.toBase64)
    return n.toBase64();
  const e = 32768, t = [];
  for (let r = 0; r < n.length; r += e)
    t.push(String.fromCharCode.apply(null, n.subarray(r, r + e)));
  return btoa(t.join(""));
}
function Qd(n) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(n);
  const e = atob(n), t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r);
  return t;
}
function lr(n) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(typeof n == "string" ? n : dr.decode(n), {
      alphabet: "base64url"
    });
  let e = n;
  e instanceof Uint8Array && (e = dr.decode(e)), e = e.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return Qd(e);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}
function Fr(n) {
  let e = n;
  return typeof e == "string" && (e = Da.encode(e)), Uint8Array.prototype.toBase64 ? e.toBase64({ alphabet: "base64url", omitPadding: !0 }) : Yd(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
class _t extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(e, t) {
    super(e, t), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
}
class zt extends _t {
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(e, t, r = "unspecified", i = "unspecified") {
    super(e, { cause: { claim: r, reason: i, payload: t } }), this.claim = r, this.reason = i, this.payload = t;
  }
}
class Zs extends _t {
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(e, t, r = "unspecified", i = "unspecified") {
    super(e, { cause: { claim: r, reason: i, payload: t } }), this.claim = r, this.reason = i, this.payload = t;
  }
}
class Zd extends _t {
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
}
class Tt extends _t {
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
}
class Ze extends _t {
  static code = "ERR_JWS_INVALID";
  code = "ERR_JWS_INVALID";
}
class Zt extends _t {
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
}
class eh extends _t {
  static code = "ERR_JWK_INVALID";
  code = "ERR_JWK_INVALID";
}
class oo extends _t {
  static code = "ERR_JWKS_INVALID";
  code = "ERR_JWKS_INVALID";
}
class uo extends _t {
  static code = "ERR_JWKS_NO_MATCHING_KEY";
  code = "ERR_JWKS_NO_MATCHING_KEY";
  constructor(e = "no applicable key found in the JSON Web Key Set", t) {
    super(e, t);
  }
}
class th extends _t {
  [Symbol.asyncIterator];
  static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  constructor(e = "multiple matching keys found in the JSON Web Key Set", t) {
    super(e, t);
  }
}
class nh extends _t {
  static code = "ERR_JWKS_TIMEOUT";
  code = "ERR_JWKS_TIMEOUT";
  constructor(e = "request timed out", t) {
    super(e, t);
  }
}
class rh extends _t {
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(e = "signature verification failed", t) {
    super(e, t);
  }
}
const Jt = (n, e = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${e} must be ${n}`), Qn = (n, e) => n.name === e;
function ni(n) {
  return parseInt(n.name.slice(4), 10);
}
function ah(n) {
  switch (n) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function ih(n, e) {
  if (e && !n.usages.includes(e))
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${e}.`);
}
function sh(n, e, t) {
  switch (e) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!Qn(n.algorithm, "HMAC"))
        throw Jt("HMAC");
      const r = parseInt(e.slice(2), 10);
      if (ni(n.algorithm.hash) !== r)
        throw Jt(`SHA-${r}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!Qn(n.algorithm, "RSASSA-PKCS1-v1_5"))
        throw Jt("RSASSA-PKCS1-v1_5");
      const r = parseInt(e.slice(2), 10);
      if (ni(n.algorithm.hash) !== r)
        throw Jt(`SHA-${r}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!Qn(n.algorithm, "RSA-PSS"))
        throw Jt("RSA-PSS");
      const r = parseInt(e.slice(2), 10);
      if (ni(n.algorithm.hash) !== r)
        throw Jt(`SHA-${r}`, "algorithm.hash");
      break;
    }
    case "Ed25519":
    case "EdDSA": {
      if (!Qn(n.algorithm, "Ed25519"))
        throw Jt("Ed25519");
      break;
    }
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87": {
      if (!Qn(n.algorithm, e))
        throw Jt(e);
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!Qn(n.algorithm, "ECDSA"))
        throw Jt("ECDSA");
      const r = ah(e);
      if (n.algorithm.namedCurve !== r)
        throw Jt(r, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  ih(n, t);
}
function co(n, e, ...t) {
  if (t = t.filter(Boolean), t.length > 2) {
    const r = t.pop();
    n += `one of type ${t.join(", ")}, or ${r}.`;
  } else t.length === 2 ? n += `one of type ${t[0]} or ${t[1]}.` : n += `of type ${t[0]}.`;
  return e == null ? n += ` Received ${e}` : typeof e == "function" && e.name ? n += ` Received function ${e.name}` : typeof e == "object" && e != null && e.constructor?.name && (n += ` Received an instance of ${e.constructor.name}`), n;
}
const Bi = (n, ...e) => co("Key must be ", n, ...e), ho = (n, e, ...t) => co(`Key for the ${n} algorithm must be `, e, ...t), Ri = (n) => {
  if (n?.[Symbol.toStringTag] === "CryptoKey")
    return !0;
  try {
    return n instanceof CryptoKey;
  } catch {
    return !1;
  }
}, ki = (n) => n?.[Symbol.toStringTag] === "KeyObject", Oi = (n) => Ri(n) || ki(n);
function fo(...n) {
  const e = n.filter(Boolean);
  if (e.length === 0 || e.length === 1)
    return !0;
  let t;
  for (const r of e) {
    const i = Object.keys(r);
    if (!t || t.size === 0) {
      t = new Set(i);
      continue;
    }
    for (const s of i) {
      if (t.has(s))
        return !1;
      t.add(s);
    }
  }
  return !0;
}
const lh = (n) => typeof n == "object" && n !== null;
function sn(n) {
  if (!lh(n) || Object.prototype.toString.call(n) !== "[object Object]")
    return !1;
  if (Object.getPrototypeOf(n) === null)
    return !0;
  let e = n;
  for (; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(n) === e;
}
async function oh(n, e) {
  const t = `SHA-${n.slice(-3)}`;
  return new Uint8Array(await crypto.subtle.digest(t, e));
}
function po(n, e) {
  if (n.startsWith("RS") || n.startsWith("PS")) {
    const { modulusLength: t } = e.algorithm;
    if (typeof t != "number" || t < 2048)
      throw new TypeError(`${n} requires key modulusLength to be 2048 bits or larger`);
  }
}
function uh(n) {
  let e, t;
  switch (n.kty) {
    case "AKP": {
      switch (n.alg) {
        case "ML-DSA-44":
        case "ML-DSA-65":
        case "ML-DSA-87":
          e = { name: n.alg }, t = n.priv ? ["sign"] : ["verify"];
          break;
        default:
          throw new Tt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "RSA": {
      switch (n.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          e = { name: "RSA-PSS", hash: `SHA-${n.alg.slice(-3)}` }, t = n.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          e = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${n.alg.slice(-3)}` }, t = n.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          e = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(n.alg.slice(-3), 10) || 1}`
          }, t = n.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new Tt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (n.alg) {
        case "ES256":
          e = { name: "ECDSA", namedCurve: "P-256" }, t = n.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          e = { name: "ECDSA", namedCurve: "P-384" }, t = n.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          e = { name: "ECDSA", namedCurve: "P-521" }, t = n.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          e = { name: "ECDH", namedCurve: n.crv }, t = n.d ? ["deriveBits"] : [];
          break;
        default:
          throw new Tt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (n.alg) {
        case "Ed25519":
        case "EdDSA":
          e = { name: "Ed25519" }, t = n.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          e = { name: n.crv }, t = n.d ? ["deriveBits"] : [];
          break;
        default:
          throw new Tt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new Tt('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm: e, keyUsages: t };
}
async function va(n) {
  if (!n.alg)
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  const { algorithm: e, keyUsages: t } = uh(n), r = { ...n };
  return r.kty !== "AKP" && delete r.alg, delete r.use, crypto.subtle.importKey("jwk", r, e, n.ext ?? !(n.d || n.priv), n.key_ops ?? t);
}
async function ch(n, e, t) {
  if (!sn(n))
    throw new TypeError("JWK must be an object");
  let r;
  switch (e ??= n.alg, r ??= n.ext, n.kty) {
    case "oct":
      if (typeof n.k != "string" || !n.k)
        throw new TypeError('missing "k" (Key Value) Parameter value');
      return lr(n.k);
    case "RSA":
      if ("oth" in n && n.oth !== void 0)
        throw new Tt('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
      return va({ ...n, alg: e, ext: r });
    case "AKP": {
      if (typeof n.alg != "string" || !n.alg)
        throw new TypeError('missing "alg" (Algorithm) Parameter value');
      if (e !== void 0 && e !== n.alg)
        throw new TypeError("JWK alg and alg option value mismatch");
      return va({ ...n, ext: r });
    }
    case "EC":
    case "OKP":
      return va({ ...n, alg: e, ext: r });
    default:
      throw new Tt('Unsupported "kty" (Key Type) Parameter value');
  }
}
function mo(n, e, t, r, i) {
  if (i.crit !== void 0 && r?.crit === void 0)
    throw new n('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!r || r.crit === void 0)
    return /* @__PURE__ */ new Set();
  if (!Array.isArray(r.crit) || r.crit.length === 0 || r.crit.some((a) => typeof a != "string" || a.length === 0))
    throw new n('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  let s;
  t !== void 0 ? s = new Map([...Object.entries(t), ...e.entries()]) : s = e;
  for (const a of r.crit) {
    if (!s.has(a))
      throw new Tt(`Extension Header Parameter "${a}" is not recognized`);
    if (i[a] === void 0)
      throw new n(`Extension Header Parameter "${a}" is missing`);
    if (s.get(a) && r[a] === void 0)
      throw new n(`Extension Header Parameter "${a}" MUST be integrity protected`);
  }
  return new Set(r.crit);
}
function dh(n, e) {
  if (e !== void 0 && (!Array.isArray(e) || e.some((t) => typeof t != "string")))
    throw new TypeError(`"${n}" option must be an array of strings`);
  if (e)
    return new Set(e);
}
const Fa = (n) => sn(n) && typeof n.kty == "string", hh = (n) => n.kty !== "oct" && (n.kty === "AKP" && typeof n.priv == "string" || typeof n.d == "string"), fh = (n) => n.kty !== "oct" && n.d === void 0 && n.priv === void 0, ph = (n) => n.kty === "oct" && typeof n.k == "string";
let or;
const el = async (n, e, t, r = !1) => {
  or ||= /* @__PURE__ */ new WeakMap();
  let i = or.get(n);
  if (i?.[t])
    return i[t];
  const s = await va({ ...e, alg: t });
  return r && Object.freeze(n), i ? i[t] = s : or.set(n, { [t]: s }), s;
}, mh = (n, e) => {
  or ||= /* @__PURE__ */ new WeakMap();
  let t = or.get(n);
  if (t?.[e])
    return t[e];
  const r = n.type === "public", i = !!r;
  let s;
  if (n.asymmetricKeyType === "x25519") {
    switch (e) {
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW":
        break;
      default:
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    s = n.toCryptoKey(n.asymmetricKeyType, i, r ? [] : ["deriveBits"]);
  }
  if (n.asymmetricKeyType === "ed25519") {
    if (e !== "EdDSA" && e !== "Ed25519")
      throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    s = n.toCryptoKey(n.asymmetricKeyType, i, [
      r ? "verify" : "sign"
    ]);
  }
  switch (n.asymmetricKeyType) {
    case "ml-dsa-44":
    case "ml-dsa-65":
    case "ml-dsa-87": {
      if (e !== n.asymmetricKeyType.toUpperCase())
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
      s = n.toCryptoKey(n.asymmetricKeyType, i, [
        r ? "verify" : "sign"
      ]);
    }
  }
  if (n.asymmetricKeyType === "rsa") {
    let a;
    switch (e) {
      case "RSA-OAEP":
        a = "SHA-1";
        break;
      case "RS256":
      case "PS256":
      case "RSA-OAEP-256":
        a = "SHA-256";
        break;
      case "RS384":
      case "PS384":
      case "RSA-OAEP-384":
        a = "SHA-384";
        break;
      case "RS512":
      case "PS512":
      case "RSA-OAEP-512":
        a = "SHA-512";
        break;
      default:
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    if (e.startsWith("RSA-OAEP"))
      return n.toCryptoKey({
        name: "RSA-OAEP",
        hash: a
      }, i, r ? ["encrypt"] : ["decrypt"]);
    s = n.toCryptoKey({
      name: e.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
      hash: a
    }, i, [r ? "verify" : "sign"]);
  }
  if (n.asymmetricKeyType === "ec") {
    const l = (/* @__PURE__ */ new Map([
      ["prime256v1", "P-256"],
      ["secp384r1", "P-384"],
      ["secp521r1", "P-521"]
    ])).get(n.asymmetricKeyDetails?.namedCurve);
    if (!l)
      throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    e === "ES256" && l === "P-256" && (s = n.toCryptoKey({
      name: "ECDSA",
      namedCurve: l
    }, i, [r ? "verify" : "sign"])), e === "ES384" && l === "P-384" && (s = n.toCryptoKey({
      name: "ECDSA",
      namedCurve: l
    }, i, [r ? "verify" : "sign"])), e === "ES512" && l === "P-521" && (s = n.toCryptoKey({
      name: "ECDSA",
      namedCurve: l
    }, i, [r ? "verify" : "sign"])), e.startsWith("ECDH-ES") && (s = n.toCryptoKey({
      name: "ECDH",
      namedCurve: l
    }, i, r ? [] : ["deriveBits"]));
  }
  if (!s)
    throw new TypeError("given KeyObject instance cannot be used for this algorithm");
  return t ? t[e] = s : or.set(n, { [e]: s }), s;
};
async function go(n, e) {
  if (n instanceof Uint8Array || Ri(n))
    return n;
  if (ki(n)) {
    if (n.type === "secret")
      return n.export();
    if ("toCryptoKey" in n && typeof n.toCryptoKey == "function")
      try {
        return mh(n, e);
      } catch (r) {
        if (r instanceof TypeError)
          throw r;
      }
    let t = n.export({ format: "jwk" });
    return el(n, t, e);
  }
  if (Fa(n))
    return n.k ? lr(n.k) : el(n, n, e, !0);
  throw new Error("unreachable");
}
const ir = (n) => n?.[Symbol.toStringTag], vi = (n, e, t) => {
  if (e.use !== void 0) {
    let r;
    switch (t) {
      case "sign":
      case "verify":
        r = "sig";
        break;
      case "encrypt":
      case "decrypt":
        r = "enc";
        break;
    }
    if (e.use !== r)
      throw new TypeError(`Invalid key for this operation, its "use" must be "${r}" when present`);
  }
  if (e.alg !== void 0 && e.alg !== n)
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${n}" when present`);
  if (Array.isArray(e.key_ops)) {
    let r;
    switch (!0) {
      case (t === "sign" || t === "verify"):
      case n === "dir":
      case n.includes("CBC-HS"):
        r = t;
        break;
      case n.startsWith("PBES2"):
        r = "deriveBits";
        break;
      case /^A\d{3}(?:GCM)?(?:KW)?$/.test(n):
        !n.includes("GCM") && n.endsWith("KW") ? r = t === "encrypt" ? "wrapKey" : "unwrapKey" : r = t;
        break;
      case (t === "encrypt" && n.startsWith("RSA")):
        r = "wrapKey";
        break;
      case t === "decrypt":
        r = n.startsWith("RSA") ? "unwrapKey" : "deriveBits";
        break;
    }
    if (r && e.key_ops?.includes?.(r) === !1)
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${r}" when present`);
  }
  return !0;
}, gh = (n, e, t) => {
  if (!(e instanceof Uint8Array)) {
    if (Fa(e)) {
      if (ph(e) && vi(n, e, t))
        return;
      throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
    }
    if (!Oi(e))
      throw new TypeError(ho(n, e, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
    if (e.type !== "secret")
      throw new TypeError(`${ir(e)} instances for symmetric algorithms must be of type "secret"`);
  }
}, yh = (n, e, t) => {
  if (Fa(e))
    switch (t) {
      case "decrypt":
      case "sign":
        if (hh(e) && vi(n, e, t))
          return;
        throw new TypeError("JSON Web Key for this operation must be a private JWK");
      case "encrypt":
      case "verify":
        if (fh(e) && vi(n, e, t))
          return;
        throw new TypeError("JSON Web Key for this operation must be a public JWK");
    }
  if (!Oi(e))
    throw new TypeError(ho(n, e, "CryptoKey", "KeyObject", "JSON Web Key"));
  if (e.type === "secret")
    throw new TypeError(`${ir(e)} instances for asymmetric algorithms must not be of type "secret"`);
  if (e.type === "public")
    switch (t) {
      case "sign":
        throw new TypeError(`${ir(e)} instances for asymmetric algorithm signing must be of type "private"`);
      case "decrypt":
        throw new TypeError(`${ir(e)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
  if (e.type === "private")
    switch (t) {
      case "verify":
        throw new TypeError(`${ir(e)} instances for asymmetric algorithm verifying must be of type "public"`);
      case "encrypt":
        throw new TypeError(`${ir(e)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
function yo(n, e, t) {
  switch (n.substring(0, 2)) {
    case "A1":
    case "A2":
    case "di":
    case "HS":
    case "PB":
      gh(n, e, t);
      break;
    default:
      yh(n, e, t);
  }
}
async function vh(n) {
  if (ki(n))
    if (n.type === "secret")
      n = n.export();
    else
      return n.export({ format: "jwk" });
  if (n instanceof Uint8Array)
    return {
      kty: "oct",
      k: Fr(n)
    };
  if (!Ri(n))
    throw new TypeError(Bi(n, "CryptoKey", "KeyObject", "Uint8Array"));
  if (!n.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  const { ext: e, key_ops: t, alg: r, use: i, ...s } = await crypto.subtle.exportKey("jwk", n);
  return s.kty === "AKP" && (s.alg = r), s;
}
async function Ui(n) {
  return vh(n);
}
function vo(n, e) {
  const t = `SHA-${n.slice(-3)}`;
  switch (n) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash: t, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash: t, name: "RSA-PSS", saltLength: parseInt(n.slice(-3), 10) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash: t, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash: t, name: "ECDSA", namedCurve: e.namedCurve };
    case "Ed25519":
    case "EdDSA":
      return { name: "Ed25519" };
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      return { name: n };
    default:
      throw new Tt(`alg ${n} is not supported either by JOSE or your javascript runtime`);
  }
}
async function wo(n, e, t) {
  if (e instanceof Uint8Array) {
    if (!n.startsWith("HS"))
      throw new TypeError(Bi(e, "CryptoKey", "KeyObject", "JSON Web Key"));
    return crypto.subtle.importKey("raw", e, { hash: `SHA-${n.slice(-3)}`, name: "HMAC" }, !1, [t]);
  }
  return sh(e, n, t), e;
}
async function wh(n, e, t, r) {
  const i = await wo(n, e, "verify");
  po(n, i);
  const s = vo(n, i.algorithm);
  try {
    return await crypto.subtle.verify(s, i, t, r);
  } catch {
    return !1;
  }
}
async function Eh(n, e, t) {
  if (!sn(n))
    throw new Ze("Flattened JWS must be an object");
  if (n.protected === void 0 && n.header === void 0)
    throw new Ze('Flattened JWS must have either of the "protected" or "header" members');
  if (n.protected !== void 0 && typeof n.protected != "string")
    throw new Ze("JWS Protected Header incorrect type");
  if (n.payload === void 0)
    throw new Ze("JWS Payload missing");
  if (typeof n.signature != "string")
    throw new Ze("JWS Signature missing or incorrect type");
  if (n.header !== void 0 && !sn(n.header))
    throw new Ze("JWS Unprotected Header incorrect type");
  let r = {};
  if (n.protected)
    try {
      const x = lr(n.protected);
      r = JSON.parse(dr.decode(x));
    } catch {
      throw new Ze("JWS Protected Header is invalid");
    }
  if (!fo(r, n.header))
    throw new Ze("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  const i = {
    ...r,
    ...n.header
  }, s = mo(Ze, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, r, i);
  let a = !0;
  if (s.has("b64") && (a = r.b64, typeof a != "boolean"))
    throw new Ze('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
  const { alg: l } = i;
  if (typeof l != "string" || !l)
    throw new Ze('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  const u = t && dh("algorithms", t.algorithms);
  if (u && !u.has(l))
    throw new Zd('"alg" (Algorithm) Header Parameter value not allowed');
  if (a) {
    if (typeof n.payload != "string")
      throw new Ze("JWS Payload must be a string");
  } else if (typeof n.payload != "string" && !(n.payload instanceof Uint8Array))
    throw new Ze("JWS Payload must be a string or an Uint8Array instance");
  let c = !1;
  typeof e == "function" && (e = await e(r, n), c = !0), yo(l, e, "verify");
  const h = lo(n.protected !== void 0 ? Vn(n.protected) : new Uint8Array(), Vn("."), typeof n.payload == "string" ? a ? Vn(n.payload) : Da.encode(n.payload) : n.payload);
  let f;
  try {
    f = lr(n.signature);
  } catch {
    throw new Ze("Failed to base64url decode the signature");
  }
  const m = await go(e, l);
  if (!await wh(l, m, f, h))
    throw new rh();
  let w;
  if (a)
    try {
      w = lr(n.payload);
    } catch {
      throw new Ze("Failed to base64url decode the payload");
    }
  else typeof n.payload == "string" ? w = Da.encode(n.payload) : w = n.payload;
  const b = { payload: w };
  return n.protected !== void 0 && (b.protectedHeader = r), n.header !== void 0 && (b.unprotectedHeader = n.header), c ? { ...b, key: m } : b;
}
async function Ch(n, e, t) {
  if (n instanceof Uint8Array && (n = dr.decode(n)), typeof n != "string")
    throw new Ze("Compact JWS must be a string or Uint8Array");
  const { 0: r, 1: i, 2: s, length: a } = n.split(".");
  if (a !== 3)
    throw new Ze("Invalid Compact JWS");
  const l = await Eh({ payload: i, protected: r, signature: s }, e, t), u = { payload: l.payload, protectedHeader: l.protectedHeader };
  return typeof e == "function" ? { ...u, key: l.key } : u;
}
const Cn = (n) => Math.floor(n.getTime() / 1e3), Eo = 60, Co = Eo * 60, Mi = Co * 24, bh = Mi * 7, Nh = Mi * 365.25, Ah = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function Ir(n) {
  const e = Ah.exec(n);
  if (!e || e[4] && e[1])
    throw new TypeError("Invalid time period format");
  const t = parseFloat(e[2]), r = e[3].toLowerCase();
  let i;
  switch (r) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      i = Math.round(t);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      i = Math.round(t * Eo);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      i = Math.round(t * Co);
      break;
    case "day":
    case "days":
    case "d":
      i = Math.round(t * Mi);
      break;
    case "week":
    case "weeks":
    case "w":
      i = Math.round(t * bh);
      break;
    default:
      i = Math.round(t * Nh);
      break;
  }
  return e[1] === "-" || e[4] === "ago" ? -i : i;
}
function kn(n, e) {
  if (!Number.isFinite(e))
    throw new TypeError(`Invalid ${n} input`);
  return e;
}
const tl = (n) => n.includes("/") ? n.toLowerCase() : `application/${n.toLowerCase()}`, xh = (n, e) => typeof n == "string" ? e.includes(n) : Array.isArray(n) ? e.some(Set.prototype.has.bind(new Set(n))) : !1;
function Th(n, e, t = {}) {
  let r;
  try {
    r = JSON.parse(dr.decode(e));
  } catch {
  }
  if (!sn(r))
    throw new Zt("JWT Claims Set must be a top-level JSON object");
  const { typ: i } = t;
  if (i && (typeof n.typ != "string" || tl(n.typ) !== tl(i)))
    throw new zt('unexpected "typ" JWT header value', r, "typ", "check_failed");
  const { requiredClaims: s = [], issuer: a, subject: l, audience: u, maxTokenAge: c } = t, h = [...s];
  c !== void 0 && h.push("iat"), u !== void 0 && h.push("aud"), l !== void 0 && h.push("sub"), a !== void 0 && h.push("iss");
  for (const w of new Set(h.reverse()))
    if (!(w in r))
      throw new zt(`missing required "${w}" claim`, r, w, "missing");
  if (a && !(Array.isArray(a) ? a : [a]).includes(r.iss))
    throw new zt('unexpected "iss" claim value', r, "iss", "check_failed");
  if (l && r.sub !== l)
    throw new zt('unexpected "sub" claim value', r, "sub", "check_failed");
  if (u && !xh(r.aud, typeof u == "string" ? [u] : u))
    throw new zt('unexpected "aud" claim value', r, "aud", "check_failed");
  let f;
  switch (typeof t.clockTolerance) {
    case "string":
      f = Ir(t.clockTolerance);
      break;
    case "number":
      f = t.clockTolerance;
      break;
    case "undefined":
      f = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate: m } = t, v = Cn(m || /* @__PURE__ */ new Date());
  if ((r.iat !== void 0 || c) && typeof r.iat != "number")
    throw new zt('"iat" claim must be a number', r, "iat", "invalid");
  if (r.nbf !== void 0) {
    if (typeof r.nbf != "number")
      throw new zt('"nbf" claim must be a number', r, "nbf", "invalid");
    if (r.nbf > v + f)
      throw new zt('"nbf" claim timestamp check failed', r, "nbf", "check_failed");
  }
  if (r.exp !== void 0) {
    if (typeof r.exp != "number")
      throw new zt('"exp" claim must be a number', r, "exp", "invalid");
    if (r.exp <= v - f)
      throw new Zs('"exp" claim timestamp check failed', r, "exp", "check_failed");
  }
  if (c) {
    const w = v - r.iat, b = typeof c == "number" ? c : Ir(c);
    if (w - f > b)
      throw new Zs('"iat" claim timestamp check failed (too far in the past)', r, "iat", "check_failed");
    if (w < 0 - f)
      throw new zt('"iat" claim timestamp check failed (it should be in the past)', r, "iat", "check_failed");
  }
  return r;
}
class Dh {
  #e;
  constructor(e) {
    if (!sn(e))
      throw new TypeError("JWT Claims Set MUST be an object");
    this.#e = structuredClone(e);
  }
  data() {
    return Da.encode(JSON.stringify(this.#e));
  }
  get iss() {
    return this.#e.iss;
  }
  set iss(e) {
    this.#e.iss = e;
  }
  get sub() {
    return this.#e.sub;
  }
  set sub(e) {
    this.#e.sub = e;
  }
  get aud() {
    return this.#e.aud;
  }
  set aud(e) {
    this.#e.aud = e;
  }
  set jti(e) {
    this.#e.jti = e;
  }
  set nbf(e) {
    typeof e == "number" ? this.#e.nbf = kn("setNotBefore", e) : e instanceof Date ? this.#e.nbf = kn("setNotBefore", Cn(e)) : this.#e.nbf = Cn(/* @__PURE__ */ new Date()) + Ir(e);
  }
  set exp(e) {
    typeof e == "number" ? this.#e.exp = kn("setExpirationTime", e) : e instanceof Date ? this.#e.exp = kn("setExpirationTime", Cn(e)) : this.#e.exp = Cn(/* @__PURE__ */ new Date()) + Ir(e);
  }
  set iat(e) {
    e === void 0 ? this.#e.iat = Cn(/* @__PURE__ */ new Date()) : e instanceof Date ? this.#e.iat = kn("setIssuedAt", Cn(e)) : typeof e == "string" ? this.#e.iat = kn("setIssuedAt", Cn(/* @__PURE__ */ new Date()) + Ir(e)) : this.#e.iat = kn("setIssuedAt", e);
  }
}
async function _h(n, e, t) {
  const r = await Ch(n, e, t);
  if (r.protectedHeader.crit?.includes("b64") && r.protectedHeader.b64 === !1)
    throw new Zt("JWTs MUST NOT use unencoded payload");
  const s = { payload: Th(r.protectedHeader, r.payload, t), protectedHeader: r.protectedHeader };
  return typeof e == "function" ? { ...s, key: r.key } : s;
}
async function Sh(n, e, t) {
  const r = await wo(n, e, "sign");
  po(n, r);
  const i = await crypto.subtle.sign(vo(n, r.algorithm), r, t);
  return new Uint8Array(i);
}
class Fh {
  #e;
  #t;
  #n;
  constructor(e) {
    if (!(e instanceof Uint8Array))
      throw new TypeError("payload must be an instance of Uint8Array");
    this.#e = e;
  }
  setProtectedHeader(e) {
    if (this.#t)
      throw new TypeError("setProtectedHeader can only be called once");
    return this.#t = e, this;
  }
  setUnprotectedHeader(e) {
    if (this.#n)
      throw new TypeError("setUnprotectedHeader can only be called once");
    return this.#n = e, this;
  }
  async sign(e, t) {
    if (!this.#t && !this.#n)
      throw new Ze("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    if (!fo(this.#t, this.#n))
      throw new Ze("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    const r = {
      ...this.#t,
      ...this.#n
    }, i = mo(Ze, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, this.#t, r);
    let s = !0;
    if (i.has("b64") && (s = this.#t.b64, typeof s != "boolean"))
      throw new Ze('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    const { alg: a } = r;
    if (typeof a != "string" || !a)
      throw new Ze('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    yo(a, e, "sign");
    let l, u;
    s ? (l = Fr(this.#e), u = Vn(l)) : (u = this.#e, l = "");
    let c, h;
    this.#t ? (c = Fr(JSON.stringify(this.#t)), h = Vn(c)) : (c = "", h = new Uint8Array());
    const f = lo(h, Vn("."), u), m = await go(e, a), v = await Sh(a, m, f), w = {
      signature: Fr(v),
      payload: l
    };
    return this.#n && (w.header = this.#n), this.#t && (w.protected = c), w;
  }
}
class Ih {
  #e;
  constructor(e) {
    this.#e = new Fh(e);
  }
  setProtectedHeader(e) {
    return this.#e.setProtectedHeader(e), this;
  }
  async sign(e, t) {
    const r = await this.#e.sign(e, t);
    if (r.payload === void 0)
      throw new TypeError("use the flattened module for creating JWS with b64: false");
    return `${r.protected}.${r.payload}.${r.signature}`;
  }
}
class Lh {
  #e;
  #t;
  constructor(e = {}) {
    this.#t = new Dh(e);
  }
  setIssuer(e) {
    return this.#t.iss = e, this;
  }
  setSubject(e) {
    return this.#t.sub = e, this;
  }
  setAudience(e) {
    return this.#t.aud = e, this;
  }
  setJti(e) {
    return this.#t.jti = e, this;
  }
  setNotBefore(e) {
    return this.#t.nbf = e, this;
  }
  setExpirationTime(e) {
    return this.#t.exp = e, this;
  }
  setIssuedAt(e) {
    return this.#t.iat = e, this;
  }
  setProtectedHeader(e) {
    return this.#e = e, this;
  }
  async sign(e, t) {
    const r = new Ih(this.#t.data());
    if (r.setProtectedHeader(this.#e), Array.isArray(this.#e?.crit) && this.#e.crit.includes("b64") && this.#e.b64 === !1)
      throw new Zt("JWTs MUST NOT use unencoded payload");
    return r.sign(e, t);
  }
}
const Yt = (n, e) => {
  if (typeof n != "string" || !n)
    throw new eh(`${e} missing or invalid`);
};
async function Bh(n, e) {
  let t;
  if (Fa(n))
    t = n;
  else if (Oi(n))
    t = await Ui(n);
  else
    throw new TypeError(Bi(n, "CryptoKey", "KeyObject", "JSON Web Key"));
  if (e ??= "sha256", e !== "sha256" && e !== "sha384" && e !== "sha512")
    throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
  let r;
  switch (t.kty) {
    case "AKP":
      Yt(t.alg, '"alg" (Algorithm) Parameter'), Yt(t.pub, '"pub" (Public key) Parameter'), r = { alg: t.alg, kty: t.kty, pub: t.pub };
      break;
    case "EC":
      Yt(t.crv, '"crv" (Curve) Parameter'), Yt(t.x, '"x" (X Coordinate) Parameter'), Yt(t.y, '"y" (Y Coordinate) Parameter'), r = { crv: t.crv, kty: t.kty, x: t.x, y: t.y };
      break;
    case "OKP":
      Yt(t.crv, '"crv" (Subtype of Key Pair) Parameter'), Yt(t.x, '"x" (Public Key) Parameter'), r = { crv: t.crv, kty: t.kty, x: t.x };
      break;
    case "RSA":
      Yt(t.e, '"e" (Exponent) Parameter'), Yt(t.n, '"n" (Modulus) Parameter'), r = { e: t.e, kty: t.kty, n: t.n };
      break;
    case "oct":
      Yt(t.k, '"k" (Key Value) Parameter'), r = { k: t.k, kty: t.kty };
      break;
    default:
      throw new Tt('"kty" (Key Type) Parameter missing or unsupported');
  }
  const i = Vn(JSON.stringify(r));
  return Fr(await oh(e, i));
}
function Rh(n) {
  switch (typeof n == "string" && n.slice(0, 2)) {
    case "RS":
    case "PS":
      return "RSA";
    case "ES":
      return "EC";
    case "Ed":
      return "OKP";
    case "ML":
      return "AKP";
    default:
      throw new Tt('Unsupported "alg" value for a JSON Web Key Set');
  }
}
function kh(n) {
  return n && typeof n == "object" && Array.isArray(n.keys) && n.keys.every(Oh);
}
function Oh(n) {
  return sn(n);
}
class Uh {
  #e;
  #t = /* @__PURE__ */ new WeakMap();
  constructor(e) {
    if (!kh(e))
      throw new oo("JSON Web Key Set malformed");
    this.#e = structuredClone(e);
  }
  jwks() {
    return this.#e;
  }
  async getKey(e, t) {
    const { alg: r, kid: i } = { ...e, ...t?.header }, s = Rh(r), a = this.#e.keys.filter((c) => {
      let h = s === c.kty;
      if (h && typeof i == "string" && (h = i === c.kid), h && (typeof c.alg == "string" || s === "AKP") && (h = r === c.alg), h && typeof c.use == "string" && (h = c.use === "sig"), h && Array.isArray(c.key_ops) && (h = c.key_ops.includes("verify")), h)
        switch (r) {
          case "ES256":
            h = c.crv === "P-256";
            break;
          case "ES384":
            h = c.crv === "P-384";
            break;
          case "ES512":
            h = c.crv === "P-521";
            break;
          case "Ed25519":
          case "EdDSA":
            h = c.crv === "Ed25519";
            break;
        }
      return h;
    }), { 0: l, length: u } = a;
    if (u === 0)
      throw new uo();
    if (u !== 1) {
      const c = new th(), h = this.#t;
      throw c[Symbol.asyncIterator] = async function* () {
        for (const f of a)
          try {
            yield await nl(h, f, r);
          } catch {
          }
      }, c;
    }
    return nl(this.#t, l, r);
  }
}
async function nl(n, e, t) {
  const r = n.get(e) || n.set(e, {}).get(e);
  if (r[t] === void 0) {
    const i = await ch({ ...e, ext: !0 }, t);
    if (i instanceof Uint8Array || i.type !== "public")
      throw new oo("JSON Web Key Set members must be public keys");
    r[t] = i;
  }
  return r[t];
}
function rl(n) {
  const e = new Uh(n), t = async (r, i) => e.getKey(r, i);
  return Object.defineProperties(t, {
    jwks: {
      value: () => structuredClone(e.jwks()),
      enumerable: !1,
      configurable: !1,
      writable: !1
    }
  }), t;
}
function Mh() {
  return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
let wi;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (wi = "jose/v6.1.3");
const Ph = /* @__PURE__ */ Symbol();
async function $h(n, e, t, r = fetch) {
  const i = await r(n, {
    method: "GET",
    signal: t,
    redirect: "manual",
    headers: e
  }).catch((s) => {
    throw s.name === "TimeoutError" ? new nh() : s;
  });
  if (i.status !== 200)
    throw new _t("Expected 200 OK from the JSON Web Key Set HTTP response");
  try {
    return await i.json();
  } catch {
    throw new _t("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
}
const ri = /* @__PURE__ */ Symbol();
function qh(n, e) {
  return !(typeof n != "object" || n === null || !("uat" in n) || typeof n.uat != "number" || Date.now() - n.uat >= e || !("jwks" in n) || !sn(n.jwks) || !Array.isArray(n.jwks.keys) || !Array.prototype.every.call(n.jwks.keys, sn));
}
class Hh {
  #e;
  #t;
  #n;
  #o;
  #i;
  #r;
  #a;
  #u;
  #s;
  #l;
  constructor(e, t) {
    if (!(e instanceof URL))
      throw new TypeError("url must be an instance of URL");
    this.#e = new URL(e.href), this.#t = typeof t?.timeoutDuration == "number" ? t?.timeoutDuration : 5e3, this.#n = typeof t?.cooldownDuration == "number" ? t?.cooldownDuration : 3e4, this.#o = typeof t?.cacheMaxAge == "number" ? t?.cacheMaxAge : 6e5, this.#a = new Headers(t?.headers), wi && !this.#a.has("User-Agent") && this.#a.set("User-Agent", wi), this.#a.has("accept") || (this.#a.set("accept", "application/json"), this.#a.append("accept", "application/jwk-set+json")), this.#u = t?.[Ph], t?.[ri] !== void 0 && (this.#l = t?.[ri], qh(t?.[ri], this.#o) && (this.#i = this.#l.uat, this.#s = rl(this.#l.jwks)));
  }
  pendingFetch() {
    return !!this.#r;
  }
  coolingDown() {
    return typeof this.#i == "number" ? Date.now() < this.#i + this.#n : !1;
  }
  fresh() {
    return typeof this.#i == "number" ? Date.now() < this.#i + this.#o : !1;
  }
  jwks() {
    return this.#s?.jwks();
  }
  async getKey(e, t) {
    (!this.#s || !this.fresh()) && await this.reload();
    try {
      return await this.#s(e, t);
    } catch (r) {
      if (r instanceof uo && this.coolingDown() === !1)
        return await this.reload(), this.#s(e, t);
      throw r;
    }
  }
  async reload() {
    this.#r && Mh() && (this.#r = void 0), this.#r ||= $h(this.#e.href, this.#a, AbortSignal.timeout(this.#t), this.#u).then((e) => {
      this.#s = rl(e), this.#l && (this.#l.uat = Date.now(), this.#l.jwks = e), this.#i = Date.now(), this.#r = void 0;
    }).catch((e) => {
      throw this.#r = void 0, e;
    }), await this.#r;
  }
}
function Wh(n, e) {
  const t = new Hh(n, e), r = async (i, s) => t.getKey(i, s);
  return Object.defineProperties(r, {
    coolingDown: {
      get: () => t.coolingDown(),
      enumerable: !0,
      configurable: !1
    },
    fresh: {
      get: () => t.fresh(),
      enumerable: !0,
      configurable: !1
    },
    reload: {
      value: () => t.reload(),
      enumerable: !0,
      configurable: !1,
      writable: !1
    },
    reloading: {
      get: () => t.pendingFetch(),
      enumerable: !0,
      configurable: !1
    },
    jwks: {
      value: () => t.jwks(),
      enumerable: !0,
      configurable: !1,
      writable: !1
    }
  }), r;
}
function Vh(n) {
  if (typeof n != "string")
    throw new Zt("JWTs must use Compact JWS serialization, JWT must be a string");
  const { 1: e, length: t } = n.split(".");
  if (t === 5)
    throw new Zt("Only JWTs using Compact JWS serialization can be decoded");
  if (t !== 3)
    throw new Zt("Invalid JWT");
  if (!e)
    throw new Zt("JWTs must contain a payload");
  let r;
  try {
    r = lr(e);
  } catch {
    throw new Zt("Failed to base64url decode the payload");
  }
  let i;
  try {
    i = JSON.parse(dr.decode(r));
  } catch {
    throw new Zt("Failed to parse the decoded payload as JSON");
  }
  if (!sn(i))
    throw new Zt("Invalid JWT Claims Set");
  return i;
}
function ai(n) {
  const e = n?.modulusLength ?? 2048;
  if (typeof e != "number" || e < 2048)
    throw new Tt("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
  return e;
}
async function Kh(n, e) {
  let t, r;
  switch (n) {
    case "PS256":
    case "PS384":
    case "PS512":
      t = {
        name: "RSA-PSS",
        hash: `SHA-${n.slice(-3)}`,
        publicExponent: Uint8Array.of(1, 0, 1),
        modulusLength: ai(e)
      }, r = ["sign", "verify"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      t = {
        name: "RSASSA-PKCS1-v1_5",
        hash: `SHA-${n.slice(-3)}`,
        publicExponent: Uint8Array.of(1, 0, 1),
        modulusLength: ai(e)
      }, r = ["sign", "verify"];
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      t = {
        name: "RSA-OAEP",
        hash: `SHA-${parseInt(n.slice(-3), 10) || 1}`,
        publicExponent: Uint8Array.of(1, 0, 1),
        modulusLength: ai(e)
      }, r = ["decrypt", "unwrapKey", "encrypt", "wrapKey"];
      break;
    case "ES256":
      t = { name: "ECDSA", namedCurve: "P-256" }, r = ["sign", "verify"];
      break;
    case "ES384":
      t = { name: "ECDSA", namedCurve: "P-384" }, r = ["sign", "verify"];
      break;
    case "ES512":
      t = { name: "ECDSA", namedCurve: "P-521" }, r = ["sign", "verify"];
      break;
    case "Ed25519":
    case "EdDSA": {
      r = ["sign", "verify"], t = { name: "Ed25519" };
      break;
    }
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87": {
      r = ["sign", "verify"], t = { name: n };
      break;
    }
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      r = ["deriveBits"];
      const i = "P-256";
      switch (i) {
        case "P-256":
        case "P-384":
        case "P-521": {
          t = { name: "ECDH", namedCurve: i };
          break;
        }
        case "X25519":
          t = { name: "X25519" };
          break;
        default:
          throw new Tt("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, and X25519");
      }
      break;
    }
    default:
      throw new Tt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
  }
  return crypto.subtle.generateKey(t, !1, r);
}
const Zn = {
  STATE_CHANGE: "sessionStateChange",
  EXPIRATION_WARNING: "sessionExpirationWarning",
  EXPIRATION: "sessionExpiration"
};
class Gh {
  constructor(e = "solid-oidc", t = "session", r = 1) {
    this.dbName = e, this.storeName = t, this.dbVersion = r, this.db = null;
  }
  async init() {
    return new Promise((e, t) => {
      const r = indexedDB.open(this.dbName, this.dbVersion);
      r.onerror = () => t(new Error(`Database error: ${r.error}`)), r.onsuccess = () => {
        this.db = r.result, e(this);
      }, r.onupgradeneeded = (i) => {
        const s = i.target.result;
        s.objectStoreNames.contains(this.storeName) || s.createObjectStore(this.storeName);
      };
    });
  }
  async setItem(e, t) {
    return this.db || await this.init(), new Promise((r, i) => {
      const s = this.db.transaction(this.storeName, "readwrite");
      s.oncomplete = () => r(), s.onerror = () => i(new Error(`Transaction error: ${s.error}`)), s.objectStore(this.storeName).put(t, e);
    });
  }
  async getItem(e) {
    return this.db || await this.init(), new Promise((t, r) => {
      const i = this.db.transaction(this.storeName, "readonly");
      i.onerror = () => r(new Error(`Transaction error: ${i.error}`));
      const s = i.objectStore(this.storeName).get(e);
      s.onsuccess = () => t(s.result || null);
    });
  }
  async deleteItem(e) {
    return this.db || await this.init(), new Promise((t, r) => {
      const i = this.db.transaction(this.storeName, "readwrite");
      i.oncomplete = () => t(), i.onerror = () => r(new Error(`Transaction error: ${i.error}`)), i.objectStore(this.storeName).delete(e);
    });
  }
  async clear() {
    return this.db || await this.init(), new Promise((e, t) => {
      const r = this.db.transaction(this.storeName, "readwrite");
      r.oncomplete = () => e(), r.onerror = () => t(new Error(`Transaction error: ${r.error}`)), r.objectStore(this.storeName).clear();
    });
  }
  close() {
    this.db && (this.db.close(), this.db = null);
  }
}
async function jh() {
  const n = crypto.randomUUID() + "-" + crypto.randomUUID(), e = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(n))
  ), t = btoa(String.fromCharCode(...e)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return { verifier: n, challenge: t };
}
async function bo(n, e, t, r = null) {
  const i = await Ui(n.publicKey), s = { htu: e, htm: t };
  return r && (s.ath = r), new Lh(s).setIssuedAt().setJti(crypto.randomUUID()).setProtectedHeader({ alg: "ES256", typ: "dpop+jwt", jwk: i }).sign(n.privateKey);
}
async function Xh(n) {
  const e = new TextEncoder().encode(n), t = await crypto.subtle.digest("SHA-256", e), r = Array.from(new Uint8Array(t));
  return btoa(String.fromCharCode(...r)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function zh(n) {
  const e = new URL(n).origin, t = await fetch(`${e}/.well-known/openid-configuration`);
  if (!t.ok) throw new Error(`OIDC discovery failed: ${t.status}`);
  return t.json();
}
async function Jh(n, e) {
  const t = await fetch(n, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      application_type: "web",
      redirect_uris: e,
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      scope: "openid offline_access webid"
    })
  });
  if (!t.ok) throw new Error(`Client registration failed: ${t.status}`);
  return t.json();
}
async function No(n, e, t) {
  const r = await bo(t, n, "POST"), i = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      DPoP: r
    },
    body: new URLSearchParams(e)
  });
  if (!i.ok) throw new Error(`Token request failed: ${i.status}`);
  return i.json();
}
async function Yh(n, e, t, r, i) {
  const s = Wh(new URL(e)), { payload: a } = await _h(n, s, {
    issuer: t,
    audience: "solid"
  }), l = await Bh(await Ui(i.publicKey));
  if (a.cnf?.jkt !== l)
    throw new Error("DPoP thumbprint mismatch");
  if (a.client_id !== r)
    throw new Error("client_id mismatch");
  return a;
}
async function Qh(n) {
  await n.init();
  const [e, t, r, i] = await Promise.all([
    n.getItem("refresh_token"),
    n.getItem("token_endpoint"),
    n.getItem("client_id"),
    n.getItem("dpop_keypair")
  ]);
  if (!e || !t || !r || !i)
    throw new Error("Missing refresh data");
  const s = await No(t, {
    grant_type: "refresh_token",
    refresh_token: e,
    client_id: r
  }, i);
  return s.refresh_token && await n.setItem("refresh_token", s.refresh_token), n.close(), { ...s, dpop_key_pair: i };
}
class Zh extends EventTarget {
  constructor(e = {}) {
    super(), this.clientId = e.clientId || null, this.database = e.database || new Gh(), this.onStateChange = e.onStateChange || null, this.onExpirationWarning = e.onExpirationWarning || null, this.onExpiration = e.onExpiration || null, this._isActive = !1, this._webId = null, this._exp = null, this._ath = null, this._tokens = null, this._idpDetails = null, this._refreshPromise = null, this.onStateChange && this.addEventListener(Zn.STATE_CHANGE, this.onStateChange), this.onExpirationWarning && this.addEventListener(Zn.EXPIRATION_WARNING, this.onExpirationWarning), this.onExpiration && this.addEventListener(Zn.EXPIRATION, this.onExpiration);
  }
  // ==========================================================================
  // Public API
  // ==========================================================================
  get isActive() {
    return this._isActive;
  }
  get webId() {
    return this._webId;
  }
  isExpired() {
    return this._exp ? Math.floor(Date.now() / 1e3) >= this._exp : !0;
  }
  getExpiresIn() {
    return this._exp ? this._exp - Math.floor(Date.now() / 1e3) : -1;
  }
  /**
   * Redirect user to identity provider for login
   */
  async login(e, t) {
    const r = new URL(t), i = r.origin + r.pathname + r.search, s = await zh(e), a = s.issuer, l = (m) => m.endsWith("/") ? m.slice(0, -1) : m;
    if (l(e) !== l(a))
      throw new Error(`Issuer mismatch: ${a} !== ${e}`);
    sessionStorage.setItem("solid_oidc_idp", a), sessionStorage.setItem("solid_oidc_token_endpoint", s.token_endpoint), sessionStorage.setItem("solid_oidc_jwks_uri", s.jwks_uri);
    let u = this.clientId;
    u || (u = (await Jh(s.registration_endpoint, [i])).client_id, sessionStorage.setItem("solid_oidc_client_id", u));
    const c = await jh();
    sessionStorage.setItem("solid_oidc_pkce_verifier", c.verifier);
    const h = crypto.randomUUID();
    sessionStorage.setItem("solid_oidc_csrf", h);
    const f = new URL(s.authorization_endpoint);
    f.searchParams.set("response_type", "code"), f.searchParams.set("redirect_uri", i), f.searchParams.set("scope", "openid offline_access webid"), f.searchParams.set("client_id", u), f.searchParams.set("code_challenge_method", "S256"), f.searchParams.set("code_challenge", c.challenge), f.searchParams.set("state", h), f.searchParams.set("prompt", "consent"), window.location.href = f.toString();
  }
  /**
   * Handle redirect from identity provider after login
   */
  async handleRedirectFromLogin() {
    const e = new URL(window.location.href), t = e.searchParams.get("code");
    if (!t) return;
    const r = sessionStorage.getItem("solid_oidc_idp"), i = e.searchParams.get("iss");
    if (!r || i !== r)
      throw new Error(`Issuer mismatch: ${i} !== ${r}`);
    const s = sessionStorage.getItem("solid_oidc_csrf");
    if (e.searchParams.get("state") !== s)
      throw new Error("CSRF token mismatch");
    e.searchParams.delete("code"), e.searchParams.delete("iss"), e.searchParams.delete("state"), window.history.replaceState({}, document.title, e.toString());
    const a = sessionStorage.getItem("solid_oidc_pkce_verifier"), l = sessionStorage.getItem("solid_oidc_token_endpoint"), u = sessionStorage.getItem("solid_oidc_jwks_uri"), c = this.clientId || sessionStorage.getItem("solid_oidc_client_id");
    if (!a || !l || !c)
      throw new Error("Missing session data");
    const h = await Kh("ES256"), f = await No(l, {
      grant_type: "authorization_code",
      code: t,
      code_verifier: a,
      redirect_uri: e.origin + e.pathname,
      client_id: c
    }, h);
    await Yh(f.access_token, u, r, c, h), this._idpDetails = { idp: r, jwksUri: u, tokenEndpoint: l }, await this.database.init(), await Promise.all([
      this.database.setItem("idp", r),
      this.database.setItem("jwks_uri", u),
      this.database.setItem("token_endpoint", l),
      this.database.setItem("client_id", c),
      this.database.setItem("dpop_keypair", h),
      this.database.setItem("refresh_token", f.refresh_token)
    ]), this.database.close(), sessionStorage.removeItem("solid_oidc_idp"), sessionStorage.removeItem("solid_oidc_token_endpoint"), sessionStorage.removeItem("solid_oidc_jwks_uri"), sessionStorage.removeItem("solid_oidc_client_id"), sessionStorage.removeItem("solid_oidc_pkce_verifier"), sessionStorage.removeItem("solid_oidc_csrf"), await this._setTokens({ ...f, dpop_key_pair: h }), this._dispatchStateChange();
  }
  /**
   * Restore session using stored refresh token
   */
  async restore() {
    return this._refreshPromise ? this._refreshPromise : (this._refreshPromise = (async () => {
      try {
        const e = await Qh(this.database);
        await this._setTokens(e), this._dispatchStateChange();
      } catch (e) {
        throw this._isActive && (this.isExpired() ? this._dispatchExpiration() : this._dispatchExpirationWarning()), e;
      } finally {
        this._refreshPromise = null;
      }
    })(), this._refreshPromise);
  }
  /**
   * Log out and clear all session data
   */
  async logout() {
    this._isActive = !1, this._webId = null, this._exp = null, this._ath = null, this._tokens = null, this._idpDetails = null, await this.database.init(), await this.database.clear(), this.database.close(), this._dispatchStateChange();
  }
  /**
   * Make authenticated fetch request with DPoP
   */
  async authFetch(e, t = {}) {
    if (!this._isActive)
      return fetch(e, t);
    this.isExpired() && await this.restore();
    let r, i, s;
    e instanceof Request ? (r = new URL(e.url), i = t.method || e.method || "GET", s = new Headers(e.headers)) : (r = new URL(e.toString()), i = t.method || "GET", s = t.headers ? new Headers(t.headers) : new Headers());
    const a = await bo(
      this._tokens.dpop_key_pair,
      `${r.origin}${r.pathname}`,
      i.toUpperCase(),
      this._ath
    );
    return s.set("DPoP", a), s.set("Authorization", `DPoP ${this._tokens.access_token}`), e instanceof Request ? fetch(new Request(e, { ...t, headers: s })) : fetch(r, { ...t, headers: s });
  }
  // ==========================================================================
  // Internal Methods
  // ==========================================================================
  async _setTokens(e) {
    this._tokens = e;
    const t = Vh(e.access_token);
    if (!t.webid) throw new Error("Missing webid claim");
    if (!t.exp) throw new Error("Missing exp claim");
    this._ath = await Xh(e.access_token), this._webId = t.webid, this._exp = t.exp, this._isActive = !0;
  }
  _dispatchStateChange() {
    this.dispatchEvent(new CustomEvent(Zn.STATE_CHANGE, {
      detail: { isActive: this._isActive, webId: this._webId }
    }));
  }
  _dispatchExpirationWarning() {
    this.dispatchEvent(new CustomEvent(Zn.EXPIRATION_WARNING, {
      detail: { expires_in: this.getExpiresIn() }
    }));
  }
  _dispatchExpiration() {
    this.dispatchEvent(new CustomEvent(Zn.EXPIRATION));
  }
}
const ef = {
  label: "Source",
  icon: "📄",
  canHandle(n, e) {
    return !0;
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = n.doc(), i = e.match(null, null, null, r), s = e.fetcher, a = Ao(r, e), l = tf(i, r, e), u = document.createElement("div");
    u.className = "source-header";
    const c = document.createElement("h2");
    if (c.textContent = "Source", u.appendChild(c), s) {
      const f = document.createElement("button");
      f.className = "source-edit-btn", f.textContent = "Edit", f.addEventListener("click", () => {
        xo(t, u, l, r, s, a);
      }), u.appendChild(f);
    }
    if (t.appendChild(u), i.length === 0) {
      const f = document.createElement("p");
      f.textContent = "No triples found in this document.", t.appendChild(f);
      return;
    }
    const h = document.createElement("pre");
    h.className = "source-view", h.textContent = l, t.appendChild(h);
  }
};
function Ao(n, e) {
  return e.fetcher?.requested?.[n.value] ? "text/turtle" : "application/ld+json";
}
function tf(n, e, t) {
  if (n.length === 0) return "";
  try {
    return Or(e, t, void 0, Ao(e, t)) ?? "";
  } catch {
    return n.map(
      (r) => `<${r.subject.value}> <${r.predicate.value}> ${r.object.termType === "NamedNode" ? `<${r.object.value}>` : `"${r.object.value}"`} .`
    ).join(`
`);
  }
}
function xo(n, e, t, r, i, s) {
  for (; e.nextSibling; )
    e.nextSibling.remove();
  const a = e.querySelector(".source-edit-btn");
  a && a.remove();
  const l = document.createElement("div");
  l.className = "source-btn-group";
  const u = document.createElement("button");
  u.className = "source-save-btn", u.textContent = "Save";
  const c = document.createElement("button");
  c.className = "source-cancel-btn", c.textContent = "Cancel", l.appendChild(u), l.appendChild(c), e.appendChild(l);
  const h = document.createElement("textarea");
  h.className = "source-editor", h.value = t, h.spellcheck = !1, n.appendChild(h), h.focus();
  const f = document.createElement("p");
  f.className = "source-status", n.appendChild(f), c.addEventListener("click", () => {
    al(n, e, t, r, i);
  }), u.addEventListener("click", async () => {
    u.disabled = !0, c.disabled = !0, f.textContent = "Saving...", f.className = "source-status";
    try {
      const m = await i.webOperation("PUT", r.value, {
        data: h.value,
        contentType: s
      });
      if (!m.ok)
        throw new Error(`${m.status} ${m.statusText}`);
      f.textContent = "Saved!", f.className = "source-status source-status-ok", setTimeout(() => {
        al(n, e, h.value, r, i, s);
      }, 800);
    } catch (m) {
      const v = m instanceof Error ? m.message : String(m);
      f.textContent = `Save failed: ${v}`, f.className = "source-status source-status-error", u.disabled = !1, c.disabled = !1;
    }
  });
}
function al(n, e, t, r, i, s) {
  for (; e.nextSibling; )
    e.nextSibling.remove();
  const a = e.querySelector(".source-btn-group");
  a && a.remove();
  const l = document.createElement("button");
  if (l.className = "source-edit-btn", l.textContent = "Edit", l.addEventListener("click", () => {
    xo(n, e, t, r, i, s);
  }), e.appendChild(l), t) {
    const u = document.createElement("pre");
    u.className = "source-view", u.textContent = t, n.appendChild(u);
  } else {
    const u = document.createElement("p");
    u.textContent = "No triples found in this document.", n.appendChild(u);
  }
}
Ie(ef);
const me = Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), at = Ne("http://www.w3.org/2000/01/rdf-schema#"), tt = Ne("http://purl.org/dc/elements/1.1/"), de = Ne("http://purl.org/dc/terms/"), be = Ne("http://xmlns.com/foaf/0.1/"), et = Ne("http://www.w3.org/ns/ldp#"), rn = Ne("http://www.w3.org/ns/solid/terms#"), il = Ne("http://www.w3.org/ns/posix/stat#"), we = Ne("http://www.w3.org/2006/vcard/ns#"), hr = Ne("http://www.w3.org/ns/pim/space#"), vt = Ne("http://www.w3.org/ns/auth/acl#"), yt = Ne("http://www.w3.org/ns/ui#"), kt = Ne("http://rdfs.org/sioc/ns#"), $t = Ne("http://www.w3.org/ns/pim/meeting#"), Et = Ne("http://www.w3.org/2005/01/wf/flow#"), gt = Ne("http://www.w3.org/ns/pim/transaction#"), Ei = Ne("http://www.w3.org/ns/pim/tracker#"), ze = Ne("https://www.w3.org/ns/activitystreams#"), qn = Ne("http://www.w3.org/2002/01/bookmark#"), ii = Ne("http://www.w3.org/ns/org#"), _a = Ne("http://www.w3.org/ns/pim/pad#"), wa = Ne("http://rdfs.org/sioc/types#"), Lr = Ne("http://purl.org/ontology/olo/core#"), nf = Ne("http://purl.org/ontology/pbo/core#"), rf = Ne("http://purl.org/ontology/mo/"), B = Ne("https://schema.org/");
function af(n) {
  const e = n.indexOf("#");
  return e >= 0 ? n.slice(e + 1) : "";
}
function fe(n) {
  const e = af(n);
  if (e) return decodeURIComponent(e);
  try {
    const r = new URL(n).pathname.split("/").filter(Boolean);
    return r.length > 0 ? decodeURIComponent(r[r.length - 1]) : n;
  } catch {
    return n;
  }
}
const To = "mashlib:navigate";
function Ci(n) {
  window.dispatchEvent(
    new CustomEvent(To, { detail: { uri: n } })
  );
}
function An(n, e) {
  const t = document.createElement("a");
  return t.href = `?uri=${encodeURIComponent(n)}`, t.textContent = e, t.addEventListener("click", (r) => {
    r.preventDefault(), Ci(n);
  }), t;
}
function sf(n, e) {
  return e.any(n, at("label"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value);
}
function lf(n, e) {
  return e.match(null, null, null, null), fe(n);
}
function of(n, e) {
  const t = e.match(n, null, null, null), r = /* @__PURE__ */ new Map();
  for (const s of t) {
    const a = s.predicate.value;
    r.has(a) || r.set(a, {
      predicate: a,
      predicateLabel: lf(a, e),
      objects: []
    }), r.get(a).objects.push({
      value: s.object.value,
      termType: s.object.termType,
      datatype: s.object.datatype?.value,
      language: s.object.language
    });
  }
  return [...r.values()].sort((s, a) => s.predicate === me("type").value ? -1 : a.predicate === me("type").value ? 1 : s.predicateLabel.localeCompare(a.predicateLabel));
}
function uf(n) {
  const e = document.createElement("span");
  if (e.className = "outline-value", n.termType === "NamedNode") {
    const t = An(n.value, fe(n.value));
    t.className = "outline-link", t.title = n.value, e.appendChild(t);
  } else if (n.termType === "BlankNode")
    e.textContent = `_:${n.value}`, e.className += " outline-blank";
  else {
    const t = document.createElement("span");
    if (t.className = "outline-literal", t.textContent = n.value, e.appendChild(t), n.language) {
      const r = document.createElement("span");
      r.className = "outline-lang", r.textContent = `@${n.language}`, e.appendChild(r);
    } else if (n.datatype && !n.datatype.includes("XMLSchema#string")) {
      const r = document.createElement("span");
      r.className = "outline-datatype", r.textContent = `^^${fe(n.datatype)}`, e.appendChild(r);
    }
  }
  return e;
}
function cf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "outline-view";
  const i = sf(n, e), s = document.createElement("h2");
  s.className = "outline-title", s.textContent = i, r.appendChild(s);
  const a = document.createElement("p");
  a.className = "outline-uri";
  const l = document.createElement("code");
  l.textContent = n.value, a.appendChild(l), r.appendChild(a);
  const u = of(n, e);
  if (u.length === 0) {
    const _ = document.createElement("p");
    _.className = "outline-empty", _.textContent = "No triples found for this resource.", r.appendChild(_), t.appendChild(r);
    return;
  }
  const c = u.reduce((_, R) => _ + R.objects.length, 0), h = document.createElement("p");
  h.className = "outline-count", h.textContent = `${c} triple${c !== 1 ? "s" : ""} across ${u.length} predicate${u.length !== 1 ? "s" : ""}`, r.appendChild(h);
  const f = document.createElement("table");
  f.className = "outline-table";
  const m = document.createElement("thead"), v = document.createElement("tr"), w = document.createElement("th");
  w.textContent = "Property";
  const b = document.createElement("th");
  b.textContent = "Value", v.appendChild(w), v.appendChild(b), m.appendChild(v), f.appendChild(m);
  const x = document.createElement("tbody");
  for (const _ of u)
    for (let R = 0; R < _.objects.length; R++) {
      const G = document.createElement("tr"), Y = document.createElement("td");
      if (Y.className = "outline-predicate", R === 0) {
        const K = document.createElement("a");
        K.href = _.predicate, K.textContent = _.predicateLabel, K.title = _.predicate, K.target = "_blank", K.rel = "noopener", Y.appendChild(K), _.objects.length > 1 && (Y.rowSpan = _.objects.length), G.appendChild(Y);
      }
      const A = document.createElement("td");
      A.className = "outline-object", A.appendChild(uf(_.objects[R])), G.appendChild(A), x.appendChild(G);
    }
  f.appendChild(x), r.appendChild(f), t.appendChild(r);
}
const df = {
  label: "Outline",
  icon: "🔍",
  canHandle(n, e) {
    return e.match(n, null, null, null).length > 0;
  },
  render(n, e, t) {
    cf(n, e, t);
  }
};
Ie(df);
const hf = {
  label: "Properties",
  icon: "📋",
  canHandle(n, e) {
    return !0;
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("h2");
    r.textContent = fe(n.value), t.appendChild(r);
    const i = document.createElement("p");
    i.className = "subject-uri";
    const s = document.createElement("a");
    s.href = n.value, s.textContent = n.value, s.target = "_blank", s.rel = "noopener", i.appendChild(s), t.appendChild(i);
    const a = e.match(n, null, null, null);
    if (a.length === 0) {
      const f = document.createElement("p");
      f.textContent = "No properties found for this subject.", t.appendChild(f);
      return;
    }
    const l = /* @__PURE__ */ new Map();
    for (const f of a) {
      const m = f.predicate.value;
      l.has(m) || l.set(m, { predicate: f.predicate, objects: [] }), l.get(m).objects.push({
        value: f.object.value,
        isUri: f.object.termType === "NamedNode"
      });
    }
    const u = document.createElement("table");
    u.className = "properties-table";
    const c = document.createElement("thead");
    c.innerHTML = "<tr><th>Property</th><th>Value</th></tr>", u.appendChild(c);
    const h = document.createElement("tbody");
    for (const [, { predicate: f, objects: m }] of l)
      for (const v of m) {
        const w = document.createElement("tr"), b = document.createElement("td");
        b.className = "prop-predicate";
        const x = document.createElement("a");
        x.href = f.value, x.textContent = fe(f.value), x.title = f.value, x.target = "_blank", x.rel = "noopener", b.appendChild(x), w.appendChild(b);
        const _ = document.createElement("td");
        if (_.className = "prop-value", v.isUri) {
          const R = document.createElement("a");
          R.href = v.value, R.textContent = fe(v.value), R.title = v.value, R.target = "_blank", R.rel = "noopener", _.appendChild(R);
        } else
          _.textContent = v.value;
        w.appendChild(_), h.appendChild(w);
      }
    u.appendChild(h), t.appendChild(u);
  }
};
Ie(hf);
const Do = [
  { uri: "Read", label: "Read", description: "can view the resource" },
  { uri: "Append", label: "Append", description: "can add new content" },
  { uri: "Write", label: "Write", description: "can modify content" },
  { uri: "Control", label: "Control", description: "can manage sharing" }
], ff = [
  { label: "Owners", modes: ["Read", "Write", "Control"], color: "#7b2d8e" },
  { label: "Editors", modes: ["Read", "Write"], color: "#dc3545" },
  { label: "Posters", modes: ["Read", "Append"], color: "#e67e00" },
  { label: "Submitters", modes: ["Append"], color: "#ccaa00" },
  { label: "Viewers", modes: ["Read"], color: "#28a745" }
];
function pf(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return r.includes(et("Container").value) || r.includes(et("BasicContainer").value) ? !0 : n.value.endsWith("/");
}
function xr(n, e) {
  if (n === be("Agent").value) return "Everyone (public)";
  if (n === vt("AuthenticatedAgent").value) return "Anyone logged in";
  const t = { termType: "NamedNode", value: n }, r = e.any(t, be("name"), null, null)?.value ?? e.any(t, we("fn"), null, null)?.value;
  return r || fe(n);
}
function mf(n, e) {
  const t = [], r = e.each(null, vt("accessTo"), n, null);
  for (const s of r) {
    if (s.termType !== "NamedNode") continue;
    const a = s, l = e.each(a, me("type"), null, null);
    if (!l.some((f) => f.value === vt("Authorization").value) && l.length > 0) continue;
    const h = e.each(a, vt("mode"), null, null).map((f) => fe(f.value));
    for (const f of e.each(a, vt("agent"), null, null))
      t.push({
        agentType: "agent",
        agentUri: f.value,
        agentLabel: xr(f.value, e),
        modes: h
      });
    for (const f of e.each(a, vt("agentClass"), null, null))
      t.push({
        agentType: "agentClass",
        agentUri: f.value,
        agentLabel: xr(f.value, e),
        modes: h
      });
    for (const f of e.each(a, vt("agentGroup"), null, null))
      t.push({
        agentType: "agentGroup",
        agentUri: f.value,
        agentLabel: xr(f.value, e),
        modes: h
      });
  }
  const i = e.each(null, vt("default"), n, null);
  for (const s of i) {
    if (s.termType !== "NamedNode") continue;
    const a = s, u = e.each(a, vt("mode"), null, null).map((c) => fe(c.value));
    for (const c of e.each(a, vt("agent"), null, null)) {
      const h = c.value;
      t.some((f) => f.agentUri === h && f.modes.join() === u.join()) || t.push({
        agentType: "agent",
        agentUri: h,
        agentLabel: xr(h, e),
        modes: u
      });
    }
    for (const c of e.each(a, vt("agentClass"), null, null)) {
      const h = c.value;
      t.some((f) => f.agentUri === h && f.modes.join() === u.join()) || t.push({
        agentType: "agentClass",
        agentUri: h,
        agentLabel: xr(h, e),
        modes: u
      });
    }
  }
  return t;
}
function gf(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n) {
    const r = t.modes.sort().join(",");
    e.has(r) || e.set(r, []), e.get(r).push(t);
  }
  return e;
}
function yf(n) {
  const e = [...n].sort().join(",");
  for (const t of ff)
    if ([...t.modes].sort().join(",") === e)
      return { label: t.label, color: t.color };
  return { label: n.join(" + "), color: "#555" };
}
function vf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "sharing-view";
  const i = pf(n, e) ? "folder" : "file", s = document.createElement("h2");
  s.className = "sharing-title", s.textContent = `Sharing for ${i}`, r.appendChild(s);
  const a = document.createElement("p");
  a.className = "sharing-resource";
  const l = document.createElement("code");
  l.textContent = n.value, a.appendChild(l), r.appendChild(a);
  const u = mf(n, e);
  if (u.length === 0) {
    const f = document.createElement("p");
    f.className = "sharing-no-acl", f.textContent = "No specific sharing settings found. This resource may inherit permissions from its parent container.", r.appendChild(f), sl(r), t.appendChild(r);
    return;
  }
  const c = gf(u), h = document.createElement("div");
  h.className = "sharing-permissions";
  for (const [f, m] of c) {
    const v = f.split(","), { label: w, color: b } = yf(v), x = document.createElement("div");
    x.className = "sharing-level";
    const _ = document.createElement("div");
    _.className = "sharing-level-name", _.style.color = b, _.textContent = w, x.appendChild(_);
    const R = document.createElement("div");
    R.className = "sharing-agents";
    for (const A of m) {
      const K = document.createElement("span");
      K.className = `sharing-agent sharing-agent-${A.agentType}`, K.textContent = A.agentLabel, K.title = A.agentUri, R.appendChild(K);
    }
    x.appendChild(R);
    const G = document.createElement("div");
    G.className = "sharing-level-desc", G.style.color = b;
    const Y = v.map((A) => {
      const K = Do.find((M) => M.uri === A);
      return K ? K.description : A;
    });
    G.textContent = Y.join(", "), x.appendChild(G), h.appendChild(x);
  }
  if (r.appendChild(h), i === "folder") {
    const f = document.createElement("p");
    f.className = "sharing-default-info", f.textContent = "Folder permissions may also apply as defaults for new resources created within.", r.appendChild(f);
  }
  sl(r), t.appendChild(r);
}
function sl(n) {
  const e = document.createElement("div");
  e.className = "sharing-legend";
  const t = document.createElement("h3");
  t.textContent = "Access Modes", e.appendChild(t);
  const r = document.createElement("table");
  r.className = "sharing-legend-table";
  for (const i of Do) {
    const s = document.createElement("tr"), a = document.createElement("td");
    a.className = "sharing-legend-mode", a.textContent = i.label;
    const l = document.createElement("td");
    l.textContent = i.description, s.appendChild(a), s.appendChild(l), r.appendChild(s);
  }
  e.appendChild(r), n.appendChild(e);
}
function wf(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(et("Resource").value) || r.includes(et("Container").value) || r.includes(et("BasicContainer").value) || n.value.endsWith("/"));
}
const Ef = {
  label: "Sharing",
  icon: "🔒",
  canHandle(n, e) {
    return wf(n, e);
  },
  render(n, e, t) {
    vf(n, e, t);
  }
};
Ie(Ef);
function si(n) {
  return fe(n);
}
function ll(n) {
  return n.startsWith("http://") || n.startsWith("https://") ? fe(n) : n.length > 120 ? n.slice(0, 117) + "..." : n;
}
function Cf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "table-view";
  const i = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "table-title", s.textContent = i, r.appendChild(s);
  let a = [], l = "";
  const u = e.each(n, B("itemListElement"), null, null);
  if (u.length > 0 && (a = u, l = "List Items"), a.length === 0) {
    const Y = _o(n, e);
    Y && (a = Y.items, l = fe(Y.typeUri));
  }
  const c = document.createElement("p");
  if (c.className = "table-count", c.textContent = `${a.length} ${l}${a.length !== 1 ? "s" : ""}`, r.appendChild(c), a.length === 0) {
    const Y = document.createElement("p");
    Y.className = "table-empty", Y.textContent = "No items to display.", r.appendChild(Y), t.appendChild(r);
    return;
  }
  const h = /* @__PURE__ */ new Set();
  for (const Y of a) {
    const A = e.match(Y, null, null, null);
    for (const K of A) {
      const M = K.predicate.value;
      M !== me("type").value && h.add(M);
    }
  }
  const f = Array.from(h), m = [
    B("name").value,
    de("title").value,
    at("label").value,
    B("description").value,
    de("description").value
  ];
  f.sort((Y, A) => {
    const K = m.indexOf(Y), M = m.indexOf(A);
    return K !== -1 && M !== -1 ? K - M : K !== -1 ? -1 : M !== -1 ? 1 : si(Y).localeCompare(si(A));
  });
  const v = 8, w = f.slice(0, v), b = document.createElement("div");
  b.className = "table-scroll";
  const x = document.createElement("table");
  x.className = "table-data";
  const _ = document.createElement("thead"), R = document.createElement("tr");
  for (const Y of w) {
    const A = document.createElement("th");
    A.className = "table-header", A.textContent = si(Y), A.setAttribute("data-predicate", Y), A.addEventListener("click", () => {
      bf(x, w.indexOf(Y));
    }), R.appendChild(A);
  }
  _.appendChild(R), x.appendChild(_);
  const G = document.createElement("tbody");
  for (const Y of a) {
    const A = document.createElement("tr");
    A.className = "table-row";
    for (const K of w) {
      const M = document.createElement("td");
      M.className = "table-cell";
      const j = e.each(Y, mn(K), null, null);
      if (j.length > 0) {
        const k = j[0].value;
        if (k.startsWith("http://") || k.startsWith("https://")) {
          const H = document.createElement("a");
          H.href = k, H.textContent = ll(k), H.className = "table-link", M.appendChild(H);
        } else
          M.textContent = ll(k);
      }
      A.appendChild(M);
    }
    G.appendChild(A);
  }
  if (x.appendChild(G), b.appendChild(x), r.appendChild(b), f.length > v) {
    const Y = document.createElement("p");
    Y.className = "table-more", Y.textContent = `+ ${f.length - v} more columns hidden`, r.appendChild(Y);
  }
  t.appendChild(r);
}
function bf(n, e, t, r, i) {
  const s = n.querySelector("tbody");
  if (!s) return;
  const a = Array.from(s.querySelectorAll("tr")), l = n.querySelectorAll("th")[e], c = (l?.getAttribute("data-sort") ?? "none") === "asc" ? "desc" : "asc";
  n.querySelectorAll("th").forEach((h) => h.removeAttribute("data-sort")), l?.setAttribute("data-sort", c), a.sort((h, f) => {
    const m = h.children[e]?.textContent ?? "", v = f.children[e]?.textContent ?? "", w = m.localeCompare(v, void 0, { numeric: !0 });
    return c === "asc" ? w : -w;
  });
  for (const h of a)
    s.appendChild(h);
}
const Nf = [
  B("Dataset").value,
  B("DataCatalog").value,
  B("ItemList").value,
  at("Class").value
];
function _o(n, e) {
  const t = n.doc(), r = e.match(null, me("type"), null, t), i = /* @__PURE__ */ new Map();
  for (const l of r) {
    const u = l.object.value;
    if (u === at("Resource").value || u === me("Statement").value) continue;
    const c = i.get(u) ?? [];
    c.push(l.subject), i.set(u, c);
  }
  let s = null, a = [];
  for (const [l, u] of i)
    u.length >= 2 && u.length > a.length && (s = l, a = u);
  return s && a.length >= 2 ? { typeUri: s, items: a } : null;
}
function Af(n, e) {
  const t = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of Nf)
    if (t.includes(i)) return !0;
  if (e.any(n, B("itemListElement"), null, null)) return !0;
  const r = _o(n, e);
  return !!(r && r.items.length >= 3);
}
const xf = {
  label: "Table",
  icon: "📊",
  canHandle(n, e) {
    return Af(n, e);
  },
  render(n, e, t) {
    Cf(n, e, t);
  }
};
Ie(xf);
const Tf = [".html", ".htm", ".xhtml"];
function Df(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    return Tf.some((t) => e.endsWith(t));
  } catch {
    return !1;
  }
}
function _f(n) {
  try {
    return new URL(n).href === new URL(window.location.href).href;
  } catch {
    return !1;
  }
}
const Sf = {
  label: "HTML",
  icon: "🌐",
  canHandle(n, e) {
    return _f(n.value) ? !1 : Df(n.value);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "html-view";
    const i = document.createElement("iframe");
    i.className = "html-frame", i.src = n.value, i.setAttribute("sandbox", "allow-same-origin"), i.title = "HTML content", i.addEventListener("load", () => {
      try {
        const s = i.contentDocument;
        if (s) {
          const a = s.documentElement.scrollHeight;
          i.style.height = `${Math.max(a, 200)}px`;
        }
      } catch {
        i.style.height = "80vh";
      }
    }), r.appendChild(i), t.appendChild(r);
  }
};
Ie(Sf);
const Ff = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".oga": "audio/ogg",
  ".flac": "audio/flac",
  ".aac": "audio/aac",
  ".m4a": "audio/mp4",
  ".opus": "audio/opus",
  ".weba": "audio/webm"
};
function ol(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    for (const [t, r] of Object.entries(Ff))
      if (e.endsWith(t)) return r;
  } catch {
  }
}
function If(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(B("AudioObject").value) || r.includes(rf("Track").value));
}
const Lf = {
  label: "Audio",
  icon: "🎵",
  canHandle(n, e) {
    return ol(n.value) !== void 0 || If(n, e);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "audio-view";
    const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value), s = document.createElement("h3");
    s.className = "audio-title", s.textContent = i, r.appendChild(s);
    const a = e.any(n, B("byArtist"), null, null)?.value ?? e.any(n, de("creator"), null, null)?.value;
    if (a) {
      const f = document.createElement("p");
      f.className = "audio-artist", f.textContent = a, r.appendChild(f);
    }
    const l = document.createElement("audio");
    l.className = "audio-player", l.controls = !0, l.preload = "metadata";
    const u = ol(n.value);
    if (u) {
      const f = document.createElement("source");
      f.src = n.value, f.type = u, l.appendChild(f);
    } else
      l.src = n.value;
    const c = document.createElement("p");
    c.textContent = "Your browser does not support this audio format.", l.appendChild(c), r.appendChild(l);
    const h = e.any(n, de("description"), null, null)?.value ?? e.any(n, B("description"), null, null)?.value;
    if (h) {
      const f = document.createElement("p");
      f.className = "audio-description", f.textContent = h, r.appendChild(f);
    }
    t.appendChild(r);
  }
};
Ie(Lf);
const Bf = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".bmp",
  ".ico",
  ".avif"
];
function Rf(n) {
  const e = new URL(n).pathname.toLowerCase();
  return Bf.some((t) => e.endsWith(t));
}
function kf(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(be("Image").value) || r.includes(B("ImageObject").value));
}
const Of = {
  label: "Image",
  icon: "🖼",
  canHandle(n, e) {
    return Rf(n.value) || kf(n, e);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "image-view";
    const i = e.any(n, B("contentUrl"), null, null)?.value ?? e.any(n, B("url"), null, null)?.value ?? n.value, s = document.createElement("img");
    s.className = "image-main", s.src = i, s.alt = fe(i), s.addEventListener("error", () => {
      s.style.display = "none";
      const u = document.createElement("p");
      u.className = "error", u.textContent = "Failed to load image.", r.appendChild(u);
    }), r.appendChild(s);
    const a = e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value, l = e.any(n, de("description"), null, null)?.value ?? e.any(n, B("description"), null, null)?.value;
    if (a || l) {
      const u = document.createElement("div");
      if (u.className = "image-caption", a) {
        const c = document.createElement("h3");
        c.textContent = a, u.appendChild(c);
      }
      if (l) {
        const c = document.createElement("p");
        c.textContent = l, u.appendChild(c);
      }
      r.appendChild(u);
    }
    t.appendChild(r);
  }
};
Ie(Of);
function Uf(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Mf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "code-view";
  const i = document.createElement("div");
  i.className = "code-header";
  const a = n.value.split("?")[0].split("#")[0].split("/").pop() ?? n.value, l = So(n.value), u = document.createElement("span");
  if (u.className = "code-filename", u.textContent = a, i.appendChild(u), l) {
    const f = document.createElement("span");
    f.className = "code-language", f.textContent = l, i.appendChild(f);
  }
  r.appendChild(i);
  const c = e.any(n, rn("content"), null, null)?.value ?? e.any(n, de("content"), null, null)?.value;
  if (c) {
    ul(c, r), t.appendChild(r);
    return;
  }
  const h = document.createElement("p");
  h.className = "code-loading", h.textContent = "Loading...", r.appendChild(h), t.appendChild(r), fetch(n.value).then((f) => {
    if (!f.ok) throw new Error(`HTTP ${f.status}`);
    return f.text();
  }).then((f) => {
    h.remove(), ul(f, r);
  }).catch((f) => {
    h.textContent = `Failed to load: ${f.message}`, h.className = "code-error";
  });
}
function ul(n, e) {
  const t = n.split(`
`);
  t.length > 0 && t[t.length - 1] === "" && t.pop();
  const r = document.createElement("pre");
  r.className = "code-block";
  const i = document.createElement("table");
  i.className = "code-table", String(t.length).length;
  for (let a = 0; a < t.length; a++) {
    const l = document.createElement("tr");
    l.className = "code-line";
    const u = document.createElement("td");
    u.className = "code-line-number", u.textContent = String(a + 1), u.setAttribute("data-line", String(a + 1)), l.appendChild(u);
    const c = document.createElement("td");
    c.className = "code-line-content", c.innerHTML = Uf(t[a]) || `
`, l.appendChild(c), i.appendChild(l);
  }
  r.appendChild(i);
  const s = document.createElement("div");
  s.className = "code-footer", s.textContent = `${t.length} line${t.length !== 1 ? "s" : ""}`, e.appendChild(r), e.appendChild(s);
}
const Pf = {
  ".js": "JavaScript",
  ".mjs": "JavaScript",
  ".cjs": "JavaScript",
  ".jsx": "JSX",
  ".ts": "TypeScript",
  ".tsx": "TSX",
  ".py": "Python",
  ".rb": "Ruby",
  ".rs": "Rust",
  ".go": "Go",
  ".java": "Java",
  ".kt": "Kotlin",
  ".scala": "Scala",
  ".c": "C",
  ".h": "C Header",
  ".cpp": "C++",
  ".cc": "C++",
  ".hpp": "C++ Header",
  ".cs": "C#",
  ".swift": "Swift",
  ".php": "PHP",
  ".pl": "Perl",
  ".lua": "Lua",
  ".r": "R",
  ".sh": "Shell",
  ".bash": "Bash",
  ".zsh": "Zsh",
  ".fish": "Fish",
  ".ps1": "PowerShell",
  ".sql": "SQL",
  ".json": "JSON",
  ".yaml": "YAML",
  ".yml": "YAML",
  ".toml": "TOML",
  ".xml": "XML",
  ".css": "CSS",
  ".scss": "SCSS",
  ".less": "LESS",
  ".sass": "Sass",
  ".graphql": "GraphQL",
  ".gql": "GraphQL",
  ".proto": "Protocol Buffers",
  ".dockerfile": "Dockerfile",
  ".tf": "Terraform",
  ".vim": "Vim Script",
  ".el": "Emacs Lisp",
  ".clj": "Clojure",
  ".ex": "Elixir",
  ".exs": "Elixir",
  ".erl": "Erlang",
  ".hs": "Haskell",
  ".ml": "OCaml",
  ".fs": "F#",
  ".dart": "Dart",
  ".zig": "Zig",
  ".v": "V",
  ".nim": "Nim",
  ".wasm": "WebAssembly",
  ".wat": "WebAssembly Text"
};
function So(n) {
  const t = n.split("?")[0].split("#")[0].split("/").pop() ?? "", r = t.toLowerCase();
  if (r === "dockerfile") return "Dockerfile";
  if (r === "makefile" || r === "gnumakefile") return "Makefile";
  if (r === "rakefile" || r === "gemfile") return "Ruby";
  if (r === "cmakelists.txt") return "CMake";
  const i = t.lastIndexOf(".");
  if (i === -1) return null;
  const s = t.slice(i).toLowerCase();
  return Pf[s] ?? null;
}
function $f(n, e) {
  return !!(So(n.value) || e.each(n, me("type"), null, null).map((r) => r.value).includes(B("SoftwareSourceCode").value));
}
const qf = {
  label: "Code",
  icon: "💻",
  canHandle(n, e) {
    return $f(n, e);
  },
  render(n, e, t) {
    Mf(n, e, t);
  }
};
Ie(qf);
const Hf = [".md", ".markdown", ".mdown", ".mkd", ".mkdn"];
function Wf(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    return Hf.some((t) => e.endsWith(t));
  } catch {
    return !1;
  }
}
function Vf(n, e) {
  const t = e.match(null, null, null, n.doc());
  if (t.length !== 0) {
    for (const r of t)
      if (r.predicate.value === "http://www.w3.org/ns/solid/terms#content" || r.predicate.value === "http://purl.org/dc/terms/content")
        return r.object.value;
  }
}
const Kf = {
  label: "Markdown",
  icon: "📝",
  canHandle(n, e) {
    return Wf(n.value);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "markdown-view", t.appendChild(r);
    const i = Vf(n, e), s = i ? Promise.resolve(i) : fetch(n.value).then((a) => {
      if (!a.ok) throw new Error(`HTTP ${a.status}`);
      return a.text();
    });
    if (!i) {
      const a = document.createElement("p");
      a.className = "loading", a.textContent = "Loading markdown...", r.appendChild(a);
    }
    Promise.all([s, import("./marked.esm-W2-rwDzJ.js")]).then(([a, { marked: l }]) => {
      r.innerHTML = l.parse(a);
    }).catch(() => {
      r.innerHTML = "";
      const a = document.createElement("p");
      a.className = "error", a.textContent = "Failed to load markdown content.", r.appendChild(a);
    });
  }
};
Ie(Kf);
function Gf(n) {
  try {
    return new URL(n).pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return !1;
  }
}
const jf = {
  label: "PDF",
  icon: "📄",
  canHandle(n, e) {
    return Gf(n.value);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "pdf-view";
    const i = document.createElement("h3");
    i.className = "pdf-title", i.textContent = fe(n.value), r.appendChild(i);
    const s = document.createElement("object");
    s.className = "pdf-embed", s.data = n.value, s.type = "application/pdf";
    const a = document.createElement("div");
    a.className = "pdf-fallback";
    const l = document.createElement("p");
    l.textContent = "Unable to display PDF inline.", a.appendChild(l);
    const u = document.createElement("a");
    u.href = n.value, u.textContent = "Download PDF", u.target = "_blank", u.rel = "noopener", a.appendChild(u), s.appendChild(a), r.appendChild(s), t.appendChild(r);
  }
};
Ie(jf);
const Xf = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".ogv": "video/ogg",
  ".mov": "video/mp4",
  ".m4v": "video/mp4"
};
function cl(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    for (const [t, r] of Object.entries(Xf))
      if (e.endsWith(t)) return r;
  } catch {
  }
}
function zf(n, e) {
  return !!e.each(n, me("type"), null, null).map((i) => i.value).includes(B("VideoObject").value);
}
const Jf = {
  label: "Video",
  icon: "🎬",
  canHandle(n, e) {
    return cl(n.value) !== void 0 || zf(n, e);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "video-view";
    const i = document.createElement("video");
    i.className = "video-main", i.controls = !0, i.preload = "metadata";
    const s = cl(n.value);
    if (s) {
      const c = document.createElement("source");
      c.src = n.value, c.type = s, i.appendChild(c);
    } else
      i.src = n.value;
    const a = document.createElement("p");
    a.textContent = "Your browser does not support this video format.", i.appendChild(a), r.appendChild(i);
    const l = e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value, u = e.any(n, de("description"), null, null)?.value ?? e.any(n, B("description"), null, null)?.value;
    if (l || u) {
      const c = document.createElement("div");
      if (c.className = "video-caption", l) {
        const h = document.createElement("h3");
        h.textContent = l, c.appendChild(h);
      }
      if (u) {
        const h = document.createElement("p");
        h.textContent = u, c.appendChild(h);
      }
      r.appendChild(c);
    }
    t.appendChild(r);
  }
};
Ie(Jf);
function Yf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "gallery-view";
  const i = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "gallery-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (a) {
    const c = document.createElement("p");
    c.className = "gallery-description", c.textContent = a, r.appendChild(c);
  }
  const l = Fo(n, e), u = np(n, e);
  if (u && l.length === 0) {
    const c = document.createElement("p");
    c.className = "gallery-count", c.textContent = "Loading...", r.appendChild(c), t.appendChild(r), fetch(u).then((h) => h.text()).then((h) => {
      const f = rp(h);
      c.remove(), dl(f, r);
    }).catch(() => {
      c.textContent = "Failed to load playlist.";
    });
    return;
  }
  dl(l, r), t.appendChild(r);
}
function dl(n, e) {
  const t = document.createElement("p");
  if (t.className = "gallery-count", t.textContent = `${n.length} image${n.length !== 1 ? "s" : ""}`, e.appendChild(t), n.length === 0) {
    const i = document.createElement("p");
    i.className = "gallery-empty", i.textContent = "No images found.", e.appendChild(i);
    return;
  }
  const r = document.createElement("div");
  r.className = "gallery-grid";
  for (const i of n) {
    const s = document.createElement("div");
    s.className = "gallery-cell";
    const a = document.createElement("img");
    a.className = "gallery-thumb", a.src = i, a.alt = Qf(i), a.loading = "lazy", a.addEventListener("click", () => {
      Zf(i, n, e);
    }), s.appendChild(a), r.appendChild(s);
  }
  e.appendChild(r);
}
function Qf(n) {
  return n.split("?")[0].split("#")[0].split("/").pop() ?? "image";
}
function Zf(n, e, t) {
  const r = t.querySelector(".gallery-lightbox");
  r && r.remove();
  let i = e.indexOf(n);
  i === -1 && (i = 0);
  const s = document.createElement("div");
  s.className = "gallery-lightbox";
  const a = document.createElement("img");
  if (a.className = "gallery-lightbox-img", a.src = e[i], a.alt = "Full size image", e.length > 1) {
    const h = document.createElement("button");
    h.className = "gallery-lightbox-prev", h.textContent = "❮", h.addEventListener("click", (m) => {
      m.stopPropagation(), i = (i - 1 + e.length) % e.length, a.src = e[i];
    }), s.appendChild(h);
    const f = document.createElement("button");
    f.className = "gallery-lightbox-next", f.textContent = "❯", f.addEventListener("click", (m) => {
      m.stopPropagation(), i = (i + 1) % e.length, a.src = e[i];
    }), s.appendChild(f);
  }
  const l = document.createElement("button");
  l.className = "gallery-lightbox-close", l.textContent = "×", l.addEventListener("click", () => u());
  function u() {
    s.remove(), document.removeEventListener("keydown", c);
  }
  function c(h) {
    h.key === "Escape" ? u() : h.key === "ArrowLeft" && e.length > 1 ? (i = (i - 1 + e.length) % e.length, a.src = e[i]) : h.key === "ArrowRight" && e.length > 1 && (i = (i + 1) % e.length, a.src = e[i]);
  }
  document.addEventListener("keydown", c), s.addEventListener("click", (h) => {
    h.target === s && u();
  }), s.appendChild(a), s.appendChild(l), t.appendChild(s);
}
const ep = [
  B("ImageGallery").value,
  B("MediaGallery").value,
  B("CollectionPage").value
], tp = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".bmp",
  ".ico",
  ".avif",
  ".tiff"
];
function Fo(n, e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e.each(n, B("image"), null, null))
    t.add(r.value);
  for (const r of e.each(n, be("img"), null, null))
    t.add(r.value);
  for (const r of e.each(n, B("hasPart"), null, null)) {
    ap(r.value) && t.add(r.value);
    const i = e.each(r, me("type"), null, null).map((s) => s.value);
    if (i.includes(B("ImageObject").value) || i.includes(be("Image").value)) {
      const s = e.any(r, B("contentUrl"), null, null)?.value ?? e.any(r, B("url"), null, null)?.value ?? r.value;
      t.add(s);
    }
  }
  for (const r of e.each(n, B("associatedMedia"), null, null))
    if (e.each(r, me("type"), null, null).map((s) => s.value).includes(B("ImageObject").value)) {
      const s = e.any(r, B("contentUrl"), null, null)?.value ?? r.value;
      t.add(s);
    }
  return Array.from(t);
}
function np(n, e) {
  const t = e.any(n, B("url"), null, null)?.value;
  return t && t.split("?")[0].split("#")[0].toLowerCase().endsWith(".m3u") ? new URL(t, n.value).href : null;
}
function rp(n) {
  return n.split(`
`).map((e) => e.trim()).filter((e) => e && !e.startsWith("#"));
}
function ap(n) {
  const e = n.split("?")[0].split("#")[0].toLowerCase();
  return tp.some((t) => e.endsWith(t));
}
function ip(n, e) {
  const t = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of ep)
    if (t.includes(i)) return !0;
  return Fo(n, e).length >= 2;
}
const sp = {
  label: "Gallery",
  icon: "🖼",
  canHandle(n, e) {
    return ip(n, e);
  },
  render(n, e, t) {
    Yf(n, e, t);
  }
};
Ie(sp);
function lp(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : e.toLocaleDateString(void 0, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function op(n, e) {
  return e.any(n, B("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? fe(n.value);
}
function up(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("article");
  r.className = "article-view";
  const i = e.any(n, B("headline"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h1");
  s.className = "article-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, B("author"), null, null), l = e.any(n, B("datePublished"), null, null)?.value, u = e.any(n, de("created"), null, null)?.value, c = l ?? u;
  if (a || c) {
    const b = document.createElement("div");
    if (b.className = "article-byline", a) {
      const x = document.createElement("span");
      x.className = "article-author", x.textContent = op(a, e), b.appendChild(x);
    }
    if (c) {
      const x = document.createElement("time");
      x.className = "article-date", x.dateTime = c, x.textContent = lp(c), b.appendChild(x);
    }
    r.appendChild(b);
  }
  const h = e.any(n, B("image"), null, null)?.value ?? e.any(n, B("thumbnailUrl"), null, null)?.value;
  if (h) {
    const b = document.createElement("img");
    b.className = "article-image", b.src = h, b.alt = i, r.appendChild(b);
  }
  const f = e.any(n, B("description"), null, null)?.value ?? e.any(n, B("abstract"), null, null)?.value ?? e.any(n, de("abstract"), null, null)?.value;
  if (f) {
    const b = document.createElement("p");
    b.className = "article-description", b.textContent = f, r.appendChild(b);
  }
  const m = e.any(n, B("articleBody"), null, null)?.value;
  if (m) {
    const b = document.createElement("div");
    b.className = "article-body";
    const x = m.split(/\n\n+/);
    for (const _ of x) {
      const R = _.trim();
      if (!R) continue;
      const G = document.createElement("p");
      G.textContent = R, b.appendChild(G);
    }
    r.appendChild(b);
  }
  const v = e.any(n, B("publisher"), null, null);
  if (v) {
    const b = e.any(v, B("name"), null, null)?.value ?? fe(v.value), x = document.createElement("p");
    x.className = "article-publisher", x.textContent = `Published by ${b}`, r.appendChild(x);
  }
  const w = e.each(n, B("keywords"), null, null);
  if (w.length > 0) {
    const b = document.createElement("div");
    b.className = "article-tags";
    for (const x of w) {
      const _ = document.createElement("span");
      _.className = "article-tag", _.textContent = x.value, b.appendChild(_);
    }
    r.appendChild(b);
  }
  t.appendChild(r);
}
const cp = [
  "Article",
  "BlogPosting",
  "NewsArticle",
  "ScholarlyArticle",
  "TechArticle",
  "SocialMediaPosting",
  "Report"
];
function dp(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of cp)
    if (r.includes(B(i).value)) return !0;
  return !!(e.any(n, B("articleBody"), null, null) || e.any(n, B("headline"), null, null));
}
const hp = {
  label: "Article",
  icon: "📰",
  canHandle(n, e) {
    return dp(n, e);
  },
  render(n, e, t) {
    up(n, e, t);
  }
};
Ie(hp);
function fp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "map-view";
  const i = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "map-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, B("address"), null, null)?.value ?? void 0;
  if (a) {
    const c = document.createElement("p");
    c.className = "map-address", c.textContent = a, r.appendChild(c);
  }
  const l = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (l) {
    const c = document.createElement("p");
    c.className = "map-description", c.textContent = l, r.appendChild(c);
  }
  const u = Io(n, e);
  if (u) {
    const c = document.createElement("div");
    c.className = "map-embed";
    const h = document.createElement("iframe");
    h.className = "map-frame", h.src = `https://www.openstreetmap.org/export/embed.html?bbox=${u.lng - 0.01},${u.lat - 5e-3},${u.lng + 0.01},${u.lat + 5e-3}&layer=mapnik&marker=${u.lat},${u.lng}`, h.setAttribute("sandbox", "allow-scripts allow-same-origin"), h.title = `Map showing ${i}`, c.appendChild(h);
    const f = document.createElement("a");
    f.className = "map-osm-link", f.href = `https://www.openstreetmap.org/?mlat=${u.lat}&mlon=${u.lng}#map=16/${u.lat}/${u.lng}`, f.textContent = "View on OpenStreetMap", f.target = "_blank", f.rel = "noopener", c.appendChild(f), r.appendChild(c);
  } else {
    const c = document.createElement("p");
    c.className = "map-no-coords", c.textContent = "No coordinates available for this place.", r.appendChild(c);
  }
  t.appendChild(r);
}
function Io(n, e) {
  const t = e.any(n, B("latitude"), null, null)?.value, r = e.any(n, B("longitude"), null, null)?.value;
  if (t && r) {
    const a = parseFloat(t), l = parseFloat(r);
    if (!isNaN(a) && !isNaN(l)) return { lat: a, lng: l };
  }
  const i = e.any(n, B("geo"), null, null);
  if (i) {
    const a = e.any(i, B("latitude"), null, null)?.value, l = e.any(i, B("longitude"), null, null)?.value;
    if (a && l) {
      const u = parseFloat(a), c = parseFloat(l);
      if (!isNaN(u) && !isNaN(c)) return { lat: u, lng: c };
    }
  }
  const s = e.any(n, B("location"), null, null);
  if (s) {
    const a = e.any(s, B("geo"), null, null);
    if (a) {
      const c = e.any(a, B("latitude"), null, null)?.value, h = e.any(a, B("longitude"), null, null)?.value;
      if (c && h) {
        const f = parseFloat(c), m = parseFloat(h);
        if (!isNaN(f) && !isNaN(m)) return { lat: f, lng: m };
      }
    }
    const l = e.any(s, B("latitude"), null, null)?.value, u = e.any(s, B("longitude"), null, null)?.value;
    if (l && u) {
      const c = parseFloat(l), h = parseFloat(u);
      if (!isNaN(c) && !isNaN(h)) return { lat: c, lng: h };
    }
  }
  return null;
}
function pp(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(B("Place").value) || r.includes(B("GeoCoordinates").value));
}
const mp = {
  label: "Map",
  icon: "🗺",
  canHandle(n, e) {
    return !!(Io(n, e) || pp(n, e));
  },
  render(n, e, t) {
    fp(n, e, t);
  }
};
Ie(mp);
function hl(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : e.toLocaleString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function pa(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : e.toLocaleDateString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function fl(n, e) {
  const t = e.any(n, B("name"), null, null)?.value;
  if (t) return t;
  const r = e.any(n, B("address"), null, null)?.value;
  return r && !r.startsWith("http") ? r : n.value.startsWith("http") ? fe(n.value) : n.value;
}
function gp(n) {
  for (const e of n) {
    if (e.includes("Flight")) return "Flight";
    if (e.includes("TrainTrip")) return "Train";
    if (e.includes("BusTrip")) return "Bus";
    if (e.includes("BoatTrip")) return "Boat";
  }
  return "Leg";
}
function pl(n, e, t) {
  const r = document.createElement("div");
  r.className = "trip-leg";
  const i = e.each(n, me("type"), null, null).map((b) => b.value), s = gp(i), a = document.createElement("div");
  a.className = "trip-leg-header";
  const l = document.createElement("span");
  l.className = "trip-leg-mode", l.textContent = s;
  const u = e.any(n, B("flightNumber"), null, null)?.value ?? e.any(n, B("trainNumber"), null, null)?.value ?? e.any(n, B("busNumber"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value;
  u && (l.textContent += ` ${u}`), a.appendChild(l);
  const c = e.any(n, B("provider"), null, null) ?? e.any(n, B("airline"), null, null);
  if (c) {
    const b = e.any(c, B("name"), null, null)?.value ?? (c.value.startsWith("http") ? null : c.value);
    if (b) {
      const x = document.createElement("span");
      x.className = "trip-leg-provider", x.textContent = b, a.appendChild(x);
    }
  }
  r.appendChild(a);
  const h = document.createElement("div");
  h.className = "trip-leg-route";
  const f = e.any(n, B("departureStation"), null, null) ?? e.any(n, B("departureAirport"), null, null) ?? e.any(n, B("departureStop"), null, null) ?? e.any(n, B("fromLocation"), null, null), m = e.any(n, B("arrivalStation"), null, null) ?? e.any(n, B("arrivalAirport"), null, null) ?? e.any(n, B("arrivalStop"), null, null) ?? e.any(n, B("toLocation"), null, null);
  if (f || m) {
    const b = f ? fl(f, e) : "?", x = m ? fl(m, e) : "?";
    h.innerHTML = `<span class="trip-from">${b}</span><span class="trip-arrow">→</span><span class="trip-to">${x}</span>`, r.appendChild(h);
  }
  const v = e.any(n, B("departureTime"), null, null)?.value, w = e.any(n, B("arrivalTime"), null, null)?.value;
  if (v || w) {
    const b = document.createElement("div");
    if (b.className = "trip-leg-times", v) {
      const x = document.createElement("span");
      x.className = "trip-leg-time", x.textContent = `Departs: ${hl(v)}`, b.appendChild(x);
    }
    if (w) {
      const x = document.createElement("span");
      x.className = "trip-leg-time", x.textContent = `Arrives: ${hl(w)}`, b.appendChild(x);
    }
    r.appendChild(b);
  }
  t.appendChild(r);
}
function yp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "trip-view";
  const i = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "trip-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (a) {
    const m = document.createElement("p");
    m.className = "trip-description", m.textContent = a, r.appendChild(m);
  }
  const l = e.any(n, B("departureTime"), null, null)?.value ?? e.any(n, B("startDate"), null, null)?.value, u = e.any(n, B("arrivalTime"), null, null)?.value ?? e.any(n, B("endDate"), null, null)?.value;
  if (l || u) {
    const m = document.createElement("p");
    m.className = "trip-dates", l && u ? m.textContent = `${pa(l)} — ${pa(u)}` : l ? m.textContent = pa(l) : u && (m.textContent = `Until ${pa(u)}`), r.appendChild(m);
  }
  e.each(n, me("type"), null, null).map((m) => m.value).some(
    (m) => m.includes("Flight") || m.includes("TrainTrip") || m.includes("BusTrip") || m.includes("BoatTrip")
  ) && pl(n, e, r);
  const f = e.each(n, B("itinerary"), null, null);
  if (f.length > 0) {
    const m = document.createElement("div");
    m.className = "trip-itinerary";
    const v = document.createElement("h3");
    v.textContent = `Itinerary (${f.length} leg${f.length !== 1 ? "s" : ""})`, m.appendChild(v);
    const w = [...f].sort((b, x) => {
      const _ = e.any(b, B("departureTime"), null, null)?.value ?? "", R = e.any(x, B("departureTime"), null, null)?.value ?? "";
      return _.localeCompare(R);
    });
    for (const b of w)
      pl(b, e, m);
    r.appendChild(m);
  }
  t.appendChild(r);
}
const vp = [
  "Trip",
  "TouristTrip",
  "Flight",
  "TrainTrip",
  "BusTrip",
  "BoatTrip",
  "TravelAction"
];
function wp(n, e) {
  const t = e.each(n, me("type"), null, null).map((s) => s.value);
  for (const s of vp)
    if (t.includes(B(s).value)) return !0;
  if (e.any(n, B("itinerary"), null, null)) return !0;
  const r = e.any(n, B("departureTime"), null, null), i = e.any(n, B("arrivalTime"), null, null);
  return !!(r && i);
}
const Ep = {
  label: "Trip",
  icon: "✈",
  canHandle(n, e) {
    return wp(n, e);
  },
  render(n, e, t) {
    yp(n, e, t);
  }
};
Ie(Ep);
function Cp(n, e) {
  const t = /* @__PURE__ */ new Set(), r = [], i = [B("event"), B("subEvent")];
  for (const s of i)
    for (const a of e.each(n, s, null, null))
      a.termType === "NamedNode" && !t.has(a.value) && (t.add(a.value), r.push(a));
  return r;
}
function bp(n, e) {
  const t = e.any(n, B("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? "Untitled Event", r = e.any(n, B("startDate"), null, null)?.value ?? null, i = e.any(n, B("endDate"), null, null)?.value ?? null, s = e.any(n, B("location"), null, null);
  let a = "";
  return s && (s.termType === "Literal" ? a = s.value : s.termType === "NamedNode" && (a = e.any(s, B("name"), null, null)?.value ?? e.any(s, at("label"), null, null)?.value ?? s.value)), {
    uri: n.value,
    name: t,
    startDate: r ? new Date(r) : null,
    endDate: i ? new Date(i) : null,
    location: a
  };
}
function Np(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Ap(n, e) {
  return new Date(n, e, 1).getDay();
}
function xp(n, e) {
  return n.getFullYear() === e.getFullYear() && n.getMonth() === e.getMonth() && n.getDate() === e.getDate();
}
function Tp(n, e, t, r) {
  const i = new Date(e, t, r);
  return n.filter((s) => s.startDate ? !!(xp(s.startDate, i) || s.endDate && s.startDate <= i && s.endDate >= i) : !1);
}
function Dp(n) {
  return n.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
const ml = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], _p = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function li(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Sp(n, e, t) {
  const r = e.any(n, B("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? "Schedule", i = e.any(n, B("description"), null, null)?.value ?? null, a = Cp(n, e).map((A) => bp(A, e)), l = a.filter((A) => A.startDate !== null);
  l.sort((A, K) => A.startDate.getTime() - K.startDate.getTime());
  let u, c;
  if (l.length > 0)
    u = l[0].startDate.getFullYear(), c = l[0].startDate.getMonth();
  else {
    const A = /* @__PURE__ */ new Date();
    u = A.getFullYear(), c = A.getMonth();
  }
  const h = document.createElement("div");
  h.className = "sched-pane", t.appendChild(h);
  const f = document.createElement("h2");
  if (f.className = "sched-title", f.textContent = r, h.appendChild(f), i) {
    const A = document.createElement("p");
    A.className = "sched-description", A.textContent = i, h.appendChild(A);
  }
  const m = document.createElement("p");
  m.className = "sched-count", m.textContent = `${a.length} event${a.length !== 1 ? "s" : ""}`, h.appendChild(m);
  const v = document.createElement("div");
  v.className = "sched-nav", h.appendChild(v);
  const w = document.createElement("button");
  w.className = "sched-prev", w.textContent = "←", w.setAttribute("aria-label", "Previous month");
  const b = document.createElement("span");
  b.className = "sched-month-label";
  const x = document.createElement("button");
  x.className = "sched-next", x.textContent = "→", x.setAttribute("aria-label", "Next month"), v.appendChild(w), v.appendChild(b), v.appendChild(x);
  const _ = document.createElement("div");
  _.className = "sched-calendar", h.appendChild(_);
  const R = document.createElement("div");
  R.className = "sched-detail", h.appendChild(R);
  function G() {
    b.textContent = `${ml[c]} ${u}`, _.innerHTML = "";
    for (const M of _p) {
      const j = document.createElement("div");
      j.className = "sched-day-header", j.textContent = M, _.appendChild(j);
    }
    const A = Np(u, c), K = Ap(u, c);
    for (let M = 0; M < K; M++) {
      const j = document.createElement("div");
      j.className = "sched-day sched-day-empty", _.appendChild(j);
    }
    for (let M = 1; M <= A; M++) {
      const j = document.createElement("div");
      j.className = "sched-day", j.setAttribute("data-day", String(M));
      const k = document.createElement("span");
      k.className = "sched-day-num", k.textContent = String(M), j.appendChild(k);
      const H = Tp(a, u, c, M);
      if (H.length > 0) {
        j.classList.add("sched-has-events");
        const $ = document.createElement("span");
        $.className = "sched-event-dot", $.textContent = String(H.length), j.appendChild($), j.addEventListener("click", () => {
          Y(M, H);
        });
      }
      _.appendChild(j);
    }
    R.innerHTML = "";
  }
  function Y(A, K) {
    R.innerHTML = "";
    const M = document.createElement("h3");
    M.className = "sched-detail-heading", M.textContent = `${ml[c]} ${A}, ${u}`, R.appendChild(M);
    for (const j of K) {
      const k = document.createElement("div");
      k.className = "sched-event-item";
      let H = `<span class="sched-event-name">${li(j.name)}</span>`;
      j.startDate && (H += ` <span class="sched-event-time">${li(Dp(j.startDate))}</span>`), j.location && (H += ` <span class="sched-event-location">${li(j.location)}</span>`), k.innerHTML = H, R.appendChild(k);
    }
  }
  w.addEventListener("click", () => {
    c--, c < 0 && (c = 11, u--), G();
  }), x.addEventListener("click", () => {
    c++, c > 11 && (c = 0, u++), G();
  }), G();
}
const Fp = [
  B("Schedule"),
  B("EventSeries"),
  B("EventSchedule")
];
function Ip(n, e) {
  const t = /* @__PURE__ */ new Set(), r = [], i = [
    B("event"),
    B("subEvent")
  ];
  for (const s of i)
    for (const a of e.each(n, s, null, null))
      a.termType === "NamedNode" && !t.has(a.value) && (t.add(a.value), r.push(a));
  return r;
}
const Lp = {
  label: "Schedule",
  icon: "📅",
  canHandle(n, e) {
    for (const r of Fp)
      if (e.holds(n, me("type"), r)) return !0;
    return Ip(n, e).length >= 2;
  },
  render(n, e, t) {
    Sp(n, e, t);
  }
};
Ie(Lp);
function gl(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : /^\d{4}-\d{2}-\d{2}$/.test(n) ? e.toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : e.toLocaleString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Bp(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : e.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Rp(n, e) {
  const t = new Date(n), r = new Date(e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth() && t.getDate() === r.getDate();
}
function Tr(n, e, t, r = !1) {
  if (!t) return;
  const i = document.createElement("div");
  i.className = "event-detail";
  const s = document.createElement("span");
  if (s.className = "event-label", s.textContent = e, i.appendChild(s), r && (t.startsWith("http://") || t.startsWith("https://"))) {
    const a = document.createElement("a");
    a.href = t, a.textContent = fe(t), a.target = "_blank", a.rel = "noopener", i.appendChild(a);
  } else {
    const a = document.createElement("span");
    a.className = "event-value", a.textContent = t, i.appendChild(a);
  }
  n.appendChild(i);
}
function kp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "event-view";
  const i = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "event-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, B("startDate"), null, null)?.value, l = e.any(n, B("endDate"), null, null)?.value;
  if (a) {
    let x = gl(a);
    l && (Rp(a, l) ? x += ` – ${Bp(l)}` : x += ` – ${gl(l)}`);
    const _ = document.createElement("p");
    _.className = "event-date", _.textContent = x, r.appendChild(_);
  }
  const u = document.createElement("div");
  u.className = "event-details";
  const c = e.any(n, B("location"), null, null);
  let h;
  c && (h = e.any(c, B("name"), null, null)?.value ?? c.value), Tr(u, "Location", h);
  const f = e.any(n, B("organizer"), null, null);
  if (f) {
    const x = e.any(f, B("name"), null, null)?.value ?? e.any(f, be("name"), null, null)?.value ?? fe(f.value);
    Tr(u, "Organizer", x);
  }
  const m = e.any(n, B("url"), null, null)?.value;
  Tr(u, "Link", m, !0);
  const v = e.any(n, B("eventStatus"), null, null)?.value;
  v && Tr(u, "Status", fe(v));
  const w = e.any(n, B("eventAttendanceMode"), null, null)?.value;
  w && Tr(u, "Format", fe(w)), r.appendChild(u);
  const b = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (b) {
    const x = document.createElement("div");
    x.className = "event-description", x.textContent = b, r.appendChild(x);
  }
  t.appendChild(r);
}
function Op(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(B("Event").value) || r.includes(B("SocialEvent").value) || r.includes(B("BusinessEvent").value) || r.includes(B("MusicEvent").value) || r.includes(B("EducationEvent").value) || e.any(n, B("startDate"), null, null) && e.any(n, B("name"), null, null));
}
const Up = {
  label: "Event",
  icon: "📅",
  canHandle(n, e) {
    return Op(n, e);
  },
  render(n, e, t) {
    kp(n, e, t);
  }
};
Ie(Up);
function Mp(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? "Bookmarks";
}
function Pp(n, e) {
  const t = e.each(n, qn("hasMember"), null, null), r = [];
  for (const i of t) {
    const s = i, a = e.any(s, de("title"), null, null)?.value ?? e.any(s, B("name"), null, null)?.value ?? e.any(s, qn("title"), null, null)?.value ?? fe(s.value), l = e.any(s, qn("recalls"), null, null)?.value ?? null, u = e.any(s, de("created"), null, null)?.value, c = u ? new Date(u) : null, h = e.any(s, de("description"), null, null)?.value ?? e.any(s, B("description"), null, null)?.value ?? null;
    r.push({ uri: s.value, title: a, recalls: l, created: c, description: h });
  }
  return r.sort((i, s) => i.created && s.created ? s.created.getTime() - i.created.getTime() : i.created ? -1 : s.created ? 1 : i.title.localeCompare(s.title)), r;
}
function $p(n) {
  return n.toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function qp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "bookmarks-view";
  const i = Mp(n, e), s = document.createElement("h2");
  s.className = "bookmarks-title", s.textContent = i, r.appendChild(s);
  const a = Pp(n, e), l = document.createElement("p");
  if (l.className = "bookmarks-count", l.textContent = `${a.length} bookmark${a.length !== 1 ? "s" : ""}`, r.appendChild(l), a.length === 0) {
    const c = document.createElement("p");
    c.className = "bookmarks-empty", c.textContent = "No bookmarks saved.", r.appendChild(c), t.appendChild(r);
    return;
  }
  const u = document.createElement("ul");
  u.className = "bookmarks-list";
  for (const c of a) {
    const h = document.createElement("li");
    h.className = "bookmark-item";
    const f = document.createElement("a");
    if (f.className = "bookmark-title", f.textContent = c.title, c.recalls ? (f.href = c.recalls, f.target = "_blank", f.rel = "noopener") : (f.href = c.uri, f.target = "_blank", f.rel = "noopener"), h.appendChild(f), c.recalls) {
      const m = document.createElement("span");
      m.className = "bookmark-url", m.textContent = c.recalls, h.appendChild(m);
    }
    if (c.created || c.description) {
      const m = document.createElement("div");
      if (m.className = "bookmark-meta", c.created) {
        const v = document.createElement("span");
        v.className = "bookmark-date", v.textContent = $p(c.created), m.appendChild(v);
      }
      if (c.description) {
        const v = document.createElement("span");
        v.className = "bookmark-desc", v.textContent = c.description, m.appendChild(v);
      }
      h.appendChild(m);
    }
    u.appendChild(h);
  }
  r.appendChild(u), t.appendChild(r);
}
function Hp(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  if (r.includes(qn("BookmarkList").value) || r.includes(qn("Topic").value)) return !0;
  const i = e.each(n, qn("hasMember"), null, null);
  if (i.length > 0) {
    for (const s of i)
      if (e.each(s, me("type"), null, null).some((l) => l.value === qn("Bookmark").value)) return !0;
  }
  return !1;
}
const Wp = {
  label: "Bookmarks",
  icon: "🔖",
  canHandle(n, e) {
    return Hp(n, e);
  },
  render(n, e, t) {
    qp(n, e, t);
  }
};
Ie(Wp);
function yl(n, e) {
  return e.any(n, ze("name"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? fe(n.value);
}
function Vp(n, e) {
  const t = e.each(n, me("type"), null, null);
  for (const r of t)
    switch (fe(r.value).toLowerCase()) {
      case "create":
        return "created";
      case "update":
        return "updated";
      case "delete":
        return "deleted";
      case "follow":
        return "followed";
      case "like":
        return "liked";
      case "announce":
        return "shared";
      case "add":
        return "added";
      case "remove":
        return "removed";
      case "accept":
        return "accepted";
      case "reject":
        return "rejected";
      case "undo":
        return "undid";
      case "invite":
        return "invited";
      case "join":
        return "joined";
      case "leave":
        return "left";
      case "offer":
        return "offered";
    }
  return "did something with";
}
function vl(n, e) {
  const t = e.any(n, ze("actor"), null, null), r = e.any(n, ze("object"), null, null), i = e.any(n, ze("published"), null, null)?.value;
  return {
    uri: n.value,
    actorName: t ? yl(t, e) : null,
    actorUri: t?.value ?? null,
    verb: Vp(n, e),
    objectName: r ? yl(r, e) : null,
    objectUri: r?.value ?? null,
    summary: e.any(n, ze("summary"), null, null)?.value ?? null,
    content: e.any(n, ze("content"), null, null)?.value ?? null,
    published: i ? new Date(i) : null
  };
}
function Kp(n, e) {
  return [
    ...e.each(n, ze("items"), null, null),
    ...e.each(n, ze("orderedItems"), null, null)
  ];
}
function Gp(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return ["Collection", "OrderedCollection", "CollectionPage", "OrderedCollectionPage"].some((r) => t.includes(ze(r).value));
}
function jp(n) {
  return n.toLocaleString(void 0, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function wl(n) {
  const e = document.createElement("div");
  e.className = "activity-item";
  const t = document.createElement("div");
  if (t.className = "activity-summary", n.summary)
    t.textContent = n.summary;
  else {
    if (n.actorName) {
      const r = document.createElement("a");
      r.className = "activity-actor", r.textContent = n.actorName, n.actorUri && (r.href = `?uri=${encodeURIComponent(n.actorUri)}`, r.addEventListener("click", (i) => {
        i.preventDefault(), Ci(n.actorUri);
      })), t.appendChild(r), t.appendChild(document.createTextNode(` ${n.verb} `));
    }
    if (n.objectName) {
      const r = document.createElement("a");
      r.className = "activity-object", r.textContent = n.objectName, n.objectUri && (r.href = `?uri=${encodeURIComponent(n.objectUri)}`, r.addEventListener("click", (i) => {
        i.preventDefault(), Ci(n.objectUri);
      })), t.appendChild(r);
    }
  }
  if (e.appendChild(t), n.content) {
    const r = document.createElement("p");
    r.className = "activity-content", r.textContent = n.content, e.appendChild(r);
  }
  if (n.published) {
    const r = document.createElement("time");
    r.className = "activity-time", r.dateTime = n.published.toISOString(), r.textContent = jp(n.published), e.appendChild(r);
  }
  return e;
}
function Xp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  if (r.className = "activity-view", Gp(n, e)) {
    const i = e.any(n, ze("name"), null, null)?.value ?? "Activities", s = document.createElement("h2");
    s.className = "activity-title", s.textContent = i, r.appendChild(s);
    const a = e.any(n, ze("totalItems"), null, null)?.value;
    if (a) {
      const c = document.createElement("p");
      c.className = "activity-count", c.textContent = `${a} item${a !== "1" ? "s" : ""}`, r.appendChild(c);
    }
    const l = Kp(n, e), u = document.createElement("div");
    if (u.className = "activity-timeline", l.length === 0) {
      const c = document.createElement("p");
      c.className = "activity-empty", c.textContent = "No activities.", r.appendChild(c);
    } else {
      for (const c of l) {
        const h = vl(c, e);
        u.appendChild(wl(h));
      }
      r.appendChild(u);
    }
  } else {
    const i = vl(n, e), s = document.createElement("div");
    s.className = "activity-timeline", s.appendChild(wl(i)), r.appendChild(s);
  }
  t.appendChild(r);
}
const zp = [
  "Activity",
  "Create",
  "Update",
  "Delete",
  "Follow",
  "Like",
  "Announce",
  "Add",
  "Remove",
  "Accept",
  "Reject",
  "Undo",
  "Invite",
  "Join",
  "Leave",
  "Offer"
], Jp = [
  "Collection",
  "OrderedCollection",
  "CollectionPage",
  "OrderedCollectionPage"
];
function Yp(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of zp)
    if (r.includes(ze(i).value)) return !0;
  for (const i of Jp)
    if (r.includes(ze(i).value)) return !0;
  return !!(e.any(n, ze("actor"), null, null) && e.any(n, ze("object"), null, null));
}
const Qp = {
  label: "Activity",
  icon: "🔔",
  canHandle(n, e) {
    return Yp(n, e);
  },
  render(n, e, t) {
    Xp(n, e, t);
  }
};
Ie(Qp);
function bi(n, e) {
  try {
    return new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: e || "USD"
    }).format(n);
  } catch {
    return `${e ? `${e} ` : ""}${n.toFixed(2)}`;
  }
}
function Zp(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return !!(t.includes(gt("BankAccount").value) || t.includes(gt("PaymentCard").value) || t.includes(B("BankAccount").value) || e.any(n, gt("transaction"), null, null));
}
function Lo(n, e) {
  const t = e.any(n, gt("description"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, B("description"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value), r = e.any(n, gt("amount"), null, null)?.value ?? e.any(n, B("price"), null, null)?.value ?? e.any(n, B("amount"), null, null)?.value, i = r ? parseFloat(r) : null, s = e.any(n, gt("currency"), null, null)?.value ?? e.any(n, B("priceCurrency"), null, null)?.value ?? e.any(n, B("currency"), null, null)?.value ?? "", a = e.any(n, gt("date"), null, null)?.value ?? e.any(n, de("date"), null, null)?.value ?? e.any(n, B("dateCreated"), null, null)?.value ?? null, l = e.any(n, gt("category"), null, null), u = l ? e.any(l, at("label"), null, null)?.value ?? e.any(l, B("name"), null, null)?.value ?? fe(l.value) : null, c = e.any(n, gt("payee"), null, null) ?? e.any(n, B("recipient"), null, null), h = c ? e.any(c, B("name"), null, null)?.value ?? (c.value.startsWith("http") ? fe(c.value) : c.value) : null;
  return { uri: n.value, date: a, description: t, amount: i, currency: s, category: u, payee: h };
}
function em(n, e, t) {
  const i = e.each(n, gt("transaction"), null, null).map((m) => Lo(m, e));
  i.sort((m, v) => !m.date && !v.date ? 0 : m.date ? v.date ? v.date.localeCompare(m.date) : -1 : 1);
  const s = document.createElement("p");
  if (s.className = "txn-count", s.textContent = `${i.length} transaction${i.length !== 1 ? "s" : ""}`, t.appendChild(s), i.length === 0) {
    const m = document.createElement("p");
    m.className = "txn-empty", m.textContent = "No transactions found.", t.appendChild(m);
    return;
  }
  const a = i.reduce((m, v) => m + (v.amount ?? 0), 0), l = i.find((m) => m.currency)?.currency ?? "";
  if (a !== 0) {
    const m = document.createElement("p");
    m.className = "txn-total", m.textContent = `Balance: ${bi(a, l)}`, t.appendChild(m);
  }
  const u = document.createElement("div");
  u.className = "txn-table-wrapper";
  const c = document.createElement("table");
  c.className = "txn-table";
  const h = document.createElement("thead");
  h.innerHTML = '<tr><th>Date</th><th>Description</th><th>Category</th><th class="txn-amount-col">Amount</th></tr>', c.appendChild(h);
  const f = document.createElement("tbody");
  for (const m of i) {
    const v = document.createElement("tr");
    v.className = "txn-row";
    const w = document.createElement("td");
    if (w.className = "txn-date", m.date) {
      const R = new Date(m.date);
      w.textContent = isNaN(R.getTime()) ? m.date : R.toLocaleDateString(void 0, { month: "short", day: "numeric" });
    }
    v.appendChild(w);
    const b = document.createElement("td");
    b.className = "txn-desc", b.textContent = m.payee ? `${m.description} — ${m.payee}` : m.description, v.appendChild(b);
    const x = document.createElement("td");
    x.className = "txn-category", x.textContent = m.category ?? "", v.appendChild(x);
    const _ = document.createElement("td");
    _.className = "txn-amount", m.amount !== null && (_.textContent = bi(m.amount, m.currency), m.amount < 0 && _.classList.add("txn-negative"), m.amount > 0 && _.classList.add("txn-positive")), v.appendChild(_), f.appendChild(v);
  }
  c.appendChild(f), u.appendChild(c), t.appendChild(u);
}
function tm(n, e, t) {
  const r = Lo(n, e), i = document.createElement("div");
  i.className = "txn-details";
  const s = [];
  if (r.date) {
    const l = new Date(r.date), u = isNaN(l.getTime()) ? r.date : l.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
    s.push(["Date", u]);
  }
  r.amount !== null && s.push(["Amount", bi(r.amount, r.currency)]), r.payee && s.push(["Payee", r.payee]), r.category && s.push(["Category", r.category]);
  for (const [l, u] of s) {
    const c = document.createElement("div");
    c.className = "txn-detail", c.innerHTML = `<span class="txn-label">${l}</span><span class="txn-value">${u}</span>`, i.appendChild(c);
  }
  t.appendChild(i);
  const a = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (a && a !== r.description) {
    const l = document.createElement("p");
    l.className = "txn-body", l.textContent = a, t.appendChild(l);
  }
}
function nm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "txn-view";
  const i = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, gt("description"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "txn-title", s.textContent = i, r.appendChild(s), Zp(n, e) ? em(n, e, r) : tm(n, e, r), t.appendChild(r);
}
const rm = [
  gt("Transaction").value,
  gt("BankAccount").value,
  gt("PaymentCard").value,
  B("Invoice").value,
  B("MoneyTransfer").value,
  B("PayAction").value,
  B("BankAccount").value
];
function am(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  for (const r of rm)
    if (t.includes(r)) return !0;
  return !!(e.any(n, gt("transaction"), null, null) || e.any(n, B("totalPaymentDue"), null, null) || e.any(n, gt("amount"), null, null));
}
const im = {
  label: "Transactions",
  icon: "💳",
  canHandle(n, e) {
    return am(n, e);
  },
  render(n, e, t) {
    nm(n, e, t);
  }
};
Ie(im);
function sm(n, e) {
  const t = e.any(n, B("price"), null, null)?.value;
  if (t) {
    const i = e.any(n, B("priceCurrency"), null, null)?.value ?? "";
    return { price: t, currency: i };
  }
  const r = e.any(n, B("offers"), null, null);
  if (r) {
    const i = e.any(r, B("price"), null, null)?.value;
    if (i) {
      const s = e.any(r, B("priceCurrency"), null, null)?.value ?? "";
      return { price: i, currency: s };
    }
  }
  return null;
}
function lm(n, e) {
  const t = parseFloat(n);
  if (isNaN(t)) return `${e} ${n}`.trim();
  try {
    return new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: e || "USD"
    }).format(t);
  } catch {
    return `${e} ${n}`.trim();
  }
}
function om(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "product-view";
  const i = e.any(n, B("image"), null, null)?.value ?? e.any(n, B("thumbnailUrl"), null, null)?.value;
  if (i) {
    const w = document.createElement("img");
    w.className = "product-image", w.src = i, w.alt = "Product image", r.appendChild(w);
  }
  const s = document.createElement("div");
  s.className = "product-info";
  const a = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), l = document.createElement("h2");
  l.className = "product-name", l.textContent = a, s.appendChild(l);
  const u = e.any(n, B("brand"), null, null);
  if (u) {
    const w = e.any(u, B("name"), null, null)?.value ?? u.value;
    if (w && !w.startsWith("http")) {
      const b = document.createElement("p");
      b.className = "product-brand", b.textContent = w, s.appendChild(b);
    }
  }
  const c = sm(n, e);
  if (c) {
    const w = document.createElement("p");
    w.className = "product-price", w.textContent = lm(c.price, c.currency), s.appendChild(w);
  }
  const h = e.any(n, B("aggregateRating"), null, null);
  if (h) {
    const w = e.any(h, B("ratingValue"), null, null)?.value, b = e.any(h, B("reviewCount"), null, null)?.value, x = e.any(h, B("bestRating"), null, null)?.value ?? "5";
    if (w) {
      const _ = document.createElement("div");
      _.className = "product-rating";
      const R = Math.round(parseFloat(w)), G = parseInt(x), Y = "★".repeat(Math.min(R, G)) + "☆".repeat(Math.max(G - R, 0)), A = document.createElement("span");
      A.className = "product-stars", A.textContent = Y, _.appendChild(A);
      const K = document.createElement("span");
      K.className = "product-score", K.textContent = `${w}/${x}`, b && (K.textContent += ` (${b} reviews)`), _.appendChild(K), s.appendChild(_);
    }
  }
  const f = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (f) {
    const w = document.createElement("p");
    w.className = "product-description", w.textContent = f, s.appendChild(w);
  }
  const m = e.any(n, B("sku"), null, null)?.value;
  if (m) {
    const w = document.createElement("p");
    w.className = "product-sku", w.textContent = `SKU: ${m}`, s.appendChild(w);
  }
  const v = e.any(n, B("url"), null, null)?.value;
  if (v) {
    const w = document.createElement("a");
    w.className = "product-link", w.href = v, w.textContent = "View product", w.target = "_blank", w.rel = "noopener", s.appendChild(w);
  }
  r.appendChild(s), t.appendChild(r);
}
const um = [
  "Product",
  "IndividualProduct",
  "SomeProducts",
  "Vehicle",
  "Car",
  "SoftwareApplication",
  "Book",
  "Movie",
  "MusicAlbum",
  "Game"
];
function cm(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of um)
    if (r.includes(B(i).value)) return !0;
  return !!(e.any(n, B("offers"), null, null) || e.any(n, B("price"), null, null));
}
const dm = {
  label: "Product",
  icon: "📦",
  canHandle(n, e) {
    return cm(n, e);
  },
  render(n, e, t) {
    om(n, e, t);
  }
};
Ie(dm);
function oi(n) {
  const e = n.match(/^PT?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);
  if (!e) return n;
  const t = [];
  return e[1] && t.push(`${e[1]} hr`), e[2] && t.push(`${e[2]} min`), e[3] && t.push(`${e[3]} sec`), t.join(" ") || n;
}
function hm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "recipe-view";
  const i = e.any(n, B("image"), null, null)?.value ?? e.any(n, B("thumbnailUrl"), null, null)?.value;
  if (i) {
    const A = document.createElement("img");
    A.className = "recipe-image", A.src = i, A.alt = "Recipe photo", r.appendChild(A);
  }
  const s = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), a = document.createElement("h2");
  a.className = "recipe-name", a.textContent = s, r.appendChild(a);
  const l = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (l) {
    const A = document.createElement("p");
    A.className = "recipe-description", A.textContent = l, r.appendChild(A);
  }
  const u = [], c = e.any(n, B("prepTime"), null, null)?.value;
  c && u.push({ label: "Prep", value: oi(c) });
  const h = e.any(n, B("cookTime"), null, null)?.value;
  h && u.push({ label: "Cook", value: oi(h) });
  const f = e.any(n, B("totalTime"), null, null)?.value;
  f && u.push({ label: "Total", value: oi(f) });
  const m = e.any(n, B("recipeYield"), null, null)?.value;
  m && u.push({ label: "Yield", value: m });
  const v = e.any(n, B("recipeServings"), null, null)?.value;
  if (v && u.push({ label: "Servings", value: v }), u.length > 0) {
    const A = document.createElement("div");
    A.className = "recipe-meta";
    for (const K of u) {
      const M = document.createElement("span");
      M.className = "recipe-meta-item", M.innerHTML = `<strong>${K.label}</strong> ${K.value}`, A.appendChild(M);
    }
    r.appendChild(A);
  }
  const w = e.any(n, B("aggregateRating"), null, null);
  if (w) {
    const A = e.any(w, B("ratingValue"), null, null)?.value, K = e.any(w, B("reviewCount"), null, null)?.value;
    if (A) {
      const M = document.createElement("div");
      M.className = "recipe-rating";
      const j = Math.round(parseFloat(A)), k = "★".repeat(Math.min(j, 5)) + "☆".repeat(Math.max(5 - j, 0)), H = document.createElement("span");
      H.className = "recipe-stars", H.textContent = k, M.appendChild(H);
      const $ = document.createElement("span");
      $.className = "recipe-score", $.textContent = `${A}/5`, K && ($.textContent += ` (${K} reviews)`), M.appendChild($), r.appendChild(M);
    }
  }
  const b = e.any(n, B("recipeCategory"), null, null)?.value, x = e.any(n, B("recipeCuisine"), null, null)?.value;
  if (b || x) {
    const A = document.createElement("div");
    if (A.className = "recipe-tags", b) {
      const K = document.createElement("span");
      K.className = "recipe-tag", K.textContent = b, A.appendChild(K);
    }
    if (x) {
      const K = document.createElement("span");
      K.className = "recipe-tag", K.textContent = x, A.appendChild(K);
    }
    r.appendChild(A);
  }
  const _ = e.each(n, B("recipeIngredient"), null, null);
  if (_.length > 0) {
    const A = document.createElement("div");
    A.className = "recipe-section";
    const K = document.createElement("h3");
    K.textContent = "Ingredients", A.appendChild(K);
    const M = document.createElement("ul");
    M.className = "recipe-ingredients";
    for (const j of _) {
      const k = document.createElement("li");
      k.textContent = j.value, M.appendChild(k);
    }
    A.appendChild(M), r.appendChild(A);
  }
  const R = e.each(n, B("recipeInstructions"), null, null);
  if (R.length > 0) {
    const A = document.createElement("div");
    A.className = "recipe-section";
    const K = document.createElement("h3");
    K.textContent = "Instructions", A.appendChild(K);
    const M = document.createElement("ol");
    M.className = "recipe-instructions";
    for (const j of R) {
      const k = e.any(j, B("text"), null, null)?.value ?? j.value;
      if (k && !k.startsWith("http")) {
        const H = document.createElement("li");
        H.textContent = k, M.appendChild(H);
      }
    }
    A.appendChild(M), r.appendChild(A);
  }
  const G = e.any(n, B("nutrition"), null, null);
  if (G) {
    const A = [
      ["calories", "Calories"],
      ["fatContent", "Fat"],
      ["carbohydrateContent", "Carbs"],
      ["proteinContent", "Protein"],
      ["fiberContent", "Fiber"],
      ["sugarContent", "Sugar"],
      ["sodiumContent", "Sodium"]
    ], K = [];
    for (const [M, j] of A) {
      const k = e.any(G, B(M), null, null)?.value;
      k && K.push({ label: j, value: k });
    }
    if (K.length > 0) {
      const M = document.createElement("div");
      M.className = "recipe-section";
      const j = document.createElement("h3");
      j.textContent = "Nutrition", M.appendChild(j);
      const k = document.createElement("div");
      k.className = "recipe-nutrition";
      for (const H of K) {
        const $ = document.createElement("div");
        $.className = "recipe-nutrition-item", $.innerHTML = `<span class="recipe-nutrition-value">${H.value}</span><span class="recipe-nutrition-label">${H.label}</span>`, k.appendChild($);
      }
      M.appendChild(k), r.appendChild(M);
    }
  }
  const Y = e.any(n, B("author"), null, null);
  if (Y) {
    const A = e.any(Y, B("name"), null, null)?.value ?? Y.value;
    if (A && !A.startsWith("http")) {
      const K = document.createElement("p");
      K.className = "recipe-author", K.textContent = `Recipe by ${A}`, r.appendChild(K);
    }
  }
  t.appendChild(r);
}
const fm = [
  "Recipe",
  "HowTo"
];
function pm(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of fm)
    if (r.includes(B(i).value)) return !0;
  return !!(e.any(n, B("recipeIngredient"), null, null) || e.any(n, B("recipeInstructions"), null, null));
}
const mm = {
  label: "Recipe",
  icon: "🍳",
  canHandle(n, e) {
    return pm(n, e);
  },
  render(n, e, t) {
    hm(n, e, t);
  }
};
Ie(mm);
function gm(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return !!(t.includes(Et("Tracker").value) || t.includes(Ei("Tracker").value) || e.any(n, Et("issue"), null, null));
}
function Ni(n) {
  return (n.split("#").pop() ?? n.split("/").pop() ?? n).replace(/([a-z])([A-Z])/g, "$1 $2");
}
function Bo(n) {
  const e = n.toLowerCase();
  return e.includes("open") || e.includes("new") ? "issue-state-open" : e.includes("closed") || e.includes("done") || e.includes("resolved") || e.includes("fixed") ? "issue-state-closed" : e.includes("progress") || e.includes("active") ? "issue-state-active" : "issue-state-default";
}
function ym(n, e, t) {
  const r = document.createElement("div");
  r.className = "issue-view";
  const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "issue-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, Et("state"), null, null);
  if (a) {
    const m = document.createElement("span");
    m.className = `issue-state ${Bo(a.value)}`, m.textContent = Ni(a.value), r.appendChild(m);
  }
  const l = document.createElement("div");
  l.className = "issue-details";
  const u = e.any(n, Et("assignee"), null, null);
  if (u) {
    const m = e.any(u, B("name"), null, null)?.value ?? fe(u.value), v = document.createElement("div");
    v.className = "issue-detail", v.innerHTML = `<span class="issue-label">Assignee</span><span class="issue-value">${m}</span>`, l.appendChild(v);
  }
  const c = e.any(n, Et("priority"), null, null)?.value ?? e.any(n, B("priority"), null, null)?.value;
  if (c) {
    const m = document.createElement("div");
    m.className = "issue-detail", m.innerHTML = `<span class="issue-label">Priority</span><span class="issue-value">${Ni(c)}</span>`, l.appendChild(m);
  }
  const h = e.any(n, de("created"), null, null)?.value ?? e.any(n, B("dateCreated"), null, null)?.value;
  if (h) {
    const m = document.createElement("div");
    m.className = "issue-detail";
    const v = new Date(h), w = isNaN(v.getTime()) ? h : v.toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    m.innerHTML = `<span class="issue-label">Created</span><span class="issue-value">${w}</span>`, l.appendChild(m);
  }
  l.children.length > 0 && r.appendChild(l);
  const f = e.any(n, de("description"), null, null)?.value ?? e.any(n, B("description"), null, null)?.value ?? e.any(n, at("comment"), null, null)?.value;
  if (f) {
    const m = document.createElement("div");
    m.className = "issue-description", m.textContent = f, r.appendChild(m);
  }
  t.appendChild(r);
}
function vm(n, e, t) {
  const r = document.createElement("div");
  r.className = "tracker-view";
  const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "tracker-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, de("description"), null, null)?.value ?? e.any(n, B("description"), null, null)?.value;
  if (a) {
    const c = document.createElement("p");
    c.className = "tracker-description", c.textContent = a, r.appendChild(c);
  }
  const l = e.each(n, Et("issue"), null, null), u = document.createElement("p");
  if (u.className = "tracker-count", u.textContent = `${l.length} issue${l.length !== 1 ? "s" : ""}`, r.appendChild(u), l.length === 0) {
    const c = document.createElement("p");
    c.className = "tracker-empty", c.textContent = "No issues found.", r.appendChild(c);
  } else {
    const c = document.createElement("ul");
    c.className = "tracker-issues";
    for (const h of l) {
      const f = h, m = document.createElement("li");
      m.className = "tracker-issue";
      const v = e.any(f, Et("state"), null, null);
      if (v) {
        const _ = document.createElement("span");
        _.className = `issue-state ${Bo(v.value)}`, _.textContent = Ni(v.value), m.appendChild(_);
      }
      const w = e.any(f, de("title"), null, null)?.value ?? e.any(f, B("name"), null, null)?.value ?? fe(f.value), b = document.createElement("a");
      b.className = "tracker-issue-title", b.href = f.value, b.textContent = w, m.appendChild(b);
      const x = e.any(f, Et("assignee"), null, null);
      if (x) {
        const _ = e.any(x, B("name"), null, null)?.value ?? fe(x.value), R = document.createElement("span");
        R.className = "tracker-issue-assignee", R.textContent = _, m.appendChild(R);
      }
      c.appendChild(m);
    }
    r.appendChild(c);
  }
  t.appendChild(r);
}
function wm(n, e, t) {
  t.innerHTML = "", gm(n, e) ? vm(n, e, t) : ym(n, e, t);
}
const Em = [
  Et("Tracker").value,
  Et("Issue").value,
  Ei("Tracker").value,
  Ei("Issue").value
];
function Cm(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of Em)
    if (r.includes(i)) return !0;
  return !!(e.any(n, Et("issue"), null, null) || e.any(n, Et("state"), null, null));
}
const bm = {
  label: "Issues",
  icon: "📋",
  canHandle(n, e) {
    return Cm(n, e);
  },
  render(n, e, t) {
    wm(n, e, t);
  }
};
Ie(bm);
function Nm(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : e.toLocaleString(void 0, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Am(n, e) {
  return e.any(n, B("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? fe(n.value);
}
function xm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "meeting-view";
  const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "meeting-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, B("startDate"), null, null)?.value ?? e.any(n, de("created"), null, null)?.value ?? e.any(n, de("date"), null, null)?.value;
  if (a) {
    const v = document.createElement("p");
    v.className = "meeting-date", v.textContent = Nm(a), r.appendChild(v);
  }
  const l = e.any(n, B("location"), null, null)?.value ?? e.any(n, $t("location"), null, null)?.value;
  if (l && !l.startsWith("http")) {
    const v = document.createElement("p");
    v.className = "meeting-location", v.textContent = l, r.appendChild(v);
  }
  const u = e.any(n, de("description"), null, null)?.value ?? e.any(n, B("description"), null, null)?.value;
  if (u) {
    const v = document.createElement("p");
    v.className = "meeting-description", v.textContent = u, r.appendChild(v);
  }
  const c = e.each(n, $t("participant"), null, null);
  if (c.length > 0) {
    const v = document.createElement("div");
    v.className = "meeting-section";
    const w = document.createElement("h3");
    w.textContent = "Participants", v.appendChild(w);
    const b = document.createElement("ul");
    b.className = "meeting-participants";
    for (const x of c) {
      const _ = x, R = Am(_, e), G = document.createElement("li"), Y = document.createElement("a");
      Y.className = "meeting-participant", Y.href = _.value, Y.textContent = R, G.appendChild(Y), b.appendChild(G);
    }
    v.appendChild(b), r.appendChild(v);
  }
  const h = e.each(n, $t("agenda"), null, null);
  if (h.length > 0) {
    const v = document.createElement("div");
    v.className = "meeting-section";
    const w = document.createElement("h3");
    w.textContent = "Agenda", v.appendChild(w);
    const b = document.createElement("ol");
    b.className = "meeting-agenda";
    for (const x of h) {
      const _ = document.createElement("li"), R = e.any(x, de("title"), null, null)?.value ?? e.any(x, B("name"), null, null)?.value ?? x.value;
      R && !R.startsWith("http") ? _.textContent = R : _.textContent = fe(R), b.appendChild(_);
    }
    v.appendChild(b), r.appendChild(v);
  }
  const f = e.each(n, $t("action"), null, null);
  if (f.length > 0) {
    const v = document.createElement("div");
    v.className = "meeting-section";
    const w = document.createElement("h3");
    w.textContent = "Action Items", v.appendChild(w);
    const b = document.createElement("ul");
    b.className = "meeting-actions";
    for (const x of f) {
      const _ = document.createElement("li"), R = e.any(x, de("title"), null, null)?.value ?? e.any(x, B("name"), null, null)?.value ?? e.any(x, at("label"), null, null)?.value ?? x.value;
      R && !R.startsWith("http") ? _.textContent = R : _.textContent = fe(R), b.appendChild(_);
    }
    v.appendChild(b), r.appendChild(v);
  }
  const m = e.any(n, kt("content"), null, null)?.value ?? e.any(n, B("text"), null, null)?.value;
  if (m) {
    const v = document.createElement("div");
    v.className = "meeting-section";
    const w = document.createElement("h3");
    w.textContent = "Notes", v.appendChild(w);
    const b = document.createElement("div");
    b.className = "meeting-notes", b.textContent = m, v.appendChild(b), r.appendChild(v);
  }
  t.appendChild(r);
}
$t("Meeting").value, B("Event").value;
function Tm(n, e) {
  return !!(e.each(n, me("type"), null, null).map((i) => i.value).includes($t("Meeting").value) || e.any(n, $t("participant"), null, null) || e.any(n, $t("agenda"), null, null));
}
const Dm = {
  label: "Meeting",
  icon: "🤝",
  canHandle(n, e) {
    return Tm(n, e);
  },
  render(n, e, t) {
    xm(n, e, t);
  }
};
Ie(Dm);
const El = {
  Create: "created",
  Update: "updated",
  Delete: "deleted",
  Add: "added",
  Remove: "removed",
  Like: "liked",
  Follow: "followed",
  Announce: "shared",
  Accept: "accepted",
  Reject: "rejected",
  Invite: "invited",
  Offer: "offered",
  Undo: "undid",
  Block: "blocked",
  Flag: "flagged",
  Move: "moved",
  Read: "read",
  View: "viewed",
  Listen: "listened to",
  Join: "joined",
  Leave: "left"
};
function _m(n, e) {
  const t = [], r = [
    ...e.each(n, et("contains"), null, null),
    ...e.each(n, ze("items"), null, null),
    ...e.each(n, rn("notification"), null, null)
  ], i = /* @__PURE__ */ new Set();
  for (const s of r) {
    if (i.has(s.value)) continue;
    i.add(s.value);
    const a = s, l = e.each(a, me("type"), null, null).map((R) => R.value);
    let u = "";
    for (const R of l) {
      const G = R.split("#").pop() ?? R.split("/").pop() ?? "";
      if (El[G]) {
        u = G;
        break;
      }
    }
    const c = e.any(a, ze("actor"), null, null);
    let h = "", f = null;
    c && (f = c.value, h = e.any(c, B("name"), null, null)?.value ?? e.any(c, ze("name"), null, null)?.value ?? fe(c.value));
    const m = e.any(a, ze("object"), null, null);
    let v = "", w = null;
    m && (w = m.value, v = e.any(m, B("name"), null, null)?.value ?? e.any(m, ze("name"), null, null)?.value ?? fe(m.value));
    const b = e.any(a, ze("content"), null, null)?.value ?? e.any(a, ze("summary"), null, null)?.value ?? e.any(a, de("description"), null, null)?.value ?? null, x = e.any(a, ze("published"), null, null)?.value ?? e.any(a, de("created"), null, null)?.value ?? e.any(a, de("date"), null, null)?.value ?? null, _ = El[u] ?? (u.toLowerCase() || "notified");
    t.push({
      uri: a.value,
      type: u,
      actor: h,
      actorUri: f,
      verb: _,
      object: v,
      objectUri: w,
      content: b,
      timestamp: x
    });
  }
  return t.sort((s, a) => !s.timestamp && !a.timestamp ? 0 : s.timestamp ? a.timestamp ? new Date(a.timestamp).getTime() - new Date(s.timestamp).getTime() : -1 : 1), t;
}
function Sm(n) {
  const e = new Date(n);
  if (isNaN(e.getTime())) return n;
  const t = /* @__PURE__ */ new Date(), r = t.getTime() - e.getTime(), i = Math.floor(r / 6e4), s = Math.floor(r / 36e5), a = Math.floor(r / 864e5);
  return i < 1 ? "just now" : i < 60 ? `${i}m ago` : s < 24 ? `${s}h ago` : a < 7 ? `${a}d ago` : e.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: e.getFullYear() !== t.getFullYear() ? "numeric" : void 0
  });
}
function Fm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "notif-view";
  const i = e.any(n, B("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? "Notifications", s = document.createElement("h2");
  s.className = "notif-title", s.textContent = i, r.appendChild(s);
  const a = _m(n, e), l = document.createElement("p");
  if (l.className = "notif-count", l.textContent = `${a.length} notification${a.length !== 1 ? "s" : ""}`, r.appendChild(l), a.length === 0) {
    const c = document.createElement("p");
    c.className = "notif-empty", c.textContent = "No notifications.", r.appendChild(c), t.appendChild(r);
    return;
  }
  const u = document.createElement("div");
  u.className = "notif-list";
  for (const c of a) {
    const h = document.createElement("div");
    h.className = "notif-item";
    const f = document.createElement("div");
    if (f.className = "notif-summary", c.actor) {
      const m = document.createElement("a");
      m.className = "notif-actor", m.textContent = c.actor, c.actorUri && (m.href = c.actorUri), f.appendChild(m), f.appendChild(document.createTextNode(` ${c.verb} `));
    } else
      f.appendChild(document.createTextNode(`${c.verb} `));
    if (c.object) {
      const m = document.createElement("a");
      m.className = "notif-object", m.textContent = c.object, c.objectUri && (m.href = c.objectUri), f.appendChild(m);
    }
    if (h.appendChild(f), c.content) {
      const m = document.createElement("p");
      m.className = "notif-content", m.textContent = c.content, h.appendChild(m);
    }
    if (c.timestamp) {
      const m = document.createElement("time");
      m.className = "notif-time", m.dateTime = c.timestamp, m.textContent = Sm(c.timestamp), h.appendChild(m);
    }
    u.appendChild(h);
  }
  r.appendChild(u), t.appendChild(r);
}
function Im(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return !!((t.includes(et("Container").value) || t.includes(et("BasicContainer").value)) && (e.match(null, et("inbox"), n, null).length > 0 || e.match(null, rn("inbox"), n, null).length > 0) || t.includes(ze("OrderedCollection").value) || t.includes(ze("Collection").value) && (e.any(n, ze("items"), null, null) || e.any(n, et("contains"), null, null)) || e.any(n, rn("notification"), null, null));
}
const Lm = {
  label: "Notifications",
  icon: "🔔",
  canHandle(n, e) {
    return Im(n, e);
  },
  render(n, e, t) {
    Fm(n, e, t);
  }
};
Ie(Lm);
const Bm = {
  SingleLineTextField: { inputType: "text" },
  TextField: { inputType: "text" },
  NamedNodeURIField: { inputType: "url" },
  IntegerField: { inputType: "number", xsdType: "integer" },
  DecimalField: { inputType: "number", xsdType: "decimal" },
  FloatField: { inputType: "number", xsdType: "float" },
  DateField: { inputType: "date", xsdType: "date" },
  DateTimeField: { inputType: "datetime-local", xsdType: "dateTime" },
  TimeField: { inputType: "time", xsdType: "time" },
  ColorField: { inputType: "color" },
  PhoneField: { inputType: "tel" },
  EmailField: { inputType: "email" }
};
function Cl(n, e) {
  return e.any(n, at("label"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value);
}
function Rm(n, e) {
  const t = e.each(n, me("type"), null, null);
  for (const r of t) {
    const i = fe(r.value);
    if (i !== "type") return i;
  }
  return "Unknown";
}
function km(n, e) {
  const t = [], r = e.each(n, yt("part"), null, null), i = e.any(n, yt("parts"), null, null);
  i && i.termType === "NamedNode" && Om(i, e, t);
  for (const s of r) {
    if (s.termType !== "NamedNode") continue;
    const a = s;
    t.some((l) => l.uri === a.value) || t.push(Ro(a, e));
  }
  return t.sort((s, a) => s.sequence - a.sequence), t;
}
function Om(n, e, t) {
  let r = n;
  const i = /* @__PURE__ */ new Set();
  for (; r && !i.has(r.value) && (i.add(r.value), r.value !== me("nil").value); ) {
    const s = e.any(r, me("first"), null, null);
    s && s.termType === "NamedNode" && t.push(Ro(s, e));
    const a = e.any(r, me("rest"), null, null);
    if (a && a.termType === "NamedNode")
      r = a;
    else
      break;
  }
}
function Ro(n, e) {
  const t = Rm(n, e), r = e.any(n, yt("property"), null, null)?.value ?? null, i = e.any(n, yt("label"), null, null)?.value ?? (r ? fe(r) : t), s = e.any(n, yt("sequence"), null, null)?.value, a = s ? parseInt(s, 10) : 999, l = e.any(n, yt("contents"), null, null)?.value ?? null;
  return { uri: n.value, fieldType: t, property: r, label: i, sequence: a, contents: l };
}
function Um(n, e) {
  const t = e.each(n, me("type"), null, null);
  if (t.some((r) => r.value === yt("Form").value)) return n;
  for (const r of t) {
    if (r.termType !== "NamedNode") continue;
    const i = e.any(r, yt("annotationForm"), null, null);
    if (i && i.termType === "NamedNode") return i;
    const s = e.any(r, yt("creationForm"), null, null);
    if (s && s.termType === "NamedNode") return s;
    const a = e.each(r, at("subClassOf"), null, null);
    for (const l of a) {
      if (l.termType !== "NamedNode") continue;
      const u = e.any(l, yt("annotationForm"), null, null);
      if (u && u.termType === "NamedNode") return u;
      const c = e.any(l, yt("creationForm"), null, null);
      if (c && c.termType === "NamedNode") return c;
    }
  }
  return null;
}
function Mm(n, e, t) {
  const r = document.createElement("div");
  if (r.className = "form-field", n.fieldType === "Comment") {
    const c = document.createElement("p");
    return c.className = "form-comment", c.textContent = n.contents ?? "", c;
  }
  if (n.fieldType === "Heading") {
    const c = document.createElement("h3");
    return c.className = "form-heading", c.textContent = n.contents ?? n.label, c;
  }
  const i = document.createElement("label");
  i.className = "form-field-label", i.textContent = n.label, n.property && (i.title = n.property), r.appendChild(i);
  const s = document.createElement("div");
  s.className = "form-field-value";
  let a = "";
  if (n.property) {
    const c = { termType: "NamedNode", value: n.property }, h = t.any(e, c, null, null);
    h && (a = h.value);
  }
  if (n.fieldType === "BooleanField" || n.fieldType === "TristateField") {
    const c = document.createElement("span");
    return c.className = "form-boolean", a === "true" || a === "1" ? (c.textContent = "✓", c.classList.add("form-bool-true")) : a === "false" || a === "0" ? (c.textContent = "✗", c.classList.add("form-bool-false")) : (c.textContent = n.fieldType === "TristateField" ? "—" : "✗", c.classList.add("form-bool-null")), s.appendChild(c), r.appendChild(s), r;
  }
  if (n.fieldType === "MultiLineTextField") {
    const c = document.createElement("textarea");
    return c.className = "form-textarea", c.value = a, c.readOnly = !0, c.rows = 4, s.appendChild(c), r.appendChild(s), r;
  }
  if (n.fieldType === "Choice" || n.fieldType === "Classifier") {
    const c = document.createElement("select");
    c.className = "form-select", c.disabled = !0;
    const h = document.createElement("option");
    return h.textContent = a ? fe(a) : "(none)", h.value = a, c.appendChild(h), s.appendChild(c), r.appendChild(s), r;
  }
  const l = Bm[n.fieldType], u = document.createElement("input");
  return u.className = "form-input", u.type = l?.inputType ?? "text", u.value = a, u.readOnly = !0, s.appendChild(u), r.appendChild(s), r;
}
function Pm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "form-view";
  const i = Um(n, e);
  if (!i) {
    const f = document.createElement("p");
    f.className = "form-empty", f.textContent = "No form definition found for this resource.", r.appendChild(f), t.appendChild(r);
    return;
  }
  const s = e.any(i, de("title"), null, null)?.value ?? e.any(i, tt("title"), null, null)?.value ?? Cl(i, e), a = document.createElement("h2");
  if (a.className = "form-title", a.textContent = s, r.appendChild(a), !(i.value === n.value)) {
    const f = document.createElement("p");
    f.className = "form-subject", f.textContent = `Editing: ${Cl(n, e)}`, r.appendChild(f);
  }
  const u = km(i, e);
  if (u.length === 0) {
    const f = document.createElement("p");
    f.className = "form-no-fields", f.textContent = "This form has no fields defined.", r.appendChild(f), t.appendChild(r);
    return;
  }
  const c = document.createElement("p");
  c.className = "form-count", c.textContent = `${u.length} field${u.length !== 1 ? "s" : ""}`, r.appendChild(c);
  const h = document.createElement("div");
  h.className = "form-fields";
  for (const f of u)
    h.appendChild(Mm(f, n, e));
  r.appendChild(h), t.appendChild(r);
}
function $m(n, e) {
  const t = e.each(n, me("type"), null, null);
  if (t.map((i) => i.value).includes(yt("Form").value)) return !0;
  for (const i of t) {
    if (i.termType !== "NamedNode") continue;
    if (e.any(i, yt("creationForm"), null, null) || e.any(i, yt("annotationForm"), null, null)) return !0;
    const s = e.each(i, at("subClassOf"), null, null);
    for (const a of s)
      if (a.termType === "NamedNode" && (e.any(a, yt("creationForm"), null, null) || e.any(a, yt("annotationForm"), null, null)))
        return !0;
  }
  return !1;
}
const qm = {
  label: "Form",
  icon: "📋",
  canHandle(n, e) {
    return $m(n, e);
  },
  render(n, e, t) {
    Pm(n, e, t);
  }
};
Ie(qm);
const Hm = [
  { uri: "Read", label: "Read" },
  { uri: "Write", label: "Write" },
  { uri: "Append", label: "Append" },
  { uri: "Control", label: "Control" }
];
function Wm(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, we("fn"), null, null)?.value ?? fe(n.value);
}
function Vm(n, e) {
  const t = [], r = e.each(n, vt("trustedApp"), null, null);
  for (const i of r) {
    const s = e.any(i, vt("origin"), null, null);
    if (!s) continue;
    const a = s.value, l = fe(a), c = e.each(i, vt("mode"), null, null).map((h) => fe(h.value));
    t.push({ originUri: a, originLabel: l, modes: c });
  }
  return t.sort((i, s) => i.originUri.localeCompare(s.originUri)), t;
}
function Km(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "trusted-apps-view";
  const i = document.createElement("h2");
  i.className = "trusted-apps-title", i.textContent = "Trusted Applications", r.appendChild(i);
  const s = Wm(n, e), a = document.createElement("p");
  a.className = "trusted-apps-subtitle", a.textContent = `Manage applications trusted by ${s}`, r.appendChild(a);
  const l = Vm(n, e), u = document.createElement("p");
  if (u.className = "trusted-apps-count", u.textContent = `${l.length} trusted application${l.length !== 1 ? "s" : ""}`, r.appendChild(u), l.length === 0) {
    const b = document.createElement("p");
    b.className = "trusted-apps-empty", b.textContent = "No trusted applications configured.", r.appendChild(b), bl(r), t.appendChild(r);
    return;
  }
  const c = document.createElement("table");
  c.className = "trusted-apps-table";
  const h = document.createElement("thead"), f = document.createElement("tr"), m = document.createElement("th");
  m.textContent = "Application URL";
  const v = document.createElement("th");
  v.textContent = "Access Modes", f.appendChild(m), f.appendChild(v), h.appendChild(f), c.appendChild(h);
  const w = document.createElement("tbody");
  for (const b of l) {
    const x = document.createElement("tr");
    x.className = "trusted-apps-row";
    const _ = document.createElement("td");
    _.className = "trusted-apps-origin";
    const R = document.createElement("a");
    R.href = b.originUri, R.textContent = b.originUri, R.target = "_blank", R.rel = "noopener", _.appendChild(R), x.appendChild(_);
    const G = document.createElement("td");
    G.className = "trusted-apps-modes";
    for (const Y of Hm) {
      const A = document.createElement("span"), K = b.modes.includes(Y.uri);
      A.className = `trusted-apps-mode ${K ? "trusted-apps-mode-active" : "trusted-apps-mode-inactive"}`, A.textContent = Y.label, G.appendChild(A);
    }
    x.appendChild(G), w.appendChild(x);
  }
  c.appendChild(w), r.appendChild(c), bl(r), t.appendChild(r);
}
function bl(n) {
  const e = document.createElement("div");
  e.className = "trusted-apps-notes";
  const t = document.createElement("h3");
  t.textContent = "Notes", e.appendChild(t);
  const r = document.createElement("ol"), i = [
    "Trusted applications get access to all resources that you have access to.",
    "You can limit which modes they have by default.",
    "They will not gain more access than you have."
  ];
  for (const s of i) {
    const a = document.createElement("li");
    a.textContent = s, r.appendChild(a);
  }
  e.appendChild(r), n.appendChild(e);
}
function Gm(n, e) {
  return e.each(n, vt("trustedApp"), null, null).length > 0;
}
const jm = {
  label: "Trusted Apps",
  icon: "🛡️",
  canHandle(n, e) {
    return Gm(n, e);
  },
  render(n, e, t) {
    Km(n, e, t);
  }
};
Ie(jm);
function Xm(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? "Notepad";
}
function ko(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value);
}
function zm(n, e) {
  const t = [], r = /* @__PURE__ */ new Set();
  let i = e.any(n, _a("next"), null, null);
  for (; i && i.termType === "NamedNode" && !r.has(i.value) && i.value !== n.value; ) {
    r.add(i.value);
    const s = i, a = e.any(s, kt("content"), null, null)?.value ?? e.any(s, tt("description"), null, null)?.value ?? "", l = e.any(s, tt("author"), null, null) ?? e.any(s, de("creator"), null, null) ?? e.any(s, be("maker"), null, null);
    let u = null, c = null;
    l && (c = l.value, l.termType === "NamedNode" ? u = ko(l, e) : u = l.value), t.push({ uri: s.value, content: a, author: u, authorUri: c }), i = e.any(s, _a("next"), null, null);
  }
  return t;
}
function Jm(n, e) {
  const t = e.any(n, de("created"), null, null)?.value ?? e.any(n, tt("date"), null, null)?.value;
  if (!t) return null;
  const r = new Date(t);
  return isNaN(r.getTime()) ? t : r.toLocaleDateString();
}
function Ym(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "pad-view";
  const i = Xm(n, e), s = document.createElement("h2");
  s.className = "pad-title", s.textContent = i, r.appendChild(s);
  const a = document.createElement("div");
  a.className = "pad-meta";
  const l = Jm(n, e);
  if (l) {
    const w = document.createElement("span");
    w.className = "pad-date", w.textContent = `Created: ${l}`, a.appendChild(w);
  }
  const u = e.any(n, tt("author"), null, null) ?? e.any(n, de("creator"), null, null);
  if (u && u.termType === "NamedNode") {
    const w = ko(u, e), b = document.createElement("span");
    b.className = "pad-author", b.textContent = `Author: ${w}`, a.appendChild(b);
  }
  a.children.length > 0 && r.appendChild(a);
  const c = zm(n, e);
  if (c.length === 0) {
    const w = document.createElement("p");
    w.className = "pad-empty", w.textContent = "This notepad is empty.", r.appendChild(w), t.appendChild(r);
    return;
  }
  const h = document.createElement("div");
  h.className = "pad-content";
  const m = new Set(c.filter((w) => w.author).map((w) => w.authorUri)).size > 1;
  for (const w of c) {
    const b = document.createElement("div");
    if (b.className = "pad-chunk", m && w.author) {
      const R = document.createElement("span");
      R.className = "pad-chunk-author", R.textContent = w.author, w.authorUri && (R.title = w.authorUri), b.appendChild(R);
    }
    const x = document.createElement("div");
    x.className = "pad-chunk-text";
    const _ = w.content.split(`
`);
    for (let R = 0; R < _.length; R++)
      R > 0 && x.appendChild(document.createElement("br")), x.appendChild(document.createTextNode(_[R]));
    b.appendChild(x), h.appendChild(b);
  }
  r.appendChild(h);
  const v = document.createElement("p");
  v.className = "pad-count", v.textContent = `${c.length} chunk${c.length !== 1 ? "s" : ""}`, r.appendChild(v), t.appendChild(r);
}
function Qm(n, e) {
  return !!(e.each(n, me("type"), null, null).map((i) => i.value).includes(_a("Notepad").value) || e.any(n, _a("next"), null, null));
}
const Zm = {
  label: "Notepad",
  icon: "📝",
  canHandle(n, e) {
    return Qm(n, e);
  },
  render(n, e, t) {
    Ym(n, e, t);
  }
};
Ie(Zm);
function e0(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? e.any(n, kt("name"), null, null)?.value ?? "Microblog";
}
function t0(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value);
}
function n0(n, e) {
  return e.each(n, me("type"), null, null).some((r) => r.value === wa("MicroblogPost").value);
}
function Oo(n, e) {
  const t = e.any(n, kt("content"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value ?? e.any(n, tt("description"), null, null)?.value ?? "", r = e.any(n, de("created"), null, null)?.value ?? e.any(n, tt("date"), null, null)?.value, i = r ? new Date(r) : null, s = e.any(n, kt("has_creator"), null, null) ?? e.any(n, be("maker"), null, null) ?? e.any(n, de("creator"), null, null);
  let a = null, l = null;
  return s && (l = s.value, s.termType === "NamedNode" ? a = t0(s, e) : a = s.value), { uri: n.value, content: t, created: i, creator: a, creatorUri: l };
}
function r0(n, e) {
  const t = e.each(n, kt("container_of"), null, null), r = [];
  for (const i of t)
    i.termType === "NamedNode" && r.push(Oo(i, e));
  return r.sort((i, s) => !i.created && !s.created ? 0 : i.created ? s.created ? s.created.getTime() - i.created.getTime() : -1 : 1), r;
}
function a0(n) {
  const e = /* @__PURE__ */ new Date(), t = e.getTime() - n.getTime(), r = Math.floor(t / 6e4), i = Math.floor(t / 36e5), s = Math.floor(t / 864e5);
  return r < 1 ? "just now" : r < 60 ? `${r}m ago` : i < 24 ? `${i}h ago` : s < 7 ? `${s}d ago` : n.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: n.getFullYear() !== e.getFullYear() ? "numeric" : void 0
  });
}
function i0(n, e) {
  const t = /(https?:\/\/[^\s<>"]+)/g, r = n.split(t);
  for (const i of r)
    if (t.test(i)) {
      t.lastIndex = 0;
      const s = document.createElement("a");
      s.href = i, s.textContent = i, s.target = "_blank", s.rel = "noopener", e.appendChild(s);
    } else i && e.appendChild(document.createTextNode(i));
}
function Nl(n) {
  const e = document.createElement("div");
  e.className = "microblog-post";
  const t = document.createElement("div");
  if (t.className = "microblog-post-header", n.creator) {
    const s = document.createElement("span");
    s.className = "microblog-post-author", s.textContent = n.creator, n.creatorUri && (s.title = n.creatorUri), t.appendChild(s);
  }
  if (n.created) {
    const s = document.createElement("time");
    s.className = "microblog-post-time", s.dateTime = n.created.toISOString(), s.textContent = a0(n.created), t.appendChild(s);
  }
  e.appendChild(t);
  const r = document.createElement("div");
  r.className = "microblog-post-content", i0(n.content, r), e.appendChild(r);
  const i = n.content.length;
  if (i > 0) {
    const s = document.createElement("span");
    s.className = "microblog-char-count", s.textContent = `${i}`, e.appendChild(s);
  }
  return e;
}
function s0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  if (r.className = "microblog-view", n0(n, e)) {
    const h = Oo(n, e), f = document.createElement("h2");
    f.className = "microblog-title", f.textContent = "Microblog Post", r.appendChild(f), r.appendChild(Nl(h)), t.appendChild(r);
    return;
  }
  const i = e0(n, e), s = document.createElement("h2");
  s.className = "microblog-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, de("description"), null, null)?.value ?? e.any(n, tt("description"), null, null)?.value;
  if (a) {
    const h = document.createElement("p");
    h.className = "microblog-description", h.textContent = a, r.appendChild(h);
  }
  const l = r0(n, e), u = document.createElement("p");
  if (u.className = "microblog-count", u.textContent = `${l.length} post${l.length !== 1 ? "s" : ""}`, r.appendChild(u), l.length === 0) {
    const h = document.createElement("p");
    h.className = "microblog-empty", h.textContent = "No posts yet.", r.appendChild(h), t.appendChild(r);
    return;
  }
  const c = document.createElement("div");
  c.className = "microblog-feed";
  for (const h of l)
    c.appendChild(Nl(h));
  r.appendChild(c), t.appendChild(r);
}
function l0(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  if (r.includes(wa("Microblog").value) || r.includes(wa("MessageBoard").value) || r.includes(kt("Forum").value) || r.includes(wa("MicroblogPost").value)) return !0;
  const i = e.each(n, kt("container_of"), null, null);
  if (i.length > 0) {
    for (const s of i)
      if (s.termType === "NamedNode" && e.any(s, kt("content"), null, null))
        return !0;
  }
  return !1;
}
const o0 = {
  label: "Microblog",
  icon: "📢",
  canHandle(n, e) {
    return l0(n, e);
  },
  render(n, e, t) {
    s0(n, e, t);
  }
};
Ie(o0);
function u0(n, e) {
  const t = e.each(n, Lr("slot"), null, null), r = [];
  for (const i of t) {
    const s = e.any(i, Lr("index"), null, null), a = e.any(i, Lr("item"), null, null);
    if (!a) continue;
    const l = a, u = e.any(l, tt("title"), null, null)?.value ?? e.any(l, de("title"), null, null)?.value ?? e.any(l, B("name"), null, null)?.value ?? l.value, c = e.any(l, B("video"), null, null)?.value ?? e.any(l, B("contentUrl"), null, null)?.value ?? void 0;
    r.push({
      index: s ? Number(s.value) : 0,
      title: u,
      uri: l.value,
      videoUrl: c
    });
  }
  return r.sort((i, s) => i.index - s.index), r;
}
function c0(n) {
  const e = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/
  ];
  for (const t of e) {
    const r = n.match(t);
    if (r) return r[1];
  }
  return null;
}
function d0(n) {
  const e = document.createElement("figure");
  if (e.className = "playlist-media", n.videoUrl) {
    const r = c0(n.videoUrl);
    if (r) {
      const i = document.createElement("iframe");
      i.src = `https://www.youtube-nocookie.com/embed/${r}`, i.width = "560", i.height = "315", i.title = n.title, i.allowFullscreen = !0, i.setAttribute("loading", "lazy"), i.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ), e.appendChild(i);
    } else {
      const i = document.createElement("video");
      i.src = n.videoUrl, i.controls = !0, i.width = 560, e.appendChild(i);
    }
  }
  const t = document.createElement("figcaption");
  return t.className = "playlist-caption", t.textContent = n.title, e.appendChild(t), e;
}
function h0(n, e, t) {
  t.innerHTML = "";
  const r = e.any(n, tt("title"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? "Untitled Playlist", i = u0(n, e);
  if (i.length === 0) {
    const f = document.createElement("p");
    f.textContent = "No tracks found in this playlist.", t.appendChild(f);
    return;
  }
  let s = 0;
  const a = document.createElement("div");
  a.className = "playlist-container", a.setAttribute("role", "region"), a.setAttribute("aria-label", r);
  const l = document.createElement("h2");
  l.className = "playlist-title", l.textContent = r, a.appendChild(l);
  const u = document.createElement("div");
  u.className = "playlist-player", a.appendChild(u);
  const c = document.createElement("ol");
  c.className = "playlist-tracks";
  for (let f = 0; f < i.length; f++) {
    const m = document.createElement("li");
    m.className = "playlist-track", f === 0 && m.classList.add("playlist-track--active"), m.dataset.uri = i[f].uri;
    const v = document.createElement("button");
    v.className = "playlist-track-btn", v.textContent = i[f].title, v.setAttribute("aria-label", `Play ${i[f].title}`), v.addEventListener("click", () => h(f)), m.appendChild(v), c.appendChild(m);
  }
  a.appendChild(c), t.appendChild(a);
  function h(f) {
    s = f;
    const m = i[f];
    u.innerHTML = "";
    const v = d0(m);
    if (u.appendChild(v), i.length > 1) {
      const b = document.createElement("nav");
      b.className = "playlist-nav", b.setAttribute("aria-label", "Playlist navigation");
      const x = document.createElement("button");
      x.className = "playlist-nav-link", x.setAttribute("aria-label", "Previous track"), x.textContent = "◀ Previous", x.addEventListener("click", () => {
        h((s - 1 + i.length) % i.length);
      }), b.appendChild(x);
      const _ = document.createElement("span");
      _.className = "playlist-slot-info", _.setAttribute("aria-current", "true"), _.textContent = `${f + 1} / ${i.length}`, b.appendChild(_);
      const R = document.createElement("button");
      R.className = "playlist-nav-link", R.setAttribute("aria-label", "Next track"), R.textContent = "Next ▶", R.addEventListener("click", () => {
        h((s + 1) % i.length);
      }), b.appendChild(R), u.appendChild(b);
    }
    const w = c.querySelectorAll(".playlist-track");
    for (let b = 0; b < w.length; b++)
      w[b].classList.toggle("playlist-track--active", b === f);
  }
  h(0);
}
function f0(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  return r.includes(Lr("OrderedList").value) || r.includes(nf("Playlist").value) ? !0 : e.each(n, Lr("slot"), null, null).length > 0;
}
const p0 = {
  label: "Playlist",
  icon: "🎵",
  canHandle(n, e) {
    return f0(n, e);
  },
  render(n, e, t) {
    h0(n, e, t);
  }
};
Ie(p0);
function m0(n, e) {
  if (e) return "📁";
  const t = n.split(".").pop()?.toLowerCase() ?? "";
  return {
    // Images
    jpg: "🖼",
    jpeg: "🖼",
    png: "🖼",
    gif: "🖼",
    svg: "🖼",
    webp: "🖼",
    bmp: "🖼",
    ico: "🖼",
    // Audio
    mp3: "🎵",
    wav: "🎵",
    ogg: "🎵",
    flac: "🎵",
    m4a: "🎵",
    // Video
    mp4: "🎬",
    webm: "🎬",
    avi: "🎬",
    mov: "🎬",
    mkv: "🎬",
    // Documents
    pdf: "📑",
    doc: "📝",
    docx: "📝",
    // Data
    ttl: "📊",
    rdf: "📊",
    jsonld: "📊",
    n3: "📊",
    nq: "📊",
    json: "📋",
    xml: "📋",
    csv: "📋",
    // Code
    js: "📜",
    ts: "📜",
    py: "📜",
    html: "📜",
    css: "📜",
    // Text
    txt: "📄",
    md: "📄",
    // Archives
    zip: "📦",
    tar: "📦",
    gz: "📦"
  }[t] ?? "📄";
}
function g0(n, e) {
  const t = e.each(n, et("contains"), null, null), r = [];
  for (const i of t) {
    const s = i, a = s.value, l = e.each(s, me("type"), null, null).map((b) => b.value), u = l.includes(et("Container").value) || l.includes(et("BasicContainer").value) || a.endsWith("/"), c = Pi(a, u), f = (e.any(s, de("modified"), null, null) ?? e.any(s, il("mtime"), null, null))?.value, m = e.any(s, il("size"), null, null), v = m ? Number(m.value) : void 0, w = e.any(s, de("format"), null, null)?.value ?? void 0;
    r.push({ uri: a, name: c, isContainer: u, modified: f, size: v, contentType: w });
  }
  return r.sort((i, s) => i.isContainer !== s.isContainer ? i.isContainer ? -1 : 1 : i.name.localeCompare(s.name)), r;
}
function Pi(n, e) {
  const r = (e ? n.replace(/\/$/, "") : n).split("/");
  return decodeURIComponent(r[r.length - 1] || n);
}
function y0(n) {
  return n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function v0(n) {
  const e = Number(n), t = Number.isNaN(e) ? new Date(n) : new Date(e * 1e3);
  return Number.isNaN(t.getTime()) ? n : t.toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function w0(n) {
  const e = n.replace(/\/$/, ""), t = e.lastIndexOf("/");
  return t <= 7 ? null : e.slice(0, t + 1);
}
function E0(n) {
  const e = [];
  let t = n;
  for (; ; ) {
    const r = Pi(t, !0);
    e.unshift({ label: r || "Root", uri: t });
    const i = w0(t);
    if (!i) break;
    t = i;
  }
  return e;
}
function C0(n, e, t, r) {
  const i = document.createElement("div");
  i.className = "folder-toolbar";
  const s = document.createElement("button");
  s.className = "folder-toolbar-btn", s.textContent = "📁 New Folder", i.appendChild(s);
  const a = document.createElement("button");
  a.className = "folder-toolbar-btn", a.textContent = "📄 New File", i.appendChild(a);
  const l = document.createElement("div");
  l.className = "folder-create-form", l.hidden = !0;
  const u = document.createElement("span");
  u.className = "folder-create-label", l.appendChild(u);
  const c = document.createElement("input");
  c.type = "text", c.className = "folder-create-input", c.placeholder = "Name...", l.appendChild(c);
  const h = document.createElement("button");
  h.className = "folder-toolbar-btn folder-create-ok", h.textContent = "Create", l.appendChild(h);
  const f = document.createElement("button");
  f.className = "folder-toolbar-btn folder-create-cancel", f.textContent = "Cancel", l.appendChild(f);
  const m = document.createElement("span");
  m.className = "folder-create-status", l.appendChild(m), i.appendChild(l);
  let v = "folder";
  function w(x) {
    v = x, u.textContent = x === "folder" ? "Folder name:" : "File name:", c.value = "", m.textContent = "", l.hidden = !1, s.hidden = !0, a.hidden = !0, c.focus();
  }
  function b() {
    l.hidden = !0, s.hidden = !1, a.hidden = !1, m.textContent = "";
  }
  return s.addEventListener("click", () => w("folder")), a.addEventListener("click", () => w("file")), f.addEventListener("click", b), c.addEventListener("keydown", (x) => {
    x.key === "Enter" && h.click(), x.key === "Escape" && b();
  }), h.addEventListener("click", async () => {
    const x = c.value.trim();
    if (!x) {
      m.textContent = "Name cannot be empty.";
      return;
    }
    h.disabled = !0, m.textContent = "Creating...";
    try {
      if (v === "folder") {
        const _ = n.value.endsWith("/") ? n.value : n.value + "/";
        await e.webOperation("POST", _, {
          data: "",
          contentType: "text/turtle",
          headers: {
            Slug: x,
            Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"'
          }
        });
      } else {
        const R = (n.value.endsWith("/") ? n.value : n.value + "/") + encodeURIComponent(x), G = x.split(".").pop()?.toLowerCase() ?? "", A = {
          ttl: "text/turtle",
          rdf: "application/rdf+xml",
          jsonld: "application/ld+json",
          json: "application/json",
          html: "text/html",
          css: "text/css",
          js: "application/javascript",
          txt: "text/plain",
          md: "text/markdown",
          xml: "application/xml",
          csv: "text/csv"
        }[G] ?? "text/turtle";
        await e.webOperation("PUT", R, {
          data: "",
          contentType: A
        });
      }
      b(), await e.load(n, { force: !0 }), Uo(n, r, t);
    } catch (_) {
      const R = _ instanceof Error ? _.message : String(_);
      m.textContent = `Error: ${R}`, h.disabled = !1;
    }
  }), i;
}
function Uo(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "folder-view";
  const i = e.any(n, tt("title"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? Pi(n.value, !0), s = document.createElement("h2");
  s.className = "folder-title", s.textContent = i, r.appendChild(s);
  const a = E0(n.value);
  if (a.length > 1) {
    const _ = document.createElement("nav");
    _.className = "folder-breadcrumbs", _.setAttribute("aria-label", "Folder path");
    for (let R = 0; R < a.length; R++) {
      if (R > 0) {
        const G = document.createElement("span");
        G.className = "folder-breadcrumb-sep", G.textContent = " / ", _.appendChild(G);
      }
      if (R < a.length - 1) {
        const G = An(a[R].uri, a[R].label);
        G.className = "folder-breadcrumb", _.appendChild(G);
      } else {
        const G = document.createElement("span");
        G.className = "folder-breadcrumb-current", G.textContent = a[R].label, _.appendChild(G);
      }
    }
    r.appendChild(_);
  }
  const l = document.createElement("p");
  l.className = "folder-path", l.textContent = n.value, r.appendChild(l);
  const u = g0(n, e), c = u.filter((_) => _.isContainer), h = u.filter((_) => !_.isContainer), f = [];
  c.length > 0 && f.push(`${c.length} folder${c.length !== 1 ? "s" : ""}`), h.length > 0 && f.push(`${h.length} file${h.length !== 1 ? "s" : ""}`);
  const m = document.createElement("p");
  m.className = "folder-count", m.textContent = f.length > 0 ? f.join(", ") : "0 items", r.appendChild(m);
  const v = e.fetcher;
  if (v) {
    const _ = C0(n, v, t, e);
    r.appendChild(_);
  }
  if (u.length === 0) {
    const _ = document.createElement("p");
    _.className = "folder-empty", _.textContent = "This folder is empty.", r.appendChild(_), t.appendChild(r);
    return;
  }
  const w = document.createElement("table");
  w.className = "folder-listing";
  const b = document.createElement("thead");
  b.innerHTML = "<tr><th></th><th>Name</th><th>Type</th><th>Size</th><th>Modified</th></tr>", w.appendChild(b);
  const x = document.createElement("tbody");
  for (const _ of u) {
    const R = document.createElement("tr");
    R.className = _.isContainer ? "folder-row" : "file-row";
    const G = document.createElement("td");
    G.className = "folder-icon", G.textContent = m0(_.name, _.isContainer), R.appendChild(G);
    const Y = document.createElement("td");
    Y.className = "folder-name";
    const A = An(_.uri, _.name + (_.isContainer ? "/" : ""));
    Y.appendChild(A), R.appendChild(Y);
    const K = document.createElement("td");
    K.className = "folder-type", _.isContainer ? K.textContent = "Folder" : _.contentType ? K.textContent = _.contentType : K.textContent = "", R.appendChild(K);
    const M = document.createElement("td");
    M.className = "folder-size", M.textContent = _.size != null ? y0(_.size) : "", R.appendChild(M);
    const j = document.createElement("td");
    j.className = "folder-modified", j.textContent = _.modified ? v0(_.modified) : "", R.appendChild(j), x.appendChild(R);
  }
  w.appendChild(x), r.appendChild(w), t.appendChild(r);
}
function b0(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(et("Container").value) || r.includes(et("BasicContainer").value) || n.value.endsWith("/") && e.match(n, et("contains"), null, null).length > 0);
}
const N0 = {
  label: "Folder",
  icon: "📁",
  canHandle(n, e) {
    return b0(n, e);
  },
  render(n, e, t) {
    Uo(n, e, t);
  }
};
Ie(N0);
function A0(n, e) {
  const t = e.each(null, hr("storage"), n, null);
  for (const i of t) {
    if (i.termType !== "NamedNode") continue;
    const s = e.any(i, be("name"), null, null)?.value ?? e.any(i, we("fn"), null, null)?.value;
    if (s) return s;
  }
  const r = e.any(n, be("primaryTopic"), null, null);
  if (r && r.termType === "NamedNode") {
    const i = e.any(r, be("name"), null, null)?.value ?? e.any(r, we("fn"), null, null)?.value;
    if (i) return i;
  }
  try {
    const s = new URL(n.value).hostname.split(".")[0];
    if (s && s !== "www") return s;
  } catch {
  }
  return null;
}
function x0(n, e) {
  const t = e.each(null, hr("storage"), n, null);
  for (const i of t)
    if (i.termType === "NamedNode") return i.value;
  const r = e.any(n, be("primaryTopic"), null, null);
  return r && r.termType === "NamedNode" ? r.value : null;
}
function T0(n, e) {
  const t = [], r = e.each(n, et("contains"), null, null);
  for (const i of r) {
    if (i.termType !== "NamedNode") continue;
    const s = i, l = e.each(s, me("type"), null, null).map((h) => h.value), u = l.includes(et("Container").value) || l.includes(et("BasicContainer").value) || s.value.endsWith("/"), c = e.any(s, de("title"), null, null)?.value ?? e.any(s, tt("title"), null, null)?.value ?? fe(s.value);
    t.push({
      uri: s.value,
      label: c,
      type: u ? "container" : "resource"
    });
  }
  return t.sort((i, s) => i.type !== s.type ? i.type === "container" ? -1 : 1 : i.label.localeCompare(s.label)), t;
}
function D0(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  let i = null;
  return r.includes(rn("Account").value) ? i = "Solid Account" : r.includes(hr("Storage").value) && (i = "Solid Pod"), { typeLabel: i };
}
function _0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "dashboard-view";
  const i = A0(n, e), s = x0(n, e), a = document.createElement("h2");
  a.className = "dashboard-title", a.textContent = i ? `${i}'s Pod` : "Solid Pod", r.appendChild(a);
  const l = document.createElement("p");
  l.className = "dashboard-url";
  const u = document.createElement("code");
  u.textContent = n.value, l.appendChild(u), r.appendChild(l);
  const { typeLabel: c } = D0(n, e);
  if (c) {
    const v = document.createElement("span");
    v.className = "dashboard-badge", v.textContent = c, r.appendChild(v);
  }
  if (s) {
    const v = document.createElement("div");
    v.className = "dashboard-section";
    const w = document.createElement("h3");
    w.textContent = "Profile", v.appendChild(w);
    const b = An(s, i ? `View ${i}'s profile` : "View profile");
    b.className = "dashboard-link", v.appendChild(b), r.appendChild(v);
  }
  const h = T0(n, e), f = document.createElement("div");
  f.className = "dashboard-section";
  const m = document.createElement("h3");
  if (m.textContent = "Data", f.appendChild(m), h.length === 0) {
    const v = document.createElement("p");
    v.className = "dashboard-empty", v.textContent = "No visible contents.", f.appendChild(v);
  } else {
    const v = document.createElement("p");
    v.className = "dashboard-count";
    const w = h.filter((R) => R.type === "container").length, b = h.filter((R) => R.type === "resource").length, x = [];
    w > 0 && x.push(`${w} folder${w !== 1 ? "s" : ""}`), b > 0 && x.push(`${b} file${b !== 1 ? "s" : ""}`), v.textContent = x.join(", "), f.appendChild(v);
    const _ = document.createElement("ul");
    _.className = "dashboard-contents";
    for (const R of h) {
      const G = document.createElement("li");
      G.className = `dashboard-item dashboard-item-${R.type}`;
      const Y = document.createElement("span");
      Y.className = "dashboard-item-icon", Y.textContent = R.type === "container" ? "📁" : "📄", G.appendChild(Y);
      const A = An(R.uri, R.label);
      A.className = "dashboard-item-link", A.title = R.uri, G.appendChild(A), _.appendChild(G);
    }
    f.appendChild(_);
  }
  r.appendChild(f), t.appendChild(r);
}
function S0(n, e) {
  const r = e.each(n, me("type"), null, null).map((a) => a.value);
  if (r.includes(hr("Storage").value) || r.includes(rn("Account").value)) return !0;
  if (r.includes(et("Container").value) || r.includes(et("BasicContainer").value))
    try {
      if (new URL(n.value).pathname === "/") return !0;
    } catch {
    }
  return e.each(null, hr("storage"), n, null).length > 0;
}
const F0 = {
  label: "Dashboard",
  icon: "🏠",
  canHandle(n, e) {
    return S0(n, e);
  },
  render(n, e, t) {
    _0(n, e, t);
  }
};
Ie(F0);
const I0 = /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i;
function L0(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? "Chat";
}
function Mo(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value);
}
function B0(n, e) {
  const t = e.each(n, Et("message"), null, null), r = [];
  for (const i of t) {
    const s = i, a = e.any(s, kt("content"), null, null)?.value ?? e.any(s, de("content"), null, null)?.value ?? e.any(s, tt("description"), null, null)?.value ?? "", l = e.any(s, de("created"), null, null)?.value ?? e.any(s, tt("date"), null, null)?.value, u = l ? new Date(l) : null, c = e.any(s, be("maker"), null, null) ?? e.any(s, tt("creator"), null, null);
    let h = null, f = null;
    c && (f = c.value, c.termType === "NamedNode" ? h = Mo(c, e) : h = c.value), r.push({ uri: s.value, content: a, created: u, maker: h, makerUri: f });
  }
  return r.sort((i, s) => !i.created && !s.created ? 0 : i.created ? s.created ? i.created.getTime() - s.created.getTime() : 1 : -1), r;
}
function R0(n) {
  return n.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function k0(n) {
  return n.toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function O0(n) {
  return n.toISOString().slice(0, 10);
}
function U0(n, e) {
  const t = /(https?:\/\/[^\s<>"]+)/g, r = n.split(t);
  for (const i of r)
    if (t.test(i))
      if (t.lastIndex = 0, I0.test(i)) {
        const s = document.createElement("img");
        s.className = "chat-inline-image", s.src = i, s.alt = "Shared image", s.loading = "lazy", e.appendChild(s);
      } else {
        const s = document.createElement("a");
        s.href = i, s.textContent = i, s.target = "_blank", s.rel = "noopener", e.appendChild(s);
      }
    else i && e.appendChild(document.createTextNode(i));
}
function M0(n) {
  return n ? n.charAt(0).toUpperCase() : "?";
}
function P0(n, e, t) {
  t.innerHTML = "";
  const r = L0(n, e), i = document.createElement("div");
  i.className = "chat-view", i.setAttribute("role", "region"), i.setAttribute("aria-label", r);
  const s = document.createElement("header");
  s.className = "chat-header";
  const a = document.createElement("h2");
  a.className = "chat-title", a.textContent = r, s.appendChild(a);
  const l = e.any(n, tt("author"), null, null) ?? e.any(n, de("creator"), null, null);
  if (l && l.termType === "NamedNode") {
    const m = Mo(l, e), v = document.createElement("p");
    v.className = "chat-creator", v.textContent = `Created by ${m}`, s.appendChild(v);
  }
  const u = B0(n, e), c = document.createElement("p");
  if (c.className = "chat-count", c.textContent = `${u.length} message${u.length !== 1 ? "s" : ""}`, s.appendChild(c), i.appendChild(s), u.length === 0) {
    const m = document.createElement("p");
    m.className = "chat-empty", m.textContent = "No messages yet.", i.appendChild(m), t.appendChild(i);
    return;
  }
  const h = document.createElement("ul");
  h.className = "chat-messages", h.setAttribute("role", "log"), h.setAttribute("aria-label", "Message history"), h.setAttribute("aria-live", "polite");
  let f = null;
  for (const m of u) {
    if (m.created) {
      const G = O0(m.created);
      if (G !== f) {
        f = G;
        const Y = document.createElement("li");
        Y.className = "chat-date-header", Y.setAttribute("role", "separator");
        const A = document.createElement("time");
        A.dateTime = G, A.textContent = k0(m.created), Y.appendChild(A), h.appendChild(Y);
      }
    }
    const v = document.createElement("li");
    v.className = "chat-message";
    const w = document.createElement("article");
    w.setAttribute("aria-label", `Message from ${m.maker || "Unknown"}`);
    const b = document.createElement("div");
    b.className = "chat-avatar", b.setAttribute("aria-hidden", "true"), b.textContent = M0(m.maker), w.appendChild(b);
    const x = document.createElement("div");
    x.className = "chat-message-body";
    const _ = document.createElement("div");
    if (_.className = "chat-message-header", m.maker)
      if (m.makerUri) {
        const G = An(m.makerUri, m.maker);
        G.className = "chat-author", G.title = m.makerUri, _.appendChild(G);
      } else {
        const G = document.createElement("span");
        G.className = "chat-author", G.textContent = m.maker, _.appendChild(G);
      }
    if (m.created) {
      const G = document.createElement("time");
      G.className = "chat-time", G.dateTime = m.created.toISOString(), G.textContent = R0(m.created), _.appendChild(G);
    }
    x.appendChild(_);
    const R = document.createElement("div");
    R.className = "chat-content", U0(m.content, R), x.appendChild(R), w.appendChild(x), v.appendChild(w), h.appendChild(v);
  }
  i.appendChild(h), t.appendChild(i);
}
function $0(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes($t("LongChat").value) || r.includes($t("ShortChat").value) || r.includes($t("Chat").value) || r.includes(Et("Flow").value) || r.includes(kt("Thread").value) || e.match(n, Et("message"), null, null).length > 0 || e.any(n, kt("content"), null, null) && e.any(n, de("created"), null, null));
}
const q0 = {
  label: "Chat",
  icon: "💬",
  canHandle(n, e) {
    return $0(n, e);
  },
  render(n, e, t) {
    P0(n, e, t);
  }
};
Ie(q0);
function Po(n, e) {
  return e.any(n, we("fn"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value);
}
function H0(n, e) {
  const t = [], r = e.each(n, we("hasEmail"), null, null);
  for (const i of r) {
    const s = e.any(i, we("value"), null, null)?.value;
    s ? t.push(s) : i.value.startsWith("mailto:") && t.push(i.value);
  }
  if (t.length === 0) {
    const i = e.any(n, be("mbox"), null, null)?.value;
    i && t.push(i);
  }
  return t;
}
function W0(n, e) {
  const t = [], r = e.each(n, we("hasTelephone"), null, null);
  for (const i of r) {
    const s = e.any(i, we("value"), null, null)?.value;
    s ? t.push(s) : i.value.startsWith("tel:") && t.push(i.value);
  }
  return t;
}
function V0(n, e) {
  const t = e.any(n, we("hasAddress"), null, null);
  if (!t) return;
  const r = t, i = e.any(r, we("street-address"), null, null)?.value, s = e.any(r, we("locality"), null, null)?.value, a = e.any(r, we("region"), null, null)?.value, l = e.any(r, we("postal-code"), null, null)?.value, u = e.any(r, we("country-name"), null, null)?.value, c = [i, s, a, l, u].filter(Boolean);
  return c.length > 0 ? c.join(", ") : void 0;
}
function $o(n, e) {
  const t = e.each(n, we("hasMember"), null, null), r = [];
  for (const i of t) {
    const s = i;
    if (e.holds(s, me("type"), we("Group"))) {
      const a = $o(s, e);
      r.push(...a);
      continue;
    }
    r.push({
      uri: s.value,
      name: Po(s, e),
      emails: H0(s, e),
      phones: W0(s, e),
      title: e.any(s, we("title"), null, null)?.value ?? void 0,
      org: e.any(s, we("organization-name"), null, null)?.value ?? void 0,
      photo: e.any(s, we("hasPhoto"), null, null)?.value ?? e.any(s, be("img"), null, null)?.value ?? void 0,
      address: V0(s, e),
      note: e.any(s, we("note"), null, null)?.value ?? void 0
    });
  }
  return r.sort((i, s) => i.name.localeCompare(s.name)), r;
}
function K0(n, e) {
  const t = [], r = e.each(n, we("hasMember"), null, null);
  for (const i of r) {
    const s = i;
    if (e.holds(s, me("type"), we("Group"))) {
      const a = Po(s, e), l = e.each(s, we("hasMember"), null, null).length;
      t.push({ name: a, count: l, uri: s.value });
    }
  }
  return t.sort((i, s) => i.name.localeCompare(s.name)), t;
}
function G0(n, e) {
  return e.any(n, we("fn"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? "Address Book";
}
function ma(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Al = [
  "#7C3AED",
  "#2563EB",
  "#0891B2",
  "#059669",
  "#D97706",
  "#DC2626",
  "#DB2777",
  "#4F46E5",
  "#0D9488",
  "#EA580C"
];
function j0(n) {
  let e = 0;
  for (let t = 0; t < n.length; t++) e = e * 31 + n.charCodeAt(t) | 0;
  return Al[Math.abs(e) % Al.length];
}
function qo(n, e, t) {
  if (e) {
    const i = document.createElement("img");
    return i.className = `contact-photo contact-photo-${t}`, i.src = e, i.alt = n, i;
  }
  const r = document.createElement("div");
  return r.className = `contact-photo-placeholder contact-photo-${t}`, r.textContent = n.charAt(0).toUpperCase(), r.style.background = j0(n), r;
}
function X0(n, e) {
  e.innerHTML = "";
  const t = qo(n.name, n.photo, "lg");
  e.appendChild(t);
  const r = document.createElement("h2");
  if (r.className = "contact-detail-name", r.textContent = n.name, e.appendChild(r), n.title || n.org) {
    const s = document.createElement("p");
    s.className = "contact-role", s.textContent = [n.title, n.org].filter(Boolean).join(" · "), e.appendChild(s);
  }
  const i = document.createElement("div");
  i.className = "contact-fields";
  for (const s of n.emails) {
    const a = s.replace("mailto:", ""), l = document.createElement("div");
    l.className = "contact-field", l.innerHTML = `<span class="contact-field-label">Email</span><a class="contact-field-value contact-email" href="${s.startsWith("mailto:") ? s : "mailto:" + a}">${ma(a)}</a>`, i.appendChild(l);
  }
  for (const s of n.phones) {
    const a = s.replace("tel:", ""), l = document.createElement("div");
    l.className = "contact-field", l.innerHTML = `<span class="contact-field-label">Phone</span><a class="contact-field-value contact-phone" href="${s.startsWith("tel:") ? s : "tel:" + a}">${ma(a)}</a>`, i.appendChild(l);
  }
  if (n.address) {
    const s = document.createElement("div");
    s.className = "contact-field", s.innerHTML = `<span class="contact-field-label">Address</span><span class="contact-field-value contact-address">${ma(n.address)}</span>`, i.appendChild(s);
  }
  if (n.note) {
    const s = document.createElement("div");
    s.className = "contact-field", s.innerHTML = `<span class="contact-field-label">Note</span><span class="contact-field-value contact-note">${ma(n.note)}</span>`, i.appendChild(s);
  }
  i.children.length > 0 && e.appendChild(i);
}
function z0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "contacts-view";
  const i = $o(n, e), s = K0(n, e), a = document.createElement("div");
  a.className = "contacts-header";
  const l = G0(n, e), u = document.createElement("h2");
  u.className = "contacts-title", u.textContent = l, a.appendChild(u);
  const c = document.createElement("span");
  if (c.className = "contacts-count", c.textContent = `${i.length}`, a.appendChild(c), r.appendChild(a), s.length > 0) {
    const x = document.createElement("div");
    x.className = "contacts-group-chips";
    const _ = document.createElement("button");
    _.className = "contacts-chip contacts-chip-active", _.textContent = "All", x.appendChild(_);
    for (const R of s) {
      const G = document.createElement("button");
      G.className = "contacts-chip", G.textContent = R.name, x.appendChild(G);
    }
    r.appendChild(x);
  }
  const h = document.createElement("input");
  if (h.className = "contacts-search", h.type = "search", h.placeholder = "Search by name", h.setAttribute("aria-label", "Filter contacts"), r.appendChild(h), i.length === 0) {
    const x = document.createElement("p");
    x.className = "contacts-empty", x.textContent = "No contacts found.", r.appendChild(x), t.appendChild(r);
    return;
  }
  const f = document.createElement("div");
  f.className = "contacts-body";
  const m = document.createElement("div");
  m.className = "contacts-list-panel";
  const v = document.createElement("ul");
  v.className = "contacts-list";
  const w = document.createElement("div");
  w.className = "contacts-detail-panel";
  let b = null;
  for (const x of i) {
    const _ = document.createElement("li");
    _.className = "contact-row", _.setAttribute("data-name", x.name), _.setAttribute("data-search", [x.org ?? "", x.title ?? "", ...x.emails].join(" "));
    const R = qo(x.name, x.photo, "sm");
    _.appendChild(R);
    const G = document.createElement("span");
    G.className = "contact-row-name", G.textContent = x.name, _.appendChild(G);
    const Y = document.createElement("span");
    Y.className = "contact-row-chevron", Y.textContent = "›", _.appendChild(Y), _.addEventListener("click", () => {
      b && b.classList.remove("contact-row-active"), _.classList.add("contact-row-active"), b = _, X0(x, w);
    }), v.appendChild(_);
  }
  h.addEventListener("input", () => {
    const x = h.value.toLowerCase();
    for (const _ of v.children) {
      const R = _, G = (R.getAttribute("data-name") ?? "") + " " + (R.getAttribute("data-search") ?? "");
      R.style.display = G.toLowerCase().includes(x) ? "" : "none";
    }
  }), m.appendChild(v), f.appendChild(m), f.appendChild(w), r.appendChild(f), t.appendChild(r), i.length > 0 && v.children[0].click();
}
function J0(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(we("AddressBook").value) || r.includes(we("Group").value) || e.match(n, we("hasMember"), null, null).length > 0);
}
const Y0 = {
  label: "Contacts",
  icon: "📇",
  canHandle(n, e) {
    return J0(n, e);
  },
  render(n, e, t) {
    z0(n, e, t);
  }
};
Ie(Y0);
function On(n, e, t, r = !1) {
  if (!t) return;
  const i = document.createElement("div");
  i.className = "org-detail";
  const s = document.createElement("span");
  if (s.className = "org-label", s.textContent = e, i.appendChild(s), r && (t.startsWith("http://") || t.startsWith("https://"))) {
    const a = document.createElement("a");
    a.href = t, a.textContent = fe(t), a.target = "_blank", a.rel = "noopener", i.appendChild(a);
  } else if (r && t.startsWith("mailto:")) {
    const a = document.createElement("a");
    a.href = t, a.textContent = t.replace("mailto:", ""), i.appendChild(a);
  } else {
    const a = document.createElement("span");
    a.className = "org-value", a.textContent = t, i.appendChild(a);
  }
  n.appendChild(i);
}
function Q0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "org-card";
  const i = e.any(n, B("logo"), null, null)?.value ?? e.any(n, be("logo"), null, null)?.value ?? e.any(n, be("img"), null, null)?.value;
  if (i) {
    const R = document.createElement("img");
    R.className = "org-logo", R.src = i, R.alt = "Organization logo", r.appendChild(R);
  }
  const s = e.any(n, B("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), a = document.createElement("h2");
  a.className = "org-name", a.textContent = s, r.appendChild(a);
  const l = e.any(n, B("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (l) {
    const R = document.createElement("p");
    R.className = "org-description", R.textContent = l, r.appendChild(R);
  }
  const u = document.createElement("div");
  u.className = "org-details";
  const c = e.any(n, B("url"), null, null)?.value;
  On(u, "Website", c, !0);
  const h = e.any(n, B("email"), null, null)?.value;
  On(u, "Email", h, !0);
  const f = e.any(n, B("telephone"), null, null)?.value;
  On(u, "Phone", f);
  const m = e.any(n, B("address"), null, null);
  if (m) {
    const R = e.any(m, B("streetAddress"), null, null)?.value, G = e.any(m, B("addressLocality"), null, null)?.value, Y = e.any(m, B("addressRegion"), null, null)?.value, A = e.any(m, B("addressCountry"), null, null)?.value;
    if (R || G) {
      const K = [R, G, Y, A].filter(Boolean);
      On(u, "Address", K.join(", "));
    } else
      On(u, "Address", m.value);
  }
  const v = e.any(n, B("foundingDate"), null, null)?.value;
  On(u, "Founded", v);
  const w = e.any(n, B("numberOfEmployees"), null, null)?.value;
  On(u, "Employees", w), r.appendChild(u);
  const b = e.each(n, B("member"), null, null), x = e.each(n, B("employee"), null, null), _ = [...b, ...x];
  if (_.length > 0) {
    const R = document.createElement("div");
    R.className = "org-people";
    const G = document.createElement("h3");
    G.textContent = `People (${_.length})`, R.appendChild(G);
    const Y = document.createElement("ul");
    Y.className = "org-people-list";
    for (const A of _) {
      const K = e.any(A, B("name"), null, null)?.value ?? e.any(A, be("name"), null, null)?.value ?? fe(A.value), M = document.createElement("li"), j = An(A.value, K);
      j.title = A.value, M.appendChild(j), Y.appendChild(M);
    }
    R.appendChild(Y), r.appendChild(R);
  }
  t.appendChild(r);
}
const Z0 = [
  B("Organization"),
  B("Corporation"),
  B("GovernmentOrganization"),
  B("NGO"),
  B("EducationalOrganization"),
  B("LocalBusiness"),
  be("Organization"),
  be("Group")
];
function eg(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of Z0)
    if (r.includes(i.value)) return !0;
  return !1;
}
const tg = {
  label: "Organization",
  icon: "🏢",
  canHandle(n, e) {
    return eg(n, e);
  },
  render(n, e, t) {
    Q0(n, e, t);
  }
};
Ie(tg);
function ng(n, e) {
  return e.any(n, we("fn"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, B("name"), null, null)?.value ?? fe(n.value);
}
function rg(n, e) {
  return e.any(n, we("hasPhoto"), null, null)?.value ?? e.any(n, be("img"), null, null)?.value ?? e.any(n, B("image"), null, null)?.value ?? e.any(n, be("depiction"), null, null)?.value ?? void 0;
}
function ag(n, e) {
  const t = e.any(n, rn("preferredSubjectPronoun"), null, null)?.value;
  if (!t) return;
  let r = t;
  const i = e.any(n, rn("preferredObjectPronoun"), null, null)?.value;
  if (i) {
    r += "/" + i;
    const s = e.any(n, rn("preferredRelativePronoun"), null, null)?.value;
    s && (r += "/" + s);
  }
  return r;
}
function ig(n, e) {
  const t = e.any(n, we("hasAddress"), null, null);
  if (!t) return;
  const r = t, i = e.any(r, we("locality"), null, null)?.value, s = e.any(r, we("region"), null, null)?.value, a = e.any(r, we("country-name"), null, null)?.value, l = [i, s, a].filter(Boolean);
  return l.length > 0 ? l.join(", ") : void 0;
}
function sg(n, e) {
  const t = [], r = e.each(n, be("account"), null, null);
  for (const i of r) {
    const s = i, a = e.any(s, be("name"), null, null)?.value ?? e.any(s, at("label"), null, null)?.value ?? fe(s.value), l = e.any(s, be("homepage"), null, null)?.value ?? s.value;
    t.push({ name: a, uri: l });
  }
  return t;
}
function lg(n, e) {
  const t = [], r = e.each(n, we("hasTelephone"), null, null);
  for (const i of r) {
    const s = e.any(i, we("value"), null, null)?.value;
    s ? t.push(s) : i.value.startsWith("tel:") && t.push(i.value);
  }
  return t;
}
function og(n, e) {
  const t = [], r = e.each(n, we("hasEmail"), null, null);
  for (const i of r) {
    const s = e.any(i, we("value"), null, null)?.value;
    s ? t.push(s) : i.value.startsWith("mailto:") && t.push(i.value);
  }
  if (t.length === 0) {
    const i = e.any(n, be("mbox"), null, null)?.value;
    i && t.push(i);
  }
  return t;
}
function ug(n, e) {
  const t = e.each(null, ii("member"), n, null), r = [], i = [];
  for (const s of t) {
    const a = s, l = e.any(a, ii("organization"), null, null), u = l ? e.any(l, B("name"), null, null)?.value ?? e.any(l, be("name"), null, null)?.value ?? fe(l.value) : "", c = e.any(a, ii("role"), null, null), h = e.any(a, we("role"), null, null)?.value, f = c ? e.any(c, B("name"), null, null)?.value : void 0, m = h && f ? `${f} - ${h}` : h || f || "", v = e.any(a, B("startDate"), null, null)?.value, w = e.any(a, B("endDate"), null, null)?.value, b = v ? `${v.slice(0, 10)} – ${w ? w.slice(0, 10) : "present"}` : "", x = { orgName: u, roleText: m, dates: b };
    e.holds(a, me("type"), rn("PastRole")) ? i.push(x) : r.push(x);
  }
  return { current: r, past: i };
}
function er(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function fn(n, e, t, r = !1) {
  if (!t) return;
  const i = document.createElement("div");
  i.className = "profile-detail";
  const s = document.createElement("span");
  if (s.className = "profile-label", s.textContent = e, i.appendChild(s), r && (t.startsWith("http://") || t.startsWith("https://"))) {
    const a = document.createElement("a");
    a.href = t, a.textContent = fe(t), a.target = "_blank", a.rel = "noopener", i.appendChild(a);
  } else if (r && t.startsWith("mailto:")) {
    const a = document.createElement("a");
    a.href = t, a.textContent = t.replace("mailto:", ""), i.appendChild(a);
  } else if (r && t.startsWith("tel:")) {
    const a = document.createElement("a");
    a.href = t, a.textContent = t.replace("tel:", ""), i.appendChild(a);
  } else {
    const a = document.createElement("span");
    a.className = "profile-value", a.textContent = t, i.appendChild(a);
  }
  n.appendChild(i);
}
const xl = [
  { label: "Name", predicate: we("fn") },
  { label: "Nickname", predicate: be("nick") },
  { label: "Photo URL", predicate: we("hasPhoto"), inputType: "url" },
  { label: "Role", predicate: we("role") },
  { label: "Organization", predicate: we("organization-name") },
  { label: "Bio", predicate: we("note") }
];
function Ea(n, e, t) {
  t.innerHTML = "";
  const r = e.updater, i = e.fetcher, s = !!(r && i), a = document.createElement("div");
  if (a.className = "profile-card", s) {
    const $ = document.createElement("div");
    $.className = "profile-edit-row";
    const q = document.createElement("button");
    q.className = "profile-edit-btn", q.textContent = "Edit", q.addEventListener("click", () => {
      cg(n, e, t, r);
    }), $.appendChild(q), a.appendChild($);
  }
  const l = rg(n, e);
  if (l) {
    const $ = document.createElement("img");
    $.className = "profile-photo", $.src = l, $.alt = "Profile photo", a.appendChild($);
  }
  const u = ng(n, e), c = document.createElement("h2");
  c.className = "profile-name", c.textContent = u, a.appendChild(c);
  const h = ag(n, e);
  if (h) {
    const $ = document.createElement("p");
    $.className = "profile-pronouns", $.textContent = h, a.appendChild($);
  }
  const f = e.any(n, be("nick"), null, null)?.value;
  if (f) {
    const $ = document.createElement("p");
    $.className = "profile-nick", $.textContent = `@${f}`, a.appendChild($);
  }
  const m = ig(n, e);
  if (m) {
    const $ = document.createElement("p");
    $.className = "profile-location", $.textContent = m, a.appendChild($);
  }
  const v = document.createElement("p");
  v.className = "profile-webid";
  const w = document.createElement("a");
  w.href = n.value, w.textContent = n.value, w.target = "_blank", w.rel = "noopener", v.appendChild(w), a.appendChild(v);
  const b = document.createElement("div");
  b.className = "profile-details";
  const x = e.any(n, we("role"), null, null)?.value, _ = e.any(n, we("organization-name"), null, null)?.value;
  x && _ ? fn(b, "Role", `${x}, ${_}`) : (fn(b, "Role", x), fn(b, "Organization", _)), fn(b, "Birthday", e.any(n, we("bday"), null, null)?.value);
  const R = e.any(n, we("note"), null, null)?.value ?? e.any(n, be("bio"), null, null)?.value;
  fn(b, "About", R?.trim());
  const G = og(n, e);
  for (const $ of G)
    fn(b, "Email", $, !0);
  const Y = lg(n, e);
  for (const $ of Y)
    fn(b, "Phone", $, !0);
  const A = e.any(n, be("homepage"), null, null)?.value;
  fn(b, "Homepage", A, !0);
  const K = e.any(n, hr("storage"), null, null)?.value;
  fn(b, "Pod", K, !0), a.appendChild(b);
  const { current: M, past: j } = ug(n, e);
  if (M.length > 0 || j.length > 0) {
    const $ = document.createElement("div");
    $.className = "profile-roles";
    const q = document.createElement("h3");
    if (q.textContent = "Experience", $.appendChild(q), M.length > 0) {
      const ee = document.createElement("h4");
      ee.className = "profile-roles-subheader", ee.textContent = "Current", $.appendChild(ee);
      for (const Q of M) {
        const S = document.createElement("div");
        S.className = "profile-role-item";
        let V = `<strong class="profile-role-org">${er(Q.orgName)}</strong>`;
        Q.roleText && (V += ` <span class="profile-role-title">${er(Q.roleText)}</span>`), Q.dates && (V += ` <span class="profile-role-dates">${er(Q.dates)}</span>`), S.innerHTML = V, $.appendChild(S);
      }
    }
    if (j.length > 0) {
      const ee = document.createElement("h4");
      ee.className = "profile-roles-subheader", ee.textContent = "Past", $.appendChild(ee);
      for (const Q of j) {
        const S = document.createElement("div");
        S.className = "profile-role-item";
        let V = `<strong class="profile-role-org">${er(Q.orgName)}</strong>`;
        Q.roleText && (V += ` <span class="profile-role-title">${er(Q.roleText)}</span>`), Q.dates && (V += ` <span class="profile-role-dates">${er(Q.dates)}</span>`), S.innerHTML = V, $.appendChild(S);
      }
    }
    a.appendChild($);
  }
  const k = sg(n, e);
  if (k.length > 0) {
    const $ = document.createElement("div");
    $.className = "profile-social";
    const q = document.createElement("h3");
    q.textContent = "Social Accounts", $.appendChild(q);
    const ee = document.createElement("ul");
    ee.className = "profile-social-list";
    for (const Q of k) {
      const S = document.createElement("li"), V = document.createElement("a");
      V.href = Q.uri, V.textContent = Q.name, V.target = "_blank", V.rel = "noopener noreferrer", S.appendChild(V), ee.appendChild(S);
    }
    $.appendChild(ee), a.appendChild($);
  }
  const H = e.each(n, be("knows"), null, null);
  if (H.length > 0) {
    const $ = document.createElement("div");
    $.className = "profile-friends";
    const q = document.createElement("h3");
    q.textContent = `Contacts (${H.length})`, $.appendChild(q);
    const ee = document.createElement("ul");
    ee.className = "profile-friends-list";
    for (const Q of H) {
      const S = document.createElement("li"), V = An(Q.value, fe(Q.value));
      V.title = Q.value, S.appendChild(V), ee.appendChild(S);
    }
    $.appendChild(ee), a.appendChild($);
  }
  t.appendChild(a);
}
function cg(n, e, t, r) {
  t.innerHTML = "";
  const i = document.createElement("div");
  i.className = "profile-edit-form";
  const s = document.createElement("h2");
  s.textContent = "Edit Profile", i.appendChild(s);
  const a = /* @__PURE__ */ new Map();
  for (const f of xl) {
    const m = e.any(n, f.predicate, null, null)?.value ?? "", v = document.createElement("div");
    v.className = "profile-field-group";
    const w = document.createElement("label");
    w.textContent = f.label, v.appendChild(w);
    let b;
    f.label === "Bio" ? (b = document.createElement("textarea"), b.rows = 3) : (b = document.createElement("input"), b.type = f.inputType ?? "text"), b.className = "profile-field-input", b.value = m, v.appendChild(b), a.set(f, b), i.appendChild(v);
  }
  const l = document.createElement("div");
  l.className = "profile-edit-actions";
  const u = document.createElement("button");
  u.className = "profile-save-btn", u.textContent = "Save";
  const c = document.createElement("button");
  c.className = "profile-cancel-btn", c.textContent = "Cancel", l.appendChild(u), l.appendChild(c), i.appendChild(l);
  const h = document.createElement("p");
  h.className = "profile-edit-status", i.appendChild(h), t.appendChild(i), c.addEventListener("click", () => {
    Ea(n, e, t);
  }), u.addEventListener("click", async () => {
    u.disabled = !0, c.disabled = !0, h.textContent = "Saving...", h.className = "profile-edit-status";
    try {
      const f = [], m = [], v = n.doc();
      for (const w of xl) {
        const x = a.get(w).value.trim(), _ = e.any(n, w.predicate, null, null);
        if (_ && x && _.value !== x) {
          const R = e.match(n, w.predicate, _, v);
          R.length > 0 && f.push(R[0]), m.push(new qt(n, w.predicate, Qs(x), v));
        } else if (_ && !x) {
          const R = e.match(n, w.predicate, _, v);
          R.length > 0 && f.push(R[0]);
        } else !_ && x && m.push(new qt(n, w.predicate, Qs(x), v));
      }
      if (f.length === 0 && m.length === 0) {
        Ea(n, e, t);
        return;
      }
      await new Promise((w, b) => {
        r.update(f, m, (x, _, R) => {
          _ ? w() : b(new Error(R ?? "Update failed"));
        });
      }), h.textContent = "Saved!", h.className = "profile-edit-status profile-edit-status-ok", setTimeout(() => Ea(n, e, t), 800);
    } catch (f) {
      const m = f instanceof Error ? f.message : String(f);
      h.textContent = `Save failed: ${m}`, h.className = "profile-edit-status profile-edit-status-error", u.disabled = !1, c.disabled = !1;
    }
  });
}
function dg(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return r.includes(be("Person").value) || r.includes(B("Person").value) || r.includes(we("Individual").value) ? !0 : r.includes(we("AddressBook").value) || r.includes(we("Group").value) ? !1 : !!(e.any(n, be("name"), null, null) || e.any(n, we("fn"), null, null));
}
const hg = {
  label: "Profile",
  icon: "👤",
  canHandle(n, e) {
    return dg(n, e);
  },
  render(n, e, t) {
    Ea(n, e, t);
  }
};
Ie(hg);
const Ft = new Zh();
let Nn = so();
function Ho() {
  const n = Ft.isActive ? Ft.authFetch.bind(Ft) : void 0;
  Nn = so(n ? { fetch: n } : void 0);
}
function Wo(n, e, t) {
  const { store: r } = Nn;
  t.innerHTML = "", n.length <= 1 ? t.hidden = !0 : t.hidden = !1;
  for (let i = 0; i < n.length; i++) {
    const { pane: s, subject: a } = n[i], l = document.createElement("button");
    l.className = "pane-tab", l.role = "tab", l.textContent = `${s.icon} ${s.label}`, l.setAttribute("aria-selected", i === 0 ? "true" : "false"), l.addEventListener("click", () => {
      for (const u of t.children)
        u.setAttribute("aria-selected", "false");
      l.setAttribute("aria-selected", "true"), e.innerHTML = "", s.render(a, r, e);
    }), t.appendChild(l);
  }
  e.innerHTML = "", n[0].pane.render(n[0].subject, r, e);
}
let Ca = null, ur = null, ba = null;
function Vo(n, e, t) {
  Ko();
  let r;
  try {
    r = new URL(n).origin;
  } catch {
    return;
  }
  const i = r.replace(/^http/, "ws");
  ur = n;
  try {
    const s = new WebSocket(i);
    Ca = s, s.addEventListener("open", () => {
      s.send(`sub ${n}`);
    }), s.addEventListener("message", (a) => {
      const l = String(a.data);
      l.startsWith("pub") && l.includes(n) && fg(n, e, t);
    }), s.addEventListener("close", () => {
      ur === n && (ba = setTimeout(() => {
        ur === n && Vo(n, e, t);
      }, 5e3));
    }), s.addEventListener("error", () => {
      s.close();
    });
  } catch {
  }
}
function Ko() {
  ba && (clearTimeout(ba), ba = null), Ca && (ur = null, Ca.close(), Ca = null);
}
async function fg(n, e, t) {
  const i = t.querySelector('.pane-tab[aria-selected="true"]')?.textContent ?? "";
  try {
    await Nn.fetcher.load(mn(n), { force: !0 });
    const s = mn(ur?.includes("#") ? ur : n), a = Ta(s, Nn.store);
    if (a.length === 0) return;
    const l = a.findIndex((c) => `${c.icon} ${c.label}` === i), u = l >= 0 ? { pane: a[l], subject: s } : { pane: a[0], subject: s };
    e.innerHTML = "", u.pane.render(u.subject, Nn.store, e);
  } catch {
  }
}
function pg(n, e, t) {
  return new Promise((r) => {
    try {
      xa(n, e, t, "application/ld+json", () => r());
    } catch {
      r();
    }
  });
}
async function mg(n, e, t, r) {
  t.innerHTML = "", r.innerHTML = "", r.hidden = !0;
  const { store: i } = Nn, s = n.replace(/#.*$/, "");
  await Promise.all(e.map((f) => pg(f, i, s)));
  const a = [], l = mn(s + "#this");
  if (i.statementsMatching(l, null, null, mn(s)).length > 0)
    for (const f of Ta(l, i))
      a.push({ pane: f, subject: l });
  const c = new Set(a.map((f) => f.pane.label)), h = mn(s);
  for (const f of Ta(h, i))
    c.has(f.label) || a.push({ pane: f, subject: h });
  if (a.length === 0) {
    t.innerHTML = `
      <div class="error">
        <p><strong>No pane available</strong> for this resource.</p>
        <p>URI: <code>${xi(n)}</code></p>
      </div>
    `;
    return;
  }
  Wo(a, t, r);
}
async function Ai(n, e, t) {
  e.innerHTML = '<p class="loading">Loading...</p>', t.innerHTML = "", t.hidden = !0, Ko();
  try {
    await Nn.fetchDocument(n);
    const r = mn(n), i = Ta(r, Nn.store);
    if (i.length === 0) {
      e.innerHTML = `
        <div class="error">
          <p><strong>No pane available</strong> for this resource.</p>
          <p>URI: <code>${xi(n)}</code></p>
          <p>The resource was fetched successfully, but no registered pane
          knows how to display it.</p>
        </div>
      `;
      return;
    }
    Wo(i.map((a) => ({ pane: a, subject: r })), e, t);
    const s = n.replace(/#.*$/, "");
    Vo(s, e, t);
  } catch (r) {
    const i = r instanceof Error ? r.message : String(r);
    e.innerHTML = `
      <div class="error">
        <p><strong>Failed to load resource</strong></p>
        <p>${xi(i)}</p>
      </div>
    `;
  }
}
async function gg() {
  try {
    await Ft.handleRedirectFromLogin();
  } catch {
  }
  try {
    await Ft.restore();
  } catch {
  }
  Ft.isActive && Ho();
}
function yg() {
  Ho();
}
function xi(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Mr = document.getElementById("mashlib") || document.body, Go = Mr.dataset.chrome !== "hidden";
let wt = null, Pn = null, bn = null, pn = null;
if (Go) {
  const n = document.createElement("a");
  n.href = "#pane-container", n.className = "skip-nav", n.textContent = "Skip to content", Mr.appendChild(n);
  const e = document.createElement("header");
  e.id = "chrome";
  const t = document.createElement("div");
  t.id = "header-row";
  const r = document.createElement("h1");
  r.innerHTML = '<svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true" fill="none"><path d="M91 37.88Q98 50 91 62.12L81 79.45Q74 91.57 60 91.57L40 91.57Q26 91.57 19 79.45L9 62.12Q2 50 9 37.88L19 20.55Q26 8.43 40 8.43L60 8.43Q74 8.43 81 20.55Z" fill="#7C4DFF"/><g transform="translate(50 50) scale(.323) translate(-176 -161)"><path d="M118.47 142.23h117.53c1.48 0 2.65-1.2 2.65-2.65v-22.04c0-14.65-11.89-26.54-26.54-26.54h-70.57c-20.53-.03-37.16 16.6-37.16 37.13 0 7.83 6.27 14.1 14.08 14.1zM130 239.6h70.23c21.2 0 38.43-17.23 38.43-38.43 0-7.08-5.72-12.83-12.83-12.83H106.94c-1.46 0-2.55 1.17-2.55 2.55v23.05c-.03 14.18 11.48 25.66 25.6 25.66z" fill="#F7F7F7"/><path d="M109.6 139.32l87.66 87.66c5.8 5.8 15.2 5.8 21 0l15.2-15.2c5.8-5.8 5.8-15.2 0-21l-87.64-87.66c-5.8-5.8-15.2-5.8-21 0l-15.2 15.2c-5.85 5.8-5.85 15.22-.02 21z" fill="#F7F7F7"/></g></svg> SolidOS Browser', t.appendChild(r);
  const i = document.createElement("div");
  i.id = "auth-controls", Pn = document.createElement("button"), Pn.id = "login-btn", Pn.textContent = "Login", i.appendChild(Pn), pn = document.createElement("span"), pn.id = "user-info", pn.hidden = !0, i.appendChild(pn), bn = document.createElement("button"), bn.id = "logout-btn", bn.hidden = !0, bn.textContent = "Logout", i.appendChild(bn), t.appendChild(i), e.appendChild(t);
  const s = document.createElement("form");
  s.id = "url-form";
  const a = document.createElement("label");
  a.htmlFor = "url-input", a.textContent = "Resource URL:", s.appendChild(a), wt = document.createElement("input"), wt.id = "url-input", wt.type = "url", wt.placeholder = "https://example.org/resource", wt.required = !0, wt.setAttribute("aria-label", "Resource URL"), s.appendChild(wt);
  const l = document.createElement("button");
  l.type = "submit", l.textContent = "Go", s.appendChild(l), e.appendChild(s), Mr.appendChild(e), s.addEventListener("submit", (u) => {
    u.preventDefault();
    const c = wt.value.trim();
    c && $i(c, !0);
  }), Pn.addEventListener("click", () => {
    const u = prompt("Solid identity provider:", "https://solidcommunity.net");
    u && Ft.login(u, window.location.href);
  }), bn.addEventListener("click", () => {
    Ft.logout();
  });
}
const gn = document.createElement("nav");
gn.id = "pane-tabs";
gn.setAttribute("role", "tablist");
gn.setAttribute("aria-label", "View selector");
gn.hidden = !0;
Mr.appendChild(gn);
const Kn = document.createElement("main");
Kn.id = "pane-container";
Mr.appendChild(Kn);
async function $i(n, e) {
  if (wt && (wt.value = n), e) {
    const t = new URL(window.location.href);
    t.searchParams.set("uri", n), window.history.pushState({ uri: n }, "", t.toString());
  }
  await Ai(n, Kn, gn);
}
function Tl() {
  Go && (Ft.isActive ? (Pn.hidden = !0, bn.hidden = !1, pn.hidden = !1, pn.textContent = Ft.webId ? fe(Ft.webId) : "Logged in", pn.title = Ft.webId ?? "") : (Pn.hidden = !1, bn.hidden = !0, pn.hidden = !0, pn.textContent = ""));
}
window.addEventListener(To, ((n) => {
  const e = n.detail.uri;
  e && $i(e, !0);
}));
window.addEventListener("popstate", () => {
  const e = new URLSearchParams(window.location.search).get("uri");
  e ? $i(e, !1) : (wt && (wt.value = ""), Kn.innerHTML = '<p class="placeholder">Enter a URL above to browse a Linked Data resource.</p>');
});
window.mashlib = { register: Ie };
async function vg() {
  const n = document.querySelectorAll("script[data-pane]"), e = Array.from(n).map(async (t) => {
    const r = t.src;
    if (r)
      try {
        const i = await import(
          /* @vite-ignore */
          r
        ), s = i.default || i.pane;
        s && typeof s.canHandle == "function" && Ie(s);
      } catch {
      }
  });
  await Promise.all(e);
}
async function wg() {
  const e = new URLSearchParams(window.location.search).get("uri") || window.location.href;
  wt && (wt.value = e), await vg(), await gg(), Tl(), Ft.addEventListener("sessionStateChange", () => {
    yg(), Tl();
    const r = wt?.value.trim();
    r && Ai(r, Kn, gn);
  });
  const t = document.querySelectorAll('script[type="application/ld+json"]');
  if (t.length > 0) {
    const r = Array.from(t).map((i) => i.textContent || "").filter(Boolean);
    await mg(e, r, Kn, gn);
  } else
    window.history.replaceState({ uri: e }, "", window.location.href), Ai(e, Kn, gn);
}
wg();
export {
  ra as c,
  Bl as g
};
