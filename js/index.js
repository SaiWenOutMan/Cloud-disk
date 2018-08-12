var data = [
   {
    title: '微云',
    id:1,
    pid:-1,
   },
   {
    title: 'js课程',
    id:11,
    pid:1,
    },
    {
    title:'我的音乐',
    id:12,
    pid:1,
    },
    {
    title:'我的电影',
    id:13,
    pid :1,
    },
    {
    title:'千万不要看',
    id:111,
    pid:11,
    },
    {
    title:'往后余生',
    id:121,
    pid:12,
    },
    {
    title:'巴拉巴拉',
    id:125,
    pid:13,
    },
    {
    title:'123',
    id:132,
    pid:13,
    },
    {
    title:'biliblii',
    id:151,
    pid:125,   
    },
    {
    title:'bunananana',
    id:152,
    pid:151        
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
]
    function getItemById(id){
        for(var i = 0; i<data.length;i++){
            if(data[i].id == id){
                return data[i]
            }
        }
        return null;
    }
    
    function getChildsById(id){
        var arr = [];
        for(var i = 0; i<data.length; i++){
            if(data[i].pid == id){
                arr.push(data[i]);
            }
        }
        return arr
    }
    var linId = -1;
    function getParentAllById(id){
        var arr = [];
        var item = getItemById(id);
        if(item){
            arr.push(item);
            arr = arr.concat(getParentAllById(item.pid))
        }
        return arr
    }
    //找到所有子孙节点
    function  getChildsAllById(id){
        arr = [];
        for(var i= 0; i<data.length; i++){
            if(data[i].pid == id){
                arr.push(data[i])
                arr = arr.concat(getChildsAllById(data[i].id))
            }
        }
        return arr
    }

    //左侧树形菜单区域
    // function treeHtml(id){
    //     var childs = getChildsById(id);
    //     var html = '';
    //     if(childs.length){
    //         html+='<ul>';
    //         for(var i= 0; i<childs.length; i++){
    //             html += '<li  class="weiyun" custome-id="'+childs[i].id+'" ><span custome-id="'+childs[i].id+'">'+childs[i].title+'</span>';
    //             html += treeHtml(childs[i].id)
    //             html += '</li>'
    //         }
    //         html+='</ul>'
    //     }
    //     return html
    // }

    // 错了 从写一遍- -

    function treeHtml(id,n){
		var childs = getChildsById(id);	
		var html = '';
		n++;
		// 有数据才生成ul结构
		if(childs.length){
			html = '<ul>';

			for( var i = 0; i < childs.length; i++ ){
				/*var c = getChildsById(childs[i].id);
				var cls = c.length ? 'tree-ico' : '';*/
				var htmlss = treeHtml(childs[i].id,n); // 下一级返回的结构
				var cls = htmlss !== '' ? 'tree-ico' : '';
				html  += '<li>\
						<div custom-id="'+childs[i].id+'" class="tree-title '+cls+'">\
							<span><i></i>'+childs[i].title+'</span>\
						</div>'

                        html += htmlss

                        html  += '</li>';
			}	

			html  += '</ul>'
		}

		return html ;
	}


    var contentLeft  = document.querySelector('.content-left')
    contentLeft.innerHTML = treeHtml(-1,-1);

    


    // 导航区域
    function createPathHtml(id){
         var childs = getChildsById(id);
         var parents = getParentAllById(id).reverse();
         var spans = ''
         for(var i = 0; i<parents.length; i++){
             spans += '<div class="content-top-div"  custome-id="'+parents[i].id+'">'+parents[i].title+'</div>'
         }
         return spans
    }
    var contentTopDivs = document.querySelector('.content-top-ul')
    contentTopDivs.innerHTML = '路径 :' + createPathHtml(1)
    //文件夹区域
    function createSingHtml(obj){
        return  '<div childs-id="'+ obj.id+'" class="wenjian" >\
                <span class="wenjian-span">'+ obj.title+'</span>\
                <input type="text" class="editor"/>\
                <i></i>\
            </div>'
    }
    function createFileHtml(id){
        var childs = getChildsById(id);
        var filesHtml = '';
        if(childs.length){
            for(var i = 0; i< childs.length; i++){
                filesHtml += createSingHtml(childs[i])
            }
        }
        return filesHtml;
    }
    var content = document.querySelector('.content');
    content.innerHTML = createFileHtml(1);
    
    

    $('.content-left').html(treeHtml(-1,-1))

    function addStyleBgById(id){
        $('.content-left').find('div').css('background','')
		$('.content-left').find('div[custom-id="'+id+'"]').css('background','slateblue')
    }

    addStyleBgById(1)

    //交互
    $('.content-left').on('click','li',function(e){
        var id = $(this).find('div').attr('custom-id');
        contentTopDivs.innerHTML = '路径 :'+createPathHtml(id);
        content.innerHTML = createFileHtml(id);
        addStyleBgById(id)
       
        e.stopPropagation();
        $('.input').removeClass('active');  
    })
    $('.content-top-ul').on('click','div',function(){
        var id = $(this).attr('custome-id');
        contentTopDivs.innerHTML = '路径 :'+createPathHtml(id);
        content.innerHTML = createFileHtml(id);
        contentLeft.innerHTML = treeHtml(-1);
        addStyleBgById(id)
    })
    $('.content').on('click','div',function(e){
        var id = $(this).attr('childs-id');
        addStyleBgById(id)

        if(e.target.nodeName === 'I'){
            $(e.target).toggleClass('checked');
            if(e.target.className == 'checked'){
                $(this).css('border','1px solid blue')
            
            }else{
                $(this).css('border','1px solid #f6f7fb');
            }

           if($('.wenjian > .checked').length == $('.wenjian').length ){
                $('.input').addClass('active');
                
           }else{
            $('.input').removeClass('active');
           }

            return
        }
        if(e.target.nodeName === 'SPAN'){
            return
        }
        if(e.target.nodeName === 'INPUT'){
            return
        }
        contentTopDivs.innerHTML = '路径 :'+createPathHtml(id);
        content.innerHTML = createFileHtml(id);
        contentLeft.innerHTML = treeHtml(-1);

    })


    //全选
    $('.content-top').on('click','.input',function(e){
        $(this).toggleClass('active');
        var a = $(this).is('.active');
        if(a){
           $('.content').find(".wenjian i").addClass('checked')
        }else{
            $('.content').find(".wenjian i").removeClass('checked')                                                                
        }

    })

   
    //碰撞检测
    function getRect(el){
        return el.getBoundingClientRect();
    }
    function collision(dragEl,hitedEl){
        var dragRect = getRect(dragEl);
        var hitedRect = getRect(hitedEl); 

        if(
            dragRect.right < hitedRect.left || 
            dragRect.bottom < hitedRect.top ||
            dragRect.left > hitedRect.right ||
            dragRect.top > hitedRect.bottom
        ){
            return false
        }

        return true
    }
//框选
    var contents = $('.content');
    var wenjian =  contents[0].getElementsByClassName('wenjian');
    
    contents.on('mousedown',function(e){

        if(!$(e.target).is('.content')){
            return
        }
        var newDiv = $('<div class="miaov"></div>');
        var downX = e.clientX,downY = e.clientY;
        newDiv.css({
            width :10,
            height:10,
            left:downX,
            top:downY
        })
        newDiv.data('isAppend',false);

        var moveX,moveY,left,
            top,
            width,
            height,
            t,l
        //限制在10px范围
        $(document).mousemove(function(e){

            if(Math.abs(e.clientX - downX) > 10 || Math.abs(e.clientY -downY)>10){
                if(!newDiv.data('isAppend')){
                    $(document.body).append(newDiv);
					newDiv.data('isAppend',true)
                }
            }else{
                return
            }
            moveX = e.clientX,moveY = e.clientY,
            width = Math.abs(moveX - downX),
            height = Math.abs(moveY - downY);
            left = Math.min(moveX,downX),
            top = Math.min(moveY,downY),


            l =  contents.offset().left
            t =  contents.offset().top

            if(left < l){
                left = l;
                width = width - (l - moveX);
            }
            if(top < t){
				top = t;
				height = height - (t - moveY);
			}
            newDiv.css({
                width: width,
                height : height,
                left :left,
                top: top
            })

        //碰撞检测
        
            $(wenjian).each(function(index,item){
                if(collision(newDiv[0],item)){
                    $(item).addClass('active').find('i').addClass('checked');
                }else{
                    $(item).removeClass('active').find('i').removeClass('checked');
                }
            })
            var checkedI =  contents.find('i,checked')
            if(checkedI.length ===  $('.checked').length){
                $('.input').addClass('active');
            }else{
                $('.input').removeClass('active');
            }
        })

        $(document).mouseup(function(){
           
            newDiv.remove();
            $(document).off('mousemove mouseup')
        })
        e.preventDefault() 
    })
    //删除所选的每一项
    
   function getChildsAllById(id){
        var self = getItemById(id);
        var arr = [];
        arr.push(self);

        var childs = getChildsById(id);

        if(childs.length){
            for( var i = 0; i < childs.length; i++ ){
                arr = arr.concat(getChildsAllById(childs[i].id))
            }
        }

    return arr;
}
//接受一个数组 找到数组id的每个子孙
function getChildsAllByIds(idsArr){
    var arr = [];
    for( var i = 0; i < idsArr.length; i++ ){
        arr = arr.concat(getChildsAllById(idsArr[i]))
    }
    return arr;	
}

//根据id 删除数据
function delectItemById(id){
    for( var i = 0; i < data.length; i++ ){
        if(data[i].id == id){
            data.splice(i,1);
            break;
        }		
    }	
}
 //删除 传入一个数组
 function delectItemByIds(delectIds){
    for( var i = 0; i < delectIds.length; i++ ){
        delectItemById(delectIds[i])	
    }	
}

 $('.nav-5').click(function(){
     var shanChuI = contents.find('.checked');

     if(shanChuI.length > 0){
        var trr = [];
        shanChuI.each(function(index,item){
           trr.push($(item).parent().attr('childs-id'))
        })
        //拿到要删除的id
        var trr = getChildsAllByIds(trr).map(function(item){
            return item.id
        })

        //批量删除数据
        delectItemByIds(trr);

        var currentId = $('.content-top-div').attr('custome-id')
        //渲染结构

        contentLeft.innerHTML = treeHtml(-1,-1);
        $('.content').html(createFileHtml(currentId))
        $('.input').removeClass('active');
        
     }else{
         //$('.tan').css('display','block')
         setTimeout(function(){
           var tan = document.querySelector('.tan')
           tan.style.display = 'block'
         },100)
         setTimeout(function(){
            var tan = document.querySelector('.tan')
            tan.style.display = 'none'
          },1000)
     }
 })
 //重命名------------------
$('.nav-4').click(function(){
    var selectedI = contents.find('i.checked')
    if(selectedI.length === 1){
        var spanAll = selectedI.siblings('span');
        var inputAll = selectedI.siblings('input');
        spanAll.hide();
        inputAll.css({display:'block'}).focus().val(spanAll.text().trim()).select()

        $('.nav-4').data('isRename',true)

    }else if(selectedI.length > 1){
        setTimeout(function(){
            var tan = document.querySelector('.tan')
            tan.innerHTML = '提醒：你不能重命名多个'
            tan.style.display = 'block'
          },100)
          setTimeout(function(){
             var tan = document.querySelector('.tan')
             tan.style.display = 'none'
           },1000)
    }else if(selectedI.length < 1){
        setTimeout(function(){
            var tan = document.querySelector('.tan')
            tan.innerHTML = ' 选中要重名的文件啊'
            tan.style.display = 'block'
          },100)
          setTimeout(function(){
             var tan = document.querySelector('.tan')
             tan.style.display = 'none'
           },4000)
    }
})

//找到所有的兄弟
    function getBrothersById(id){
        var self = getItemById;
        var arr = [];
        for(var i = 0; i < data.length; i++){
            if(data[i].pid == self.pid){
                arr.push(data[i])
            }
        }
        return arr 
    }
    //对比这个id所有的兄弟 是否存在某个名字
    function  isBrothersById(id,title){
        var brothers = getBrothersById(id).filter(function(item){
            return item.id != id;
        })
        
        for(var i = 0; i<brothers.length; i++){
            if(brothers[i].title == title){
                return true
            }
        }
        return  false
    }

    //处理重名的
    $(document).mousedown(function(){
        if(!$('.nav-4').data('isRename')){
            return
        }
        var selectedI = contents.find('i.checked');
        var spanAll = selectedI.siblings('span');
        var inputAll = selectedI.siblings('input');
        var value = inputAll.val();
        var id = selectedI.parent().attr('childs-id');
        
        if(value === ''){
            setTimeout(function(){ 
                var tan = document.querySelector('.tan')
                tan.innerHTML = '  名字不能为空'
                tan.style.display = 'block'
                },100)
                setTimeout(function(){
                    var tan = document.querySelector('.tan')
                    tan.style.display = 'none'
                },1000)
            inputAll.hide();
            spanAll.show();
        }else if(isBrothersById(id,value)){
            setTimeout(function(){
                var tan = document.querySelector('.tan')
                tan.innerHTML = '  有重名'
                tan.style.display = 'block'
                },100)
                setTimeout(function(){
                    var tan = document.querySelector('.tan')
                    tan.style.display = 'none'
                },1000)
            inputAll.hide();
            spanAll.show();
        }else{
            inputAll.hide();
            spanAll.show().text(value);

            var self = getItemById(id);

            self.title = value;

            contentLeft.innerHTML = treeHtml(-1,-1);
            $('.content').html(createFileHtml(currentId))
            $('.input').removeClass('active');
        }
        $('.nav-4').data('isRename',false)
    })    
    // 新建文件夹-------------------------
    $('.nav-6').click(function(){
        var html = $( createSingHtml({id:'',title:''}));
        contents.prepend(html)
        var spanAll = html.find('span')
        var inputAll = html.find('input')
        spanAll.hide();
        inputAll.css('display','block').focus();
        $('.nav-6').data('isCreate',true)
    })

    //指定一个id 找到这个id中所有的子集中是否包含传入的东西

    function isExistChildsById(id,value){
        var childs = getChildsById(id);
        for( var i =0 ; i<childs.length; i++){
            if(childs[i].title === value){
                return true
            }
        }
        return false
    }

    //document点击
    $(document).mousedown(function(){
        if($('.nav-6').data('isCreate')){
            var first = contents.find('.wenjian:first');
            var spanAll = first.find('span');
            var inputAll = first.find('input');
            var value = inputAll.val().trim();

            
            //三种状态

            var pid = $('.content-top-ul').find('div').attr('custome-id')
                console.log(pid)
            if(value === ''){
                setTimeout(function(){
                    var tan = document.querySelector('.tan')
                    tan.innerHTML = '  文件名不能为空'
                    tan.style.display = 'block'
                    },100)
                    setTimeout(function(){
                        var tan = document.querySelector('.tan')
                        tan.style.display = 'none'
                    },1000)
                first.remove();
            }else if(isExistChildsById(pid,value)){
                setTimeout(function(){
                    var tan = document.querySelector('.tan')
                    tan.innerHTML = '  文件名不能重复'
                    tan.style.display = 'block'
                    },100)
                    setTimeout(function(){
                        var tan = document.querySelector('.tan')
                        tan.style.display = 'none'
                    },1000)
                first.remove();   
            }else{
                var o ={
                    id: Date .now(),
                    title: value,
                    pid: +pid
                }
                data.unshift(o)
                first.attr('childs-id',o.id)
                
                inputAll.hide();
                spanAll.show().text(value)

                setTimeout(function(){
                    var tan = document.querySelector('.tan')
                    tan.innerHTML = '  文件创建成功  '
                    tan.style.display = 'block'
                    },100)
                    setTimeout(function(){
                        var tan = document.querySelector('.tan')
                        tan.style.display = 'none'
                    },1000)

            }
            $('.nav-6').data('isCreate',false);
            contentLeft.innerHTML = treeHtml(-1,-1);
            addStyleBgById(pid);
            $('.input').removeClass('active');
        }
    })


    function addModaBgById(id){
        $('.tanbox .tandiv').find('div').css('background','');
        $('.tanbox .tandiv').find('div[custom-id="'+id+'"]').css('background','slateblue')
    }

    //移动到----------------------------
    //目标的父级 id
    var moveTargetId = 1;  

    $('.nav-3').click(function(){
        var selectedI = contents.find('.checked')
        if(selectedI.length > 0){
            $('.tanbox').css('display','block');
            $('#mask').css('display','block');
            $('.tanbox .tandiv').html(treeHtml(-1,-1))
            addModaBgById(1)

            if($('.content-top-ul').find('span').attr('custome-id')===moveTargetId){
                $('.tanbox .tip').data('isMove',false)
            }else{
                $('.tanbox .tip').data('isMove',true)
            }
        }else{
            setTimeout(function(){
                var tan = document.querySelector('.tan')
                tan.innerHTML = ' 选中要移动的文件'
                tan.style.display = 'block'
                },100)
                setTimeout(function(){
                    var tan = document.querySelector('.tan')
                    tan.style.display = 'none'
                },1000)   
        }
    })

    //找到指定id父级
    function getParentByIds(id){
        var self = getItemById(id);

		for( var i = 0; i < data.length; i++ ){
			if(data[i].id == self.pid){
                return data[i]
			}
		}
		return null;
    }
    
    $('.tanbox .tandiv').on('click','div',function(){
        var id = $(this).attr('custom-id');
        addModaBgById(id);
        var select = contents.find('.checked');

        var ids = [];
		select .each(function (index,item){
            ids.push($(item).parent().attr('childs-id'))	
            console.log($(item).parent())
        })
        var allData = getChildsAllByIds(ids).concat(getParentByIds(ids[0]))
        var zai = false;  

		for( var i = 0; i < allData.length; i++ ){
			if(allData[i].id == id){
				console.log('在');
				zai = true;
				break;
			}
        }
        
        if(zai){
			console.log('在。不能移动');
			// 记录不能移动
			$('.tanbox .tip').data('isMove',false)
			$('.tanbox .tip').text(' 不能移动')
		}else{
			console.log('不在。能移动');
			$('.tanbox .tip').text(' 能移动')
			// 记录能移动
			$('.tanbox .tip').data('isMove',true)
		}
        moveTargetId = id;
    })
    


	$('.tanbox .tanbtn1').click(function (){

		if(!$('.tanbox  .tip').data('isMove')){
			return;
		}
	
		//移动的文件 和 目标父级中的文件有重名，不能移动重名的

		var selectedI = contents.find('.checked');  	

		var chong = false;

		selectedI.each(function (index,item){
			var id = $(item).parent().attr('childs-id');
			var self = getItemById(id);  // 要移动文件的数据


			// 移动的数据的title，在不在目标父级所有子级中
			if(!isExistChildsById(moveTargetId,self.title)){
				self.pid = +moveTargetId;
			}else{
				chong = true;
				self.title = self.title+'('+Date.now()+')'
				self.pid = +moveTargetId;
				//
			}
		})


		console.log(data);

		// 移动后重新渲染
		contentLeft.innerHTML = treeHtml(-1,-1);
		contents.html(createFileHtml($('.content-top-ul').find('div').attr('custome-id')))
		addStyleBgById($('.content-top-ul').find('div').attr('custome-id'))
        $('.tanbox').css('display','none');
        $('#mask').css('display','none');
	})

	$('.tanbox .tanbtn2').click(function (){
        $('.tanbox').css('display','none');
        $('#mask').css('display','none');
	})
