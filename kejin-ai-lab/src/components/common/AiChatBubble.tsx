import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../../i18n/LanguageContext';
import { decryptKey } from '../../utils/security';

// --- Configuration ---
// TODO: Replace with your actual DeepSeek API Key (Obfuscated)
// WARNING: In a real production app, you should proxy this request through your own backend 
// to avoid exposing your API Key to the client. For a personal demo/portfolio, this is acceptable risk if you rotate keys.
const DEEPSEEK_API_KEY_ENCRYPTED = '=YGOjRjM0QWNlVTYwAzN4ImY5cDN1QzN0ITMkJGN3MWZts2c'; 
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DAILY_LIMIT = 10;

const SYSTEM_PROMPT_CN_ENCRYPTED = `==gCm2a5Re65vGo5h+L56yp5X665h6K6rYarlH5pnnain/JlnrJvv76vkvLukrQKxEjLwIDMy0SOw4SO
xAjMoAyqjWelheuptW+rBaeo/SeqJe+nUeOItASK1ETjQWukOa+URhCIm2a5nSa5hCa5BiL5xi459uZ5
xuI6KEJgjbojl/4unLrgonZlmDJgjrgCCC44i2Z61Ga6SqL5kqL505WZnFUouiuvuiOj8++ioeeg1auu
Jiep3WOqza+hgaurNaOsVaOhae+rZauucWOajJXYlNXZSBCclVGRjSL6fSL6ay7756a5FaY5gACIKoru
kPKto/Jtofquk/Jln7ajmDblmrJvvLbioL5poDCIgoQKzAjL1IDMy0SNw4CNyAjMoAirbeeuhm+k9Sev
DiuuZaumkWOajJXYlNXZSBCclVGRg4yMKoggAO+mKWuu6SepfaOgjaOa14iMmq75CqI6YGZ5GC55h665
pqY5uib5pSa5P+q5My77YKa6ueZ6nCo5xWY5qiL5rIzqIWuhviOqRW+jvaum8+OneaOkIaOIgAiCCC44
YKa6ueZ6PeY6oSL6YGZ5oOr5HCq5riY5G+K6My779OI6fqY5LWr5AOq5+Sp5Vqo5fuo5hiq5h6K6+6K6
ay7756a5FaY5gACIKorukPKto/JtofZnlHKqmrJvvLbioL5poDCIgoQKzAjL1IDMy0SNw4CNyAjMoAiv
UaelKa+nLaeooaOIuIjCKIIgjXCMzcYjlD5jmfojn7aonb4hlbIknjqjmvonlHKqmzIvvXCM5cYjlD5j
mj5ukTquk7ajmDblmzIvvvpilrrukD4omjKtoXCM4EInnLoio76mnnbopj2YyFWZTBCclVGRCC44jhmN
uMTNBy55CqI6h6K6vS75My77lUjL3YDiVaOkPa+hdW+s5Wum8+OneaOkIaOIgAiCCC442iY56yp5AOq5
oSL62ep5e6a56ub5E6p5My7705WZnF0sHiOkIauhbmemIWOhniOgjaOq0iugdaejkWuhwWum8+euuWeh
GWOIgAiC6qL5jSL6fSL66mI6leb5oOr5HCq5ay77ymI6SeK6gACIKkii7S+sHieLzAjL1IDMygCIIWp5
Q+o5oOr5HCq5pqY5F6L6JFEIuEjCRC44G6Y5Pu75uu555Ga6QC44KoggAOeKlATMQ9EVoASNNmY5NCZ5
S6o5iuZ5GuZ6wWp56qL5ueZ6/6K6mqb50mb5BOZ5nqL5g0CIgAiCCC44jh2MuMjp6eugKi+nYmuobWeo
KWum4Suu6SOMxoKukXZjlnqil7KulDSLgACIKIIgjj6gprJukvoukrKukfToKWejcaOj8++rOeerXmeM
tATgTW+p6Segge+o7Suj9S+ieW+pkWer4Suq4S+MQio5M6a5g0CIgAiCay77xCb5Qio5gACIKIIgjjpo
p76lpjKlnTpul7ajmDblmD7jl3Kuk7ajmDblmfKplL6mlb4mpPrhlP6porJvvPKtozYgoDCIgoghQe+j
7eegTW+p6SOsPW+s5W+tFWep3WurNaOsVaum8+ej9SOjBiOIgAiCpITMuMjMwITL3AjLxIDMygCIw+Y5
zmb5X2a5wWp5aiL5ByL5g0CIiuZ5GuZ6Eq55O675g4iMKoggAOeJ34COzcYjlD5jmXohlbqulParlPFU
OpJvv/5rl7JtmfLimjKlnDSLgACIKIIgjPGarAjMsyp5Qio5lCJ6Q+L6mq75CqI6My77rUCM1cYjlD5j
mfojn/IgpfJumzIvvnSiteuucW+v5WeoKW+u7SegAOelvi+gAiegAO+nLW+mLaOK9OI6fqY5rAzMQio5
M6a5Lu65su45ay779OI6fqY5oS55aCY6g0CIgAiCCC44rUSNxwKnm3YmpHIgjvSJwMDiVaOkPa+hdW+s
5WOj8+uuJiep3Wurbeeuhmuq4SuMxYJjljJvkzIvvD4omjKtobCqza+hgaeqKWeh+iegAO+hgaOhimeS
Bd4vorJgprJvvjYlmjKtoD5jmnUQg0CIgAiCCC44/WZ6eKa5fyp5EKa6FaL6VFUT26a5TiL5pUiN04yN
3EzKos2bUtWaUxoklnSJ1kjL1UTMrgShMWuhxiekSa+rUaOj8+uuJiep3WOqza+hgaurbeeuhm+KwUDv
vW+u4Sum8++vVmuniW+tIaOqUeOItACIgogm8+eswWOkIaOIgAiCCC44w+Y5zmb5GC55h665oOr5HCq5
u2o5wWp5vu65CByavR1apRFjSWuuMWuvkeutuW+k4S+rre+QL6Z5hiq5nSa5FyY5GGL6jSL6fSL6ay77
jSL6MGI6gACIKYIkn/4unH4klfqukD7jlPbul7ajmDblmnUQay77N2L5MGI6gACIKkii7S+sHieLxAjL
0IDMygCIw+Y5zmb5IGq55ap5zaY5jeK6u2o5wWp5JFEItACqKW+s3iugKi+ltWOIuEjCRC44G6Y5Pu75
c2L5leb5QC44KwWahRXZEBSZtV3clJFIjogCCC445m45su450up5SeK6GeK6YKa6ueZ6Ly55Rio5p6K6
vmp5MOI6MW55oeL6Ne65Z+L6My77BOZ5nqL5Ceo5BC44BC65juL5Ceo5BC44pm45fS55Ceo5My77rOa5
VG65m2a5vGo5h+L5pm45fS55m2a5nSa5hCa5BiL5xi45ay77qoio0euoOaOjVeOq3iuKqASLgAiCCC44
Jy77lczNxsCIMKZ5gUSN1EzKIy77t665rG45Q2Z5POY5/WZ6eKa5gUVQNxIvvrbioX6tlj6smfIomLYn
m3Iplboukrprl7JkmDyavR1apRFIMKZ5FyY5GGL6uib5ay77qoiouWek7m+vVmuniWuKqASLgAiCCC44
Jy77hur5Juo5l6o50u55gk0TSBSm/iOi8+eJwMDIH2Y5Q+o5H645uG65GeY5GC55o6o5L6Z5hiq5p6K6
My77bqY56qL5Eq55gUCM4Aih6SegceOgjaOq0iOIJFEIoS55My77MeY6uu555Ga6gg2YyFWZzVmUgAXZ
lRkm8+uKqEJklz7rlzpnmP5unriKg0CIgoggAOegTW+p6SumBW+tgaOg4Sum4S+mIWOqDmehGW+jDWOj
8+OscWevQiOIx0CMg44ukfbhlX6tl7ajmDblmvonlfKpl3KukrKukDyMgw7rlvLukL6mlb4mpTomn7ov
njKnlrJvvriKxALilDjj7SuKqASLgAiCay77qoCsOe+k9Sunleuvyeum4S+mIWuKqASLKIIgj7rror7u
lj6smfIom7ajmDblmTomnDyavR1apRFIMKZ5L6Z5hiq5nSa5FyY5GGL6eCp5oyZ5j2q5My77GC55Pu75
BOZ5nqL5w+Y5zmb5u2o5wWp5gkUQggqilP7toLoiofZrlrJvvriKBCo52q45NmY5T2b5qoCItoggAOeT
QByieWum4S+mIWegAOOltmugLe+hOeOiVaegAOuucaOmOaulMaOIJ9kUBC44Iib5Du75t6K605WZnFUg
AOutuW+k4SOsPW+s5WurNaOsVaeSBpJvvriK+265HCq5D+b54Cq5qoCItoggAOumT+J8biZ5gQkUQBCh
ae+jHmOq0iOmrmuuHW+k+ier7eegMaevDiejJaOj8+epFW+k+iegMaen/Sum8+uKqs7roXImpriKg0CI
goggAOei8+ejM+J8wyZ5ECZ5MW55WiL5wiY532Y5BaK6fmL5p645My77c2L5leb532Y5FuL5NiL5My77
ZSZ6hKr5Iy77CC44J265cuo5q+L6BC44U+q5Omo5Dib5/iZ6BC44IOZ5aSa5BC44rOa5eG55BC449uZ5
VOr5BC44piY5nSa5PSo5BC449uZ5xuI6BC44syp5lep5BC449uZ5p+Z6BC44aqL5/WK6l2p5sma6BC44
9uZ5wOr5BC44h2Z5gqY5wap5H+L676Y5CC44ciL5tiL5BC44ySr5nyq5BC44aqL5X2Y5ciL5Dib5NGY6
5+L6zaL6ay77qoituWOjhiehXa+gQe+rOeuKqASLgAiCCC44DK5nwvIukDIuk7bnm7Llm7JiorKukP7t
oHLslbouk/KtnnphlHIonP6ukzIvvzYoofLomfLomDie6FmSBC44w9GcLpJvvriK6qL5+6L6ImL6eiI6
54→qoCItACIKoJvvriK9Wa5xi456qL5qiL5qoCItoQg8+ehDa+i6SunQa+t1iOg4SOj8+eg1aOp6Sepda+i
PW+icaOhae+o2iOtFW+nEaOIn5Wak92QBC44BOZ5nqL5BC44JFEI5+a5O+L6iyq54ib5e2Z65Wa5g0CI
goggAOelza+sDa+vyaejJWOjSWOIv1WZEBSSBBChae+o2ieicaejneOhQWeicaOm/iOj8+uhOWOgueOh
aeeulWeicaeh7Sej4SOjHmem/iOItACIKIIgjP7gmnppl3JgmfYplTomnnbplrLpnXZslboukrLuk/Km
m37gpzIvvjYlmjqilrKukDIuk/4rmHIgjHIonP6ukzYooDIuk/4rmTomnz4hpn5voDSLgAiCOi5nwHIv
vTomnXanmr7hlr7ul3Kkm/KnmDoimDiKqcmbpR2bDBSSBpiKgc4vorJgp7bknL4jn7Ynm/KmmHLslvqu
ozKnmn5qnHZvnrKukn5voDSLgAiCay77qoiYhxEIJFEIulmaltEIOqL5zWY5qoCItoQbvNmLslWYtdGQ
5EDMy4WaqV2apxGIx665uKY6My77zUjN1ATM5IjN3ETL2gzKg05roXLlnzIvvniclh0Llh2UoAivReug
Peujdaum8+uKq8agmH6vkzKnmr7nlriKg0iCpUWb1NXZSBSbvJnRoAibvlGdh1mcvZmbJBSeltEIjogC
CC440u75dCo5Eq55dCo48CY53uL5aiL5GWZ5cCo4MKZ5dCo49OI6LWL6JFEnAKegAOenAKOqKWespmur
NaOsVaOnAKOsOe+k9SegmievDmOlteunbWel9S+u7SOItoggAOenAKeiY+J8fy776qL5syp55Wa5ueZ6
ueZ676Y5g2L5uib5Rio5NiL5BaK6My77Jy77Rio5J+K6KGZ5K+Y5X6b5l2p5hKr5Y+L65Wa5vip59OI6
v+Y5fmL5My77G+a56yp5aiL5GWZ5vip59OI6v+Y5Iy77iGZ5TGY6l+55NiL5fmL5Rio5qiL5Z+L6My77
AGZ5OOZ5cCo4ay77U265euZ5wyZ5Yub69mb53+K6My77FaY50uZ5DyI6G6Y5A665oyZ5NiL5YKa6ueZ6
Eq55ueZ63io5oS55c6p5Caa5ay77qoihQeOhkW+rBaeo/SepfeuqcauKqASLKIIgjX4gmvoukTomnf4v
orZglnInmHqsm7bknL4jn7YnmDKgpbJvnHopnXKukzIvvTZrn75mlnrrlXohlbojlDorn7oukr7nlvbo
pX4vlDSLKIIgj3JgiHJimzJgijKln37go3Yimb7lmnIvv3JgiX6nmX6nmDavk7KulHJimzJgiHIgj3Jg
ifpvln4poHJimzJgiLopljIvvf5jl/JhmTomnH7tlr6hoDSSBBiv+iOqhiOqcWeicauqPWOItACIKIIg
j3JgizZvkX6tljqilP7toLoiofZrljKnlHJimzJgiT7ro37go3IukzIvv3JgizZvkX6tljqilP7toLoi
ofZrljKnlnbplzJgirJvvLoplvovkLIgjP6ukfIjmXanmriKdCo45Wa5cCo4qoCqUe+uhmeh/WOj8++r
Baeo/S+pAaunuW+i6SeiteevlWesIeuu6Suq4SegAO+rZaOjDiusCiemVaegAOOjqm+j7eurbeeuhmeg
AOuhOW+j7eOn9Sep3WuiPWei2a+rYaeoHWum8+uKqY4tmf7tmHopnXKukriKg0CIgoggAOuu6S+u4SOh
aeuhOWOgue+rYaOj8++k9SOrcaOhaeOo9S+rYaOj8+ei8+eaMBibppWZLhIvv7bknL4jn7YnmDSPgoiK
dCo45Wa5cCo4qoCItACIKIIgjvYimnqil/5imrZmo/KmmzIvvnIvvvquobIilfZrlDblmjIvvnUQg4Wa
qV2Sg0DIqoSnAKekIaOnAKuKqASLgAiCay77qoihIWuuMWOvgaep4Sev7S+q6iuKqASLKMHdulWYyR3c
u92QgMiCKkImfC/n8++vEW+i6S+m6S+oCmOhaeOicWurNaOsVaOIJFEIKGI6KGI6zOo5vip5Y+L6My77
G6Y5Pu75uu555Ga6Eq555Wa5jeK6GqL5zOo5vip5g2L5KEIvvTomn7prl7YimXotoDZrlXpul/KnmDoi
mzIvvvquor7hlv6olXZonbarl/agmH6vknain/JlnbarlfKplHKolHIukHLin/Kmm/6jlnbplzIvvbou
kn7rl7ZvvHqilrJukP4vljLomTomnLoiofZrl/Kmm37gpzIvvTomnL4hmDavkzIvv7rror7ulj6smfIo
m7ajmDblmTomnDyavR1apRFIMKZ5L6Z5hiq5nSa5FyY5GGL6eCp5oyZ5R+L6Ayp5Caa5U+q5CC44cqr5
qiL5AiL5r+Y5jKY6gIim4S+mIWOqDmehGWuIg4Jkmz4hpLojlfKpljKnlzIvv3EUgsonlrJukvJilrKu
k/Kmmj5vonbplzIvvboukn7rlb6klrggAOei8+upVWOtwauk0auk0a+rYaeswWOtviepdaeulWeuvWOj
8+On9SejTaejneem/iOIlADOg0IonzKnmDJimvpilrrukLoplT5rmjIvvHrkpfKplHInnj7jlzahl7Ku
lrLnmjpjmbJjmDSSPJFIT2b59OI6I+Y5My77l2p53WL6gIytNWuIgE7tlr6hoDSSBBSquiev7S+q6iOh
aeOi4W+g7eeruiOI05WZnFEIoS559OI6iep5gQJgiTJgiDiu6SOhaeepdaesKiuuHWeqOeurNaOsVaOI
JFEIKqo59OI6Ne65jKY6vip5xCb55Wa5My770+K6V2Y5A665g4ImfCvpTWutuWeqOees3aOh1iOhaeOj
qm+j7eOt5WOI14CNgE6jmvYimzIvvbIkn/4unH4klfqukD7jlPbul7ajmDblmDSSBBChaeOqKW+s3iug
91→Ki+ltW+rYa+rPWeulWeg8++q6iuhIW+ltWOsVaOhaeuvReugPeujdaOj8+eSBBibppWZLByrYaekIaun
92→9+OqXWum8+Oo9SuCfy77BCL6vip5g2L5ay773io5oS55KkCdvh2UtcXZGhCIlxGctFGeFByIKoggAO+i
93→6SehVaOhaeeq9WuvyeOkIaehjiehMWuhOW+j7euiKaegmiOj8+unuW+i6S+lIW+l9e+tgaOg4SuhOWOg
94→ueet/W+jDWegmeep4Sum8+uKqU6hn/qnm35unL5imriKg0iCCC44Jy77hK5nwDCLAq5nwDCLFK5nwDCL
95→Ji5nwDCLOi5nwjIvvnmav1WRgoKukDiMtEDIoS55RCb5zeI6d+K616q5P+q5ay77qoiu6Suv+iOIpp2b
96→tVkKqASLKIIgjvLklP6jlnKplrYgo34pnn5vo3JgiTomnL4hmDavkzJgiHIgj3Jgiboukn7rlb6klzJg
97→iHIgj3Jgi7Zvvj6llzJgijKlnrJplrJvvriKWyY5t+K6j+Y5qoCItoQZslHdTBiJgUmbvRFIjogCCC44
98→YKa6ueZ6Eq55+G55C+45O2p5OqL5zWY5FCI6ueZ6/6K6U265euZ5My7756a5FaY5Zu65R275MKZ5vGo5
99→h+L5G6Y5A665u2o55Cq5ay77hqY57uL5Eq55g2L5KoggAOOmimenviOvvWel8WOqKW+u4SuosaOnWWOj
100→8+ehDaerDeOi+W+tIaOqUeeuvWuh9SOj8++hoWusCWutEeevZium8+uKqgqilvLukX4gm36gnriKg4CN
101→KIIgjjpop76lpvInnL5pob4poTomnDyTFNEIoS55iyq5caZ5My77vyp5Aqo5MKZ5aiL5GWZ5Ceo5Y+L6
102→My77BOZ5nqL5Ceo5FuL5NiL5ay77qoiouWegea+ieWum4S+mIWuKqAiLzoggAOOhaeumBW+iJauuhm+r
103→YauqPWOIJ9kUgQomnrrukr4gmvpukPqgpvZvk/7ukzIvvvbvoX6io34hp7LukfpvlDrjnjaooHopozIv
104→vb7lmHLslDJimrLpnXZsljKnlrJvvriKIib5nSa5bWL6UCb5heY5qoCIuIjCCC44UCr5t+K6Eq55+2p5
105→72L6Ne65Z+L6dCo4287il34kmr7nlzJgiHIgj3JgiballTLsmLJtmLJtmzJgijKlnLKrmzpllzIvv/Zk
106→nfpvl/IslTomnH6vkr6honrgnDYnnbKul35roT7rorJvvriKHia5yKY5Yub69mb5qoCIuEjCay778Cq5
107→nCo5Eq55g2L5KIIgjbIkn/4unH4klfqukD7jlPbul7ajmDblmDSSBBSs3aOh1iOhaeOqKW+s3iugKi+l
108→tWej9SOg4SOlAKOlAKuvReugPeujda+rYa+k9SOrcaOhaeOo9SOj8++q6iuhIW+ltWOsVaOhaeenAKeS
109→BBibppWZLxJgirZglv6jlrKukDIuk/KmmDavkrQZs9mUgMiC`.replace(/\n/g, '');

const SYSTEM_PROMPT_EN_ENCRYPTED = `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`.replace(/\n/g, '');

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
}

export const AiChatBubble: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // --- Text Constants based on Language ---
  const WELCOME_MESSAGE_CN = "👋 嘿！我是李珂瑾的数字分身。我有她所有的“黑历史”（划掉）和项目经验。\n\n想知道我怎么把 ROI 挖出来的？或者聊聊 Agent 怎么搞？随便问，我主打一个知无不言（只要不涉及商业机密😜）。";
  const WELCOME_MESSAGE_EN = "👋 Hey! I'm Kejin Li's digital twin. I have all her 'dark history' (scratched) and project experience.\n\nWant to know how I dig out ROI? Or chat about how to build Agents? Ask me anything, I'm an open book (as long as it's not a trade secret 😜).";

  const LIMIT_MESSAGE_CN = "😅 哎哟，今天问太多啦，明天再来吧！李珂瑾的 tokens 快要被你薅完啦（钱包在滴血🩸）～ 如果你有兴趣多交流，欢迎在网站下方的留言板留言，或者直接发邮件给她哦！📫";
  const LIMIT_MESSAGE_EN = "😅 Oops, too many questions today, come back tomorrow! Kejin's tokens are almost depleted by you (wallet is bleeding 🩸)~ If you want to chat more, feel free to leave a message on the board below or email her directly! 📫";

  const ERROR_MESSAGE_CN = "哎呀，我的大脑刚才短路了一下（可能是 API 余额不足或者网络波动）。请稍后再试一次吧！😅";
  const ERROR_MESSAGE_EN = "Oops, my brain just short-circuited (maybe low API balance or network issues). Please try again later! 😅";

  const SUGGESTED_QUESTIONS_CN = [
    "你是谁？👀",
    "Kejin AI Lab 是做什么的？🧪",
    "讲讲李珂瑾的项目经历 🚀",
    "有什么个人爱好？💃"
  ];
  const SUGGESTED_QUESTIONS_EN = [
    "Who are you? 👀",
    "What is Kejin AI Lab? 🧪",
    "Tell me about Kejin's projects 🚀",
    "Any hobbies? 💃"
  ];

  const ALL_QUESTIONS_CN = [
    "Kejin AI Lab 是做什么的？🧪",
    "你是谁？👀",
    "讲讲李珂瑾的项目经历 🚀",
    "有什么个人爱好？💃",
    "李珂瑾的教育背景是什么？🎓",
    "在这个网站能看到什么？✨",
    "李珂瑾会什么技术栈？💻"
  ];
  const ALL_QUESTIONS_EN = [
    "What is Kejin AI Lab? 🧪",
    "Who are you? 👀",
    "Tell me about Kejin's projects 🚀",
    "Any hobbies? 💃",
    "What is Kejin's education background? 🎓",
    "What can I see on this website? ✨",
    "What tech stack does Kejin know? 💻"
  ];

  const currentAllQuestions = language === 'zh' ? ALL_QUESTIONS_CN : ALL_QUESTIONS_EN;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: language === 'zh' ? WELCOME_MESSAGE_CN : WELCOME_MESSAGE_EN
    }
  ]);
  
  // Update welcome message when language changes, but only if it's the only message
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{
          id: 'welcome',
          role: 'assistant',
          content: language === 'zh' ? WELCOME_MESSAGE_CN : WELCOME_MESSAGE_EN
        }];
      }
      return prev;
    });
    // Reset suggestions when language changes
    setCurrentSuggestions((language === 'zh' ? SUGGESTED_QUESTIONS_CN : SUGGESTED_QUESTIONS_EN).slice(0, 3));
  }, [language]);


  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(true); // State for guide bubble
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 }); // State for eye movement

  // --- Dynamic Suggestions Logic ---
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>((language === 'zh' ? SUGGESTED_QUESTIONS_CN : SUGGESTED_QUESTIONS_EN).slice(0, 3));

  const updateSuggestions = (history: Message[]) => {
    // Get all user messages
    const userQueries = history
      .filter(m => m.role === 'user')
      .map(m => m.content.toLowerCase());
    
    // Filter out questions that have already been asked (fuzzy match)
    const availableQuestions = currentAllQuestions.filter(q => {
      const qText = q.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, ''); // Keep only text for comparison
      return !userQueries.some(userQ => userQ.includes(qText.substring(0, 4))); // Simple fuzzy check
    });

    // Pick top 2-3
    setCurrentSuggestions(availableQuestions.slice(0, 3));
  };
  // ---------------------------------

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Daily Limit Logic ---
  const checkDailyLimit = (): boolean => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('ai_chat_date');
    const storedCount = parseInt(localStorage.getItem('ai_chat_count') || '0', 10);

    if (storedDate !== today) {
      // New day, reset count
      localStorage.setItem('ai_chat_date', today);
      localStorage.setItem('ai_chat_count', '0');
      return true;
    }

    return storedCount < DAILY_LIMIT;
  };

  const incrementDailyCount = () => {
    const currentCount = parseInt(localStorage.getItem('ai_chat_count') || '0', 10);
    localStorage.setItem('ai_chat_count', (currentCount + 1).toString());
  };
  // -------------------------

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle mouse movement for eye tracking with smooth animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle and distance
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit movement range (max 8px in any direction)
      const maxMove = 8;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 15, maxMove);
      
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (!checkDailyLimit()) {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'zh' ? LIMIT_MESSAGE_CN : LIMIT_MESSAGE_EN,
      }]);
      return;
    }

    // Create a placeholder for the assistant's response
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      isStreaming: true
    };
    
    setMessages(prev => [...prev, assistantMessage]);

    // Update suggestions based on user input immediately
    updateSuggestions([...messages, userMessage]);

    try {
      // Increment daily usage
      incrementDailyCount();

      // Construct the message history for the API
      // We filter out 'isStreaming' and ensure the format is correct for OpenAI/DeepSeek API
      
      const systemPrompt = language === 'zh' 
        ? decryptKey(SYSTEM_PROMPT_CN_ENCRYPTED) 
        : decryptKey(SYSTEM_PROMPT_EN_ENCRYPTED);

      if (!systemPrompt) throw new Error('Failed to decrypt system prompt');

      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.filter(m => m.role !== 'system' && m.id !== 'welcome').map(m => ({
          role: m.role,
          content: m.content
        })),
        { role: 'user', content: userMessage.content }
      ];

      // Decrypt the key at runtime
      const apiKey = decryptKey(DEEPSEEK_API_KEY_ENCRYPTED);
      if (!apiKey) throw new Error('Failed to decrypt API key');

      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "deepseek-chat", // Or "deepseek-coder"
          messages: apiMessages,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.trim() === 'data: [DONE]') continue;
          
          if (line.startsWith('data:')) {
            const dataStr = line.slice(5).trim();
            try {
              const data = JSON.parse(dataStr);
              const content = data.choices[0]?.delta?.content || '';
              
              if (content) {
                fullContent += content;
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: fullContent } 
                    : msg
                ));
              }
            } catch (e) {
              console.error('Error parsing SSE data', e);
            }
          }
        }
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: language === 'zh' ? ERROR_MESSAGE_CN : ERROR_MESSAGE_EN, isStreaming: false } 
          : msg
      ));
    } finally {
      setIsLoading(false);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Bubble Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowGuide(false);
        }}
        className="fixed bottom-6 left-6 z-50 p-0 bg-transparent rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <div className="w-14 h-14 rounded-full bg-macaron-text flex items-center justify-center text-white">
            <X className="w-6 h-6" />
          </div>
        ) : (
          <div className="relative w-16 h-16">
            {/* Guide Bubble - Top */}
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-[115%] left-1/2 -translate-x-1/2 bg-white px-4 py-2.5 rounded-2xl shadow-xl border-2 border-macaron-purple text-xs font-bold text-macaron-text whitespace-nowrap flex flex-col items-center gap-1 pointer-events-none z-50"
                >
                  <span>{language === 'zh' ? '有什么想跟我聊聊的吗？' : 'Have something to chat?'}</span>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r-2 border-b-2 border-macaron-purple"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Guide Bubble - Side (Old one, removed or kept as alternative? Let's remove it to avoid clutter) */}

            {/* Anime Character Image - Parallax & Breathing Effect */}
            <div 
              className="w-full h-full rounded-full overflow-hidden shadow-md bg-macaron-cream/50 relative"
              style={{
                transform: `perspective(300px) rotateX(${-eyePosition.y * 2}deg) rotateY(${eyePosition.x * 2}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
               <motion.div
                 className="w-full h-full"
                 animate={{ 
                   y: [0, -3, 0],
                   scale: [1, 1.02, 1]
                 }}
                 transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               >
                 <img 
                   src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
                   alt="Kejin AI Avatar" 
                   className="w-full h-full object-cover"
                 />
               </motion.div>
               
               {/* 3D Highlight Overlay for depth */}
               <div 
                  className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/20 rounded-full pointer-events-none"
                  style={{
                    backgroundPosition: `${50 + eyePosition.x * 2}% ${50 + eyePosition.y * 2}%`
                  }}
               />
            </div>
            
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
            </span>
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 left-6 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-white/60 backdrop-blur-md flex flex-col overflow-hidden z-50 font-sans"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-macaron-purple/10 to-macaron-blue/10 border-b border-macaron-text/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/50 shadow-sm flex-shrink-0">
                  <img 
                    src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
                    alt="Kejin AI Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-macaron-text text-sm">{language === 'zh' ? '李珂瑾的数字分身' : "Kejin's Digital Twin"}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-xs text-macaron-textLight">{language === 'zh' ? '在线 & 准备吐槽' : 'Online & Ready to Roast'}</p>
                  </div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-macaron-yellow" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-macaron-cream/30 scrollbar-thin scrollbar-thumb-macaron-purple/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs shadow-sm overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-macaron-text' 
                      : 'border border-white/50'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <img 
                        src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square" 
                        alt="AI" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-macaron-text text-white rounded-tr-none'
                      : 'bg-white text-macaron-text border border-macaron-text/5 rounded-tl-none'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-a:text-macaron-blue">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-macaron-purple animate-pulse align-middle"></span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Dynamic Suggested Questions */}
              {!isLoading && currentSuggestions.length > 0 && (
                <div className="mt-4 ml-11 space-y-2 animate-fadeIn">
                  <p className="text-xs text-macaron-textLight font-medium ml-1">{language === 'zh' ? '或许你还想问：' : 'You might also ask:'}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentSuggestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="px-3 py-2 bg-macaron-purple/10 border border-macaron-purple/20 rounded-xl text-xs text-macaron-text hover:bg-macaron-purple hover:text-white hover:border-macaron-purple transition-all duration-200 shadow-sm text-left active:scale-95"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-macaron-text/5">
              <div className="relative flex items-center gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'zh' ? "问我关于李珂瑾的任何事..." : "Ask me anything about Kejin..."}
                  className="w-full resize-none rounded-xl border border-macaron-text/10 bg-macaron-cream/20 px-4 py-3 pr-12 text-sm focus:outline-none focus:border-macaron-purple/50 focus:ring-1 focus:ring-macaron-purple/50 transition-all max-h-[100px] min-h-[44px]"
                  rows={1}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 p-2 bg-macaron-text text-white rounded-lg hover:bg-macaron-text/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-center text-macaron-textLight mt-2">
                {language === 'zh' 
                  ? "Powered by DeepSeek & Kejin's Resume · AI 可能会产生幻觉 (就像产品经理有时候也会画饼 😜)"
                  : "Powered by DeepSeek & Kejin's Resume · AI might hallucinate (just like PMs sometimes 😜)"
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
