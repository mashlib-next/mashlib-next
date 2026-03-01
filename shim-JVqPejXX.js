function Rr(n) {
  "@babel/helpers - typeof";
  return Rr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Rr(n);
}
function _c(n, e) {
  if (Rr(n) != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e);
    if (Rr(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function Sc(n) {
  var e = _c(n, "string");
  return Rr(e) == "symbol" ? e : e + "";
}
function re(n, e, t) {
  return (e = Sc(e)) in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
const en = {
  Literal: 1,
  Collection: 3,
  Graph: 4,
  NamedNode: 5,
  BlankNode: 6,
  Variable: 7
};
let je = class {
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
re(je, "fromValue", void 0);
re(je, "toJS", void 0);
const Xn = "NamedNode", jn = "BlankNode", fr = "Literal", Nn = "Variable", Wn = "DefaultGraph", An = "Collection", Il = "Empty", Mr = "Graph", Fs = "text/html", ci = "application/ld+json", Fl = "text/n3", Ic = "application/n3", di = "application/nquads", hi = "application/n-quads", Fc = "application/n-triples", Or = "application/rdf+xml", Bc = "application/sparql-update", Lc = "application/sparql-update-single-match", Mn = "text/turtle", Rc = "application/x-turtle", fi = "application/xhtml+xml";
let tn = class er extends je {
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
    return "n" + er.nextId++;
  }
  /**
   * Initializes this node
   * @param [id] The identifier for the blank node
   */
  constructor(e) {
    super(er.getId(e)), re(this, "termType", jn), re(this, "classOrder", en.BlankNode), re(this, "isBlank", 1), re(this, "isVar", 1);
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
    var t = new er();
    return e.copyTo(this, t), t;
  }
  toCanonical() {
    return er.NTAnonymousNodePrefix + this.value;
  }
  toString() {
    return er.NTAnonymousNodePrefix + this.id;
  }
};
re(tn, "nextId", 0);
re(tn, "NTAnonymousNodePrefix", "_:");
function On(n) {
  return typeof n == "string" ? n : n.value;
}
function Oc(n) {
  return typeof n == "object" && n !== null && "subject" in n;
}
function Na(n) {
  return typeof n == "object" && n !== null && "statements" in n;
}
function Di(n) {
  return rn(n) && n.termType === An;
}
function kc(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "termType") && (n.termType === Xn || n.termType === Nn || n.termType === jn || n.termType === An || n.termType === fr || n.termType === Mr);
}
function Uc(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "termType") && (n.termType === Xn || n.termType === Nn || n.termType === jn || n.termType === An || n.termType === fr || n.termType === Mr);
}
function Pc(n) {
  return rn(n) && (n.termType === Xn || n.termType === jn || n.termType === Nn);
}
function Mc(n) {
  return rn(n) && n.termType === Nn;
}
function rn(n) {
  return typeof n == "object" && n !== null && "termType" in n;
}
function Bl(n) {
  return n.termType === fr;
}
function tr(n) {
  return typeof n == "object" && n !== null && "subject" in n && "predicate" in n && "object" in n;
}
function Bs(n) {
  return rn(n) && n.termType === "NamedNode";
}
function $c(n) {
  return rn(n) && "termType" in n && n.termType === "BlankNode";
}
function qc(n) {
  return rn(n) && (n.termType === Xn || n.termType === Nn || n.termType === jn || n.termType === Wn);
}
let pt = class nr extends je {
  /**
   * Create a named (IRI) RDF Node
   * @constructor
   * @param iri - The IRI for this node
   */
  constructor(e) {
    if (super(On(e)), re(this, "termType", Xn), re(this, "classOrder", en.NamedNode), !this.value)
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
    return r >= 0 && t < r + 2 || t < 0 ? null : new nr(e.slice(0, t + 1));
  }
  /**
   * Returns an NN for the whole web site, ending in slash.
   * Contrast with the "origin" which does NOT have a trailing slash
   */
  site() {
    var e = this.value.split("#")[0], t = e.indexOf("//");
    if (t < 0) throw new Error("This URI does not have a web site part (origin)");
    var r = e.indexOf("/", t + 2);
    return r < 0 ? new nr(e.slice(0) + "/") : new nr(e.slice(0, r + 1));
  }
  /**
   * Creates the fetchable named node for the document.
   * Removes everything from the # anchor tag.
   */
  doc() {
    return this.value.indexOf("#") < 0 ? this : new nr(this.value.split("#")[0]);
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
    return typeof e > "u" || e === null || rn(e) ? e : new nr(e);
  }
};
const hn = {
  boolean: new pt("http://www.w3.org/2001/XMLSchema#boolean"),
  dateTime: new pt("http://www.w3.org/2001/XMLSchema#dateTime"),
  decimal: new pt("http://www.w3.org/2001/XMLSchema#decimal"),
  double: new pt("http://www.w3.org/2001/XMLSchema#double"),
  integer: new pt("http://www.w3.org/2001/XMLSchema#integer"),
  langString: new pt("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),
  string: new pt("http://www.w3.org/2001/XMLSchema#string")
};
let Zt = class Yt extends je {
  /**
   * Initializes a literal
   * @param value - The literal's lexical value
   * @param language - The language for the literal. Defaults to ''.
   * @param datatype - The literal's datatype as a named node. Defaults to xsd:string.
   */
  constructor(e, t, r) {
    super(e), re(this, "termType", fr), re(this, "classOrder", en.Literal), re(this, "datatype", hn.string), re(this, "isVar", 0), re(this, "language", ""), t ? (this.language = t, this.datatype = hn.langString) : r ? this.datatype = pt.fromValue(r) : this.datatype = hn.string;
  }
  /**
   * Gets a copy of this literal
   */
  copy() {
    return new Yt(this.value, this.lang, this.datatype);
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
    return Yt.toNT(this);
  }
  /** Serializes a literal to an N-Triples string */
  static toNT(e) {
    if (typeof e.value == "number")
      return "" + e.value;
    if (typeof e.value != "string")
      throw new Error("Value of RDF literal is not string or number: " + e.value);
    var t = e.value;
    return t = t.replace(/\\/g, "\\\\"), t = t.replace(/\"/g, '\\"'), t = t.replace(/\n/g, "\\n"), t = t.replace(/\r/g, "\\r"), t = '"' + t + '"', e.language ? t += "@" + e.language : e.datatype.equals(hn.string) || (t += "^^" + e.datatype.toCanonical()), t;
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
    return new Yt(t, null, hn.boolean);
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
    return new Yt(r, null, hn.dateTime);
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
    return r.indexOf("e") < 0 && Math.abs(e) <= Number.MAX_SAFE_INTEGER ? t = Number.isInteger(e) ? hn.integer : hn.decimal : t = hn.double, new Yt(r, null, t);
  }
  /**
   * Builds a literal node from an input value
   * @param value - The input value
   */
  static fromValue(e) {
    if (Bl(e))
      return e;
    switch (typeof e) {
      case "object":
        if (e instanceof Date)
          return Yt.fromDate(e);
      case "boolean":
        return Yt.fromBoolean(e);
      case "number":
        return Yt.fromNumber(e);
      case "string":
        return new Yt(e);
    }
    throw new Error("Can't make literal from " + e + " of type " + typeof e);
  }
};
function Ll(n) {
  return typeof n > "u" || n === null || rn(n) ? n : Array.isArray(n) ? new qt(n) : Zt.fromValue(n);
}
class qt extends je {
  constructor(e) {
    super((tn.nextId++).toString()), re(this, "termType", An), re(this, "classOrder", en.Collection), re(this, "closed", !1), re(this, "compareTerm", tn.prototype.compareTerm), re(this, "elements", []), re(this, "isVar", 0), e && e.length > 0 && e.forEach((t) => {
      this.elements.push(Ll(t));
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
    return new qt(t);
  }
  toNT() {
    return qt.toNT(this);
  }
  static toNT(e) {
    return tn.NTAnonymousNodePrefix + e.id;
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
re(qt, "termType", An);
const kr = "chrome:theSession";
new pt(kr);
let _i = class extends je {
  constructor() {
    super(""), re(this, "value", ""), re(this, "termType", Wn), re(this, "uri", kr);
  }
  toCanonical() {
    return this.value;
  }
  toString() {
    return "DefaultGraph";
  }
};
function Ls(n) {
  return !!n && n.termType === Wn;
}
const Hc = new _i();
class $t {
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
    re(this, "subject", void 0), re(this, "predicate", void 0), re(this, "object", void 0), re(this, "graph", void 0), this.subject = je.fromValue(e), this.predicate = je.fromValue(t), this.object = je.fromValue(r), this.graph = i == null ? Hc : je.fromValue(i);
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
    return new $t(this.subject.substitute(e), this.predicate.substitute(e), this.object.substitute(e), Ls(this.graph) ? this.graph : this.graph.substitute(e));
  }
  /** Creates a canonical string representation of this statement. */
  toCanonical() {
    let e = [this.subject.toCanonical(), this.predicate.toCanonical(), this.object.toCanonical()];
    return this.graph && this.graph.termType !== Wn && e.push(this.graph.toCanonical()), e.join(" ") + " .";
  }
  /** Creates a n-triples string representation of this statement */
  toNT() {
    return [this.subject.toNT(), this.predicate.toNT(), this.object.toNT()].join(" ") + " .";
  }
  /** Creates a n-quads string representation of this statement */
  toNQ() {
    return [this.subject.toNT(), this.predicate.toNT(), this.object.toNT(), Ls(this.graph) ? "" : this.graph.toNT()].join(" ") + " .";
  }
  /** Creates a string representation of this statement */
  toString() {
    return this.toNT();
  }
}
var Rl = Rl || console.log;
function Un(n) {
  var e;
  return e = n.indexOf("#"), e < 0 ? n : n.slice(0, e);
}
function Wc(n) {
  var e = /[^\/]*\/\/([^\/]*)\//.exec(n);
  return e ? e[1] : "";
}
function Tt(n, e) {
  var t, r, i, s, a, l, u = e.indexOf("#");
  if (u > 0 && (e = e.slice(0, u)), n.length === 0)
    return e;
  if (n.indexOf("#") === 0)
    return e + n;
  if (s = n.indexOf(":"), s >= 0 || (t = e.indexOf(":"), e.length === 0))
    return n;
  if (t < 0)
    return Rl("Invalid base: " + e + " in join with given: " + n), n;
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
function Rs(n) {
  const e = n.indexOf(":");
  return e < 0 ? null : n.slice(0, e);
}
function Va(n, e) {
  var t, r, i, s, a, l, u, c, h, p, m, w, v, C = new RegExp("^[-_a-zA-Z0-9.]+:(//[^/]*)?/[^/]*$");
  if (!n)
    return e;
  if (n === e)
    return "";
  for (r = c = 0, a = e.length; c < a && e[r] === n[r]; r = ++c)
    ;
  if (n.slice(0, r).match(C) && (i = e.indexOf("//"), i < 0 && (i = -2), s = e.indexOf("/", i + 2), e[s + 1] !== "/" && n[s + 1] !== "/" && e.slice(0, s) === n.slice(0, s)))
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
  if (v = "", u > 0)
    for (p = 1, w = u; w >= 1 ? p <= w : p >= w; w >= 1 ? ++p : --p)
      v += "../";
  return v + e.slice(r);
}
let Vn = class Ol extends je {
  /**
   * Initializes this variable
   * @param name The variable's name
   */
  constructor(e = "") {
    super(e), re(this, "termType", Nn), re(this, "base", "varid:"), re(this, "classOrder", en.Variable), re(this, "isVar", 1), re(this, "uri", void 0), this.base = "varid:", this.uri = Tt(e, this.base);
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
    return Ol.toString(this);
  }
  static toString(e) {
    return e.uri.slice(0, e.base.length) === e.base ? `?${e.uri.slice(e.base.length)}` : `?${e.uri}`;
  }
}, At = /* @__PURE__ */ (function(n) {
  return n.collections = "COLLECTIONS", n.defaultGraphType = "DEFAULT_GRAPH_TYPE", n.equalsMethod = "EQUALS_METHOD", n.id = "ID", n.identity = "IDENTITY", n.reversibleId = "REVERSIBLE_ID", n.variableType = "VARIABLE_TYPE", n;
})({});
const Os = new _i(), Pt = {
  supports: {
    [At.collections]: !1,
    [At.defaultGraphType]: !1,
    [At.equalsMethod]: !0,
    [At.identity]: !1,
    [At.id]: !0,
    [At.reversibleId]: !1,
    [At.variableType]: !0
  },
  /**
   * Creates a new blank node
   * @param value - The blank node's identifier
   */
  blankNode(n) {
    return new tn(n);
  },
  defaultGraph: () => Os,
  /**
   * Compares to (rdf) objects for equality.
   */
  equals(n, e) {
    return n === e || !n || !e ? !0 : tr(n) || tr(e) ? tr(n) && tr(e) ? this.equals(n.subject, e.subject) && this.equals(n.predicate, e.predicate) && this.equals(n.object, e.object) && this.equals(n.graph, e.graph) : !1 : rn(n) && rn(e) ? this.id(n) === this.id(e) : !1;
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
    if (tr(n))
      return this.quadToNQ(n);
    switch (n.termType) {
      case Wn:
        return "defaultGraph";
      case Nn:
        return Vn.toString(n);
      default:
        const e = this.termToNQ(n);
        if (e)
          return e;
        throw new Error(`Can't id term with type '${n.termType}'`);
    }
  },
  isQuad(n) {
    return n instanceof $t;
  },
  /**
   * Creates a new literal node. Does some JS literal parsing for ease of use.
   * @param value - The lexical value
   * @param languageOrDatatype - Either the language or the datatype
   */
  literal(n, e) {
    if (typeof n != "string" && !e)
      return Zt.fromValue(n);
    const t = typeof n == "string" ? n : "" + n;
    return typeof e == "string" ? e.indexOf(":") === -1 ? new Zt(t, e) : new Zt(t, null, this.namedNode(e)) : new Zt(t, null, e);
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
    return new $t(n, e, t, r || Os);
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
      case jn:
        return "_:" + n.value;
      case Wn:
        return "";
      case Il:
        return "<http://www.w3.org/1999/02/22-rdf-syntax-ns#nil>";
      case fr:
        return Zt.toNT(n);
      case Mr:
      case Xn:
        return "<" + n.value + ">";
      case An:
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
    return new Vn(n);
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
var aa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function kl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ga = { exports: {} }, Vc = ga.exports, ks;
function Kc() {
  return ks || (ks = 1, (function(n) {
    (function(e, t) {
      n.exports ? n.exports = t() : e.ttl2jsonld = t();
    })(Vc, function() {
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
          literal: function(w) {
            return '"' + u(w.text) + '"';
          },
          class: function(w) {
            var v = "", C;
            for (C = 0; C < w.parts.length; C++)
              v += w.parts[C] instanceof Array ? c(w.parts[C][0]) + "-" + c(w.parts[C][1]) : c(w.parts[C]);
            return "[" + (w.inverted ? "^" : "") + v + "]";
          },
          any: function(w) {
            return "any character";
          },
          end: function(w) {
            return "end of input";
          },
          other: function(w) {
            return w.description;
          }
        };
        function l(w) {
          return w.charCodeAt(0).toString(16).toUpperCase();
        }
        function u(w) {
          return w.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(v) {
            return "\\x0" + l(v);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(v) {
            return "\\x" + l(v);
          });
        }
        function c(w) {
          return w.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(v) {
            return "\\x0" + l(v);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(v) {
            return "\\x" + l(v);
          });
        }
        function h(w) {
          return a[w.type](w);
        }
        function p(w) {
          var v = new Array(w.length), C, T;
          for (C = 0; C < w.length; C++)
            v[C] = h(w[C]);
          if (v.sort(), v.length > 0) {
            for (C = 1, T = 1; C < v.length; C++)
              v[C - 1] !== v[C] && (v[T] = v[C], T++);
            v.length = T;
          }
          switch (v.length) {
            case 1:
              return v[0];
            case 2:
              return v[0] + " or " + v[1];
            default:
              return v.slice(0, -1).join(", ") + ", or " + v[v.length - 1];
          }
        }
        function m(w) {
          return w ? '"' + u(w) + '"' : "end of input";
        }
        return "Expected " + p(i) + " but " + m(s) + " found.";
      };
      function r(i, s) {
        s = s !== void 0 ? s : {};
        var a = {}, l = { turtleDoc: Es }, u = Es, c = function(o) {
          var y = Ue.toJSON();
          return y["@graph"] = [], o.filter((E) => Array.isArray(E)).forEach((E) => {
            E.forEach((D) => {
              y["@graph"].push(D);
            });
          }), y["@graph"].length === 1 && (Object.assign(y, y["@graph"][0]), delete y["@graph"]), y;
        }, h = "\uFEFF", p = xe("\uFEFF", !1), m = ".", w = xe(".", !1), v = function(o) {
          return o;
        }, C = "#", T = xe("#", !1), B = /^[^\n]/, O = We([`
`], !0, !1), X = `
`, Y = xe(`
`, !1), A = function(o) {
          return o.join("");
        }, K = "@prefix", P = xe("@prefix", !1), G = function(o, y) {
          return Ue.addPrefix(o === "" ? "0" : o, y), {};
        }, R = "@base", H = xe("@base", !1), $ = function(o) {
          return Ue.addBase(o), {};
        }, q = /^[Bb]/, ee = We(["B", "b"], !1, !1), Q = /^[Aa]/, _ = We(["A", "a"], !1, !1), V = /^[Ss]/, Z = We(["S", "s"], !1, !1), ae = /^[Ee]/, ie = We(["E", "e"], !1, !1), oe = /^[Pp]/, ne = We(["P", "p"], !1, !1), ge = /^[Rr]/, Le = We(["R", "r"], !1, !1), pe = /^[Ff]/, Ce = We(["F", "f"], !1, !1), Pe = /^[Ii]/, Ye = We(["I", "i"], !1, !1), Te = /^[Xx]/, qe = We(["X", "x"], !1, !1), ht = function(o, y) {
          var E = {};
          return typeof o == "string" && o !== "[]" ? E["@id"] = o : typeof o == "object" && Object.assign(E, o), y && Object.assign(E, y), [E];
        }, it = function(o, y) {
          var E = {};
          return o && Object.assign(E, o), y && Object.assign(E, y), [E];
        }, De = ";", Re = xe(";", !1), _e = function(o, y, E, D) {
          var S = {};
          return S[E] = D, S;
        }, Et = function(o, y, E) {
          return E;
        }, Ve = function(o, y, E) {
          var D = {};
          return E.unshift(Dc(o, y)), E.forEach((S) => {
            S && Object.keys(S).forEach((U) => {
              S[U].forEach((M) => {
                U === "@type" && M["@id"] !== void 0 && (M = M["@id"]), D[U] === void 0 ? D[U] = M : Array.isArray(D[U]) ? D[U].push(M) : D[U] = [D[U], M];
              });
            });
          }), D;
        }, se = ",", Ie = xe(",", !1), lt = function(o, y) {
          return y;
        }, _t = function(o, y) {
          return y.unshift(o), y;
        }, ke = "a", Oe = xe("a", !1), It = function() {
          return "@type";
        }, on = function(o) {
          return Wa(o, !0);
        }, Ct = function(o) {
          return Wa(o, !1);
        }, Tn = function(o) {
          return o === "[]" ? {} : { "@id": o };
        }, N = function(o) {
          return { "@id": o };
        }, f = "[", g = xe("[", !1), I = "]", W = xe("]", !1), z = "(", te = xe("(", !1), Ae = ")", Ke = xe(")", !1), Me = function(o) {
          return { "@list": o };
        }, He = function(o, y) {
          return { "@value": o, "@language": y };
        }, Be = "^^", Hr = xe("^^", !1), mr = function(o, y) {
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
        }, gr = "true", b = xe("true", !1), x = function() {
          return !0;
        }, k = "false", J = xe("false", !1), le = function() {
          return !1;
        }, Ee = function(o) {
          return o + ":";
        }, Ge = "<", mt = xe("<", !1), bt = /^[^\0- <>"{}|\^`\\]/, Ot = We([["\0", " "], "<", ">", '"', "{", "}", "|", "^", "`", "\\"], !0, !1), kt = ">", un = xe(">", !1), cn = function(o) {
          const y = o.map((D) => 65536 <= D.codePointAt(0) && D.codePointAt(0) <= 983039 ? "a" : D.length === 1 ? D : D.length === 6 ? String.fromCharCode("0x" + D.substring(2)) : D.length === 10 ? String.fromCodePoint("0x" + D.substring(2)) : D).join("");
          if (y.match(/^[^\u0000-\u0020<>"{}|^`\\]*$/)) {
            var E = o.join("");
            try {
              return Ue.resolve(E);
            } catch {
              Oa("Invalid IRIREF " + E);
            }
          } else Oa("Invalid IRIREF " + o.join("") + " / " + y);
        }, ft = ":", nt = xe(":", !1), dn = function(o) {
          return o = o || "0", Ue.hasPrefix(o) === !1 && Oa("undefined prefix " + o), o;
        }, Dn = function(o) {
          return o || "";
        }, ot = function(o, y) {
          return Ue.increment(o), Ue.resolve(o + ":" + y);
        }, yr = "_:", vn = xe("_:", !1), Qe = /^[0-9]/, st = We([["0", "9"]], !1, !1), jo = "@", zo = xe("@", !1), Gi = /^[a-zA-Z]/, Xi = We([["a", "z"], ["A", "Z"]], !1, !1), Ba = "-", La = xe("-", !1), Wr = /^[a-zA-Z0-9]/, Vr = We([["a", "z"], ["A", "Z"], ["0", "9"]], !1, !1), ji = function(o, y) {
          return "-" + y.join("");
        }, Jo = function(o, y) {
          return o.join("") + y.join("");
        }, Kr = /^[+\-]/, Gr = We(["+", "-"], !1, !1), Yo = function(o) {
          return o.match(/^[0+][0-9]+$/) ? {
            "@value": o,
            "@type": "http://www.w3.org/2001/XMLSchema#integer"
          } : parseInt(o);
        }, Qo = function(o) {
          return {
            "@value": o,
            "@type": "http://www.w3.org/2001/XMLSchema#decimal"
          };
        }, Zo = function(o) {
          return {
            "@value": o,
            "@type": "http://www.w3.org/2001/XMLSchema#double"
          };
        }, eu = /^[eE]/, tu = We(["e", "E"], !1, !1), Xr = '"', jr = xe('"', !1), zi = /^[^"\\\n\r]/, Ji = We(['"', "\\", `
`, "\r"], !0, !1), zr = "'", Jr = xe("'", !1), Yi = /^[^'\\\n\r]/, Qi = We(["'", "\\", `
`, "\r"], !0, !1), Yr = "'''", Zi = xe("'''", !1), Ht = /^[^'\\]/, Wt = We(["'", "\\"], !0, !1), Qr = "''", es = xe("''", !1), ts = function(o, y) {
          return "''" + y.join("");
        }, ns = function(o, y) {
          return "'" + y.join("");
        }, rs = function(o, y) {
          return o.join("") + y.join("");
        }, Zr = '"""', as = xe('"""', !1), Vt = /^[^"\\]/, Kt = We(['"', "\\"], !0, !1), ea = '""', is = xe('""', !1), ss = function(o, y) {
          return '""' + y.join("");
        }, ls = function(o, y) {
          return '"' + y.join("");
        }, os = "\\U", nu = xe("\\U", !1), ru = function(o) {
          return String.fromCodePoint(parseInt(o.join(""), 16));
        }, us = "\\u", au = xe("\\u", !1), iu = function(o) {
          return String.fromCharCode(parseInt(o.join(""), 16));
        }, cs = "\\t", su = xe("\\t", !1), lu = function() {
          return "	";
        }, ds = "\\b", ou = xe("\\b", !1), uu = function() {
          return "\b";
        }, hs = "\\n", cu = xe("\\n", !1), du = function() {
          return `
`;
        }, fs = "\\r", hu = xe("\\r", !1), fu = function() {
          return "\r";
        }, ps = "\\f", pu = xe("\\f", !1), mu = function() {
          return "\f";
        }, ms = '\\"', gu = xe('\\"', !1), yu = function() {
          return '"';
        }, gs = "\\'", vu = xe("\\'", !1), wu = function() {
          return "'";
        }, ys = "\\\\", Eu = xe("\\\\", !1), Cu = function() {
          return "\\";
        }, bu = /^[ \t\r\n]/, Nu = We([" ", "	", "\r", `
`], !1, !1), Au = function() {
          return "[]";
        }, xu = /^[\uD800-\uDBFF]/, Tu = We([["\uD800", "\uDBFF"]], !1, !1), Du = /^[\uDC00-\uDFFF]/, _u = We([["\uDC00", "\uDFFF"]], !1, !1), Su = function(o, y) {
          return o + y;
        }, Iu = /^[A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, Fu = We([["A", "Z"], ["a", "z"], ["À", "Ö"], ["Ø", "ö"], ["ø", "˿"], ["Ͱ", "ͽ"], ["Ϳ", "῿"], ["‌", "‍"], ["⁰", "↏"], ["Ⰰ", "⿯"], ["、", "퟿"], ["豈", "﷏"], ["ﷰ", "�"]], !1, !1), Bu = "_", Lu = xe("_", !1), Ru = "·", Ou = xe("·", !1), ku = /^[\u0300-\u036F]/, Uu = We([["̀", "ͯ"]], !1, !1), Pu = /^[\u203F-\u2040]/, Mu = We([["‿", "⁀"]], !1, !1), vs = function(o, y, E, D) {
          return E.join("") + D.join("");
        }, $u = function(o, y, E) {
          return o + y.join("") + E.join("");
        }, qu = "%", Hu = xe("%", !1), Wu = /^[0-9A-Fa-f]/, Vu = We([["0", "9"], ["A", "F"], ["a", "f"]], !1, !1), Ku = "\\", Gu = xe("\\", !1), Xu = /^[_~.!$&'()*+,;=\/?#@%\-]/, ju = We(["_", "~", ".", "!", "$", "&", "'", "(", ")", "*", "+", ",", ";", "=", "/", "?", "#", "@", "%", "-"], !1, !1), d = 0, ue = 0, ta = [{ line: 1, column: 1 }], Gt = 0, Ra = [], na;
        if ("startRule" in s) {
          if (!(s.startRule in l))
            throw new Error(`Can't start parsing from rule "` + s.startRule + '".');
          u = l[s.startRule];
        }
        function Oa(o, y) {
          throw y = y !== void 0 ? y : ka(ue, d), Ju(o, y);
        }
        function xe(o, y) {
          return { type: "literal", text: o, ignoreCase: y };
        }
        function We(o, y, E) {
          return { type: "class", parts: o, inverted: y, ignoreCase: E };
        }
        function zu() {
          return { type: "end" };
        }
        function ws(o) {
          var y = ta[o], E;
          if (y)
            return y;
          for (E = o - 1; !ta[E]; )
            E--;
          for (y = ta[E], y = {
            line: y.line,
            column: y.column
          }; E < o; )
            i.charCodeAt(E) === 10 ? (y.line++, y.column = 1) : y.column++, E++;
          return ta[o] = y, y;
        }
        function ka(o, y) {
          var E = ws(o), D = ws(y);
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
        function j(o) {
          d < Gt || (d > Gt && (Gt = d, Ra = []), Ra.push(o));
        }
        function Ju(o, y) {
          return new t(o, null, null, y);
        }
        function Yu(o, y, E) {
          return new t(
            t.buildMessage(o, y),
            o,
            y,
            E
          );
        }
        function Es() {
          var o, y, E, D, S;
          for (o = d, y = [], E = Cs(); E !== a; )
            y.push(E), E = Cs();
          if (y !== a) {
            for (E = [], D = bs(); D !== a; )
              E.push(D), D = bs();
            if (E !== a) {
              for (D = [], S = ce(); S !== a; )
                D.push(S), S = ce();
              D !== a ? (ue = o, y = c(E), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function Cs() {
          var o;
          return i.charCodeAt(d) === 65279 ? (o = h, d++) : (o = a, j(p)), o;
        }
        function bs() {
          var o, y, E, D;
          if (o = Zu(), o === a)
            if (o = d, y = ac(), y !== a) {
              for (E = [], D = ce(); D !== a; )
                E.push(D), D = ce();
              E !== a ? (i.charCodeAt(d) === 46 ? (D = m, d++) : (D = a, j(w)), D !== a ? (ue = o, y = v(y), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          return o;
        }
        function Qu() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 35 ? (y = C, d++) : (y = a, j(T)), y !== a) {
            for (E = [], B.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(O)); D !== a; )
              E.push(D), B.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(O));
            E !== a ? (i.charCodeAt(d) === 10 ? (D = X, d++) : (D = a, j(Y)), D !== a ? (ue = o, y = A(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function ce() {
          var o;
          return o = bc(), o === a && (o = Qu()), o;
        }
        function Zu() {
          var o;
          return o = ec(), o === a && (o = tc(), o === a && (o = rc(), o === a && (o = nc()))), o;
        }
        function ec() {
          var o, y, E, D, S, U, M, F, he;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.substr(d, 7) === K ? (E = K, d += 7) : (E = a, j(P)), E !== a) {
              for (D = [], S = ce(); S !== a; )
                D.push(S), S = ce();
              if (D !== a)
                if (S = Ds(), S !== a) {
                  for (U = [], M = ce(); M !== a; )
                    U.push(M), M = ce();
                  if (U !== a)
                    if (M = wr(), M !== a) {
                      for (F = [], he = ce(); he !== a; )
                        F.push(he), he = ce();
                      F !== a ? (i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, j(w)), he !== a ? (ue = o, y = G(S, M), o = y) : (d = o, o = a)) : (d = o, o = a);
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
        function tc() {
          var o, y, E, D, S, U, M;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.substr(d, 5) === R ? (E = R, d += 5) : (E = a, j(H)), E !== a) {
              for (D = [], S = ce(); S !== a; )
                D.push(S), S = ce();
              if (D !== a)
                if (S = wr(), S !== a) {
                  for (U = [], M = ce(); M !== a; )
                    U.push(M), M = ce();
                  U !== a ? (i.charCodeAt(d) === 46 ? (M = m, d++) : (M = a, j(w)), M !== a ? (ue = o, y = $(S), o = y) : (d = o, o = a)) : (d = o, o = a);
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
        function nc() {
          var o, y, E, D, S, U, M, F;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (q.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, j(ee)), E !== a)
              if (Q.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(_)), D !== a)
                if (V.test(i.charAt(d)) ? (S = i.charAt(d), d++) : (S = a, j(Z)), S !== a)
                  if (ae.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(ie)), U !== a) {
                    for (M = [], F = ce(); F !== a; )
                      M.push(F), F = ce();
                    M !== a ? (F = wr(), F !== a ? (ue = o, y = $(F), o = y) : (d = o, o = a)) : (d = o, o = a);
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
        function rc() {
          var o, y, E, D, S, U, M, F, he, $e, Sn, In;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (oe.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, j(ne)), E !== a)
              if (ge.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Le)), D !== a)
                if (ae.test(i.charAt(d)) ? (S = i.charAt(d), d++) : (S = a, j(ie)), S !== a)
                  if (pe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(Ce)), U !== a)
                    if (Pe.test(i.charAt(d)) ? (M = i.charAt(d), d++) : (M = a, j(Ye)), M !== a)
                      if (Te.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(qe)), F !== a) {
                        for (he = [], $e = ce(); $e !== a; )
                          he.push($e), $e = ce();
                        if (he !== a)
                          if ($e = Ds(), $e !== a) {
                            for (Sn = [], In = ce(); In !== a; )
                              Sn.push(In), In = ce();
                            Sn !== a ? (In = wr(), In !== a ? (ue = o, y = G($e, In), o = y) : (d = o, o = a)) : (d = o, o = a);
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
        function ac() {
          var o, y, E;
          return o = d, y = ic(), y !== a ? (E = Ua(), E !== a ? (ue = o, y = ht(y, E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a && (o = d, y = Ns(), y !== a ? (E = Ua(), E === a && (E = null), E !== a ? (ue = o, y = it(y, E), o = y) : (d = o, o = a)) : (d = o, o = a)), o;
        }
        function Ua() {
          var o, y, E, D, S, U, M, F, he, $e;
          if (o = d, y = Ma(), y !== a)
            if (E = Pa(), E !== a) {
              for (D = [], S = d, U = [], M = ce(); M !== a; )
                U.push(M), M = ce();
              for (U !== a ? (i.charCodeAt(d) === 59 ? (M = De, d++) : (M = a, j(Re)), M !== a ? (F = d, he = Ma(), he !== a ? ($e = Pa(), $e !== a ? (ue = F, he = _e(y, E, he, $e), F = he) : (d = F, F = a)) : (d = F, F = a), F === a && (F = null), F !== a ? (ue = S, U = Et(y, E, F), S = U) : (d = S, S = a)) : (d = S, S = a)) : (d = S, S = a); S !== a; ) {
                for (D.push(S), S = d, U = [], M = ce(); M !== a; )
                  U.push(M), M = ce();
                U !== a ? (i.charCodeAt(d) === 59 ? (M = De, d++) : (M = a, j(Re)), M !== a ? (F = d, he = Ma(), he !== a ? ($e = Pa(), $e !== a ? (ue = F, he = _e(y, E, he, $e), F = he) : (d = F, F = a)) : (d = F, F = a), F === a && (F = null), F !== a ? (ue = S, U = Et(y, E, F), S = U) : (d = S, S = a)) : (d = S, S = a)) : (d = S, S = a);
              }
              D !== a ? (ue = o, y = Ve(y, E, D), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function Pa() {
          var o, y, E, D, S, U, M;
          if (o = d, y = vr(), y !== a) {
            for (E = [], D = d, S = [], U = ce(); U !== a; )
              S.push(U), U = ce();
            for (S !== a ? (i.charCodeAt(d) === 44 ? (U = se, d++) : (U = a, j(Ie)), U !== a ? (M = vr(), M !== a ? (ue = D, S = lt(y, M), D = S) : (d = D, D = a)) : (d = D, D = a)) : (d = D, D = a); D !== a; ) {
              for (E.push(D), D = d, S = [], U = ce(); U !== a; )
                S.push(U), U = ce();
              S !== a ? (i.charCodeAt(d) === 44 ? (U = se, d++) : (U = a, j(Ie)), U !== a ? (M = vr(), M !== a ? (ue = D, S = lt(y, M), D = S) : (d = D, D = a)) : (d = D, D = a)) : (d = D, D = a);
            }
            E !== a ? (ue = o, y = _t(y, E), o = y) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function Ma() {
          var o, y, E;
          if (o = d, y = sc(), y !== a && (ue = o, y = v(y)), o = y, o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (i.charCodeAt(d) === 97 ? (E = ke, d++) : (E = a, j(Oe)), E !== a ? (ue = o, y = It(), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function ic() {
          var o, y;
          return o = d, y = As(), y !== a && (ue = o, y = on(y)), o = y, o === a && (o = xs(), o === a && (o = ra())), o;
        }
        function sc() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          return y !== a ? (E = ra(), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function vr() {
          var o, y;
          return o = lc(), o === a && (o = d, y = As(), y !== a && (ue = o, y = Ct(y)), o = y, o === a && (o = d, y = xs(), y !== a && (ue = o, y = Tn(y)), o = y, o === a && (o = d, y = Ns(), y !== a && (ue = o, y = v(y)), o = y, o === a && (o = d, y = ra(), y !== a && (ue = o, y = N(y)), o = y)))), o;
        }
        function lc() {
          var o;
          return o = uc(), o === a && (o = oc(), o === a && (o = cc())), o;
        }
        function Ns() {
          var o, y, E, D, S, U;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.charCodeAt(d) === 91 ? (E = f, d++) : (E = a, j(g)), E !== a)
              if (D = Ua(), D !== a) {
                for (S = [], U = ce(); U !== a; )
                  S.push(U), U = ce();
                S !== a ? (i.charCodeAt(d) === 93 ? (U = I, d++) : (U = a, j(W)), U !== a ? (ue = o, y = v(D), o = y) : (d = o, o = a)) : (d = o, o = a);
              } else
                d = o, o = a;
            else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function As() {
          var o, y, E, D, S, U;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (i.charCodeAt(d) === 40 ? (E = z, d++) : (E = a, j(te)), E !== a) {
              for (D = [], S = vr(); S !== a; )
                D.push(S), S = vr();
              if (D !== a) {
                for (S = [], U = ce(); U !== a; )
                  S.push(U), U = ce();
                S !== a ? (i.charCodeAt(d) === 41 ? (U = Ae, d++) : (U = a, j(Ke)), U !== a ? (ue = o, y = Me(D), o = y) : (d = o, o = a)) : (d = o, o = a);
              } else
                d = o, o = a;
            } else
              d = o, o = a;
          else
            d = o, o = a;
          return o;
        }
        function oc() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          return y !== a ? (E = yc(), E === a && (E = gc(), E === a && (E = mc())), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function uc() {
          var o, y, E, D, S, U, M;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a)
            if (E = $a(), E !== a) {
              for (D = [], S = ce(); S !== a; )
                D.push(S), S = ce();
              D !== a ? (S = pc(), S !== a ? (ue = o, y = He(E, S), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          else
            d = o, o = a;
          if (o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            if (y !== a)
              if (E = $a(), E !== a) {
                for (D = [], S = ce(); S !== a; )
                  D.push(S), S = ce();
                if (D !== a)
                  if (i.substr(d, 2) === Be ? (S = Be, d += 2) : (S = a, j(Hr)), S !== a) {
                    for (U = [], M = ce(); M !== a; )
                      U.push(M), M = ce();
                    U !== a ? (M = ra(), M !== a ? (ue = o, y = mr(E, M), o = y) : (d = o, o = a)) : (d = o, o = a);
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
              y !== a ? (E = $a(), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a);
            }
          }
          return o;
        }
        function cc() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a ? (i.substr(d, 4) === gr ? (E = gr, d += 4) : (E = a, j(b)), E !== a ? (ue = o, y = x(), o = y) : (d = o, o = a)) : (d = o, o = a), o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (i.substr(d, 5) === k ? (E = k, d += 5) : (E = a, j(J)), E !== a ? (ue = o, y = le(), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function $a() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          return y !== a ? (E = Ec(), E === a && (E = Cc(), E === a && (E = wc(), E === a && (E = vc()))), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function ra() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a ? (E = wr(), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (E = dc(), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function dc() {
          var o, y;
          return o = hc(), o === a && (o = d, y = Ts(), y !== a && (ue = o, y = Ee(y)), o = y), o;
        }
        function xs() {
          var o, y, E;
          for (o = d, y = [], E = ce(); E !== a; )
            y.push(E), E = ce();
          if (y !== a ? (E = fc(), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a) {
            for (o = d, y = [], E = ce(); E !== a; )
              y.push(E), E = ce();
            y !== a ? (E = Nc(), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          }
          return o;
        }
        function wr() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 60 ? (y = Ge, d++) : (y = a, j(mt)), y !== a) {
            for (E = [], bt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Ot)), D === a && (D = Xe()); D !== a; )
              E.push(D), bt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Ot)), D === a && (D = Xe());
            E !== a ? (i.charCodeAt(d) === 62 ? (D = kt, d++) : (D = a, j(un)), D !== a ? (ue = o, y = cn(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function Ts() {
          var o, y, E;
          return o = d, y = Ss(), y === a && (y = null), y !== a ? (i.charCodeAt(d) === 58 ? (E = ft, d++) : (E = a, j(nt)), E !== a ? (ue = o, y = dn(y), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function Ds() {
          var o, y, E;
          return o = d, y = Ss(), y === a && (y = null), y !== a ? (i.charCodeAt(d) === 58 ? (E = ft, d++) : (E = a, j(nt)), E !== a ? (ue = o, y = Dn(y), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function hc() {
          var o, y, E;
          return o = d, y = Ts(), y !== a ? (E = Ac(), E !== a ? (ue = o, y = ot(y, E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        function fc() {
          var o, y, E, D, S, U, M, F, he, $e;
          if (o = d, y = d, i.substr(d, 2) === yr ? (E = yr, d += 2) : (E = a, j(vn)), E !== a)
            if (D = Ha(), D === a && (Qe.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(st))), D !== a) {
              for (S = [], U = ut(); U !== a; )
                S.push(U), U = ut();
              if (S !== a) {
                if (U = [], M = d, F = [], i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, j(w)), he !== a)
                  for (; he !== a; )
                    F.push(he), i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, j(w));
                else
                  F = a;
                if (F !== a) {
                  if (he = [], $e = ut(), $e !== a)
                    for (; $e !== a; )
                      he.push($e), $e = ut();
                  else
                    he = a;
                  he !== a ? (F = [F, he], M = F) : (d = M, M = a);
                } else
                  d = M, M = a;
                for (; M !== a; ) {
                  if (U.push(M), M = d, F = [], i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, j(w)), he !== a)
                    for (; he !== a; )
                      F.push(he), i.charCodeAt(d) === 46 ? (he = m, d++) : (he = a, j(w));
                  else
                    F = a;
                  if (F !== a) {
                    if (he = [], $e = ut(), $e !== a)
                      for (; $e !== a; )
                        he.push($e), $e = ut();
                    else
                      he = a;
                    he !== a ? (F = [F, he], M = F) : (d = M, M = a);
                  } else
                    d = M, M = a;
                }
                U !== a ? (E = [E, D, S, U], y = E) : (d = y, y = a);
              } else
                d = y, y = a;
            } else
              d = y, y = a;
          else
            d = y, y = a;
          return y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function pc() {
          var o, y, E, D, S, U, M, F;
          if (o = d, i.charCodeAt(d) === 64 ? (y = jo, d++) : (y = a, j(zo)), y !== a) {
            if (E = [], Gi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Xi)), D !== a)
              for (; D !== a; )
                E.push(D), Gi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Xi));
            else
              E = a;
            if (E !== a) {
              if (D = [], S = d, i.charCodeAt(d) === 45 ? (U = Ba, d++) : (U = a, j(La)), U !== a) {
                if (M = [], Wr.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Vr)), F !== a)
                  for (; F !== a; )
                    M.push(F), Wr.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Vr));
                else
                  M = a;
                M !== a ? (ue = S, U = ji(E, M), S = U) : (d = S, S = a);
              } else
                d = S, S = a;
              for (; S !== a; )
                if (D.push(S), S = d, i.charCodeAt(d) === 45 ? (U = Ba, d++) : (U = a, j(La)), U !== a) {
                  if (M = [], Wr.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Vr)), F !== a)
                    for (; F !== a; )
                      M.push(F), Wr.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Vr));
                  else
                    M = a;
                  M !== a ? (ue = S, U = ji(E, M), S = U) : (d = S, S = a);
                } else
                  d = S, S = a;
              D !== a ? (ue = o, y = Jo(E, D), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function mc() {
          var o, y, E, D, S, U;
          if (o = d, y = d, E = d, Kr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Gr)), D === a && (D = null), D !== a) {
            if (S = [], Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(st)), U !== a)
              for (; U !== a; )
                S.push(U), Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(st));
            else
              S = a;
            S !== a ? (D = [D, S], E = D) : (d = E, E = a);
          } else
            d = E, E = a;
          return E !== a ? y = i.substring(y, d) : y = E, y !== a && (ue = o, y = Yo(y)), o = y, o;
        }
        function gc() {
          var o, y, E, D, S, U, M, F;
          if (o = d, y = d, E = d, Kr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Gr)), D === a && (D = null), D !== a) {
            for (S = [], Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(st)); U !== a; )
              S.push(U), Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(st));
            if (S !== a)
              if (i.charCodeAt(d) === 46 ? (U = m, d++) : (U = a, j(w)), U !== a) {
                if (M = [], Qe.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(st)), F !== a)
                  for (; F !== a; )
                    M.push(F), Qe.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(st));
                else
                  M = a;
                M !== a ? (D = [D, S, U, M], E = D) : (d = E, E = a);
              } else
                d = E, E = a;
            else
              d = E, E = a;
          } else
            d = E, E = a;
          return E !== a ? y = i.substring(y, d) : y = E, y !== a && (ue = o, y = Qo(y)), o = y, o;
        }
        function yc() {
          var o, y, E, D, S, U, M, F, he;
          if (o = d, y = d, E = d, Kr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Gr)), D === a && (D = null), D !== a) {
            if (S = d, U = [], Qe.test(i.charAt(d)) ? (M = i.charAt(d), d++) : (M = a, j(st)), M !== a)
              for (; M !== a; )
                U.push(M), Qe.test(i.charAt(d)) ? (M = i.charAt(d), d++) : (M = a, j(st));
            else
              U = a;
            if (U !== a)
              if (i.charCodeAt(d) === 46 ? (M = m, d++) : (M = a, j(w)), M !== a) {
                for (F = [], Qe.test(i.charAt(d)) ? (he = i.charAt(d), d++) : (he = a, j(st)); he !== a; )
                  F.push(he), Qe.test(i.charAt(d)) ? (he = i.charAt(d), d++) : (he = a, j(st));
                F !== a ? (he = qa(), he !== a ? (U = [U, M, F, he], S = U) : (d = S, S = a)) : (d = S, S = a);
              } else
                d = S, S = a;
            else
              d = S, S = a;
            if (S === a) {
              if (S = d, i.charCodeAt(d) === 46 ? (U = m, d++) : (U = a, j(w)), U !== a) {
                if (M = [], Qe.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(st)), F !== a)
                  for (; F !== a; )
                    M.push(F), Qe.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(st));
                else
                  M = a;
                M !== a ? (F = qa(), F !== a ? (U = [U, M, F], S = U) : (d = S, S = a)) : (d = S, S = a);
              } else
                d = S, S = a;
              if (S === a) {
                if (S = d, U = [], Qe.test(i.charAt(d)) ? (M = i.charAt(d), d++) : (M = a, j(st)), M !== a)
                  for (; M !== a; )
                    U.push(M), Qe.test(i.charAt(d)) ? (M = i.charAt(d), d++) : (M = a, j(st));
                else
                  U = a;
                U !== a ? (M = qa(), M !== a ? (U = [U, M], S = U) : (d = S, S = a)) : (d = S, S = a);
              }
            }
            S !== a ? (D = [D, S], E = D) : (d = E, E = a);
          } else
            d = E, E = a;
          return E !== a ? y = i.substring(y, d) : y = E, y !== a && (ue = o, y = Zo(y)), o = y, o;
        }
        function qa() {
          var o, y, E, D, S, U;
          if (o = d, y = d, eu.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, j(tu)), E !== a)
            if (Kr.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Gr)), D === a && (D = null), D !== a) {
              if (S = [], Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(st)), U !== a)
                for (; U !== a; )
                  S.push(U), Qe.test(i.charAt(d)) ? (U = i.charAt(d), d++) : (U = a, j(st));
              else
                S = a;
              S !== a ? (E = [E, D, S], y = E) : (d = y, y = a);
            } else
              d = y, y = a;
          else
            d = y, y = a;
          return y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function vc() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 34 ? (y = Xr, d++) : (y = a, j(jr)), y !== a) {
            for (E = [], zi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Ji)), D === a && (D = Je(), D === a && (D = Xe())); D !== a; )
              E.push(D), zi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Ji)), D === a && (D = Je(), D === a && (D = Xe()));
            E !== a ? (i.charCodeAt(d) === 34 ? (D = Xr, d++) : (D = a, j(jr)), D !== a ? (ue = o, y = A(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function wc() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 39 ? (y = zr, d++) : (y = a, j(Jr)), y !== a) {
            for (E = [], Yi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Qi)), D === a && (D = Je(), D === a && (D = Xe())); D !== a; )
              E.push(D), Yi.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Qi)), D === a && (D = Je(), D === a && (D = Xe()));
            E !== a ? (i.charCodeAt(d) === 39 ? (D = zr, d++) : (D = a, j(Jr)), D !== a ? (ue = o, y = A(E), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function Ec() {
          var o, y, E, D, S, U, M, F;
          if (o = d, i.substr(d, 3) === Yr ? (y = Yr, d += 3) : (y = a, j(Zi)), y !== a) {
            for (E = [], Ht.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Wt)), D === a && (D = Je(), D === a && (D = Xe())); D !== a; )
              E.push(D), Ht.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Wt)), D === a && (D = Je(), D === a && (D = Xe()));
            if (E !== a) {
              if (D = [], S = d, i.substr(d, 2) === Qr ? (U = Qr, d += 2) : (U = a, j(es)), U !== a) {
                if (M = [], Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                  for (; F !== a; )
                    M.push(F), Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe()));
                else
                  M = a;
                M !== a ? (ue = S, U = ts(E, M), S = U) : (d = S, S = a);
              } else
                d = S, S = a;
              if (S === a)
                if (S = d, i.charCodeAt(d) === 39 ? (U = zr, d++) : (U = a, j(Jr)), U !== a) {
                  if (M = [], Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                    for (; F !== a; )
                      M.push(F), Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe()));
                  else
                    M = a;
                  M !== a ? (ue = S, U = ns(E, M), S = U) : (d = S, S = a);
                } else
                  d = S, S = a;
              for (; S !== a; ) {
                if (D.push(S), S = d, i.substr(d, 2) === Qr ? (U = Qr, d += 2) : (U = a, j(es)), U !== a) {
                  if (M = [], Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                    for (; F !== a; )
                      M.push(F), Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe()));
                  else
                    M = a;
                  M !== a ? (ue = S, U = ts(E, M), S = U) : (d = S, S = a);
                } else
                  d = S, S = a;
                if (S === a)
                  if (S = d, i.charCodeAt(d) === 39 ? (U = zr, d++) : (U = a, j(Jr)), U !== a) {
                    if (M = [], Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                      for (; F !== a; )
                        M.push(F), Ht.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Wt)), F === a && (F = Je(), F === a && (F = Xe()));
                    else
                      M = a;
                    M !== a ? (ue = S, U = ns(E, M), S = U) : (d = S, S = a);
                  } else
                    d = S, S = a;
              }
              D !== a ? (i.substr(d, 3) === Yr ? (S = Yr, d += 3) : (S = a, j(Zi)), S !== a ? (ue = o, y = rs(E, D), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function Cc() {
          var o, y, E, D, S, U, M, F;
          if (o = d, i.substr(d, 3) === Zr ? (y = Zr, d += 3) : (y = a, j(as)), y !== a) {
            for (E = [], Vt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Kt)), D === a && (D = Je(), D === a && (D = Xe())); D !== a; )
              E.push(D), Vt.test(i.charAt(d)) ? (D = i.charAt(d), d++) : (D = a, j(Kt)), D === a && (D = Je(), D === a && (D = Xe()));
            if (E !== a) {
              if (D = [], S = d, i.substr(d, 2) === ea ? (U = ea, d += 2) : (U = a, j(is)), U !== a) {
                if (M = [], Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                  for (; F !== a; )
                    M.push(F), Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe()));
                else
                  M = a;
                M !== a ? (ue = S, U = ss(E, M), S = U) : (d = S, S = a);
              } else
                d = S, S = a;
              if (S === a)
                if (S = d, i.charCodeAt(d) === 34 ? (U = Xr, d++) : (U = a, j(jr)), U !== a) {
                  if (M = [], Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                    for (; F !== a; )
                      M.push(F), Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe()));
                  else
                    M = a;
                  M !== a ? (ue = S, U = ls(E, M), S = U) : (d = S, S = a);
                } else
                  d = S, S = a;
              for (; S !== a; ) {
                if (D.push(S), S = d, i.substr(d, 2) === ea ? (U = ea, d += 2) : (U = a, j(is)), U !== a) {
                  if (M = [], Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                    for (; F !== a; )
                      M.push(F), Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe()));
                  else
                    M = a;
                  M !== a ? (ue = S, U = ss(E, M), S = U) : (d = S, S = a);
                } else
                  d = S, S = a;
                if (S === a)
                  if (S = d, i.charCodeAt(d) === 34 ? (U = Xr, d++) : (U = a, j(jr)), U !== a) {
                    if (M = [], Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe())), F !== a)
                      for (; F !== a; )
                        M.push(F), Vt.test(i.charAt(d)) ? (F = i.charAt(d), d++) : (F = a, j(Kt)), F === a && (F = Je(), F === a && (F = Xe()));
                    else
                      M = a;
                    M !== a ? (ue = S, U = ls(E, M), S = U) : (d = S, S = a);
                  } else
                    d = S, S = a;
              }
              D !== a ? (i.substr(d, 3) === Zr ? (S = Zr, d += 3) : (S = a, j(as)), S !== a ? (ue = o, y = rs(E, D), o = y) : (d = o, o = a)) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function Xe() {
          var o, y, E, D, S, U, M, F, he, $e, Sn;
          return o = d, i.substr(d, 2) === os ? (y = os, d += 2) : (y = a, j(nu)), y !== a ? (E = d, D = Nt(), D !== a ? (S = Nt(), S !== a ? (U = Nt(), U !== a ? (M = Nt(), M !== a ? (F = Nt(), F !== a ? (he = Nt(), he !== a ? ($e = Nt(), $e !== a ? (Sn = Nt(), Sn !== a ? (D = [D, S, U, M, F, he, $e, Sn], E = D) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a), E !== a ? (ue = o, y = ru(E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a && (o = d, i.substr(d, 2) === us ? (y = us, d += 2) : (y = a, j(au)), y !== a ? (E = d, D = Nt(), D !== a ? (S = Nt(), S !== a ? (U = Nt(), U !== a ? (M = Nt(), M !== a ? (D = [D, S, U, M], E = D) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a)) : (d = E, E = a), E !== a ? (ue = o, y = iu(E), o = y) : (d = o, o = a)) : (d = o, o = a)), o;
        }
        function Je() {
          var o, y;
          return o = d, i.substr(d, 2) === cs ? (y = cs, d += 2) : (y = a, j(su)), y !== a && (ue = o, y = lu()), o = y, o === a && (o = d, i.substr(d, 2) === ds ? (y = ds, d += 2) : (y = a, j(ou)), y !== a && (ue = o, y = uu()), o = y, o === a && (o = d, i.substr(d, 2) === hs ? (y = hs, d += 2) : (y = a, j(cu)), y !== a && (ue = o, y = du()), o = y, o === a && (o = d, i.substr(d, 2) === fs ? (y = fs, d += 2) : (y = a, j(hu)), y !== a && (ue = o, y = fu()), o = y, o === a && (o = d, i.substr(d, 2) === ps ? (y = ps, d += 2) : (y = a, j(pu)), y !== a && (ue = o, y = mu()), o = y, o === a && (o = d, i.substr(d, 2) === ms ? (y = ms, d += 2) : (y = a, j(gu)), y !== a && (ue = o, y = yu()), o = y, o === a && (o = d, i.substr(d, 2) === gs ? (y = gs, d += 2) : (y = a, j(vu)), y !== a && (ue = o, y = wu()), o = y, o === a && (o = d, i.substr(d, 2) === ys ? (y = ys, d += 2) : (y = a, j(Eu)), y !== a && (ue = o, y = Cu()), o = y))))))), o;
        }
        function bc() {
          var o;
          return bu.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, j(Nu)), o;
        }
        function Nc() {
          var o, y, E, D;
          if (o = d, i.charCodeAt(d) === 91 ? (y = f, d++) : (y = a, j(g)), y !== a) {
            for (E = [], D = ce(); D !== a; )
              E.push(D), D = ce();
            E !== a ? (i.charCodeAt(d) === 93 ? (D = I, d++) : (D = a, j(W)), D !== a ? (ue = o, y = Au(), o = y) : (d = o, o = a)) : (d = o, o = a);
          } else
            d = o, o = a;
          return o;
        }
        function _s() {
          var o, y, E;
          return o = d, xu.test(i.charAt(d)) ? (y = i.charAt(d), d++) : (y = a, j(Tu)), y !== a ? (Du.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, j(_u)), E !== a ? (ue = o, y = Su(y, E), o = y) : (d = o, o = a)) : (d = o, o = a), o === a && (Iu.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, j(Fu))), o;
        }
        function Ha() {
          var o;
          return o = _s(), o === a && (i.charCodeAt(d) === 95 ? (o = Bu, d++) : (o = a, j(Lu))), o;
        }
        function ut() {
          var o;
          return o = Ha(), o === a && (i.charCodeAt(d) === 45 ? (o = Ba, d++) : (o = a, j(La)), o === a && (Qe.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, j(st)), o === a && (i.charCodeAt(d) === 183 ? (o = Ru, d++) : (o = a, j(Ou)), o === a && (ku.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, j(Uu)), o === a && (Pu.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, j(Mu))))))), o;
        }
        function Ss() {
          var o, y, E, D, S, U, M, F, he;
          if (o = d, y = d, E = _s(), E !== a) {
            for (D = [], S = ut(); S !== a; )
              D.push(S), S = ut();
            if (D !== a) {
              if (S = [], U = d, M = [], i.charCodeAt(d) === 46 ? (F = m, d++) : (F = a, j(w)), F !== a)
                for (; F !== a; )
                  M.push(F), i.charCodeAt(d) === 46 ? (F = m, d++) : (F = a, j(w));
              else
                M = a;
              if (M !== a) {
                if (F = [], he = ut(), he !== a)
                  for (; he !== a; )
                    F.push(he), he = ut();
                else
                  F = a;
                F !== a ? (M = [M, F], U = M) : (d = U, U = a);
              } else
                d = U, U = a;
              for (; U !== a; ) {
                if (S.push(U), U = d, M = [], i.charCodeAt(d) === 46 ? (F = m, d++) : (F = a, j(w)), F !== a)
                  for (; F !== a; )
                    M.push(F), i.charCodeAt(d) === 46 ? (F = m, d++) : (F = a, j(w));
                else
                  M = a;
                if (M !== a) {
                  if (F = [], he = ut(), he !== a)
                    for (; he !== a; )
                      F.push(he), he = ut();
                  else
                    F = a;
                  F !== a ? (M = [M, F], U = M) : (d = U, U = a);
                } else
                  d = U, U = a;
              }
              S !== a ? (E = [E, D, S], y = E) : (d = y, y = a);
            } else
              d = y, y = a;
          } else
            d = y, y = a;
          return y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function Ac() {
          var o, y, E, D, S, U, M, F;
          if (o = d, y = Ha(), y === a && (i.charCodeAt(d) === 58 ? (y = ft, d++) : (y = a, j(nt)), y === a && (Qe.test(i.charAt(d)) ? (y = i.charAt(d), d++) : (y = a, j(st)), y === a && (y = _n()))), y !== a) {
            for (E = [], D = ut(), D === a && (i.charCodeAt(d) === 58 ? (D = ft, d++) : (D = a, j(nt)), D === a && (D = _n())); D !== a; )
              E.push(D), D = ut(), D === a && (i.charCodeAt(d) === 58 ? (D = ft, d++) : (D = a, j(nt)), D === a && (D = _n()));
            if (E !== a) {
              if (D = [], S = d, U = [], i.charCodeAt(d) === 46 ? (M = m, d++) : (M = a, j(w)), M !== a)
                for (; M !== a; )
                  U.push(M), i.charCodeAt(d) === 46 ? (M = m, d++) : (M = a, j(w));
              else
                U = a;
              if (U !== a) {
                if (M = [], F = ut(), F === a && (i.charCodeAt(d) === 58 ? (F = ft, d++) : (F = a, j(nt)), F === a && (F = _n())), F !== a)
                  for (; F !== a; )
                    M.push(F), F = ut(), F === a && (i.charCodeAt(d) === 58 ? (F = ft, d++) : (F = a, j(nt)), F === a && (F = _n()));
                else
                  M = a;
                M !== a ? (ue = S, U = vs(y, E, U, M), S = U) : (d = S, S = a);
              } else
                d = S, S = a;
              for (; S !== a; ) {
                if (D.push(S), S = d, U = [], i.charCodeAt(d) === 46 ? (M = m, d++) : (M = a, j(w)), M !== a)
                  for (; M !== a; )
                    U.push(M), i.charCodeAt(d) === 46 ? (M = m, d++) : (M = a, j(w));
                else
                  U = a;
                if (U !== a) {
                  if (M = [], F = ut(), F === a && (i.charCodeAt(d) === 58 ? (F = ft, d++) : (F = a, j(nt)), F === a && (F = _n())), F !== a)
                    for (; F !== a; )
                      M.push(F), F = ut(), F === a && (i.charCodeAt(d) === 58 ? (F = ft, d++) : (F = a, j(nt)), F === a && (F = _n()));
                  else
                    M = a;
                  M !== a ? (ue = S, U = vs(y, E, U, M), S = U) : (d = S, S = a);
                } else
                  d = S, S = a;
              }
              D !== a ? (ue = o, y = $u(y, E, D), o = y) : (d = o, o = a);
            } else
              d = o, o = a;
          } else
            d = o, o = a;
          return o;
        }
        function _n() {
          var o;
          return o = xc(), o === a && (o = Tc()), o;
        }
        function xc() {
          var o, y, E, D, S;
          return o = d, y = d, i.charCodeAt(d) === 37 ? (E = qu, d++) : (E = a, j(Hu)), E !== a ? (D = Nt(), D !== a ? (S = Nt(), S !== a ? (E = [E, D, S], y = E) : (d = y, y = a)) : (d = y, y = a)) : (d = y, y = a), y !== a ? o = i.substring(o, d) : o = y, o;
        }
        function Nt() {
          var o;
          return Wu.test(i.charAt(d)) ? (o = i.charAt(d), d++) : (o = a, j(Vu)), o;
        }
        function Tc() {
          var o, y, E;
          return o = d, i.charCodeAt(d) === 92 ? (y = Ku, d++) : (y = a, j(Gu)), y !== a ? (Xu.test(i.charAt(d)) ? (E = i.charAt(d), d++) : (E = a, j(ju)), E !== a ? (ue = o, y = v(E), o = y) : (d = o, o = a)) : (d = o, o = a), o;
        }
        var Is = function(o) {
          return o.match(/^[a-z](.*?):(.+?)/g);
        };
        function Dc(o, y) {
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
            const E = Object.keys(Ue.data).find((S) => o.indexOf(S + ":") === 0);
            if (E !== void 0) {
              const S = Ue.data[E];
              if (S.length === 1 && y !== !0 && Is(S[0].uri)) return o;
              const U = S[S.length - 1].uri;
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
              E.uri === "http://www.w3.org/2001/XMLSchema#" && E.count < 1 || Is(E.uri) && (o["@context"] === void 0 && (o["@context"] = {}), o["@context"][y] = E.uri);
            }), o;
          }
        };
        function Wa(o, y) {
          if (o["@list"] === void 0 || !y && !o["@list"].find((S) => S["@list"] !== void 0)) return o;
          if (o["@list"].length === 0)
            return { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" };
          var E = {}, D = null;
          return o["@list"].forEach((S) => {
            D === null ? D = E : (D["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = {}, D = D["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"]), D["http://www.w3.org/1999/02/22-rdf-syntax-ns#first"] = Wa(S, !0), D["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = {
              "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
            };
          }), E;
        }
        if (na = u(), na !== a && d === i.length)
          return na;
        throw na !== a && d < i.length && j(zu()), Yu(
          Ra,
          Gt < i.length ? i.charAt(Gt) : null,
          Gt < i.length ? ka(Gt, Gt + 1) : ka(Gt, Gt)
        );
      }
      return {
        SyntaxError: t,
        parse: r
      };
    });
  })(ga)), ga.exports;
}
var Gc = Kc(), Ka, Us;
function Xc() {
  if (Us) return Ka;
  Us = 1;
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
  return Ka = e, Ka;
}
var jc = Xc();
const Ps = /* @__PURE__ */ kl(jc);
var Er = {}, fn = {}, Fn = {}, Ms;
function _a() {
  if (Ms) return Fn;
  Ms = 1;
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
  return Fn.assign = t, Fn.find = n, Fn.freeze = e, Fn.MIME_TYPE = r, Fn.NAMESPACE = i, Fn;
}
var $s;
function Ul() {
  if ($s) return fn;
  $s = 1;
  var n = _a(), e = n.find, t = n.NAMESPACE;
  function r(b) {
    return b !== "";
  }
  function i(b) {
    return b ? b.split(/[\t\n\f\r ]+/).filter(r) : [];
  }
  function s(b, x) {
    return b.hasOwnProperty(x) || (b[x] = !0), b;
  }
  function a(b) {
    if (!b) return [];
    var x = i(b);
    return Object.keys(x.reduce(s, {}));
  }
  function l(b) {
    return function(x) {
      return b && b.indexOf(x) !== -1;
    };
  }
  function u(b, x) {
    for (var k in b)
      Object.prototype.hasOwnProperty.call(b, k) && (x[k] = b[k]);
  }
  function c(b, x) {
    var k = b.prototype;
    if (!(k instanceof x)) {
      let J = function() {
      };
      J.prototype = x.prototype, J = new J(), u(k, J), b.prototype = k = J;
    }
    k.constructor != b && (typeof b != "function" && console.error("unknown Class:" + b), k.constructor = b);
  }
  var h = {}, p = h.ELEMENT_NODE = 1, m = h.ATTRIBUTE_NODE = 2, w = h.TEXT_NODE = 3, v = h.CDATA_SECTION_NODE = 4, C = h.ENTITY_REFERENCE_NODE = 5, T = h.ENTITY_NODE = 6, B = h.PROCESSING_INSTRUCTION_NODE = 7, O = h.COMMENT_NODE = 8, X = h.DOCUMENT_NODE = 9, Y = h.DOCUMENT_TYPE_NODE = 10, A = h.DOCUMENT_FRAGMENT_NODE = 11, K = h.NOTATION_NODE = 12, P = {}, G = {};
  P.INDEX_SIZE_ERR = (G[1] = "Index size error", 1), P.DOMSTRING_SIZE_ERR = (G[2] = "DOMString size error", 2);
  var R = P.HIERARCHY_REQUEST_ERR = (G[3] = "Hierarchy request error", 3);
  P.WRONG_DOCUMENT_ERR = (G[4] = "Wrong document", 4), P.INVALID_CHARACTER_ERR = (G[5] = "Invalid character", 5), P.NO_DATA_ALLOWED_ERR = (G[6] = "No data allowed", 6), P.NO_MODIFICATION_ALLOWED_ERR = (G[7] = "No modification allowed", 7);
  var H = P.NOT_FOUND_ERR = (G[8] = "Not found", 8);
  P.NOT_SUPPORTED_ERR = (G[9] = "Not supported", 9);
  var $ = P.INUSE_ATTRIBUTE_ERR = (G[10] = "Attribute in use", 10);
  P.INVALID_STATE_ERR = (G[11] = "Invalid state", 11), P.SYNTAX_ERR = (G[12] = "Syntax error", 12), P.INVALID_MODIFICATION_ERR = (G[13] = "Invalid modification", 13), P.NAMESPACE_ERR = (G[14] = "Invalid namespace", 14), P.INVALID_ACCESS_ERR = (G[15] = "Invalid access", 15);
  function q(b, x) {
    if (x instanceof Error)
      var k = x;
    else
      k = this, Error.call(this, G[b]), this.message = G[b], Error.captureStackTrace && Error.captureStackTrace(this, q);
    return k.code = b, x && (this.message = this.message + ": " + x), k;
  }
  q.prototype = Error.prototype, u(P, q);
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
    item: function(b) {
      return b >= 0 && b < this.length ? this[b] : null;
    },
    toString: function(b, x) {
      for (var k = [], J = 0; J < this.length; J++)
        Be(this[J], k, b, x);
      return k.join("");
    },
    /**
     * @private
     * @param {function (Node):boolean} predicate
     * @returns {Node[]}
     */
    filter: function(b) {
      return Array.prototype.filter.call(this, b);
    },
    /**
     * @private
     * @param {Node} item
     * @returns {number}
     */
    indexOf: function(b) {
      return Array.prototype.indexOf.call(this, b);
    }
  };
  function Q(b, x) {
    this._node = b, this._refresh = x, _(this);
  }
  function _(b) {
    var x = b._node._inc || b._node.ownerDocument._inc;
    if (b._inc !== x) {
      var k = b._refresh(b._node);
      if (gr(b, "length", k.length), !b.$$length || k.length < b.$$length)
        for (var J = k.length; J in b; J++)
          Object.prototype.hasOwnProperty.call(b, J) && delete b[J];
      u(k, b), b._inc = x;
    }
  }
  Q.prototype.item = function(b) {
    return _(this), this[b] || null;
  }, c(Q, ee);
  function V() {
  }
  function Z(b, x) {
    for (var k = b.length; k--; )
      if (b[k] === x)
        return k;
  }
  function ae(b, x, k, J) {
    if (J ? x[Z(x, J)] = k : x[x.length++] = k, b) {
      k.ownerElement = b;
      var le = b.ownerDocument;
      le && (J && Pe(le, b, J), Ce(le, b, k));
    }
  }
  function ie(b, x, k) {
    var J = Z(x, k);
    if (J >= 0) {
      for (var le = x.length - 1; J < le; )
        x[J] = x[++J];
      if (x.length = le, b) {
        var Ee = b.ownerDocument;
        Ee && (Pe(Ee, b, k), k.ownerElement = null);
      }
    } else
      throw new q(H, new Error(b.tagName + "@" + k));
  }
  V.prototype = {
    length: 0,
    item: ee.prototype.item,
    getNamedItem: function(b) {
      for (var x = this.length; x--; ) {
        var k = this[x];
        if (k.nodeName == b)
          return k;
      }
    },
    setNamedItem: function(b) {
      var x = b.ownerElement;
      if (x && x != this._ownerElement)
        throw new q($);
      var k = this.getNamedItem(b.nodeName);
      return ae(this._ownerElement, this, b, k), k;
    },
    /* returns Node */
    setNamedItemNS: function(b) {
      var x = b.ownerElement, k;
      if (x && x != this._ownerElement)
        throw new q($);
      return k = this.getNamedItemNS(b.namespaceURI, b.localName), ae(this._ownerElement, this, b, k), k;
    },
    /* returns Node */
    removeNamedItem: function(b) {
      var x = this.getNamedItem(b);
      return ie(this._ownerElement, this, x), x;
    },
    // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
    //for level2
    removeNamedItemNS: function(b, x) {
      var k = this.getNamedItemNS(b, x);
      return ie(this._ownerElement, this, k), k;
    },
    getNamedItemNS: function(b, x) {
      for (var k = this.length; k--; ) {
        var J = this[k];
        if (J.localName == x && J.namespaceURI == b)
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
    hasFeature: function(b, x) {
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
    createDocument: function(b, x, k) {
      var J = new pe();
      if (J.implementation = this, J.childNodes = new ee(), J.doctype = k || null, k && J.appendChild(k), x) {
        var le = J.createElementNS(b, x);
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
    createDocumentType: function(b, x, k) {
      var J = new f();
      return J.name = b, J.nodeName = b, J.publicId = x || "", J.systemId = k || "", J;
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
    insertBefore: function(b, x) {
      return lt(this, b, x);
    },
    replaceChild: function(b, x) {
      lt(this, b, x, Ie), x && this.removeChild(x);
    },
    removeChild: function(b) {
      return Te(this, b);
    },
    appendChild: function(b) {
      return this.insertBefore(b, null);
    },
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    cloneNode: function(b) {
      return mr(this.ownerDocument || this, this, b);
    },
    // Modified in DOM Level 2:
    normalize: function() {
      for (var b = this.firstChild; b; ) {
        var x = b.nextSibling;
        x && x.nodeType == w && b.nodeType == w ? (this.removeChild(x), b.appendData(x.data)) : (b.normalize(), b = x);
      }
    },
    // Introduced in DOM Level 2:
    isSupported: function(b, x) {
      return this.ownerDocument.implementation.hasFeature(b, x);
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
    lookupPrefix: function(b) {
      for (var x = this; x; ) {
        var k = x._nsMap;
        if (k) {
          for (var J in k)
            if (Object.prototype.hasOwnProperty.call(k, J) && k[J] === b)
              return J;
        }
        x = x.nodeType == m ? x.ownerDocument : x.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function(b) {
      for (var x = this; x; ) {
        var k = x._nsMap;
        if (k && Object.prototype.hasOwnProperty.call(k, b))
          return k[b];
        x = x.nodeType == m ? x.ownerDocument : x.parentNode;
      }
      return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function(b) {
      var x = this.lookupPrefix(b);
      return x == null;
    }
  };
  function ge(b) {
    return b == "<" && "&lt;" || b == ">" && "&gt;" || b == "&" && "&amp;" || b == '"' && "&quot;" || "&#" + b.charCodeAt() + ";";
  }
  u(h, ne), u(h, ne.prototype);
  function Le(b, x) {
    if (x(b))
      return !0;
    if (b = b.firstChild)
      do
        if (Le(b, x))
          return !0;
      while (b = b.nextSibling);
  }
  function pe() {
    this.ownerDocument = this;
  }
  function Ce(b, x, k) {
    b && b._inc++;
    var J = k.namespaceURI;
    J === t.XMLNS && (x._nsMap[k.prefix ? k.localName : ""] = k.value);
  }
  function Pe(b, x, k, J) {
    b && b._inc++;
    var le = k.namespaceURI;
    le === t.XMLNS && delete x._nsMap[k.prefix ? k.localName : ""];
  }
  function Ye(b, x, k) {
    if (b && b._inc) {
      b._inc++;
      var J = x.childNodes;
      if (k)
        J[J.length++] = k;
      else {
        for (var le = x.firstChild, Ee = 0; le; )
          J[Ee++] = le, le = le.nextSibling;
        J.length = Ee, delete J[J.length];
      }
    }
  }
  function Te(b, x) {
    var k = x.previousSibling, J = x.nextSibling;
    return k ? k.nextSibling = J : b.firstChild = J, J ? J.previousSibling = k : b.lastChild = k, x.parentNode = null, x.previousSibling = null, x.nextSibling = null, Ye(b.ownerDocument, b), x;
  }
  function qe(b) {
    return b && (b.nodeType === ne.DOCUMENT_NODE || b.nodeType === ne.DOCUMENT_FRAGMENT_NODE || b.nodeType === ne.ELEMENT_NODE);
  }
  function ht(b) {
    return b && (De(b) || Re(b) || it(b) || b.nodeType === ne.DOCUMENT_FRAGMENT_NODE || b.nodeType === ne.COMMENT_NODE || b.nodeType === ne.PROCESSING_INSTRUCTION_NODE);
  }
  function it(b) {
    return b && b.nodeType === ne.DOCUMENT_TYPE_NODE;
  }
  function De(b) {
    return b && b.nodeType === ne.ELEMENT_NODE;
  }
  function Re(b) {
    return b && b.nodeType === ne.TEXT_NODE;
  }
  function _e(b, x) {
    var k = b.childNodes || [];
    if (e(k, De) || it(x))
      return !1;
    var J = e(k, it);
    return !(x && J && k.indexOf(J) > k.indexOf(x));
  }
  function Et(b, x) {
    var k = b.childNodes || [];
    function J(Ee) {
      return De(Ee) && Ee !== x;
    }
    if (e(k, J))
      return !1;
    var le = e(k, it);
    return !(x && le && k.indexOf(le) > k.indexOf(x));
  }
  function Ve(b, x, k) {
    if (!qe(b))
      throw new q(R, "Unexpected parent node type " + b.nodeType);
    if (k && k.parentNode !== b)
      throw new q(H, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !ht(x) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      it(x) && b.nodeType !== ne.DOCUMENT_NODE
    )
      throw new q(
        R,
        "Unexpected node type " + x.nodeType + " for parent node type " + b.nodeType
      );
  }
  function se(b, x, k) {
    var J = b.childNodes || [], le = x.childNodes || [];
    if (x.nodeType === ne.DOCUMENT_FRAGMENT_NODE) {
      var Ee = le.filter(De);
      if (Ee.length > 1 || e(le, Re))
        throw new q(R, "More than one element or text in fragment");
      if (Ee.length === 1 && !_e(b, k))
        throw new q(R, "Element in fragment can not be inserted before doctype");
    }
    if (De(x) && !_e(b, k))
      throw new q(R, "Only one element can be added and only after doctype");
    if (it(x)) {
      if (e(J, it))
        throw new q(R, "Only one doctype is allowed");
      var Ge = e(J, De);
      if (k && J.indexOf(Ge) < J.indexOf(k))
        throw new q(R, "Doctype can only be inserted before an element");
      if (!k && Ge)
        throw new q(R, "Doctype can not be appended since element is present");
    }
  }
  function Ie(b, x, k) {
    var J = b.childNodes || [], le = x.childNodes || [];
    if (x.nodeType === ne.DOCUMENT_FRAGMENT_NODE) {
      var Ee = le.filter(De);
      if (Ee.length > 1 || e(le, Re))
        throw new q(R, "More than one element or text in fragment");
      if (Ee.length === 1 && !Et(b, k))
        throw new q(R, "Element in fragment can not be inserted before doctype");
    }
    if (De(x) && !Et(b, k))
      throw new q(R, "Only one element can be added and only after doctype");
    if (it(x)) {
      if (e(J, function(bt) {
        return it(bt) && bt !== k;
      }))
        throw new q(R, "Only one doctype is allowed");
      var Ge = e(J, De);
      if (k && J.indexOf(Ge) < J.indexOf(k))
        throw new q(R, "Doctype can only be inserted before an element");
    }
  }
  function lt(b, x, k, J) {
    Ve(b, x, k), b.nodeType === ne.DOCUMENT_NODE && (J || se)(b, x, k);
    var le = x.parentNode;
    if (le && le.removeChild(x), x.nodeType === A) {
      var Ee = x.firstChild;
      if (Ee == null)
        return x;
      var Ge = x.lastChild;
    } else
      Ee = Ge = x;
    var mt = k ? k.previousSibling : b.lastChild;
    Ee.previousSibling = mt, Ge.nextSibling = k, mt ? mt.nextSibling = Ee : b.firstChild = Ee, k == null ? b.lastChild = Ge : k.previousSibling = Ge;
    do {
      Ee.parentNode = b;
      var bt = b.ownerDocument || b;
      _t(Ee, bt);
    } while (Ee !== Ge && (Ee = Ee.nextSibling));
    return Ye(b.ownerDocument || b, b), x.nodeType == A && (x.firstChild = x.lastChild = null), x;
  }
  function _t(b, x) {
    if (b.ownerDocument !== x) {
      if (b.ownerDocument = x, b.nodeType === p && b.attributes)
        for (var k = 0; k < b.attributes.length; k++) {
          var J = b.attributes.item(k);
          J && (J.ownerDocument = x);
        }
      for (var le = b.firstChild; le; )
        _t(le, x), le = le.nextSibling;
    }
  }
  function ke(b, x) {
    x.parentNode && x.parentNode.removeChild(x), x.parentNode = b, x.previousSibling = b.lastChild, x.nextSibling = null, x.previousSibling ? x.previousSibling.nextSibling = x : b.firstChild = x, b.lastChild = x, Ye(b.ownerDocument, b, x);
    var k = b.ownerDocument || b;
    return _t(x, k), x;
  }
  pe.prototype = {
    //implementation : null,
    nodeName: "#document",
    nodeType: X,
    /**
     * The DocumentType node of the document.
     *
     * @readonly
     * @type DocumentType
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(b, x) {
      if (b.nodeType == A) {
        for (var k = b.firstChild; k; ) {
          var J = k.nextSibling;
          this.insertBefore(k, x), k = J;
        }
        return b;
      }
      return lt(this, b, x), _t(b, this), this.documentElement === null && b.nodeType === p && (this.documentElement = b), b;
    },
    removeChild: function(b) {
      return this.documentElement == b && (this.documentElement = null), Te(this, b);
    },
    replaceChild: function(b, x) {
      lt(this, b, x, Ie), _t(b, this), x && this.removeChild(x), De(b) && (this.documentElement = b);
    },
    // Introduced in DOM Level 2:
    importNode: function(b, x) {
      return Hr(this, b, x);
    },
    // Introduced in DOM Level 2:
    getElementById: function(b) {
      var x = null;
      return Le(this.documentElement, function(k) {
        if (k.nodeType == p && k.getAttribute("id") == b)
          return x = k, !0;
      }), x;
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
    getElementsByClassName: function(b) {
      var x = a(b);
      return new Q(this, function(k) {
        var J = [];
        return x.length > 0 && Le(k.documentElement, function(le) {
          if (le !== k && le.nodeType === p) {
            var Ee = le.getAttribute("class");
            if (Ee) {
              var Ge = b === Ee;
              if (!Ge) {
                var mt = a(Ee);
                Ge = x.every(l(mt));
              }
              Ge && J.push(le);
            }
          }
        }), J;
      });
    },
    //document factory method:
    createElement: function(b) {
      var x = new Oe();
      x.ownerDocument = this, x.nodeName = b, x.tagName = b, x.localName = b, x.childNodes = new ee();
      var k = x.attributes = new V();
      return k._ownerElement = x, x;
    },
    createDocumentFragment: function() {
      var b = new z();
      return b.ownerDocument = this, b.childNodes = new ee(), b;
    },
    createTextNode: function(b) {
      var x = new Ct();
      return x.ownerDocument = this, x.appendData(b), x;
    },
    createComment: function(b) {
      var x = new Tn();
      return x.ownerDocument = this, x.appendData(b), x;
    },
    createCDATASection: function(b) {
      var x = new N();
      return x.ownerDocument = this, x.appendData(b), x;
    },
    createProcessingInstruction: function(b, x) {
      var k = new te();
      return k.ownerDocument = this, k.tagName = k.nodeName = k.target = b, k.nodeValue = k.data = x, k;
    },
    createAttribute: function(b) {
      var x = new It();
      return x.ownerDocument = this, x.name = b, x.nodeName = b, x.localName = b, x.specified = !0, x;
    },
    createEntityReference: function(b) {
      var x = new W();
      return x.ownerDocument = this, x.nodeName = b, x;
    },
    // Introduced in DOM Level 2:
    createElementNS: function(b, x) {
      var k = new Oe(), J = x.split(":"), le = k.attributes = new V();
      return k.childNodes = new ee(), k.ownerDocument = this, k.nodeName = x, k.tagName = x, k.namespaceURI = b, J.length == 2 ? (k.prefix = J[0], k.localName = J[1]) : k.localName = x, le._ownerElement = k, k;
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function(b, x) {
      var k = new It(), J = x.split(":");
      return k.ownerDocument = this, k.nodeName = x, k.name = x, k.namespaceURI = b, k.specified = !0, J.length == 2 ? (k.prefix = J[0], k.localName = J[1]) : k.localName = x, k;
    }
  }, c(pe, ne);
  function Oe() {
    this._nsMap = {};
  }
  Oe.prototype = {
    nodeType: p,
    hasAttribute: function(b) {
      return this.getAttributeNode(b) != null;
    },
    getAttribute: function(b) {
      var x = this.getAttributeNode(b);
      return x && x.value || "";
    },
    getAttributeNode: function(b) {
      return this.attributes.getNamedItem(b);
    },
    setAttribute: function(b, x) {
      var k = this.ownerDocument.createAttribute(b);
      k.value = k.nodeValue = "" + x, this.setAttributeNode(k);
    },
    removeAttribute: function(b) {
      var x = this.getAttributeNode(b);
      x && this.removeAttributeNode(x);
    },
    //four real opeartion method
    appendChild: function(b) {
      return b.nodeType === A ? this.insertBefore(b, null) : ke(this, b);
    },
    setAttributeNode: function(b) {
      return this.attributes.setNamedItem(b);
    },
    setAttributeNodeNS: function(b) {
      return this.attributes.setNamedItemNS(b);
    },
    removeAttributeNode: function(b) {
      return this.attributes.removeNamedItem(b.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(b, x) {
      var k = this.getAttributeNodeNS(b, x);
      k && this.removeAttributeNode(k);
    },
    hasAttributeNS: function(b, x) {
      return this.getAttributeNodeNS(b, x) != null;
    },
    getAttributeNS: function(b, x) {
      var k = this.getAttributeNodeNS(b, x);
      return k && k.value || "";
    },
    setAttributeNS: function(b, x, k) {
      var J = this.ownerDocument.createAttributeNS(b, x);
      J.value = J.nodeValue = "" + k, this.setAttributeNode(J);
    },
    getAttributeNodeNS: function(b, x) {
      return this.attributes.getNamedItemNS(b, x);
    },
    getElementsByTagName: function(b) {
      return new Q(this, function(x) {
        var k = [];
        return Le(x, function(J) {
          J !== x && J.nodeType == p && (b === "*" || J.tagName == b) && k.push(J);
        }), k;
      });
    },
    getElementsByTagNameNS: function(b, x) {
      return new Q(this, function(k) {
        var J = [];
        return Le(k, function(le) {
          le !== k && le.nodeType === p && (b === "*" || le.namespaceURI === b) && (x === "*" || le.localName == x) && J.push(le);
        }), J;
      });
    }
  }, pe.prototype.getElementsByTagName = Oe.prototype.getElementsByTagName, pe.prototype.getElementsByTagNameNS = Oe.prototype.getElementsByTagNameNS, c(Oe, ne);
  function It() {
  }
  It.prototype.nodeType = m, c(It, ne);
  function on() {
  }
  on.prototype = {
    data: "",
    substringData: function(b, x) {
      return this.data.substring(b, b + x);
    },
    appendData: function(b) {
      b = this.data + b, this.nodeValue = this.data = b, this.length = b.length;
    },
    insertData: function(b, x) {
      this.replaceData(b, 0, x);
    },
    appendChild: function(b) {
      throw new Error(G[R]);
    },
    deleteData: function(b, x) {
      this.replaceData(b, x, "");
    },
    replaceData: function(b, x, k) {
      var J = this.data.substring(0, b), le = this.data.substring(b + x);
      k = J + k + le, this.nodeValue = this.data = k, this.length = k.length;
    }
  }, c(on, ne);
  function Ct() {
  }
  Ct.prototype = {
    nodeName: "#text",
    nodeType: w,
    splitText: function(b) {
      var x = this.data, k = x.substring(b);
      x = x.substring(0, b), this.data = this.nodeValue = x, this.length = x.length;
      var J = this.ownerDocument.createTextNode(k);
      return this.parentNode && this.parentNode.insertBefore(J, this.nextSibling), J;
    }
  }, c(Ct, on);
  function Tn() {
  }
  Tn.prototype = {
    nodeName: "#comment",
    nodeType: O
  }, c(Tn, on);
  function N() {
  }
  N.prototype = {
    nodeName: "#cdata-section",
    nodeType: v
  }, c(N, on);
  function f() {
  }
  f.prototype.nodeType = Y, c(f, ne);
  function g() {
  }
  g.prototype.nodeType = K, c(g, ne);
  function I() {
  }
  I.prototype.nodeType = T, c(I, ne);
  function W() {
  }
  W.prototype.nodeType = C, c(W, ne);
  function z() {
  }
  z.prototype.nodeName = "#document-fragment", z.prototype.nodeType = A, c(z, ne);
  function te() {
  }
  te.prototype.nodeType = B, c(te, ne);
  function Ae() {
  }
  Ae.prototype.serializeToString = function(b, x, k) {
    return Ke.call(b, x, k);
  }, ne.prototype.toString = Ke;
  function Ke(b, x) {
    var k = [], J = this.nodeType == 9 && this.documentElement || this, le = J.prefix, Ee = J.namespaceURI;
    if (Ee && le == null) {
      var le = J.lookupPrefix(Ee);
      if (le == null)
        var Ge = [
          { namespace: Ee, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return Be(this, k, b, x, Ge), k.join("");
  }
  function Me(b, x, k) {
    var J = b.prefix || "", le = b.namespaceURI;
    if (!le || J === "xml" && le === t.XML || le === t.XMLNS)
      return !1;
    for (var Ee = k.length; Ee--; ) {
      var Ge = k[Ee];
      if (Ge.prefix === J)
        return Ge.namespace !== le;
    }
    return !0;
  }
  function He(b, x, k) {
    b.push(" ", x, '="', k.replace(/[<>&"\t\n\r]/g, ge), '"');
  }
  function Be(b, x, k, J, le) {
    if (le || (le = []), J)
      if (b = J(b), b) {
        if (typeof b == "string") {
          x.push(b);
          return;
        }
      } else
        return;
    switch (b.nodeType) {
      case p:
        var Ee = b.attributes, Ge = Ee.length, ot = b.firstChild, mt = b.tagName;
        k = t.isHTML(b.namespaceURI) || k;
        var bt = mt;
        if (!k && !b.prefix && b.namespaceURI) {
          for (var Ot, kt = 0; kt < Ee.length; kt++)
            if (Ee.item(kt).name === "xmlns") {
              Ot = Ee.item(kt).value;
              break;
            }
          if (!Ot)
            for (var un = le.length - 1; un >= 0; un--) {
              var cn = le[un];
              if (cn.prefix === "" && cn.namespace === b.namespaceURI) {
                Ot = cn.namespace;
                break;
              }
            }
          if (Ot !== b.namespaceURI)
            for (var un = le.length - 1; un >= 0; un--) {
              var cn = le[un];
              if (cn.namespace === b.namespaceURI) {
                cn.prefix && (bt = cn.prefix + ":" + mt);
                break;
              }
            }
        }
        x.push("<", bt);
        for (var ft = 0; ft < Ge; ft++) {
          var nt = Ee.item(ft);
          nt.prefix == "xmlns" ? le.push({ prefix: nt.localName, namespace: nt.value }) : nt.nodeName == "xmlns" && le.push({ prefix: "", namespace: nt.value });
        }
        for (var ft = 0; ft < Ge; ft++) {
          var nt = Ee.item(ft);
          if (Me(nt, k, le)) {
            var dn = nt.prefix || "", Dn = nt.namespaceURI;
            He(x, dn ? "xmlns:" + dn : "xmlns", Dn), le.push({ prefix: dn, namespace: Dn });
          }
          Be(nt, x, k, J, le);
        }
        if (mt === bt && Me(b, k, le)) {
          var dn = b.prefix || "", Dn = b.namespaceURI;
          He(x, dn ? "xmlns:" + dn : "xmlns", Dn), le.push({ prefix: dn, namespace: Dn });
        }
        if (ot || k && !/^(?:meta|link|img|br|hr|input)$/i.test(mt)) {
          if (x.push(">"), k && /^script$/i.test(mt))
            for (; ot; )
              ot.data ? x.push(ot.data) : Be(ot, x, k, J, le.slice()), ot = ot.nextSibling;
          else
            for (; ot; )
              Be(ot, x, k, J, le.slice()), ot = ot.nextSibling;
          x.push("</", bt, ">");
        } else
          x.push("/>");
        return;
      case X:
      case A:
        for (var ot = b.firstChild; ot; )
          Be(ot, x, k, J, le.slice()), ot = ot.nextSibling;
        return;
      case m:
        return He(x, b.name, b.value);
      case w:
        return x.push(
          b.data.replace(/[<&>]/g, ge)
        );
      case v:
        return x.push("<![CDATA[", b.data, "]]>");
      case O:
        return x.push("<!--", b.data, "-->");
      case Y:
        var yr = b.publicId, vn = b.systemId;
        if (x.push("<!DOCTYPE ", b.name), yr)
          x.push(" PUBLIC ", yr), vn && vn != "." && x.push(" ", vn), x.push(">");
        else if (vn && vn != ".")
          x.push(" SYSTEM ", vn, ">");
        else {
          var Qe = b.internalSubset;
          Qe && x.push(" [", Qe, "]"), x.push(">");
        }
        return;
      case B:
        return x.push("<?", b.target, " ", b.data, "?>");
      case C:
        return x.push("&", b.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        x.push("??", b.nodeName);
    }
  }
  function Hr(b, x, k) {
    var J;
    switch (x.nodeType) {
      case p:
        J = x.cloneNode(!1), J.ownerDocument = b;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case A:
        break;
      case m:
        k = !0;
        break;
    }
    if (J || (J = x.cloneNode(!1)), J.ownerDocument = b, J.parentNode = null, k)
      for (var le = x.firstChild; le; )
        J.appendChild(Hr(b, le, k)), le = le.nextSibling;
    return J;
  }
  function mr(b, x, k) {
    var J = new x.constructor();
    for (var le in x)
      if (Object.prototype.hasOwnProperty.call(x, le)) {
        var Ee = x[le];
        typeof Ee != "object" && Ee != J[le] && (J[le] = Ee);
      }
    switch (x.childNodes && (J.childNodes = new ee()), J.ownerDocument = b, J.nodeType) {
      case p:
        var Ge = x.attributes, mt = J.attributes = new V(), bt = Ge.length;
        mt._ownerElement = J;
        for (var Ot = 0; Ot < bt; Ot++)
          J.setAttributeNode(mr(b, Ge.item(Ot), !0));
        break;
      case m:
        k = !0;
    }
    if (k)
      for (var kt = x.firstChild; kt; )
        J.appendChild(mr(b, kt, k)), kt = kt.nextSibling;
    return J;
  }
  function gr(b, x, k) {
    b[x] = k;
  }
  try {
    if (Object.defineProperty) {
      let b = function(x) {
        switch (x.nodeType) {
          case p:
          case A:
            var k = [];
            for (x = x.firstChild; x; )
              x.nodeType !== 7 && x.nodeType !== 8 && k.push(b(x)), x = x.nextSibling;
            return k.join("");
          default:
            return x.nodeValue;
        }
      };
      Object.defineProperty(Q.prototype, "length", {
        get: function() {
          return _(this), this.$$length;
        }
      }), Object.defineProperty(ne.prototype, "textContent", {
        get: function() {
          return b(this);
        },
        set: function(x) {
          switch (this.nodeType) {
            case p:
            case A:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (x || String(x)) && this.appendChild(this.ownerDocument.createTextNode(x));
              break;
            default:
              this.data = x, this.value = x, this.nodeValue = x;
          }
        }
      }), gr = function(x, k, J) {
        x["$$" + k] = J;
      };
    }
  } catch {
  }
  return fn.DocumentType = f, fn.DOMException = q, fn.DOMImplementation = oe, fn.Element = Oe, fn.Node = ne, fn.NodeList = ee, fn.XMLSerializer = Ae, fn;
}
var Cr = {}, Ga = {}, qs;
function zc() {
  return qs || (qs = 1, (function(n) {
    var e = _a().freeze;
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
  })(Ga)), Ga;
}
var ia = {}, Hs;
function Jc() {
  if (Hs) return ia;
  Hs = 1;
  var n = _a().NAMESPACE, e = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, t = new RegExp("[\\-\\.0-9" + e.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), r = new RegExp("^" + e.source + t.source + "*(?::" + e.source + t.source + "*)?$"), i = 0, s = 1, a = 2, l = 3, u = 4, c = 5, h = 6, p = 7;
  function m(R, H) {
    this.message = R, this.locator = H, Error.captureStackTrace && Error.captureStackTrace(this, m);
  }
  m.prototype = new Error(), m.prototype.name = m.name;
  function w() {
  }
  w.prototype = {
    parse: function(R, H, $) {
      var q = this.domBuilder;
      q.startDocument(), Y(H, H = {}), v(
        R,
        H,
        $,
        q,
        this.errorHandler
      ), q.endDocument();
    }
  };
  function v(R, H, $, q, ee) {
    function Q(ke) {
      if (ke > 65535) {
        ke -= 65536;
        var Oe = 55296 + (ke >> 10), It = 56320 + (ke & 1023);
        return String.fromCharCode(Oe, It);
      } else
        return String.fromCharCode(ke);
    }
    function _(ke) {
      var Oe = ke.slice(1, -1);
      return Object.hasOwnProperty.call($, Oe) ? $[Oe] : Oe.charAt(0) === "#" ? Q(parseInt(Oe.substr(1).replace("x", "0x"))) : (ee.error("entity not found:" + ke), ke);
    }
    function V(ke) {
      if (ke > pe) {
        var Oe = R.substring(pe, ke).replace(/&#?\w+;/g, _);
        ne && Z(pe), q.characters(Oe, 0, ke - pe), pe = ke;
      }
    }
    function Z(ke, Oe) {
      for (; ke >= ie && (Oe = oe.exec(R)); )
        ae = Oe.index, ie = ae + Oe[0].length, ne.lineNumber++;
      ne.columnNumber = ke - ae + 1;
    }
    for (var ae = 0, ie = 0, oe = /.*(?:\r\n?|\n)|.*$/g, ne = q.locator, ge = [{ currentNSMap: H }], Le = {}, pe = 0; ; ) {
      try {
        var Ce = R.indexOf("<", pe);
        if (Ce < 0) {
          if (!R.substr(pe).match(/^\s*$/)) {
            var Pe = q.doc, Ye = Pe.createTextNode(R.substr(pe));
            Pe.appendChild(Ye), q.currentElement = Ye;
          }
          return;
        }
        switch (Ce > pe && V(Ce), R.charAt(Ce + 1)) {
          case "/":
            var Ve = R.indexOf(">", Ce + 3), Te = R.substring(Ce + 2, Ve).replace(/[ \t\n\r]+$/g, ""), qe = ge.pop();
            Ve < 0 ? (Te = R.substring(Ce + 2).replace(/[\s<].*/, ""), ee.error("end tag name: " + Te + " is not complete:" + qe.tagName), Ve = Ce + 1 + Te.length) : Te.match(/\s</) && (Te = Te.replace(/[\s<].*/, ""), ee.error("end tag name: " + Te + " maybe not complete"), Ve = Ce + 1 + Te.length);
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
            ne && Z(Ce), Ve = K(R, Ce, q);
            break;
          case "!":
            ne && Z(Ce), Ve = A(R, Ce, q, ee);
            break;
          default:
            ne && Z(Ce);
            var _e = new P(), Et = ge[ge.length - 1].currentNSMap, Ve = T(R, Ce, _e, Et, _, ee), se = _e.length;
            if (!_e.closed && X(R, Ve, _e.tagName, Le) && (_e.closed = !0, $.nbsp || ee.warning("unclosed xml attribute")), ne && se) {
              for (var Ie = C(ne, {}), lt = 0; lt < se; lt++) {
                var _t = _e[lt];
                Z(_t.offset), _t.locator = C(ne, {});
              }
              q.locator = Ie, B(_e, q, Et) && ge.push(_e), q.locator = ne;
            } else
              B(_e, q, Et) && ge.push(_e);
            n.isHTML(_e.uri) && !_e.closed ? Ve = O(R, Ve, _e.tagName, _, q) : Ve++;
        }
      } catch (ke) {
        if (ke instanceof m)
          throw ke;
        ee.error("element parse error: " + ke), Ve = -1;
      }
      Ve > pe ? pe = Ve : V(Math.max(Ce, pe) + 1);
    }
  }
  function C(R, H) {
    return H.lineNumber = R.lineNumber, H.columnNumber = R.columnNumber, H;
  }
  function T(R, H, $, q, ee, Q) {
    function _(ne, ge, Le) {
      $.attributeNames.hasOwnProperty(ne) && Q.fatalError("Attribute " + ne + " redefined"), $.addValue(
        ne,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        ge.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, ee),
        Le
      );
    }
    for (var V, Z, ae = ++H, ie = i; ; ) {
      var oe = R.charAt(ae);
      switch (oe) {
        case "=":
          if (ie === s)
            V = R.slice(H, ae), ie = l;
          else if (ie === a)
            ie = l;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (ie === l || ie === s)
            if (ie === s && (Q.warning('attribute value must after "="'), V = R.slice(H, ae)), H = ae + 1, ae = R.indexOf(oe, H), ae > 0)
              Z = R.slice(H, ae), _(V, Z, H - 1), ie = c;
            else
              throw new Error("attribute value no end '" + oe + "' match");
          else if (ie == u)
            Z = R.slice(H, ae), _(V, Z, H), Q.warning('attribute "' + V + '" missed start quot(' + oe + ")!!"), H = ae + 1, ie = c;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (ie) {
            case i:
              $.setTagName(R.slice(H, ae));
            case c:
            case h:
            case p:
              ie = p, $.closed = !0;
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
          return Q.error("unexpected end of input"), ie == i && $.setTagName(R.slice(H, ae)), ae;
        case ">":
          switch (ie) {
            case i:
              $.setTagName(R.slice(H, ae));
            case c:
            case h:
            case p:
              break;
            //normal
            case u:
            //Compatible state
            case s:
              Z = R.slice(H, ae), Z.slice(-1) === "/" && ($.closed = !0, Z = Z.slice(0, -1));
            case a:
              ie === a && (Z = V), ie == u ? (Q.warning('attribute "' + Z + '" missed quot(")!'), _(V, Z, H)) : ((!n.isHTML(q[""]) || !Z.match(/^(?:disabled|checked|selected)$/i)) && Q.warning('attribute "' + Z + '" missed value!! "' + Z + '" instead!!'), _(Z, Z, H));
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
                $.setTagName(R.slice(H, ae)), ie = h;
                break;
              case s:
                V = R.slice(H, ae), ie = a;
                break;
              case u:
                var Z = R.slice(H, ae);
                Q.warning('attribute "' + Z + '" missed quot(")!!'), _(V, Z, H);
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
                $.tagName, (!n.isHTML(q[""]) || !V.match(/^(?:disabled|checked|selected)$/i)) && Q.warning('attribute "' + V + '" missed value!! "' + V + '" instead2!!'), _(V, V, H), H = ae, ie = s;
                break;
              case c:
                Q.warning('attribute space is required"' + V + '"!!');
              case h:
                ie = s, H = ae;
                break;
              case l:
                ie = u, H = ae;
                break;
              case p:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      ae++;
    }
  }
  function B(R, H, $) {
    for (var q = R.tagName, ee = null, oe = R.length; oe--; ) {
      var Q = R[oe], _ = Q.qName, V = Q.value, ne = _.indexOf(":");
      if (ne > 0)
        var Z = Q.prefix = _.slice(0, ne), ae = _.slice(ne + 1), ie = Z === "xmlns" && ae;
      else
        ae = _, Z = null, ie = _ === "xmlns" && "";
      Q.localName = ae, ie !== !1 && (ee == null && (ee = {}, Y($, $ = {})), $[ie] = ee[ie] = V, Q.uri = n.XMLNS, H.startPrefixMapping(ie, V));
    }
    for (var oe = R.length; oe--; ) {
      Q = R[oe];
      var Z = Q.prefix;
      Z && (Z === "xml" && (Q.uri = n.XML), Z !== "xmlns" && (Q.uri = $[Z || ""]));
    }
    var ne = q.indexOf(":");
    ne > 0 ? (Z = R.prefix = q.slice(0, ne), ae = R.localName = q.slice(ne + 1)) : (Z = null, ae = R.localName = q);
    var ge = R.uri = $[Z || ""];
    if (H.startElement(ge, ae, q, R), R.closed) {
      if (H.endElement(ge, ae, q), ee)
        for (Z in ee)
          Object.prototype.hasOwnProperty.call(ee, Z) && H.endPrefixMapping(Z);
    } else
      return R.currentNSMap = $, R.localNSMap = ee, !0;
  }
  function O(R, H, $, q, ee) {
    if (/^(?:script|textarea)$/i.test($)) {
      var Q = R.indexOf("</" + $ + ">", H), _ = R.substring(H + 1, Q);
      if (/[&<]/.test(_))
        return /^script$/i.test($) ? (ee.characters(_, 0, _.length), Q) : (_ = _.replace(/&#?\w+;/g, q), ee.characters(_, 0, _.length), Q);
    }
    return H + 1;
  }
  function X(R, H, $, q) {
    var ee = q[$];
    return ee == null && (ee = R.lastIndexOf("</" + $ + ">"), ee < H && (ee = R.lastIndexOf("</" + $)), q[$] = ee), ee < H;
  }
  function Y(R, H) {
    for (var $ in R)
      Object.prototype.hasOwnProperty.call(R, $) && (H[$] = R[$]);
  }
  function A(R, H, $, q) {
    var ee = R.charAt(H + 2);
    switch (ee) {
      case "-":
        if (R.charAt(H + 3) === "-") {
          var Q = R.indexOf("-->", H + 4);
          return Q > H ? ($.comment(R, H + 4, Q - H - 4), Q + 3) : (q.error("Unclosed comment"), -1);
        } else
          return -1;
      default:
        if (R.substr(H + 3, 6) == "CDATA[") {
          var Q = R.indexOf("]]>", H + 9);
          return $.startCDATA(), $.characters(R, H + 9, Q - H - 9), $.endCDATA(), Q + 3;
        }
        var _ = G(R, H), V = _.length;
        if (V > 1 && /!doctype/i.test(_[0][0])) {
          var Z = _[1][0], ae = !1, ie = !1;
          V > 3 && (/^public$/i.test(_[2][0]) ? (ae = _[3][0], ie = V > 4 && _[4][0]) : /^system$/i.test(_[2][0]) && (ie = _[3][0]));
          var oe = _[V - 1];
          return $.startDTD(Z, ae, ie), $.endDTD(), oe.index + oe[0].length;
        }
    }
    return -1;
  }
  function K(R, H, $) {
    var q = R.indexOf("?>", H);
    if (q) {
      var ee = R.substring(H, q).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
      return ee ? (ee[0].length, $.processingInstruction(ee[1], ee[2]), q + 2) : -1;
    }
    return -1;
  }
  function P() {
    this.attributeNames = {};
  }
  P.prototype = {
    setTagName: function(R) {
      if (!r.test(R))
        throw new Error("invalid tagName:" + R);
      this.tagName = R;
    },
    addValue: function(R, H, $) {
      if (!r.test(R))
        throw new Error("invalid attribute:" + R);
      this.attributeNames[R] = this.length, this[this.length++] = { qName: R, value: H, offset: $ };
    },
    length: 0,
    getLocalName: function(R) {
      return this[R].localName;
    },
    getLocator: function(R) {
      return this[R].locator;
    },
    getQName: function(R) {
      return this[R].qName;
    },
    getURI: function(R) {
      return this[R].uri;
    },
    getValue: function(R) {
      return this[R].value;
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
  function G(R, H) {
    var $, q = [], ee = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    for (ee.lastIndex = H, ee.exec(R); $ = ee.exec(R); )
      if (q.push($), $[1]) return q;
  }
  return ia.XMLReader = w, ia.ParseError = m, ia;
}
var Ws;
function Yc() {
  if (Ws) return Cr;
  Ws = 1;
  var n = _a(), e = Ul(), t = zc(), r = Jc(), i = e.DOMImplementation, s = n.NAMESPACE, a = r.ParseError, l = r.XMLReader;
  function u(T) {
    return T.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
  }
  function c(T) {
    this.options = T || { locator: {} };
  }
  c.prototype.parseFromString = function(T, B) {
    var O = this.options, X = new l(), Y = O.domBuilder || new p(), A = O.errorHandler, K = O.locator, P = O.xmlns || {}, G = /\/x?html?$/.test(B), R = G ? t.HTML_ENTITIES : t.XML_ENTITIES;
    K && Y.setDocumentLocator(K), X.errorHandler = h(A, Y, K), X.domBuilder = O.domBuilder || Y, G && (P[""] = s.HTML), P.xml = P.xml || s.XML;
    var H = O.normalizeLineEndings || u;
    return T && typeof T == "string" ? X.parse(
      H(T),
      P,
      R
    ) : X.errorHandler.error("invalid doc source"), Y.doc;
  };
  function h(T, B, O) {
    if (!T) {
      if (B instanceof p)
        return B;
      T = B;
    }
    var X = {}, Y = T instanceof Function;
    O = O || {};
    function A(K) {
      var P = T[K];
      !P && Y && (P = T.length == 2 ? function(G) {
        T(K, G);
      } : T), X[K] = P && function(G) {
        P("[xmldom " + K + "]	" + G + w(O));
      } || function() {
      };
    }
    return A("warning"), A("error"), A("fatalError"), X;
  }
  function p() {
    this.cdata = !1;
  }
  function m(T, B) {
    B.lineNumber = T.lineNumber, B.columnNumber = T.columnNumber;
  }
  p.prototype = {
    startDocument: function() {
      this.doc = new i().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
    },
    startElement: function(T, B, O, X) {
      var Y = this.doc, A = Y.createElementNS(T, O || B), K = X.length;
      C(this, A), this.currentElement = A, this.locator && m(this.locator, A);
      for (var P = 0; P < K; P++) {
        var T = X.getURI(P), G = X.getValue(P), O = X.getQName(P), R = Y.createAttributeNS(T, O);
        this.locator && m(X.getLocator(P), R), R.value = R.nodeValue = G, A.setAttributeNode(R);
      }
    },
    endElement: function(T, B, O) {
      var X = this.currentElement;
      X.tagName, this.currentElement = X.parentNode;
    },
    startPrefixMapping: function(T, B) {
    },
    endPrefixMapping: function(T) {
    },
    processingInstruction: function(T, B) {
      var O = this.doc.createProcessingInstruction(T, B);
      this.locator && m(this.locator, O), C(this, O);
    },
    ignorableWhitespace: function(T, B, O) {
    },
    characters: function(T, B, O) {
      if (T = v.apply(this, arguments), T) {
        if (this.cdata)
          var X = this.doc.createCDATASection(T);
        else
          var X = this.doc.createTextNode(T);
        this.currentElement ? this.currentElement.appendChild(X) : /^\s*$/.test(T) && this.doc.appendChild(X), this.locator && m(this.locator, X);
      }
    },
    skippedEntity: function(T) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    setDocumentLocator: function(T) {
      (this.locator = T) && (T.lineNumber = 0);
    },
    //LexicalHandler
    comment: function(T, B, O) {
      T = v.apply(this, arguments);
      var X = this.doc.createComment(T);
      this.locator && m(this.locator, X), C(this, X);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(T, B, O) {
      var X = this.doc.implementation;
      if (X && X.createDocumentType) {
        var Y = X.createDocumentType(T, B, O);
        this.locator && m(this.locator, Y), C(this, Y), this.doc.doctype = Y;
      }
    },
    /**
     * @see org.xml.sax.ErrorHandler
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(T) {
      console.warn("[xmldom warning]	" + T, w(this.locator));
    },
    error: function(T) {
      console.error("[xmldom error]	" + T, w(this.locator));
    },
    fatalError: function(T) {
      throw new a(T, this.locator);
    }
  };
  function w(T) {
    if (T)
      return `
@` + (T.systemId || "") + "#[line:" + T.lineNumber + ",col:" + T.columnNumber + "]";
  }
  function v(T, B, O) {
    return typeof T == "string" ? T.substr(B, O) : T.length >= B + O || B ? new java.lang.String(T, B, O) + "" : T;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(T) {
    p.prototype[T] = function() {
      return null;
    };
  });
  function C(T, B) {
    T.currentElement ? T.currentElement.appendChild(B) : T.doc.appendChild(B);
  }
  return Cr.__DOMHandler = p, Cr.normalizeLineEndings = u, Cr.DOMParser = c, Cr;
}
var Vs;
function Qc() {
  if (Vs) return Er;
  Vs = 1;
  var n = Ul();
  return Er.DOMImplementation = n.DOMImplementation, Er.XMLSerializer = n.XMLSerializer, Er.DOMParser = Yc().DOMParser, Er;
}
var Ks = Qc();
function Zc(n) {
  return n = n.split(";")[0].trim(), new pt("http://www.w3.org/ns/iana/media-types/" + n + "#Resource");
}
function ed(n, e) {
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
function td(n, e) {
  e = e || {};
  var t = [];
  e && e.selfClosing && e.selfClosing.split(" ").forEach(function(i) {
    t[i] = !0;
  });
  var r = [];
  return e && e.skipAttributes && e.skipAttributes.split(" ").forEach(function(i) {
    r[i] = !0;
  }), Pl(n, e, t, r);
}
function Pl(n, e, t, r) {
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
      if (u.length > 0 && (e && e.sortAttributes && u.sort(function(m, w) {
        return m.toLowerCase().localeCompare(w.toLowerCase());
      }), s += " " + u.join(" ")), t && t.ename)
        s += " />";
      else {
        for (s += ">", s += l === "html" ? `
  ` : "", a.push(l === "style" || l === "script"), i = 0; i < n.childNodes.length; i++) s += Pl(n.childNodes[i]);
        a.pop(), s += l === "body" ? "</" + l + `>
` : "</" + l + ">";
      }
    }
  } else if (n.nodeType === 8)
    s += "<!--" + n.nodeValue + "-->";
  else if (n.nodeType === 3 || n.nodeType === 4) {
    var p = n.nodeValue.replace(/\n+$/, "");
    s += a[a.length - 1] ? p : p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  } else
    console.log("Warning; Cannot handle serialising nodes of type: " + n.nodeType), console.log(n);
  return s;
}
function Xa(n, e, t, r) {
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
function nd(n, e, t, r) {
  return Xa(n.subject, e.subject, t, r) || Xa(n.predicate, e.predicate, t, r) || Xa(n.object, e.object, t, r);
}
function ir(n, e) {
  var t;
  if (e = e || {}, typeof module < "u" && module && module.exports) {
    var r = new Ks.DOMParser().parseFromString(n, e.contentType || "application/xhtml+xml");
    return r;
  } else
    typeof window < "u" && window.DOMParser ? t = new window.DOMParser() : t = new Ks.DOMParser();
  return t.parseFromString(n, "application/xml");
}
function pi(n, e) {
  for (var t = 0; t < n.length; t++)
    if (n[t].subject.equals(e.subject) && n[t].predicate.equals(e.predicate) && n[t].object.equals(e.object) && n[t].why.equals(e.why)) {
      n.splice(t, 1);
      return;
    }
  throw new Error("RDFArrayRemove: Array did not contain " + e + " " + e.why);
}
function rd(n) {
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
function Ml(n = Pt) {
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
Ml(Pt);
function $l(n) {
  return new Si(n);
}
class Si {
  constructor(e) {
    re(this, "_notQNameChars", `	\r
 !"#$%&'()*,+/;<=>?@[\\]^\`{|}~`), re(this, "_notNameChars", this._notQNameChars + ":"), re(this, "validPrefix", new RegExp(/^[a-zA-Z][a-zA-Z0-9]*$/)), re(this, "forbidden1", new RegExp(/[\\"\b\f\r\v\t\n\u0080-\uffff]/gm)), re(this, "forbidden3", new RegExp(/[\\"\b\f\r\v\u0080-\uffff]/gm)), this.flags = "", this.base = null, this.prefixes = [], this.namespaces = [];
    const t = Object.keys(Ps());
    for (const r in t) {
      const i = Ps()[t[r]](""), s = t[r];
      this.prefixes[i] = s, this.namespaces[s] = i;
    }
    this.suggestPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.suggestPrefix("xml", "reserved:reservedForFutureUse"), this.namespacesUsed = [], this.keywords = ["a"], this.prefixchars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", this.incoming = null, this.formulas = [], this.store = e, this.rdfFactory = e.rdfFactory || Pt, this.xsd = Ml(this.rdfFactory);
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
      var a = e[s], l = function(C) {
        t.hasOwnProperty(C) || (t[C] = []), t[C].push(a.subject);
      }, u = [a.subject, a.predicate, a.object];
      u.map(function(C) {
        C.termType === "BlankNode" ? i[C.toNT()] = !0 : C.termType === "Collection" && C.elements.forEach(function(T) {
          l(T);
        });
      }), l(e[s].object);
      var c = r[this.toStr(a.subject)];
      c || (c = []), c.push(a), r[this.toStr(a.subject)] = c;
    }
    var h = [];
    for (var p in r)
      if (r.hasOwnProperty(p)) {
        var m = this.fromStr(p);
        if (m.termType !== "BlankNode" || !t[m] || t[m].length !== 1) {
          h.push(m);
          continue;
        }
      }
    this.incoming = t;
    for (var w = {}, v = 0; v < h.length; v++)
      w[h[v].toNT()] = !0;
    return {
      roots: h,
      subjects: r,
      rootsHash: w,
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
    return this.flags.indexOf("r") < 0 && this.base ? e = Va(this.base, e) : this.flags.indexOf("u") >= 0 ? e = id(e) : e = ad(decodeURI(e)), "<" + e + ">";
  }
  statementsToNTriples(e) {
    var t = e.slice();
    t.sort();
    for (var r = "", i = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", s = this, a = this.store, l = this.rdfFactory, u = function(m) {
      if (m.termType !== "Collection")
        return s.atomicTermToN3(m);
      for (var w = m.elements, v = a.sym(i + "nill"), C = w.length - 1; C >= 0; C--) {
        var T = l.blankNode();
        r += u(T) + " " + u(a.sym(i + "first")) + " " + u(w[C]) + `.
`, r += u(T) + " " + u(a.sym(i + "rest")) + " " + u(v) + `.
`, v = T;
      }
      return s.atomicTermToN3(v);
    }, c = 0; c < t.length; c++) {
      var h = t[c], p = "";
      p += u(h.subject) + " ", p += u(h.predicate) + " ", p += u(h.object) + " ", this.flags.indexOf("q") >= 0 && (p += u(h.why) + " "), p += `.
`, r += p;
    }
    return r;
  }
  statementsToN3(e) {
    var t = 4, r = 80, i = this.store, s = {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": "aaa:00"
    }, a = function(P, G) {
      return nd(P, G, i, s);
    };
    e.sort(a), this.base && !this.defaultNamespace && (this.defaultNamespace = this.base + "#");
    var l = {};
    this.flags.indexOf("s") < 0 && (l["http://www.w3.org/2002/07/owl#sameAs"] = "="), this.flags.indexOf("t") < 0 && (l["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] = "a"), this.flags.indexOf("i") < 0 && (l["http://www.w3.org/2000/10/swap/log#implies"] = "=>");
    var u = function(P) {
      for (var G = "", R = 0; R < P; R++) G += " ";
      return G;
    }, c = function(P) {
      for (var G = "", R = 0; R < P.length; R++) {
        var H = P[R], $ = typeof H == "string" ? H : c(H);
        if (R !== 0) {
          var q = G.slice(-1) || " ";
          $ === "," || $ === ";" || $ === "." && !"0123456789.:".includes(q) || (G += " ");
        }
        G += $;
      }
      return G;
    }, h = function(P, G) {
      var R = "", H = 1e5;
      G === void 0 && (G = -1);
      for (var $ = 0; $ < P.length; $++) {
        var q = P[$];
        if (typeof q != "string") {
          var ee = h(q, G + 1);
          if (ee.length < 10 * (r - t * G) && ee.indexOf('"""') < 0) {
            var Q = c(q);
            Q.length < r - t * G && (q = Q, ee = "");
          }
          ee && (H = 1e4), R += ee;
        }
        if (typeof q == "string") {
          if (q.length === 1 && R.slice(-1) === `
` && ",.;".indexOf(q) >= 0) {
            R = R.slice(0, -1), q == "." && "0123456789.:".includes(R.charAt(R.length - 1)) && (R += " ", H += 1), R += q + `
`, H += 1;
            continue;
          }
          if (H < t * G + 4 || // if new line not necessary
          H + q.length + 1 < r && ";.".indexOf(R[R.length - 2]) < 0)
            R = R.slice(0, -1) + " " + q + `
`, H += q.length + 1;
          else {
            let _ = u(t * G) + q;
            R += _ + `
`, H = _.length, G < 0 && (R += `
`, H = 1e5);
          }
        }
      }
      return R;
    };
    function p(P) {
      for (var G = this.rootSubjects(P), R = G.roots, H = [], $ = 0; $ < R.length; $++) {
        var q = R[$];
        H.push(w(q, G));
      }
      return H;
    }
    var m = p.bind(this);
    function w(P, G) {
      return P.termType === "BlankNode" && !G.incoming[P] ? B(P, G, !0).concat(["."]) : [X(P, G)].concat([C(P, G)]).concat(["."]);
    }
    function v(P, G) {
      var R = [], H = null, $ = G.subjects[this.toStr(P)] || [];
      if (typeof $ > "u")
        throw new Error("Cant find statements for " + P);
      for (var q = [], ee = 0; ee < $.length; ee++) {
        var Q = $[ee];
        Q.predicate.uri === H ? q.push(",") : (H && (R = R.concat([q]).concat([";"]), q = []), R.push(l[Q.predicate.uri] ? l[Q.predicate.uri] : X(Q.predicate, G))), H = Q.predicate.uri, q.push(B(Q.object, G));
      }
      return R = R.concat([q]), R;
    }
    var C = v.bind(this);
    function T(P, G, R) {
      return P.termType === "BlankNode" && (R || G.rootsHash[P.toNT()] === void 0) ? G.subjects[this.toStr(P)] ? ["[", C(P, G), "]"] : "[]" : X(P, G);
    }
    var B = T.bind(this);
    function O(P, G) {
      var R, H;
      switch (P.termType) {
        case "Graph":
          return H = ["{"], H = H.concat(m(P.statements)), H.concat(["}"]);
        case "Collection":
          for (H = ["("], R = 0; R < P.elements.length; R++)
            H.push([B(P.elements[R], G)]);
          return H.push(")"), H;
        default:
          return this.atomicTermToN3(P);
      }
    }
    Si.prototype.termToN3 = X;
    var X = O.bind(this);
    function Y() {
      var P = "";
      this.flags.indexOf("d") < 0 && this.defaultNamespace && (P += "@prefix : " + this.explicitURI(this.defaultNamespace) + `.
`);
      for (var G in this.prefixes)
        this.prefixes.hasOwnProperty(G) && this.namespacesUsed[G] && (P += "@prefix " + this.prefixes[G] + ": " + this.explicitURI(G) + `.
`);
      return P + `
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
        var p = this.prefixes[s];
        if (p || (p = this.makeUpPrefix(s)), p)
          return this.namespacesUsed[s] = !0, p + ":" + i;
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
      var p = t.statementsMatching(void 0, void 0, void 0, h.subject);
      e(this.statementsToN3(this.statementsToN3(p))), e(`}.
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
      for (var _ = 0; _ < H.length; _++) {
        var V = H[_];
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
        var _ = q[Q];
        ee.push(C(_, $));
      }
      return ee;
    }
    var h = c.bind(this);
    function p(H) {
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
      return p(this.base ? Va(this.base, H.uri) : H.uri);
    }
    var w = m.bind(this);
    function v(H, $) {
      var q = [], ee, Q, _, V, Z = $.subjects[this.toStr(H)];
      if (typeof Z > "u")
        return O(H, $);
      Z.sort(function(Le, pe) {
        var Ce = Le.predicate.uri, Pe = pe.predicate.uri;
        if (Ce.substring(0, s.length) === s || Pe.substring(0, s.length) === s)
          return Ce.localeCompare(Pe);
        var Ye = Ce.substring(s.length), Te = Pe.substring(s.length), qe = parseInt(Ye, 10), ht = parseInt(Te, 10);
        return isNaN(qe) || isNaN(ht) || qe !== Ye || ht !== Te ? Ce.localeCompare(Pe) : qe - ht;
      });
      for (var ae = 0; ae < Z.length; ae++) {
        if (_ = Z[ae], _.predicate.uri === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && !ee && _.object.termType === "NamedNode") {
          ee = _.object;
          continue;
        }
        if (V = _.predicate, V.uri.substr(0, s.length) === s) {
          var ie = V.uri.substr(s.length), oe = parseInt(ie, 10);
          ie === oe.toString() && (V = this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#li"));
        }
        switch (Q = Y(V), _.object.termType) {
          case "BlankNode":
            $.incoming[_.object].length === 1 ? q = q.concat(["<" + Q + ' rdf:parseType="Resource">', C(_.object, $), "</" + Q + ">"]) : q = q.concat(["<" + Q + ' rdf:nodeID="' + _.object.toNT().slice(2) + '"/>']);
            break;
          case "NamedNode":
            q = q.concat(["<" + Q + ' rdf:resource="' + w(_.object) + '"/>']);
            break;
          case "Literal":
            q = q.concat(["<" + Q + (_.object.language ? ' xml:lang="' + _.object.language + '"' : _.object.datatype.equals(this.xsd.string) ? "" : ' rdf:datatype="' + p(_.object.datatype.uri) + '"') + ">" + p(_.object.value) + "</" + Q + ">"]);
            break;
          case "Collection":
            q = q.concat(["<" + Q + ' rdf:parseType="Collection">', T(_.object, $), "</" + Q + ">"]);
            break;
          default:
            throw new Error("Can't serialize object of type " + _.object.termType + " into XML");
        }
      }
      var ne = ee ? Y(ee) : "rdf:Description", ge = "";
      return H.termType === "BlankNode" ? (!$.incoming[H] || $.incoming[H].length !== 1) && (ge = ' rdf:nodeID="' + H.toNT().slice(2) + '"') : ge = ' rdf:about="' + w(H) + '"', ["<" + ne + ge + ">"].concat([q]).concat(["</" + ne + ">"]);
    }
    var C = v.bind(this);
    function T(H, $) {
      for (var q = [], ee = 0; ee < H.elements.length; ee++)
        q.push(C(H.elements[ee], $));
      return q;
    }
    function B(H, $) {
      var q = [], ee = $.subjects[this.toStr(H)];
      if (!ee) return q;
      ee.sort();
      for (var Q = 0; Q < ee.length; Q++) {
        var _ = ee[Q];
        switch (_.object.termType) {
          case "BlankNode":
            $.rootsHash[_.object.toNT()] ? q = q.concat(["<" + Y(_.predicate) + ' rdf:nodeID="' + _.object.toNT().slice(2) + '">', "</" + Y(_.predicate) + ">"]) : q = q.concat(["<" + Y(_.predicate) + ' rdf:parseType="Resource">', O(_.object, $), "</" + Y(_.predicate) + ">"]);
            break;
          case "NamedNode":
            q = q.concat(["<" + Y(_.predicate) + ' rdf:resource="' + w(_.object) + '"/>']);
            break;
          case "Literal":
            q = q.concat(["<" + Y(_.predicate) + (_.object.language ? ' xml:lang="' + _.object.language + '"' : _.object.datatype.equals(this.xsd.string) ? "" : ' rdf:datatype="' + p(_.object.datatype.value) + '"') + ">" + p(_.object.value) + "</" + Y(_.predicate) + ">"]);
            break;
          case "Collection":
            q = q.concat(["<" + Y(_.predicate) + ' rdf:parseType="Collection">', T(_.object, $), "</" + Y(_.predicate) + ">"]);
            break;
          default:
            throw new Error("Can't serialize object of type " + _.object.termType + " into XML");
        }
      }
      return q;
    }
    var O = B.bind(this);
    function X(H) {
      var $ = H.uri, q = $.indexOf("#");
      if (q < 0 && this.flags.indexOf("/") < 0 && (q = $.lastIndexOf("/")), q < 0) throw new Error("Cannot make qname out of <" + $ + ">");
      for (var ee = q + 1; ee < $.length; ee++)
        if (this._notNameChars.indexOf($[ee]) >= 0)
          throw new Error('Invalid character "' + $[ee] + '" cannot be in XML qname for URI: ' + $);
      var Q = $.slice(q + 1), _ = $.slice(0, q + 1);
      if (this.defaultNamespace && this.defaultNamespace === _ && this.flags.indexOf("d") < 0)
        return Q;
      var V = this.prefixes[_];
      return V || (V = this.makeUpPrefix(_)), i[_] = !0, V + ":" + Q;
    }
    var Y = X.bind(this), A = h(e), K = "<rdf:RDF";
    this.defaultNamespace && (K += ' xmlns="' + p(this.defaultNamespace) + '"');
    for (var P in i)
      if (i.hasOwnProperty(P)) {
        var G = this.base && this.flags.includes("z") ? Va(this.base, P) : P;
        K += `
 xmlns:` + this.prefixes[P] + '="' + p(G) + '"';
      }
    K += ">";
    var R = [K, A, "</rdf:RDF>"];
    return u(R, -1);
  }
  // End @@ body
  statementsToJsonld(e) {
    const t = this.statementsToN3(e), r = Gc.parse(t);
    return JSON.stringify(r, null, 2);
  }
}
function ad(n) {
  return encodeURI(n);
}
function id(n) {
  for (var e = "", t, r = 0; r < n.length; r++)
    t = n.charCodeAt(r), t > 65535 ? e += "\\U" + ("00000000" + t.toString(16)).slice(-8) : t > 126 ? e += "\\u" + ("0000" + t.toString(16)).slice(-4) : e += n[r];
  return e;
}
function Ur(n, e, t, r, i, s) {
  t = t || n?.value;
  const a = s || {};
  r = r || Mn;
  var l = void 0;
  try {
    var u = $l(e);
    a.flags && u.setFlags(a.flags);
    var c = e.statementsMatching(void 0, void 0, void 0, n);
    switch ("namespaces" in e && u.suggestNamespaces(e.namespaces), a.namespaces && u.setNamespaces(a.namespaces), u.setBase(t), r) {
      case Or:
        return l = u.statementsToXML(c), h(null, l);
      case Fl:
      case Ic:
        return l = u.statementsToN3(c), h(null, l);
      case Mn:
      case Rc:
        return u.setFlags("si" + (a.flags ? " " + a.flags : "")), l = u.statementsToN3(c), h(null, l);
      case Fc:
        return u.setFlags("deinprstux"), l = u.statementsToNTriples(c), h(null, l);
      case ci:
        return u.setFlags("si dr" + (a.flags ? " " + a.flags : "")), l = u.statementsToJsonld(c), h(null, l);
      case hi:
      case di:
        return u.setFlags("deinprstux q"), l = u.statementsToNTriples(c), h(null, l);
      default:
        throw new Error("Serialize: Content-type " + r + " not supported for data write.");
    }
  } catch (p) {
    if (i)
      return i(p, void 0);
    throw p;
  }
  function h(p, m) {
    if (i) {
      i(p, m);
      return;
    } else
      return m;
  }
}
const sd = ["blankNode", "defaultGraph", "literal", "namedNode", "quad", "variable", "supports"], sa = {
  first: "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
  rest: "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
  nil: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
};
function ql(n, e, t) {
  const r = [];
  return t.reduce((i, s, a, l) => {
    r.push(n.quad(i, n.namedNode(sa.first), l[a]));
    let u;
    return a < l.length - 1 ? (u = n.blankNode(), r.push(n.quad(i, n.namedNode(sa.rest), u))) : r.push(n.quad(i, n.namedNode(sa.rest), n.namedNode(sa.nil))), u;
  }, e), r;
}
function Bt(n, e, t = 0) {
  var r = n.length;
  for (t < 0 && (t = r + t); t < r; t++)
    if (n[t] === e)
      return t;
  return -1;
}
class Pr extends je {
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
    super(""), this.statements = e, this.constraints = t, this.initBindings = r, this.optional = i, re(this, "termType", Mr), re(this, "classOrder", en.Graph), re(this, "fetcher", void 0), re(this, "isVar", 0), re(this, "ns", Ne), re(this, "rdfFactory", void 0), this.rdfFactory = s && s.rdfFactory || Pt;
    for (const a of sd)
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
    return s ? je.toJS(s) : void 0;
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
    return new qt();
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
    let t, r, i, s, a, l, u, c, h, p, m, w, v, C;
    w = {}, w[e.toNT()] = !0, s = {}, l = this.transitiveClosure(w, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
    for (let T in l)
      if (l.hasOwnProperty(T)) {
        u = this.statementsMatching(void 0, this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), this.fromNT(T));
        for (let B = 0, O = u.length; B < O; B++)
          v = u[B], s[v.subject.toNT()] = v;
        c = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"), this.fromNT(T));
        for (let B = 0, O = c.length; B < O; B++)
          for (a = c[B], h = this.statementsMatching(void 0, a), i = 0, t = h.length; i < t; i++)
            v = h[i], s[v.subject.toNT()] = v;
        p = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"), this.fromNT(T));
        for (let B = 0, O = p.length; B < O; B++)
          for (a = p[B], m = this.statementsMatching(void 0, a), C = 0, r = m.length; C < r; C++)
            v = m[C], s[v.object.toNT()] = v;
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
    for (let p = 0, m = s.length; p < m; p++)
      if (c = s[p], c.predicate.uri === i)
        h[c.object.toNT()] = c;
      else {
        a = this.each(c.predicate, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"));
        for (let w = 0, v = a.length; w < v; w++)
          r = a[w], h[r.toNT()] = c;
      }
    l = this.statementsMatching(void 0, void 0, e);
    for (let p = 0, m = l.length; p < m; p++) {
      c = l[p], u = this.each(c.predicate, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"));
      for (let w = 0, v = u.length; w < v; w++)
        t = u[w], h[t.toNT()] = c;
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
      let p = function(w) {
        w.termType === "BlankNode" && !s[w.value] && (s[w.value] = !0, i.push(w));
      }, m = u.statementsMatching(null, null, h, t).concat(u.statementsMatching(h, null, null, t));
      m = m.filter(function(w) {
        if (r[w.predicate.value]) return !1;
        let v = w.toNT();
        return a[v] ? !1 : (a[v] = !0, !0);
      }), m.forEach(function(w) {
        p(w.subject), p(w.object);
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
    return new Pr();
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
        return new Vn(e.slice(1));
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
        if (Oc(e))
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
      const r = t.rdfFactory.blankNode(), i = ql(t.rdfFactory, r, e);
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
    return Ur(r, this, e, t, void 0, i);
  }
  /**
   * Creates a new formula with the substituting bindings applied
   * @param bindings - The bindings to substitute
   */
  substitute(e) {
    let t = this.statements.map(function(i) {
      return i.substitute(e);
    });
    const r = new Pr();
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
    let p = {};
    for (; ; ) {
      if (c = (function() {
        for (let m in h)
          if (h.hasOwnProperty(m))
            return m;
      })(), c == null)
        return p;
      for (u = r ? this.each(void 0, t, this.fromNT(c)) : this.each(this.fromNT(c), t), s = 0, a = u.length; s < a; s++)
        i = u[s], l = i.toNT(), !(l in p) && (l in h || (h[l] = h[c]));
      p[c] = h[c], delete h[c];
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
    return new Vn(e);
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
je.fromValue = Ll;
const zn = {
  xsd: Ne("http://www.w3.org/2001/XMLSchema#")
};
je.toJS = function(n) {
  return Di(n) ? n.elements.map(je.toJS) : Bl(n) ? n.datatype.equals(zn.xsd("boolean")) ? n.value === "1" || n.value === "true" : n.datatype.equals(zn.xsd("dateTime")) || n.datatype.equals(zn.xsd("date")) ? new Date(n.value) : n.datatype.equals(zn.xsd("integer")) || n.datatype.equals(zn.xsd("float")) || n.datatype.equals(zn.xsd("decimal")) ? Number(n.value) : n.value : n;
};
class ld {
  constructor(e, t) {
    this.pat = new gn(), this.vars = [], this.name = e, this.id = t;
  }
}
function Gs(n, e, t, r) {
  function i(A) {
    var K = "", P;
    for (P in A)
      A.hasOwnProperty(P) && (K += "    " + P + " -> " + A[P]);
    return K;
  }
  function s(A) {
    var K = "Bindings: ", P, G = A.length;
    for (P = 0; P < G; P++)
      K += i(A[P][0]) + `;
	`;
    return K;
  }
  function a(A, K, P, G) {
    var R = P[A];
    if (R === void 0) {
      if (A.isVar) {
        var H = [];
        return H[A] = K, [[H, null]];
      }
      R = A;
    }
    if (!R.complexType)
      return G.redirections[R] && (R = G.redirections[R]), G.redirections[K] && (K = G.redirections[K]), R.equals(K) || R.uri && R.uri === kr ? [[[], null]] : [];
    if (A instanceof Array)
      return K instanceof Array ? l(A, K, P) : [];
    throw new Error("query.js: oops - code not written yet");
  }
  function l(A, K, P, G) {
    var R;
    if (A.length !== K.length)
      return [];
    if (!A.length)
      return [[[], null]];
    var H = a(A[0], K[0], P, G);
    if (H.length === 0)
      return H;
    var $ = [], q, ee = H.length, Q, _, V, Z, ae, ie;
    for (q = 0; q < ee; q++) {
      Q = H[q][0], ie = [];
      for (Z in Q)
        Q.hasOwnProperty(Z) && (ie[Z] = Q[Z]);
      for (Z in P)
        P.hasOwnProperty(Z) && (ie[Z] = P[Z]);
      for (R = l(A.slice(1), K.slice(1), ie, G), V = R.length, _ = 0; _ < V; _++) {
        ae = R[_][0];
        for (Z in Q)
          Q.hasOwnProperty(Z) && (ae[Z] = Q[Z]);
        $.push([ae, null]);
      }
    }
    return $;
  }
  function u(A, K) {
    var P = K[A];
    return P === void 0 ? A : P;
  }
  function c(A, K) {
    var P = {}, G;
    for (G in A)
      A.hasOwnProperty(G) && (P[G] = A[G]);
    for (G in K)
      K.hasOwnProperty(G) && (P[G] = K[G]);
    return P;
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
    var P;
    if (A < 0)
      return this.originalCallback(K);
    for (P = 0; P < this.branches[A].results.length; P++)
      this.doCallBacks(A - 1, c(K, this.branches[A].results[P]));
  };
  function p(A, K) {
    return this.count = 0, this.success = !1, this.done = !1, this.callback = A, this.onDone = K, this;
  }
  p.prototype.reportMatch = function(A) {
    this.callback(A), this.success = !0;
  }, p.prototype.reportDone = function() {
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
  function w(A, K, P) {
    var G, R, H, $;
    for (K.nvars = 0, K.index = null, G = [K.subject, K.predicate, K.object, K.why], $ = [A.subjectIndex, A.predicateIndex, A.objectIndex, A.whyIndex], H = 0; H < 4; H++) {
      let q = G[H];
      if (!(q.uri && q.uri === kr)) if (q.isVar && P[q] === void 0)
        K.nvars++;
      else {
        if (q = u(G[H], P), A.redirections[A.id(q)] && (q = A.redirections[A.id(q)]), R = $[H][A.id(q)], !R)
          return K.index = [], !1;
        (K.index === null || K.index.length > R.length) && (K.index = R);
      }
    }
    return K.index === null && (K.index = A.statements), !0;
  }
  function v(A, K) {
    return A.nvars !== K.nvars ? A.nvars - K.nvars : A.index.length - K.index.length;
  }
  var C = 0, T = function(A, K, P, G, R, H, $) {
    Xt.debug("Match begins, Branch count now: " + $.count + " for " + $.pattern_debug);
    var q = K.statements;
    if (q.length === 0) {
      if (Xt.debug("FOUND MATCH WITH BINDINGS:" + i(P)), K.optional.length === 0)
        $.reportMatch(P);
      else {
        Xt.debug("OPTIONAL: " + K.optional);
        var ee = new h(e, P), Q = [], _;
        for (_ = 0; _ < K.optional.length; _++)
          Q[_] = new m(ee), Q[_].pattern_debug = K.optional[_];
        for (_ = 0; _ < K.optional.length; _++)
          Q[_].count = Q[_].count + 1, T(A, K.optional[_], P, "", R, e, Q[_]);
      }
      $.count--, Xt.debug("Match ends -- success , Branch count now: " + $.count + " for " + $.pattern_debug);
      return;
    }
    var V, Z, ae = q.length;
    if (R) {
      var ie = "match" + C++, oe = function(ne, ge) {
        var Le = ne.uri.split("#")[0];
        R.nowOrWhenFetched(Le, void 0, function(pe, Ce, Pe) {
          pe || console.log("Error following link to <" + ne.uri + "> in query: " + Ce), T(
            A,
            K,
            P,
            G,
            R,
            // match not match2 to look up any others necessary.
            H,
            $
          );
        });
      };
      for (Z = 0; Z < ae; Z++) {
        if (V = q[Z], P[V.subject] !== void 0 && P[V.subject].uri && R && R.getState(Un(P[V.subject].uri)) === "unrequested") {
          oe(P[V.subject], ie);
          return;
        }
        if (P[V.object] !== void 0 && P[V.object].uri && R && R.getState(Un(P[V.object].uri)) === "unrequested") {
          oe(P[V.object], ie);
          return;
        }
      }
    }
    O(A, K, P, G, R, H, $);
  }, B = function(A, K) {
    var P = !0, G, R;
    for (G in A)
      A.hasOwnProperty(G) && K[G] && (R = K[G].test, R && !R(A[G]) && (P = !1));
    return P;
  }, O = function(A, K, P, G, R, H, $) {
    var q = K.statements, ee = q.length, Q, _, V, Z, ae, ie, oe;
    for (Q = 0; Q < ee; Q++)
      oe = q[Q], w(A, oe, P);
    q.sort(v), oe = q[0];
    var ne = A.formula();
    ne.optional = K.optional, ne.constraints = K.constraints, ne.statements = q.slice(1), Xt.debug(G + "match2 searching " + oe.index.length + " for " + oe + "; bindings so far=" + i(P));
    var ge, Le = oe.index.length, pe, Ce;
    for (ge = 0; ge < Le; ge++)
      for (Ce = oe.index[ge], pe = l([oe.subject, oe.predicate, oe.object, oe.why], [Ce.subject, Ce.predicate, Ce.object, Ce.why], P, A), Xt.info(G + " From first: " + pe.length + ": " + s(pe)), V = pe.length, _ = 0; _ < V; _++)
        if (ae = [], ie = pe[_][0], !B(ie, K.constraints))
          Xt.debug("Branch count CS: " + $.count);
        else {
          for (Z in ie)
            ie.hasOwnProperty(Z) && (ae[Z] = ie[Z]);
          for (Z in P)
            P.hasOwnProperty(Z) && (ae[Z] = P[Z]);
          $.count++, T(A, ne, ae, G + "  ", R, H, $);
        }
    $.count--, Xt.debug("Match2 ends, Branch count: " + $.count + " for " + $.pattern_debug), $.count === 0 && $.reportDone();
  }, X = this;
  Xt.debug("Query on " + this.statements.length);
  var Y = new p(e, r);
  Y.count++, n.sync ? T(X, n.pat, n.pat.initBindings, "", t, e, Y) : setTimeout(function() {
    T(X, n.pat, n.pat.initBindings, "", t, e, Y);
  }, 0);
}
const ja = "http://www.w3.org/2002/07/owl#";
function od(n, e, t, r) {
  var i = n.any(e, t, void 0);
  return i ? (n.equate(i, r), !0) : !1;
}
function ud(n, e, t, r) {
  var i = n.any(void 0, t, r);
  return i ? (n.equate(i, e), !0) : !1;
}
function Hl(n, e, t, r, i) {
  n.typeCallback && n.typeCallback(n, r, i);
  var s = n.classActions[n.id(r)], a = !1;
  if (s)
    for (var l = 0; l < s.length; l++)
      a = a || s[l](n, e, t, r, i);
  return a;
}
class gn extends Pr {
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
    ], this.rdfArrayRemove = t.rdfArrayRemove || pi, t.dataCallback && (this.dataCallbacks = [t.dataCallback]), t.dataRemovalCallback && (this.dataRemovalCallbacks = [t.dataRemovalCallback]), this.initPropertyActions(this.features);
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
    }), r = new gn();
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
        var p = [], m = s.map(function(w) {
          var v = i.statementsMatching(w.subject, w.predicate, w.object, t);
          return v.length === 0 ? (p.push(w), null) : v[0];
        });
        if (p.length)
          return r("Could not find to delete: " + p.join(`
 or `));
        m.map(function(w) {
          i.remove(w);
        });
      }
      e.insert && (s = e.insert, a && (s = s.substitute(a)), s = s.statements, s.map(function(w) {
        w.graph = t, i.add(w.subject, w.predicate, w.object, w.graph);
      })), h();
    }
    if (e.where) {
      var u = new ld("patch");
      u.pat = e.where, u.pat.statements.map(function(h) {
        h.graph = Kn(t.value);
      }), u.sync = !0;
      var c = [];
      i.query(u, function(p) {
        c.push(p);
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
    this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))] = [Hl], Bt(e, "sameAs") >= 0 && (this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${ja}sameAs`))] = [function(t, r, i, s, a) {
      return t.equate(r, s), !0;
    }]), Bt(e, "InverseFunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${ja}InverseFunctionalProperty`))] = [function(t, r, i, s, a) {
      return t.newPropertyAction(r, ud);
    }]), Bt(e, "FunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${ja}FunctionalProperty`))] = [function(t, r, i, s, a) {
      return t.newPropertyAction(r, od);
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
      else tr(e) ? this.add(e.subject, e.predicate, e.object, e.graph) : Na(e) && this.add(e.statements);
      return this;
    }
    var a, l;
    i || (i = this.fetcher ? this.fetcher.appNode : this.rdfFactory.defaultGraph()), typeof e == "string" && (e = this.rdfFactory.namedNode(e)), t = je.fromValue(t);
    const u = je.fromValue(r);
    if (i = je.fromValue(i), !Uc(e))
      throw new Error("Subject is not a subject type");
    if (!Pc(t))
      throw new Error(`Predicate ${t} is not a predicate type`);
    if (!kc(u))
      throw new Error(`Object ${u} is not an object type`);
    if (!qc(i))
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
    var p = [this.id(this.canon(e)), c, this.id(this.canon(u)), this.id(this.canon(i))];
    for (l = this.rdfFactory.quad(e, t, u, i), s = 0; s < 4; s++) {
      var m = this.index[s], w = p[s];
      m[w] || (m[w] = []), m[w].push(l);
    }
    this.statements.push(l);
    for (const v of this.dataCallbacks)
      v(l);
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
      case jn:
        return new tn(e.value);
      case An:
        return e;
      // non-RDF/JS type, should just need to cast
      case Wn:
        return new _i();
      case Il:
        return e;
      case Mr:
        return e;
      case fr:
        return new Zt(e.value, e.language, e.datatype);
      case Xn:
        return new pt(e.value);
      case Nn:
        return new Vn(e.value);
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
      for (var l = [s.subject, s.predicate, s.object, s.graph], u = function(m, w) {
        for (var v = 0; v < m.length; v++)
          if (m[v].subject.equals(w.subject) && m[v].predicate.equals(w.predicate) && m[v].object.equals(w.object) && m[v].why.equals(w.graph))
            return !0;
      }, c = 0; c < 4; c++) {
        var h = this.canon(l[c]), p = this.id(h);
        this.index[c][p] && u(this.index[c][p], s);
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
    return Object.prototype.hasOwnProperty.call(e, "compareTerm") ? e.compareTerm(t) : en[e.termType] < en[t.termType] ? -1 : en[e.termType] > en[t.termType] ? 1 : e.value < t.value ? -1 : e.value > t.value ? 1 : 0;
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
    return new gn(e);
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
    return this.statementsMatching(je.fromValue(e), je.fromValue(t), je.fromValue(r), je.fromValue(i));
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
    return new Vn(e);
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
    return Gs.call(this, e, t, r, i);
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
    if (e.sync = !0, Gs.call(this, e, r, null, i), !s)
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
    var a = [e, t, r, i], l = [], u = [], c = [], h, p;
    for (h = 0; h < 4; h++)
      l[h] = this.canon(je.fromValue(a[h])), l[h] && (c.push(h), u[h] = this.id(l[h]));
    if (c.length === 0)
      return this.statements;
    if (c.length === 1)
      return h = c[0], p = this.index[h][u[h]], p && s && p.length > 1 && (p = p.slice(0, 1)), p = p || [], p;
    var m = 1e10, w, v;
    for (v = 0; v < c.length; v++) {
      if (h = c[v], p = this.index[h][u[h]], !p)
        return [];
      p.length < m && (m = p.length, w = v);
    }
    for (var C = c[w], T = this.index[C][u[C]], B = c.slice(0, w).concat(c.slice(w + 1)), O = [], X = ["subject", "predicate", "object", "why"], Y = 0; Y < T.length; Y++) {
      var A = T[Y];
      for (v = 0; v < B.length; v++)
        if (h = B[v], !this.canon(A[X[h]]).equals(l[h])) {
          A = null;
          break;
        }
      if (A != null && (O.push(A), s))
        break;
    }
    return O;
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
    }, Ur(r, this, e, t, void 0, i);
  }
}
re(gn, "handleRDFType", void 0);
gn.handleRDFType = Hl;
const kn = Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
function cd(n, e, t, r) {
  for (const i of n.statementsMatching(t, null, null, r)) {
    const s = new $t(e, i.predicate, i.object, r);
    n.remove(i), n.add(s);
  }
  for (const i of n.statementsMatching(null, t, null, r))
    n.remove(i), n.add(new $t(i.subject, e, i.object, r));
  for (const i of n.statementsMatching(null, null, t, r))
    n.remove(i), n.add(new $t(i.subject, i.predicate, e, r));
}
function dd(n, e) {
  const t = kn("nil");
  for (const r of n.statementsMatching(t, null, null, e)) {
    n.remove(r);
    const i = new qt();
    n.add(new $t(i, r.predicate, r.object, e));
  }
  for (const r of n.statementsMatching(null, null, t, e))
    if (!r.predicate.sameTerm(kn("rest"))) {
      n.remove(r);
      const i = new qt();
      n.add(new $t(r.subject, r.predicate, i, e));
    }
}
function hd(n, e) {
  function t(i, s, a) {
    const l = n.statementsMatching(i, kn("rest"), null, e);
    if (l.length !== 1) throw new Error(`Bad list structure: no rest at ${i}`);
    const u = n.statementsMatching(i, kn("first"), null, e);
    if (u.length !== 1) throw new Error(`Bad list structure: rest but ${u.length} firsts at ${i}`);
    const h = [u[0].object].concat(s), p = a.concat(l).concat(u), m = n.statementsMatching(null, kn("rest"), i, e);
    if (m.length === 0) {
      const v = new qt(h);
      n.remove(p), cd(n, v, i, e);
      return;
    }
    if (m.length !== 1) throw new Error(`Bad list structure: ${m.length} pres at ${i}`);
    const w = m[0].subject;
    if (w.termType !== "BlankNode") throw new Error(`Bad list element node ${w} type: ${w.termType} `);
    t(w, h, p);
  }
  dd(n, e), n.statementsMatching(null, kn("rest"), kn("nil"), e).forEach((i) => {
    if (i.subject.termType !== "BlankNode") throw new Error(`Bad list element node ${i.subject} type: ${i.subject.termType} `);
    t(i.subject, [], []);
  });
}
function fd(n) {
  return encodeURI(n);
}
var pd = {
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
}, za = "http://www.w3.org/2000/10/swap/log#", ct = function(n) {
  return n;
}, dt = function(n) {
  return n;
}, br = function(n) {
  if (n.length > 0) throw "missing.js: oops nnonempty dict not imp";
  return [];
}, Ft = function(n) {
  return n.length;
}, Ja = function(n, e, t) {
  if (typeof n.slice > "u") throw "@@ mising.js: No .slice function for " + n + " of type " + typeof n;
  return typeof t > "u" || t == null ? n.slice(e) : n.slice(e, t);
}, _r = Error("dummy error stop iteration"), la = function(n) {
  return this.last = 0, this.li = n, this.next = function() {
    if (this.last == this.li.length) throw _r;
    return this.li[this.last++];
  }, this;
}, Ya = function(n, e) {
  return n.indexOf(e);
}, Bn = function(n, e) {
  if (!n)
    throw e ? "python Assertion failed: " + e : "(python) Assertion failed.";
}, md = function(n) {
  return String.fromCharCode(n);
};
String.prototype.encode = function(n) {
  if (n != "utf-8") throw "UTF8_converter: can only do utf-8";
  return pd.encode(this);
};
String.prototype.decode = function(n) {
  if (n != "utf-8") throw "UTF8_converter: can only do utf-8";
  return this;
};
var Qa = function(n, e) {
  return Tt(e, n);
}, gd = null, yd = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", Xs = "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil", js = "http://www.w3.org/2002/07/owl#sameAs", vd = "#", wd = "http://www.w3.org/2001/XMLSchema#integer", Ed = "http://www.w3.org/2001/XMLSchema#double", Cd = "http://www.w3.org/2001/XMLSchema#decimal", bd = "http://www.w3.org/2001/XMLSchema#date", Nd = "http://www.w3.org/2001/XMLSchema#dateTime", Wl = `	\r
 !"#$%&'()*.,+/;<=>?@[\\]^\`{|}~`, Jn = Wl + ":", Za = new RegExp("^([-+]?[0-9]+)(\\.[0-9]+)?([eE][-+]?[0-9]+)?", "g"), zs = new RegExp("^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9](T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\\.[0-9]*)?)?)?Z?"), Ad = new RegExp("[\\s#]"), ei = new RegExp('[\\\\\\r\\n\\"]', "g"), ti = new RegExp("^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*", "g");
function oa(n, e) {
  var t = n.charAt(e + 1);
  return t === "" || Ad.test(t);
}
function Ii(n, e, t, r, i, s, a, l) {
  return new xd(n, e, t, r, i, s, a, l);
}
class xd {
  constructor(e, t, r, i, s, a, l, u) {
    typeof t > "u" && (t = null), typeof r > "u" && (r = ""), typeof i > "u" && (i = null), typeof s > "u" && (s = ""), typeof l > "u" && (l = ""), typeof u > "u" && (u = null), this._bindings = new br([]), this._flags = l, r != "" && (Bn(r.indexOf(":") >= 0, "Document URI not absolute: " + r), this._bindings[""] = r + "#"), this._store = e, s && e.setGenPrefix(s), this._thisDoc = r, this.source = e.sym(r), this.lines = 0, this.statementCount = 0, this.hasNil = !1, this.startOfLine = 0, this.previousLine = 0, this._genPrefix = s, this.keywords = new dt(["a", "this", "bind", "has", "is", "of", "true", "false"]), this.keywordsSet = 0, this._anonymousNodes = new br([]), this._variables = new br([]), this._parentVariables = new br([]), this._reason = u, this._reason2 = null, i ? this._baseURI = i : r ? this._baseURI = r : this._baseURI = null, Bn(!this._baseURI || this._baseURI.indexOf(":") >= 0), this._genPrefix || (this._thisDoc ? this._genPrefix = this._thisDoc + "#_g" : this._genPrefix = RDFSink_uniqueURI()), t == null ? this._thisDoc ? this._formula = e.formula(r + "#_formula") : this._formula = e.formula() : this._formula = t, this._context = this._formula, this._parentContext = null;
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
    var i = r + Ft(e);
    return t.slice(r, i) == e && Wl.indexOf(t.charAt(i)) >= 0 ? i : -1;
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
      return this.setKeywords(Ja(r, null, null)), t;
    }
    var u = this.tok("forAll", e, t);
    if (u > 0) {
      var t = this.commaSeparatedList(e, u, r, !0);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, t, "Bad variable list after @forAll");
      var i = new la(r);
      try {
        for (; ; ) {
          var s = i.next();
          (Bt(this._variables, s) < 0 || Bt(this._parentVariables, s) >= 0) && (this._variables[s] = this._context.newUniversal(s));
        }
      } catch (h) {
        if (h != _r)
          throw h;
      }
      return t;
    }
    var u = this.tok("forSome", e, t);
    if (u > 0) {
      var t = this.commaSeparatedList(e, u, r, this.uri_ref2);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, t, "Bad variable list after @forSome");
      var i = new la(r);
      try {
        for (; ; ) {
          var s = i.next();
          this._context.declareExistential(s);
        }
      } catch (p) {
        if (p != _r)
          throw p;
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
        var l = Qa(this._baseURI, l);
      else
        Bn(l.indexOf(":") >= 0, "With no base URI, cannot handle relative URI for NS");
      return Bn(l.indexOf(":") >= 0), this._bindings[a[0][0]] = l, this.bind(a[0][0], fd(l)), u;
    }
    var u = this.tok("base", e, t);
    if (u >= 0) {
      var a = new dt([]), t = this.uri_ref2(e, u, a);
      if (t < 0)
        throw ye(this._thisDoc, this.lines, e, u, "expected <uri> after @base ");
      var l = a[0].uri;
      if (this._baseURI)
        var l = Qa(this._baseURI, l);
      else
        throw ye(this._thisDoc, this.lines, e, u, "With no previous base URI, cannot use relative URI in @base  <" + l + ">");
      return Bn(l.indexOf(":") >= 0), this._baseURI = l, t;
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
    return this.hasNil && this._store.rdfFactory.supports.COLLECTIONS && hd(this._store, this.source), this._formula;
  }
  makeStatement(e) {
    e[0].add(e[2], e[1], e[3], this.source), (e[2].uri && e[2].uri === Xs || e[3].uri && e[3].uri === Xs) && (this.hasNil = !0), this.statementCount += 1;
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
      return r.push(new ct(["->", this._store.sym(yd)])), s;
    if (e.slice(t, t + 2) == "<=")
      return r.push(new ct(["<-", this._store.sym(za + "implies")])), t + 2;
    if (e.slice(t, t + 1) == "=")
      return e.slice(t + 1, t + 2) == ">" ? (r.push(new ct(["->", this._store.sym(za + "implies")])), t + 2) : (r.push(new ct(["->", this._store.sym(js)])), t + 1);
    if (e.slice(t, t + 2) == ":=")
      return r.push(new ct(["->", za + "becomes"])), t + 2;
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
      if (s == "." && oa(e, i))
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
          if (Ft(c) > 1) {
            var h = new la(c);
            try {
              for (; ; ) {
                var p = h.next();
                this.makeStatement(new ct([this._context, this._store.sym(js), s, p]));
              }
            } catch (q) {
              if (q != _r)
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
        for (var A = a + 1, w = new dt([]), v = !0; ; ) {
          var a = this.skipSpace(e, A);
          if (a < 0)
            throw ye(this._thisDoc, this.lines, e, a, "needed '$}', found end.");
          if (e.slice(a, a + 2) == "$}") {
            var A = a + 2;
            break;
          }
          if (v)
            var v = !1;
          else if (e.slice(a, a + 1) == ",")
            a += 1;
          else
            throw ye(this._thisDoc, this.lines, e, a, "expected: ','");
          var C = new dt([]), A = this.item(e, a, C);
          if (A < 0)
            throw ye(this._thisDoc, this.lines, e, a, "expected item in set or '$}'");
          w.push(C[0]);
        }
        return r.push(this._store.newSet(w, this._context)), A;
      } else {
        var A = a + 1, T = this._parentContext;
        this._parentContext = this._context;
        var B = this._anonymousNodes, O = this._parentVariables;
        this._parentVariables = this._variables, this._anonymousNodes = new br([]), this._variables = this._variables.slice();
        var X = this._reason2;
        if (this._reason2 = gd, s == null)
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
        return this._anonymousNodes = B, this._variables = this._parentVariables, this._parentVariables = O, this._context = this._parentContext, this._reason2 = X, this._parentContext = T, r.push(s.close()), A;
      }
    }
    if (l == "(") {
      var Y = this._store.list, m = e.slice(a + 1, a + 2);
      if (m == "$") {
        var Y = this._store.newSet;
        a += 1;
      }
      for (var A = a + 1, w = new dt([]); ; ) {
        var a = this.skipSpace(e, A);
        if (a < 0)
          throw ye(this._thisDoc, this.lines, e, a, "needed ')', found end.");
        if (e.slice(a, a + 1) == ")") {
          var A = a + 1;
          break;
        }
        var C = new dt([]), A = this.item(e, a, C);
        if (A < 0)
          throw ye(this._thisDoc, this.lines, e, a, "expected item in list or ')'");
        w.push(C[0]);
      }
      return r.push(Y(w, this._context)), A;
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
      var l = new la(a);
      try {
        for (; ; ) {
          var u = l.next(), c = s[0], h = c[0], p = c[1];
          h == "->" ? this.makeStatement(new ct([this._context, p, r, u])) : this.makeStatement(new ct([this._context, p, u, r]));
        }
      } catch (v) {
        if (v != _r)
          throw v;
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
  uri_ref2(e, p, r) {
    var i = new dt([]), s = this.qname(e, p, i);
    if (s >= 0) {
      var a = i[0], l = a[0], u = a[1];
      if (l == null) {
        Bn(0, "not used?");
        var c = this._baseURI + vd;
      } else {
        var c = this._bindings[l];
        if (!c) {
          if (l == "_")
            return r.push(this.anonymousNode(u)), s;
          throw ye(this._thisDoc, this.lines, e, p, "Prefix " + l + " not bound.");
        }
      }
      var h = this._store.sym(c + u);
      return Bt(this._variables, h) >= 0 ? r.push(this._variables[h]) : r.push(h), s;
    }
    var p = this.skipSpace(e, p);
    if (p < 0)
      return -1;
    if (e.charAt(p) == "?") {
      var m = new dt([]), s = this.variable(e, p, m);
      return s > 0 ? (r.push(m[0]), s) : -1;
    } else if (e.charAt(p) == "<") {
      for (var p = p + 1, w = p; p < Ft(e); ) {
        if (e.charAt(p) == ">") {
          var v = e.slice(w, p);
          if (this._baseURI)
            var v = Qa(this._baseURI, v);
          else
            Bn(v.indexOf(":") >= 0, "With no base URI, cannot deal with relative URIs");
          if (e.slice(p - 1, p) == "#" && Ja(v, -1, null) != "#")
            var v = v + "#";
          var h = this._store.sym(v);
          return Bt(this._variables, h) >= 0 ? r.push(this._variables[h]) : r.push(h), p + 1;
        }
        var p = p + 1;
      }
      throw ye(this._thisDoc, this.lines, e, s, "unterminated URI reference");
    } else if (this.keywordsSet) {
      var m = new dt([]), s = this.bareWord(e, p, m);
      if (s < 0)
        return -1;
      if (Bt(this.keywords, m[0]) >= 0)
        throw ye(this._thisDoc, this.lines, e, p, 'Keyword "' + m[0] + '" not allowed here.');
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
    for (; s < Ft(e) && Jn.indexOf(e.charAt(s)) < 0; )
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
    if ("0123456789-".indexOf(s) >= 0 || Jn.indexOf(s) >= 0)
      return -1;
    for (var a = i; a < Ft(e); ) {
      var l = e.charAt(a);
      if (l === ".") {
        if (oa(e, a))
          break;
      } else if (Jn.indexOf(l) >= 0)
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
    if (Jn.indexOf(s) < 0)
      for (var a = s, i = i + 1; i < Ft(e); ) {
        var s = e.charAt(i);
        if (s === ".") {
          if (oa(e, i))
            break;
        } else if (Jn.indexOf(s) >= 0)
          break;
        var a = a + s, i = i + 1;
      }
    else
      var a = "";
    if (i < Ft(e) && e.charAt(i) == ":") {
      for (var l = a, i = i + 1, a = ""; i < Ft(e); ) {
        var s = e.charAt(i);
        if (s === ".") {
          if (oa(e, i))
            break;
        } else if (Jn.indexOf(s) >= 0)
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
        var t = t + Ft(s), a = this.strconst(e, t, s), i = a[0], l = a[1];
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
      zs.lastIndex = 0;
      var a = zs.exec(e.slice(t));
      if (a != null) {
        var l = a[0];
        i = t + l.length, l.indexOf("T") >= 0 ? r.push(this._store.literal(l, this._store.sym(Nd))) : r.push(this._store.literal(l, this._store.sym(bd)));
      } else {
        Za.lastIndex = 0;
        var a = Za.exec(e.slice(t));
        if (a == null)
          throw ye(this._thisDoc, this.lines, e, t, "Bad number or date syntax");
        i = t + Za.lastIndex;
        var l = e.slice(t, i);
        l.indexOf("e") >= 0 ? r.push(this._store.literal(parseFloat(l), this._store.sym(Ed))) : e.slice(t, i).indexOf(".") >= 0 ? r.push(this._store.literal(parseFloat(l), this._store.sym(Cd))) : r.push(this._store.literal(parseInt(l), this._store.sym(wd)));
      }
      return i;
    }
    if (e.charAt(t) == '"') {
      if (e.slice(t, t + 3) == '"""')
        var u = '"""';
      else
        var u = '"';
      var t = t + Ft(u), c = null, h = this.strconst(e, t, u), i = h[0], p = h[1], m = null;
      if (e.slice(i, i + 1) == "@") {
        ti.lastIndex = 0;
        var a = ti.exec(e.slice(i + 1));
        if (a == null)
          throw ye(this._thisDoc, startline, e, t, "Bad language code syntax on string literal, after @");
        var t = ti.lastIndex + i + 1, m = e.slice(i + 1, t), i = t;
      }
      if (e.slice(i, i + 2) == "^^")
        var w = new dt([]), i = this.uri_ref2(e, i + 2, w), c = w[0];
      return r.push(this._store.literal(p, m || c)), i;
    } else
      return -1;
  }
  strconst(e, t, r) {
    for (var i = t, s = "", a = this.lines; i < Ft(e); ) {
      var t = i + Ft(r);
      if (e.slice(i, t) == r)
        return new ct([t, s]);
      if (e.charAt(i) == '"') {
        var s = s + '"', i = i + 1;
        continue;
      }
      ei.lastIndex = 0;
      var l = ei.exec(e.slice(i));
      if (!l)
        throw ye(this._thisDoc, a, e, i, "Closing quote missing in string at ^ in " + e.slice(i - 20, i) + "^" + e.slice(i, i + 20));
      var t = i + ei.lastIndex - 1, s = s + e.slice(i, t), u = e.charAt(t);
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
        var c = Ya('abfrtvn\\"', u);
        if (c >= 0)
          var h = `a\b\f\r	\v
\\"`.charAt(c), s = s + h, i = i + 1;
        else if (u == "u")
          var p = this.uEscape(e, i + 1, a), i = p[0], u = p[1], s = s + u;
        else if (u == "U")
          var p = this.UEscape(e, i + 1, a), i = p[0], u = p[1], s = s + u;
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
      var c = Ya("0123456789abcdef", u);
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
      var c = Ya("0123456789abcdef", u);
      if (c < 0)
        throw ye(this._thisDoc, r, e, t, "bad string literal hex escape");
      var a = a + u, s = s + 1;
    }
    var h = md("0x" + Ja(a, 2, 10) - 0);
    return new ct([i, h]);
  }
}
function ye(n, e, t, r, i) {
  let s = e + 1, a = "Line " + s + " of <" + n + ">: Bad syntax: " + i + `
at: "` + t.slice(r, r + 30) + '"', l = new SyntaxError(a, n, s);
  return l.lineNo = s, l.characterInFile = r, l.syntaxProblem = i, l;
}
const mi = {
  ...Pt,
  supports: {
    [At.collections]: !0,
    [At.defaultGraphType]: !1,
    [At.equalsMethod]: !0,
    [At.identity]: !1,
    [At.id]: !0,
    [At.reversibleId]: !1,
    [At.variableType]: !0
  },
  /**
   * Creates a new collection
   * @param elements - The initial element
   */
  collection(n) {
    return new qt(n);
  },
  id(n) {
    return Di(n) ? `( ${n.elements.map((e) => this.id(e)).join(", ")} )` : Mc(n) ? Vn.toString(n) : Pt.id(n);
  },
  termToNQ(n) {
    return n.termType === An ? qt.toNT(n) : Pt.termToNQ(n);
  }
};
function Fi(n, e) {
  return typeof e == "string" ? n.rdfFactory.literal(e) : Object.prototype.hasOwnProperty.call(e, "@list") ? n.rdfFactory.supports.COLLECTIONS === !0 ? Dd(n, e["@list"]) : Td(n, e) : Object.prototype.hasOwnProperty.call(e, "@id") ? Bi(n, e) : Object.prototype.hasOwnProperty.call(e, "@language") ? n.rdfFactory.literal(e["@value"], e["@language"]) : Object.prototype.hasOwnProperty.call(e, "@type") ? n.rdfFactory.literal(e["@value"], n.rdfFactory.namedNode(e["@type"])) : Object.prototype.hasOwnProperty.call(e, "@value") ? n.rdfFactory.literal(e["@value"]) : n.rdfFactory.literal(e);
}
function Td(n, e) {
  const t = e["@id"] ? Bi(n, e) : n.rdfFactory.blankNode(), r = e["@list"].map((s) => Fi(n, s)), i = ql(n.rdfFactory, t, r);
  return n.addAll(i), t;
}
function Dd(n, e) {
  if (!Array.isArray(e))
    throw new TypeError("Object must be an array");
  return n.rdfFactory.collection(e.map((t) => Fi(n, t)));
}
async function Vl(n, e, t) {
  const r = t && Object.prototype.hasOwnProperty.call(t, "termType") ? t.value : t;
  return (await (await import("./jsonld-Dh5OcNgW.js").then((a) => a.j)).default.flatten(JSON.parse(n), null, {
    base: r
  })).reduce((a, l) => Kl(a, t, l), e);
}
function Bi(n, e) {
  return e["@id"].startsWith("_:") ? n.rdfFactory.blankNode(e["@id"].substring(2)) : n.rdfFactory.namedNode(e["@id"]);
}
function Kl(n, e, t) {
  const r = t["@id"] ? Bi(n, t) : n.rdfFactory.blankNode();
  for (const i of Object.keys(t)) {
    if (i === "@id")
      continue;
    if (i == "@graph") {
      const a = r, l = t[i];
      for (let u = 0; u < l.length; u++)
        n = Kl(n, a, l[u]);
    }
    const s = t[i];
    if (Array.isArray(s))
      for (let a = 0; a < s.length; a++)
        n.addStatement(Js(n, r, i, s[a], e));
    else
      n.addStatement(Js(n, r, i, s, e));
  }
  return n;
}
function Js(n, e, t, r, i) {
  let s, a;
  return t === "@type" ? (s = n.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), a = n.rdfFactory.namedNode(r)) : (s = n.rdfFactory.namedNode(t), a = Fi(n, r)), n.rdfFactory.quad(e, s, a, n.rdfFactory.namedNode(i));
}
var ni = {}, Nr = {}, Ys;
function _d() {
  if (Ys) return Nr;
  Ys = 1, Nr.byteLength = l, Nr.toByteArray = c, Nr.fromByteArray = m;
  for (var n = [], e = [], t = typeof Uint8Array < "u" ? Uint8Array : Array, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = r.length; i < s; ++i)
    n[i] = r[i], e[r.charCodeAt(i)] = i;
  e[45] = 62, e[95] = 63;
  function a(w) {
    var v = w.length;
    if (v % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var C = w.indexOf("=");
    C === -1 && (C = v);
    var T = C === v ? 0 : 4 - C % 4;
    return [C, T];
  }
  function l(w) {
    var v = a(w), C = v[0], T = v[1];
    return (C + T) * 3 / 4 - T;
  }
  function u(w, v, C) {
    return (v + C) * 3 / 4 - C;
  }
  function c(w) {
    var v, C = a(w), T = C[0], B = C[1], O = new t(u(w, T, B)), X = 0, Y = B > 0 ? T - 4 : T, A;
    for (A = 0; A < Y; A += 4)
      v = e[w.charCodeAt(A)] << 18 | e[w.charCodeAt(A + 1)] << 12 | e[w.charCodeAt(A + 2)] << 6 | e[w.charCodeAt(A + 3)], O[X++] = v >> 16 & 255, O[X++] = v >> 8 & 255, O[X++] = v & 255;
    return B === 2 && (v = e[w.charCodeAt(A)] << 2 | e[w.charCodeAt(A + 1)] >> 4, O[X++] = v & 255), B === 1 && (v = e[w.charCodeAt(A)] << 10 | e[w.charCodeAt(A + 1)] << 4 | e[w.charCodeAt(A + 2)] >> 2, O[X++] = v >> 8 & 255, O[X++] = v & 255), O;
  }
  function h(w) {
    return n[w >> 18 & 63] + n[w >> 12 & 63] + n[w >> 6 & 63] + n[w & 63];
  }
  function p(w, v, C) {
    for (var T, B = [], O = v; O < C; O += 3)
      T = (w[O] << 16 & 16711680) + (w[O + 1] << 8 & 65280) + (w[O + 2] & 255), B.push(h(T));
    return B.join("");
  }
  function m(w) {
    for (var v, C = w.length, T = C % 3, B = [], O = 16383, X = 0, Y = C - T; X < Y; X += O)
      B.push(p(w, X, X + O > Y ? Y : X + O));
    return T === 1 ? (v = w[C - 1], B.push(
      n[v >> 2] + n[v << 4 & 63] + "=="
    )) : T === 2 && (v = (w[C - 2] << 8) + w[C - 1], B.push(
      n[v >> 10] + n[v >> 4 & 63] + n[v << 2 & 63] + "="
    )), B.join("");
  }
  return Nr;
}
var ua = {};
var Qs;
function Sd() {
  return Qs || (Qs = 1, ua.read = function(n, e, t, r, i) {
    var s, a, l = i * 8 - r - 1, u = (1 << l) - 1, c = u >> 1, h = -7, p = t ? i - 1 : 0, m = t ? -1 : 1, w = n[e + p];
    for (p += m, s = w & (1 << -h) - 1, w >>= -h, h += l; h > 0; s = s * 256 + n[e + p], p += m, h -= 8)
      ;
    for (a = s & (1 << -h) - 1, s >>= -h, h += r; h > 0; a = a * 256 + n[e + p], p += m, h -= 8)
      ;
    if (s === 0)
      s = 1 - c;
    else {
      if (s === u)
        return a ? NaN : (w ? -1 : 1) * (1 / 0);
      a = a + Math.pow(2, r), s = s - c;
    }
    return (w ? -1 : 1) * a * Math.pow(2, s - r);
  }, ua.write = function(n, e, t, r, i, s) {
    var a, l, u, c = s * 8 - i - 1, h = (1 << c) - 1, p = h >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, w = r ? 0 : s - 1, v = r ? 1 : -1, C = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (l = isNaN(e) ? 1 : 0, a = h) : (a = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), a + p >= 1 ? e += m / u : e += m * Math.pow(2, 1 - p), e * u >= 2 && (a++, u /= 2), a + p >= h ? (l = 0, a = h) : a + p >= 1 ? (l = (e * u - 1) * Math.pow(2, i), a = a + p) : (l = e * Math.pow(2, p - 1) * Math.pow(2, i), a = 0)); i >= 8; n[t + w] = l & 255, w += v, l /= 256, i -= 8)
      ;
    for (a = a << i | l, c += i; c > 0; n[t + w] = a & 255, w += v, a /= 256, c -= 8)
      ;
    n[t + w - v] |= C * 128;
  }), ua;
}
var Zs;
function Id() {
  return Zs || (Zs = 1, (function(n) {
    const e = _d(), t = Sd(), r = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
    n.Buffer = l, n.SlowBuffer = O, n.INSPECT_MAX_BYTES = 50;
    const i = 2147483647;
    n.kMaxLength = i, l.TYPED_ARRAY_SUPPORT = s(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function s() {
      try {
        const N = new Uint8Array(1), f = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(f, Uint8Array.prototype), Object.setPrototypeOf(N, f), N.foo() === 42;
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
      const f = new Uint8Array(N);
      return Object.setPrototypeOf(f, l.prototype), f;
    }
    function l(N, f, g) {
      if (typeof N == "number") {
        if (typeof f == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return p(N);
      }
      return u(N, f, g);
    }
    l.poolSize = 8192;
    function u(N, f, g) {
      if (typeof N == "string")
        return m(N, f);
      if (ArrayBuffer.isView(N))
        return v(N);
      if (N == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N
        );
      if (Oe(N, ArrayBuffer) || N && Oe(N.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Oe(N, SharedArrayBuffer) || N && Oe(N.buffer, SharedArrayBuffer)))
        return C(N, f, g);
      if (typeof N == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const I = N.valueOf && N.valueOf();
      if (I != null && I !== N)
        return l.from(I, f, g);
      const W = T(N);
      if (W) return W;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof N[Symbol.toPrimitive] == "function")
        return l.from(N[Symbol.toPrimitive]("string"), f, g);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N
      );
    }
    l.from = function(N, f, g) {
      return u(N, f, g);
    }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
    function c(N) {
      if (typeof N != "number")
        throw new TypeError('"size" argument must be of type number');
      if (N < 0)
        throw new RangeError('The value "' + N + '" is invalid for option "size"');
    }
    function h(N, f, g) {
      return c(N), N <= 0 ? a(N) : f !== void 0 ? typeof g == "string" ? a(N).fill(f, g) : a(N).fill(f) : a(N);
    }
    l.alloc = function(N, f, g) {
      return h(N, f, g);
    };
    function p(N) {
      return c(N), a(N < 0 ? 0 : B(N) | 0);
    }
    l.allocUnsafe = function(N) {
      return p(N);
    }, l.allocUnsafeSlow = function(N) {
      return p(N);
    };
    function m(N, f) {
      if ((typeof f != "string" || f === "") && (f = "utf8"), !l.isEncoding(f))
        throw new TypeError("Unknown encoding: " + f);
      const g = X(N, f) | 0;
      let I = a(g);
      const W = I.write(N, f);
      return W !== g && (I = I.slice(0, W)), I;
    }
    function w(N) {
      const f = N.length < 0 ? 0 : B(N.length) | 0, g = a(f);
      for (let I = 0; I < f; I += 1)
        g[I] = N[I] & 255;
      return g;
    }
    function v(N) {
      if (Oe(N, Uint8Array)) {
        const f = new Uint8Array(N);
        return C(f.buffer, f.byteOffset, f.byteLength);
      }
      return w(N);
    }
    function C(N, f, g) {
      if (f < 0 || N.byteLength < f)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (N.byteLength < f + (g || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let I;
      return f === void 0 && g === void 0 ? I = new Uint8Array(N) : g === void 0 ? I = new Uint8Array(N, f) : I = new Uint8Array(N, f, g), Object.setPrototypeOf(I, l.prototype), I;
    }
    function T(N) {
      if (l.isBuffer(N)) {
        const f = B(N.length) | 0, g = a(f);
        return g.length === 0 || N.copy(g, 0, 0, f), g;
      }
      if (N.length !== void 0)
        return typeof N.length != "number" || It(N.length) ? a(0) : w(N);
      if (N.type === "Buffer" && Array.isArray(N.data))
        return w(N.data);
    }
    function B(N) {
      if (N >= i)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
      return N | 0;
    }
    function O(N) {
      return +N != N && (N = 0), l.alloc(+N);
    }
    l.isBuffer = function(f) {
      return f != null && f._isBuffer === !0 && f !== l.prototype;
    }, l.compare = function(f, g) {
      if (Oe(f, Uint8Array) && (f = l.from(f, f.offset, f.byteLength)), Oe(g, Uint8Array) && (g = l.from(g, g.offset, g.byteLength)), !l.isBuffer(f) || !l.isBuffer(g))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (f === g) return 0;
      let I = f.length, W = g.length;
      for (let z = 0, te = Math.min(I, W); z < te; ++z)
        if (f[z] !== g[z]) {
          I = f[z], W = g[z];
          break;
        }
      return I < W ? -1 : W < I ? 1 : 0;
    }, l.isEncoding = function(f) {
      switch (String(f).toLowerCase()) {
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
    }, l.concat = function(f, g) {
      if (!Array.isArray(f))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (f.length === 0)
        return l.alloc(0);
      let I;
      if (g === void 0)
        for (g = 0, I = 0; I < f.length; ++I)
          g += f[I].length;
      const W = l.allocUnsafe(g);
      let z = 0;
      for (I = 0; I < f.length; ++I) {
        let te = f[I];
        if (Oe(te, Uint8Array))
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
    function X(N, f) {
      if (l.isBuffer(N))
        return N.length;
      if (ArrayBuffer.isView(N) || Oe(N, ArrayBuffer))
        return N.byteLength;
      if (typeof N != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof N
        );
      const g = N.length, I = arguments.length > 2 && arguments[2] === !0;
      if (!I && g === 0) return 0;
      let W = !1;
      for (; ; )
        switch (f) {
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
            return _t(N).length;
          default:
            if (W)
              return I ? -1 : se(N).length;
            f = ("" + f).toLowerCase(), W = !0;
        }
    }
    l.byteLength = X;
    function Y(N, f, g) {
      let I = !1;
      if ((f === void 0 || f < 0) && (f = 0), f > this.length || ((g === void 0 || g > this.length) && (g = this.length), g <= 0) || (g >>>= 0, f >>>= 0, g <= f))
        return "";
      for (N || (N = "utf8"); ; )
        switch (N) {
          case "hex":
            return ie(this, f, g);
          case "utf8":
          case "utf-8":
            return Q(this, f, g);
          case "ascii":
            return Z(this, f, g);
          case "latin1":
          case "binary":
            return ae(this, f, g);
          case "base64":
            return ee(this, f, g);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return oe(this, f, g);
          default:
            if (I) throw new TypeError("Unknown encoding: " + N);
            N = (N + "").toLowerCase(), I = !0;
        }
    }
    l.prototype._isBuffer = !0;
    function A(N, f, g) {
      const I = N[f];
      N[f] = N[g], N[g] = I;
    }
    l.prototype.swap16 = function() {
      const f = this.length;
      if (f % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let g = 0; g < f; g += 2)
        A(this, g, g + 1);
      return this;
    }, l.prototype.swap32 = function() {
      const f = this.length;
      if (f % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let g = 0; g < f; g += 4)
        A(this, g, g + 3), A(this, g + 1, g + 2);
      return this;
    }, l.prototype.swap64 = function() {
      const f = this.length;
      if (f % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let g = 0; g < f; g += 8)
        A(this, g, g + 7), A(this, g + 1, g + 6), A(this, g + 2, g + 5), A(this, g + 3, g + 4);
      return this;
    }, l.prototype.toString = function() {
      const f = this.length;
      return f === 0 ? "" : arguments.length === 0 ? Q(this, 0, f) : Y.apply(this, arguments);
    }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(f) {
      if (!l.isBuffer(f)) throw new TypeError("Argument must be a Buffer");
      return this === f ? !0 : l.compare(this, f) === 0;
    }, l.prototype.inspect = function() {
      let f = "";
      const g = n.INSPECT_MAX_BYTES;
      return f = this.toString("hex", 0, g).replace(/(.{2})/g, "$1 ").trim(), this.length > g && (f += " ... "), "<Buffer " + f + ">";
    }, r && (l.prototype[r] = l.prototype.inspect), l.prototype.compare = function(f, g, I, W, z) {
      if (Oe(f, Uint8Array) && (f = l.from(f, f.offset, f.byteLength)), !l.isBuffer(f))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof f
        );
      if (g === void 0 && (g = 0), I === void 0 && (I = f ? f.length : 0), W === void 0 && (W = 0), z === void 0 && (z = this.length), g < 0 || I > f.length || W < 0 || z > this.length)
        throw new RangeError("out of range index");
      if (W >= z && g >= I)
        return 0;
      if (W >= z)
        return -1;
      if (g >= I)
        return 1;
      if (g >>>= 0, I >>>= 0, W >>>= 0, z >>>= 0, this === f) return 0;
      let te = z - W, Ae = I - g;
      const Ke = Math.min(te, Ae), Me = this.slice(W, z), He = f.slice(g, I);
      for (let Be = 0; Be < Ke; ++Be)
        if (Me[Be] !== He[Be]) {
          te = Me[Be], Ae = He[Be];
          break;
        }
      return te < Ae ? -1 : Ae < te ? 1 : 0;
    };
    function K(N, f, g, I, W) {
      if (N.length === 0) return -1;
      if (typeof g == "string" ? (I = g, g = 0) : g > 2147483647 ? g = 2147483647 : g < -2147483648 && (g = -2147483648), g = +g, It(g) && (g = W ? 0 : N.length - 1), g < 0 && (g = N.length + g), g >= N.length) {
        if (W) return -1;
        g = N.length - 1;
      } else if (g < 0)
        if (W) g = 0;
        else return -1;
      if (typeof f == "string" && (f = l.from(f, I)), l.isBuffer(f))
        return f.length === 0 ? -1 : P(N, f, g, I, W);
      if (typeof f == "number")
        return f = f & 255, typeof Uint8Array.prototype.indexOf == "function" ? W ? Uint8Array.prototype.indexOf.call(N, f, g) : Uint8Array.prototype.lastIndexOf.call(N, f, g) : P(N, [f], g, I, W);
      throw new TypeError("val must be string, number or Buffer");
    }
    function P(N, f, g, I, W) {
      let z = 1, te = N.length, Ae = f.length;
      if (I !== void 0 && (I = String(I).toLowerCase(), I === "ucs2" || I === "ucs-2" || I === "utf16le" || I === "utf-16le")) {
        if (N.length < 2 || f.length < 2)
          return -1;
        z = 2, te /= 2, Ae /= 2, g /= 2;
      }
      function Ke(He, Be) {
        return z === 1 ? He[Be] : He.readUInt16BE(Be * z);
      }
      let Me;
      if (W) {
        let He = -1;
        for (Me = g; Me < te; Me++)
          if (Ke(N, Me) === Ke(f, He === -1 ? 0 : Me - He)) {
            if (He === -1 && (He = Me), Me - He + 1 === Ae) return He * z;
          } else
            He !== -1 && (Me -= Me - He), He = -1;
      } else
        for (g + Ae > te && (g = te - Ae), Me = g; Me >= 0; Me--) {
          let He = !0;
          for (let Be = 0; Be < Ae; Be++)
            if (Ke(N, Me + Be) !== Ke(f, Be)) {
              He = !1;
              break;
            }
          if (He) return Me;
        }
      return -1;
    }
    l.prototype.includes = function(f, g, I) {
      return this.indexOf(f, g, I) !== -1;
    }, l.prototype.indexOf = function(f, g, I) {
      return K(this, f, g, I, !0);
    }, l.prototype.lastIndexOf = function(f, g, I) {
      return K(this, f, g, I, !1);
    };
    function G(N, f, g, I) {
      g = Number(g) || 0;
      const W = N.length - g;
      I ? (I = Number(I), I > W && (I = W)) : I = W;
      const z = f.length;
      I > z / 2 && (I = z / 2);
      let te;
      for (te = 0; te < I; ++te) {
        const Ae = parseInt(f.substr(te * 2, 2), 16);
        if (It(Ae)) return te;
        N[g + te] = Ae;
      }
      return te;
    }
    function R(N, f, g, I) {
      return ke(se(f, N.length - g), N, g, I);
    }
    function H(N, f, g, I) {
      return ke(Ie(f), N, g, I);
    }
    function $(N, f, g, I) {
      return ke(_t(f), N, g, I);
    }
    function q(N, f, g, I) {
      return ke(lt(f, N.length - g), N, g, I);
    }
    l.prototype.write = function(f, g, I, W) {
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
      if ((I === void 0 || I > z) && (I = z), f.length > 0 && (I < 0 || g < 0) || g > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      W || (W = "utf8");
      let te = !1;
      for (; ; )
        switch (W) {
          case "hex":
            return G(this, f, g, I);
          case "utf8":
          case "utf-8":
            return R(this, f, g, I);
          case "ascii":
          case "latin1":
          case "binary":
            return H(this, f, g, I);
          case "base64":
            return $(this, f, g, I);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return q(this, f, g, I);
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
    function ee(N, f, g) {
      return f === 0 && g === N.length ? e.fromByteArray(N) : e.fromByteArray(N.slice(f, g));
    }
    function Q(N, f, g) {
      g = Math.min(N.length, g);
      const I = [];
      let W = f;
      for (; W < g; ) {
        const z = N[W];
        let te = null, Ae = z > 239 ? 4 : z > 223 ? 3 : z > 191 ? 2 : 1;
        if (W + Ae <= g) {
          let Ke, Me, He, Be;
          switch (Ae) {
            case 1:
              z < 128 && (te = z);
              break;
            case 2:
              Ke = N[W + 1], (Ke & 192) === 128 && (Be = (z & 31) << 6 | Ke & 63, Be > 127 && (te = Be));
              break;
            case 3:
              Ke = N[W + 1], Me = N[W + 2], (Ke & 192) === 128 && (Me & 192) === 128 && (Be = (z & 15) << 12 | (Ke & 63) << 6 | Me & 63, Be > 2047 && (Be < 55296 || Be > 57343) && (te = Be));
              break;
            case 4:
              Ke = N[W + 1], Me = N[W + 2], He = N[W + 3], (Ke & 192) === 128 && (Me & 192) === 128 && (He & 192) === 128 && (Be = (z & 15) << 18 | (Ke & 63) << 12 | (Me & 63) << 6 | He & 63, Be > 65535 && Be < 1114112 && (te = Be));
          }
        }
        te === null ? (te = 65533, Ae = 1) : te > 65535 && (te -= 65536, I.push(te >>> 10 & 1023 | 55296), te = 56320 | te & 1023), I.push(te), W += Ae;
      }
      return V(I);
    }
    const _ = 4096;
    function V(N) {
      const f = N.length;
      if (f <= _)
        return String.fromCharCode.apply(String, N);
      let g = "", I = 0;
      for (; I < f; )
        g += String.fromCharCode.apply(
          String,
          N.slice(I, I += _)
        );
      return g;
    }
    function Z(N, f, g) {
      let I = "";
      g = Math.min(N.length, g);
      for (let W = f; W < g; ++W)
        I += String.fromCharCode(N[W] & 127);
      return I;
    }
    function ae(N, f, g) {
      let I = "";
      g = Math.min(N.length, g);
      for (let W = f; W < g; ++W)
        I += String.fromCharCode(N[W]);
      return I;
    }
    function ie(N, f, g) {
      const I = N.length;
      (!f || f < 0) && (f = 0), (!g || g < 0 || g > I) && (g = I);
      let W = "";
      for (let z = f; z < g; ++z)
        W += on[N[z]];
      return W;
    }
    function oe(N, f, g) {
      const I = N.slice(f, g);
      let W = "";
      for (let z = 0; z < I.length - 1; z += 2)
        W += String.fromCharCode(I[z] + I[z + 1] * 256);
      return W;
    }
    l.prototype.slice = function(f, g) {
      const I = this.length;
      f = ~~f, g = g === void 0 ? I : ~~g, f < 0 ? (f += I, f < 0 && (f = 0)) : f > I && (f = I), g < 0 ? (g += I, g < 0 && (g = 0)) : g > I && (g = I), g < f && (g = f);
      const W = this.subarray(f, g);
      return Object.setPrototypeOf(W, l.prototype), W;
    };
    function ne(N, f, g) {
      if (N % 1 !== 0 || N < 0) throw new RangeError("offset is not uint");
      if (N + f > g) throw new RangeError("Trying to access beyond buffer length");
    }
    l.prototype.readUintLE = l.prototype.readUIntLE = function(f, g, I) {
      f = f >>> 0, g = g >>> 0, I || ne(f, g, this.length);
      let W = this[f], z = 1, te = 0;
      for (; ++te < g && (z *= 256); )
        W += this[f + te] * z;
      return W;
    }, l.prototype.readUintBE = l.prototype.readUIntBE = function(f, g, I) {
      f = f >>> 0, g = g >>> 0, I || ne(f, g, this.length);
      let W = this[f + --g], z = 1;
      for (; g > 0 && (z *= 256); )
        W += this[f + --g] * z;
      return W;
    }, l.prototype.readUint8 = l.prototype.readUInt8 = function(f, g) {
      return f = f >>> 0, g || ne(f, 1, this.length), this[f];
    }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(f, g) {
      return f = f >>> 0, g || ne(f, 2, this.length), this[f] | this[f + 1] << 8;
    }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(f, g) {
      return f = f >>> 0, g || ne(f, 2, this.length), this[f] << 8 | this[f + 1];
    }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(f, g) {
      return f = f >>> 0, g || ne(f, 4, this.length), (this[f] | this[f + 1] << 8 | this[f + 2] << 16) + this[f + 3] * 16777216;
    }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(f, g) {
      return f = f >>> 0, g || ne(f, 4, this.length), this[f] * 16777216 + (this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3]);
    }, l.prototype.readBigUInt64LE = Ct(function(f) {
      f = f >>> 0, Re(f, "offset");
      const g = this[f], I = this[f + 7];
      (g === void 0 || I === void 0) && _e(f, this.length - 8);
      const W = g + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24, z = this[++f] + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + I * 2 ** 24;
      return BigInt(W) + (BigInt(z) << BigInt(32));
    }), l.prototype.readBigUInt64BE = Ct(function(f) {
      f = f >>> 0, Re(f, "offset");
      const g = this[f], I = this[f + 7];
      (g === void 0 || I === void 0) && _e(f, this.length - 8);
      const W = g * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f], z = this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + I;
      return (BigInt(W) << BigInt(32)) + BigInt(z);
    }), l.prototype.readIntLE = function(f, g, I) {
      f = f >>> 0, g = g >>> 0, I || ne(f, g, this.length);
      let W = this[f], z = 1, te = 0;
      for (; ++te < g && (z *= 256); )
        W += this[f + te] * z;
      return z *= 128, W >= z && (W -= Math.pow(2, 8 * g)), W;
    }, l.prototype.readIntBE = function(f, g, I) {
      f = f >>> 0, g = g >>> 0, I || ne(f, g, this.length);
      let W = g, z = 1, te = this[f + --W];
      for (; W > 0 && (z *= 256); )
        te += this[f + --W] * z;
      return z *= 128, te >= z && (te -= Math.pow(2, 8 * g)), te;
    }, l.prototype.readInt8 = function(f, g) {
      return f = f >>> 0, g || ne(f, 1, this.length), this[f] & 128 ? (255 - this[f] + 1) * -1 : this[f];
    }, l.prototype.readInt16LE = function(f, g) {
      f = f >>> 0, g || ne(f, 2, this.length);
      const I = this[f] | this[f + 1] << 8;
      return I & 32768 ? I | 4294901760 : I;
    }, l.prototype.readInt16BE = function(f, g) {
      f = f >>> 0, g || ne(f, 2, this.length);
      const I = this[f + 1] | this[f] << 8;
      return I & 32768 ? I | 4294901760 : I;
    }, l.prototype.readInt32LE = function(f, g) {
      return f = f >>> 0, g || ne(f, 4, this.length), this[f] | this[f + 1] << 8 | this[f + 2] << 16 | this[f + 3] << 24;
    }, l.prototype.readInt32BE = function(f, g) {
      return f = f >>> 0, g || ne(f, 4, this.length), this[f] << 24 | this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3];
    }, l.prototype.readBigInt64LE = Ct(function(f) {
      f = f >>> 0, Re(f, "offset");
      const g = this[f], I = this[f + 7];
      (g === void 0 || I === void 0) && _e(f, this.length - 8);
      const W = this[f + 4] + this[f + 5] * 2 ** 8 + this[f + 6] * 2 ** 16 + (I << 24);
      return (BigInt(W) << BigInt(32)) + BigInt(g + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24);
    }), l.prototype.readBigInt64BE = Ct(function(f) {
      f = f >>> 0, Re(f, "offset");
      const g = this[f], I = this[f + 7];
      (g === void 0 || I === void 0) && _e(f, this.length - 8);
      const W = (g << 24) + // Overflow
      this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f];
      return (BigInt(W) << BigInt(32)) + BigInt(this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + I);
    }), l.prototype.readFloatLE = function(f, g) {
      return f = f >>> 0, g || ne(f, 4, this.length), t.read(this, f, !0, 23, 4);
    }, l.prototype.readFloatBE = function(f, g) {
      return f = f >>> 0, g || ne(f, 4, this.length), t.read(this, f, !1, 23, 4);
    }, l.prototype.readDoubleLE = function(f, g) {
      return f = f >>> 0, g || ne(f, 8, this.length), t.read(this, f, !0, 52, 8);
    }, l.prototype.readDoubleBE = function(f, g) {
      return f = f >>> 0, g || ne(f, 8, this.length), t.read(this, f, !1, 52, 8);
    };
    function ge(N, f, g, I, W, z) {
      if (!l.isBuffer(N)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (f > W || f < z) throw new RangeError('"value" argument is out of bounds');
      if (g + I > N.length) throw new RangeError("Index out of range");
    }
    l.prototype.writeUintLE = l.prototype.writeUIntLE = function(f, g, I, W) {
      if (f = +f, g = g >>> 0, I = I >>> 0, !W) {
        const Ae = Math.pow(2, 8 * I) - 1;
        ge(this, f, g, I, Ae, 0);
      }
      let z = 1, te = 0;
      for (this[g] = f & 255; ++te < I && (z *= 256); )
        this[g + te] = f / z & 255;
      return g + I;
    }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(f, g, I, W) {
      if (f = +f, g = g >>> 0, I = I >>> 0, !W) {
        const Ae = Math.pow(2, 8 * I) - 1;
        ge(this, f, g, I, Ae, 0);
      }
      let z = I - 1, te = 1;
      for (this[g + z] = f & 255; --z >= 0 && (te *= 256); )
        this[g + z] = f / te & 255;
      return g + I;
    }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 1, 255, 0), this[g] = f & 255, g + 1;
    }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 2, 65535, 0), this[g] = f & 255, this[g + 1] = f >>> 8, g + 2;
    }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 2, 65535, 0), this[g] = f >>> 8, this[g + 1] = f & 255, g + 2;
    }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 4, 4294967295, 0), this[g + 3] = f >>> 24, this[g + 2] = f >>> 16, this[g + 1] = f >>> 8, this[g] = f & 255, g + 4;
    }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 4, 4294967295, 0), this[g] = f >>> 24, this[g + 1] = f >>> 16, this[g + 2] = f >>> 8, this[g + 3] = f & 255, g + 4;
    };
    function Le(N, f, g, I, W) {
      De(f, I, W, N, g, 7);
      let z = Number(f & BigInt(4294967295));
      N[g++] = z, z = z >> 8, N[g++] = z, z = z >> 8, N[g++] = z, z = z >> 8, N[g++] = z;
      let te = Number(f >> BigInt(32) & BigInt(4294967295));
      return N[g++] = te, te = te >> 8, N[g++] = te, te = te >> 8, N[g++] = te, te = te >> 8, N[g++] = te, g;
    }
    function pe(N, f, g, I, W) {
      De(f, I, W, N, g, 7);
      let z = Number(f & BigInt(4294967295));
      N[g + 7] = z, z = z >> 8, N[g + 6] = z, z = z >> 8, N[g + 5] = z, z = z >> 8, N[g + 4] = z;
      let te = Number(f >> BigInt(32) & BigInt(4294967295));
      return N[g + 3] = te, te = te >> 8, N[g + 2] = te, te = te >> 8, N[g + 1] = te, te = te >> 8, N[g] = te, g + 8;
    }
    l.prototype.writeBigUInt64LE = Ct(function(f, g = 0) {
      return Le(this, f, g, BigInt(0), BigInt("0xffffffffffffffff"));
    }), l.prototype.writeBigUInt64BE = Ct(function(f, g = 0) {
      return pe(this, f, g, BigInt(0), BigInt("0xffffffffffffffff"));
    }), l.prototype.writeIntLE = function(f, g, I, W) {
      if (f = +f, g = g >>> 0, !W) {
        const Ke = Math.pow(2, 8 * I - 1);
        ge(this, f, g, I, Ke - 1, -Ke);
      }
      let z = 0, te = 1, Ae = 0;
      for (this[g] = f & 255; ++z < I && (te *= 256); )
        f < 0 && Ae === 0 && this[g + z - 1] !== 0 && (Ae = 1), this[g + z] = (f / te >> 0) - Ae & 255;
      return g + I;
    }, l.prototype.writeIntBE = function(f, g, I, W) {
      if (f = +f, g = g >>> 0, !W) {
        const Ke = Math.pow(2, 8 * I - 1);
        ge(this, f, g, I, Ke - 1, -Ke);
      }
      let z = I - 1, te = 1, Ae = 0;
      for (this[g + z] = f & 255; --z >= 0 && (te *= 256); )
        f < 0 && Ae === 0 && this[g + z + 1] !== 0 && (Ae = 1), this[g + z] = (f / te >> 0) - Ae & 255;
      return g + I;
    }, l.prototype.writeInt8 = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 1, 127, -128), f < 0 && (f = 255 + f + 1), this[g] = f & 255, g + 1;
    }, l.prototype.writeInt16LE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 2, 32767, -32768), this[g] = f & 255, this[g + 1] = f >>> 8, g + 2;
    }, l.prototype.writeInt16BE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 2, 32767, -32768), this[g] = f >>> 8, this[g + 1] = f & 255, g + 2;
    }, l.prototype.writeInt32LE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 4, 2147483647, -2147483648), this[g] = f & 255, this[g + 1] = f >>> 8, this[g + 2] = f >>> 16, this[g + 3] = f >>> 24, g + 4;
    }, l.prototype.writeInt32BE = function(f, g, I) {
      return f = +f, g = g >>> 0, I || ge(this, f, g, 4, 2147483647, -2147483648), f < 0 && (f = 4294967295 + f + 1), this[g] = f >>> 24, this[g + 1] = f >>> 16, this[g + 2] = f >>> 8, this[g + 3] = f & 255, g + 4;
    }, l.prototype.writeBigInt64LE = Ct(function(f, g = 0) {
      return Le(this, f, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), l.prototype.writeBigInt64BE = Ct(function(f, g = 0) {
      return pe(this, f, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function Ce(N, f, g, I, W, z) {
      if (g + I > N.length) throw new RangeError("Index out of range");
      if (g < 0) throw new RangeError("Index out of range");
    }
    function Pe(N, f, g, I, W) {
      return f = +f, g = g >>> 0, W || Ce(N, f, g, 4), t.write(N, f, g, I, 23, 4), g + 4;
    }
    l.prototype.writeFloatLE = function(f, g, I) {
      return Pe(this, f, g, !0, I);
    }, l.prototype.writeFloatBE = function(f, g, I) {
      return Pe(this, f, g, !1, I);
    };
    function Ye(N, f, g, I, W) {
      return f = +f, g = g >>> 0, W || Ce(N, f, g, 8), t.write(N, f, g, I, 52, 8), g + 8;
    }
    l.prototype.writeDoubleLE = function(f, g, I) {
      return Ye(this, f, g, !0, I);
    }, l.prototype.writeDoubleBE = function(f, g, I) {
      return Ye(this, f, g, !1, I);
    }, l.prototype.copy = function(f, g, I, W) {
      if (!l.isBuffer(f)) throw new TypeError("argument should be a Buffer");
      if (I || (I = 0), !W && W !== 0 && (W = this.length), g >= f.length && (g = f.length), g || (g = 0), W > 0 && W < I && (W = I), W === I || f.length === 0 || this.length === 0) return 0;
      if (g < 0)
        throw new RangeError("targetStart out of bounds");
      if (I < 0 || I >= this.length) throw new RangeError("Index out of range");
      if (W < 0) throw new RangeError("sourceEnd out of bounds");
      W > this.length && (W = this.length), f.length - g < W - I && (W = f.length - g + I);
      const z = W - I;
      return this === f && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(g, I, W) : Uint8Array.prototype.set.call(
        f,
        this.subarray(I, W),
        g
      ), z;
    }, l.prototype.fill = function(f, g, I, W) {
      if (typeof f == "string") {
        if (typeof g == "string" ? (W = g, g = 0, I = this.length) : typeof I == "string" && (W = I, I = this.length), W !== void 0 && typeof W != "string")
          throw new TypeError("encoding must be a string");
        if (typeof W == "string" && !l.isEncoding(W))
          throw new TypeError("Unknown encoding: " + W);
        if (f.length === 1) {
          const te = f.charCodeAt(0);
          (W === "utf8" && te < 128 || W === "latin1") && (f = te);
        }
      } else typeof f == "number" ? f = f & 255 : typeof f == "boolean" && (f = Number(f));
      if (g < 0 || this.length < g || this.length < I)
        throw new RangeError("Out of range index");
      if (I <= g)
        return this;
      g = g >>> 0, I = I === void 0 ? this.length : I >>> 0, f || (f = 0);
      let z;
      if (typeof f == "number")
        for (z = g; z < I; ++z)
          this[z] = f;
      else {
        const te = l.isBuffer(f) ? f : l.from(f, W), Ae = te.length;
        if (Ae === 0)
          throw new TypeError('The value "' + f + '" is invalid for argument "value"');
        for (z = 0; z < I - g; ++z)
          this[z + g] = te[z % Ae];
      }
      return this;
    };
    const Te = {};
    function qe(N, f, g) {
      Te[N] = class extends g {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: f.apply(this, arguments),
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
      function(N, f) {
        return `The "${N}" argument must be of type number. Received type ${typeof f}`;
      },
      TypeError
    ), qe(
      "ERR_OUT_OF_RANGE",
      function(N, f, g) {
        let I = `The value of "${N}" is out of range.`, W = g;
        return Number.isInteger(g) && Math.abs(g) > 2 ** 32 ? W = ht(String(g)) : typeof g == "bigint" && (W = String(g), (g > BigInt(2) ** BigInt(32) || g < -(BigInt(2) ** BigInt(32))) && (W = ht(W)), W += "n"), I += ` It must be ${f}. Received ${W}`, I;
      },
      RangeError
    );
    function ht(N) {
      let f = "", g = N.length;
      const I = N[0] === "-" ? 1 : 0;
      for (; g >= I + 4; g -= 3)
        f = `_${N.slice(g - 3, g)}${f}`;
      return `${N.slice(0, g)}${f}`;
    }
    function it(N, f, g) {
      Re(f, "offset"), (N[f] === void 0 || N[f + g] === void 0) && _e(f, N.length - (g + 1));
    }
    function De(N, f, g, I, W, z) {
      if (N > g || N < f) {
        const te = typeof f == "bigint" ? "n" : "";
        let Ae;
        throw f === 0 || f === BigInt(0) ? Ae = `>= 0${te} and < 2${te} ** ${(z + 1) * 8}${te}` : Ae = `>= -(2${te} ** ${(z + 1) * 8 - 1}${te}) and < 2 ** ${(z + 1) * 8 - 1}${te}`, new Te.ERR_OUT_OF_RANGE("value", Ae, N);
      }
      it(I, W, z);
    }
    function Re(N, f) {
      if (typeof N != "number")
        throw new Te.ERR_INVALID_ARG_TYPE(f, "number", N);
    }
    function _e(N, f, g) {
      throw Math.floor(N) !== N ? (Re(N, g), new Te.ERR_OUT_OF_RANGE("offset", "an integer", N)) : f < 0 ? new Te.ERR_BUFFER_OUT_OF_BOUNDS() : new Te.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${f}`,
        N
      );
    }
    const Et = /[^+/0-9A-Za-z-_]/g;
    function Ve(N) {
      if (N = N.split("=")[0], N = N.trim().replace(Et, ""), N.length < 2) return "";
      for (; N.length % 4 !== 0; )
        N = N + "=";
      return N;
    }
    function se(N, f) {
      f = f || 1 / 0;
      let g;
      const I = N.length;
      let W = null;
      const z = [];
      for (let te = 0; te < I; ++te) {
        if (g = N.charCodeAt(te), g > 55295 && g < 57344) {
          if (!W) {
            if (g > 56319) {
              (f -= 3) > -1 && z.push(239, 191, 189);
              continue;
            } else if (te + 1 === I) {
              (f -= 3) > -1 && z.push(239, 191, 189);
              continue;
            }
            W = g;
            continue;
          }
          if (g < 56320) {
            (f -= 3) > -1 && z.push(239, 191, 189), W = g;
            continue;
          }
          g = (W - 55296 << 10 | g - 56320) + 65536;
        } else W && (f -= 3) > -1 && z.push(239, 191, 189);
        if (W = null, g < 128) {
          if ((f -= 1) < 0) break;
          z.push(g);
        } else if (g < 2048) {
          if ((f -= 2) < 0) break;
          z.push(
            g >> 6 | 192,
            g & 63 | 128
          );
        } else if (g < 65536) {
          if ((f -= 3) < 0) break;
          z.push(
            g >> 12 | 224,
            g >> 6 & 63 | 128,
            g & 63 | 128
          );
        } else if (g < 1114112) {
          if ((f -= 4) < 0) break;
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
    function Ie(N) {
      const f = [];
      for (let g = 0; g < N.length; ++g)
        f.push(N.charCodeAt(g) & 255);
      return f;
    }
    function lt(N, f) {
      let g, I, W;
      const z = [];
      for (let te = 0; te < N.length && !((f -= 2) < 0); ++te)
        g = N.charCodeAt(te), I = g >> 8, W = g % 256, z.push(W), z.push(I);
      return z;
    }
    function _t(N) {
      return e.toByteArray(Ve(N));
    }
    function ke(N, f, g, I) {
      let W;
      for (W = 0; W < I && !(W + g >= f.length || W >= N.length); ++W)
        f[W + g] = N[W];
      return W;
    }
    function Oe(N, f) {
      return N instanceof f || N != null && N.constructor != null && N.constructor.name != null && N.constructor.name === f.name;
    }
    function It(N) {
      return N !== N;
    }
    const on = (function() {
      const N = "0123456789abcdef", f = new Array(256);
      for (let g = 0; g < 16; ++g) {
        const I = g * 16;
        for (let W = 0; W < 16; ++W)
          f[I + W] = N[g] + N[W];
      }
      return f;
    })();
    function Ct(N) {
      return typeof BigInt > "u" ? Tn : N;
    }
    function Tn() {
      throw new Error("BigInt not supported");
    }
  })(ni)), ni;
}
var Fd = Id();
const Ar = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", xr = "http://www.w3.org/2001/XMLSchema#", ca = "http://www.w3.org/2000/10/swap/", Ut = {
  xsd: {
    decimal: `${xr}decimal`,
    boolean: `${xr}boolean`,
    double: `${xr}double`,
    integer: `${xr}integer`,
    string: `${xr}string`
  },
  rdf: {
    type: `${Ar}type`,
    nil: `${Ar}nil`,
    first: `${Ar}first`,
    rest: `${Ar}rest`,
    langString: `${Ar}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${ca}reify#forSome`,
    forAll: `${ca}reify#forAll`
  },
  log: {
    implies: `${ca}log#implies`,
    isImpliedBy: `${ca}log#isImpliedBy`
  }
}, { xsd: da } = Ut, Bd = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, el = {
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
}, Ld = /[\x00-\x20<>\\"\{\}\|\^\`]/, Rd = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Od = /$0^/;
class kd {
  constructor(e) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, e = e || {}, this._isImpliedBy = e.isImpliedBy, this._lineMode = !!e.lineMode) {
      this._n3Mode = !1;
      for (const t in this)
        !(t in Rd) && this[t] instanceof RegExp && (this[t] = Od);
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
      let p = "", m = "", w = "", v = null, C = 0, T = !1;
      switch (h) {
        case "^":
          if (r.length < 3)
            break;
          if (r[1] === "^") {
            if (this._previousMarker = "^^", r = r.substr(2), r[0] !== "<") {
              T = !0;
              break;
            }
          } else {
            this._n3Mode && (C = 1, p = "^");
            break;
          }
        // Fall through in case the type is an IRI
        case "<":
          if (v = this._unescapedIri.exec(r))
            p = "IRI", m = v[1];
          else if (v = this._iri.exec(r)) {
            if (m = this._unescape(v[1]), m === null || Ld.test(m))
              return a(this);
            p = "IRI";
          } else r.length > 1 && r[1] === "<" ? (p = "<<", C = 2) : this._n3Mode && r.length > 1 && r[1] === "=" && (C = 2, this._isImpliedBy ? (p = "abbreviation", m = "<") : (p = "inverse", m = ">"));
          break;
        case ">":
          r.length > 1 && r[1] === ">" && (p = ">>", C = 2);
          break;
        case "_":
          ((v = this._blank.exec(r)) || t && (v = this._blank.exec(`${r} `))) && (p = "blank", w = "_", m = v[1]);
          break;
        case '"':
          if (v = this._simpleQuotedString.exec(r))
            m = v[1];
          else if ({ value: m, matchLength: C } = this._parseLiteral(r), m === null)
            return a(this);
          (v !== null || C !== 0) && (p = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (v = this._simpleApostropheString.exec(r))
              m = v[1];
            else if ({ value: m, matchLength: C } = this._parseLiteral(r), m === null)
              return a(this);
            (v !== null || C !== 0) && (p = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (v = this._variable.exec(r)) && (p = "var", m = v[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (v = this._langcode.exec(r)) ? (p = "langcode", m = v[1]) : (v = this._keyword.exec(r)) && (p = v[0]);
          break;
        case ".":
          if (r.length === 1 ? t : r[1] < "0" || r[1] > "9") {
            p = ".", C = 1;
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
          (v = this._number.exec(r) || t && (v = this._number.exec(`${r} `))) && (p = "literal", m = v[0], w = typeof v[1] == "string" ? da.double : typeof v[2] == "string" ? da.decimal : da.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (v = this._sparqlKeyword.exec(r)) ? p = v[0].toUpperCase() : T = !0;
          break;
        case "f":
        case "t":
          (v = this._boolean.exec(r)) ? (p = "literal", m = v[0], w = da.boolean) : T = !0;
          break;
        case "a":
          (v = this._shortPredicates.exec(r)) ? (p = "abbreviation", m = "a") : T = !0;
          break;
        case "=":
          this._n3Mode && r.length > 1 && (p = "abbreviation", r[1] !== ">" ? (C = 1, m = "=") : (C = 2, m = ">"));
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
          this._lineMode || (C = 1, p = h);
          break;
        case "{":
          !this._lineMode && r.length >= 2 && (r[1] === "|" ? (p = "{|", C = 2) : (p = h, C = 1));
          break;
        case "|":
          r.length >= 2 && r[1] === "}" && (p = "|}", C = 2);
          break;
        default:
          T = !0;
      }
      if (T && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (v = this._prefix.exec(r)) ? (p = "prefix", m = v[1] || "") : ((v = this._prefixed.exec(r)) || t && (v = this._prefixed.exec(`${r} `))) && (p = "prefixed", w = v[1] || "", m = this._unescape(v[2]))), this._previousMarker === "^^")
        switch (p) {
          case "prefixed":
            p = "type";
            break;
          case "IRI":
            p = "typeIRI";
            break;
          default:
            p = "";
        }
      if (!p)
        return t || !/^'''|^"""/.test(r) && /\n|\r/.test(r) ? a(this) : this._input = r;
      const B = C || v[0].length, O = s(p, m, w, c, B);
      this.previousToken = O, this._previousMarker = p, r = r.substr(B, r.length);
    }
    function s(l, u, c, h, p) {
      const m = r ? i - r.length : i, w = m + p, v = { type: l, value: u, prefix: c, line: h, start: m, end: w };
      return e(null, v), v;
    }
    function a(l) {
      e(l._syntaxError(/^\S*/.exec(r)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(e) {
    let t = !1;
    const r = e.replace(Bd, (i, s, a, l) => {
      if (typeof s == "string")
        return String.fromCharCode(Number.parseInt(s, 16));
      if (typeof a == "string") {
        let u = Number.parseInt(a, 16);
        return u <= 65535 ? String.fromCharCode(Number.parseInt(a, 16)) : String.fromCharCode(55296 + ((u -= 65536) >> 10), 56320 + (u & 1023));
      }
      return l in el ? el[l] : (t = !0, "");
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
const { rdf: Ud, xsd: rr } = Ut;
let $r, Pd = 0;
const Md = {
  namedNode: jl,
  blankNode: zl,
  variable: Yl,
  literal: Jl,
  defaultGraph: Wd,
  quad: gi,
  triple: gi,
  fromTerm: Sr,
  fromQuad: Ql
};
class yn {
  constructor(e) {
    this.id = e;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof yn ? this.id === e.id : !!e && this.termType === e.termType && this.value === e.value;
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
class Gl extends yn {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class Ir extends yn {
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
    return new Gl(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const e = this.id, t = e.lastIndexOf('"') + 1, r = t < e.length ? e[t] : "";
    return r === "^" ? e.substr(t + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      r !== "@" ? rr.string : Ud.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof Ir ? this.id === e.id : !!e && !!e.datatype && this.termType === e.termType && this.value === e.value && this.language === e.language && this.datatype.value === e.datatype.value;
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
class $d extends yn {
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
class qd extends yn {
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
class Hd extends yn {
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
$r = new Hd();
class Xl extends yn {
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
function jl(n) {
  return new Gl(n);
}
function zl(n) {
  return new $d(n || `n3-${Pd++}`);
}
function Jl(n, e) {
  if (typeof e == "string")
    return new Ir(`"${n}"@${e.toLowerCase()}`);
  let t = e ? e.value : "";
  return t === "" && (typeof n == "boolean" ? t = rr.boolean : typeof n == "number" && (Number.isFinite(n) ? t = Number.isInteger(n) ? rr.integer : rr.double : (t = rr.double, Number.isNaN(n) || (n = n > 0 ? "INF" : "-INF")))), t === "" || t === rr.string ? new Ir(`"${n}"`) : new Ir(`"${n}"^^${t}`);
}
function Yl(n) {
  return new qd(n);
}
function Wd() {
  return $r;
}
function gi(n, e, t, r) {
  return new Xl(n, e, t, r);
}
function Sr(n) {
  if (n instanceof yn)
    return n;
  switch (n.termType) {
    case "NamedNode":
      return jl(n.value);
    case "BlankNode":
      return zl(n.value);
    case "Variable":
      return Yl(n.value);
    case "DefaultGraph":
      return $r;
    case "Literal":
      return Jl(n.value, n.language || n.datatype);
    case "Quad":
      return Ql(n);
    default:
      throw new Error(`Unexpected termType: ${n.termType}`);
  }
}
function Ql(n) {
  if (n instanceof Xl)
    return n;
  if (n.termType !== "Quad")
    throw new Error(`Unexpected termType: ${n.termType}`);
  return gi(Sr(n.subject), Sr(n.predicate), Sr(n.object), Sr(n.graph));
}
let tl = 0;
class Zl {
  constructor(e) {
    this._contextStack = [], this._graph = null, e = e || {}, this._setBase(e.baseIRI), e.factory && eo(this, e.factory);
    const t = typeof e.format == "string" ? e.format.match(/\w*$/)[0].toLowerCase() : "", r = /turtle/.test(t), i = /trig/.test(t), s = /triple/.test(t), a = /quad/.test(t), l = this._n3Mode = /n3/.test(t), u = s || a;
    (this._supportsNamedGraphs = !(r || l)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(r || i || s || l), this._isImpliedBy = e.isImpliedBy, this._supportsRDFStar = t === "" || /star|\*$/.test(t), u && (this._resolveRelativeIRI = (c) => null), this._blankNodePrefix = typeof e.blankNodePrefix != "string" ? "" : e.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = e.lexer || new kd({ lineMode: u, n3: l, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!e.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    tl = 0;
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
    }, this._callback(r), this._callback = ha;
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
    if (t && (t.onQuad || t.onPrefix || t.onComment) ? (i = t.onQuad, s = t.onPrefix, a = t.onComment) : (i = t, s = r), this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${tl++}_`, this._prefixCallback = s || ha, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !i) {
      const u = [];
      let c;
      if (this._callback = (h, p) => {
        h ? c = h : p && u.push(p);
      }, this._lexer.tokenize(e).every((h) => this._readCallback = this._readCallback(h)), c) throw c;
      return u;
    }
    let l = (u, c) => {
      u !== null ? (this._callback(u), this._callback = ha) : this._readCallback && (this._readCallback = this._readCallback(c));
    };
    a && (this._lexer.comments = !0, l = (u, c) => {
      u !== null ? (this._callback(u), this._callback = ha) : this._readCallback && (c.type === "comment" ? a(c.value) : this._readCallback = this._readCallback(c));
    }), this._callback = i, this._lexer.tokenize(e, l);
  }
}
function ha() {
}
function eo(n, e) {
  n._factory = e, n.DEFAULTGRAPH = e.defaultGraph(), n.RDF_FIRST = e.namedNode(Ut.rdf.first), n.RDF_REST = e.namedNode(Ut.rdf.rest), n.RDF_NIL = e.namedNode(Ut.rdf.nil), n.N3_FORALL = e.namedNode(Ut.r.forAll), n.N3_FORSOME = e.namedNode(Ut.r.forSome), n.ABBREVIATIONS = {
    a: e.namedNode(Ut.rdf.type),
    "=": e.namedNode(Ut.owl.sameAs),
    ">": e.namedNode(Ut.log.implies),
    "<": e.namedNode(Ut.log.isImpliedBy)
  }, n.QUANTIFIERS_GRAPH = e.namedNode("urn:n3:quantifiers");
}
eo(Zl.prototype, Md);
if (typeof wn > "u")
  var wn = {
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
    for (var t = ""; e && e.nodeType !== wn.DOCUMENT_NODE; )
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
      r[s][r[s].length - 1] === ":" ? i = r[s].substring(0, r[s].length - 1) : i && (t[i] = this.options.base ? Tt(r[s], this.options.base) : r[s], i = null);
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
    e.nodeType === wn.DOCUMENT_NODE ? (e.baseURI && !t.baseURI && (t.baseURI = e.baseURI), r = e.baseURI, e = e.documentElement, e.baseURI || (e.baseURI = r), this.setContext(e)) : e.parentNode.nodeType === wn.DOCUMENT_NODE && this.setContext(e);
    var i = [], s = function(se) {
      if (!se && t && t.baseURI)
        return t.baseURI;
      var Ie = se.indexOf("#");
      return Ie >= 0 && (se = se.substring(0, Ie)), t && t.baseURIMap && (se = t.baseURIMap(se)), se;
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
          for (let Ie = 0; Ie < l.length; Ie++)
            u.push(this.newBlankNode());
          for (let Ie = 0; Ie < u.length; Ie++)
            this.addTriple(a.parent, u[Ie], "http://www.w3.org/1999/02/22-rdf-syntax-ns#first", l[Ie]), this.addTriple(a.parent, u[Ie], "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest", {
              type: ve.objectURI,
              value: Ie + 1 < u.length ? u[Ie + 1] : "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
            });
          this.addTriple(a.parent, a.subject, se, {
            type: ve.objectURI,
            value: u[0]
          });
        }
        continue;
      }
      var c = a.current, h = a.context, p = !1, m = null, w = null, v = null, C = h.prefixes, T = !1, B = [], O = h.listMapping, X = !h.parent, Y = h.language, A = h.vocabulary;
      r = this.parseURI(s(c.baseURI)), c.item = null;
      var K = c.getAttributeNode("vocab");
      if (K) {
        let se = this.trim(K.value);
        if (se.length > 0) {
          A = se;
          var P = r.spec;
          this.addTriple(c, P, "http://www.w3.org/ns/rdfa#usesVocabulary", {
            type: ve.objectURI,
            value: A
          });
        } else
          A = this.vocabulary;
      }
      for (var G = 0; G < c.attributes.length; G++) {
        var R = c.attributes[G];
        if (R.nodeName.charAt(0) === "x" && R.nodeName.indexOf("xmlns:") === 0) {
          T || (C = this.copyMappings(C), T = !0);
          var H = R.nodeName.substring(6), $ = ve.trim(R.value);
          C[H] = this.options.base ? Tt($, this.options.base) : $;
        }
      }
      var q = c.getAttributeNode("prefix");
      q && (T || (C = this.copyMappings(C), T = !0), this.parsePrefixMappings(q.value, C));
      var ee = null;
      for (let se = 0; !ee && se < this.langAttributes.length; se++)
        ee = c.getAttributeNodeNS(this.langAttributes[se].namespaceURI, this.langAttributes[se].localName);
      if (ee) {
        let se = ve.trim(ee.value);
        se.length > 0 ? Y = se : Y = null;
      }
      var Q = c.getAttributeNode("rel"), _ = c.getAttributeNode("rev"), V = c.getAttributeNode("typeof"), Z = c.getAttributeNode("property"), ae = c.getAttributeNode("datatype"), ie = this.inHTMLMode ? c.getAttributeNode("datetime") : null, oe = c.getAttributeNode("content"), ne = c.getAttributeNode("about"), ge = c.getAttributeNode("src"), Le = c.getAttributeNode("resource"), pe = c.getAttributeNode("href"), Ce = c.getAttributeNode("inlist"), Pe = [], Ye, Te;
      if (Q) {
        Te = this.tokenize(Q.value);
        for (let se = 0; se < Te.length; se++)
          Ye = this.parsePredicate(Te[se], A, h.terms, C, r, this.inHTMLMode && Z !== null), Ye && Pe.push(Ye);
      }
      var qe = [];
      if (_) {
        Te = this.tokenize(_.value);
        for (let se = 0; se < Te.length; se++)
          Ye = this.parsePredicate(Te[se], A, h.terms, C, r, this.inHTMLMode && Z), Ye && qe.push(Ye);
      }
      if (this.inHTMLMode && (Q || _) && Z && (Pe.length === 0 && (Q = null), qe.length === 0 && (_ = null)), Q || _ ? (ne && (m = this.parseSafeCURIEOrCURIEOrURI(ne.value, C, r)), V && (v = m), m || (c.parentNode.nodeType === wn.DOCUMENT_NODE ? m = s(c.baseURI) : h.parentObject && (m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject)), Le && (w = this.parseSafeCURIEOrCURIEOrURI(Le.value, C, r)), w || (pe ? w = this.resolveAndNormalize(r, encodeURI(pe.value)) : ge ? w = this.resolveAndNormalize(r, encodeURI(ge.value)) : V && !ne && !(this.inXHTMLMode && (c.localName === "head" || c.localName === "body")) && (w = this.newBlankNode())), V && !ne && this.inXHTMLMode && (c.localName === "head" || c.localName === "body") ? v = m : V && !ne && (v = w)) : Z && !oe && !ae ? (ne && (m = this.parseSafeCURIEOrCURIEOrURI(ne.value, C, r), V && (v = m)), !m && c.parentNode.nodeType === wn.DOCUMENT_NODE ? (m = s(c.baseURI), V && (v = m)) : !m && h.parentObject && (m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject), V && !v && (Le && (v = this.parseSafeCURIEOrCURIEOrURI(Le.value, C, r)), !v && pe && (v = this.resolveAndNormalize(r, encodeURI(pe.value))), !v && ge && (v = this.resolveAndNormalize(r, encodeURI(ge.value))), !v && (this.inXHTMLMode || this.inHTMLMode) && (c.localName === "head" || c.localName === "body") && (v = m), v || (v = this.newBlankNode()), w = v)) : (ne && (m = this.parseSafeCURIEOrCURIEOrURI(ne.value, C, r)), !m && Le && (m = this.parseSafeCURIEOrCURIEOrURI(Le.value, C, r)), !m && pe && (m = this.resolveAndNormalize(r, encodeURI(pe.value))), !m && ge && (m = this.resolveAndNormalize(r, encodeURI(ge.value))), m || (c.parentNode.nodeType === wn.DOCUMENT_NODE ? m = s(c.baseURI) : (this.inXHTMLMode || this.inHTMLMode) && (c.localName === "head" || c.localName === "body") ? m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject : V ? m = this.newBlankNode() : h.parentObject && (m = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject, Z || (p = !0))), V && (v = m)), m && (ne || Le || v)) {
        var ht = m;
        V && !ne && !Le && w && (ht = w), this.newSubjectOrigin(c, ht);
      }
      if (v) {
        Te = this.tokenize(V.value);
        for (let se = 0; se < Te.length; se++) {
          var it = this.parseTermOrCURIEOrAbsURI(Te[se], A, h.terms, C, r);
          it && this.addTriple(c, v, ve.typeURI, {
            type: ve.objectURI,
            value: it
          });
        }
      }
      if (m && m !== h.parentObject && (O = {}, X = !0), w) {
        if (Q && Ce)
          for (let se = 0; se < Pe.length; se++) {
            let Ie = O[Pe[se]];
            Ie || (Ie = [], O[Pe[se]] = Ie), Ie.push({
              type: ve.objectURI,
              value: w
            });
          }
        else if (Q)
          for (let se = 0; se < Pe.length; se++)
            this.addTriple(c, m, Pe[se], {
              type: ve.objectURI,
              value: w
            });
        if (_)
          for (let se = 0; se < qe.length; se++)
            this.addTriple(c, w, qe[se], {
              type: ve.objectURI,
              value: m
            });
      } else {
        if (m && !w && (Q || _) && (w = this.newBlankNode()), Q && Ce)
          for (let se = 0; se < Pe.length; se++) {
            let Ie = O[Pe[se]];
            Ie || (Ie = [], O[Ye] = Ie), B.push({
              predicate: Pe[se],
              list: Ie
            });
          }
        else if (Q)
          for (let se = 0; se < Pe.length; se++)
            B.push({
              predicate: Pe[se],
              forward: !0
            });
        if (_)
          for (let se = 0; se < qe.length; se++)
            B.push({
              predicate: qe[se],
              forward: !1
            });
      }
      if (Z) {
        var De = null, Re = null;
        ae ? (De = ae.value === "" ? ve.PlainLiteralURI : this.parseTermOrCURIEOrAbsURI(ae.value, A, h.terms, C, r), ie && !oe ? Re = ie.value : Re = De === ve.XMLLiteralURI || De === ve.HTMLLiteralURI ? null : oe ? oe.value : c.textContent) : oe ? (De = ve.PlainLiteralURI, Re = oe.value) : ie ? (Re = ie.value, De = ve.deriveDateTimeType(Re), De || (De = ve.PlainLiteralURI)) : !Q && !_ && (Le && (Re = this.parseSafeCURIEOrCURIEOrURI(Le.value, C, r)), !Re && pe ? Re = this.resolveAndNormalize(r, encodeURI(pe.value)) : !Re && ge && (Re = this.resolveAndNormalize(r, encodeURI(ge.value))), Re && (De = ve.objectURI)), De || (V && !ne ? (De = ve.objectURI, Re = v) : (Re = c.textContent, this.inHTMLMode && c.localName === "time" && (De = ve.deriveDateTimeType(Re)), De || (De = ve.PlainLiteralURI))), Te = this.tokenize(Z.value);
        for (let se = 0; se < Te.length; se++) {
          let Ie = this.parsePredicate(Te[se], A, h.terms, C, r);
          if (Ie)
            if (Ce) {
              let lt = O[Ie];
              lt || (lt = [], O[Ie] = lt), lt.push(De === ve.XMLLiteralURI || De === ve.HTMLLiteralURI ? {
                type: De,
                value: c.childNodes
              } : {
                type: De || ve.PlainLiteralURI,
                value: Re,
                language: Y
              });
            } else
              De === ve.XMLLiteralURI || De === ve.HTMLLiteralURI ? this.addTriple(c, m, Ie, {
                type: De,
                value: c.childNodes
              }) : this.addTriple(c, m, Ie, {
                type: De || ve.PlainLiteralURI,
                value: Re,
                language: Y
              });
        }
      }
      if (m && !p)
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
      var _e = null, Et = m;
      p ? (_e = this.push(h, h.subject), _e.parentObject = s(c.parentNode.baseURI) === h.parentObject ? s(c.baseURI) : h.parentObject, _e.incomplete = h.incomplete, _e.language = Y, _e.prefixes = C, _e.vocabulary = A) : (_e = this.push(h, m), _e.parentObject = w || m || h.subject, _e.prefixes = C, _e.incomplete = B, w && (Et = w, O = {}, X = !0), _e.listMapping = O, _e.language = Y, _e.vocabulary = A), X && i.unshift({
        parent: c,
        context: h,
        subject: Et,
        listMapping: O
      });
      for (var Ve = c.lastChild; Ve; Ve = Ve.previousSibling)
        Ve.nodeType === wn.ELEMENT_NODE && i.unshift({
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
    return Tt(t, e);
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
        return e.substring(0, 2) === "_:" ? (typeof this.blankNodes[e.substring(2)] > "u" && (this.blankNodes[e.substring(2)] = new tn(e.substring(2))), this.blankNodes[e.substring(2)]) : Pt.namedNode(e);
      switch (e.type) {
        case ve.objectURI:
          return e.value.substring(0, 2) === "_:" ? (typeof this.blankNodes[e.value.substring(2)] > "u" && (this.blankNodes[e.value.substring(2)] = new tn(e.value.substring(2))), this.blankNodes[e.value.substring(2)]) : Pt.namedNode(e.value);
        case ve.PlainLiteralURI:
          return new Zt(e.value, e.language || "");
        case ve.XMLLiteralURI:
        case ve.HTMLLiteralURI:
          var t = "";
          return Object.keys(e.value).forEach((r) => {
            t += td(e.value[r], this.htmlOptions);
          }), new Zt(t, "", new pt(e.type));
        default:
          return new Zt(e.value, "", new pt(e.type));
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
        s = Tt(s, this.base), this.node = this.store.sym(s), this.nodeType = i;
      },
      /** Load any constructed triples into the store */
      loadTriple: function() {
        if (this.parent.parent.collection ? this.parent.parent.node.append(this.node) : this.store.add(this.parent.parent.node, this.parent.node, this.node, this.parser.why), this.parent.rdfid != null) {
          var i = this.store.sym(Tt("#" + this.parent.rdfid, this.base));
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
          }), c != null && (this.store.add(e.node, this.store.sym(Se.ns.RDF + "type"), this.store.sym(Tt(c.nodeValue, e.base)), this.why), c.nodeName && s.removeAttributeNode(c));
          for (var h = a.length - 1; h >= 0; h--)
            this.store.add(e.node, this.store.sym(r(a[h])), this.store.literal(a[h].nodeValue, e.lang), this.why);
        } else {
          e.addArc(r(s)), this.reify && (t = this.getAttributeNodeNS(s, Se.ns.RDF, "ID"), t && (e.rdfid = t.nodeValue, s.removeAttributeNode(t)));
          var p = this.getAttributeNodeNS(s, Se.ns.RDF, "parseType"), m = this.getAttributeNodeNS(s, Se.ns.RDF, "datatype");
          if (m && (e.datatype = m.nodeValue, s.removeAttributeNode(m)), p) {
            var w = p.nodeValue;
            w === "Literal" ? (e.datatype = Se.ns.RDF + "XMLLiteral", e = this.buildFrame(e), e.addLiteral(s.innerHTML || s.childNodes), i = !1) : w === "Resource" ? (e = this.buildFrame(e, e.element), e.parent.element = null, e.addBNode()) : w === "Collection" && (e = this.buildFrame(e, e.element), e.parent.element = null, e.addCollection()), s.removeAttributeNode(p);
          }
          if (a.length !== 0) {
            var v = this.getAttributeNodeNS(s, Se.ns.RDF, "resource"), C = this.getAttributeNodeNS(s, Se.ns.RDF, "nodeID");
            e = this.buildFrame(e), v ? (e.addNode(v.nodeValue), s.removeAttributeNode(v)) : C ? (e.addBNode(C.nodeValue), s.removeAttributeNode(C)) : e.addBNode();
            for (var T = a.length - 1; T >= 0; T--) {
              var B = this.buildFrame(e);
              B.addArc(r(a[T])), r(a[T]) === Se.ns.RDF + "type" ? this.buildFrame(B).addNode(a[T].nodeValue) : this.buildFrame(B).addLiteral(a[T].nodeValue);
            }
          } else s.childNodes.length === 0 && this.buildFrame(e).addLiteral("");
        }
      for (s = e.element; e.parent; ) {
        for (var O = e; s == null; )
          e = e.parent, s = e.element;
        var X = s.childNodes && s.childNodes[e.lastChild];
        if (!X || !i) {
          if (e.terminateFrame(), !(e = e.parent))
            break;
          s = e.element, i = !0;
        } else if (X.nodeType !== Se.nodeType.ELEMENT && X.nodeType !== Se.nodeType.TEXT && X.nodeType !== Se.nodeType.CDATA_SECTION || (X.nodeType === Se.nodeType.TEXT || X.nodeType === Se.nodeType.CDATA_SECTION) && s.childNodes.length !== 1)
          e.lastChild++;
        else {
          e.lastChild++, e = this.buildFrame(O, s.childNodes[e.lastChild - 1]);
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
          this.base && (u = Tt(u, this.base)), this.store.setPrefixForURI(i[l].name.slice(6), u);
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
function Vd(n, e, t) {
  var r, i, s, a = ["INSERT", "DELETE", "WHERE"], l = Ne("http://www.w3.org/ns/pim/patch#"), u = Ii(e, e, t, t, null, null, "", null), c = {}, h = function(C, T, B, O, X) {
    return "Line " + (T + 1) + " of <" + C + `>: Bad syntax:
   ` + X + `
   at: "` + B.slice(O, O + 30) + '"';
  };
  r = 0;
  var p = e.sym(t + "#query");
  for (c.query = p; ; ) {
    if (i = u.skipSpace(n, r), i < 0)
      return c;
    if (n[i] === ";") {
      if (r = u.skipSpace(n, i + 1), r < 0)
        return c;
      i = r;
    }
    var m = !1;
    for (s = 0; s < a.length; s++) {
      var w = a[s];
      if (n.slice(i, i + w.length) === w) {
        if (r = u.skipSpace(n, i + w.length), r < 0)
          throw h(u._thisDoc, u.lines, n, i + w.length, "found EOF, needed {...} after " + w);
        if ((w === "INSERT" || w === "DELETE") && n.slice(r, r + 4) === "DATA") {
          if (i = u.skipSpace(n, r + 4), i < 0)
            throw h(u._thisDoc, u.lines, n, r + 4, "needed {...} after INSERT DATA " + w);
          r = i;
        }
        var v = [];
        if (i = u.node(n, r, v), i < 0)
          throw h(u._thisDoc, u.lines, n, r, "bad syntax or EOF in {...} after " + w);
        c[w.toLowerCase()] = v[0], e.add(p, l(w.toLowerCase()), v[0]), m = !0, r = i;
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
  r = r || Mn, r = r.split(";")[0];
  try {
    if (r === Fl || r === Mn) {
      var s = Ii(e, e, t, t, null, null, "", null);
      s.loadBuf(n), u();
    } else if (r === Or) {
      var a = new Se(e);
      a.parse(ir(n), t, e.sym(t)), u();
    } else if (r === fi)
      Aa(ir(n, {
        contentType: fi
      }), e, t), u();
    else if (r === Fs)
      Aa(ir(n, {
        contentType: Fs
      }), e, t), u();
    else if (r === Bc || r === Lc)
      Vd(n, e, t), u();
    else if (r === ci)
      Vl(n, e, t).then(u).catch(c);
    else if (r === hi || r === di) {
      var l = new Zl({
        factory: mi
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
      r !== ci || // @ts-ignore always true?
      r !== hi || // @ts-ignore always true?
      r !== di
    )
      if (i)
        i(m, e);
      else {
        let w = new Error("" + m + " while trying to parse <" + t + "> as " + r);
        throw w.cause = m, w;
      }
  }
  function h(m, w) {
    try {
      l.parse(w, p);
    } catch (v) {
      i(v, e);
    }
  }
  function p(m, w) {
    w ? e.add(w.subject, w.predicate, w.object, w.graph) : i(m, e);
  }
}
var fa = { exports: {} }, nl;
function Kd() {
  return nl || (nl = 1, (function(n, e) {
    var t = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof aa < "u" && aa, r = (function() {
      function s() {
        this.fetch = !1, this.DOMException = t.DOMException;
      }
      return s.prototype = t, new s();
    })();
    (function(s) {
      (function(a) {
        var l = typeof s < "u" && s || typeof self < "u" && self || // eslint-disable-next-line no-undef
        typeof aa < "u" && aa || {}, u = {
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
        function c(_) {
          return _ && DataView.prototype.isPrototypeOf(_);
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
          ], p = ArrayBuffer.isView || function(_) {
            return _ && h.indexOf(Object.prototype.toString.call(_)) > -1;
          };
        function m(_) {
          if (typeof _ != "string" && (_ = String(_)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(_) || _ === "")
            throw new TypeError('Invalid character in header field name: "' + _ + '"');
          return _.toLowerCase();
        }
        function w(_) {
          return typeof _ != "string" && (_ = String(_)), _;
        }
        function v(_) {
          var V = {
            next: function() {
              var Z = _.shift();
              return { done: Z === void 0, value: Z };
            }
          };
          return u.iterable && (V[Symbol.iterator] = function() {
            return V;
          }), V;
        }
        function C(_) {
          this.map = {}, _ instanceof C ? _.forEach(function(V, Z) {
            this.append(Z, V);
          }, this) : Array.isArray(_) ? _.forEach(function(V) {
            if (V.length != 2)
              throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + V.length);
            this.append(V[0], V[1]);
          }, this) : _ && Object.getOwnPropertyNames(_).forEach(function(V) {
            this.append(V, _[V]);
          }, this);
        }
        C.prototype.append = function(_, V) {
          _ = m(_), V = w(V);
          var Z = this.map[_];
          this.map[_] = Z ? Z + ", " + V : V;
        }, C.prototype.delete = function(_) {
          delete this.map[m(_)];
        }, C.prototype.get = function(_) {
          return _ = m(_), this.has(_) ? this.map[_] : null;
        }, C.prototype.has = function(_) {
          return this.map.hasOwnProperty(m(_));
        }, C.prototype.set = function(_, V) {
          this.map[m(_)] = w(V);
        }, C.prototype.forEach = function(_, V) {
          for (var Z in this.map)
            this.map.hasOwnProperty(Z) && _.call(V, this.map[Z], Z, this);
        }, C.prototype.keys = function() {
          var _ = [];
          return this.forEach(function(V, Z) {
            _.push(Z);
          }), v(_);
        }, C.prototype.values = function() {
          var _ = [];
          return this.forEach(function(V) {
            _.push(V);
          }), v(_);
        }, C.prototype.entries = function() {
          var _ = [];
          return this.forEach(function(V, Z) {
            _.push([Z, V]);
          }), v(_);
        }, u.iterable && (C.prototype[Symbol.iterator] = C.prototype.entries);
        function T(_) {
          if (!_._noBody) {
            if (_.bodyUsed)
              return Promise.reject(new TypeError("Already read"));
            _.bodyUsed = !0;
          }
        }
        function B(_) {
          return new Promise(function(V, Z) {
            _.onload = function() {
              V(_.result);
            }, _.onerror = function() {
              Z(_.error);
            };
          });
        }
        function O(_) {
          var V = new FileReader(), Z = B(V);
          return V.readAsArrayBuffer(_), Z;
        }
        function X(_) {
          var V = new FileReader(), Z = B(V), ae = /charset=([A-Za-z0-9_-]+)/.exec(_.type), ie = ae ? ae[1] : "utf-8";
          return V.readAsText(_, ie), Z;
        }
        function Y(_) {
          for (var V = new Uint8Array(_), Z = new Array(V.length), ae = 0; ae < V.length; ae++)
            Z[ae] = String.fromCharCode(V[ae]);
          return Z.join("");
        }
        function A(_) {
          if (_.slice)
            return _.slice(0);
          var V = new Uint8Array(_.byteLength);
          return V.set(new Uint8Array(_)), V.buffer;
        }
        function K() {
          return this.bodyUsed = !1, this._initBody = function(_) {
            this.bodyUsed = this.bodyUsed, this._bodyInit = _, _ ? typeof _ == "string" ? this._bodyText = _ : u.blob && Blob.prototype.isPrototypeOf(_) ? this._bodyBlob = _ : u.formData && FormData.prototype.isPrototypeOf(_) ? this._bodyFormData = _ : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) ? this._bodyText = _.toString() : u.arrayBuffer && u.blob && c(_) ? (this._bodyArrayBuffer = A(_.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(_) || p(_)) ? this._bodyArrayBuffer = A(_) : this._bodyText = _ = Object.prototype.toString.call(_) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof _ == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, u.blob && (this.blob = function() {
            var _ = T(this);
            if (_)
              return _;
            if (this._bodyBlob)
              return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }), this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var _ = T(this);
              return _ || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              ) : Promise.resolve(this._bodyArrayBuffer));
            } else {
              if (u.blob)
                return this.blob().then(O);
              throw new Error("could not read as ArrayBuffer");
            }
          }, this.text = function() {
            var _ = T(this);
            if (_)
              return _;
            if (this._bodyBlob)
              return X(this._bodyBlob);
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
        var P = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
        function G(_) {
          var V = _.toUpperCase();
          return P.indexOf(V) > -1 ? V : _;
        }
        function R(_, V) {
          if (!(this instanceof R))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          V = V || {};
          var Z = V.body;
          if (_ instanceof R) {
            if (_.bodyUsed)
              throw new TypeError("Already read");
            this.url = _.url, this.credentials = _.credentials, V.headers || (this.headers = new C(_.headers)), this.method = _.method, this.mode = _.mode, this.signal = _.signal, !Z && _._bodyInit != null && (Z = _._bodyInit, _.bodyUsed = !0);
          } else
            this.url = String(_);
          if (this.credentials = V.credentials || this.credentials || "same-origin", (V.headers || !this.headers) && (this.headers = new C(V.headers)), this.method = G(V.method || this.method || "GET"), this.mode = V.mode || this.mode || null, this.signal = V.signal || this.signal || (function() {
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
        R.prototype.clone = function() {
          return new R(this, { body: this._bodyInit });
        };
        function H(_) {
          var V = new FormData();
          return _.trim().split("&").forEach(function(Z) {
            if (Z) {
              var ae = Z.split("="), ie = ae.shift().replace(/\+/g, " "), oe = ae.join("=").replace(/\+/g, " ");
              V.append(decodeURIComponent(ie), decodeURIComponent(oe));
            }
          }), V;
        }
        function $(_) {
          var V = new C(), Z = _.replace(/\r?\n[\t ]+/g, " ");
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
        K.call(R.prototype);
        function q(_, V) {
          if (!(this instanceof q))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          if (V || (V = {}), this.type = "default", this.status = V.status === void 0 ? 200 : V.status, this.status < 200 || this.status > 599)
            throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
          this.ok = this.status >= 200 && this.status < 300, this.statusText = V.statusText === void 0 ? "" : "" + V.statusText, this.headers = new C(V.headers), this.url = V.url || "", this._initBody(_);
        }
        K.call(q.prototype), q.prototype.clone = function() {
          return new q(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new C(this.headers),
            url: this.url
          });
        }, q.error = function() {
          var _ = new q(null, { status: 200, statusText: "" });
          return _.ok = !1, _.status = 0, _.type = "error", _;
        };
        var ee = [301, 302, 303, 307, 308];
        q.redirect = function(_, V) {
          if (ee.indexOf(V) === -1)
            throw new RangeError("Invalid status code");
          return new q(null, { status: V, headers: { location: _ } });
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
        function Q(_, V) {
          return new Promise(function(Z, ae) {
            var ie = new R(_, V);
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
            if (oe.open(ie.method, ge(ie.url), !0), ie.credentials === "include" ? oe.withCredentials = !0 : ie.credentials === "omit" && (oe.withCredentials = !1), "responseType" in oe && (u.blob ? oe.responseType = "blob" : u.arrayBuffer && (oe.responseType = "arraybuffer")), V && typeof V.headers == "object" && !(V.headers instanceof C || l.Headers && V.headers instanceof l.Headers)) {
              var Le = [];
              Object.getOwnPropertyNames(V.headers).forEach(function(pe) {
                Le.push(m(pe)), oe.setRequestHeader(pe, w(V.headers[pe]));
              }), ie.headers.forEach(function(pe, Ce) {
                Le.indexOf(Ce) === -1 && oe.setRequestHeader(Ce, pe);
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
        return Q.polyfill = !0, l.fetch || (l.fetch = Q, l.Headers = C, l.Request = R, l.Response = q), a.Headers = C, a.Request = R, a.Response = q, a.fetch = Q, a;
      })({});
    })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
    var i = t.fetch ? t : r;
    e = i.fetch, e.default = i.fetch, e.fetch = i.fetch, e.Headers = i.Headers, e.Request = i.Request, e.Response = i.Response, n.exports = e;
  })(fa, fa.exports)), fa.exports;
}
var yi = Kd();
const Gd = /* @__PURE__ */ kl(yi), Xd = {
  "text/n3": !0,
  "text/turtle": !0,
  "application/rdf+xml": !0,
  "application/xhtml+xml": !0,
  "text/html": !0,
  "application/ld+json": !0
}, to = {
  rdf: Or,
  owl: Or,
  n3: "text/n3",
  ttl: "text/turtle",
  nt: "text/n3",
  acl: "text/n3",
  html: "text/html",
  xml: "text/xml"
}, no = (n) => ({
  link: Ne("http://www.w3.org/2007/ont/link#", n),
  http: Ne("http://www.w3.org/2007/ont/http#", n),
  httph: Ne("http://www.w3.org/2007/ont/httph#", n),
  // headers
  rdf: Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#", n),
  rdfs: Ne("http://www.w3.org/2000/01/rdf-schema#", n),
  dc: Ne("http://purl.org/dc/elements/1.1/", n),
  ldp: Ne("http://www.w3.org/ns/ldp#", n)
}), Lt = no();
class xn {
  constructor(e, t) {
    re(this, "response", void 0), re(this, "dom", void 0), this.response = e, this.dom = t;
  }
}
re(xn, "pattern", void 0);
class Li extends xn {
  static toString() {
    return "RDFXMLHandler";
  }
  static register(e) {
    e.mediatypes[Or] = {
      q: 0.9
    };
  }
  parse(e, t, r) {
    let i = e.store;
    this.dom || (this.dom = ir(t));
    let s = this.dom.documentElement;
    if (s && s.nodeName === "parsererror")
      return e.failFetch(r, "Badly formed XML in " + r.resource.value, "parse_error");
    let a = new Se(i);
    try {
      a.parse(this.dom, r.original.value, r.original);
    } catch (l) {
      return e.failFetch(r, "Syntax error parsing RDF/XML! " + l, "parse_error");
    }
    return r.noMeta || i.add(r.original, Lt.rdf("type"), Lt.link("RDFDocument"), e.appNode), e.doneFetch(r, this.response);
  }
}
Li.pattern = new RegExp("application/rdf\\+xml");
class $n extends xn {
  static toString() {
    return "XHTMLHandler";
  }
  static register(e) {
    e.mediatypes[fi] = {
      q: 0.8
    };
  }
  parse(e, t, r) {
    let i, s;
    this.dom || (this.dom = ir(t));
    let a = e.store, l = this.dom.getElementsByTagName("title");
    l.length > 0 && a.add(r.resource, Lt.dc("title"), a.rdfFactory.literal(l[0].textContent), r.resource);
    let u = this.dom.getElementsByTagName("link");
    for (let h = u.length - 1; h >= 0; h--)
      i = u[h].getAttribute("rel"), s = !1, i || (i = u[h].getAttribute("rev"), s = !0), i && e.linkData(r.original, i, u[h].getAttribute("href"), r.resource, s);
    let c = this.dom.getElementsByTagName("script");
    for (let h = 0; h < c.length; h++) {
      let p = c[h].getAttribute("type");
      Xd[p] && (xa(c[h].textContent, a, r.original.value, p), xa(c[h].textContent, a, r.original.value, p));
    }
    if (r.noMeta || a.add(r.resource, Lt.rdf("type"), Lt.link("WebPage"), e.appNode), !r.noRDFa && Aa)
      try {
        Aa(this.dom, a, r.original.value);
      } catch (h) {
        let p = "Error trying to parse " + r.resource + ` as RDFa:
` + h + `:
` + h.stack;
        return e.failFetch(r, p, "parse_error");
      }
    return e.doneFetch(r, this.response);
  }
}
$n.pattern = new RegExp("application/xhtml");
class ur extends xn {
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
    let i = ir(t);
    for (let a = 0; a < i.childNodes.length; a++) {
      const l = i.childNodes[a];
      if (ur.isElement(l)) {
        let u = l.namespaceURI;
        if (u && u === u.rdf)
          return e.addStatus(r.req, "Has XML root element in the RDF namespace, so assume RDF/XML."), new Li(this.response, i).parse(e, t, r);
        break;
      }
    }
    if (i.doctype && i.doctype.name === "html" && i.doctype.publicId.match(/^-\/\/W3C\/\/DTD XHTML/) && i.doctype.systemId.match(/http:\/\/www.w3.org\/TR\/xhtml/))
      return e.addStatus(r.req, `Has XHTML DOCTYPE. Switching to XHTML Handler.
`), new $n(this.response, i).parse(e, t, r);
    let s = i.getElementsByTagName("html")[0];
    if (s) {
      let a = s.getAttribute("xmlns");
      if (a && a.match(/^http:\/\/www.w3.org\/1999\/xhtml/))
        return e.addStatus(r.req, `Has a default namespace for XHTML. Switching to XHTMLHandler.
`), new $n(this.response, i).parse(e, t, r);
    }
    return e.failFetch(r, `Unsupported dialect of XML: not RDF or XHTML namespace, etc.
` + t.slice(0, 80), 901);
  }
}
ur.pattern = new RegExp("(text|application)/(.*)xml");
class ro extends xn {
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
    if (lo(t))
      return e.addStatus(r.req, `Has an XML declaration. We'll assume it's XHTML as the content-type was text/html.
`), new $n(this.response).parse(e, t, r);
    if (jd(t))
      return e.addStatus(r.req, `Has XHTML DOCTYPE. Switching to XHTMLHandler.
`), new $n(this.response).parse(e, t, r);
    if (zd(t))
      return e.addStatus(r.req, `Has default namespace for XHTML, so switching to XHTMLHandler.
`), new $n(this.response).parse(e, t, r);
    let s = new RegExp("<title>([\\s\\S]+?)</title>", "im").exec(t);
    return s && i.add(r.resource, Lt.dc("title"), i.rdfFactory.literal(s[1]), r.resource), i.add(r.resource, Lt.rdf("type"), Lt.link("WebPage"), e.appNode), e.addStatus(r.req, "non-XML HTML document, not parsed for data."), e.doneFetch(r, this.response);
  }
}
ro.pattern = new RegExp("text/html");
class ao extends xn {
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
      return await Vl(t, s, r.original.value), e.store.add(r.original, Lt.rdf("type"), Lt.link("RDFDocument"), e.appNode), e.doneFetch(r, i);
    } catch (a) {
      const l = "Error trying to parse " + r.resource + ` as JSON-LD:
` + a;
      return e.failFetch(r, l, "parse_error", i);
    }
  }
}
ao.pattern = /application\/(ld\+json|activity\+json)/;
class io extends xn {
  static toString() {
    return "TextHandler";
  }
  static register(e) {
    e.mediatypes["text/plain"] = {
      q: 0.5
    };
  }
  parse(e, t, r) {
    return lo(t) ? (e.addStatus(r.req, "Warning: " + r.resource + ` has an XML declaration. We'll assume it's XML but its content-type wasn't XML.
`), new ur(this.response).parse(e, t, r)) : t.slice(0, 500).match(/xmlns:/) ? (e.addStatus(r.req, `May have an XML namespace. We'll assume it's XML but its content-type wasn't XML.
`), new ur(this.response).parse(e, t, r)) : (e.addStatus(r.req, "Plain text document, no known RDF semantics."), e.doneFetch(r, this.response));
  }
}
io.pattern = new RegExp("text/plain");
class so extends xn {
  static toString() {
    return "N3Handler";
  }
  static register(e) {
    e.mediatypes["text/n3"] = {}, e.mediatypes["text/turtle"] = {};
  }
  parse(e, t, r, i) {
    let s = e.store, a = Ii(s, s, r.original.value, r.original.value, null, null, "", null);
    try {
      a.loadBuf(t);
    } catch (l) {
      let u = "Error trying to parse " + r.resource + ` as Notation3:
` + l;
      return e.failFetch(r, u, "parse_error", i);
    }
    return e.addStatus(r.req, "N3 parsed: " + a.statementCount + " triples in " + a.lines + " lines."), e.store.add(r.original, Lt.rdf("type"), Lt.link("RDFDocument"), e.appNode), e.doneFetch(r, this.response);
  }
}
so.pattern = new RegExp("(application|text)/(x-)?(rdf\\+)?(n3|turtle)");
const vi = {
  RDFXMLHandler: Li,
  XHTMLHandler: $n,
  XMLHandler: ur,
  HTMLHandler: ro,
  TextHandler: io,
  N3Handler: so,
  JsonLdHandler: ao
};
function jd(n) {
  const e = n.indexOf("<!DOCTYPE html"), t = n.indexOf(">");
  return e === -1 || t === -1 || e > t ? !1 : n.substr(e, t - e).indexOf("XHTML") !== -1;
}
function lo(n) {
  return !!n.match(/\s*<\?xml\s+version\s*=[^<>]+\?>/);
}
function zd(n) {
  return !!n.match(/[^(<html)]*<html\s+[^<]*xmlns=['"]http:\/\/www.w3.org\/1999\/xhtml["'][^<]*>/);
}
class rt {
  constructor(e, t = {}) {
    re(this, "store", void 0), re(this, "timeout", void 0), re(this, "_fetch", void 0), re(this, "mediatypes", void 0), re(this, "appNode", void 0), re(this, "requested", void 0), re(this, "timeouts", void 0), re(this, "redirectedTo", void 0), re(this, "fetchQueue", void 0), re(this, "fetchCallbacks", void 0), re(this, "nonexistent", void 0), re(this, "lookedUp", void 0), re(this, "handlers", void 0), re(this, "ns", void 0), re(this, "fireCallbacks", void 0), this.store = e || new gn(), this.ns = no(this.store.rdfFactory), this.timeout = t.timeout || 3e4;
    let r = t.fetch || typeof global < "u" && (global.solidFetcher || global.solidFetch) || typeof window < "u" && (window.solidFetcher || window.solidFetch) || Gd;
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
    }, ed(this, ["request", "fail", "refresh", "retract", "done"]), Object.keys(t.handlers || vi).map((i) => this.addHandler(vi[i]));
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
    let t = Rs(e);
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
    let i = On(e);
    i = i.split("#")[0], t = this.initFetchOptions(i, t);
    const s = this.appNode, a = this.store, l = a.statementsMatching(void 0, this.ns.link("requestedURI"), a.sym(i), s).map((c) => c.subject);
    for (const c of l) {
      const h = a.any(c, this.ns.link("response"), null, s);
      if (h != null) {
        const p = a.statementsMatching(h, this.ns.link("outOfDate"), !0, s);
        a.remove(p), t.force = !0, t.clearPreviousData = !0;
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
          headers: new yi.Headers(),
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
        headers: new yi.Headers(),
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
    const s = On(e);
    typeof t == "function" ? r = t : typeof t > "u" || (Bs(t) ? i.referringTerm = t : i = t), this.load(s, i).then((a) => {
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
    Di(s) && s.append(i.rdfFactory.literal(t));
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
    (s === "GET" || s === "HEAD") && (e.resource.equals(e.original), this.requested[Un(e.original.value)] = r, this.fireCallbacks("fail", [e.original.value, t]));
    var l = new Error("Fetcher: " + t);
    return l.status = r, l.statusText = t, l.response = i, Promise.reject(l);
  }
  // in the why part of the quad distinguish between HTML and HTTP header
  // Reverse is set iif the link was rev= as opposed to rel=
  linkData(e, t, r, i, s) {
    if (!r) return;
    let a = this.store, l, u = a.rdfFactory.namedNode(Tt(r, e.value));
    if (t === "alternate" || t === "seeAlso" || t === "meta" || t === "describedby") {
      if (u.value === e.value)
        return;
      l = this.ns.rdfs("seeAlso");
    } else t === "type" ? l = a.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type") : l = a.rdfFactory.namedNode(Tt(encodeURIComponent(t), "http://www.iana.org/assignments/link-relations/"));
    s ? a.add(u, l, e, i) : a.add(e, l, u, i);
  }
  parseLinkHeader(e, t, r) {
    if (!e)
      return;
    const i = /<[^>]*>\s*(\s*;\s*[^()<>@,;:"/[\]?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g, s = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g, a = e.match(i);
    if (a != null)
      for (let l = 0; l < a.length; l++) {
        let u = a[l].split(">"), c = u[0].substring(1), p = u[1].match(s);
        if (p == null) return;
        for (let m = 0; m < p.length; m++) {
          let C = p[m].split("=")[1].replace(/["']/g, "");
          this.linkData(t, C, c, r);
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
    const r = On(e);
    let i = new pt(r).doc();
    return t.contentType = t["content-type"] || t["Content-Type"] || t.contentType || Mn, t.contentType === "application/ld+json" ? new Promise((s, a) => {
      Ur(i, this.store, i.uri, t.contentType, (l, u) => {
        l ? a(l) : (t.data = u, this.webOperation("PUT", e, t).then((c) => s(c)).catch((c) => a(c)));
      });
    }) : (t.data = Ur(i, this.store, i.value, t.contentType), this.webOperation("PUT", r, t));
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
  async createIfNotExists(e, t = Mn, r = "") {
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
      "content-type": Mn,
      link: this.ns.ldp("BasicContainer") + '; rel="type"'
    };
    t && (i.slug = t);
    let s = {
      headers: i
    };
    return r && (s.body = r), this.webOperation("POST", e, s);
  }
  invalidateCache(e) {
    const t = On(e), r = this;
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
    const i = On(t);
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
    return r = r.map((i) => Un(i)), r.forEach((i) => {
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
    this.addStatus(t.req, "Accept: " + t.headers.accept), Bs(s) && i.add(i.rdfFactory.namedNode(e), this.ns.link("requestedBy"), s, this.appNode), t.original && t.original.value !== e && i.add(r, this.ns.link("orginalURI"), i.rdfFactory.literal(t.original.value), this.appNode);
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
        r.rdfFactory.namedNode(Zc(s).value),
        this.appNode
        // responseNode
      );
    }), i;
  }
  objectRefresh(e) {
    let t = this.store.uris(e);
    if (typeof t < "u")
      for (let r = 0; r < t.length; r++)
        this.refresh(this.store.rdfFactory.namedNode(Un(t[r])));
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
    this.store.removeMany(void 0, void 0, void 0, e), e.value && delete this.requested[Un(e.value)], this.fireCallbacks("retract", arguments);
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
    const t = Wc, r = "" + document.location;
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
        let w = r.resource + " " + e.statusText;
        return this.failFetch(r, w, e.status, e);
      });
    var h = null, p = null;
    if (c && (p = Tt(c, t), p !== t && (h = p)), e.status === 200) {
      if (this.addType(this.ns.link("Document"), a, i, t), h && this.addType(this.ns.link("Document"), a, i, h), r.clearPreviousData) {
        const v = i.statementsMatching(void 0, void 0, void 0, r.resource).slice();
        for (let C = 0; C < v.length; C++)
          i.removeStatement(v[C]);
      }
      let w = u.includes("image/") || u.includes("application/pdf");
      u && w && (this.addType(i.rdfFactory.namedNode("http://purl.org/dc/terms/Image"), a, i, t), h && this.addType(i.rdfFactory.namedNode("http://purl.org/dc/terms/Image"), a, i, h));
    }
    if (c) {
      if (!r.force && h && this.requested[p] === "done")
        return this.doneFetch(r, e);
      this.requested[p] = !0;
    }
    this.parseLinkHeader(s.get("link"), r.original, a);
    let m = this.handlerForContentType(u, e);
    return m ? e.text().then((w) => (e.responseText = w, m.parse(this, w, r, e))) : (this.addStatus(a, "Fetch over. No data handled."), this.doneFetch(r, e));
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
    return to[e.split(".").pop()];
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
    let i = Rs(e.resource.value);
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
rt.HANDLERS = vi;
rt.CONTENT_TYPE_BY_EXT = to;
class Jd {
  /**
   * @param  store - The quadstore to store data and metadata. Created if not passed.
  */
  constructor(e) {
    if (re(this, "store", void 0), re(this, "ifps", void 0), re(this, "fps", void 0), re(this, "patchControl", void 0), re(this, "ns", void 0), e = e || new gn(), e.updater)
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
    if (t || (t = this.store), e = On(e), !this.isHttpUri(e) && t.holds(t.rdfFactory.namedNode(e), t.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), t.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#MachineEditableDocument")))
      return "LOCALFILE";
    var r, i = !1;
    const s = t.fetcher?.appNode;
    for (var a = t.each(void 0, this.ns.link("requestedURI"), Un(e), s), l, u = 0; u < a.length; u++)
      if (r = a[u], r !== void 0) {
        const C = t.any(r, this.ns.link("response"), null, s);
        if (C !== void 0) {
          if (t.anyJS(C, this.ns.link("outOfDate"), null, s)) continue;
          var c = t.anyValue(C, this.ns.httph("wac-allow"));
          if (c)
            for (var h of c.split(",")) {
              var p = h.split("=");
              if (p[0].includes("user") && !p[1].includes("write") && !p[1].includes("append"))
                return !1;
            }
          var m = t.each(C, this.ns.httph("accept-patch"));
          if (m.length)
            for (let B = 0; B < m.length; B++) {
              if (l = m[B].value.trim(), l.indexOf("application/sparql-update") >= 0 || l.indexOf("application/sparql-update-single-match") >= 0) return "SPARQL";
              if (l.indexOf("text/n3") >= 0) return "N3PATCH";
            }
          var w = t.each(C, this.ns.httph("ms-author-via"));
          if (w.length)
            for (let B = 0; B < w.length; B++) {
              if (l = w[B].value.trim(), l.indexOf("SPARQL") >= 0)
                return "SPARQL";
              if (l.indexOf("DAV") >= 0)
                return "DAV";
            }
          if (!this.isHttpUri(e))
            return c ? "LOCALFILE" : !1;
          var v = t.each(C, this.ns.http("status"));
          if (v.length)
            for (let B = 0; B < v.length; B++)
              (v[B] === 200 || v[B] === 404) && (i = !0);
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
      return $c(t);
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
    r = Tt(r, e.value);
    const c = r.replace(/^http:/, "ws:").replace(/^https:/, "wss:");
    var h = function() {
      var p;
      if (typeof WebSocket < "u")
        p = new WebSocket(c);
      else if (typeof window < "u" && window.WebSocket)
        p = window.WebSocket(c);
      else
        return;
      p.onopen = function() {
        l = 1500, this.send("sub " + e.value), u && a.requestDownstreamAction(e, i);
      };
      var m = s.patchControlFor(e);
      m.upstreamCount = 0, p.onerror = function(v) {
      }, p.onclose = function(w) {
        l *= 2, u += 1, setTimeout(function() {
          h();
        }, l);
      }, p.onmessage = function(w) {
        if (w.data && w.data.slice(0, 3) === "pub") {
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
        a.update(e, t, function(P, G, R) {
          G ? A() : K(new Error(R));
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
      var p = this.patchControlFor(h), m = Date.now(), w = ["subject", "predicate", "object", "why"], v = ["insert", "delete"], C = {
        delete: u,
        insert: c
      };
      v.map(function(A) {
        C[A].map(function(K) {
          if (!h.equals(K.graph))
            throw new Error("update: destination " + h + " inconsistent with delete quad " + K.graph);
          w.map(function(P) {
            if (typeof K[P] > "u")
              throw new Error("update: undefined " + P + " of statement.");
          });
        });
      });
      var T = this.editable(h.value, l);
      if (T === !1)
        throw new Error("Update: Can't make changes in uneditable " + h);
      if (T === void 0) {
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
      } else if (T.indexOf("SPARQL") >= 0 || T.indexOf("N3PATCH") >= 0) {
        var B = T.indexOf("SPARQL") >= 0, O = [];
        u.length && (O = this.statementArrayBnodes(u)), c.length && (O = O.concat(this.statementArrayBnodes(c)));
        var X = this.bnodeContext(O, h), Y = B ? this.constructSparqlUpdateQuery(u, c, X) : this.constructN3PatchQuery(u, c, X);
        s.contentType = B ? "application/sparql-update" : "text/n3", p.pendingUpstream = p.pendingUpstream ? p.pendingUpstream + 1 : 1, "upstreamCount" in p && (p.upstreamCount += 1), this.fire(h.value, Y, (A, K, P, G) => {
          if (G.elapsedTimeMs = Date.now() - m, K) {
            try {
              l.remove(u);
            } catch (H) {
              K = !1, P = "Remote Ok BUT error deleting " + u.length + " from store!!! " + H;
            }
            for (let H = 0; H < c.length; H++)
              l.add(c[H].subject, c[H].predicate, c[H].object, h);
          }
          if (r(A, K, P, G), p.pendingUpstream -= 1, p.pendingUpstream === 0 && p.downstreamAction) {
            var R = p.downstreamAction;
            delete p.downstreamAction, R(h);
          }
        }, s);
      } else if (T.indexOf("DAV") >= 0)
        this.updateDav(h, u, c, r, s);
      else if (T.indexOf("LOCALFILE") >= 0)
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
        throw new Error("Unhandled edit method: '" + T + "' for " + h);
    } catch (A) {
      r(void 0, !1, "Exception in update: " + A + `
` + rd(A));
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
    for (let v = 0; v < t.length; v++)
      pi(h, t[v]);
    for (let v = 0; v < r.length; v++)
      h.push(r[v]);
    const p = this.serialize(e.value, h, c);
    var m = a.the(u, this.ns.httph("content-location")), w;
    return m && (w = Tt(m.value, w)), s.contentType = c, s.noMeta = !0, s.body = p, a.fetcher.webOperation("PUT", w, s).then((v) => {
      if (!v.ok)
        throw new Error(v.error);
      for (let C = 0; C < t.length; C++)
        a.remove(t[C]);
      for (let C = 0; C < r.length; C++)
        a.add(r[C].subject, r[C].predicate, r[C].object, e);
      i(e.value, v.ok, v.responseText, v);
    }).catch((v) => {
      i(e.value, !1, v.message, v);
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
    for (let p = 0; p < t.length; p++)
      pi(l, t[p]);
    for (let p = 0; p < r.length; p++)
      l.push(r[p]);
    var u = e.value.lastIndexOf(".");
    if (u < 1)
      throw new Error("Rewriting file: No filename extension: " + e.value);
    var c = e.value.slice(u + 1);
    let h = rt.CONTENT_TYPE_BY_EXT[c];
    if (!h)
      throw new Error("File extension ." + c + " not supported for data write");
    s.body = this.serialize(e.value, l, h), s.contentType = h, a.fetcher.webOperation("PUT", e.value, s).then((p) => {
      if (!p.ok) return i(e.value, !1, p.error);
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
    var a = $l(i);
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
const pa = {
  ...mi,
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
    return new gn(n, e || {
      rdfFactory: mi
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
}, oo = {};
for (const n in pa)
  typeof pa[n] == "function" && (oo[n] = pa[n].bind(pa));
const {
  graph: Yd,
  lit: rl,
  namedNode: Kn
} = oo;
new Pr();
je.fromValue;
tn.nextId;
function uo(n) {
  const e = Yd(), t = {};
  n?.fetch && (t.fetch = n.fetch);
  const r = new rt(e, t);
  e.updater = new Jd(e);
  async function i(s) {
    const a = s.replace(/#.*$/, ""), l = Kn(a);
    return await r.load(l), l;
  }
  return { store: e, fetcher: r, fetchDocument: i };
}
const ya = [];
function Fe(n) {
  ya.push(n);
}
function Ri(n, e) {
  const t = [];
  for (let r = ya.length - 1; r >= 0; r--)
    try {
      ya[r].canHandle(n, e) && t.push(ya[r]);
    } catch {
    }
  return t;
}
const Ta = new TextEncoder(), cr = new TextDecoder();
function co(...n) {
  const e = n.reduce((i, { length: s }) => i + s, 0), t = new Uint8Array(e);
  let r = 0;
  for (const i of n)
    t.set(i, r), r += i.length;
  return t;
}
function qn(n) {
  const e = new Uint8Array(n.length);
  for (let t = 0; t < n.length; t++) {
    const r = n.charCodeAt(t);
    if (r > 127)
      throw new TypeError("non-ASCII string encountered in encode()");
    e[t] = r;
  }
  return e;
}
function Qd(n) {
  if (Uint8Array.prototype.toBase64)
    return n.toBase64();
  const e = 32768, t = [];
  for (let r = 0; r < n.length; r += e)
    t.push(String.fromCharCode.apply(null, n.subarray(r, r + e)));
  return btoa(t.join(""));
}
function Zd(n) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(n);
  const e = atob(n), t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r);
  return t;
}
function sr(n) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(typeof n == "string" ? n : cr.decode(n), {
      alphabet: "base64url"
    });
  let e = n;
  e instanceof Uint8Array && (e = cr.decode(e)), e = e.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return Zd(e);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}
function Fr(n) {
  let e = n;
  return typeof e == "string" && (e = Ta.encode(e)), Uint8Array.prototype.toBase64 ? e.toBase64({ alphabet: "base64url", omitPadding: !0 }) : Qd(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
class Dt extends Error {
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(e, t) {
    super(e, t), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
}
class jt extends Dt {
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(e, t, r = "unspecified", i = "unspecified") {
    super(e, { cause: { claim: r, reason: i, payload: t } }), this.claim = r, this.reason = i, this.payload = t;
  }
}
class al extends Dt {
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(e, t, r = "unspecified", i = "unspecified") {
    super(e, { cause: { claim: r, reason: i, payload: t } }), this.claim = r, this.reason = i, this.payload = t;
  }
}
class eh extends Dt {
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
}
class xt extends Dt {
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
}
class Ze extends Dt {
  static code = "ERR_JWS_INVALID";
  code = "ERR_JWS_INVALID";
}
class Qt extends Dt {
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
}
class th extends Dt {
  static code = "ERR_JWK_INVALID";
  code = "ERR_JWK_INVALID";
}
class ho extends Dt {
  static code = "ERR_JWKS_INVALID";
  code = "ERR_JWKS_INVALID";
}
class fo extends Dt {
  static code = "ERR_JWKS_NO_MATCHING_KEY";
  code = "ERR_JWKS_NO_MATCHING_KEY";
  constructor(e = "no applicable key found in the JSON Web Key Set", t) {
    super(e, t);
  }
}
class nh extends Dt {
  [Symbol.asyncIterator];
  static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  constructor(e = "multiple matching keys found in the JSON Web Key Set", t) {
    super(e, t);
  }
}
class rh extends Dt {
  static code = "ERR_JWKS_TIMEOUT";
  code = "ERR_JWKS_TIMEOUT";
  constructor(e = "request timed out", t) {
    super(e, t);
  }
}
class ah extends Dt {
  static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  constructor(e = "signature verification failed", t) {
    super(e, t);
  }
}
const zt = (n, e = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${e} must be ${n}`), Yn = (n, e) => n.name === e;
function ri(n) {
  return parseInt(n.name.slice(4), 10);
}
function ih(n) {
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
function sh(n, e) {
  if (e && !n.usages.includes(e))
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${e}.`);
}
function lh(n, e, t) {
  switch (e) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!Yn(n.algorithm, "HMAC"))
        throw zt("HMAC");
      const r = parseInt(e.slice(2), 10);
      if (ri(n.algorithm.hash) !== r)
        throw zt(`SHA-${r}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!Yn(n.algorithm, "RSASSA-PKCS1-v1_5"))
        throw zt("RSASSA-PKCS1-v1_5");
      const r = parseInt(e.slice(2), 10);
      if (ri(n.algorithm.hash) !== r)
        throw zt(`SHA-${r}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!Yn(n.algorithm, "RSA-PSS"))
        throw zt("RSA-PSS");
      const r = parseInt(e.slice(2), 10);
      if (ri(n.algorithm.hash) !== r)
        throw zt(`SHA-${r}`, "algorithm.hash");
      break;
    }
    case "Ed25519":
    case "EdDSA": {
      if (!Yn(n.algorithm, "Ed25519"))
        throw zt("Ed25519");
      break;
    }
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87": {
      if (!Yn(n.algorithm, e))
        throw zt(e);
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!Yn(n.algorithm, "ECDSA"))
        throw zt("ECDSA");
      const r = ih(e);
      if (n.algorithm.namedCurve !== r)
        throw zt(r, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  sh(n, t);
}
function po(n, e, ...t) {
  if (t = t.filter(Boolean), t.length > 2) {
    const r = t.pop();
    n += `one of type ${t.join(", ")}, or ${r}.`;
  } else t.length === 2 ? n += `one of type ${t[0]} or ${t[1]}.` : n += `of type ${t[0]}.`;
  return e == null ? n += ` Received ${e}` : typeof e == "function" && e.name ? n += ` Received function ${e.name}` : typeof e == "object" && e != null && e.constructor?.name && (n += ` Received an instance of ${e.constructor.name}`), n;
}
const Oi = (n, ...e) => po("Key must be ", n, ...e), mo = (n, e, ...t) => po(`Key for the ${n} algorithm must be `, e, ...t), ki = (n) => {
  if (n?.[Symbol.toStringTag] === "CryptoKey")
    return !0;
  try {
    return n instanceof CryptoKey;
  } catch {
    return !1;
  }
}, Ui = (n) => n?.[Symbol.toStringTag] === "KeyObject", Pi = (n) => ki(n) || Ui(n);
function go(...n) {
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
const oh = (n) => typeof n == "object" && n !== null;
function an(n) {
  if (!oh(n) || Object.prototype.toString.call(n) !== "[object Object]")
    return !1;
  if (Object.getPrototypeOf(n) === null)
    return !0;
  let e = n;
  for (; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(n) === e;
}
async function uh(n, e) {
  const t = `SHA-${n.slice(-3)}`;
  return new Uint8Array(await crypto.subtle.digest(t, e));
}
function yo(n, e) {
  if (n.startsWith("RS") || n.startsWith("PS")) {
    const { modulusLength: t } = e.algorithm;
    if (typeof t != "number" || t < 2048)
      throw new TypeError(`${n} requires key modulusLength to be 2048 bits or larger`);
  }
}
function ch(n) {
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
          throw new xt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
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
          throw new xt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
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
          throw new xt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
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
          throw new xt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new xt('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm: e, keyUsages: t };
}
async function va(n) {
  if (!n.alg)
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  const { algorithm: e, keyUsages: t } = ch(n), r = { ...n };
  return r.kty !== "AKP" && delete r.alg, delete r.use, crypto.subtle.importKey("jwk", r, e, n.ext ?? !(n.d || n.priv), n.key_ops ?? t);
}
async function dh(n, e, t) {
  if (!an(n))
    throw new TypeError("JWK must be an object");
  let r;
  switch (e ??= n.alg, r ??= n.ext, n.kty) {
    case "oct":
      if (typeof n.k != "string" || !n.k)
        throw new TypeError('missing "k" (Key Value) Parameter value');
      return sr(n.k);
    case "RSA":
      if ("oth" in n && n.oth !== void 0)
        throw new xt('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
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
      throw new xt('Unsupported "kty" (Key Type) Parameter value');
  }
}
function vo(n, e, t, r, i) {
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
      throw new xt(`Extension Header Parameter "${a}" is not recognized`);
    if (i[a] === void 0)
      throw new n(`Extension Header Parameter "${a}" is missing`);
    if (s.get(a) && r[a] === void 0)
      throw new n(`Extension Header Parameter "${a}" MUST be integrity protected`);
  }
  return new Set(r.crit);
}
function hh(n, e) {
  if (e !== void 0 && (!Array.isArray(e) || e.some((t) => typeof t != "string")))
    throw new TypeError(`"${n}" option must be an array of strings`);
  if (e)
    return new Set(e);
}
const Sa = (n) => an(n) && typeof n.kty == "string", fh = (n) => n.kty !== "oct" && (n.kty === "AKP" && typeof n.priv == "string" || typeof n.d == "string"), ph = (n) => n.kty !== "oct" && n.d === void 0 && n.priv === void 0, mh = (n) => n.kty === "oct" && typeof n.k == "string";
let lr;
const il = async (n, e, t, r = !1) => {
  lr ||= /* @__PURE__ */ new WeakMap();
  let i = lr.get(n);
  if (i?.[t])
    return i[t];
  const s = await va({ ...e, alg: t });
  return r && Object.freeze(n), i ? i[t] = s : lr.set(n, { [t]: s }), s;
}, gh = (n, e) => {
  lr ||= /* @__PURE__ */ new WeakMap();
  let t = lr.get(n);
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
  return t ? t[e] = s : lr.set(n, { [e]: s }), s;
};
async function wo(n, e) {
  if (n instanceof Uint8Array || ki(n))
    return n;
  if (Ui(n)) {
    if (n.type === "secret")
      return n.export();
    if ("toCryptoKey" in n && typeof n.toCryptoKey == "function")
      try {
        return gh(n, e);
      } catch (r) {
        if (r instanceof TypeError)
          throw r;
      }
    let t = n.export({ format: "jwk" });
    return il(n, t, e);
  }
  if (Sa(n))
    return n.k ? sr(n.k) : il(n, n, e, !0);
  throw new Error("unreachable");
}
const ar = (n) => n?.[Symbol.toStringTag], wi = (n, e, t) => {
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
}, yh = (n, e, t) => {
  if (!(e instanceof Uint8Array)) {
    if (Sa(e)) {
      if (mh(e) && wi(n, e, t))
        return;
      throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
    }
    if (!Pi(e))
      throw new TypeError(mo(n, e, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
    if (e.type !== "secret")
      throw new TypeError(`${ar(e)} instances for symmetric algorithms must be of type "secret"`);
  }
}, vh = (n, e, t) => {
  if (Sa(e))
    switch (t) {
      case "decrypt":
      case "sign":
        if (fh(e) && wi(n, e, t))
          return;
        throw new TypeError("JSON Web Key for this operation must be a private JWK");
      case "encrypt":
      case "verify":
        if (ph(e) && wi(n, e, t))
          return;
        throw new TypeError("JSON Web Key for this operation must be a public JWK");
    }
  if (!Pi(e))
    throw new TypeError(mo(n, e, "CryptoKey", "KeyObject", "JSON Web Key"));
  if (e.type === "secret")
    throw new TypeError(`${ar(e)} instances for asymmetric algorithms must not be of type "secret"`);
  if (e.type === "public")
    switch (t) {
      case "sign":
        throw new TypeError(`${ar(e)} instances for asymmetric algorithm signing must be of type "private"`);
      case "decrypt":
        throw new TypeError(`${ar(e)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
  if (e.type === "private")
    switch (t) {
      case "verify":
        throw new TypeError(`${ar(e)} instances for asymmetric algorithm verifying must be of type "public"`);
      case "encrypt":
        throw new TypeError(`${ar(e)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
function Eo(n, e, t) {
  switch (n.substring(0, 2)) {
    case "A1":
    case "A2":
    case "di":
    case "HS":
    case "PB":
      yh(n, e, t);
      break;
    default:
      vh(n, e, t);
  }
}
async function wh(n) {
  if (Ui(n))
    if (n.type === "secret")
      n = n.export();
    else
      return n.export({ format: "jwk" });
  if (n instanceof Uint8Array)
    return {
      kty: "oct",
      k: Fr(n)
    };
  if (!ki(n))
    throw new TypeError(Oi(n, "CryptoKey", "KeyObject", "Uint8Array"));
  if (!n.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  const { ext: e, key_ops: t, alg: r, use: i, ...s } = await crypto.subtle.exportKey("jwk", n);
  return s.kty === "AKP" && (s.alg = r), s;
}
async function Mi(n) {
  return wh(n);
}
function Co(n, e) {
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
      throw new xt(`alg ${n} is not supported either by JOSE or your javascript runtime`);
  }
}
async function bo(n, e, t) {
  if (e instanceof Uint8Array) {
    if (!n.startsWith("HS"))
      throw new TypeError(Oi(e, "CryptoKey", "KeyObject", "JSON Web Key"));
    return crypto.subtle.importKey("raw", e, { hash: `SHA-${n.slice(-3)}`, name: "HMAC" }, !1, [t]);
  }
  return lh(e, n, t), e;
}
async function Eh(n, e, t, r) {
  const i = await bo(n, e, "verify");
  yo(n, i);
  const s = Co(n, i.algorithm);
  try {
    return await crypto.subtle.verify(s, i, t, r);
  } catch {
    return !1;
  }
}
async function Ch(n, e, t) {
  if (!an(n))
    throw new Ze("Flattened JWS must be an object");
  if (n.protected === void 0 && n.header === void 0)
    throw new Ze('Flattened JWS must have either of the "protected" or "header" members');
  if (n.protected !== void 0 && typeof n.protected != "string")
    throw new Ze("JWS Protected Header incorrect type");
  if (n.payload === void 0)
    throw new Ze("JWS Payload missing");
  if (typeof n.signature != "string")
    throw new Ze("JWS Signature missing or incorrect type");
  if (n.header !== void 0 && !an(n.header))
    throw new Ze("JWS Unprotected Header incorrect type");
  let r = {};
  if (n.protected)
    try {
      const T = sr(n.protected);
      r = JSON.parse(cr.decode(T));
    } catch {
      throw new Ze("JWS Protected Header is invalid");
    }
  if (!go(r, n.header))
    throw new Ze("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  const i = {
    ...r,
    ...n.header
  }, s = vo(Ze, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, r, i);
  let a = !0;
  if (s.has("b64") && (a = r.b64, typeof a != "boolean"))
    throw new Ze('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
  const { alg: l } = i;
  if (typeof l != "string" || !l)
    throw new Ze('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  const u = t && hh("algorithms", t.algorithms);
  if (u && !u.has(l))
    throw new eh('"alg" (Algorithm) Header Parameter value not allowed');
  if (a) {
    if (typeof n.payload != "string")
      throw new Ze("JWS Payload must be a string");
  } else if (typeof n.payload != "string" && !(n.payload instanceof Uint8Array))
    throw new Ze("JWS Payload must be a string or an Uint8Array instance");
  let c = !1;
  typeof e == "function" && (e = await e(r, n), c = !0), Eo(l, e, "verify");
  const h = co(n.protected !== void 0 ? qn(n.protected) : new Uint8Array(), qn("."), typeof n.payload == "string" ? a ? qn(n.payload) : Ta.encode(n.payload) : n.payload);
  let p;
  try {
    p = sr(n.signature);
  } catch {
    throw new Ze("Failed to base64url decode the signature");
  }
  const m = await wo(e, l);
  if (!await Eh(l, m, p, h))
    throw new ah();
  let v;
  if (a)
    try {
      v = sr(n.payload);
    } catch {
      throw new Ze("Failed to base64url decode the payload");
    }
  else typeof n.payload == "string" ? v = Ta.encode(n.payload) : v = n.payload;
  const C = { payload: v };
  return n.protected !== void 0 && (C.protectedHeader = r), n.header !== void 0 && (C.unprotectedHeader = n.header), c ? { ...C, key: m } : C;
}
async function bh(n, e, t) {
  if (n instanceof Uint8Array && (n = cr.decode(n)), typeof n != "string")
    throw new Ze("Compact JWS must be a string or Uint8Array");
  const { 0: r, 1: i, 2: s, length: a } = n.split(".");
  if (a !== 3)
    throw new Ze("Invalid Compact JWS");
  const l = await Ch({ payload: i, protected: r, signature: s }, e, t), u = { payload: l.payload, protectedHeader: l.protectedHeader };
  return typeof e == "function" ? { ...u, key: l.key } : u;
}
const En = (n) => Math.floor(n.getTime() / 1e3), No = 60, Ao = No * 60, $i = Ao * 24, Nh = $i * 7, Ah = $i * 365.25, xh = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function Br(n) {
  const e = xh.exec(n);
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
      i = Math.round(t * No);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      i = Math.round(t * Ao);
      break;
    case "day":
    case "days":
    case "d":
      i = Math.round(t * $i);
      break;
    case "week":
    case "weeks":
    case "w":
      i = Math.round(t * Nh);
      break;
    default:
      i = Math.round(t * Ah);
      break;
  }
  return e[1] === "-" || e[4] === "ago" ? -i : i;
}
function Ln(n, e) {
  if (!Number.isFinite(e))
    throw new TypeError(`Invalid ${n} input`);
  return e;
}
const sl = (n) => n.includes("/") ? n.toLowerCase() : `application/${n.toLowerCase()}`, Th = (n, e) => typeof n == "string" ? e.includes(n) : Array.isArray(n) ? e.some(Set.prototype.has.bind(new Set(n))) : !1;
function Dh(n, e, t = {}) {
  let r;
  try {
    r = JSON.parse(cr.decode(e));
  } catch {
  }
  if (!an(r))
    throw new Qt("JWT Claims Set must be a top-level JSON object");
  const { typ: i } = t;
  if (i && (typeof n.typ != "string" || sl(n.typ) !== sl(i)))
    throw new jt('unexpected "typ" JWT header value', r, "typ", "check_failed");
  const { requiredClaims: s = [], issuer: a, subject: l, audience: u, maxTokenAge: c } = t, h = [...s];
  c !== void 0 && h.push("iat"), u !== void 0 && h.push("aud"), l !== void 0 && h.push("sub"), a !== void 0 && h.push("iss");
  for (const v of new Set(h.reverse()))
    if (!(v in r))
      throw new jt(`missing required "${v}" claim`, r, v, "missing");
  if (a && !(Array.isArray(a) ? a : [a]).includes(r.iss))
    throw new jt('unexpected "iss" claim value', r, "iss", "check_failed");
  if (l && r.sub !== l)
    throw new jt('unexpected "sub" claim value', r, "sub", "check_failed");
  if (u && !Th(r.aud, typeof u == "string" ? [u] : u))
    throw new jt('unexpected "aud" claim value', r, "aud", "check_failed");
  let p;
  switch (typeof t.clockTolerance) {
    case "string":
      p = Br(t.clockTolerance);
      break;
    case "number":
      p = t.clockTolerance;
      break;
    case "undefined":
      p = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate: m } = t, w = En(m || /* @__PURE__ */ new Date());
  if ((r.iat !== void 0 || c) && typeof r.iat != "number")
    throw new jt('"iat" claim must be a number', r, "iat", "invalid");
  if (r.nbf !== void 0) {
    if (typeof r.nbf != "number")
      throw new jt('"nbf" claim must be a number', r, "nbf", "invalid");
    if (r.nbf > w + p)
      throw new jt('"nbf" claim timestamp check failed', r, "nbf", "check_failed");
  }
  if (r.exp !== void 0) {
    if (typeof r.exp != "number")
      throw new jt('"exp" claim must be a number', r, "exp", "invalid");
    if (r.exp <= w - p)
      throw new al('"exp" claim timestamp check failed', r, "exp", "check_failed");
  }
  if (c) {
    const v = w - r.iat, C = typeof c == "number" ? c : Br(c);
    if (v - p > C)
      throw new al('"iat" claim timestamp check failed (too far in the past)', r, "iat", "check_failed");
    if (v < 0 - p)
      throw new jt('"iat" claim timestamp check failed (it should be in the past)', r, "iat", "check_failed");
  }
  return r;
}
class _h {
  #e;
  constructor(e) {
    if (!an(e))
      throw new TypeError("JWT Claims Set MUST be an object");
    this.#e = structuredClone(e);
  }
  data() {
    return Ta.encode(JSON.stringify(this.#e));
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
    typeof e == "number" ? this.#e.nbf = Ln("setNotBefore", e) : e instanceof Date ? this.#e.nbf = Ln("setNotBefore", En(e)) : this.#e.nbf = En(/* @__PURE__ */ new Date()) + Br(e);
  }
  set exp(e) {
    typeof e == "number" ? this.#e.exp = Ln("setExpirationTime", e) : e instanceof Date ? this.#e.exp = Ln("setExpirationTime", En(e)) : this.#e.exp = En(/* @__PURE__ */ new Date()) + Br(e);
  }
  set iat(e) {
    e === void 0 ? this.#e.iat = En(/* @__PURE__ */ new Date()) : e instanceof Date ? this.#e.iat = Ln("setIssuedAt", En(e)) : typeof e == "string" ? this.#e.iat = Ln("setIssuedAt", En(/* @__PURE__ */ new Date()) + Br(e)) : this.#e.iat = Ln("setIssuedAt", e);
  }
}
async function Sh(n, e, t) {
  const r = await bh(n, e, t);
  if (r.protectedHeader.crit?.includes("b64") && r.protectedHeader.b64 === !1)
    throw new Qt("JWTs MUST NOT use unencoded payload");
  const s = { payload: Dh(r.protectedHeader, r.payload, t), protectedHeader: r.protectedHeader };
  return typeof e == "function" ? { ...s, key: r.key } : s;
}
async function Ih(n, e, t) {
  const r = await bo(n, e, "sign");
  yo(n, r);
  const i = await crypto.subtle.sign(Co(n, r.algorithm), r, t);
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
    if (!go(this.#t, this.#n))
      throw new Ze("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    const r = {
      ...this.#t,
      ...this.#n
    }, i = vo(Ze, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, this.#t, r);
    let s = !0;
    if (i.has("b64") && (s = this.#t.b64, typeof s != "boolean"))
      throw new Ze('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    const { alg: a } = r;
    if (typeof a != "string" || !a)
      throw new Ze('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    Eo(a, e, "sign");
    let l, u;
    s ? (l = Fr(this.#e), u = qn(l)) : (u = this.#e, l = "");
    let c, h;
    this.#t ? (c = Fr(JSON.stringify(this.#t)), h = qn(c)) : (c = "", h = new Uint8Array());
    const p = co(h, qn("."), u), m = await wo(e, a), w = await Ih(a, m, p), v = {
      signature: Fr(w),
      payload: l
    };
    return this.#n && (v.header = this.#n), this.#t && (v.protected = c), v;
  }
}
class Bh {
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
    this.#t = new _h(e);
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
    const r = new Bh(this.#t.data());
    if (r.setProtectedHeader(this.#e), Array.isArray(this.#e?.crit) && this.#e.crit.includes("b64") && this.#e.b64 === !1)
      throw new Qt("JWTs MUST NOT use unencoded payload");
    return r.sign(e, t);
  }
}
const Jt = (n, e) => {
  if (typeof n != "string" || !n)
    throw new th(`${e} missing or invalid`);
};
async function Rh(n, e) {
  let t;
  if (Sa(n))
    t = n;
  else if (Pi(n))
    t = await Mi(n);
  else
    throw new TypeError(Oi(n, "CryptoKey", "KeyObject", "JSON Web Key"));
  if (e ??= "sha256", e !== "sha256" && e !== "sha384" && e !== "sha512")
    throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
  let r;
  switch (t.kty) {
    case "AKP":
      Jt(t.alg, '"alg" (Algorithm) Parameter'), Jt(t.pub, '"pub" (Public key) Parameter'), r = { alg: t.alg, kty: t.kty, pub: t.pub };
      break;
    case "EC":
      Jt(t.crv, '"crv" (Curve) Parameter'), Jt(t.x, '"x" (X Coordinate) Parameter'), Jt(t.y, '"y" (Y Coordinate) Parameter'), r = { crv: t.crv, kty: t.kty, x: t.x, y: t.y };
      break;
    case "OKP":
      Jt(t.crv, '"crv" (Subtype of Key Pair) Parameter'), Jt(t.x, '"x" (Public Key) Parameter'), r = { crv: t.crv, kty: t.kty, x: t.x };
      break;
    case "RSA":
      Jt(t.e, '"e" (Exponent) Parameter'), Jt(t.n, '"n" (Modulus) Parameter'), r = { e: t.e, kty: t.kty, n: t.n };
      break;
    case "oct":
      Jt(t.k, '"k" (Key Value) Parameter'), r = { k: t.k, kty: t.kty };
      break;
    default:
      throw new xt('"kty" (Key Type) Parameter missing or unsupported');
  }
  const i = qn(JSON.stringify(r));
  return Fr(await uh(e, i));
}
function Oh(n) {
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
      throw new xt('Unsupported "alg" value for a JSON Web Key Set');
  }
}
function kh(n) {
  return n && typeof n == "object" && Array.isArray(n.keys) && n.keys.every(Uh);
}
function Uh(n) {
  return an(n);
}
class Ph {
  #e;
  #t = /* @__PURE__ */ new WeakMap();
  constructor(e) {
    if (!kh(e))
      throw new ho("JSON Web Key Set malformed");
    this.#e = structuredClone(e);
  }
  jwks() {
    return this.#e;
  }
  async getKey(e, t) {
    const { alg: r, kid: i } = { ...e, ...t?.header }, s = Oh(r), a = this.#e.keys.filter((c) => {
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
      throw new fo();
    if (u !== 1) {
      const c = new nh(), h = this.#t;
      throw c[Symbol.asyncIterator] = async function* () {
        for (const p of a)
          try {
            yield await ll(h, p, r);
          } catch {
          }
      }, c;
    }
    return ll(this.#t, l, r);
  }
}
async function ll(n, e, t) {
  const r = n.get(e) || n.set(e, {}).get(e);
  if (r[t] === void 0) {
    const i = await dh({ ...e, ext: !0 }, t);
    if (i instanceof Uint8Array || i.type !== "public")
      throw new ho("JSON Web Key Set members must be public keys");
    r[t] = i;
  }
  return r[t];
}
function ol(n) {
  const e = new Ph(n), t = async (r, i) => e.getKey(r, i);
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
let Ei;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (Ei = "jose/v6.1.3");
const $h = /* @__PURE__ */ Symbol();
async function qh(n, e, t, r = fetch) {
  const i = await r(n, {
    method: "GET",
    signal: t,
    redirect: "manual",
    headers: e
  }).catch((s) => {
    throw s.name === "TimeoutError" ? new rh() : s;
  });
  if (i.status !== 200)
    throw new Dt("Expected 200 OK from the JSON Web Key Set HTTP response");
  try {
    return await i.json();
  } catch {
    throw new Dt("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
}
const ai = /* @__PURE__ */ Symbol();
function Hh(n, e) {
  return !(typeof n != "object" || n === null || !("uat" in n) || typeof n.uat != "number" || Date.now() - n.uat >= e || !("jwks" in n) || !an(n.jwks) || !Array.isArray(n.jwks.keys) || !Array.prototype.every.call(n.jwks.keys, an));
}
class Wh {
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
    this.#e = new URL(e.href), this.#t = typeof t?.timeoutDuration == "number" ? t?.timeoutDuration : 5e3, this.#n = typeof t?.cooldownDuration == "number" ? t?.cooldownDuration : 3e4, this.#o = typeof t?.cacheMaxAge == "number" ? t?.cacheMaxAge : 6e5, this.#a = new Headers(t?.headers), Ei && !this.#a.has("User-Agent") && this.#a.set("User-Agent", Ei), this.#a.has("accept") || (this.#a.set("accept", "application/json"), this.#a.append("accept", "application/jwk-set+json")), this.#u = t?.[$h], t?.[ai] !== void 0 && (this.#l = t?.[ai], Hh(t?.[ai], this.#o) && (this.#i = this.#l.uat, this.#s = ol(this.#l.jwks)));
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
      if (r instanceof fo && this.coolingDown() === !1)
        return await this.reload(), this.#s(e, t);
      throw r;
    }
  }
  async reload() {
    this.#r && Mh() && (this.#r = void 0), this.#r ||= qh(this.#e.href, this.#a, AbortSignal.timeout(this.#t), this.#u).then((e) => {
      this.#s = ol(e), this.#l && (this.#l.uat = Date.now(), this.#l.jwks = e), this.#i = Date.now(), this.#r = void 0;
    }).catch((e) => {
      throw this.#r = void 0, e;
    }), await this.#r;
  }
}
function Vh(n, e) {
  const t = new Wh(n, e), r = async (i, s) => t.getKey(i, s);
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
function Kh(n) {
  if (typeof n != "string")
    throw new Qt("JWTs must use Compact JWS serialization, JWT must be a string");
  const { 1: e, length: t } = n.split(".");
  if (t === 5)
    throw new Qt("Only JWTs using Compact JWS serialization can be decoded");
  if (t !== 3)
    throw new Qt("Invalid JWT");
  if (!e)
    throw new Qt("JWTs must contain a payload");
  let r;
  try {
    r = sr(e);
  } catch {
    throw new Qt("Failed to base64url decode the payload");
  }
  let i;
  try {
    i = JSON.parse(cr.decode(r));
  } catch {
    throw new Qt("Failed to parse the decoded payload as JSON");
  }
  if (!an(i))
    throw new Qt("Invalid JWT Claims Set");
  return i;
}
function ii(n) {
  const e = n?.modulusLength ?? 2048;
  if (typeof e != "number" || e < 2048)
    throw new xt("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
  return e;
}
async function Gh(n, e) {
  let t, r;
  switch (n) {
    case "PS256":
    case "PS384":
    case "PS512":
      t = {
        name: "RSA-PSS",
        hash: `SHA-${n.slice(-3)}`,
        publicExponent: Uint8Array.of(1, 0, 1),
        modulusLength: ii(e)
      }, r = ["sign", "verify"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      t = {
        name: "RSASSA-PKCS1-v1_5",
        hash: `SHA-${n.slice(-3)}`,
        publicExponent: Uint8Array.of(1, 0, 1),
        modulusLength: ii(e)
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
        modulusLength: ii(e)
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
          throw new xt("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, and X25519");
      }
      break;
    }
    default:
      throw new xt('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
  }
  return crypto.subtle.generateKey(t, !1, r);
}
const Qn = {
  STATE_CHANGE: "sessionStateChange",
  EXPIRATION_WARNING: "sessionExpirationWarning",
  EXPIRATION: "sessionExpiration"
};
class Xh {
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
async function xo(n, e, t, r = null) {
  const i = await Mi(n.publicKey), s = { htu: e, htm: t };
  return r && (s.ath = r), new Lh(s).setIssuedAt().setJti(crypto.randomUUID()).setProtectedHeader({ alg: "ES256", typ: "dpop+jwt", jwk: i }).sign(n.privateKey);
}
async function zh(n) {
  const e = new TextEncoder().encode(n), t = await crypto.subtle.digest("SHA-256", e), r = Array.from(new Uint8Array(t));
  return btoa(String.fromCharCode(...r)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function Jh(n) {
  const e = new URL(n).origin, t = await fetch(`${e}/.well-known/openid-configuration`);
  if (!t.ok) throw new Error(`OIDC discovery failed: ${t.status}`);
  return t.json();
}
async function Yh(n, e) {
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
async function To(n, e, t) {
  const r = await xo(t, n, "POST"), i = await fetch(n, {
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
async function Qh(n, e, t, r, i) {
  const s = Vh(new URL(e)), { payload: a } = await Sh(n, s, {
    issuer: t,
    audience: "solid"
  }), l = await Rh(await Mi(i.publicKey));
  if (a.cnf?.jkt !== l)
    throw new Error("DPoP thumbprint mismatch");
  if (a.client_id !== r)
    throw new Error("client_id mismatch");
  return a;
}
async function Zh(n) {
  await n.init();
  const [e, t, r, i] = await Promise.all([
    n.getItem("refresh_token"),
    n.getItem("token_endpoint"),
    n.getItem("client_id"),
    n.getItem("dpop_keypair")
  ]);
  if (!e || !t || !r || !i)
    throw new Error("Missing refresh data");
  const s = await To(t, {
    grant_type: "refresh_token",
    refresh_token: e,
    client_id: r
  }, i);
  return s.refresh_token && await n.setItem("refresh_token", s.refresh_token), n.close(), { ...s, dpop_key_pair: i };
}
class ef extends EventTarget {
  constructor(e = {}) {
    super(), this.clientId = e.clientId || null, this.database = e.database || new Xh(), this.onStateChange = e.onStateChange || null, this.onExpirationWarning = e.onExpirationWarning || null, this.onExpiration = e.onExpiration || null, this._isActive = !1, this._webId = null, this._exp = null, this._ath = null, this._tokens = null, this._idpDetails = null, this._refreshPromise = null, this.onStateChange && this.addEventListener(Qn.STATE_CHANGE, this.onStateChange), this.onExpirationWarning && this.addEventListener(Qn.EXPIRATION_WARNING, this.onExpirationWarning), this.onExpiration && this.addEventListener(Qn.EXPIRATION, this.onExpiration);
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
    const r = new URL(t), i = r.origin + r.pathname + r.search, s = await Jh(e), a = s.issuer, l = (m) => m.endsWith("/") ? m.slice(0, -1) : m;
    if (l(e) !== l(a))
      throw new Error(`Issuer mismatch: ${a} !== ${e}`);
    sessionStorage.setItem("solid_oidc_idp", a), sessionStorage.setItem("solid_oidc_token_endpoint", s.token_endpoint), sessionStorage.setItem("solid_oidc_jwks_uri", s.jwks_uri);
    let u = this.clientId;
    u || (u = (await Yh(s.registration_endpoint, [i])).client_id, sessionStorage.setItem("solid_oidc_client_id", u));
    const c = await jh();
    sessionStorage.setItem("solid_oidc_pkce_verifier", c.verifier);
    const h = crypto.randomUUID();
    sessionStorage.setItem("solid_oidc_csrf", h);
    const p = new URL(s.authorization_endpoint);
    p.searchParams.set("response_type", "code"), p.searchParams.set("redirect_uri", i), p.searchParams.set("scope", "openid offline_access webid"), p.searchParams.set("client_id", u), p.searchParams.set("code_challenge_method", "S256"), p.searchParams.set("code_challenge", c.challenge), p.searchParams.set("state", h), p.searchParams.set("prompt", "consent"), window.location.href = p.toString();
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
    const h = await Gh("ES256"), p = await To(l, {
      grant_type: "authorization_code",
      code: t,
      code_verifier: a,
      redirect_uri: e.origin + e.pathname,
      client_id: c
    }, h);
    await Qh(p.access_token, u, r, c, h), this._idpDetails = { idp: r, jwksUri: u, tokenEndpoint: l }, await this.database.init(), await Promise.all([
      this.database.setItem("idp", r),
      this.database.setItem("jwks_uri", u),
      this.database.setItem("token_endpoint", l),
      this.database.setItem("client_id", c),
      this.database.setItem("dpop_keypair", h),
      this.database.setItem("refresh_token", p.refresh_token)
    ]), this.database.close(), sessionStorage.removeItem("solid_oidc_idp"), sessionStorage.removeItem("solid_oidc_token_endpoint"), sessionStorage.removeItem("solid_oidc_jwks_uri"), sessionStorage.removeItem("solid_oidc_client_id"), sessionStorage.removeItem("solid_oidc_pkce_verifier"), sessionStorage.removeItem("solid_oidc_csrf"), await this._setTokens({ ...p, dpop_key_pair: h }), this._dispatchStateChange();
  }
  /**
   * Restore session using stored refresh token
   */
  async restore() {
    return this._refreshPromise ? this._refreshPromise : (this._refreshPromise = (async () => {
      try {
        const e = await Zh(this.database);
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
    const a = await xo(
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
    const t = Kh(e.access_token);
    if (!t.webid) throw new Error("Missing webid claim");
    if (!t.exp) throw new Error("Missing exp claim");
    this._ath = await zh(e.access_token), this._webId = t.webid, this._exp = t.exp, this._isActive = !0;
  }
  _dispatchStateChange() {
    this.dispatchEvent(new CustomEvent(Qn.STATE_CHANGE, {
      detail: { isActive: this._isActive, webId: this._webId }
    }));
  }
  _dispatchExpirationWarning() {
    this.dispatchEvent(new CustomEvent(Qn.EXPIRATION_WARNING, {
      detail: { expires_in: this.getExpiresIn() }
    }));
  }
  _dispatchExpiration() {
    this.dispatchEvent(new CustomEvent(Qn.EXPIRATION));
  }
}
const tf = {
  label: "Source",
  icon: "📄",
  canHandle(n, e) {
    return !0;
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = n.doc(), i = e.match(null, null, null, r), s = e.fetcher, a = nf(i, r, e), l = document.createElement("div");
    l.className = "source-header";
    const u = document.createElement("h2");
    if (u.textContent = "Source", l.appendChild(u), s) {
      const h = document.createElement("button");
      h.className = "source-edit-btn", h.textContent = "Edit", h.addEventListener("click", () => {
        Do(t, l, a, r, s);
      }), l.appendChild(h);
    }
    if (t.appendChild(l), i.length === 0) {
      const h = document.createElement("p");
      h.textContent = "No triples found in this document.", t.appendChild(h);
      return;
    }
    const c = document.createElement("pre");
    c.className = "source-view", c.textContent = a, t.appendChild(c);
  }
};
function nf(n, e, t) {
  if (n.length === 0) return "";
  try {
    return Ur(e, t, void 0, "text/turtle") ?? "";
  } catch {
    return n.map(
      (r) => `<${r.subject.value}> <${r.predicate.value}> ${r.object.termType === "NamedNode" ? `<${r.object.value}>` : `"${r.object.value}"`} .`
    ).join(`
`);
  }
}
function Do(n, e, t, r, i) {
  for (; e.nextSibling; )
    e.nextSibling.remove();
  const s = e.querySelector(".source-edit-btn");
  s && s.remove();
  const a = document.createElement("div");
  a.className = "source-btn-group";
  const l = document.createElement("button");
  l.className = "source-save-btn", l.textContent = "Save";
  const u = document.createElement("button");
  u.className = "source-cancel-btn", u.textContent = "Cancel", a.appendChild(l), a.appendChild(u), e.appendChild(a);
  const c = document.createElement("textarea");
  c.className = "source-editor", c.value = t, c.spellcheck = !1, n.appendChild(c), c.focus();
  const h = document.createElement("p");
  h.className = "source-status", n.appendChild(h), u.addEventListener("click", () => {
    ul(n, e, t, r, i);
  }), l.addEventListener("click", async () => {
    l.disabled = !0, u.disabled = !0, h.textContent = "Saving...", h.className = "source-status";
    try {
      const p = await i.webOperation("PUT", r.value, {
        data: c.value,
        contentType: "text/turtle"
      });
      if (!p.ok)
        throw new Error(`${p.status} ${p.statusText}`);
      h.textContent = "Saved!", h.className = "source-status source-status-ok", setTimeout(() => {
        ul(n, e, c.value, r, i);
      }, 800);
    } catch (p) {
      const m = p instanceof Error ? p.message : String(p);
      h.textContent = `Save failed: ${m}`, h.className = "source-status source-status-error", l.disabled = !1, u.disabled = !1;
    }
  });
}
function ul(n, e, t, r, i) {
  for (; e.nextSibling; )
    e.nextSibling.remove();
  const s = e.querySelector(".source-btn-group");
  s && s.remove();
  const a = document.createElement("button");
  if (a.className = "source-edit-btn", a.textContent = "Edit", a.addEventListener("click", () => {
    Do(n, e, t, r, i);
  }), e.appendChild(a), t) {
    const l = document.createElement("pre");
    l.className = "source-view", l.textContent = t, n.appendChild(l);
  } else {
    const l = document.createElement("p");
    l.textContent = "No triples found in this document.", n.appendChild(l);
  }
}
Fe(tf);
const me = Ne("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), at = Ne("http://www.w3.org/2000/01/rdf-schema#"), tt = Ne("http://purl.org/dc/elements/1.1/"), de = Ne("http://purl.org/dc/terms/"), be = Ne("http://xmlns.com/foaf/0.1/"), et = Ne("http://www.w3.org/ns/ldp#"), nn = Ne("http://www.w3.org/ns/solid/terms#"), cl = Ne("http://www.w3.org/ns/posix/stat#"), we = Ne("http://www.w3.org/2006/vcard/ns#"), dr = Ne("http://www.w3.org/ns/pim/space#"), vt = Ne("http://www.w3.org/ns/auth/acl#"), yt = Ne("http://www.w3.org/ns/ui#"), Rt = Ne("http://rdfs.org/sioc/ns#"), Mt = Ne("http://www.w3.org/ns/pim/meeting#"), wt = Ne("http://www.w3.org/2005/01/wf/flow#"), gt = Ne("http://www.w3.org/ns/pim/transaction#"), Ci = Ne("http://www.w3.org/ns/pim/tracker#"), ze = Ne("https://www.w3.org/ns/activitystreams#"), Pn = Ne("http://www.w3.org/2002/01/bookmark#"), si = Ne("http://www.w3.org/ns/org#"), Da = Ne("http://www.w3.org/ns/pim/pad#"), wa = Ne("http://rdfs.org/sioc/types#"), Lr = Ne("http://purl.org/ontology/olo/core#"), rf = Ne("http://purl.org/ontology/pbo/core#"), af = Ne("http://purl.org/ontology/mo/"), L = Ne("https://schema.org/");
function sf(n) {
  const e = n.indexOf("#");
  return e >= 0 ? n.slice(e + 1) : "";
}
function fe(n) {
  const e = sf(n);
  if (e) return decodeURIComponent(e);
  try {
    const r = new URL(n).pathname.split("/").filter(Boolean);
    return r.length > 0 ? decodeURIComponent(r[r.length - 1]) : n;
  } catch {
    return n;
  }
}
const _o = "mashlib:navigate";
function bi(n) {
  window.dispatchEvent(
    new CustomEvent(_o, { detail: { uri: n } })
  );
}
function sn(n, e) {
  const t = document.createElement("a");
  return t.href = `?uri=${encodeURIComponent(n)}`, t.textContent = e, t.addEventListener("click", (r) => {
    r.preventDefault(), bi(n);
  }), t;
}
function lf(n, e) {
  return e.any(n, at("label"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value);
}
function of(n, e) {
  return e.match(null, null, null, null), fe(n);
}
function uf(n, e) {
  const t = e.match(n, null, null, null), r = /* @__PURE__ */ new Map();
  for (const s of t) {
    const a = s.predicate.value;
    r.has(a) || r.set(a, {
      predicate: a,
      predicateLabel: of(a, e),
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
function cf(n) {
  const e = document.createElement("span");
  if (e.className = "outline-value", n.termType === "NamedNode") {
    const t = sn(n.value, fe(n.value));
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
function df(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "outline-view";
  const i = lf(n, e), s = document.createElement("h2");
  s.className = "outline-title", s.textContent = i, r.appendChild(s);
  const a = document.createElement("p");
  a.className = "outline-uri";
  const l = document.createElement("code");
  l.textContent = n.value, a.appendChild(l), r.appendChild(a);
  const u = uf(n, e);
  if (u.length === 0) {
    const B = document.createElement("p");
    B.className = "outline-empty", B.textContent = "No triples found for this resource.", r.appendChild(B), t.appendChild(r);
    return;
  }
  const c = u.reduce((B, O) => B + O.objects.length, 0), h = document.createElement("p");
  h.className = "outline-count", h.textContent = `${c} triple${c !== 1 ? "s" : ""} across ${u.length} predicate${u.length !== 1 ? "s" : ""}`, r.appendChild(h);
  const p = document.createElement("table");
  p.className = "outline-table";
  const m = document.createElement("thead"), w = document.createElement("tr"), v = document.createElement("th");
  v.textContent = "Property";
  const C = document.createElement("th");
  C.textContent = "Value", w.appendChild(v), w.appendChild(C), m.appendChild(w), p.appendChild(m);
  const T = document.createElement("tbody");
  for (const B of u)
    for (let O = 0; O < B.objects.length; O++) {
      const X = document.createElement("tr"), Y = document.createElement("td");
      if (Y.className = "outline-predicate", O === 0) {
        const K = document.createElement("a");
        K.href = B.predicate, K.textContent = B.predicateLabel, K.title = B.predicate, K.target = "_blank", K.rel = "noopener", Y.appendChild(K), B.objects.length > 1 && (Y.rowSpan = B.objects.length), X.appendChild(Y);
      }
      const A = document.createElement("td");
      A.className = "outline-object", A.appendChild(cf(B.objects[O])), X.appendChild(A), T.appendChild(X);
    }
  p.appendChild(T), r.appendChild(p), t.appendChild(r);
}
const hf = {
  label: "Outline",
  icon: "🔍",
  canHandle(n, e) {
    return e.match(n, null, null, null).length > 0;
  },
  render(n, e, t) {
    df(n, e, t);
  }
};
Fe(hf);
const ff = {
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
      const p = document.createElement("p");
      p.textContent = "No properties found for this subject.", t.appendChild(p);
      return;
    }
    const l = /* @__PURE__ */ new Map();
    for (const p of a) {
      const m = p.predicate.value;
      l.has(m) || l.set(m, { predicate: p.predicate, objects: [] }), l.get(m).objects.push({
        value: p.object.value,
        isUri: p.object.termType === "NamedNode"
      });
    }
    const u = document.createElement("table");
    u.className = "properties-table";
    const c = document.createElement("thead");
    c.innerHTML = "<tr><th>Property</th><th>Value</th></tr>", u.appendChild(c);
    const h = document.createElement("tbody");
    for (const [, { predicate: p, objects: m }] of l)
      for (const w of m) {
        const v = document.createElement("tr"), C = document.createElement("td");
        C.className = "prop-predicate";
        const T = document.createElement("a");
        T.href = p.value, T.textContent = fe(p.value), T.title = p.value, T.target = "_blank", T.rel = "noopener", C.appendChild(T), v.appendChild(C);
        const B = document.createElement("td");
        if (B.className = "prop-value", w.isUri) {
          const O = document.createElement("a");
          O.href = w.value, O.textContent = fe(w.value), O.title = w.value, O.target = "_blank", O.rel = "noopener", B.appendChild(O);
        } else
          B.textContent = w.value;
        v.appendChild(B), h.appendChild(v);
      }
    u.appendChild(h), t.appendChild(u);
  }
};
Fe(ff);
const So = [
  { uri: "Read", label: "Read", description: "can view the resource" },
  { uri: "Append", label: "Append", description: "can add new content" },
  { uri: "Write", label: "Write", description: "can modify content" },
  { uri: "Control", label: "Control", description: "can manage sharing" }
], pf = [
  { label: "Owners", modes: ["Read", "Write", "Control"], color: "#7b2d8e" },
  { label: "Editors", modes: ["Read", "Write"], color: "#dc3545" },
  { label: "Posters", modes: ["Read", "Append"], color: "#e67e00" },
  { label: "Submitters", modes: ["Append"], color: "#ccaa00" },
  { label: "Viewers", modes: ["Read"], color: "#28a745" }
];
function mf(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return r.includes(et("Container").value) || r.includes(et("BasicContainer").value) ? !0 : n.value.endsWith("/");
}
function Tr(n, e) {
  if (n === be("Agent").value) return "Everyone (public)";
  if (n === vt("AuthenticatedAgent").value) return "Anyone logged in";
  const t = { termType: "NamedNode", value: n }, r = e.any(t, be("name"), null, null)?.value ?? e.any(t, we("fn"), null, null)?.value;
  return r || fe(n);
}
function gf(n, e) {
  const t = [], r = e.each(null, vt("accessTo"), n, null);
  for (const s of r) {
    if (s.termType !== "NamedNode") continue;
    const a = s, l = e.each(a, me("type"), null, null);
    if (!l.some((p) => p.value === vt("Authorization").value) && l.length > 0) continue;
    const h = e.each(a, vt("mode"), null, null).map((p) => fe(p.value));
    for (const p of e.each(a, vt("agent"), null, null))
      t.push({
        agentType: "agent",
        agentUri: p.value,
        agentLabel: Tr(p.value, e),
        modes: h
      });
    for (const p of e.each(a, vt("agentClass"), null, null))
      t.push({
        agentType: "agentClass",
        agentUri: p.value,
        agentLabel: Tr(p.value, e),
        modes: h
      });
    for (const p of e.each(a, vt("agentGroup"), null, null))
      t.push({
        agentType: "agentGroup",
        agentUri: p.value,
        agentLabel: Tr(p.value, e),
        modes: h
      });
  }
  const i = e.each(null, vt("default"), n, null);
  for (const s of i) {
    if (s.termType !== "NamedNode") continue;
    const a = s, u = e.each(a, vt("mode"), null, null).map((c) => fe(c.value));
    for (const c of e.each(a, vt("agent"), null, null)) {
      const h = c.value;
      t.some((p) => p.agentUri === h && p.modes.join() === u.join()) || t.push({
        agentType: "agent",
        agentUri: h,
        agentLabel: Tr(h, e),
        modes: u
      });
    }
    for (const c of e.each(a, vt("agentClass"), null, null)) {
      const h = c.value;
      t.some((p) => p.agentUri === h && p.modes.join() === u.join()) || t.push({
        agentType: "agentClass",
        agentUri: h,
        agentLabel: Tr(h, e),
        modes: u
      });
    }
  }
  return t;
}
function yf(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n) {
    const r = t.modes.sort().join(",");
    e.has(r) || e.set(r, []), e.get(r).push(t);
  }
  return e;
}
function vf(n) {
  const e = [...n].sort().join(",");
  for (const t of pf)
    if ([...t.modes].sort().join(",") === e)
      return { label: t.label, color: t.color };
  return { label: n.join(" + "), color: "#555" };
}
function wf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "sharing-view";
  const i = mf(n, e) ? "folder" : "file", s = document.createElement("h2");
  s.className = "sharing-title", s.textContent = `Sharing for ${i}`, r.appendChild(s);
  const a = document.createElement("p");
  a.className = "sharing-resource";
  const l = document.createElement("code");
  l.textContent = n.value, a.appendChild(l), r.appendChild(a);
  const u = gf(n, e);
  if (u.length === 0) {
    const p = document.createElement("p");
    p.className = "sharing-no-acl", p.textContent = "No specific sharing settings found. This resource may inherit permissions from its parent container.", r.appendChild(p), dl(r), t.appendChild(r);
    return;
  }
  const c = yf(u), h = document.createElement("div");
  h.className = "sharing-permissions";
  for (const [p, m] of c) {
    const w = p.split(","), { label: v, color: C } = vf(w), T = document.createElement("div");
    T.className = "sharing-level";
    const B = document.createElement("div");
    B.className = "sharing-level-name", B.style.color = C, B.textContent = v, T.appendChild(B);
    const O = document.createElement("div");
    O.className = "sharing-agents";
    for (const A of m) {
      const K = document.createElement("span");
      K.className = `sharing-agent sharing-agent-${A.agentType}`, K.textContent = A.agentLabel, K.title = A.agentUri, O.appendChild(K);
    }
    T.appendChild(O);
    const X = document.createElement("div");
    X.className = "sharing-level-desc", X.style.color = C;
    const Y = w.map((A) => {
      const K = So.find((P) => P.uri === A);
      return K ? K.description : A;
    });
    X.textContent = Y.join(", "), T.appendChild(X), h.appendChild(T);
  }
  if (r.appendChild(h), i === "folder") {
    const p = document.createElement("p");
    p.className = "sharing-default-info", p.textContent = "Folder permissions may also apply as defaults for new resources created within.", r.appendChild(p);
  }
  dl(r), t.appendChild(r);
}
function dl(n) {
  const e = document.createElement("div");
  e.className = "sharing-legend";
  const t = document.createElement("h3");
  t.textContent = "Access Modes", e.appendChild(t);
  const r = document.createElement("table");
  r.className = "sharing-legend-table";
  for (const i of So) {
    const s = document.createElement("tr"), a = document.createElement("td");
    a.className = "sharing-legend-mode", a.textContent = i.label;
    const l = document.createElement("td");
    l.textContent = i.description, s.appendChild(a), s.appendChild(l), r.appendChild(s);
  }
  e.appendChild(r), n.appendChild(e);
}
function Ef(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(et("Resource").value) || r.includes(et("Container").value) || r.includes(et("BasicContainer").value) || n.value.endsWith("/"));
}
const Cf = {
  label: "Sharing",
  icon: "🔒",
  canHandle(n, e) {
    return Ef(n, e);
  },
  render(n, e, t) {
    wf(n, e, t);
  }
};
Fe(Cf);
function li(n) {
  return fe(n);
}
function hl(n) {
  return n.startsWith("http://") || n.startsWith("https://") ? fe(n) : n.length > 120 ? n.slice(0, 117) + "..." : n;
}
function bf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "table-view";
  const i = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "table-title", s.textContent = i, r.appendChild(s);
  let a = [], l = "";
  const u = e.each(n, L("itemListElement"), null, null);
  if (u.length > 0 && (a = u, l = "List Items"), a.length === 0) {
    const Y = Io(n, e);
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
      const P = K.predicate.value;
      P !== me("type").value && h.add(P);
    }
  }
  const p = Array.from(h), m = [
    L("name").value,
    de("title").value,
    at("label").value,
    L("description").value,
    de("description").value
  ];
  p.sort((Y, A) => {
    const K = m.indexOf(Y), P = m.indexOf(A);
    return K !== -1 && P !== -1 ? K - P : K !== -1 ? -1 : P !== -1 ? 1 : li(Y).localeCompare(li(A));
  });
  const w = 8, v = p.slice(0, w), C = document.createElement("div");
  C.className = "table-scroll";
  const T = document.createElement("table");
  T.className = "table-data";
  const B = document.createElement("thead"), O = document.createElement("tr");
  for (const Y of v) {
    const A = document.createElement("th");
    A.className = "table-header", A.textContent = li(Y), A.setAttribute("data-predicate", Y), A.addEventListener("click", () => {
      Nf(T, v.indexOf(Y));
    }), O.appendChild(A);
  }
  B.appendChild(O), T.appendChild(B);
  const X = document.createElement("tbody");
  for (const Y of a) {
    const A = document.createElement("tr");
    A.className = "table-row";
    for (const K of v) {
      const P = document.createElement("td");
      P.className = "table-cell";
      const G = e.each(Y, Kn(K), null, null);
      if (G.length > 0) {
        const R = G[0].value;
        if (R.startsWith("http://") || R.startsWith("https://")) {
          const H = document.createElement("a");
          H.href = R, H.textContent = hl(R), H.className = "table-link", P.appendChild(H);
        } else
          P.textContent = hl(R);
      }
      A.appendChild(P);
    }
    X.appendChild(A);
  }
  if (T.appendChild(X), C.appendChild(T), r.appendChild(C), p.length > w) {
    const Y = document.createElement("p");
    Y.className = "table-more", Y.textContent = `+ ${p.length - w} more columns hidden`, r.appendChild(Y);
  }
  t.appendChild(r);
}
function Nf(n, e, t, r, i) {
  const s = n.querySelector("tbody");
  if (!s) return;
  const a = Array.from(s.querySelectorAll("tr")), l = n.querySelectorAll("th")[e], c = (l?.getAttribute("data-sort") ?? "none") === "asc" ? "desc" : "asc";
  n.querySelectorAll("th").forEach((h) => h.removeAttribute("data-sort")), l?.setAttribute("data-sort", c), a.sort((h, p) => {
    const m = h.children[e]?.textContent ?? "", w = p.children[e]?.textContent ?? "", v = m.localeCompare(w, void 0, { numeric: !0 });
    return c === "asc" ? v : -v;
  });
  for (const h of a)
    s.appendChild(h);
}
const Af = [
  L("Dataset").value,
  L("DataCatalog").value,
  L("ItemList").value,
  at("Class").value
];
function Io(n, e) {
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
function xf(n, e) {
  const t = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of Af)
    if (t.includes(i)) return !0;
  if (e.any(n, L("itemListElement"), null, null)) return !0;
  const r = Io(n, e);
  return !!(r && r.items.length >= 3);
}
const Tf = {
  label: "Table",
  icon: "📊",
  canHandle(n, e) {
    return xf(n, e);
  },
  render(n, e, t) {
    bf(n, e, t);
  }
};
Fe(Tf);
const Df = [".html", ".htm", ".xhtml"];
function _f(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    return Df.some((t) => e.endsWith(t));
  } catch {
    return !1;
  }
}
function Sf(n) {
  try {
    return new URL(n).href === new URL(window.location.href).href;
  } catch {
    return !1;
  }
}
const If = {
  label: "HTML",
  icon: "🌐",
  canHandle(n, e) {
    return Sf(n.value) ? !1 : _f(n.value);
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
Fe(If);
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
function fl(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    for (const [t, r] of Object.entries(Ff))
      if (e.endsWith(t)) return r;
  } catch {
  }
}
function Bf(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(L("AudioObject").value) || r.includes(af("Track").value));
}
const Lf = {
  label: "Audio",
  icon: "🎵",
  canHandle(n, e) {
    return fl(n.value) !== void 0 || Bf(n, e);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "audio-view";
    const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value), s = document.createElement("h3");
    s.className = "audio-title", s.textContent = i, r.appendChild(s);
    const a = e.any(n, L("byArtist"), null, null)?.value ?? e.any(n, de("creator"), null, null)?.value;
    if (a) {
      const p = document.createElement("p");
      p.className = "audio-artist", p.textContent = a, r.appendChild(p);
    }
    const l = document.createElement("audio");
    l.className = "audio-player", l.controls = !0, l.preload = "metadata";
    const u = fl(n.value);
    if (u) {
      const p = document.createElement("source");
      p.src = n.value, p.type = u, l.appendChild(p);
    } else
      l.src = n.value;
    const c = document.createElement("p");
    c.textContent = "Your browser does not support this audio format.", l.appendChild(c), r.appendChild(l);
    const h = e.any(n, de("description"), null, null)?.value ?? e.any(n, L("description"), null, null)?.value;
    if (h) {
      const p = document.createElement("p");
      p.className = "audio-description", p.textContent = h, r.appendChild(p);
    }
    t.appendChild(r);
  }
};
Fe(Lf);
const Rf = [
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
function Of(n) {
  const e = new URL(n).pathname.toLowerCase();
  return Rf.some((t) => e.endsWith(t));
}
function kf(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(be("Image").value) || r.includes(L("ImageObject").value));
}
const Uf = {
  label: "Image",
  icon: "🖼",
  canHandle(n, e) {
    return Of(n.value) || kf(n, e);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "image-view";
    const i = document.createElement("img");
    i.className = "image-main", i.src = n.value, i.alt = fe(n.value), i.addEventListener("error", () => {
      i.style.display = "none";
      const l = document.createElement("p");
      l.className = "error", l.textContent = "Failed to load image.", r.appendChild(l);
    }), r.appendChild(i);
    const s = e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value, a = e.any(n, de("description"), null, null)?.value ?? e.any(n, L("description"), null, null)?.value;
    if (s || a) {
      const l = document.createElement("div");
      if (l.className = "image-caption", s) {
        const u = document.createElement("h3");
        u.textContent = s, l.appendChild(u);
      }
      if (a) {
        const u = document.createElement("p");
        u.textContent = a, l.appendChild(u);
      }
      r.appendChild(l);
    }
    t.appendChild(r);
  }
};
Fe(Uf);
function Pf(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Mf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "code-view";
  const i = document.createElement("div");
  i.className = "code-header";
  const a = n.value.split("?")[0].split("#")[0].split("/").pop() ?? n.value, l = Fo(n.value), u = document.createElement("span");
  if (u.className = "code-filename", u.textContent = a, i.appendChild(u), l) {
    const p = document.createElement("span");
    p.className = "code-language", p.textContent = l, i.appendChild(p);
  }
  r.appendChild(i);
  const c = e.any(n, nn("content"), null, null)?.value ?? e.any(n, de("content"), null, null)?.value;
  if (c) {
    pl(c, r), t.appendChild(r);
    return;
  }
  const h = document.createElement("p");
  h.className = "code-loading", h.textContent = "Loading...", r.appendChild(h), t.appendChild(r), fetch(n.value).then((p) => {
    if (!p.ok) throw new Error(`HTTP ${p.status}`);
    return p.text();
  }).then((p) => {
    h.remove(), pl(p, r);
  }).catch((p) => {
    h.textContent = `Failed to load: ${p.message}`, h.className = "code-error";
  });
}
function pl(n, e) {
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
    c.className = "code-line-content", c.innerHTML = Pf(t[a]) || `
`, l.appendChild(c), i.appendChild(l);
  }
  r.appendChild(i);
  const s = document.createElement("div");
  s.className = "code-footer", s.textContent = `${t.length} line${t.length !== 1 ? "s" : ""}`, e.appendChild(r), e.appendChild(s);
}
const $f = {
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
function Fo(n) {
  const t = n.split("?")[0].split("#")[0].split("/").pop() ?? "", r = t.toLowerCase();
  if (r === "dockerfile") return "Dockerfile";
  if (r === "makefile" || r === "gnumakefile") return "Makefile";
  if (r === "rakefile" || r === "gemfile") return "Ruby";
  if (r === "cmakelists.txt") return "CMake";
  const i = t.lastIndexOf(".");
  if (i === -1) return null;
  const s = t.slice(i).toLowerCase();
  return $f[s] ?? null;
}
function qf(n, e) {
  return !!(Fo(n.value) || e.each(n, me("type"), null, null).map((r) => r.value).includes(L("SoftwareSourceCode").value));
}
const Hf = {
  label: "Code",
  icon: "💻",
  canHandle(n, e) {
    return qf(n, e);
  },
  render(n, e, t) {
    Mf(n, e, t);
  }
};
Fe(Hf);
const Wf = [".md", ".markdown", ".mdown", ".mkd", ".mkdn"];
function Vf(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    return Wf.some((t) => e.endsWith(t));
  } catch {
    return !1;
  }
}
function Kf(n, e) {
  const t = e.match(null, null, null, n.doc());
  if (t.length !== 0) {
    for (const r of t)
      if (r.predicate.value === "http://www.w3.org/ns/solid/terms#content" || r.predicate.value === "http://purl.org/dc/terms/content")
        return r.object.value;
  }
}
const Gf = {
  label: "Markdown",
  icon: "📝",
  canHandle(n, e) {
    return Vf(n.value);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "markdown-view", t.appendChild(r);
    const i = Kf(n, e), s = i ? Promise.resolve(i) : fetch(n.value).then((a) => {
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
Fe(Gf);
function Xf(n) {
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
    return Xf(n.value);
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
Fe(jf);
const zf = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".ogv": "video/ogg",
  ".mov": "video/mp4",
  ".m4v": "video/mp4"
};
function ml(n) {
  try {
    const e = new URL(n).pathname.toLowerCase();
    for (const [t, r] of Object.entries(zf))
      if (e.endsWith(t)) return r;
  } catch {
  }
}
function Jf(n, e) {
  return !!e.each(n, me("type"), null, null).map((i) => i.value).includes(L("VideoObject").value);
}
const Yf = {
  label: "Video",
  icon: "🎬",
  canHandle(n, e) {
    return ml(n.value) !== void 0 || Jf(n, e);
  },
  render(n, e, t) {
    t.innerHTML = "";
    const r = document.createElement("div");
    r.className = "video-view";
    const i = document.createElement("video");
    i.className = "video-main", i.controls = !0, i.preload = "metadata";
    const s = ml(n.value);
    if (s) {
      const c = document.createElement("source");
      c.src = n.value, c.type = s, i.appendChild(c);
    } else
      i.src = n.value;
    const a = document.createElement("p");
    a.textContent = "Your browser does not support this video format.", i.appendChild(a), r.appendChild(i);
    const l = e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value, u = e.any(n, de("description"), null, null)?.value ?? e.any(n, L("description"), null, null)?.value;
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
Fe(Yf);
function Qf(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "gallery-view";
  const i = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "gallery-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (a) {
    const h = document.createElement("p");
    h.className = "gallery-description", h.textContent = a, r.appendChild(h);
  }
  const l = Bo(n, e), u = document.createElement("p");
  if (u.className = "gallery-count", u.textContent = `${l.length} image${l.length !== 1 ? "s" : ""}`, r.appendChild(u), l.length === 0) {
    const h = document.createElement("p");
    h.className = "gallery-empty", h.textContent = "No images found.", r.appendChild(h), t.appendChild(r);
    return;
  }
  const c = document.createElement("div");
  c.className = "gallery-grid";
  for (const h of l) {
    const p = document.createElement("div");
    p.className = "gallery-cell";
    const m = document.createElement("img");
    m.className = "gallery-thumb", m.src = h, m.alt = Zf(h), m.loading = "lazy", m.addEventListener("click", () => {
      ep(h, l, r);
    }), p.appendChild(m), c.appendChild(p);
  }
  r.appendChild(c), t.appendChild(r);
}
function Zf(n) {
  return n.split("?")[0].split("#")[0].split("/").pop() ?? "image";
}
function ep(n, e, t) {
  const r = t.querySelector(".gallery-lightbox");
  r && r.remove();
  let i = e.indexOf(n);
  i === -1 && (i = 0);
  const s = document.createElement("div");
  s.className = "gallery-lightbox";
  const a = document.createElement("img");
  if (a.className = "gallery-lightbox-img", a.src = e[i], a.alt = "Full size image", s.addEventListener("click", (u) => {
    u.target === s && s.remove();
  }), e.length > 1) {
    const u = document.createElement("button");
    u.className = "gallery-lightbox-prev", u.textContent = "❮", u.addEventListener("click", (h) => {
      h.stopPropagation(), i = (i - 1 + e.length) % e.length, a.src = e[i];
    }), s.appendChild(u);
    const c = document.createElement("button");
    c.className = "gallery-lightbox-next", c.textContent = "❯", c.addEventListener("click", (h) => {
      h.stopPropagation(), i = (i + 1) % e.length, a.src = e[i];
    }), s.appendChild(c);
  }
  const l = document.createElement("button");
  l.className = "gallery-lightbox-close", l.textContent = "×", l.addEventListener("click", () => s.remove()), s.appendChild(a), s.appendChild(l), t.appendChild(s);
}
const tp = [
  L("ImageGallery").value,
  L("MediaGallery").value,
  L("CollectionPage").value
], np = [
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
function Bo(n, e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e.each(n, L("image"), null, null))
    t.add(r.value);
  for (const r of e.each(n, be("img"), null, null))
    t.add(r.value);
  for (const r of e.each(n, L("hasPart"), null, null)) {
    rp(r.value) && t.add(r.value);
    const i = e.each(r, me("type"), null, null).map((s) => s.value);
    if (i.includes(L("ImageObject").value) || i.includes(be("Image").value)) {
      const s = e.any(r, L("contentUrl"), null, null)?.value ?? e.any(r, L("url"), null, null)?.value ?? r.value;
      t.add(s);
    }
  }
  for (const r of e.each(n, L("associatedMedia"), null, null))
    if (e.each(r, me("type"), null, null).map((s) => s.value).includes(L("ImageObject").value)) {
      const s = e.any(r, L("contentUrl"), null, null)?.value ?? r.value;
      t.add(s);
    }
  return Array.from(t);
}
function rp(n) {
  const e = n.split("?")[0].split("#")[0].toLowerCase();
  return np.some((t) => e.endsWith(t));
}
function ap(n, e) {
  const t = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of tp)
    if (t.includes(i)) return !0;
  return Bo(n, e).length >= 2;
}
const ip = {
  label: "Gallery",
  icon: "🖼",
  canHandle(n, e) {
    return ap(n, e);
  },
  render(n, e, t) {
    Qf(n, e, t);
  }
};
Fe(ip);
function sp(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : e.toLocaleDateString(void 0, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function lp(n, e) {
  return e.any(n, L("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? fe(n.value);
}
function op(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("article");
  r.className = "article-view";
  const i = e.any(n, L("headline"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h1");
  s.className = "article-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, L("author"), null, null), l = e.any(n, L("datePublished"), null, null)?.value, u = e.any(n, de("created"), null, null)?.value, c = l ?? u;
  if (a || c) {
    const C = document.createElement("div");
    if (C.className = "article-byline", a) {
      const T = document.createElement("span");
      T.className = "article-author", T.textContent = lp(a, e), C.appendChild(T);
    }
    if (c) {
      const T = document.createElement("time");
      T.className = "article-date", T.dateTime = c, T.textContent = sp(c), C.appendChild(T);
    }
    r.appendChild(C);
  }
  const h = e.any(n, L("image"), null, null)?.value ?? e.any(n, L("thumbnailUrl"), null, null)?.value;
  if (h) {
    const C = document.createElement("img");
    C.className = "article-image", C.src = h, C.alt = i, r.appendChild(C);
  }
  const p = e.any(n, L("description"), null, null)?.value ?? e.any(n, L("abstract"), null, null)?.value ?? e.any(n, de("abstract"), null, null)?.value;
  if (p) {
    const C = document.createElement("p");
    C.className = "article-description", C.textContent = p, r.appendChild(C);
  }
  const m = e.any(n, L("articleBody"), null, null)?.value;
  if (m) {
    const C = document.createElement("div");
    C.className = "article-body";
    const T = m.split(/\n\n+/);
    for (const B of T) {
      const O = B.trim();
      if (!O) continue;
      const X = document.createElement("p");
      X.textContent = O, C.appendChild(X);
    }
    r.appendChild(C);
  }
  const w = e.any(n, L("publisher"), null, null);
  if (w) {
    const C = e.any(w, L("name"), null, null)?.value ?? fe(w.value), T = document.createElement("p");
    T.className = "article-publisher", T.textContent = `Published by ${C}`, r.appendChild(T);
  }
  const v = e.each(n, L("keywords"), null, null);
  if (v.length > 0) {
    const C = document.createElement("div");
    C.className = "article-tags";
    for (const T of v) {
      const B = document.createElement("span");
      B.className = "article-tag", B.textContent = T.value, C.appendChild(B);
    }
    r.appendChild(C);
  }
  t.appendChild(r);
}
const up = [
  "Article",
  "BlogPosting",
  "NewsArticle",
  "ScholarlyArticle",
  "TechArticle",
  "SocialMediaPosting",
  "Report"
];
function cp(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of up)
    if (r.includes(L(i).value)) return !0;
  return !!(e.any(n, L("articleBody"), null, null) || e.any(n, L("headline"), null, null));
}
const dp = {
  label: "Article",
  icon: "📰",
  canHandle(n, e) {
    return cp(n, e);
  },
  render(n, e, t) {
    op(n, e, t);
  }
};
Fe(dp);
function hp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "map-view";
  const i = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "map-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, L("address"), null, null)?.value ?? void 0;
  if (a) {
    const c = document.createElement("p");
    c.className = "map-address", c.textContent = a, r.appendChild(c);
  }
  const l = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (l) {
    const c = document.createElement("p");
    c.className = "map-description", c.textContent = l, r.appendChild(c);
  }
  const u = Lo(n, e);
  if (u) {
    const c = document.createElement("div");
    c.className = "map-embed";
    const h = document.createElement("iframe");
    h.className = "map-frame", h.src = `https://www.openstreetmap.org/export/embed.html?bbox=${u.lng - 0.01},${u.lat - 5e-3},${u.lng + 0.01},${u.lat + 5e-3}&layer=mapnik&marker=${u.lat},${u.lng}`, h.setAttribute("sandbox", "allow-scripts allow-same-origin"), h.title = `Map showing ${i}`, c.appendChild(h);
    const p = document.createElement("a");
    p.className = "map-osm-link", p.href = `https://www.openstreetmap.org/?mlat=${u.lat}&mlon=${u.lng}#map=16/${u.lat}/${u.lng}`, p.textContent = "View on OpenStreetMap", p.target = "_blank", p.rel = "noopener", c.appendChild(p), r.appendChild(c);
  } else {
    const c = document.createElement("p");
    c.className = "map-no-coords", c.textContent = "No coordinates available for this place.", r.appendChild(c);
  }
  t.appendChild(r);
}
function Lo(n, e) {
  const t = e.any(n, L("latitude"), null, null)?.value, r = e.any(n, L("longitude"), null, null)?.value;
  if (t && r) {
    const a = parseFloat(t), l = parseFloat(r);
    if (!isNaN(a) && !isNaN(l)) return { lat: a, lng: l };
  }
  const i = e.any(n, L("geo"), null, null);
  if (i) {
    const a = e.any(i, L("latitude"), null, null)?.value, l = e.any(i, L("longitude"), null, null)?.value;
    if (a && l) {
      const u = parseFloat(a), c = parseFloat(l);
      if (!isNaN(u) && !isNaN(c)) return { lat: u, lng: c };
    }
  }
  const s = e.any(n, L("location"), null, null);
  if (s) {
    const a = e.any(s, L("geo"), null, null);
    if (a) {
      const c = e.any(a, L("latitude"), null, null)?.value, h = e.any(a, L("longitude"), null, null)?.value;
      if (c && h) {
        const p = parseFloat(c), m = parseFloat(h);
        if (!isNaN(p) && !isNaN(m)) return { lat: p, lng: m };
      }
    }
    const l = e.any(s, L("latitude"), null, null)?.value, u = e.any(s, L("longitude"), null, null)?.value;
    if (l && u) {
      const c = parseFloat(l), h = parseFloat(u);
      if (!isNaN(c) && !isNaN(h)) return { lat: c, lng: h };
    }
  }
  return null;
}
function fp(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(L("Place").value) || r.includes(L("GeoCoordinates").value));
}
const pp = {
  label: "Map",
  icon: "🗺",
  canHandle(n, e) {
    return !!(Lo(n, e) || fp(n, e));
  },
  render(n, e, t) {
    hp(n, e, t);
  }
};
Fe(pp);
function gl(n) {
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
function ma(n) {
  const e = new Date(n);
  return isNaN(e.getTime()) ? n : e.toLocaleDateString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function yl(n, e) {
  const t = e.any(n, L("name"), null, null)?.value;
  if (t) return t;
  const r = e.any(n, L("address"), null, null)?.value;
  return r && !r.startsWith("http") ? r : n.value.startsWith("http") ? fe(n.value) : n.value;
}
function mp(n) {
  for (const e of n) {
    if (e.includes("Flight")) return "Flight";
    if (e.includes("TrainTrip")) return "Train";
    if (e.includes("BusTrip")) return "Bus";
    if (e.includes("BoatTrip")) return "Boat";
  }
  return "Leg";
}
function vl(n, e, t) {
  const r = document.createElement("div");
  r.className = "trip-leg";
  const i = e.each(n, me("type"), null, null).map((C) => C.value), s = mp(i), a = document.createElement("div");
  a.className = "trip-leg-header";
  const l = document.createElement("span");
  l.className = "trip-leg-mode", l.textContent = s;
  const u = e.any(n, L("flightNumber"), null, null)?.value ?? e.any(n, L("trainNumber"), null, null)?.value ?? e.any(n, L("busNumber"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value;
  u && (l.textContent += ` ${u}`), a.appendChild(l);
  const c = e.any(n, L("provider"), null, null) ?? e.any(n, L("airline"), null, null);
  if (c) {
    const C = e.any(c, L("name"), null, null)?.value ?? (c.value.startsWith("http") ? null : c.value);
    if (C) {
      const T = document.createElement("span");
      T.className = "trip-leg-provider", T.textContent = C, a.appendChild(T);
    }
  }
  r.appendChild(a);
  const h = document.createElement("div");
  h.className = "trip-leg-route";
  const p = e.any(n, L("departureStation"), null, null) ?? e.any(n, L("departureAirport"), null, null) ?? e.any(n, L("departureStop"), null, null) ?? e.any(n, L("fromLocation"), null, null), m = e.any(n, L("arrivalStation"), null, null) ?? e.any(n, L("arrivalAirport"), null, null) ?? e.any(n, L("arrivalStop"), null, null) ?? e.any(n, L("toLocation"), null, null);
  if (p || m) {
    const C = p ? yl(p, e) : "?", T = m ? yl(m, e) : "?";
    h.innerHTML = `<span class="trip-from">${C}</span><span class="trip-arrow">→</span><span class="trip-to">${T}</span>`, r.appendChild(h);
  }
  const w = e.any(n, L("departureTime"), null, null)?.value, v = e.any(n, L("arrivalTime"), null, null)?.value;
  if (w || v) {
    const C = document.createElement("div");
    if (C.className = "trip-leg-times", w) {
      const T = document.createElement("span");
      T.className = "trip-leg-time", T.textContent = `Departs: ${gl(w)}`, C.appendChild(T);
    }
    if (v) {
      const T = document.createElement("span");
      T.className = "trip-leg-time", T.textContent = `Arrives: ${gl(v)}`, C.appendChild(T);
    }
    r.appendChild(C);
  }
  t.appendChild(r);
}
function gp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "trip-view";
  const i = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "trip-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (a) {
    const m = document.createElement("p");
    m.className = "trip-description", m.textContent = a, r.appendChild(m);
  }
  const l = e.any(n, L("departureTime"), null, null)?.value ?? e.any(n, L("startDate"), null, null)?.value, u = e.any(n, L("arrivalTime"), null, null)?.value ?? e.any(n, L("endDate"), null, null)?.value;
  if (l || u) {
    const m = document.createElement("p");
    m.className = "trip-dates", l && u ? m.textContent = `${ma(l)} — ${ma(u)}` : l ? m.textContent = ma(l) : u && (m.textContent = `Until ${ma(u)}`), r.appendChild(m);
  }
  e.each(n, me("type"), null, null).map((m) => m.value).some(
    (m) => m.includes("Flight") || m.includes("TrainTrip") || m.includes("BusTrip") || m.includes("BoatTrip")
  ) && vl(n, e, r);
  const p = e.each(n, L("itinerary"), null, null);
  if (p.length > 0) {
    const m = document.createElement("div");
    m.className = "trip-itinerary";
    const w = document.createElement("h3");
    w.textContent = `Itinerary (${p.length} leg${p.length !== 1 ? "s" : ""})`, m.appendChild(w);
    const v = [...p].sort((C, T) => {
      const B = e.any(C, L("departureTime"), null, null)?.value ?? "", O = e.any(T, L("departureTime"), null, null)?.value ?? "";
      return B.localeCompare(O);
    });
    for (const C of v)
      vl(C, e, m);
    r.appendChild(m);
  }
  t.appendChild(r);
}
const yp = [
  "Trip",
  "TouristTrip",
  "Flight",
  "TrainTrip",
  "BusTrip",
  "BoatTrip",
  "TravelAction"
];
function vp(n, e) {
  const t = e.each(n, me("type"), null, null).map((s) => s.value);
  for (const s of yp)
    if (t.includes(L(s).value)) return !0;
  if (e.any(n, L("itinerary"), null, null)) return !0;
  const r = e.any(n, L("departureTime"), null, null), i = e.any(n, L("arrivalTime"), null, null);
  return !!(r && i);
}
const wp = {
  label: "Trip",
  icon: "✈",
  canHandle(n, e) {
    return vp(n, e);
  },
  render(n, e, t) {
    gp(n, e, t);
  }
};
Fe(wp);
function Ep(n, e) {
  const t = /* @__PURE__ */ new Set(), r = [], i = [L("event"), L("subEvent")];
  for (const s of i)
    for (const a of e.each(n, s, null, null))
      a.termType === "NamedNode" && !t.has(a.value) && (t.add(a.value), r.push(a));
  return r;
}
function Cp(n, e) {
  const t = e.any(n, L("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? "Untitled Event", r = e.any(n, L("startDate"), null, null)?.value ?? null, i = e.any(n, L("endDate"), null, null)?.value ?? null, s = e.any(n, L("location"), null, null);
  let a = "";
  return s && (s.termType === "Literal" ? a = s.value : s.termType === "NamedNode" && (a = e.any(s, L("name"), null, null)?.value ?? e.any(s, at("label"), null, null)?.value ?? s.value)), {
    uri: n.value,
    name: t,
    startDate: r ? new Date(r) : null,
    endDate: i ? new Date(i) : null,
    location: a
  };
}
function bp(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Np(n, e) {
  return new Date(n, e, 1).getDay();
}
function Ap(n, e) {
  return n.getFullYear() === e.getFullYear() && n.getMonth() === e.getMonth() && n.getDate() === e.getDate();
}
function xp(n, e, t, r) {
  const i = new Date(e, t, r);
  return n.filter((s) => s.startDate ? !!(Ap(s.startDate, i) || s.endDate && s.startDate <= i && s.endDate >= i) : !1);
}
function Tp(n) {
  return n.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
const wl = [
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
], Dp = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function oi(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function _p(n, e, t) {
  const r = e.any(n, L("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? "Schedule", i = e.any(n, L("description"), null, null)?.value ?? null, a = Ep(n, e).map((A) => Cp(A, e)), l = a.filter((A) => A.startDate !== null);
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
  const p = document.createElement("h2");
  if (p.className = "sched-title", p.textContent = r, h.appendChild(p), i) {
    const A = document.createElement("p");
    A.className = "sched-description", A.textContent = i, h.appendChild(A);
  }
  const m = document.createElement("p");
  m.className = "sched-count", m.textContent = `${a.length} event${a.length !== 1 ? "s" : ""}`, h.appendChild(m);
  const w = document.createElement("div");
  w.className = "sched-nav", h.appendChild(w);
  const v = document.createElement("button");
  v.className = "sched-prev", v.textContent = "←", v.setAttribute("aria-label", "Previous month");
  const C = document.createElement("span");
  C.className = "sched-month-label";
  const T = document.createElement("button");
  T.className = "sched-next", T.textContent = "→", T.setAttribute("aria-label", "Next month"), w.appendChild(v), w.appendChild(C), w.appendChild(T);
  const B = document.createElement("div");
  B.className = "sched-calendar", h.appendChild(B);
  const O = document.createElement("div");
  O.className = "sched-detail", h.appendChild(O);
  function X() {
    C.textContent = `${wl[c]} ${u}`, B.innerHTML = "";
    for (const P of Dp) {
      const G = document.createElement("div");
      G.className = "sched-day-header", G.textContent = P, B.appendChild(G);
    }
    const A = bp(u, c), K = Np(u, c);
    for (let P = 0; P < K; P++) {
      const G = document.createElement("div");
      G.className = "sched-day sched-day-empty", B.appendChild(G);
    }
    for (let P = 1; P <= A; P++) {
      const G = document.createElement("div");
      G.className = "sched-day", G.setAttribute("data-day", String(P));
      const R = document.createElement("span");
      R.className = "sched-day-num", R.textContent = String(P), G.appendChild(R);
      const H = xp(a, u, c, P);
      if (H.length > 0) {
        G.classList.add("sched-has-events");
        const $ = document.createElement("span");
        $.className = "sched-event-dot", $.textContent = String(H.length), G.appendChild($), G.addEventListener("click", () => {
          Y(P, H);
        });
      }
      B.appendChild(G);
    }
    O.innerHTML = "";
  }
  function Y(A, K) {
    O.innerHTML = "";
    const P = document.createElement("h3");
    P.className = "sched-detail-heading", P.textContent = `${wl[c]} ${A}, ${u}`, O.appendChild(P);
    for (const G of K) {
      const R = document.createElement("div");
      R.className = "sched-event-item";
      let H = `<span class="sched-event-name">${oi(G.name)}</span>`;
      G.startDate && (H += ` <span class="sched-event-time">${oi(Tp(G.startDate))}</span>`), G.location && (H += ` <span class="sched-event-location">${oi(G.location)}</span>`), R.innerHTML = H, O.appendChild(R);
    }
  }
  v.addEventListener("click", () => {
    c--, c < 0 && (c = 11, u--), X();
  }), T.addEventListener("click", () => {
    c++, c > 11 && (c = 0, u++), X();
  }), X();
}
const Sp = [
  L("Schedule"),
  L("EventSeries"),
  L("EventSchedule")
];
function Ip(n, e) {
  const t = /* @__PURE__ */ new Set(), r = [], i = [
    L("event"),
    L("subEvent")
  ];
  for (const s of i)
    for (const a of e.each(n, s, null, null))
      a.termType === "NamedNode" && !t.has(a.value) && (t.add(a.value), r.push(a));
  return r;
}
const Fp = {
  label: "Schedule",
  icon: "📅",
  canHandle(n, e) {
    for (const r of Sp)
      if (e.holds(n, me("type"), r)) return !0;
    return Ip(n, e).length >= 2;
  },
  render(n, e, t) {
    _p(n, e, t);
  }
};
Fe(Fp);
function El(n) {
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
function Lp(n, e) {
  const t = new Date(n), r = new Date(e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth() && t.getDate() === r.getDate();
}
function Dr(n, e, t, r = !1) {
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
function Rp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "event-view";
  const i = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "event-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, L("startDate"), null, null)?.value, l = e.any(n, L("endDate"), null, null)?.value;
  if (a) {
    let T = El(a);
    l && (Lp(a, l) ? T += ` – ${Bp(l)}` : T += ` – ${El(l)}`);
    const B = document.createElement("p");
    B.className = "event-date", B.textContent = T, r.appendChild(B);
  }
  const u = document.createElement("div");
  u.className = "event-details";
  const c = e.any(n, L("location"), null, null);
  let h;
  c && (h = e.any(c, L("name"), null, null)?.value ?? c.value), Dr(u, "Location", h);
  const p = e.any(n, L("organizer"), null, null);
  if (p) {
    const T = e.any(p, L("name"), null, null)?.value ?? e.any(p, be("name"), null, null)?.value ?? fe(p.value);
    Dr(u, "Organizer", T);
  }
  const m = e.any(n, L("url"), null, null)?.value;
  Dr(u, "Link", m, !0);
  const w = e.any(n, L("eventStatus"), null, null)?.value;
  w && Dr(u, "Status", fe(w));
  const v = e.any(n, L("eventAttendanceMode"), null, null)?.value;
  v && Dr(u, "Format", fe(v)), r.appendChild(u);
  const C = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (C) {
    const T = document.createElement("div");
    T.className = "event-description", T.textContent = C, r.appendChild(T);
  }
  t.appendChild(r);
}
function Op(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(L("Event").value) || r.includes(L("SocialEvent").value) || r.includes(L("BusinessEvent").value) || r.includes(L("MusicEvent").value) || r.includes(L("EducationEvent").value) || e.any(n, L("startDate"), null, null) && e.any(n, L("name"), null, null));
}
const kp = {
  label: "Event",
  icon: "📅",
  canHandle(n, e) {
    return Op(n, e);
  },
  render(n, e, t) {
    Rp(n, e, t);
  }
};
Fe(kp);
function Up(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? "Bookmarks";
}
function Pp(n, e) {
  const t = e.each(n, Pn("hasMember"), null, null), r = [];
  for (const i of t) {
    const s = i, a = e.any(s, de("title"), null, null)?.value ?? e.any(s, L("name"), null, null)?.value ?? e.any(s, Pn("title"), null, null)?.value ?? fe(s.value), l = e.any(s, Pn("recalls"), null, null)?.value ?? null, u = e.any(s, de("created"), null, null)?.value, c = u ? new Date(u) : null, h = e.any(s, de("description"), null, null)?.value ?? e.any(s, L("description"), null, null)?.value ?? null;
    r.push({ uri: s.value, title: a, recalls: l, created: c, description: h });
  }
  return r.sort((i, s) => i.created && s.created ? s.created.getTime() - i.created.getTime() : i.created ? -1 : s.created ? 1 : i.title.localeCompare(s.title)), r;
}
function Mp(n) {
  return n.toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function $p(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "bookmarks-view";
  const i = Up(n, e), s = document.createElement("h2");
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
    const p = document.createElement("a");
    if (p.className = "bookmark-title", p.textContent = c.title, c.recalls ? (p.href = c.recalls, p.target = "_blank", p.rel = "noopener") : (p.href = c.uri, p.target = "_blank", p.rel = "noopener"), h.appendChild(p), c.recalls) {
      const m = document.createElement("span");
      m.className = "bookmark-url", m.textContent = c.recalls, h.appendChild(m);
    }
    if (c.created || c.description) {
      const m = document.createElement("div");
      if (m.className = "bookmark-meta", c.created) {
        const w = document.createElement("span");
        w.className = "bookmark-date", w.textContent = Mp(c.created), m.appendChild(w);
      }
      if (c.description) {
        const w = document.createElement("span");
        w.className = "bookmark-desc", w.textContent = c.description, m.appendChild(w);
      }
      h.appendChild(m);
    }
    u.appendChild(h);
  }
  r.appendChild(u), t.appendChild(r);
}
function qp(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  if (r.includes(Pn("BookmarkList").value) || r.includes(Pn("Topic").value)) return !0;
  const i = e.each(n, Pn("hasMember"), null, null);
  if (i.length > 0) {
    for (const s of i)
      if (e.each(s, me("type"), null, null).some((l) => l.value === Pn("Bookmark").value)) return !0;
  }
  return !1;
}
const Hp = {
  label: "Bookmarks",
  icon: "🔖",
  canHandle(n, e) {
    return qp(n, e);
  },
  render(n, e, t) {
    $p(n, e, t);
  }
};
Fe(Hp);
function Cl(n, e) {
  return e.any(n, ze("name"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? fe(n.value);
}
function Wp(n, e) {
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
function bl(n, e) {
  const t = e.any(n, ze("actor"), null, null), r = e.any(n, ze("object"), null, null), i = e.any(n, ze("published"), null, null)?.value;
  return {
    uri: n.value,
    actorName: t ? Cl(t, e) : null,
    actorUri: t?.value ?? null,
    verb: Wp(n, e),
    objectName: r ? Cl(r, e) : null,
    objectUri: r?.value ?? null,
    summary: e.any(n, ze("summary"), null, null)?.value ?? null,
    content: e.any(n, ze("content"), null, null)?.value ?? null,
    published: i ? new Date(i) : null
  };
}
function Vp(n, e) {
  return [
    ...e.each(n, ze("items"), null, null),
    ...e.each(n, ze("orderedItems"), null, null)
  ];
}
function Kp(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return ["Collection", "OrderedCollection", "CollectionPage", "OrderedCollectionPage"].some((r) => t.includes(ze(r).value));
}
function Gp(n) {
  return n.toLocaleString(void 0, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Nl(n) {
  const e = document.createElement("div");
  e.className = "activity-item";
  const t = document.createElement("div");
  if (t.className = "activity-summary", n.summary)
    t.textContent = n.summary;
  else {
    if (n.actorName) {
      const r = document.createElement("a");
      r.className = "activity-actor", r.textContent = n.actorName, n.actorUri && (r.href = `?uri=${encodeURIComponent(n.actorUri)}`, r.addEventListener("click", (i) => {
        i.preventDefault(), bi(n.actorUri);
      })), t.appendChild(r), t.appendChild(document.createTextNode(` ${n.verb} `));
    }
    if (n.objectName) {
      const r = document.createElement("a");
      r.className = "activity-object", r.textContent = n.objectName, n.objectUri && (r.href = `?uri=${encodeURIComponent(n.objectUri)}`, r.addEventListener("click", (i) => {
        i.preventDefault(), bi(n.objectUri);
      })), t.appendChild(r);
    }
  }
  if (e.appendChild(t), n.content) {
    const r = document.createElement("p");
    r.className = "activity-content", r.textContent = n.content, e.appendChild(r);
  }
  if (n.published) {
    const r = document.createElement("time");
    r.className = "activity-time", r.dateTime = n.published.toISOString(), r.textContent = Gp(n.published), e.appendChild(r);
  }
  return e;
}
function Xp(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  if (r.className = "activity-view", Kp(n, e)) {
    const i = e.any(n, ze("name"), null, null)?.value ?? "Activities", s = document.createElement("h2");
    s.className = "activity-title", s.textContent = i, r.appendChild(s);
    const a = e.any(n, ze("totalItems"), null, null)?.value;
    if (a) {
      const c = document.createElement("p");
      c.className = "activity-count", c.textContent = `${a} item${a !== "1" ? "s" : ""}`, r.appendChild(c);
    }
    const l = Vp(n, e), u = document.createElement("div");
    if (u.className = "activity-timeline", l.length === 0) {
      const c = document.createElement("p");
      c.className = "activity-empty", c.textContent = "No activities.", r.appendChild(c);
    } else {
      for (const c of l) {
        const h = bl(c, e);
        u.appendChild(Nl(h));
      }
      r.appendChild(u);
    }
  } else {
    const i = bl(n, e), s = document.createElement("div");
    s.className = "activity-timeline", s.appendChild(Nl(i)), r.appendChild(s);
  }
  t.appendChild(r);
}
const jp = [
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
], zp = [
  "Collection",
  "OrderedCollection",
  "CollectionPage",
  "OrderedCollectionPage"
];
function Jp(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of jp)
    if (r.includes(ze(i).value)) return !0;
  for (const i of zp)
    if (r.includes(ze(i).value)) return !0;
  return !!(e.any(n, ze("actor"), null, null) && e.any(n, ze("object"), null, null));
}
const Yp = {
  label: "Activity",
  icon: "🔔",
  canHandle(n, e) {
    return Jp(n, e);
  },
  render(n, e, t) {
    Xp(n, e, t);
  }
};
Fe(Yp);
function Ni(n, e) {
  try {
    return new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: e || "USD"
    }).format(n);
  } catch {
    return `${e ? `${e} ` : ""}${n.toFixed(2)}`;
  }
}
function Qp(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return !!(t.includes(gt("BankAccount").value) || t.includes(gt("PaymentCard").value) || t.includes(L("BankAccount").value) || e.any(n, gt("transaction"), null, null));
}
function Ro(n, e) {
  const t = e.any(n, gt("description"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, L("description"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value), r = e.any(n, gt("amount"), null, null)?.value ?? e.any(n, L("price"), null, null)?.value ?? e.any(n, L("amount"), null, null)?.value, i = r ? parseFloat(r) : null, s = e.any(n, gt("currency"), null, null)?.value ?? e.any(n, L("priceCurrency"), null, null)?.value ?? e.any(n, L("currency"), null, null)?.value ?? "", a = e.any(n, gt("date"), null, null)?.value ?? e.any(n, de("date"), null, null)?.value ?? e.any(n, L("dateCreated"), null, null)?.value ?? null, l = e.any(n, gt("category"), null, null), u = l ? e.any(l, at("label"), null, null)?.value ?? e.any(l, L("name"), null, null)?.value ?? fe(l.value) : null, c = e.any(n, gt("payee"), null, null) ?? e.any(n, L("recipient"), null, null), h = c ? e.any(c, L("name"), null, null)?.value ?? (c.value.startsWith("http") ? fe(c.value) : c.value) : null;
  return { uri: n.value, date: a, description: t, amount: i, currency: s, category: u, payee: h };
}
function Zp(n, e, t) {
  const i = e.each(n, gt("transaction"), null, null).map((m) => Ro(m, e));
  i.sort((m, w) => !m.date && !w.date ? 0 : m.date ? w.date ? w.date.localeCompare(m.date) : -1 : 1);
  const s = document.createElement("p");
  if (s.className = "txn-count", s.textContent = `${i.length} transaction${i.length !== 1 ? "s" : ""}`, t.appendChild(s), i.length === 0) {
    const m = document.createElement("p");
    m.className = "txn-empty", m.textContent = "No transactions found.", t.appendChild(m);
    return;
  }
  const a = i.reduce((m, w) => m + (w.amount ?? 0), 0), l = i.find((m) => m.currency)?.currency ?? "";
  if (a !== 0) {
    const m = document.createElement("p");
    m.className = "txn-total", m.textContent = `Balance: ${Ni(a, l)}`, t.appendChild(m);
  }
  const u = document.createElement("div");
  u.className = "txn-table-wrapper";
  const c = document.createElement("table");
  c.className = "txn-table";
  const h = document.createElement("thead");
  h.innerHTML = '<tr><th>Date</th><th>Description</th><th>Category</th><th class="txn-amount-col">Amount</th></tr>', c.appendChild(h);
  const p = document.createElement("tbody");
  for (const m of i) {
    const w = document.createElement("tr");
    w.className = "txn-row";
    const v = document.createElement("td");
    if (v.className = "txn-date", m.date) {
      const O = new Date(m.date);
      v.textContent = isNaN(O.getTime()) ? m.date : O.toLocaleDateString(void 0, { month: "short", day: "numeric" });
    }
    w.appendChild(v);
    const C = document.createElement("td");
    C.className = "txn-desc", C.textContent = m.payee ? `${m.description} — ${m.payee}` : m.description, w.appendChild(C);
    const T = document.createElement("td");
    T.className = "txn-category", T.textContent = m.category ?? "", w.appendChild(T);
    const B = document.createElement("td");
    B.className = "txn-amount", m.amount !== null && (B.textContent = Ni(m.amount, m.currency), m.amount < 0 && B.classList.add("txn-negative"), m.amount > 0 && B.classList.add("txn-positive")), w.appendChild(B), p.appendChild(w);
  }
  c.appendChild(p), u.appendChild(c), t.appendChild(u);
}
function em(n, e, t) {
  const r = Ro(n, e), i = document.createElement("div");
  i.className = "txn-details";
  const s = [];
  if (r.date) {
    const l = new Date(r.date), u = isNaN(l.getTime()) ? r.date : l.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
    s.push(["Date", u]);
  }
  r.amount !== null && s.push(["Amount", Ni(r.amount, r.currency)]), r.payee && s.push(["Payee", r.payee]), r.category && s.push(["Category", r.category]);
  for (const [l, u] of s) {
    const c = document.createElement("div");
    c.className = "txn-detail", c.innerHTML = `<span class="txn-label">${l}</span><span class="txn-value">${u}</span>`, i.appendChild(c);
  }
  t.appendChild(i);
  const a = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (a && a !== r.description) {
    const l = document.createElement("p");
    l.className = "txn-body", l.textContent = a, t.appendChild(l);
  }
}
function tm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "txn-view";
  const i = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, gt("description"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "txn-title", s.textContent = i, r.appendChild(s), Qp(n, e) ? Zp(n, e, r) : em(n, e, r), t.appendChild(r);
}
const nm = [
  gt("Transaction").value,
  gt("BankAccount").value,
  gt("PaymentCard").value,
  L("Invoice").value,
  L("MoneyTransfer").value,
  L("PayAction").value,
  L("BankAccount").value
];
function rm(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  for (const r of nm)
    if (t.includes(r)) return !0;
  return !!(e.any(n, gt("transaction"), null, null) || e.any(n, L("totalPaymentDue"), null, null) || e.any(n, gt("amount"), null, null));
}
const am = {
  label: "Transactions",
  icon: "💳",
  canHandle(n, e) {
    return rm(n, e);
  },
  render(n, e, t) {
    tm(n, e, t);
  }
};
Fe(am);
function im(n, e) {
  const t = e.any(n, L("price"), null, null)?.value;
  if (t) {
    const i = e.any(n, L("priceCurrency"), null, null)?.value ?? "";
    return { price: t, currency: i };
  }
  const r = e.any(n, L("offers"), null, null);
  if (r) {
    const i = e.any(r, L("price"), null, null)?.value;
    if (i) {
      const s = e.any(r, L("priceCurrency"), null, null)?.value ?? "";
      return { price: i, currency: s };
    }
  }
  return null;
}
function sm(n, e) {
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
function lm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "product-view";
  const i = e.any(n, L("image"), null, null)?.value ?? e.any(n, L("thumbnailUrl"), null, null)?.value;
  if (i) {
    const v = document.createElement("img");
    v.className = "product-image", v.src = i, v.alt = "Product image", r.appendChild(v);
  }
  const s = document.createElement("div");
  s.className = "product-info";
  const a = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), l = document.createElement("h2");
  l.className = "product-name", l.textContent = a, s.appendChild(l);
  const u = e.any(n, L("brand"), null, null);
  if (u) {
    const v = e.any(u, L("name"), null, null)?.value ?? u.value;
    if (v && !v.startsWith("http")) {
      const C = document.createElement("p");
      C.className = "product-brand", C.textContent = v, s.appendChild(C);
    }
  }
  const c = im(n, e);
  if (c) {
    const v = document.createElement("p");
    v.className = "product-price", v.textContent = sm(c.price, c.currency), s.appendChild(v);
  }
  const h = e.any(n, L("aggregateRating"), null, null);
  if (h) {
    const v = e.any(h, L("ratingValue"), null, null)?.value, C = e.any(h, L("reviewCount"), null, null)?.value, T = e.any(h, L("bestRating"), null, null)?.value ?? "5";
    if (v) {
      const B = document.createElement("div");
      B.className = "product-rating";
      const O = Math.round(parseFloat(v)), X = parseInt(T), Y = "★".repeat(Math.min(O, X)) + "☆".repeat(Math.max(X - O, 0)), A = document.createElement("span");
      A.className = "product-stars", A.textContent = Y, B.appendChild(A);
      const K = document.createElement("span");
      K.className = "product-score", K.textContent = `${v}/${T}`, C && (K.textContent += ` (${C} reviews)`), B.appendChild(K), s.appendChild(B);
    }
  }
  const p = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (p) {
    const v = document.createElement("p");
    v.className = "product-description", v.textContent = p, s.appendChild(v);
  }
  const m = e.any(n, L("sku"), null, null)?.value;
  if (m) {
    const v = document.createElement("p");
    v.className = "product-sku", v.textContent = `SKU: ${m}`, s.appendChild(v);
  }
  const w = e.any(n, L("url"), null, null)?.value;
  if (w) {
    const v = document.createElement("a");
    v.className = "product-link", v.href = w, v.textContent = "View product", v.target = "_blank", v.rel = "noopener", s.appendChild(v);
  }
  r.appendChild(s), t.appendChild(r);
}
const om = [
  "Product",
  "IndividualProduct",
  "SomeProducts",
  "Vehicle",
  "Car",
  "CreativeWork",
  "SoftwareApplication",
  "Book",
  "Movie",
  "MusicAlbum",
  "Game"
];
function um(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of om)
    if (r.includes(L(i).value)) return !0;
  return !!(e.any(n, L("offers"), null, null) || e.any(n, L("price"), null, null));
}
const cm = {
  label: "Product",
  icon: "📦",
  canHandle(n, e) {
    return um(n, e);
  },
  render(n, e, t) {
    lm(n, e, t);
  }
};
Fe(cm);
function ui(n) {
  const e = n.match(/^PT?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);
  if (!e) return n;
  const t = [];
  return e[1] && t.push(`${e[1]} hr`), e[2] && t.push(`${e[2]} min`), e[3] && t.push(`${e[3]} sec`), t.join(" ") || n;
}
function dm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "recipe-view";
  const i = e.any(n, L("image"), null, null)?.value ?? e.any(n, L("thumbnailUrl"), null, null)?.value;
  if (i) {
    const A = document.createElement("img");
    A.className = "recipe-image", A.src = i, A.alt = "Recipe photo", r.appendChild(A);
  }
  const s = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), a = document.createElement("h2");
  a.className = "recipe-name", a.textContent = s, r.appendChild(a);
  const l = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (l) {
    const A = document.createElement("p");
    A.className = "recipe-description", A.textContent = l, r.appendChild(A);
  }
  const u = [], c = e.any(n, L("prepTime"), null, null)?.value;
  c && u.push({ label: "Prep", value: ui(c) });
  const h = e.any(n, L("cookTime"), null, null)?.value;
  h && u.push({ label: "Cook", value: ui(h) });
  const p = e.any(n, L("totalTime"), null, null)?.value;
  p && u.push({ label: "Total", value: ui(p) });
  const m = e.any(n, L("recipeYield"), null, null)?.value;
  m && u.push({ label: "Yield", value: m });
  const w = e.any(n, L("recipeServings"), null, null)?.value;
  if (w && u.push({ label: "Servings", value: w }), u.length > 0) {
    const A = document.createElement("div");
    A.className = "recipe-meta";
    for (const K of u) {
      const P = document.createElement("span");
      P.className = "recipe-meta-item", P.innerHTML = `<strong>${K.label}</strong> ${K.value}`, A.appendChild(P);
    }
    r.appendChild(A);
  }
  const v = e.any(n, L("aggregateRating"), null, null);
  if (v) {
    const A = e.any(v, L("ratingValue"), null, null)?.value, K = e.any(v, L("reviewCount"), null, null)?.value;
    if (A) {
      const P = document.createElement("div");
      P.className = "recipe-rating";
      const G = Math.round(parseFloat(A)), R = "★".repeat(Math.min(G, 5)) + "☆".repeat(Math.max(5 - G, 0)), H = document.createElement("span");
      H.className = "recipe-stars", H.textContent = R, P.appendChild(H);
      const $ = document.createElement("span");
      $.className = "recipe-score", $.textContent = `${A}/5`, K && ($.textContent += ` (${K} reviews)`), P.appendChild($), r.appendChild(P);
    }
  }
  const C = e.any(n, L("recipeCategory"), null, null)?.value, T = e.any(n, L("recipeCuisine"), null, null)?.value;
  if (C || T) {
    const A = document.createElement("div");
    if (A.className = "recipe-tags", C) {
      const K = document.createElement("span");
      K.className = "recipe-tag", K.textContent = C, A.appendChild(K);
    }
    if (T) {
      const K = document.createElement("span");
      K.className = "recipe-tag", K.textContent = T, A.appendChild(K);
    }
    r.appendChild(A);
  }
  const B = e.each(n, L("recipeIngredient"), null, null);
  if (B.length > 0) {
    const A = document.createElement("div");
    A.className = "recipe-section";
    const K = document.createElement("h3");
    K.textContent = "Ingredients", A.appendChild(K);
    const P = document.createElement("ul");
    P.className = "recipe-ingredients";
    for (const G of B) {
      const R = document.createElement("li");
      R.textContent = G.value, P.appendChild(R);
    }
    A.appendChild(P), r.appendChild(A);
  }
  const O = e.each(n, L("recipeInstructions"), null, null);
  if (O.length > 0) {
    const A = document.createElement("div");
    A.className = "recipe-section";
    const K = document.createElement("h3");
    K.textContent = "Instructions", A.appendChild(K);
    const P = document.createElement("ol");
    P.className = "recipe-instructions";
    for (const G of O) {
      const R = e.any(G, L("text"), null, null)?.value ?? G.value;
      if (R && !R.startsWith("http")) {
        const H = document.createElement("li");
        H.textContent = R, P.appendChild(H);
      }
    }
    A.appendChild(P), r.appendChild(A);
  }
  const X = e.any(n, L("nutrition"), null, null);
  if (X) {
    const A = [
      ["calories", "Calories"],
      ["fatContent", "Fat"],
      ["carbohydrateContent", "Carbs"],
      ["proteinContent", "Protein"],
      ["fiberContent", "Fiber"],
      ["sugarContent", "Sugar"],
      ["sodiumContent", "Sodium"]
    ], K = [];
    for (const [P, G] of A) {
      const R = e.any(X, L(P), null, null)?.value;
      R && K.push({ label: G, value: R });
    }
    if (K.length > 0) {
      const P = document.createElement("div");
      P.className = "recipe-section";
      const G = document.createElement("h3");
      G.textContent = "Nutrition", P.appendChild(G);
      const R = document.createElement("div");
      R.className = "recipe-nutrition";
      for (const H of K) {
        const $ = document.createElement("div");
        $.className = "recipe-nutrition-item", $.innerHTML = `<span class="recipe-nutrition-value">${H.value}</span><span class="recipe-nutrition-label">${H.label}</span>`, R.appendChild($);
      }
      P.appendChild(R), r.appendChild(P);
    }
  }
  const Y = e.any(n, L("author"), null, null);
  if (Y) {
    const A = e.any(Y, L("name"), null, null)?.value ?? Y.value;
    if (A && !A.startsWith("http")) {
      const K = document.createElement("p");
      K.className = "recipe-author", K.textContent = `Recipe by ${A}`, r.appendChild(K);
    }
  }
  t.appendChild(r);
}
const hm = [
  "Recipe",
  "HowTo"
];
function fm(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of hm)
    if (r.includes(L(i).value)) return !0;
  return !!(e.any(n, L("recipeIngredient"), null, null) || e.any(n, L("recipeInstructions"), null, null));
}
const pm = {
  label: "Recipe",
  icon: "🍳",
  canHandle(n, e) {
    return fm(n, e);
  },
  render(n, e, t) {
    dm(n, e, t);
  }
};
Fe(pm);
function mm(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return !!(t.includes(wt("Tracker").value) || t.includes(Ci("Tracker").value) || e.any(n, wt("issue"), null, null));
}
function Ai(n) {
  return (n.split("#").pop() ?? n.split("/").pop() ?? n).replace(/([a-z])([A-Z])/g, "$1 $2");
}
function Oo(n) {
  const e = n.toLowerCase();
  return e.includes("open") || e.includes("new") ? "issue-state-open" : e.includes("closed") || e.includes("done") || e.includes("resolved") || e.includes("fixed") ? "issue-state-closed" : e.includes("progress") || e.includes("active") ? "issue-state-active" : "issue-state-default";
}
function gm(n, e, t) {
  const r = document.createElement("div");
  r.className = "issue-view";
  const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "issue-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, wt("state"), null, null);
  if (a) {
    const m = document.createElement("span");
    m.className = `issue-state ${Oo(a.value)}`, m.textContent = Ai(a.value), r.appendChild(m);
  }
  const l = document.createElement("div");
  l.className = "issue-details";
  const u = e.any(n, wt("assignee"), null, null);
  if (u) {
    const m = e.any(u, L("name"), null, null)?.value ?? fe(u.value), w = document.createElement("div");
    w.className = "issue-detail", w.innerHTML = `<span class="issue-label">Assignee</span><span class="issue-value">${m}</span>`, l.appendChild(w);
  }
  const c = e.any(n, wt("priority"), null, null)?.value ?? e.any(n, L("priority"), null, null)?.value;
  if (c) {
    const m = document.createElement("div");
    m.className = "issue-detail", m.innerHTML = `<span class="issue-label">Priority</span><span class="issue-value">${Ai(c)}</span>`, l.appendChild(m);
  }
  const h = e.any(n, de("created"), null, null)?.value ?? e.any(n, L("dateCreated"), null, null)?.value;
  if (h) {
    const m = document.createElement("div");
    m.className = "issue-detail";
    const w = new Date(h), v = isNaN(w.getTime()) ? h : w.toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    m.innerHTML = `<span class="issue-label">Created</span><span class="issue-value">${v}</span>`, l.appendChild(m);
  }
  l.children.length > 0 && r.appendChild(l);
  const p = e.any(n, de("description"), null, null)?.value ?? e.any(n, L("description"), null, null)?.value ?? e.any(n, at("comment"), null, null)?.value;
  if (p) {
    const m = document.createElement("div");
    m.className = "issue-description", m.textContent = p, r.appendChild(m);
  }
  t.appendChild(r);
}
function ym(n, e, t) {
  const r = document.createElement("div");
  r.className = "tracker-view";
  const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "tracker-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, de("description"), null, null)?.value ?? e.any(n, L("description"), null, null)?.value;
  if (a) {
    const c = document.createElement("p");
    c.className = "tracker-description", c.textContent = a, r.appendChild(c);
  }
  const l = e.each(n, wt("issue"), null, null), u = document.createElement("p");
  if (u.className = "tracker-count", u.textContent = `${l.length} issue${l.length !== 1 ? "s" : ""}`, r.appendChild(u), l.length === 0) {
    const c = document.createElement("p");
    c.className = "tracker-empty", c.textContent = "No issues found.", r.appendChild(c);
  } else {
    const c = document.createElement("ul");
    c.className = "tracker-issues";
    for (const h of l) {
      const p = h, m = document.createElement("li");
      m.className = "tracker-issue";
      const w = e.any(p, wt("state"), null, null);
      if (w) {
        const B = document.createElement("span");
        B.className = `issue-state ${Oo(w.value)}`, B.textContent = Ai(w.value), m.appendChild(B);
      }
      const v = e.any(p, de("title"), null, null)?.value ?? e.any(p, L("name"), null, null)?.value ?? fe(p.value), C = document.createElement("a");
      C.className = "tracker-issue-title", C.href = p.value, C.textContent = v, m.appendChild(C);
      const T = e.any(p, wt("assignee"), null, null);
      if (T) {
        const B = e.any(T, L("name"), null, null)?.value ?? fe(T.value), O = document.createElement("span");
        O.className = "tracker-issue-assignee", O.textContent = B, m.appendChild(O);
      }
      c.appendChild(m);
    }
    r.appendChild(c);
  }
  t.appendChild(r);
}
function vm(n, e, t) {
  t.innerHTML = "", mm(n, e) ? ym(n, e, t) : gm(n, e, t);
}
const wm = [
  wt("Tracker").value,
  wt("Issue").value,
  Ci("Tracker").value,
  Ci("Issue").value
];
function Em(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of wm)
    if (r.includes(i)) return !0;
  return !!(e.any(n, wt("issue"), null, null) || e.any(n, wt("state"), null, null));
}
const Cm = {
  label: "Issues",
  icon: "📋",
  canHandle(n, e) {
    return Em(n, e);
  },
  render(n, e, t) {
    vm(n, e, t);
  }
};
Fe(Cm);
function bm(n) {
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
function Nm(n, e) {
  return e.any(n, L("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? fe(n.value);
}
function Am(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "meeting-view";
  const i = e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? fe(n.value), s = document.createElement("h2");
  s.className = "meeting-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, L("startDate"), null, null)?.value ?? e.any(n, de("created"), null, null)?.value ?? e.any(n, de("date"), null, null)?.value;
  if (a) {
    const w = document.createElement("p");
    w.className = "meeting-date", w.textContent = bm(a), r.appendChild(w);
  }
  const l = e.any(n, L("location"), null, null)?.value ?? e.any(n, Mt("location"), null, null)?.value;
  if (l && !l.startsWith("http")) {
    const w = document.createElement("p");
    w.className = "meeting-location", w.textContent = l, r.appendChild(w);
  }
  const u = e.any(n, de("description"), null, null)?.value ?? e.any(n, L("description"), null, null)?.value;
  if (u) {
    const w = document.createElement("p");
    w.className = "meeting-description", w.textContent = u, r.appendChild(w);
  }
  const c = e.each(n, Mt("participant"), null, null);
  if (c.length > 0) {
    const w = document.createElement("div");
    w.className = "meeting-section";
    const v = document.createElement("h3");
    v.textContent = "Participants", w.appendChild(v);
    const C = document.createElement("ul");
    C.className = "meeting-participants";
    for (const T of c) {
      const B = T, O = Nm(B, e), X = document.createElement("li"), Y = document.createElement("a");
      Y.className = "meeting-participant", Y.href = B.value, Y.textContent = O, X.appendChild(Y), C.appendChild(X);
    }
    w.appendChild(C), r.appendChild(w);
  }
  const h = e.each(n, Mt("agenda"), null, null);
  if (h.length > 0) {
    const w = document.createElement("div");
    w.className = "meeting-section";
    const v = document.createElement("h3");
    v.textContent = "Agenda", w.appendChild(v);
    const C = document.createElement("ol");
    C.className = "meeting-agenda";
    for (const T of h) {
      const B = document.createElement("li"), O = e.any(T, de("title"), null, null)?.value ?? e.any(T, L("name"), null, null)?.value ?? T.value;
      O && !O.startsWith("http") ? B.textContent = O : B.textContent = fe(O), C.appendChild(B);
    }
    w.appendChild(C), r.appendChild(w);
  }
  const p = e.each(n, Mt("action"), null, null);
  if (p.length > 0) {
    const w = document.createElement("div");
    w.className = "meeting-section";
    const v = document.createElement("h3");
    v.textContent = "Action Items", w.appendChild(v);
    const C = document.createElement("ul");
    C.className = "meeting-actions";
    for (const T of p) {
      const B = document.createElement("li"), O = e.any(T, de("title"), null, null)?.value ?? e.any(T, L("name"), null, null)?.value ?? e.any(T, at("label"), null, null)?.value ?? T.value;
      O && !O.startsWith("http") ? B.textContent = O : B.textContent = fe(O), C.appendChild(B);
    }
    w.appendChild(C), r.appendChild(w);
  }
  const m = e.any(n, Rt("content"), null, null)?.value ?? e.any(n, L("text"), null, null)?.value;
  if (m) {
    const w = document.createElement("div");
    w.className = "meeting-section";
    const v = document.createElement("h3");
    v.textContent = "Notes", w.appendChild(v);
    const C = document.createElement("div");
    C.className = "meeting-notes", C.textContent = m, w.appendChild(C), r.appendChild(w);
  }
  t.appendChild(r);
}
Mt("Meeting").value, L("Event").value;
function xm(n, e) {
  return !!(e.each(n, me("type"), null, null).map((i) => i.value).includes(Mt("Meeting").value) || e.any(n, Mt("participant"), null, null) || e.any(n, Mt("agenda"), null, null));
}
const Tm = {
  label: "Meeting",
  icon: "🤝",
  canHandle(n, e) {
    return xm(n, e);
  },
  render(n, e, t) {
    Am(n, e, t);
  }
};
Fe(Tm);
const Al = {
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
function Dm(n, e) {
  const t = [], r = [
    ...e.each(n, et("contains"), null, null),
    ...e.each(n, ze("items"), null, null),
    ...e.each(n, nn("notification"), null, null)
  ], i = /* @__PURE__ */ new Set();
  for (const s of r) {
    if (i.has(s.value)) continue;
    i.add(s.value);
    const a = s, l = e.each(a, me("type"), null, null).map((O) => O.value);
    let u = "";
    for (const O of l) {
      const X = O.split("#").pop() ?? O.split("/").pop() ?? "";
      if (Al[X]) {
        u = X;
        break;
      }
    }
    const c = e.any(a, ze("actor"), null, null);
    let h = "", p = null;
    c && (p = c.value, h = e.any(c, L("name"), null, null)?.value ?? e.any(c, ze("name"), null, null)?.value ?? fe(c.value));
    const m = e.any(a, ze("object"), null, null);
    let w = "", v = null;
    m && (v = m.value, w = e.any(m, L("name"), null, null)?.value ?? e.any(m, ze("name"), null, null)?.value ?? fe(m.value));
    const C = e.any(a, ze("content"), null, null)?.value ?? e.any(a, ze("summary"), null, null)?.value ?? e.any(a, de("description"), null, null)?.value ?? null, T = e.any(a, ze("published"), null, null)?.value ?? e.any(a, de("created"), null, null)?.value ?? e.any(a, de("date"), null, null)?.value ?? null, B = Al[u] ?? (u.toLowerCase() || "notified");
    t.push({
      uri: a.value,
      type: u,
      actor: h,
      actorUri: p,
      verb: B,
      object: w,
      objectUri: v,
      content: C,
      timestamp: T
    });
  }
  return t.sort((s, a) => !s.timestamp && !a.timestamp ? 0 : s.timestamp ? a.timestamp ? new Date(a.timestamp).getTime() - new Date(s.timestamp).getTime() : -1 : 1), t;
}
function _m(n) {
  const e = new Date(n);
  if (isNaN(e.getTime())) return n;
  const t = /* @__PURE__ */ new Date(), r = t.getTime() - e.getTime(), i = Math.floor(r / 6e4), s = Math.floor(r / 36e5), a = Math.floor(r / 864e5);
  return i < 1 ? "just now" : i < 60 ? `${i}m ago` : s < 24 ? `${s}h ago` : a < 7 ? `${a}d ago` : e.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: e.getFullYear() !== t.getFullYear() ? "numeric" : void 0
  });
}
function Sm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "notif-view";
  const i = e.any(n, L("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, at("label"), null, null)?.value ?? "Notifications", s = document.createElement("h2");
  s.className = "notif-title", s.textContent = i, r.appendChild(s);
  const a = Dm(n, e), l = document.createElement("p");
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
    const p = document.createElement("div");
    if (p.className = "notif-summary", c.actor) {
      const m = document.createElement("a");
      m.className = "notif-actor", m.textContent = c.actor, c.actorUri && (m.href = c.actorUri), p.appendChild(m), p.appendChild(document.createTextNode(` ${c.verb} `));
    } else
      p.appendChild(document.createTextNode(`${c.verb} `));
    if (c.object) {
      const m = document.createElement("a");
      m.className = "notif-object", m.textContent = c.object, c.objectUri && (m.href = c.objectUri), p.appendChild(m);
    }
    if (h.appendChild(p), c.content) {
      const m = document.createElement("p");
      m.className = "notif-content", m.textContent = c.content, h.appendChild(m);
    }
    if (c.timestamp) {
      const m = document.createElement("time");
      m.className = "notif-time", m.dateTime = c.timestamp, m.textContent = _m(c.timestamp), h.appendChild(m);
    }
    u.appendChild(h);
  }
  r.appendChild(u), t.appendChild(r);
}
function Im(n, e) {
  const t = e.each(n, me("type"), null, null).map((r) => r.value);
  return !!((t.includes(et("Container").value) || t.includes(et("BasicContainer").value)) && (e.match(null, et("inbox"), n, null).length > 0 || e.match(null, nn("inbox"), n, null).length > 0) || t.includes(ze("OrderedCollection").value) || t.includes(ze("Collection").value) && (e.any(n, ze("items"), null, null) || e.any(n, et("contains"), null, null)) || e.any(n, nn("notification"), null, null));
}
const Fm = {
  label: "Notifications",
  icon: "🔔",
  canHandle(n, e) {
    return Im(n, e);
  },
  render(n, e, t) {
    Sm(n, e, t);
  }
};
Fe(Fm);
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
function xl(n, e) {
  return e.any(n, at("label"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value);
}
function Lm(n, e) {
  const t = e.each(n, me("type"), null, null);
  for (const r of t) {
    const i = fe(r.value);
    if (i !== "type") return i;
  }
  return "Unknown";
}
function Rm(n, e) {
  const t = [], r = e.each(n, yt("part"), null, null), i = e.any(n, yt("parts"), null, null);
  i && i.termType === "NamedNode" && Om(i, e, t);
  for (const s of r) {
    if (s.termType !== "NamedNode") continue;
    const a = s;
    t.some((l) => l.uri === a.value) || t.push(ko(a, e));
  }
  return t.sort((s, a) => s.sequence - a.sequence), t;
}
function Om(n, e, t) {
  let r = n;
  const i = /* @__PURE__ */ new Set();
  for (; r && !i.has(r.value) && (i.add(r.value), r.value !== me("nil").value); ) {
    const s = e.any(r, me("first"), null, null);
    s && s.termType === "NamedNode" && t.push(ko(s, e));
    const a = e.any(r, me("rest"), null, null);
    if (a && a.termType === "NamedNode")
      r = a;
    else
      break;
  }
}
function ko(n, e) {
  const t = Lm(n, e), r = e.any(n, yt("property"), null, null)?.value ?? null, i = e.any(n, yt("label"), null, null)?.value ?? (r ? fe(r) : t), s = e.any(n, yt("sequence"), null, null)?.value, a = s ? parseInt(s, 10) : 999, l = e.any(n, yt("contents"), null, null)?.value ?? null;
  return { uri: n.value, fieldType: t, property: r, label: i, sequence: a, contents: l };
}
function km(n, e) {
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
function Um(n, e, t) {
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
  const i = km(n, e);
  if (!i) {
    const p = document.createElement("p");
    p.className = "form-empty", p.textContent = "No form definition found for this resource.", r.appendChild(p), t.appendChild(r);
    return;
  }
  const s = e.any(i, de("title"), null, null)?.value ?? e.any(i, tt("title"), null, null)?.value ?? xl(i, e), a = document.createElement("h2");
  if (a.className = "form-title", a.textContent = s, r.appendChild(a), !(i.value === n.value)) {
    const p = document.createElement("p");
    p.className = "form-subject", p.textContent = `Editing: ${xl(n, e)}`, r.appendChild(p);
  }
  const u = Rm(i, e);
  if (u.length === 0) {
    const p = document.createElement("p");
    p.className = "form-no-fields", p.textContent = "This form has no fields defined.", r.appendChild(p), t.appendChild(r);
    return;
  }
  const c = document.createElement("p");
  c.className = "form-count", c.textContent = `${u.length} field${u.length !== 1 ? "s" : ""}`, r.appendChild(c);
  const h = document.createElement("div");
  h.className = "form-fields";
  for (const p of u)
    h.appendChild(Um(p, n, e));
  r.appendChild(h), t.appendChild(r);
}
function Mm(n, e) {
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
const $m = {
  label: "Form",
  icon: "📋",
  canHandle(n, e) {
    return Mm(n, e);
  },
  render(n, e, t) {
    Pm(n, e, t);
  }
};
Fe($m);
const qm = [
  { uri: "Read", label: "Read" },
  { uri: "Write", label: "Write" },
  { uri: "Append", label: "Append" },
  { uri: "Control", label: "Control" }
];
function Hm(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, we("fn"), null, null)?.value ?? fe(n.value);
}
function Wm(n, e) {
  const t = [], r = e.each(n, vt("trustedApp"), null, null);
  for (const i of r) {
    const s = e.any(i, vt("origin"), null, null);
    if (!s) continue;
    const a = s.value, l = fe(a), c = e.each(i, vt("mode"), null, null).map((h) => fe(h.value));
    t.push({ originUri: a, originLabel: l, modes: c });
  }
  return t.sort((i, s) => i.originUri.localeCompare(s.originUri)), t;
}
function Vm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "trusted-apps-view";
  const i = document.createElement("h2");
  i.className = "trusted-apps-title", i.textContent = "Trusted Applications", r.appendChild(i);
  const s = Hm(n, e), a = document.createElement("p");
  a.className = "trusted-apps-subtitle", a.textContent = `Manage applications trusted by ${s}`, r.appendChild(a);
  const l = Wm(n, e), u = document.createElement("p");
  if (u.className = "trusted-apps-count", u.textContent = `${l.length} trusted application${l.length !== 1 ? "s" : ""}`, r.appendChild(u), l.length === 0) {
    const C = document.createElement("p");
    C.className = "trusted-apps-empty", C.textContent = "No trusted applications configured.", r.appendChild(C), Tl(r), t.appendChild(r);
    return;
  }
  const c = document.createElement("table");
  c.className = "trusted-apps-table";
  const h = document.createElement("thead"), p = document.createElement("tr"), m = document.createElement("th");
  m.textContent = "Application URL";
  const w = document.createElement("th");
  w.textContent = "Access Modes", p.appendChild(m), p.appendChild(w), h.appendChild(p), c.appendChild(h);
  const v = document.createElement("tbody");
  for (const C of l) {
    const T = document.createElement("tr");
    T.className = "trusted-apps-row";
    const B = document.createElement("td");
    B.className = "trusted-apps-origin";
    const O = document.createElement("a");
    O.href = C.originUri, O.textContent = C.originUri, O.target = "_blank", O.rel = "noopener", B.appendChild(O), T.appendChild(B);
    const X = document.createElement("td");
    X.className = "trusted-apps-modes";
    for (const Y of qm) {
      const A = document.createElement("span"), K = C.modes.includes(Y.uri);
      A.className = `trusted-apps-mode ${K ? "trusted-apps-mode-active" : "trusted-apps-mode-inactive"}`, A.textContent = Y.label, X.appendChild(A);
    }
    T.appendChild(X), v.appendChild(T);
  }
  c.appendChild(v), r.appendChild(c), Tl(r), t.appendChild(r);
}
function Tl(n) {
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
function Km(n, e) {
  return e.each(n, vt("trustedApp"), null, null).length > 0;
}
const Gm = {
  label: "Trusted Apps",
  icon: "🛡️",
  canHandle(n, e) {
    return Km(n, e);
  },
  render(n, e, t) {
    Vm(n, e, t);
  }
};
Fe(Gm);
function Xm(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? "Notepad";
}
function Uo(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value);
}
function jm(n, e) {
  const t = [], r = /* @__PURE__ */ new Set();
  let i = e.any(n, Da("next"), null, null);
  for (; i && i.termType === "NamedNode" && !r.has(i.value) && i.value !== n.value; ) {
    r.add(i.value);
    const s = i, a = e.any(s, Rt("content"), null, null)?.value ?? e.any(s, tt("description"), null, null)?.value ?? "", l = e.any(s, tt("author"), null, null) ?? e.any(s, de("creator"), null, null) ?? e.any(s, be("maker"), null, null);
    let u = null, c = null;
    l && (c = l.value, l.termType === "NamedNode" ? u = Uo(l, e) : u = l.value), t.push({ uri: s.value, content: a, author: u, authorUri: c }), i = e.any(s, Da("next"), null, null);
  }
  return t;
}
function zm(n, e) {
  const t = e.any(n, de("created"), null, null)?.value ?? e.any(n, tt("date"), null, null)?.value;
  if (!t) return null;
  const r = new Date(t);
  return isNaN(r.getTime()) ? t : r.toLocaleDateString();
}
function Jm(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "pad-view";
  const i = Xm(n, e), s = document.createElement("h2");
  s.className = "pad-title", s.textContent = i, r.appendChild(s);
  const a = document.createElement("div");
  a.className = "pad-meta";
  const l = zm(n, e);
  if (l) {
    const v = document.createElement("span");
    v.className = "pad-date", v.textContent = `Created: ${l}`, a.appendChild(v);
  }
  const u = e.any(n, tt("author"), null, null) ?? e.any(n, de("creator"), null, null);
  if (u && u.termType === "NamedNode") {
    const v = Uo(u, e), C = document.createElement("span");
    C.className = "pad-author", C.textContent = `Author: ${v}`, a.appendChild(C);
  }
  a.children.length > 0 && r.appendChild(a);
  const c = jm(n, e);
  if (c.length === 0) {
    const v = document.createElement("p");
    v.className = "pad-empty", v.textContent = "This notepad is empty.", r.appendChild(v), t.appendChild(r);
    return;
  }
  const h = document.createElement("div");
  h.className = "pad-content";
  const m = new Set(c.filter((v) => v.author).map((v) => v.authorUri)).size > 1;
  for (const v of c) {
    const C = document.createElement("div");
    if (C.className = "pad-chunk", m && v.author) {
      const O = document.createElement("span");
      O.className = "pad-chunk-author", O.textContent = v.author, v.authorUri && (O.title = v.authorUri), C.appendChild(O);
    }
    const T = document.createElement("div");
    T.className = "pad-chunk-text";
    const B = v.content.split(`
`);
    for (let O = 0; O < B.length; O++)
      O > 0 && T.appendChild(document.createElement("br")), T.appendChild(document.createTextNode(B[O]));
    C.appendChild(T), h.appendChild(C);
  }
  r.appendChild(h);
  const w = document.createElement("p");
  w.className = "pad-count", w.textContent = `${c.length} chunk${c.length !== 1 ? "s" : ""}`, r.appendChild(w), t.appendChild(r);
}
function Ym(n, e) {
  return !!(e.each(n, me("type"), null, null).map((i) => i.value).includes(Da("Notepad").value) || e.any(n, Da("next"), null, null));
}
const Qm = {
  label: "Notepad",
  icon: "📝",
  canHandle(n, e) {
    return Ym(n, e);
  },
  render(n, e, t) {
    Jm(n, e, t);
  }
};
Fe(Qm);
function Zm(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? e.any(n, Rt("name"), null, null)?.value ?? "Microblog";
}
function e0(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value);
}
function t0(n, e) {
  return e.each(n, me("type"), null, null).some((r) => r.value === wa("MicroblogPost").value);
}
function Po(n, e) {
  const t = e.any(n, Rt("content"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value ?? e.any(n, tt("description"), null, null)?.value ?? "", r = e.any(n, de("created"), null, null)?.value ?? e.any(n, tt("date"), null, null)?.value, i = r ? new Date(r) : null, s = e.any(n, Rt("has_creator"), null, null) ?? e.any(n, be("maker"), null, null) ?? e.any(n, de("creator"), null, null);
  let a = null, l = null;
  return s && (l = s.value, s.termType === "NamedNode" ? a = e0(s, e) : a = s.value), { uri: n.value, content: t, created: i, creator: a, creatorUri: l };
}
function n0(n, e) {
  const t = e.each(n, Rt("container_of"), null, null), r = [];
  for (const i of t)
    i.termType === "NamedNode" && r.push(Po(i, e));
  return r.sort((i, s) => !i.created && !s.created ? 0 : i.created ? s.created ? s.created.getTime() - i.created.getTime() : -1 : 1), r;
}
function r0(n) {
  const e = /* @__PURE__ */ new Date(), t = e.getTime() - n.getTime(), r = Math.floor(t / 6e4), i = Math.floor(t / 36e5), s = Math.floor(t / 864e5);
  return r < 1 ? "just now" : r < 60 ? `${r}m ago` : i < 24 ? `${i}h ago` : s < 7 ? `${s}d ago` : n.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: n.getFullYear() !== e.getFullYear() ? "numeric" : void 0
  });
}
function a0(n, e) {
  const t = /(https?:\/\/[^\s<>"]+)/g, r = n.split(t);
  for (const i of r)
    if (t.test(i)) {
      t.lastIndex = 0;
      const s = document.createElement("a");
      s.href = i, s.textContent = i, s.target = "_blank", s.rel = "noopener", e.appendChild(s);
    } else i && e.appendChild(document.createTextNode(i));
}
function Dl(n) {
  const e = document.createElement("div");
  e.className = "microblog-post";
  const t = document.createElement("div");
  if (t.className = "microblog-post-header", n.creator) {
    const s = document.createElement("span");
    s.className = "microblog-post-author", s.textContent = n.creator, n.creatorUri && (s.title = n.creatorUri), t.appendChild(s);
  }
  if (n.created) {
    const s = document.createElement("time");
    s.className = "microblog-post-time", s.dateTime = n.created.toISOString(), s.textContent = r0(n.created), t.appendChild(s);
  }
  e.appendChild(t);
  const r = document.createElement("div");
  r.className = "microblog-post-content", a0(n.content, r), e.appendChild(r);
  const i = n.content.length;
  if (i > 0) {
    const s = document.createElement("span");
    s.className = "microblog-char-count", s.textContent = `${i}`, e.appendChild(s);
  }
  return e;
}
function i0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  if (r.className = "microblog-view", t0(n, e)) {
    const h = Po(n, e), p = document.createElement("h2");
    p.className = "microblog-title", p.textContent = "Microblog Post", r.appendChild(p), r.appendChild(Dl(h)), t.appendChild(r);
    return;
  }
  const i = Zm(n, e), s = document.createElement("h2");
  s.className = "microblog-title", s.textContent = i, r.appendChild(s);
  const a = e.any(n, de("description"), null, null)?.value ?? e.any(n, tt("description"), null, null)?.value;
  if (a) {
    const h = document.createElement("p");
    h.className = "microblog-description", h.textContent = a, r.appendChild(h);
  }
  const l = n0(n, e), u = document.createElement("p");
  if (u.className = "microblog-count", u.textContent = `${l.length} post${l.length !== 1 ? "s" : ""}`, r.appendChild(u), l.length === 0) {
    const h = document.createElement("p");
    h.className = "microblog-empty", h.textContent = "No posts yet.", r.appendChild(h), t.appendChild(r);
    return;
  }
  const c = document.createElement("div");
  c.className = "microblog-feed";
  for (const h of l)
    c.appendChild(Dl(h));
  r.appendChild(c), t.appendChild(r);
}
function s0(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  if (r.includes(wa("Microblog").value) || r.includes(wa("MessageBoard").value) || r.includes(Rt("Forum").value) || r.includes(wa("MicroblogPost").value)) return !0;
  const i = e.each(n, Rt("container_of"), null, null);
  if (i.length > 0) {
    for (const s of i)
      if (s.termType === "NamedNode" && e.any(s, Rt("content"), null, null))
        return !0;
  }
  return !1;
}
const l0 = {
  label: "Microblog",
  icon: "📢",
  canHandle(n, e) {
    return s0(n, e);
  },
  render(n, e, t) {
    i0(n, e, t);
  }
};
Fe(l0);
function o0(n, e) {
  const t = e.each(n, Lr("slot"), null, null), r = [];
  for (const i of t) {
    const s = e.any(i, Lr("index"), null, null), a = e.any(i, Lr("item"), null, null);
    if (!a) continue;
    const l = a, u = e.any(l, tt("title"), null, null)?.value ?? e.any(l, de("title"), null, null)?.value ?? e.any(l, L("name"), null, null)?.value ?? l.value, c = e.any(l, L("video"), null, null)?.value ?? e.any(l, L("contentUrl"), null, null)?.value ?? void 0;
    r.push({
      index: s ? Number(s.value) : 0,
      title: u,
      uri: l.value,
      videoUrl: c
    });
  }
  return r.sort((i, s) => i.index - s.index), r;
}
function u0(n) {
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
function c0(n) {
  const e = document.createElement("figure");
  if (e.className = "playlist-media", n.videoUrl) {
    const r = u0(n.videoUrl);
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
function d0(n, e, t) {
  t.innerHTML = "";
  const r = e.any(n, tt("title"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? "Untitled Playlist", i = o0(n, e);
  if (i.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No tracks found in this playlist.", t.appendChild(p);
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
  for (let p = 0; p < i.length; p++) {
    const m = document.createElement("li");
    m.className = "playlist-track", p === 0 && m.classList.add("playlist-track--active"), m.dataset.uri = i[p].uri;
    const w = document.createElement("button");
    w.className = "playlist-track-btn", w.textContent = i[p].title, w.setAttribute("aria-label", `Play ${i[p].title}`), w.addEventListener("click", () => h(p)), m.appendChild(w), c.appendChild(m);
  }
  a.appendChild(c), t.appendChild(a);
  function h(p) {
    s = p;
    const m = i[p];
    u.innerHTML = "";
    const w = c0(m);
    if (u.appendChild(w), i.length > 1) {
      const C = document.createElement("nav");
      C.className = "playlist-nav", C.setAttribute("aria-label", "Playlist navigation");
      const T = document.createElement("button");
      T.className = "playlist-nav-link", T.setAttribute("aria-label", "Previous track"), T.textContent = "◀ Previous", T.addEventListener("click", () => {
        h((s - 1 + i.length) % i.length);
      }), C.appendChild(T);
      const B = document.createElement("span");
      B.className = "playlist-slot-info", B.setAttribute("aria-current", "true"), B.textContent = `${p + 1} / ${i.length}`, C.appendChild(B);
      const O = document.createElement("button");
      O.className = "playlist-nav-link", O.setAttribute("aria-label", "Next track"), O.textContent = "Next ▶", O.addEventListener("click", () => {
        h((s + 1) % i.length);
      }), C.appendChild(O), u.appendChild(C);
    }
    const v = c.querySelectorAll(".playlist-track");
    for (let C = 0; C < v.length; C++)
      v[C].classList.toggle("playlist-track--active", C === p);
  }
  h(0);
}
function h0(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  return r.includes(Lr("OrderedList").value) || r.includes(rf("Playlist").value) ? !0 : e.each(n, Lr("slot"), null, null).length > 0;
}
const f0 = {
  label: "Playlist",
  icon: "🎵",
  canHandle(n, e) {
    return h0(n, e);
  },
  render(n, e, t) {
    d0(n, e, t);
  }
};
Fe(f0);
function p0(n, e) {
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
function m0(n, e) {
  const t = e.each(n, et("contains"), null, null), r = [];
  for (const i of t) {
    const s = i, a = s.value, l = e.each(s, me("type"), null, null).map((C) => C.value), u = l.includes(et("Container").value) || l.includes(et("BasicContainer").value) || a.endsWith("/"), c = qi(a, u), p = (e.any(s, de("modified"), null, null) ?? e.any(s, cl("mtime"), null, null))?.value, m = e.any(s, cl("size"), null, null), w = m ? Number(m.value) : void 0, v = e.any(s, de("format"), null, null)?.value ?? void 0;
    r.push({ uri: a, name: c, isContainer: u, modified: p, size: w, contentType: v });
  }
  return r.sort((i, s) => i.isContainer !== s.isContainer ? i.isContainer ? -1 : 1 : i.name.localeCompare(s.name)), r;
}
function qi(n, e) {
  const r = (e ? n.replace(/\/$/, "") : n).split("/");
  return decodeURIComponent(r[r.length - 1] || n);
}
function g0(n) {
  return n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function y0(n) {
  const e = Number(n), t = Number.isNaN(e) ? new Date(n) : new Date(e * 1e3);
  return Number.isNaN(t.getTime()) ? n : t.toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function v0(n) {
  const e = n.replace(/\/$/, ""), t = e.lastIndexOf("/");
  return t <= 7 ? null : e.slice(0, t + 1);
}
function w0(n) {
  const e = [];
  let t = n;
  for (; ; ) {
    const r = qi(t, !0);
    e.unshift({ label: r || "Root", uri: t });
    const i = v0(t);
    if (!i) break;
    t = i;
  }
  return e;
}
function E0(n, e, t, r) {
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
  const p = document.createElement("button");
  p.className = "folder-toolbar-btn folder-create-cancel", p.textContent = "Cancel", l.appendChild(p);
  const m = document.createElement("span");
  m.className = "folder-create-status", l.appendChild(m), i.appendChild(l);
  let w = "folder";
  function v(T) {
    w = T, u.textContent = T === "folder" ? "Folder name:" : "File name:", c.value = "", m.textContent = "", l.hidden = !1, s.hidden = !0, a.hidden = !0, c.focus();
  }
  function C() {
    l.hidden = !0, s.hidden = !1, a.hidden = !1, m.textContent = "";
  }
  return s.addEventListener("click", () => v("folder")), a.addEventListener("click", () => v("file")), p.addEventListener("click", C), c.addEventListener("keydown", (T) => {
    T.key === "Enter" && h.click(), T.key === "Escape" && C();
  }), h.addEventListener("click", async () => {
    const T = c.value.trim();
    if (!T) {
      m.textContent = "Name cannot be empty.";
      return;
    }
    h.disabled = !0, m.textContent = "Creating...";
    try {
      if (w === "folder") {
        const B = n.value.endsWith("/") ? n.value : n.value + "/";
        await e.webOperation("POST", B, {
          data: "",
          contentType: "text/turtle",
          headers: {
            Slug: T,
            Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"'
          }
        });
      } else {
        const O = (n.value.endsWith("/") ? n.value : n.value + "/") + encodeURIComponent(T), X = T.split(".").pop()?.toLowerCase() ?? "", A = {
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
        }[X] ?? "text/turtle";
        await e.webOperation("PUT", O, {
          data: "",
          contentType: A
        });
      }
      C(), await e.load(n, { force: !0 }), Mo(n, r, t);
    } catch (B) {
      const O = B instanceof Error ? B.message : String(B);
      m.textContent = `Error: ${O}`, h.disabled = !1;
    }
  }), i;
}
function Mo(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "folder-view";
  const i = e.any(n, tt("title"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? qi(n.value, !0), s = document.createElement("h2");
  s.className = "folder-title", s.textContent = i, r.appendChild(s);
  const a = w0(n.value);
  if (a.length > 1) {
    const B = document.createElement("nav");
    B.className = "folder-breadcrumbs", B.setAttribute("aria-label", "Folder path");
    for (let O = 0; O < a.length; O++) {
      if (O > 0) {
        const X = document.createElement("span");
        X.className = "folder-breadcrumb-sep", X.textContent = " / ", B.appendChild(X);
      }
      if (O < a.length - 1) {
        const X = sn(a[O].uri, a[O].label);
        X.className = "folder-breadcrumb", B.appendChild(X);
      } else {
        const X = document.createElement("span");
        X.className = "folder-breadcrumb-current", X.textContent = a[O].label, B.appendChild(X);
      }
    }
    r.appendChild(B);
  }
  const l = document.createElement("p");
  l.className = "folder-path", l.textContent = n.value, r.appendChild(l);
  const u = m0(n, e), c = u.filter((B) => B.isContainer), h = u.filter((B) => !B.isContainer), p = [];
  c.length > 0 && p.push(`${c.length} folder${c.length !== 1 ? "s" : ""}`), h.length > 0 && p.push(`${h.length} file${h.length !== 1 ? "s" : ""}`);
  const m = document.createElement("p");
  m.className = "folder-count", m.textContent = p.length > 0 ? p.join(", ") : "0 items", r.appendChild(m);
  const w = e.fetcher;
  if (w) {
    const B = E0(n, w, t, e);
    r.appendChild(B);
  }
  if (u.length === 0) {
    const B = document.createElement("p");
    B.className = "folder-empty", B.textContent = "This folder is empty.", r.appendChild(B), t.appendChild(r);
    return;
  }
  const v = document.createElement("table");
  v.className = "folder-listing";
  const C = document.createElement("thead");
  C.innerHTML = "<tr><th></th><th>Name</th><th>Type</th><th>Size</th><th>Modified</th></tr>", v.appendChild(C);
  const T = document.createElement("tbody");
  for (const B of u) {
    const O = document.createElement("tr");
    O.className = B.isContainer ? "folder-row" : "file-row";
    const X = document.createElement("td");
    X.className = "folder-icon", X.textContent = p0(B.name, B.isContainer), O.appendChild(X);
    const Y = document.createElement("td");
    Y.className = "folder-name";
    const A = sn(B.uri, B.name + (B.isContainer ? "/" : ""));
    Y.appendChild(A), O.appendChild(Y);
    const K = document.createElement("td");
    K.className = "folder-type", B.isContainer ? K.textContent = "Folder" : B.contentType ? K.textContent = B.contentType : K.textContent = "", O.appendChild(K);
    const P = document.createElement("td");
    P.className = "folder-size", P.textContent = B.size != null ? g0(B.size) : "", O.appendChild(P);
    const G = document.createElement("td");
    G.className = "folder-modified", G.textContent = B.modified ? y0(B.modified) : "", O.appendChild(G), T.appendChild(O);
  }
  v.appendChild(T), r.appendChild(v), t.appendChild(r);
}
function C0(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(et("Container").value) || r.includes(et("BasicContainer").value) || n.value.endsWith("/") && e.match(n, et("contains"), null, null).length > 0);
}
const b0 = {
  label: "Folder",
  icon: "📁",
  canHandle(n, e) {
    return C0(n, e);
  },
  render(n, e, t) {
    Mo(n, e, t);
  }
};
Fe(b0);
function N0(n, e) {
  const t = e.each(null, dr("storage"), n, null);
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
function A0(n, e) {
  const t = e.each(null, dr("storage"), n, null);
  for (const i of t)
    if (i.termType === "NamedNode") return i.value;
  const r = e.any(n, be("primaryTopic"), null, null);
  return r && r.termType === "NamedNode" ? r.value : null;
}
function x0(n, e) {
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
function T0(n, e) {
  const r = e.each(n, me("type"), null, null).map((s) => s.value);
  let i = null;
  return r.includes(nn("Account").value) ? i = "Solid Account" : r.includes(dr("Storage").value) && (i = "Solid Pod"), { typeLabel: i };
}
function D0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "dashboard-view";
  const i = N0(n, e), s = A0(n, e), a = document.createElement("h2");
  a.className = "dashboard-title", a.textContent = i ? `${i}'s Pod` : "Solid Pod", r.appendChild(a);
  const l = document.createElement("p");
  l.className = "dashboard-url";
  const u = document.createElement("code");
  u.textContent = n.value, l.appendChild(u), r.appendChild(l);
  const { typeLabel: c } = T0(n, e);
  if (c) {
    const w = document.createElement("span");
    w.className = "dashboard-badge", w.textContent = c, r.appendChild(w);
  }
  if (s) {
    const w = document.createElement("div");
    w.className = "dashboard-section";
    const v = document.createElement("h3");
    v.textContent = "Profile", w.appendChild(v);
    const C = sn(s, i ? `View ${i}'s profile` : "View profile");
    C.className = "dashboard-link", w.appendChild(C), r.appendChild(w);
  }
  const h = x0(n, e), p = document.createElement("div");
  p.className = "dashboard-section";
  const m = document.createElement("h3");
  if (m.textContent = "Data", p.appendChild(m), h.length === 0) {
    const w = document.createElement("p");
    w.className = "dashboard-empty", w.textContent = "No visible contents.", p.appendChild(w);
  } else {
    const w = document.createElement("p");
    w.className = "dashboard-count";
    const v = h.filter((O) => O.type === "container").length, C = h.filter((O) => O.type === "resource").length, T = [];
    v > 0 && T.push(`${v} folder${v !== 1 ? "s" : ""}`), C > 0 && T.push(`${C} file${C !== 1 ? "s" : ""}`), w.textContent = T.join(", "), p.appendChild(w);
    const B = document.createElement("ul");
    B.className = "dashboard-contents";
    for (const O of h) {
      const X = document.createElement("li");
      X.className = `dashboard-item dashboard-item-${O.type}`;
      const Y = document.createElement("span");
      Y.className = "dashboard-item-icon", Y.textContent = O.type === "container" ? "📁" : "📄", X.appendChild(Y);
      const A = sn(O.uri, O.label);
      A.className = "dashboard-item-link", A.title = O.uri, X.appendChild(A), B.appendChild(X);
    }
    p.appendChild(B);
  }
  r.appendChild(p), t.appendChild(r);
}
function _0(n, e) {
  const r = e.each(n, me("type"), null, null).map((a) => a.value);
  if (r.includes(dr("Storage").value) || r.includes(nn("Account").value)) return !0;
  if (r.includes(et("Container").value) || r.includes(et("BasicContainer").value))
    try {
      if (new URL(n.value).pathname === "/") return !0;
    } catch {
    }
  return e.each(null, dr("storage"), n, null).length > 0;
}
const S0 = {
  label: "Dashboard",
  icon: "🏠",
  canHandle(n, e) {
    return _0(n, e);
  },
  render(n, e, t) {
    D0(n, e, t);
  }
};
Fe(S0);
const I0 = /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i;
function F0(n, e) {
  return e.any(n, de("title"), null, null)?.value ?? e.any(n, tt("title"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? "Chat";
}
function $o(n, e) {
  return e.any(n, be("name"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value);
}
function B0(n, e) {
  const t = e.each(n, wt("message"), null, null), r = [];
  for (const i of t) {
    const s = i, a = e.any(s, Rt("content"), null, null)?.value ?? e.any(s, de("content"), null, null)?.value ?? e.any(s, tt("description"), null, null)?.value ?? "", l = e.any(s, de("created"), null, null)?.value ?? e.any(s, tt("date"), null, null)?.value, u = l ? new Date(l) : null, c = e.any(s, be("maker"), null, null) ?? e.any(s, tt("creator"), null, null);
    let h = null, p = null;
    c && (p = c.value, c.termType === "NamedNode" ? h = $o(c, e) : h = c.value), r.push({ uri: s.value, content: a, created: u, maker: h, makerUri: p });
  }
  return r.sort((i, s) => !i.created && !s.created ? 0 : i.created ? s.created ? i.created.getTime() - s.created.getTime() : 1 : -1), r;
}
function L0(n) {
  return n.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function R0(n) {
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
function k0(n, e) {
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
function U0(n) {
  return n ? n.charAt(0).toUpperCase() : "?";
}
function P0(n, e, t) {
  t.innerHTML = "";
  const r = F0(n, e), i = document.createElement("div");
  i.className = "chat-view", i.setAttribute("role", "region"), i.setAttribute("aria-label", r);
  const s = document.createElement("header");
  s.className = "chat-header";
  const a = document.createElement("h2");
  a.className = "chat-title", a.textContent = r, s.appendChild(a);
  const l = e.any(n, tt("author"), null, null) ?? e.any(n, de("creator"), null, null);
  if (l && l.termType === "NamedNode") {
    const m = $o(l, e), w = document.createElement("p");
    w.className = "chat-creator", w.textContent = `Created by ${m}`, s.appendChild(w);
  }
  const u = B0(n, e), c = document.createElement("p");
  if (c.className = "chat-count", c.textContent = `${u.length} message${u.length !== 1 ? "s" : ""}`, s.appendChild(c), i.appendChild(s), u.length === 0) {
    const m = document.createElement("p");
    m.className = "chat-empty", m.textContent = "No messages yet.", i.appendChild(m), t.appendChild(i);
    return;
  }
  const h = document.createElement("ul");
  h.className = "chat-messages", h.setAttribute("role", "log"), h.setAttribute("aria-label", "Message history"), h.setAttribute("aria-live", "polite");
  let p = null;
  for (const m of u) {
    if (m.created) {
      const X = O0(m.created);
      if (X !== p) {
        p = X;
        const Y = document.createElement("li");
        Y.className = "chat-date-header", Y.setAttribute("role", "separator");
        const A = document.createElement("time");
        A.dateTime = X, A.textContent = R0(m.created), Y.appendChild(A), h.appendChild(Y);
      }
    }
    const w = document.createElement("li");
    w.className = "chat-message";
    const v = document.createElement("article");
    v.setAttribute("aria-label", `Message from ${m.maker || "Unknown"}`);
    const C = document.createElement("div");
    C.className = "chat-avatar", C.setAttribute("aria-hidden", "true"), C.textContent = U0(m.maker), v.appendChild(C);
    const T = document.createElement("div");
    T.className = "chat-message-body";
    const B = document.createElement("div");
    if (B.className = "chat-message-header", m.maker)
      if (m.makerUri) {
        const X = sn(m.makerUri, m.maker);
        X.className = "chat-author", X.title = m.makerUri, B.appendChild(X);
      } else {
        const X = document.createElement("span");
        X.className = "chat-author", X.textContent = m.maker, B.appendChild(X);
      }
    if (m.created) {
      const X = document.createElement("time");
      X.className = "chat-time", X.dateTime = m.created.toISOString(), X.textContent = L0(m.created), B.appendChild(X);
    }
    T.appendChild(B);
    const O = document.createElement("div");
    O.className = "chat-content", k0(m.content, O), T.appendChild(O), v.appendChild(T), w.appendChild(v), h.appendChild(w);
  }
  i.appendChild(h), t.appendChild(i);
}
function M0(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(Mt("LongChat").value) || r.includes(Mt("ShortChat").value) || r.includes(Mt("Chat").value) || r.includes(wt("Flow").value) || r.includes(Rt("Thread").value) || e.match(n, wt("message"), null, null).length > 0 || e.any(n, Rt("content"), null, null) && e.any(n, de("created"), null, null));
}
const $0 = {
  label: "Chat",
  icon: "💬",
  canHandle(n, e) {
    return M0(n, e);
  },
  render(n, e, t) {
    P0(n, e, t);
  }
};
Fe($0);
function qo(n, e) {
  return e.any(n, we("fn"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value);
}
function q0(n, e) {
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
function H0(n, e) {
  const t = [], r = e.each(n, we("hasTelephone"), null, null);
  for (const i of r) {
    const s = e.any(i, we("value"), null, null)?.value;
    s ? t.push(s) : i.value.startsWith("tel:") && t.push(i.value);
  }
  return t;
}
function W0(n, e) {
  const t = e.any(n, we("hasAddress"), null, null);
  if (!t) return;
  const r = t, i = e.any(r, we("street-address"), null, null)?.value, s = e.any(r, we("locality"), null, null)?.value, a = e.any(r, we("region"), null, null)?.value, l = e.any(r, we("postal-code"), null, null)?.value, u = e.any(r, we("country-name"), null, null)?.value, c = [i, s, a, l, u].filter(Boolean);
  return c.length > 0 ? c.join(", ") : void 0;
}
function Ho(n, e) {
  const t = e.each(n, we("hasMember"), null, null), r = [];
  for (const i of t) {
    const s = i;
    if (e.holds(s, me("type"), we("Group"))) {
      const a = Ho(s, e);
      r.push(...a);
      continue;
    }
    r.push({
      uri: s.value,
      name: qo(s, e),
      emails: q0(s, e),
      phones: H0(s, e),
      title: e.any(s, we("title"), null, null)?.value ?? void 0,
      org: e.any(s, we("organization-name"), null, null)?.value ?? void 0,
      photo: e.any(s, we("hasPhoto"), null, null)?.value ?? e.any(s, be("img"), null, null)?.value ?? void 0,
      address: W0(s, e),
      note: e.any(s, we("note"), null, null)?.value ?? void 0
    });
  }
  return r.sort((i, s) => i.name.localeCompare(s.name)), r;
}
function V0(n, e) {
  const t = [], r = e.each(n, we("hasMember"), null, null);
  for (const i of r) {
    const s = i;
    if (e.holds(s, me("type"), we("Group"))) {
      const a = qo(s, e), l = e.each(s, we("hasMember"), null, null).length;
      t.push({ name: a, count: l, uri: s.value });
    }
  }
  return t.sort((i, s) => i.name.localeCompare(s.name)), t;
}
function K0(n, e) {
  return e.any(n, we("fn"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? "Address Book";
}
function G0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "contacts-view";
  const i = K0(n, e), s = document.createElement("h2");
  s.className = "contacts-title", s.textContent = i, r.appendChild(s);
  const a = Ho(n, e), l = V0(n, e), u = document.createElement("p");
  if (u.className = "contacts-count", u.textContent = `${a.length} contact${a.length !== 1 ? "s" : ""}`, r.appendChild(u), a.length > 5) {
    const h = document.createElement("input");
    h.className = "contacts-search", h.type = "search", h.placeholder = "Filter contacts...", h.setAttribute("aria-label", "Filter contacts"), h.addEventListener("input", () => {
      const p = h.value.toLowerCase(), m = r.querySelectorAll(".contact-card");
      for (const w of m) {
        const v = w, C = v.getAttribute("data-name") ?? "";
        v.style.display = C.toLowerCase().includes(p) ? "" : "none";
      }
    }), r.appendChild(h);
  }
  if (l.length > 0) {
    const h = document.createElement("div");
    h.className = "contacts-groups";
    const p = document.createElement("h3");
    p.textContent = "Groups", h.appendChild(p);
    const m = document.createElement("ul");
    m.className = "contacts-group-list";
    for (const w of l) {
      const v = document.createElement("li");
      v.className = "contacts-group-item";
      const C = sn(w.uri, `${w.name} (${w.count})`);
      v.appendChild(C), m.appendChild(v);
    }
    h.appendChild(m), r.appendChild(h);
  }
  if (a.length === 0) {
    const h = document.createElement("p");
    h.className = "contacts-empty", h.textContent = "No contacts found.", r.appendChild(h), t.appendChild(r);
    return;
  }
  const c = document.createElement("ul");
  c.className = "contacts-list";
  for (const h of a) {
    const p = document.createElement("li");
    if (p.className = "contact-card", p.setAttribute("data-name", h.name), h.photo) {
      const v = document.createElement("img");
      v.className = "contact-photo", v.src = h.photo, v.alt = h.name, p.appendChild(v);
    } else {
      const v = document.createElement("div");
      v.className = "contact-photo-placeholder", v.textContent = h.name.charAt(0).toUpperCase(), p.appendChild(v);
    }
    const m = document.createElement("div");
    m.className = "contact-info";
    const w = sn(h.uri, h.name);
    if (w.className = "contact-name", w.title = h.uri, m.appendChild(w), h.title) {
      const v = document.createElement("span");
      v.className = "contact-title", v.textContent = h.title, m.appendChild(v);
    }
    if (h.org) {
      const v = document.createElement("span");
      v.className = "contact-org", v.textContent = h.org, m.appendChild(v);
    }
    for (const v of h.emails) {
      const C = document.createElement("a");
      C.className = "contact-email";
      const T = v.replace("mailto:", "");
      C.href = v.startsWith("mailto:") ? v : `mailto:${T}`, C.textContent = T, m.appendChild(C);
    }
    for (const v of h.phones) {
      const C = document.createElement("a");
      C.className = "contact-phone";
      const T = v.replace("tel:", "");
      C.href = v.startsWith("tel:") ? v : `tel:${T}`, C.textContent = T, m.appendChild(C);
    }
    if (h.address) {
      const v = document.createElement("span");
      v.className = "contact-address", v.textContent = h.address, m.appendChild(v);
    }
    if (h.note) {
      const v = document.createElement("p");
      v.className = "contact-note", v.textContent = h.note, m.appendChild(v);
    }
    p.appendChild(m), c.appendChild(p);
  }
  r.appendChild(c), t.appendChild(r);
}
function X0(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(we("AddressBook").value) || r.includes(we("Group").value) || e.match(n, we("hasMember"), null, null).length > 0);
}
const j0 = {
  label: "Contacts",
  icon: "📇",
  canHandle(n, e) {
    return X0(n, e);
  },
  render(n, e, t) {
    G0(n, e, t);
  }
};
Fe(j0);
function Rn(n, e, t, r = !1) {
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
function z0(n, e, t) {
  t.innerHTML = "";
  const r = document.createElement("div");
  r.className = "org-card";
  const i = e.any(n, L("logo"), null, null)?.value ?? e.any(n, be("logo"), null, null)?.value ?? e.any(n, be("img"), null, null)?.value;
  if (i) {
    const O = document.createElement("img");
    O.className = "org-logo", O.src = i, O.alt = "Organization logo", r.appendChild(O);
  }
  const s = e.any(n, L("name"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, de("title"), null, null)?.value ?? fe(n.value), a = document.createElement("h2");
  a.className = "org-name", a.textContent = s, r.appendChild(a);
  const l = e.any(n, L("description"), null, null)?.value ?? e.any(n, de("description"), null, null)?.value;
  if (l) {
    const O = document.createElement("p");
    O.className = "org-description", O.textContent = l, r.appendChild(O);
  }
  const u = document.createElement("div");
  u.className = "org-details";
  const c = e.any(n, L("url"), null, null)?.value;
  Rn(u, "Website", c, !0);
  const h = e.any(n, L("email"), null, null)?.value;
  Rn(u, "Email", h, !0);
  const p = e.any(n, L("telephone"), null, null)?.value;
  Rn(u, "Phone", p);
  const m = e.any(n, L("address"), null, null);
  if (m) {
    const O = e.any(m, L("streetAddress"), null, null)?.value, X = e.any(m, L("addressLocality"), null, null)?.value, Y = e.any(m, L("addressRegion"), null, null)?.value, A = e.any(m, L("addressCountry"), null, null)?.value;
    if (O || X) {
      const K = [O, X, Y, A].filter(Boolean);
      Rn(u, "Address", K.join(", "));
    } else
      Rn(u, "Address", m.value);
  }
  const w = e.any(n, L("foundingDate"), null, null)?.value;
  Rn(u, "Founded", w);
  const v = e.any(n, L("numberOfEmployees"), null, null)?.value;
  Rn(u, "Employees", v), r.appendChild(u);
  const C = e.each(n, L("member"), null, null), T = e.each(n, L("employee"), null, null), B = [...C, ...T];
  if (B.length > 0) {
    const O = document.createElement("div");
    O.className = "org-people";
    const X = document.createElement("h3");
    X.textContent = `People (${B.length})`, O.appendChild(X);
    const Y = document.createElement("ul");
    Y.className = "org-people-list";
    for (const A of B) {
      const K = e.any(A, L("name"), null, null)?.value ?? e.any(A, be("name"), null, null)?.value ?? fe(A.value), P = document.createElement("li"), G = sn(A.value, K);
      G.title = A.value, P.appendChild(G), Y.appendChild(P);
    }
    O.appendChild(Y), r.appendChild(O);
  }
  t.appendChild(r);
}
const J0 = [
  L("Organization"),
  L("Corporation"),
  L("GovernmentOrganization"),
  L("NGO"),
  L("EducationalOrganization"),
  L("LocalBusiness"),
  be("Organization"),
  be("Group")
];
function Y0(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  for (const i of J0)
    if (r.includes(i.value)) return !0;
  return !1;
}
const Q0 = {
  label: "Organization",
  icon: "🏢",
  canHandle(n, e) {
    return Y0(n, e);
  },
  render(n, e, t) {
    z0(n, e, t);
  }
};
Fe(Q0);
function Z0(n, e) {
  return e.any(n, we("fn"), null, null)?.value ?? e.any(n, be("name"), null, null)?.value ?? e.any(n, L("name"), null, null)?.value ?? fe(n.value);
}
function eg(n, e) {
  return e.any(n, we("hasPhoto"), null, null)?.value ?? e.any(n, be("img"), null, null)?.value ?? e.any(n, L("image"), null, null)?.value ?? e.any(n, be("depiction"), null, null)?.value ?? void 0;
}
function tg(n, e) {
  const t = e.any(n, nn("preferredSubjectPronoun"), null, null)?.value;
  if (!t) return;
  let r = t;
  const i = e.any(n, nn("preferredObjectPronoun"), null, null)?.value;
  if (i) {
    r += "/" + i;
    const s = e.any(n, nn("preferredRelativePronoun"), null, null)?.value;
    s && (r += "/" + s);
  }
  return r;
}
function ng(n, e) {
  const t = e.any(n, we("hasAddress"), null, null);
  if (!t) return;
  const r = t, i = e.any(r, we("locality"), null, null)?.value, s = e.any(r, we("region"), null, null)?.value, a = e.any(r, we("country-name"), null, null)?.value, l = [i, s, a].filter(Boolean);
  return l.length > 0 ? l.join(", ") : void 0;
}
function rg(n, e) {
  const t = [], r = e.each(n, be("account"), null, null);
  for (const i of r) {
    const s = i, a = e.any(s, be("name"), null, null)?.value ?? e.any(s, at("label"), null, null)?.value ?? fe(s.value), l = e.any(s, be("homepage"), null, null)?.value ?? s.value;
    t.push({ name: a, uri: l });
  }
  return t;
}
function ag(n, e) {
  const t = [], r = e.each(n, we("hasTelephone"), null, null);
  for (const i of r) {
    const s = e.any(i, we("value"), null, null)?.value;
    s ? t.push(s) : i.value.startsWith("tel:") && t.push(i.value);
  }
  return t;
}
function ig(n, e) {
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
function sg(n, e) {
  const t = e.each(null, si("member"), n, null), r = [], i = [];
  for (const s of t) {
    const a = s, l = e.any(a, si("organization"), null, null), u = l ? e.any(l, L("name"), null, null)?.value ?? e.any(l, be("name"), null, null)?.value ?? fe(l.value) : "", c = e.any(a, si("role"), null, null), h = e.any(a, we("role"), null, null)?.value, p = c ? e.any(c, L("name"), null, null)?.value : void 0, m = h && p ? `${p} - ${h}` : h || p || "", w = e.any(a, L("startDate"), null, null)?.value, v = e.any(a, L("endDate"), null, null)?.value, C = w ? `${w.slice(0, 10)} – ${v ? v.slice(0, 10) : "present"}` : "", T = { orgName: u, roleText: m, dates: C };
    e.holds(a, me("type"), nn("PastRole")) ? i.push(T) : r.push(T);
  }
  return { current: r, past: i };
}
function Zn(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function pn(n, e, t, r = !1) {
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
const _l = [
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
      lg(n, e, t, r);
    }), $.appendChild(q), a.appendChild($);
  }
  const l = eg(n, e);
  if (l) {
    const $ = document.createElement("img");
    $.className = "profile-photo", $.src = l, $.alt = "Profile photo", a.appendChild($);
  }
  const u = Z0(n, e), c = document.createElement("h2");
  c.className = "profile-name", c.textContent = u, a.appendChild(c);
  const h = tg(n, e);
  if (h) {
    const $ = document.createElement("p");
    $.className = "profile-pronouns", $.textContent = h, a.appendChild($);
  }
  const p = e.any(n, be("nick"), null, null)?.value;
  if (p) {
    const $ = document.createElement("p");
    $.className = "profile-nick", $.textContent = `@${p}`, a.appendChild($);
  }
  const m = ng(n, e);
  if (m) {
    const $ = document.createElement("p");
    $.className = "profile-location", $.textContent = m, a.appendChild($);
  }
  const w = document.createElement("p");
  w.className = "profile-webid";
  const v = document.createElement("a");
  v.href = n.value, v.textContent = n.value, v.target = "_blank", v.rel = "noopener", w.appendChild(v), a.appendChild(w);
  const C = document.createElement("div");
  C.className = "profile-details";
  const T = e.any(n, we("role"), null, null)?.value, B = e.any(n, we("organization-name"), null, null)?.value;
  T && B ? pn(C, "Role", `${T}, ${B}`) : (pn(C, "Role", T), pn(C, "Organization", B)), pn(C, "Birthday", e.any(n, we("bday"), null, null)?.value);
  const O = e.any(n, we("note"), null, null)?.value ?? e.any(n, be("bio"), null, null)?.value;
  pn(C, "About", O?.trim());
  const X = ig(n, e);
  for (const $ of X)
    pn(C, "Email", $, !0);
  const Y = ag(n, e);
  for (const $ of Y)
    pn(C, "Phone", $, !0);
  const A = e.any(n, be("homepage"), null, null)?.value;
  pn(C, "Homepage", A, !0);
  const K = e.any(n, dr("storage"), null, null)?.value;
  pn(C, "Pod", K, !0), a.appendChild(C);
  const { current: P, past: G } = sg(n, e);
  if (P.length > 0 || G.length > 0) {
    const $ = document.createElement("div");
    $.className = "profile-roles";
    const q = document.createElement("h3");
    if (q.textContent = "Experience", $.appendChild(q), P.length > 0) {
      const ee = document.createElement("h4");
      ee.className = "profile-roles-subheader", ee.textContent = "Current", $.appendChild(ee);
      for (const Q of P) {
        const _ = document.createElement("div");
        _.className = "profile-role-item";
        let V = `<strong class="profile-role-org">${Zn(Q.orgName)}</strong>`;
        Q.roleText && (V += ` <span class="profile-role-title">${Zn(Q.roleText)}</span>`), Q.dates && (V += ` <span class="profile-role-dates">${Zn(Q.dates)}</span>`), _.innerHTML = V, $.appendChild(_);
      }
    }
    if (G.length > 0) {
      const ee = document.createElement("h4");
      ee.className = "profile-roles-subheader", ee.textContent = "Past", $.appendChild(ee);
      for (const Q of G) {
        const _ = document.createElement("div");
        _.className = "profile-role-item";
        let V = `<strong class="profile-role-org">${Zn(Q.orgName)}</strong>`;
        Q.roleText && (V += ` <span class="profile-role-title">${Zn(Q.roleText)}</span>`), Q.dates && (V += ` <span class="profile-role-dates">${Zn(Q.dates)}</span>`), _.innerHTML = V, $.appendChild(_);
      }
    }
    a.appendChild($);
  }
  const R = rg(n, e);
  if (R.length > 0) {
    const $ = document.createElement("div");
    $.className = "profile-social";
    const q = document.createElement("h3");
    q.textContent = "Social Accounts", $.appendChild(q);
    const ee = document.createElement("ul");
    ee.className = "profile-social-list";
    for (const Q of R) {
      const _ = document.createElement("li"), V = document.createElement("a");
      V.href = Q.uri, V.textContent = Q.name, V.target = "_blank", V.rel = "noopener noreferrer", _.appendChild(V), ee.appendChild(_);
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
      const _ = document.createElement("li"), V = sn(Q.value, fe(Q.value));
      V.title = Q.value, _.appendChild(V), ee.appendChild(_);
    }
    $.appendChild(ee), a.appendChild($);
  }
  t.appendChild(a);
}
function lg(n, e, t, r) {
  t.innerHTML = "";
  const i = document.createElement("div");
  i.className = "profile-edit-form";
  const s = document.createElement("h2");
  s.textContent = "Edit Profile", i.appendChild(s);
  const a = /* @__PURE__ */ new Map();
  for (const p of _l) {
    const m = e.any(n, p.predicate, null, null)?.value ?? "", w = document.createElement("div");
    w.className = "profile-field-group";
    const v = document.createElement("label");
    v.textContent = p.label, w.appendChild(v);
    let C;
    p.label === "Bio" ? (C = document.createElement("textarea"), C.rows = 3) : (C = document.createElement("input"), C.type = p.inputType ?? "text"), C.className = "profile-field-input", C.value = m, w.appendChild(C), a.set(p, C), i.appendChild(w);
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
      const p = [], m = [], w = n.doc();
      for (const v of _l) {
        const T = a.get(v).value.trim(), B = e.any(n, v.predicate, null, null);
        if (B && T && B.value !== T) {
          const O = e.match(n, v.predicate, B, w);
          O.length > 0 && p.push(O[0]), m.push(new $t(n, v.predicate, rl(T), w));
        } else if (B && !T) {
          const O = e.match(n, v.predicate, B, w);
          O.length > 0 && p.push(O[0]);
        } else !B && T && m.push(new $t(n, v.predicate, rl(T), w));
      }
      if (p.length === 0 && m.length === 0) {
        Ea(n, e, t);
        return;
      }
      await new Promise((v, C) => {
        r.update(p, m, (T, B, O) => {
          B ? v() : C(new Error(O ?? "Update failed"));
        });
      }), h.textContent = "Saved!", h.className = "profile-edit-status profile-edit-status-ok", setTimeout(() => Ea(n, e, t), 800);
    } catch (p) {
      const m = p instanceof Error ? p.message : String(p);
      h.textContent = `Save failed: ${m}`, h.className = "profile-edit-status profile-edit-status-error", u.disabled = !1, c.disabled = !1;
    }
  });
}
function og(n, e) {
  const r = e.each(n, me("type"), null, null).map((i) => i.value);
  return !!(r.includes(be("Person").value) || r.includes(L("Person").value) || r.includes(we("Individual").value) || e.any(n, be("name"), null, null) || e.any(n, we("fn"), null, null));
}
const ug = {
  label: "Profile",
  icon: "👤",
  canHandle(n, e) {
    return og(n, e);
  },
  render(n, e, t) {
    Ea(n, e, t);
  }
};
Fe(ug);
const St = new ef();
let bn = uo();
function Wo() {
  const n = St.isActive ? St.authFetch.bind(St) : void 0;
  bn = uo(n ? { fetch: n } : void 0);
}
function Vo(n, e, t, r) {
  const { store: i } = bn;
  r.innerHTML = "", n.length <= 1 ? r.hidden = !0 : r.hidden = !1;
  for (let s = 0; s < n.length; s++) {
    const a = n[s], l = document.createElement("button");
    l.className = "pane-tab", l.role = "tab", l.textContent = `${a.icon} ${a.label}`, l.setAttribute("aria-selected", s === 0 ? "true" : "false"), l.addEventListener("click", () => {
      for (const u of r.children)
        u.setAttribute("aria-selected", "false");
      l.setAttribute("aria-selected", "true"), t.innerHTML = "", a.render(e, i, t);
    }), r.appendChild(l);
  }
  t.innerHTML = "", n[0].render(e, i, t);
}
let Ca = null, or = null, ba = null;
function Ko(n, e, t) {
  Go();
  let r;
  try {
    r = new URL(n).origin;
  } catch {
    return;
  }
  const i = r.replace(/^http/, "ws");
  or = n;
  try {
    const s = new WebSocket(i);
    Ca = s, s.addEventListener("open", () => {
      s.send(`sub ${n}`);
    }), s.addEventListener("message", (a) => {
      const l = String(a.data);
      l.startsWith("pub") && l.includes(n) && cg(n, e, t);
    }), s.addEventListener("close", () => {
      or === n && (ba = setTimeout(() => {
        or === n && Ko(n, e, t);
      }, 5e3));
    }), s.addEventListener("error", () => {
      s.close();
    });
  } catch {
  }
}
function Go() {
  ba && (clearTimeout(ba), ba = null), Ca && (or = null, Ca.close(), Ca = null);
}
async function cg(n, e, t) {
  const i = t.querySelector('.pane-tab[aria-selected="true"]')?.textContent ?? "";
  try {
    await bn.fetcher.load(Kn(n), { force: !0 });
    const s = Kn(or?.includes("#") ? or : n), a = Ri(s, bn.store);
    if (a.length === 0) return;
    const l = a.findIndex((c) => `${c.icon} ${c.label}` === i), u = l >= 0 ? a[l] : a[0];
    e.innerHTML = "", u.render(s, bn.store, e);
  } catch {
  }
}
function dg(n, e, t) {
  return new Promise((r) => {
    try {
      xa(n, e, t, "application/ld+json", () => r());
    } catch {
      r();
    }
  });
}
async function hg(n, e, t, r) {
  t.innerHTML = "", r.innerHTML = "", r.hidden = !0;
  const { store: i } = bn, s = n.replace(/#.*$/, "");
  await Promise.all(e.map((u) => dg(u, i, s)));
  const a = Kn(n), l = Ri(a, i);
  if (l.length === 0) {
    t.innerHTML = `
      <div class="error">
        <p><strong>No pane available</strong> for this resource.</p>
        <p>URI: <code>${Ti(n)}</code></p>
      </div>
    `;
    return;
  }
  Vo(l, a, t, r);
}
async function xi(n, e, t) {
  e.innerHTML = '<p class="loading">Loading...</p>', t.innerHTML = "", t.hidden = !0, Go();
  try {
    await bn.fetchDocument(n);
    const r = Kn(n), i = Ri(r, bn.store);
    if (i.length === 0) {
      e.innerHTML = `
        <div class="error">
          <p><strong>No pane available</strong> for this resource.</p>
          <p>URI: <code>${Ti(n)}</code></p>
          <p>The resource was fetched successfully, but no registered pane
          knows how to display it.</p>
        </div>
      `;
      return;
    }
    Vo(i, r, e, t);
    const s = n.replace(/#.*$/, "");
    Ko(s, e, t);
  } catch (r) {
    const i = r instanceof Error ? r.message : String(r);
    e.innerHTML = `
      <div class="error">
        <p><strong>Failed to load resource</strong></p>
        <p>${Ti(i)}</p>
      </div>
    `;
  }
}
async function fg() {
  try {
    await St.handleRedirectFromLogin();
  } catch {
  }
  try {
    await St.restore();
  } catch {
  }
  St.isActive && Wo();
}
function pg() {
  Wo();
}
function Ti(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Hi = document.getElementById("mashlib") || document.body, Ia = document.createElement("header");
Ia.id = "chrome";
const Fa = document.createElement("div");
Fa.id = "header-row";
const Xo = document.createElement("h1");
Xo.textContent = "mashlib-next";
Fa.appendChild(Xo);
const qr = document.createElement("div");
qr.id = "auth-controls";
const hr = document.createElement("button");
hr.id = "login-btn";
hr.textContent = "Login";
qr.appendChild(hr);
const Cn = document.createElement("span");
Cn.id = "user-info";
Cn.hidden = !0;
qr.appendChild(Cn);
const Gn = document.createElement("button");
Gn.id = "logout-btn";
Gn.hidden = !0;
Gn.textContent = "Logout";
qr.appendChild(Gn);
Fa.appendChild(qr);
Ia.appendChild(Fa);
const pr = document.createElement("form");
pr.id = "url-form";
const Wi = document.createElement("label");
Wi.htmlFor = "url-input";
Wi.textContent = "Resource URL:";
pr.appendChild(Wi);
const ln = document.createElement("input");
ln.id = "url-input";
ln.type = "url";
ln.placeholder = "https://example.org/resource";
ln.required = !0;
pr.appendChild(ln);
const Vi = document.createElement("button");
Vi.type = "submit";
Vi.textContent = "Go";
pr.appendChild(Vi);
Ia.appendChild(pr);
Hi.appendChild(Ia);
const mn = document.createElement("nav");
mn.id = "pane-tabs";
mn.setAttribute("role", "tablist");
mn.setAttribute("aria-label", "View selector");
mn.hidden = !0;
Hi.appendChild(mn);
const Hn = document.createElement("main");
Hn.id = "pane-container";
Hi.appendChild(Hn);
async function Ki(n, e) {
  if (ln.value = n, e) {
    const t = new URL(window.location.href);
    t.searchParams.set("uri", n), window.history.pushState({ uri: n }, "", t.toString());
  }
  await xi(n, Hn, mn);
}
function Sl() {
  St.isActive ? (hr.hidden = !0, Gn.hidden = !1, Cn.hidden = !1, Cn.textContent = St.webId ? fe(St.webId) : "Logged in", Cn.title = St.webId ?? "") : (hr.hidden = !1, Gn.hidden = !0, Cn.hidden = !0, Cn.textContent = "");
}
hr.addEventListener("click", () => {
  const n = prompt("Solid identity provider:", "https://solidcommunity.net");
  n && St.login(n, window.location.href);
});
Gn.addEventListener("click", () => {
  St.logout();
});
pr.addEventListener("submit", (n) => {
  n.preventDefault();
  const e = ln.value.trim();
  e && Ki(e, !0);
});
window.addEventListener(_o, ((n) => {
  const e = n.detail.uri;
  e && Ki(e, !0);
}));
window.addEventListener("popstate", () => {
  const e = new URLSearchParams(window.location.search).get("uri");
  e ? Ki(e, !1) : (ln.value = "", Hn.innerHTML = '<p class="placeholder">Enter a URL above to browse a Linked Data resource.</p>');
});
window.mashlib = { register: Fe };
async function mg() {
  const n = document.querySelectorAll("script[data-pane]"), e = Array.from(n).map(async (t) => {
    const r = t.src;
    if (r)
      try {
        const i = await import(
          /* @vite-ignore */
          r
        ), s = i.default || i.pane;
        s && typeof s.canHandle == "function" && Fe(s);
      } catch {
      }
  });
  await Promise.all(e);
}
async function gg() {
  const e = new URLSearchParams(window.location.search).get("uri") || window.location.href;
  ln.value = e, await mg(), await fg(), Sl(), St.addEventListener("sessionStateChange", () => {
    pg(), Sl();
    const r = ln.value.trim();
    r && xi(r, Hn, mn);
  });
  const t = document.querySelectorAll('script[type="application/ld+json"]');
  if (t.length > 0) {
    const r = Array.from(t).map((i) => i.textContent || "").filter(Boolean);
    await hg(e, r, Hn, mn);
  } else
    window.history.replaceState({ uri: e }, "", window.location.href), xi(e, Hn, mn);
}
gg();
export {
  aa as c,
  kl as g
};
