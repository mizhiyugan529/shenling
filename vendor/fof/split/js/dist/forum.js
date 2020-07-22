module.exports=function(t){var o={};function n(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=o,n.d=function(t,o,e){n.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,o){if(1&o&&(t=n(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var r in t)n.d(e,r,function(o){return t[o]}.bind(null,r));return e},n.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(o,"a",o),o},n.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},n.p="",n(n.s=9)}([function(t,o){t.exports=flarum.core.compat.extend},function(t,o){t.exports=flarum.core.compat.app},function(t,o){t.exports=flarum.core.compat["components/Button"]},function(t,o){t.exports=flarum.core.compat.Model},function(t,o){t.exports=flarum.core.compat["utils/PostControls"]},function(t,o){t.exports=flarum.core.compat["components/CommentPost"]},function(t,o){t.exports=flarum.core.compat["components/Modal"]},function(t,o){t.exports=flarum.core.compat["components/EventPost"]},,function(t,o,n){"use strict";n.r(o);var e=n(0),r=n(3),s=n.n(r),i=n(1),a=n.n(i),u=n(4),p=n.n(u),l=n(2),c=n.n(l),f=n(5),d=n.n(f);function h(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,t.__proto__=o}var b=n(6),y=function(t){function o(){return t.apply(this,arguments)||this}h(o,t);var n=o.prototype;return n.init=function(){t.prototype.init.call(this),this.newDiscussionTitle=m.prop("")},n.setController=function(t){this.split=t},n.className=function(){return"SplitPostModal Modal--small"},n.title=function(){return app.translator.trans("fof-split.forum.modal.title")},n.content=function(){return[m("div",{className:"Modal-body"},[m("div",{className:"Form Form--centered"},[m("div",{className:"Form-group"},[m("label",{},app.translator.trans("fof-split.forum.modal.new_discussion_label")),m("input",{className:"FormControl",name:"new_discussion_title",value:this.newDiscussionTitle(),oninput:m.withAttr("value",this.newDiscussionTitle)})]),m("div",{className:"Form-group"},[m(c.a,{className:"Button Button--primary Button--block",type:"submit",loading:this.loading,disabled:!this.newDiscussionTitle()},app.translator.trans("fof-split.forum.modal.submit_button"))])])])]},n.onsubmit=function(t){var o=this;t.preventDefault(),this.loading=!0;var n=new FormData;n.append("title",this.newDiscussionTitle()),n.append("start_post_id",this.split.startPostId),n.append("end_post_number",this.split.endPostNumber),app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/split",serialize:function(t){return t},data:n}).then((function(t){var n={};n.id=m.prop(t.data.id),n.slug=m.prop(t.data.attributes.slug),n.startUser=m.prop(t.data.attributes.startUser),n.isUnread=m.prop(t.data.attributes.isUnread),o.hide(),m.route(app.route.discussion(n))}),this.loaded.bind(this))},o}(n.n(b).a),v=function(){function t(){this.reset()}var o=t.prototype;return o.start=function(t,o){this.reset(),this.startPostId=t,$(".PostStream-item").each((function(){$(this).attr("data-number")>=o&&$(".flagrow-split-endSplitButton",$(this)).show()})),$(".flagrow-split-startSplitButton").hide()},o.end=function(t){this.endPostNumber=t},o.reset=function(){this.startPostId=null,this.endPostNumber=null},t}(),_=n(7),w=function(t){function o(){return t.apply(this,arguments)||this}h(o,t);var n=o.prototype;return n.icon=function(){return"fas fa-code-branch"},n.descriptionKey=function(){return this.props.post.content().toNew?"fof-split.forum.post.was_split_to":"fof-split.forum.post.was_split_from"},n.descriptionData=function(){return{count:this.props.post.content().count,target:m("a",{className:"EventPost-Split-target",href:this.props.post.content().url,config:m.route},this.props.post.content().title)}},o}(n.n(_).a);app.initializers.add("flagrow-split",(function(t){t.store.models.discussions.prototype.canSplit=s.a.attribute("canSplit"),t.postComponents.discussionSplit=w;var o,n=new v;o=n,Object(e.extend)(p.a,"moderationControls",(function(t,n){var e=n.discussion();"comment"===n.contentType()&&e.canSplit()&&1!=n.number()&&t.add("splitFrom",[m(c.a,{icon:"fas fa-code-branch",className:"flagrow-split-startSplitButton",onclick:function(){o.start(n.id(),n.number())}},a.a.translator.trans("fof-split.forum.split.from"))])})),Object(e.extend)(d.a.prototype,"footerItems",(function(t){var n=this.props.post,e=n.discussion();"comment"===n.contentType()&&e.canSplit()&&1!=n.number()&&t.add("splitTo",[m(c.a,{icon:"fas fa-code-branch",className:"flagrow-split-endSplitButton Button Button--link",onclick:function(){o.end(n.number());var t=new y;t.setController(o),a.a.modal.show(t)},style:{display:"none"}},a.a.translator.trans("fof-split.forum.split.to"))])}))}))}]);
//# sourceMappingURL=forum.js.map