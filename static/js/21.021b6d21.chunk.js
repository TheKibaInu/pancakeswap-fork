(this["webpackJsonppancake-frontend"]=this["webpackJsonppancake-frontend"]||[]).push([[21],{1327:function(t,e,n){var r=n(700),c=n(1335),o=n(1330),a=4294967295,s=Math.min;t.exports=function(t,e){if((t=o(t))<1||t>9007199254740991)return[];var n=a,i=s(t,a);e=c(e),t-=a;for(var u=r(i,e);++n<t;)e(n);return u}},1330:function(t,e,n){var r=n(699);t.exports=function(t){var e=r(t),n=e%1;return e===e?n?e-n:e:0}},1335:function(t,e,n){var r=n(307);t.exports=function(t){return"function"==typeof t?t:r}},1337:function(t,e,n){"use strict";n.d(e,"h",(function(){return p})),n.d(e,"c",(function(){return f})),n.d(e,"b",(function(){return O})),n.d(e,"d",(function(){return x})),n.d(e,"e",(function(){return h})),n.d(e,"i",(function(){return g})),n.d(e,"g",(function(){return m})),n.d(e,"a",(function(){return v})),n.d(e,"f",(function(){return y}));var r=n(19),c=n(32),o=n(6),a=n(3),s=n.n(a),i=n(11),u=n(73),b=n(37),j=n(40),l=n(120),d=n(1342),p=function(t){return d.a.includes(t.author.toLowerCase())},f=function(t,e){switch(e){case j.h.COMMUNITY:return t.filter((function(t){return!p(t)}));case j.h.CORE:return t.filter((function(t){return p(t)}));case j.h.ALL:default:return t}},O=function(t,e){return t.filter((function(t){return t.state===e}))},x=function(){return{plugins:{},network:56,strategies:[{name:"cake",params:{symbol:"CAKE",address:b.a.cake.address,decimals:18}}]}},h=function(){return{version:d.e,timestamp:(Date.now()/1e3).toFixed(),space:d.c}},g=function(){var t=Object(i.a)(s.a.mark((function t(e){var n,r,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(u.k,{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)});case 2:if((n=t.sent).ok){t.next=8;break}return t.next=6,n.json();case 6:throw r=t.sent,new Error(null===r||void 0===r?void 0:r.error_description);case 8:return t.next=10,n.json();case 10:return c=t.sent,t.abrupt("return",c);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=Object(i.a)(s.a.mark((function t(e,n,r){var c,o,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.t0=r,t.t0){t.next=5;break}return t.next=4,l.a.getBlockNumber();case 4:t.t0=t.sent;case 5:return c=t.t0,t.next=8,fetch("".concat(u.l,"/power"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:e,block:c,poolAddresses:n})});case 8:return o=t.sent,t.next=11,o.json();case 11:return a=t.sent,t.abrupt("return",a.data);case 13:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),v=function(t){return t.reduce((function(t,e){var n=e.proposal.choices[e.choice-1];return Object(o.a)(Object(o.a)({},t),{},Object(r.a)({},n,t[n]?[].concat(Object(c.a)(t[n]),[e]):[e]))}),{})},y=function(t){return t.reduce((function(t,e){var n,r=parseFloat(null===(n=e.metadata)||void 0===n?void 0:n.votingPower);return r||(r=0),t+r}),0)}},1342:function(t,e,n){"use strict";n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return o})),n.d(e,"e",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"f",(function(){return i}));var r=10,c=["0x842B508681eE336E74600974B4623B709477d29D","0x977e0c1005dff8749f8cac22f4df0bd5f013d1a7","0x6eaf1b33b8672c5dc40ab8f4ba3a0111723126c7"].map((function(t){return t.toLowerCase()})),o="https://gateway.ipfs.io/ipfs",a="0.1.3",s="cake.eth",i=10},1372:function(t,e,n){"use strict";n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return a})),n.d(e,"e",(function(){return s})),n.d(e,"b",(function(){return i}));var r=n(29),c=function(){var t=Object(r.c)((function(t){return t.voting.proposals}));return Object.values(t)},o=function(t){return Object(r.c)((function(e){return e.voting.proposals[t]}))},a=function(t){var e=Object(r.c)((function(e){return e.voting.votes[t]}));return e?e.filter((function(t){return!0!==t._inValid})):[]},s=function(){return Object(r.c)((function(t){return t.voting.voteLoadingStatus}))},i=function(){return Object(r.c)((function(t){return t.voting.proposalLoadingStatus}))}},1394:function(t,e,n){"use strict";n.d(e,"a",(function(){return b})),n.d(e,"b",(function(){return j}));var r=n(6),c=n(57),o=(n(1),n(245)),a=n(40),s=n(0),i=["proposalState"],u=["isCoreProposal"],b=function(t){var e=t.proposalState,n=Object(c.a)(t,i);return e===a.g.ACTIVE?Object(s.jsx)(o.h,Object(r.a)({},n)):e===a.g.PENDING?Object(s.jsx)(o.g,Object(r.a)({},n)):Object(s.jsx)(o.a,Object(r.a)({},n))},j=function(t){var e=t.isCoreProposal,n=Object(c.a)(t,u);return e?Object(s.jsx)(o.d,Object(r.a)({},n)):Object(s.jsx)(o.b,Object(r.a)({},n))}},1959:function(t,e,n){"use strict";n.r(e);var r,c,o,a,s,i,u,b,j,l,d,p=n(8),f=n(1),O=n(2),x=n(5),h=n(231),g=n(102),m=n(14),v=n(305),y=Object(x.default)(O.fb)(r||(r=Object(p.a)(["\n  display: none;\n\n  "," {\n    display: block;\n  }\n"])),(function(t){return t.theme.mediaQueries.lg})),C=n(0),w=Object(x.default)(O.o)(c||(c=Object(p.a)(["\n  background: ",";\n  padding-bottom: 32px;\n  padding-top: 32px;\n"])),(function(t){return t.theme.colors.gradients.bubblegum})),k=function(){var t=Object(m.b)().t;return Object(C.jsx)(w,{children:Object(C.jsx)(v.a,{children:Object(C.jsxs)(O.Z,{alignItems:"center",justifyContent:"space-between",children:[Object(C.jsxs)(O.o,{pr:"32px",children:[Object(C.jsx)(O.bb,{as:"h1",scale:"xxl",color:"secondary",mb:"16px",children:t("Voting")}),Object(C.jsx)(O.bb,{as:"h3",scale:"lg",mb:"16px",children:t("Have your say in the future of the PancakeSwap Ecosystem")}),Object(C.jsx)(O.t,{startIcon:Object(C.jsx)(O.Vb,{color:"currentColor",width:"24px"}),as:g.b,to:"/voting/proposal/create",children:t("Make a Proposal")})]}),Object(C.jsx)(y,{src:"/images/voting/voting-presents.png",width:361,height:214})]})})})},I=Object(x.default)(O.o)(o||(o=Object(p.a)(["\n  background: ",";\n  padding-bottom: 32px;\n  padding-top: 32px;\n"])),(function(t){return t.theme.colors.gradients.bubblegum})),S=function(){var t=Object(m.b)().t;return Object(C.jsx)(I,{children:Object(C.jsx)(v.a,{children:Object(C.jsxs)(O.Z,{alignItems:"center",justifyContent:"space-between",children:[Object(C.jsxs)(O.o,{pr:"32px",children:[Object(C.jsx)(O.bb,{as:"h2",scale:"lg",mb:"16px",children:t("Got a suggestion?")}),Object(C.jsx)(O.vc,{as:"p",children:t("Community proposals are a great way to see how the community feels about your ideas.")}),Object(C.jsx)(O.vc,{as:"p",mb:"16px",children:t("They won't necessarily be implemented if the community votes successful, but suggestions with a lot of community support may be made into Core proposals.")}),Object(C.jsx)(O.t,{startIcon:Object(C.jsx)(O.Vb,{color:"currentColor",width:"24px"}),as:g.b,to:"/voting/proposal/create",children:t("Make a Proposal")})]}),Object(C.jsx)(y,{src:"/images/voting/voting-bunny.png",width:173,height:234})]})})})},E=n(6),T=n(9),L=n(86),N=n(493),D=n(1372),M=n(40),A=n(1337),P=n(1327),Z=n.n(P),V=n(1342),B=Object(x.default)(O.Z)(a||(a=Object(p.a)(["\n  border-bottom: 1px solid ",";\n"])),(function(t){return t.theme.colors.cardBorder})),F=x.default.div(s||(s=Object(p.a)(["\n  ",":last-child {\n    border-bottom: 0;\n  }\n"])),B),G=function(){return Object(C.jsx)(F,{children:Z()(V.d).map((function(t){return Object(C.jsxs)(B,{alignItems:"center",justifyContent:"space-between",py:"16px",px:"24px",children:[Object(C.jsxs)(O.o,{style:{flex:1},children:[Object(C.jsx)(O.bc,{height:"21px",width:"70%",mb:"4px"}),Object(C.jsx)(O.bc,{height:"21px",width:"30%",mb:"4px"}),Object(C.jsx)(O.bc,{height:"21px",width:"40%"})]}),Object(C.jsx)(O.bc,{height:"32px",width:"32px"})]},t)}))})},H=x.default.div(i||(i=Object(p.a)(["\n  background-color: ",";\n  padding-top: 16px;\n"])),(function(t){return t.theme.colors.input})),J=function(t){switch(t){case M.h.COMMUNITY:return 1;case M.h.ALL:return 2;case M.h.CORE:default:return 0}},R=function(t){var e=t.proposalType,n=t.onTypeChange,r=Object(m.b)().t;return Object(C.jsx)(H,{children:Object(C.jsxs)(O.qc,{activeIndex:J(e),onItemClick:function(t){n(function(t){switch(t){case 1:return M.h.COMMUNITY;case 2:return M.h.ALL;default:return M.h.CORE}}(t))},children:[Object(C.jsx)(O.pc,{children:Object(C.jsxs)(O.Z,{alignItems:"center",children:[Object(C.jsx)(O.Jc,{color:"currentColor",mr:"4px"}),r("Core")]})}),Object(C.jsxs)(O.pc,{children:[" ",Object(C.jsxs)(O.Z,{alignItems:"center",children:[Object(C.jsx)(O.R,{color:"currentColor",mr:"4px"}),r("Community")]})]}),Object(C.jsx)(O.pc,{children:"All"})]})})},U=n(25),Y=n(1303),_=function(t){var e=Object(U.default)(1e3*t);return Object(Y.default)(e,"MMM do, yyyy HH:mm")},q=function(t){var e=t.startDate,n=t.endDate,r=t.proposalState,c=Object(m.b)().t,o={fontSize:"16px",color:"textSubtle",ml:"8px"};return r===M.g.CLOSED?Object(C.jsx)(O.vc,Object(E.a)(Object(E.a)({},o),{},{children:c("Ended %date%",{date:_(n)})})):r===M.g.PENDING?Object(C.jsx)(O.vc,Object(E.a)(Object(E.a)({},o),{},{children:c("Starts %date%",{date:_(e)})})):Object(C.jsx)(O.vc,Object(E.a)(Object(E.a)({},o),{},{children:c("Ends %date%",{date:_(n)})}))},z=n(1394),K=Object(x.default)(g.b)(u||(u=Object(p.a)(["\n  align-items: center;\n  border-bottom: 1px solid ",";\n  display: flex;\n  padding: 16px 24px;\n\n  &:hover {\n    background-color: ",";\n  }\n"])),(function(t){return t.theme.colors.cardBorder}),(function(t){return t.theme.colors.dropdown})),Q=function(t){var e=t.proposal,n="/voting/proposal/".concat(e.id);return Object(C.jsxs)(K,{to:n,children:[Object(C.jsxs)(O.o,{as:"span",style:{flex:1},children:[Object(C.jsx)(O.vc,{bold:!0,mb:"8px",children:e.title}),Object(C.jsx)(O.Z,{alignItems:"center",mb:"8px",children:Object(C.jsx)(q,{startDate:e.start,endDate:e.end,proposalState:e.state})}),Object(C.jsxs)(O.Z,{alignItems:"center",children:[Object(C.jsx)(z.a,{proposalState:e.state}),Object(C.jsx)(z.b,{isCoreProposal:Object(A.h)(e),ml:"8px"})]})]}),Object(C.jsx)(O.eb,{variant:"text",children:Object(C.jsx)(O.f,{width:"24px"})})]})},W=Object(x.default)(O.Z).attrs({alignItems:"center"})(b||(b=Object(p.a)(["\n  border-bottom: 1px solid ",";\n  padding: 16px 24px;\n"])),(function(t){return t.theme.colors.cardBorder})),X=x.default.label(j||(j=Object(p.a)(["\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  margin-right: 16px;\n"]))),$=[{value:M.g.ACTIVE,label:"Vote Now"},{value:M.g.PENDING,label:"Soon"},{value:M.g.CLOSED,label:"Closed"}],tt=function(t){var e=t.filterState,n=t.onFilterChange,r=t.isLoading,c=Object(m.b)().t;return Object(C.jsx)(W,{children:$.map((function(t){var o=t.value,a=t.label;return Object(C.jsxs)(X,{children:[Object(C.jsx)(O.Wb,{scale:"sm",value:o,checked:e===o,onChange:function(t){var e=t.currentTarget.value;n(e)},disabled:r}),Object(C.jsx)(O.vc,{ml:"8px",children:c(a)})]},a)}))})},et=function(){var t=Object(m.b)().t,e=Object(f.useState)({proposalType:M.h.CORE,filterState:M.g.ACTIVE}),n=Object(T.a)(e,2),r=n[0],c=n[1],o=Object(D.b)(),a=Object(D.c)(),s=Object(L.b)(),i=r.proposalType,u=r.filterState,b=o===M.j.LOADING,j=o===M.j.IDLE;Object(f.useEffect)((function(){s(Object(N.c)({first:1e3,state:u}))}),[u,s]);var l=Object(A.b)(Object(A.c)(a,i),u);return Object(C.jsxs)(v.a,{py:"40px",children:[Object(C.jsx)(O.o,{mb:"48px",children:Object(C.jsxs)(O.p,{children:[Object(C.jsx)(g.b,{to:"/",children:t("Home")}),Object(C.jsx)(O.vc,{children:t("Voting")})]})}),Object(C.jsx)(O.bb,{as:"h2",scale:"xl",mb:"32px",id:"voting-proposals",children:t("Proposals")}),Object(C.jsxs)(O.y,{children:[Object(C.jsx)(R,{proposalType:i,onTypeChange:function(t){c((function(e){return Object(E.a)(Object(E.a)({},e),{},{proposalType:t})}))}}),Object(C.jsx)(tt,{filterState:u,onFilterChange:function(t){c((function(e){return Object(E.a)(Object(E.a)({},e),{},{filterState:t})}))},isLoading:b}),b&&Object(C.jsx)(G,{}),j&&l.length>0&&l.map((function(t){return Object(C.jsx)(Q,{proposal:t},t.id)})),j&&0===l.length&&Object(C.jsx)(O.Z,{alignItems:"center",justifyContent:"center",p:"32px",children:Object(C.jsx)(O.bb,{as:"h5",children:t("No proposals found")})})]})]})},nt=x.default.div(l||(l=Object(p.a)(["\n  flex: none;\n"]))),rt=x.default.div(d||(d=Object(p.a)(["\n  flex: 1;\n  height: 100%;\n"])));e.default=function(){return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(h.a,{}),Object(C.jsxs)(O.Z,{flexDirection:"column",minHeight:"calc(100vh - 64px)",children:[Object(C.jsx)(nt,{children:Object(C.jsx)(k,{})}),Object(C.jsx)(rt,{children:Object(C.jsx)(et,{})}),Object(C.jsx)(nt,{children:Object(C.jsx)(S,{})})]})]})}}}]);
//# sourceMappingURL=21.021b6d21.chunk.js.map