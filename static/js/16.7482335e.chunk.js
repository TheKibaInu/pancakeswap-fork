(this["webpackJsonppancake-frontend"]=this["webpackJsonppancake-frontend"]||[]).push([[16],{1331:function(e,t,n){"use strict";n.d(t,"h",(function(){return x})),n.d(t,"c",(function(){return p})),n.d(t,"b",(function(){return O})),n.d(t,"d",(function(){return h})),n.d(t,"e",(function(){return f})),n.d(t,"i",(function(){return m})),n.d(t,"g",(function(){return v})),n.d(t,"a",(function(){return g})),n.d(t,"f",(function(){return w}));var c=n(20),r=n(31),o=n(5),a=n(3),s=n.n(a),i=n(12),l=n(67),b=n(36),j=n(38),u=n(116),d=n(1336),x=function(e){return d.a.includes(e.author.toLowerCase())},p=function(e,t){switch(t){case j.h.COMMUNITY:return e.filter((function(e){return!x(e)}));case j.h.CORE:return e.filter((function(e){return x(e)}));case j.h.ALL:default:return e}},O=function(e,t){return e.filter((function(e){return e.state===t}))},h=function(){return{plugins:{},network:56,strategies:[{name:"cake",params:{symbol:"CAKE",address:b.a.cake.address,decimals:18}}]}},f=function(){return{version:d.e,timestamp:(Date.now()/1e3).toFixed(),space:d.c}},m=function(){var e=Object(i.a)(s.a.mark((function e(t){var n,c,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.k,{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 2:if((n=e.sent).ok){e.next=8;break}return e.next=6,n.json();case 6:throw c=e.sent,new Error(null===c||void 0===c?void 0:c.error_description);case 8:return e.next=10,n.json();case 10:return r=e.sent,e.abrupt("return",r);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(i.a)(s.a.mark((function e(t,n,c){var r,o,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=c,e.t0){e.next=5;break}return e.next=4,u.a.getBlockNumber();case 4:e.t0=e.sent;case 5:return r=e.t0,e.next=8,fetch("".concat(l.l,"/power"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:t,block:r,poolAddresses:n})});case 8:return o=e.sent,e.next=11,o.json();case 11:return a=e.sent,e.abrupt("return",a.data);case 13:case"end":return e.stop()}}),e)})));return function(t,n,c){return e.apply(this,arguments)}}(),g=function(e){return e.reduce((function(e,t){var n=t.proposal.choices[t.choice-1];return Object(o.a)(Object(o.a)({},e),{},Object(c.a)({},n,e[n]?[].concat(Object(r.a)(e[n]),[t]):[t]))}),{})},w=function(e){return e.reduce((function(e,t){var n,c=parseFloat(null===(n=t.metadata)||void 0===n?void 0:n.votingPower);return c||(c=0),e+c}),0)}},1336:function(e,t,n){"use strict";n.d(t,"d",(function(){return c})),n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"e",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"f",(function(){return i}));var c=10,r=["0x842B508681eE336E74600974B4623B709477d29D","0x977e0c1005dff8749f8cac22f4df0bd5f013d1a7","0x6eaf1b33b8672c5dc40ab8f4ba3a0111723126c7"].map((function(e){return e.toLowerCase()})),o="https://gateway.ipfs.io/ipfs",a="0.1.3",s="cake.eth",i=10},1366:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"b",(function(){return i}));var c=n(29),r=function(){var e=Object(c.c)((function(e){return e.voting.proposals}));return Object.values(e)},o=function(e){return Object(c.c)((function(t){return t.voting.proposals[e]}))},a=function(e){var t=Object(c.c)((function(t){return t.voting.votes[e]}));return t?t.filter((function(e){return!0!==e._inValid})):[]},s=function(){return Object(c.c)((function(e){return e.voting.voteLoadingStatus}))},i=function(){return Object(c.c)((function(e){return e.voting.proposalLoadingStatus}))}},1388:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return j}));var c=n(5),r=n(56),o=(n(0),n(237)),a=n(38),s=n(1),i=["proposalState"],l=["isCoreProposal"],b=function(e){var t=e.proposalState,n=Object(r.a)(e,i);return t===a.g.ACTIVE?Object(s.jsx)(o.h,Object(c.a)({},n)):t===a.g.PENDING?Object(s.jsx)(o.g,Object(c.a)({},n)):Object(s.jsx)(o.a,Object(c.a)({},n))},j=function(e){var t=e.isCoreProposal,n=Object(r.a)(e,l);return t?Object(s.jsx)(o.d,Object(c.a)({},n)):Object(s.jsx)(o.b,Object(c.a)({},n))}},1395:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return b}));var c,r=n(5),o=n(8),a=(n(0),n(2)),s=n(6),i=n(1),l=s.e.div(c||(c=Object(o.a)(["\n  align-items: center;\n  border: 1px solid ",";\n  border-radius: 12px;\n  display: flex;\n  height: 64px;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding: 0 16px;\n"])),(function(e){return e.theme.colors.cardBorder})),b=function(e){return Object(i.jsx)(a.o,Object(r.a)({mb:"24px",maxWidth:"320px"},e))}},1427:function(e,t,n){"use strict";var c,r=n(8),o=n(6).e.div(c||(c=Object(r.a)(["\n  align-items: start;\n  display: grid;\n  grid-gap: 32px;\n  grid-template-columns: minmax(0, 1fr);\n\n  "," {\n    grid-template-columns: 1fr 332px;\n  }\n"])),(function(e){return e.theme.mediaQueries.lg}));t.a=o},1428:function(e,t,n){"use strict";n(0);var c=n(2),r=n(14),o=n(32),a=n(1395),s=n(1);t.a=function(e){var t=e.total,n=e.cakeBalance,i=e.cakeVaultBalance,l=e.cakePoolBalance,b=e.poolsBalance,j=e.cakeBnbLpBalance,u=Object(r.b)().t;return Object(s.jsxs)(a.a,{mb:"0",children:[Object(s.jsx)(c.vc,{as:"p",mb:"24px",fontSize:"14px",color:"textSubtle",children:u("Your voting power is determined by the amount of CAKE you held at the block detailed below. CAKE held in other places does not contribute to your voting power.")}),Object(s.jsx)(c.vc,{color:"secondary",textTransform:"uppercase",mb:"4px",bold:!0,fontSize:"14px",children:u("Overview")}),Object(s.jsxs)(a.b,{children:[Object(s.jsx)(c.vc,{color:"secondary",children:u("Your Voting Power")}),Object(s.jsx)(c.vc,{bold:!0,fontSize:"20px",children:Object(o.e)(t,0,3)})]}),Object(s.jsx)(c.vc,{color:"secondary",textTransform:"uppercase",mb:"4px",bold:!0,fontSize:"14px",children:u("Your Cake Held Now")}),Object(s.jsxs)(c.Z,{alignItems:"center",justifyContent:"space-between",mb:"4px",children:[Object(s.jsx)(c.vc,{color:"textSubtle",fontSize:"16px",children:u("Wallet")}),Object(s.jsx)(c.vc,{textAlign:"right",children:Object(o.e)(n,0,3)})]}),Object(s.jsxs)(c.Z,{alignItems:"center",justifyContent:"space-between",mb:"4px",children:[Object(s.jsx)(c.vc,{color:"textSubtle",fontSize:"16px",children:u("Manual CAKE Pool")}),Object(s.jsx)(c.vc,{textAlign:"right",children:Object(o.e)(l,0,3)})]}),Object(s.jsxs)(c.Z,{alignItems:"center",justifyContent:"space-between",mb:"4px",children:[Object(s.jsx)(c.vc,{color:"textSubtle",fontSize:"16px",children:u("Auto CAKE Pool")}),Object(s.jsx)(c.vc,{textAlign:"right",children:Object(o.e)(i,0,3)})]}),Object(s.jsxs)(c.Z,{alignItems:"center",justifyContent:"space-between",mb:"4px",children:[Object(s.jsx)(c.vc,{color:"textSubtle",fontSize:"16px",children:u("Other Syrup Pools")}),Object(s.jsx)(c.vc,{textAlign:"right",children:Object(o.e)(b,0,3)})]}),Object(s.jsxs)(c.Z,{alignItems:"center",justifyContent:"space-between",mb:"4px",children:[Object(s.jsx)(c.vc,{color:"textSubtle",fontSize:"16px",children:u("CAKE BNB LP")}),Object(s.jsx)(c.vc,{textAlign:"right",children:Object(o.e)(j,0,3)})]})]})}},1429:function(e,t,n){"use strict";var c=n(3),r=n.n(c),o=n(5),a=n(12),s=n(10),i=n(0),l=n(53),b=n(225),j=n(37),u=n(116),d=n(1331),x={verificationHash:null,cakeBalance:0,cakeVaultBalance:0,cakePoolBalance:0,poolsBalance:0,cakeBnbLpBalance:0,total:0};t.a=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Object(l.c)(),c=n.account,p=Object(i.useState)(x),O=Object(s.a)(p,2),h=O[0],f=O[1],m=Object(i.useState)(!!c),v=Object(s.a)(m,2),g=v[0],w=v[1];return Object(i.useEffect)((function(){c&&t&&function(){var n=Object(a.a)(r.a.mark((function n(){var a,s,i,l,x,p,O,h,m,v,g;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(w(!0),n.prev=1,n.t0=e,n.t0){n.next=7;break}return n.next=6,u.a.getBlockNumber();case 6:n.t0=n.sent;case 7:return a=n.t0,n.next=10,Object(b.b)(a);case 10:return s=n.sent,i=s.map((function(e){var t=e.contractAddress;return Object(j.a)(t)})),n.next=14,Object(d.g)(c,i,a);case 14:l=n.sent,x=l.cakeBalance,p=l.cakeBnbLpBalance,O=l.cakePoolBalance,h=l.total,m=l.poolsBalance,v=l.cakeVaultBalance,g=l.verificationHash,t&&f((function(e){return Object(o.a)(Object(o.a)({},e),{},{verificationHash:g,cakeBalance:parseFloat(x),cakeBnbLpBalance:parseFloat(p),cakePoolBalance:parseFloat(O),poolsBalance:parseFloat(m),cakeVaultBalance:parseFloat(v),total:parseFloat(h)})}));case 23:return n.prev=23,w(!1),n.finish(23);case 26:case"end":return n.stop()}}),n,null,[[1,,23,26]])})));return function(){return n.apply(this,arguments)}}()()}),[c,e,f,t,w]),Object(o.a)(Object(o.a)({},h),{},{isLoading:g})}},1488:function(e,t,n){"use strict";var c,r,o,a=n(5),s=(n(0),n(1497)),i=n.n(s),l=n(1533),b=n.n(l),j=n(8),u=n(2),d=n(6),x=n(1),p=d.e.table(c||(c=Object(j.a)(["\n  margin-bottom: 32px;\n  margin-top: 32px;\n  width: 100%;\n\n  td,\n  th {\n    color: ",";\n    padding: 8px;\n  }\n"])),(function(e){return e.theme.colors.text})),O=d.e.div(r||(r=Object(j.a)(["\n  color: ",";\n  margin-bottom: 16px;\n  margin-top: 16px;\n\n  li {\n    margin-bottom: 8px;\n  }\n"])),(function(e){return e.theme.colors.text})),h=function(e){return Object(x.jsx)(u.bb,Object(a.a)({as:"h4",scale:"lg",my:"16px"},e))},f={h1:h,h2:h,h3:h,h4:h,h5:h,h6:h,p:function(e){return Object(x.jsx)(u.vc,Object(a.a)({as:"p",my:"16px"},e))},table:p,ol:function(e){return Object(x.jsx)(O,Object(a.a)({as:"ol"},e))},ul:function(e){return Object(x.jsx)(O,Object(a.a)({as:"ul"},e))},pre:d.e.pre(o||(o=Object(j.a)(["\n  color: ",";\n  margin-bottom: 16px;\n  margin-top: 16px;\n  max-width: 100%;\n  overflow-x: auto;\n"])),(function(e){return e.theme.colors.text}))};t.a=function(e){return Object(x.jsx)(i.a,Object(a.a)({remarkPlugins:[b.a],components:f},e))}},1952:function(e,t,n){"use strict";n.r(t);var c,r,o,a=n(0),s=n(2),i=n(53),l=n(92),b=n(100),j=n(82),u=n(38),d=n(1366),x=n(490),p=n(14),O=n(296),h=n(1488),f=n(474),m=n(1331),v=n(1388),g=n(1427),w=n(8),y=n(6),k=n(1297),S=n(41),B=n(177),C=n(1336),I=n(1),L=Object(y.e)(s.o)(c||(c=Object(w.a)(["\n  background-color: ",";\n  border: 1px solid ",";\n  border-radius: 16px;\n"])),(function(e){return e.theme.colors.background}),(function(e){return e.theme.colors.cardBorder})),A=function(e){var t=e.proposal,n=Object(p.b)().t,c=new Date(1e3*t.start),r=new Date(1e3*t.end);return Object(I.jsxs)(s.y,{mb:"16px",children:[Object(I.jsx)(s.B,{children:Object(I.jsx)(s.bb,{as:"h3",scale:"md",children:n("Details")})}),Object(I.jsxs)(s.z,{children:[Object(I.jsxs)(s.Z,{alignItems:"center",mb:"8px",children:[Object(I.jsx)(s.vc,{color:"textSubtle",children:n("Identifier")}),Object(I.jsx)(s.ob,{href:"".concat(C.b,"/").concat(t.id),ml:"8px",children:t.id.slice(0,8)})]}),Object(I.jsxs)(s.Z,{alignItems:"center",mb:"8px",children:[Object(I.jsx)(s.vc,{color:"textSubtle",children:n("Creator")}),Object(I.jsx)(s.ob,{href:Object(S.e)(t.author,"address"),ml:"8px",children:Object(B.a)(t.author)})]}),Object(I.jsxs)(s.Z,{alignItems:"center",mb:"16px",children:[Object(I.jsx)(s.vc,{color:"textSubtle",children:n("Snapshot")}),Object(I.jsx)(s.ob,{href:Object(S.e)(t.snapshot,"block"),ml:"8px",children:t.snapshot})]}),Object(I.jsxs)(L,{p:"16px",children:[Object(I.jsx)(v.a,{proposalState:t.state,mb:"8px"}),Object(I.jsxs)(s.Z,{alignItems:"center",children:[Object(I.jsx)(s.vc,{color:"textSubtle",fontSize:"14px",children:n("Start Date")}),Object(I.jsx)(s.vc,{ml:"8px",children:Object(k.default)(c,"yyyy-MM-dd HH:mm")})]}),Object(I.jsxs)(s.Z,{alignItems:"center",children:[Object(I.jsx)(s.vc,{color:"textSubtle",fontSize:"14px",children:n("End Date")}),Object(I.jsx)(s.vc,{ml:"8px",children:Object(k.default)(r,"yyyy-MM-dd HH:mm")})]})]})]})]})},D=n(1321),V=n.n(D),E=n(32),P=Object(y.e)(s.vc)(r||(r=Object(w.a)(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]))),N=function(e){var t=e.choices,n=e.votes,c=Object(p.b)().t,r=Object(m.a)(n),o=Object(d.e)(),a=Object(i.c)().account,l=Object(m.f)(n);return Object(I.jsxs)(s.y,{children:[Object(I.jsx)(s.B,{children:Object(I.jsx)(s.bb,{as:"h3",scale:"md",children:c("Current Results")})}),Object(I.jsxs)(s.z,{children:[o===u.j.IDLE&&t.map((function(e,t){var n=r[e]||[],o=Object(m.f)(n),i=0===l?0:o/l*100,b=n.some((function(e){return a&&e.voter.toLowerCase()===a.toLowerCase()}));return Object(I.jsxs)(s.o,{mt:t>0?"24px":"0px",children:[Object(I.jsxs)(s.Z,{alignItems:"center",mb:"8px",children:[Object(I.jsx)(P,{mb:"4px",title:e,children:e}),b&&Object(I.jsxs)(s.sc,{variant:"success",outline:!0,ml:"8px",children:[Object(I.jsx)(s.I,{mr:"4px"})," ",c("Voted")]})]}),Object(I.jsx)(s.o,{mb:"4px",children:Object(I.jsx)(s.Ub,{primaryStep:i,scale:"sm"})}),Object(I.jsxs)(s.Z,{alignItems:"center",justifyContent:"space-between",children:[Object(I.jsx)(s.vc,{color:"textSubtle",children:c("%total% Votes",{total:Object(E.e)(o,0,2)})}),Object(I.jsxs)(s.vc,{children:[i.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),"%"]})]})]},e)})),o===u.j.LOADING&&V()(t.length).map((function(e,t){return Object(I.jsx)(s.o,{mt:t>0?"24px":"0px",children:Object(I.jsx)(s.bc,{height:"36px",mb:"4px"})},e)}))]})]})},z=n(5),Z=n(3),F=n.n(Z),T=n(12),M=n(10),H=n(56),K=n(110),J=n(123),Y=n(20),G=n(240),W=n(24),Q=n(107);!function(e){e.MAIN="main",e.DETAILS="details"}(o||(o={}));var R,U,_,q,X,$,ee,te,ne=n(1395),ce=function(e){var t=e.vote,n=e.total,c=e.isPending,r=e.isLoading,o=e.onConfirm,a=e.onViewDetails,i=e.onDismiss,l=Object(p.b)().t;return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)(ne.a,{children:[Object(I.jsx)(s.vc,{color:"secondary",mb:"8px",textTransform:"uppercase",fontSize:"12px",bold:!0,children:l("Voting For")}),Object(I.jsx)(P,{bold:!0,fontSize:"20px",mb:"8px",title:t.label,children:t.label}),Object(I.jsx)(s.vc,{color:"secondary",mb:"8px",textTransform:"uppercase",fontSize:"12px",bold:!0,children:l("Your Voting Power")}),r?Object(I.jsx)(s.bc,{height:"64px",mb:"24px"}):Object(I.jsxs)(ne.b,{onClick:a,style:{cursor:"pointer"},children:[Object(I.jsx)(s.vc,{bold:!0,fontSize:"20px",children:Object(E.e)(n,0,3)}),Object(I.jsx)(s.eb,{scale:"sm",variant:"text",children:Object(I.jsx)(s.M,{width:"24px"})})]}),Object(I.jsx)(s.vc,{as:"p",color:"textSubtle",fontSize:"14px",children:l("Are you sure you want to vote for the above choice? This action cannot be undone.")})]}),Object(I.jsx)(s.t,{isLoading:c,endIcon:c?Object(I.jsx)(s.i,{spin:!0,color:"currentColor"}):null,disabled:r||0===n,width:"100%",mb:"8px",onClick:o,children:l("Confirm Vote")}),Object(I.jsx)(s.t,{variant:"secondary",width:"100%",onClick:i,children:l("Cancel")})]})},re=n(1428),oe=n(1429),ae=function(e){var t,n=e.onSuccess,c=e.proposalId,r=e.vote,l=e.block,b=e.onDismiss,j=Object(a.useState)(o.MAIN),d=Object(M.a)(j,2),x=d[0],O=d[1],h=Object(a.useState)(!0),f=Object(M.a)(h,2),v=f[0],g=f[1],w=Object(a.useState)(!1),y=Object(M.a)(w,2),k=y[0],S=y[1],B=Object(i.c)().account,C=Object(p.b)().t,L=Object(K.a)().toastError,A=Object(W.a)().library,D=Object(Q.a)().theme,V=Object(oe.a)(l,v),E=V.isLoading,P=V.total,N=V.cakeBalance,Z=V.cakeVaultBalance,H=V.cakePoolBalance,J=V.poolsBalance,R=V.cakeBnbLpBalance,U=V.verificationHash,_=x===o.MAIN,q=_?null:function(){return O(o.MAIN)},X=(t={},Object(Y.a)(t,o.MAIN,C("Confirm Vote")),Object(Y.a)(t,o.DETAILS,C("Voting Power")),t),$=function(){g(!1),b()},ee=function(){var e=Object(T.a)(F.a.mark((function e(){var t,o,a;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,S(!0),t=JSON.stringify(Object(z.a)(Object(z.a)({},Object(m.e)()),{},{type:u.i.VOTE,payload:{proposal:c,choice:r.value,metadata:{votingPower:P.toString(),verificationHash:U}}})),e.next=5,Object(G.c)(A,B,t);case 5:return o=e.sent,a={address:B,msg:t,sig:o},e.next=9,Object(m.i)(a);case 9:return S(!1),e.next=12,n();case 12:$(),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(0),S(!1),L(C("Error"),null===e.t0||void 0===e.t0?void 0:e.t0.message),console.error(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}();return Object(I.jsx)(s.zb,{title:X[x],onBack:q,onDismiss:b,hideCloseButton:!_,headerBackground:D.colors.gradients.cardHeader,children:Object(I.jsxs)(s.o,{mb:"24px",width:"320px",children:[x===o.MAIN&&Object(I.jsx)(ce,{vote:r,isLoading:E,isPending:k,total:P,onConfirm:ee,onViewDetails:function(){return O(o.DETAILS)},onDismiss:$}),x===o.DETAILS&&Object(I.jsx)(re.a,{total:P,cakeBalance:N,cakeVaultBalance:Z,cakePoolBalance:H,poolsBalance:J,cakeBnbLpBalance:R})]})})},se=["proposal"],ie=y.e.label(R||(R=Object(w.a)(["\n  align-items: center;\n  border: 1px solid ",";\n  border-radius: 16px;\n  cursor: ",";\n  display: flex;\n  margin-bottom: 16px;\n  padding: 16px;\n"])),(function(e){var t=e.theme,n=e.isChecked;return t.colors[n?"success":"cardBorder"]}),(function(e){return e.isDisabled?"not-allowed":"pointer"})),le=y.e.div(U||(U=Object(w.a)(["\n  flex: 1;\n  padding-left: 16px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 0;\n"]))),be=function(e){var t=e.proposal,n=Object(H.a)(e,se),c=Object(a.useState)(null),r=Object(M.a)(c,2),o=r[0],l=r[1],b=Object(p.b)().t,u=Object(K.a)().toastSuccess,d=Object(j.b)(),O=Object(i.c)().account,h=function(){var e=Object(T.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u(b("Vote cast!")),d(Object(x.d)({proposalId:t.id,block:Number(t.snapshot)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=Object(s.Wc)(Object(I.jsx)(ae,{onSuccess:h,proposalId:t.id,vote:o,block:Number(t.snapshot)})),m=Object(M.a)(f,1)[0];return Object(I.jsxs)(s.y,Object(z.a)(Object(z.a)({},n),{},{children:[Object(I.jsx)(s.B,{children:Object(I.jsx)(s.bb,{as:"h3",scale:"md",children:b("Cast your vote")})}),Object(I.jsxs)(s.z,{children:[t.choices.map((function(e,t){var n=t+1===(null===o||void 0===o?void 0:o.value);return Object(I.jsxs)(ie,{isChecked:n,isDisabled:!O,children:[Object(I.jsx)("div",{style:{flexShrink:0},children:Object(I.jsx)(s.Wb,{scale:"sm",value:e,checked:n,onChange:function(){l({label:e,value:t+1})},disabled:!O})}),Object(I.jsx)(le,{children:Object(I.jsx)(s.vc,{as:"span",title:e,children:e})})]},e)})),O?Object(I.jsx)(s.t,{onClick:m,disabled:null===o,children:b("Cast Vote")}):Object(I.jsx)(J.a,{})]})]}))},je=n(300),ue=n.n(je),de=Object(y.e)(s.Z)(_||(_=Object(w.a)(["\n  border-bottom: 1px solid ",";\n  padding: 16px 24px;\n"])),(function(e){return e.theme.colors.cardBorder})),xe=Object(y.e)(s.bc)(q||(q=Object(w.a)(["\n  flex: 1;\n"]))),pe=function(){return Object(I.jsx)(s.o,{children:V()(10).map((function(e){return Object(I.jsxs)(de,{children:[Object(I.jsx)(s.bc,{height:"21px",mr:"32px",width:"100px"}),Object(I.jsx)(xe,{height:"21px",mr:"32px",width:"100%"}),Object(I.jsx)(xe,{height:"21px",width:"100%"})]},e)}))})},Oe=Object(y.e)(s.o).attrs({alignItems:"center"})(X||(X=Object(w.a)(["\n  grid-area: address;\n"]))),he=Object(y.e)(s.o)($||($=Object(w.a)(["\n  grid-area: choice;\n  overflow: hidden;\n"]))),fe=Object(y.e)(s.o)(ee||(ee=Object(w.a)(["\n  justify-self: end;\n  grid-area: vote;\n"]))),me=Object(y.e)(s.ab)(te||(te=Object(w.a)(["\n  border-bottom: 1px solid ",";\n  grid-gap: 8px;\n  grid-template-areas:\n    'address address address'\n    'choice choice vote';\n  grid-template-columns: 1fr 1fr 120px;\n  padding: 8px 16px;\n\n  "," {\n    grid-gap: 16px;\n    grid-template-areas: 'address choice vote';\n    padding: 16px 24px;\n  }\n"])),(function(e){return e.theme.colors.cardBorder}),(function(e){return e.theme.mediaQueries.sm})),ve=function(e){var t,n=e.vote,c=e.isVoter,r=Object(p.b)().t,o=!!(null===(t=n.metadata)||void 0===t?void 0:t.votingPower),a=o?parseFloat(n.metadata.votingPower).toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:3}):"--";return Object(I.jsxs)(me,{children:[Object(I.jsx)(Oe,{children:Object(I.jsxs)(s.Z,{alignItems:"center",children:[Object(I.jsx)(s.ob,{href:Object(S.e)(n.voter,"address"),children:Object(B.a)(n.voter)}),c&&Object(I.jsxs)(s.sc,{variant:"success",outline:!0,ml:"8px",children:[Object(I.jsx)(s.I,{mr:"4px"})," ",r("Voted")]})]})}),Object(I.jsx)(he,{children:Object(I.jsx)(P,{title:n.proposal.choices[n.choice-1],children:n.proposal.choices[n.choice-1]})}),Object(I.jsx)(fe,{children:Object(I.jsxs)(s.Z,{alignItems:"center",justifyContent:"end",children:[Object(I.jsx)(s.vc,{title:n.metadata.votingPower,children:a}),o&&Object(I.jsx)(s.ob,{href:"".concat(C.b,"/").concat(n.id)})]})})]})},ge=function(e){var t,n=parseFloat(null===e||void 0===e||null===(t=e.metadata)||void 0===t?void 0:t.votingPower);return n||(n=0),n},we=function(e){var t=e.votes,n=Object(a.useState)(!1),c=Object(M.a)(n,2),r=c[0],o=c[1],l=Object(p.b)().t,b=Object(i.c)().account,j=ue()(t,[ge,"created"],["desc","desc"]),x=r?j:j.slice(0,20),O=Object(d.e)()===u.j.IDLE;return Object(I.jsxs)(s.y,{children:[Object(I.jsx)(s.B,{children:Object(I.jsxs)(s.Z,{alignItems:"center",justifyContent:"space-between",children:[Object(I.jsx)(s.bb,{as:"h3",scale:"md",children:l("Votes (%count%)",{count:t.length.toLocaleString()})}),!O&&Object(I.jsx)(s.i,{spin:!0,width:"22px"})]})}),!O&&Object(I.jsx)(pe,{}),O&&x.length>0&&Object(I.jsxs)(I.Fragment,{children:[x.map((function(e){var t=b&&e.voter.toLowerCase()===b.toLowerCase();return Object(I.jsx)(ve,{vote:e,isVoter:t},e.id)})),Object(I.jsx)(s.Z,{alignItems:"center",justifyContent:"center",py:"8px",px:"24px",children:Object(I.jsx)(s.t,{width:"100%",onClick:function(){o(!r)},variant:"text",endIcon:r?Object(I.jsx)(s.N,{color:"primary",width:"21px"}):Object(I.jsx)(s.K,{color:"primary",width:"21px"}),disabled:!O,children:l(r?"Hide":"See All")})})]}),O&&0===x.length&&Object(I.jsx)(s.Z,{alignItems:"center",justifyContent:"center",py:"32px",children:Object(I.jsx)(s.bb,{as:"h5",children:l("No votes found")})})]})},ye=n(224);t.default=function(){var e=Object(l.i)().id,t=Object(d.a)(e),n=Object(p.b)().t,c=Object(i.c)().account,r=Object(j.b)(),o=Object(d.d)(e),w=Object(d.e)(),y=Object(d.b)(),k=c&&o.some((function(e){return e.voter.toLowerCase()===c.toLowerCase()})),S=null!==t&&void 0!==t?t:{},B=S.id,C=void 0===B?null:B,L=S.snapshot,D=void 0===L?null:L,V=w===u.j.LOADING||y===u.j.LOADING;return Object(a.useEffect)((function(){r(Object(x.b)(e))}),[e,r]),Object(a.useEffect)((function(){C&&D&&r(Object(x.d)({proposalId:C,block:Number(D)}))}),[C,D,r]),t?Object(I.jsxs)(O.a,{py:"40px",children:[Object(I.jsx)(ye.a,{}),Object(I.jsx)(s.o,{mb:"40px",children:Object(I.jsx)(s.t,{as:b.b,to:"/voting",variant:"text",startIcon:Object(I.jsx)(s.c,{color:"primary",width:"24px"}),px:"0",children:n("Back to Vote Overview")})}),Object(I.jsxs)(g.a,{children:[Object(I.jsxs)(s.o,{children:[Object(I.jsxs)(s.o,{mb:"32px",children:[Object(I.jsxs)(s.Z,{alignItems:"center",mb:"8px",children:[Object(I.jsx)(v.a,{proposalState:t.state}),Object(I.jsx)(v.b,{isCoreProposal:Object(m.h)(t),ml:"8px"})]}),Object(I.jsx)(s.bb,{as:"h1",scale:"xl",mb:"16px",children:t.title}),Object(I.jsx)(s.o,{children:Object(I.jsx)(h.a,{children:t.body})})]}),!V&&!k&&t.state===u.g.ACTIVE&&Object(I.jsx)(be,{proposal:t,mb:"16px"}),Object(I.jsx)(we,{votes:o})]}),Object(I.jsxs)(s.o,{children:[Object(I.jsx)(A,{proposal:t}),Object(I.jsx)(N,{choices:t.choices,votes:o})]})]})]}):Object(I.jsx)(f.a,{})}}}]);
//# sourceMappingURL=16.7482335e.chunk.js.map