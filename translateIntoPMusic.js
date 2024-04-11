// function translateLet(code){
//   var DefLetRegex = /([A-Za-z]\w*) = (\d+)/g;
//   var DefleteDeclaration = /var .+;\n+/g;
//   var DefChange = /([A-Za-z]\w*) = \(typeof .+ : \d+\) \+ (\d+);/g
//   code = code.replace(DefLetRegex, 'let $1 = $2');
//   code = code.replace(DefleteDeclaration, '');
//   code = code.replace(DefChange, 'let $1 = $1 + $2;')
//   return code;
// }

function translateVar(code){
    var DefVarRegex = /([A-Za-z]\w*) = (\d+)/g;
    var DefVareDeclaration = /var [a-zA-Z]\w* *;\n+/g;
    var DefChange = /([A-Za-z]\w*) = \(typeof .+ : \d+\) \+ (\d+);/g
    code = code.replace(DefVarRegex, 'var $1 = $2');
    code = code.replace(DefVareDeclaration, '');
    code = code.replace(DefChange, 'var $1 = $1 + $2;')
    return code;
  }
  
  function translateLoop(code){
    var forLoopRegex = /for\s*\(\s*var\s+\w+\s*=\s*\d+\s*;\s*\w+\s*<\s*(\d+)\s*;\s*\w+\s*\+\+\s*\)\s*{/g;
    // マッチするすべてのforループを置換
    code = code.replace(forLoopRegex, 'loop($1){');
    return code;
  }
  
  function translatePlay(code){
    var playRegex = /play\((\d+)\.*(\d*), (\d+)\)/g;
    code = code.replace(playRegex, 'play($1, $3.0)');
    return code;
  }
  
  function translateGauss(code){
    var gaussRegex = /gauss\((\d+)\.*(\d*), (\d+)\.*(\d*), (.*)\)/g;
    var varRegex = /gauss\((.*), (.*), (\d+)\)/g;
    code = code.replace(gaussRegex, 'gauss($1, $3, $5)');
    code = code.replace(varRegex, 'gauss($1, $2, $3.0)');
    return code;
  }
  
  function translateWeibul(code){
    var shapeRegex = /weibul\((\d+), (.*)\)/g;
    var scaleRegex = /weibul\((.*), (\d+)\.(\d*)\)/g;
    code = code.replace(shapeRegex, 'weibul($1.0, $2)');
    code = code.replace(scaleRegex, 'weibul($1, $2)');
    return code;
  }
  
  function translateRandwalk(code){
    var randwalkRegex = /randwalk\((\d*)(\.*\d*), (\d*)(\.*\d*)\)/g;
    code = code.replace(randwalkRegex, 'randwalk($1, $3)');
    return code;
  }
  
  function translateWhileNewline(code) {
    var whileRegex = /\bwhile\s*\((.*?)\)\s*{\s([\s\S]*)\s}\s*/g;
    code = code.replace(whileRegex, function (match, condition, body) {
      console.log(body);
      // body = body.replace(/\n/g, ' ');
      body = body.replace(/\n/g, '\\\n');
      // return 'while(' + condition + '){ ' + body + ' }';
      return 'while(' + condition + '){\\\n' + body + '\\\n}\n';
    });
    return code;
  }
  
  function translateIfNewline(code) {
    var ifRegex = /\bif\s*\((.*?)\)\s*{\s([\s\S]*)\s}\s*/g;
    code = code.replace(ifRegex, function (match, condition, body) {
      // body = body.replace(/\n/g, ' ');
      body = body.replace(/\n/g, '\\\n');
      // return 'if(' + condition + '){ ' + body + ' }';
      return 'if(' + condition + '){\\\n' + body + '\\\n}\n';
    });
    return code;
  }
  
  function translateLoopNewline(code) {
    var loopRegex = /\bloop\s*\((.*?)\)\s*{\s([\s\S]*)\s}\s*/g;
    code = code.replace(loopRegex, function (match, condition, body) {
      // body = body.replace(/\n/g, ' ');  // Loopの中の改行をスペースに
      body = body.replace(/\n/g, '\\\n'); // Loopの中の改行で改行文字を挿入
      // return 'loop(' + condition + '){ ' + body + ' }';
      return 'loop(' + condition + '){\\\n' + body + '\\\n}\n';
    });
    return code;
  }
  
  function translateMathPow(code){
    var PowRegex = /\bMath.pow\((.+), (.+)\);/g;
    code = code.replace(PowRegex, '$1 ^ $2;');
    return code;
  }
  
  function translateBackslash(code){
    var backslashRegex = /\\+/g;
    code = code.replace(backslashRegex, '\\');
    return code;
  }

//   module.exports = {
//     translateVar,
//     translateLoop,
//     translatePlay,
//     translateGauss,
//     translateWeibul,
//     translateRandwalk,
//     translateWhileNewline,
//     translateIfNewline,
//     translateLoopNewline,
//     translateMathPow,
//     translateBackslash,
//   };