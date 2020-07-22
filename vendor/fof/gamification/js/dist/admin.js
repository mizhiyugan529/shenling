module.exports=function(a){var t={};function n(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return a[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=a,n.c=t,n.d=function(a,t,e){n.o(a,t)||Object.defineProperty(a,t,{enumerable:!0,get:e})},n.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},n.t=function(a,t){if(1&t&&(a=n(a)),8&t)return a;if(4&t&&"object"==typeof a&&a&&a.__esModule)return a;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:a}),2&t&&"string"!=typeof a)for(var o in a)n.d(e,o,function(t){return a[t]}.bind(null,o));return e},n.n=function(a){var t=a&&a.__esModule?function(){return a.default}:function(){return a};return n.d(t,"a",t),t},n.o=function(a,t){return Object.prototype.hasOwnProperty.call(a,t)},n.p="",n(n.s=41)}([function(a,t){a.exports=flarum.core.compat.app},function(a,t){a.exports=flarum.core.compat.extend},function(a,t){a.exports=flarum.core.compat.Model},function(a,t){a.exports=flarum.core.compat["components/Button"]},function(a,t,n){"use strict";function e(a,t){a.prototype=Object.create(t.prototype),a.prototype.constructor=a,a.__proto__=t}n.d(t,"a",(function(){return e}))},,function(a,t){},function(a,t,n){"use strict";n.d(t,"a",(function(){return r}));var e=n(4),o=n(2),i=n.n(o),s=n(8),r=function(a){function t(){return a.apply(this,arguments)||this}return Object(e.a)(t,a),t}(n.n(s)()(i.a,{points:i.a.attribute("points"),name:i.a.attribute("name"),color:i.a.attribute("color")}))},function(a,t){a.exports=flarum.core.compat["utils/mixin"]},function(a,t){a.exports=flarum.core.compat["components/Page"]},,,,function(a,t){a.exports=flarum.core.compat["components/Switch"]},,,function(a,t){a.exports=flarum.core.compat["components/UploadImageButton"]},,,,,,function(a,t){a.exports=flarum.core.compat["components/PermissionGrid"]},,function(a,t,n){"use strict";var e=n(0),o=n.n(e),i=n(1),s=n(22),r=n.n(s),l=n(36),c=n.n(l),p=n(37),u=n.n(p),f=n(4),d=n(38),g=n.n(d),h=n(9),v=n.n(h),k=n(3),b=n.n(k),w=n(16),x=n.n(w),N=n(39),R=n.n(N),P=n(13),y=n.n(P),_=function(a){function t(){return a.apply(this,arguments)||this}Object(f.a)(t,a);var n=t.prototype;return n.init=function(){var a=this;this.fields=["convertedLikes","amountPerPost","amountPerDiscussion","postStartAmount","rankAmt","iconName","blockedUsers","pointsPlaceholder"],this.switches=["autoUpvotePosts","customRankingImages","rateLimit","showVotesOnDiscussionPage"],this.ranks=app.store.all("ranks"),this.values={},this.settingsPrefix="fof-gamification";var t=app.data.settings;this.fields.forEach((function(n){return a.values[n]=m.prop(t[a.addPrefix(n)])})),this.switches.forEach((function(n){return a.values[n]=m.prop("1"===t[a.addPrefix(n)])})),this.newRank={points:m.prop(""),name:m.prop(""),color:m.prop("")}},n.view=function(){var a=this;return[m("div",{className:"SettingsPage"},[m("div",{className:"container"},[m("form",{onsubmit:this.onsubmit.bind(this)},[m("div",{className:"helpText"},app.translator.trans("fof-gamification.admin.page.convert.help")),void 0===this.values.convertedLikes()?b.a.component({type:"button",className:"Button Button--warning Ranks-button",children:app.translator.trans("fof-gamification.admin.page.convert.button"),onclick:function(){app.request({url:app.forum.attribute("apiUrl")+"/fof/gamification/convert",method:"POST"}).then(a.values.convertedLikes("converting"))}}):"converting"===this.values.convertedLikes()?m("label",{},app.translator.trans("fof-gamification.admin.page.convert.converting")):m("label",{},app.translator.trans("fof-gamification.admin.page.convert.converted",{number:this.values.convertedLikes()})),m("fieldset",{className:"SettingsPage-ranks"},[m("legend",{},app.translator.trans("fof-gamification.admin.page.ranks.title")),m("label",{},app.translator.trans("fof-gamification.admin.page.ranks.ranks")),m("div",{className:"helpText"},app.translator.trans("fof-gamification.admin.page.ranks.help.help")),m("div",{className:"Ranks--Container"},this.ranks.map((function(t){return m("div",{style:"float: left;"},[m("input",{className:"FormControl Ranks-number",type:"number",value:t.points(),placeholder:app.translator.trans("fof-gamification.admin.page.ranks.help.points"),oninput:m.withAttr("value",a.updatePoints.bind(a,t))}),m("input",{className:"FormControl Ranks-name",value:t.name(),placeholder:app.translator.trans("fof-gamification.admin.page.ranks.help.name"),oninput:m.withAttr("value",a.updateName.bind(a,t))}),m("input",{className:"FormControl Ranks-color",value:t.color(),placeholder:app.translator.trans("fof-gamification.admin.page.ranks.help.color"),oninput:m.withAttr("value",a.updateColor.bind(a,t))}),b.a.component({type:"button",className:"Button Button--warning Ranks-button",icon:"fa fa-times",onclick:a.deleteRank.bind(a,t)})])})),m("div",{style:"float: left; margin-bottom: 15px"},[m("input",{className:"FormControl Ranks-number",value:this.newRank.points(),placeholder:app.translator.trans("fof-gamification.admin.page.ranks.help.points"),type:"number",oninput:m.withAttr("value",this.newRank.points)}),m("input",{className:"FormControl Ranks-name",value:this.newRank.name(),placeholder:app.translator.trans("fof-gamification.admin.page.ranks.help.name"),oninput:m.withAttr("value",this.newRank.name)}),m("input",{className:"FormControl Ranks-color",value:this.newRank.color(),placeholder:app.translator.trans("fof-gamification.admin.page.ranks.help.color"),oninput:m.withAttr("value",this.newRank.color)}),b.a.component({type:"button",className:"Button Button--warning Ranks-button",icon:"fa fa-plus",onclick:this.addRank.bind(this)})])),m("label",{},app.translator.trans("fof-gamification.admin.page.ranks.number_title")),m("input",{className:"FormControl Ranks-default",value:this.values.rankAmt()||"",placeholder:2,oninput:m.withAttr("value",this.values.rankAmt)}),m("legend",{},app.translator.trans("fof-gamification.admin.page.votes.title")),m("label",{},app.translator.trans("fof-gamification.admin.page.votes.icon_name")),m("div",{className:"helpText"},app.translator.trans("fof-gamification.admin.page.votes.icon_help")),m("input",{className:"FormControl Ranks-default",value:this.values.iconName()||"",placeholder:"thumbs",oninput:m.withAttr("value",this.values.iconName)}),y.a.component({state:this.values.autoUpvotePosts()||!1,children:app.translator.trans("fof-gamification.admin.page.votes.auto_upvote"),onchange:this.values.autoUpvotePosts,className:"votes-switch"}),y.a.component({state:this.values.rateLimit()||!1,children:app.translator.trans("fof-gamification.admin.page.votes.rate_limit"),onchange:this.values.rateLimit,className:"votes-switch"}),y.a.component({state:this.values.showVotesOnDiscussionPage()||!1,children:app.translator.trans("fof-gamification.admin.page.votes.discussion_page"),onchange:this.values.showVotesOnDiscussionPage,className:"votes-switch"}),m("label",{},app.translator.trans("fof-gamification.admin.page.votes.points_title")),m("input",{className:"FormControl Ranks-default",value:this.values.pointsPlaceholder()||"",placeholder:app.translator.trans("fof-gamification.admin.page.votes.points_placeholder")+"{points}",oninput:m.withAttr("value",this.values.pointsPlaceholder)}),m("legend",{},app.translator.trans("fof-gamification.admin.page.rankings.title")),y.a.component({state:this.values.customRankingImages()||!1,children:app.translator.trans("fof-gamification.admin.page.rankings.enable"),onchange:this.values.customRankingImages,className:"votes-switch"}),m("label",{},app.translator.trans("fof-gamification.admin.page.rankings.blocked.title")),m("input",{className:"FormControl Ranks-blocked",placeholder:app.translator.trans("fof-gamification.admin.page.rankings.blocked.placeholder"),value:this.values.blockedUsers()||"",oninput:m.withAttr("value",this.values.blockedUsers)}),m("div",{className:"helpText"},app.translator.trans("fof-gamification.admin.page.rankings.blocked.help")),m("label",{className:"Upload-label"},app.translator.trans("fof-gamification.admin.page.rankings.custom_image_1")),m(x.a,{className:"Upload-button",name:"topimage1"}),m("br"),m("label",{className:"Upload-label"},app.translator.trans("fof-gamification.admin.page.rankings.custom_image_2")),m(x.a,{className:"Upload-button",name:"topimage2"}),m("br"),m("label",{className:"Upload-label"},app.translator.trans("fof-gamification.admin.page.rankings.custom_image_3")),m(x.a,{className:"Upload-button",name:"topimage3"}),m("br"),b.a.component({type:"submit",className:"Button Button--primary Ranks-save",children:app.translator.trans("fof-gamification.admin.page.save_settings"),loading:this.loading,disabled:!this.changed()})])])])])]},n.updateName=function(a,t){a.save({name:t})},n.updatePoints=function(a,t){a.save({points:t})},n.updateColor=function(a,t){a.save({color:t})},n.deleteRank=function(a){var t=this;a.delete(),this.ranks.some((function(n,e){if(n.data.id===a.data.id)return t.ranks.splice(e,1),!0}))},n.addRank=function(a){var t=this;app.store.createRecord("ranks").save({points:this.newRank.points(),name:this.newRank.name(),color:this.newRank.color()}).then((function(a){t.newRank.color(""),t.newRank.name(""),t.newRank.points(""),t.ranks.push(a),m.redraw()}))},n.changed=function(){var a=this,t=this.switches.some((function(t){return a.values[t]()!==("1"==app.data.settings[a.addPrefix(t)])}));return this.fields.some((function(t){return a.values[t]()!==app.data.settings[a.addPrefix(t)]}))||t},n.onsubmit=function(a){var t=this;if(a.preventDefault(),!this.loading){this.loading=!0,app.alerts.dismiss(this.successAlert);var n={};this.switches.forEach((function(a){return n[t.addPrefix(a)]=t.values[a]()})),this.fields.forEach((function(a){return n[t.addPrefix(a)]=t.values[a]()})),R()(n).then((function(){app.alerts.show(t.successAlert=new g.a({type:"success",children:app.translator.trans("core.admin.basics.saved_message")}))})).catch((function(){})).then((function(){t.loading=!1,window.location.reload()}))}},n.addPrefix=function(a){return this.settingsPrefix+"."+a},t}(v.a),A=function(){app.routes["fof-gamification"]={path:"/fof/gamification",component:_.component()},app.extensionSettings["fof-gamification"]=function(){return m.route(app.route("fof-gamification"))},Object(i.extend)(c.a.prototype,"items",(function(a){a.add("fof-gamification",u.a.component({href:app.route("fof-gamification"),icon:"fas fa-thumbs-up",children:"Gamification",description:app.translator.trans("fof-gamification.admin.nav.desc")}))}))},O=n(7);o.a.initializers.add("fof-gamification",(function(a){a.store.models.ranks=O.a,Object(i.extend)(r.a.prototype,"replyItems",(function(t){t.add("Vote",{icon:"fas fa-thumbs-up",label:a.translator.trans("fof-gamification.admin.permissions.vote_label"),permission:"discussion.vote"})})),Object(i.extend)(r.a.prototype,"viewItems",(function(t){t.add("canSeeVotes",{icon:"fas fa-info-circle",label:a.translator.trans("fof-gamification.admin.permissions.see_votes_label"),permission:"discussion.canSeeVotes"}),t.add("canViewRankingPage",{icon:"fas fa-trophy",label:a.translator.trans("fof-gamification.admin.permissions.see_ranking_page"),permission:"fof.gamification.viewRankingPage",allowGuest:!0})})),A()}))},,,,,,,,,,,,function(a,t){a.exports=flarum.core.compat["components/AdminNav"]},function(a,t){a.exports=flarum.core.compat["components/AdminLinkButton"]},function(a,t){a.exports=flarum.core.compat["components/Alert"]},function(a,t){a.exports=flarum.core.compat["utils/saveSettings"]},,function(a,t,n){"use strict";n.r(t);var e=n(6);for(var o in e)"default"!==o&&function(a){n.d(t,a,(function(){return e[a]}))}(o);n(24)}]);
//# sourceMappingURL=admin.js.map