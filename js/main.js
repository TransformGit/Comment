function $(selector){
	var method = selector.substr(0,1) == '#' ? 'querySelector' : 
	'querySelectorAll';
	return document[method](selector);
}
window.onload = function(){
	var list = $('#list');
	var lis = list.children;
	function removeNode(node){
		node.parentNode.removeChild(node)
	}
	function praise(box, el){
		var praiseEle = box.getElementsByClassName('praises-total')[0];
		var total = praiseEle.getAttribute('total')*1;
		var txt = el.innerHTML;
		var newTotal;
		if(txt == '赞'){
			newTotal = total + 1;
			praiseEle.setAttribute('total',newTotal)
			el.innerHTML = '取消赞';
			praiseEle.innerHTML = (newTotal == 1) 
			? '我觉得很赞' : '我和' +total+ '个人觉得很赞';
		}else{
			newTotal = total - 1;
			praiseEle.setAttribute('total',newTotal)
			el.innerHTML = '赞';
			praiseEle.innerHTML = newTotal == 0 ? '' : 
			 +newTotal+ '个人觉得很赞';
		}
		praiseEle.style.display = (newTotal == 0) 
		? 'none' : 'block';
	}
	function getTime(){
		var date = new Date()
	}
	function release(box, el){
		var textarea = box.getElementsByTagName('textarea')[0];
		var contentList = box.getElementsByClassName('comment-list')[0];
		var contentBox = document.createElement('div');
		contentBox.className = 'comment-box clearfix';
		contentBox.setAttribute('user','self');
		var html = '<img class="myhead" src="images/my.jpg" alt="" />'+
	              '<div class="comment-content">'+
	                  '<p class="comment-text"><span class="user">我：</span>'+textarea.value+'</p>'+
	                  '<p class="comment-time">'+
	                      '2014-02-19 14:36'+
	                      '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>'+
	                      '<a href="javascript:;" class="comment-operate">删除</a>'+
	                  '</p>'+
	              '</div>' 
	   contentBox.innerHTML = html;
	   contentList.appendChild(contentBox); 
	   textarea.value = '';
	   textarea.onkeyup()
	   el.parentNode.className = 'text-box';          
	}
	for(var i = 0; i < lis.length;i++){
		lis[i].onclick = function(e){
			e = e || window.event;
			var el = e.srcElement;
			switch(el.className){
				case 'close':
					removeNode(el.parentNode)
					break;
				case 'praise':
					praise(el.parentNode.parentNode.parentNode, el)
					break;	
				case 'btn btn-on':
					release(el.parentNode.parentNode.parentNode, el);
					break;
			}
		}
		var textarea = lis[i].getElementsByTagName('textarea')[0];
				textarea.onfocus = function(){
					this.parentNode.className = 'text-box text-box-on';
				}
				textarea.onblur = function(){
					if(this.value == ''){
						this.parentNode.className = 'text-box';
					}
				}
				textarea.onkeyup = function(){
					var len = this.value.length;
					var textbox = this.parentNode;
					var btn = textbox.children[1];
					var word = textbox.children[2];
					if(len == 0 || len > 140){
						btn.className = 'btn';
						btn.setAttribute('disabled',true)
					}else{
						btn.className = 'btn btn-on'
						btn.removeAttribute('disabled')
					}
					word.innerHTML = len +'/140'
				}
	}
}