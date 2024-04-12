// ==============================================================================
// ================================== on Load ===================================
// ==============================================================================

window.onload = onLoad;

function onLoad(){
  setLanguage('ja');
  console.log("onLoad");
}



var KEY = 'BlocklyStorage';

var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  trashcan: true
});

window.setTimeout(function () {
  console.log("setTimeout");
  if ('localStorage' in window && window.localStorage[KEY]) {
    restoreBlocks();
  } else {
    // Blockly.Xml.domToWorkspace(document.querySelector('#startBlocks'), workspace);
    var startBlocksText = document.getElementById('startBlocks').outerHTML;
    var xml = Blockly.Xml.textToDom(startBlocksText);
    Blockly.Xml.domToWorkspace(xml, workspace);
    myUpdateFunction();
  }
}, 0);


// ==============================================================================
// ====================== related to language settings ==========================
// ==============================================================================


function closePopup() {
  console.log('Closing popup');
  const body = document.querySelector('body');
  if (body) {
    body.classList.remove('open_popup');
  }
}





$(function(){
	// クッキーをセットする
	function setSiteviewCookie() {
		$('.l-lang a').bind('click', function() {	//言語切り替えボタンを押下したときに発火
			$.cookie('siteview', $(this).data('siteview'), { path: '/' }); //siteviewという名前でcookieに値をセット
		});
	}
	setSiteviewCookie();

	// 日本語 or 英語を選んだ場合の処理
	if($.cookie('siteview') == 'en') {
		//英語が選択されている場合(coockieの値にenが設定されている時)
		$('.en').css('display', 'block'); //英語を表示
		$('.jp').css('display', 'none');	//日本語を非表示
		$('.l-lang .l-lang__en').addClass('is-active');	//言語切り替えボタンにクラスを振る処理
		$('.l-lang .l-lang__jp').removeClass('is-active');
	} else {
		//日本語が選択されている場合
		$('.jp').css('display', 'block'); //日本語を表示
		$('.en').css('display', 'none');	//英語を非表示
		$('.l-lang .l-lang__jp').addClass('is-active');
		$('.l-lang .l-lang__en').removeClass('is-active');
	}
})



// ==============================================================================
// ======================== translate JS into PMusic ============================
// ==============================================================================


function myUpdateFunction(event) {
  Blockly.JavaScript.INDENT = `    `
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('code').innerHTML = '<pre class="prettyprint lang-js" style="margin: 0px"><span style="font-size:1.1em">' + code + '</span></pre>';
  backupBlocks();
}
workspace.addChangeListener(myUpdateFunction);


// ==============================================================================
// =========================== save & load blocks ===============================
// ==============================================================================


function backupBlocks() {
  if (!'localStorage' in window) return;
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var text = Blockly.Xml.domToText(xml);  // XMLドキュメントをテキストに変換
  window.localStorage.setItem(KEY, text);
}

function restoreBlocks() {
  var xml = Blockly.Xml.textToDom(window.localStorage[KEY]);
    Blockly.Xml.domToWorkspace(xml, workspace);
}

var myBlockXml
function saveBlocks(){
  var xml = Blockly.Xml.workspaceToDom(workspace);
  myBlockXml = Blockly.Xml.domToText(xml); 
}

function loadBlocks(){
    // ブロック再構築
    var xml = Blockly.Xml.textToDom(myBlockXml);
    workspace.clear();
    Blockly.Xml.domToWorkspace(xml, workspace);  
}


// ==============================================================================
// =========================== related to markdown ==============================
// ==============================================================================

// マークダウンの基本設定
const markdown_setting = window.markdownit({
  html: true, // htmlタグを有効にする
  breaks: true, // md内の改行を<br>に変換
});

const markdown_editer = $(".js-markdown-editer");

// マークダウンの設定をjs-markdown-editerにHTMLとして反映させる
const markdown_html = markdown_setting.render(getHtml(markdown_editer));
markdown_editer.html(markdown_html);
  
// 比較演算子（=，<>，<，<=，>，>=）をそのまま置換する
function getHtml(selector) {
  // $(selector)で取得した要素が存在しない場合、空の文字列を返す
  let markdown_text = $(selector).html() || '';
  // let markdown_text = document.querySelectorAll(selector)[1].innerHTML;
  markdown_text = markdown_text.replace(/&lt;/g, "<");
  markdown_text = markdown_text.replace(/&gt;/g, ">");
  markdown_text = markdown_text.replace(/&amp;/g, "&");

  return markdown_text;
}


// ==============================================================================
// ======================= adjust height of textarea ============================
// ==============================================================================


window.addEventListener("DOMContentLoaded", () => {
  // textareaタグを全て取得
  const textareaEls = document.querySelectorAll("textarea");

  textareaEls.forEach((textareaEl) => {
    // デフォルト値としてスタイル属性を付与
    textareaEl.setAttribute("style", `height: ${textareaEl.scrollHeight}px;`);
    // inputイベントが発生するたびに関数呼び出し
    textareaEl.addEventListener("input", setTextareaHeight);
  });

  // textareaの高さを計算して指定する関数
  function setTextareaHeight() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  }
});


