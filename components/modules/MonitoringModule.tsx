'use client'
import { useState, useEffect, useRef } from 'react'

const C = {
  orange:'#F97316',orangeDark:'#EA580C',orangeLight:'#FFEDD5',orangeDim:'#FFF7ED',
  green:'#16A34A',greenLight:'#DCFCE7',blue:'#2563EB',blueLight:'#DBEAFE',
  red:'#DC2626',redLight:'#FEE2E2',amber:'#D97706',amberLight:'#FEF3C7',
  teal:'#0D9488',tealLight:'#CCFBF1',purple:'#7C3AED',purpleLight:'#EDE9FE',
  text:'#1C1107',muted:'#78716C',subtle:'#A8A29E',border:'#EDE9E3',bg:'#F8F7F4',
}

// ── KML DATA ─────────────────────────────────────────────────────────────────
type NodeType = 'FDT'|'FDC'|'FAT'|'ODP'|'OLT'|'OTHER'
interface KMLPoint { name:string; lat:number; lng:number; type:NodeType }
interface KMLLine  { name:string; coords:[number,number][] }

const KML_POINTS: KMLPoint[] = [{"name":"FDT 01","lat":-7.563679160942063,"lng":112.6454883237867,"type":"FDT"},{"name":"FAT 12/03/04 DARWANTI","lat":-7.557623846689475,"lng":112.6441582957418,"type":"FAT"},{"name":"FAT 12/03/02 SHOLEH","lat":-7.557708039131072,"lng":112.6468432786541,"type":"FAT"},{"name":"FAT-MULYADI 01/02/05","lat":-7.563651244440139,"lng":112.6406431075315,"type":"FAT"},{"name":"FAT 12/03/03 ANTON","lat":-7.556386082022342,"lng":112.6454459497664,"type":"FAT"},{"name":"FDC 01/02 GANTENG","lat":-7.563055468899528,"lng":112.6425923414982,"type":"FDC"},{"name":"FAT 01/02/02 IKHWAN","lat":-7.561244044359017,"lng":112.6431783314833,"type":"FAT"},{"name":"FAT 01/02/03 GARENG","lat":-7.56071977375451,"lng":112.6440147874528,"type":"FAT"},{"name":"FAT 02/01/02 WAHYU","lat":-7.560995495314911,"lng":112.6343230442264,"type":"FAT"},{"name":"METRO LA","lat":-7.564027485426595,"lng":112.6473143479708,"type":"OLT"},{"name":"FDC 12/01 PEREMPATAN MI","lat":-7.559541810316435,"lng":112.6455343905877,"type":"FDC"},{"name":"FDC 01/01","lat":-7.563663103420362,"lng":112.6455128183147,"type":"FDC"},{"name":"FAT MI 12/","lat":-7.558458233928903,"lng":112.6458022685947,"type":"FAT"},{"name":"FAT 12/01/01 PEREMPATAN MI","lat":-7.559554454101912,"lng":112.6455240226786,"type":"FAT"},{"name":"FAT YUDHA BENGKEL 11/07/01","lat":-7.560158564929132,"lng":112.6494949059602,"type":"FAT"},{"name":"FAT SDN WATES2 11/07/04","lat":-7.560693786315076,"lng":112.651830287523,"type":"FAT"},{"name":"FAT RORO 11/02/01","lat":-7.562387588645406,"lng":112.6490771378034,"type":"FAT"},{"name":"FAT LEK TUTIK 11/04/01","lat":-7.564233938880787,"lng":112.6570584865919,"type":"FAT"},{"name":"FAT PERTIGAAN PWONG 11/05/01","lat":-7.564734146506541,"lng":112.6580469189891,"type":"FAT"},{"name":"FAT P WONG 11/05/02","lat":-7.563415479912437,"lng":112.6586159063932,"type":"FAT"},{"name":"FAT WINDARTI 11/04/02","lat":-7.563709806852835,"lng":112.6563597137919,"type":"FAT"},{"name":"FAT SAWOK 11/03/01","lat":-7.565467699083806,"lng":112.6563627382755,"type":"FAT"},{"name":"FAT ROHMAN DATENG 09/02/03","lat":-7.564793813694324,"lng":112.6514061402359,"type":"FAT"},{"name":"FDC 09/02 GAPURA","lat":-7.564641295133132,"lng":112.6493520190628,"type":"FDC"},{"name":"FDC 04/01 BUHROM","lat":-7.566936894515125,"lng":112.6485185559687,"type":"FDC"},{"name":"FAT BONAWI 04/01/01","lat":-7.566458861572981,"lng":112.6487005978483,"type":"FAT"},{"name":"FAT MINHAJUL 09/04","lat":-7.566812326490289,"lng":112.6480923433112,"type":"FAT"},{"name":"FAT KEVIN 04/01/03","lat":-7.568742889593829,"lng":112.6478843376515,"type":"FAT"},{"name":"FAT ANIK 04/01/04","lat":-7.569277100683474,"lng":112.6474259943085,"type":"FAT"},{"name":"FAT IDA 04/01/05","lat":-7.56914380324144,"lng":112.6466478191752,"type":"FAT"},{"name":"FAT ROBI 10/02/01","lat":-7.567385398862513,"lng":112.6467604605965,"type":"FAT"},{"name":"FAT SUMARIYADI 10/03/01","lat":-7.56745942470025,"lng":112.6471247734064,"type":"FAT"},{"name":"FAT OM DIKIN 10/01/01","lat":-7.567077162582932,"lng":112.6459893883219,"type":"FAT"},{"name":"FAT LILIK 10/04/01","lat":-7.566246884027609,"lng":112.6457245282106,"type":"FAT"},{"name":"FDC LILIK 10/04","lat":-7.566261773909432,"lng":112.645725582886,"type":"FDC"},{"name":"FDC ROBI 10/02","lat":-7.567390715289516,"lng":112.6467630704904,"type":"FDC"},{"name":"FAT HARUN 10/03/02","lat":-7.568085404596427,"lng":112.6470434387793,"type":"FAT"},{"name":"FAT JOKO SUSANTO 10/04/02","lat":-7.565896401963172,"lng":112.6453446401904,"type":"FAT"},{"name":"FAT MASJID 09/01/01","lat":-7.565452178822624,"lng":112.6459770110284,"type":"FAT"},{"name":"FAT INDAH BIDAN 11/01/01","lat":-7.565094575763627,"lng":112.6491495845309,"type":"FAT"},{"name":"FAT MAMIK 11/01/03","lat":-7.564484211247698,"lng":112.6488973057003,"type":"FAT"},{"name":"FAT MISDI 09/02/02","lat":-7.565048452764287,"lng":112.6544949650065,"type":"FAT"},{"name":"FAT BABUR 01/02/04","lat":-7.563389012548799,"lng":112.6431863129899,"type":"FAT"},{"name":"FAT ARI JUNAEDI 11/07/02","lat":-7.560809962443694,"lng":112.6500283788291,"type":"FAT"},{"name":"FAT 09/03/02 GAPURA","lat":-7.56397828450535,"lng":112.6462295170104,"type":"FAT"},{"name":"FAT ANITA 11/03/02","lat":-7.566316971767231,"lng":112.6582106683376,"type":"FAT"},{"name":"FAT 02/01/01 JAYUS","lat":-7.56033389161891,"lng":112.6345559171989,"type":"FAT"},{"name":"FDC 03/01","lat":-7.548230874828767,"lng":112.6348067583984,"type":"FDC"},{"name":"FAT 03/04/05 (ANANG KANDANG)","lat":-7.552978103312018,"lng":112.6416017188902,"type":"FAT"},{"name":"FAT 03/02/01 (DULAMIN)","lat":-7.549125445589365,"lng":112.6381259900041,"type":"FAT"},{"name":"FAT PAIKAN 11/01/02","lat":-7.565044705689492,"lng":112.6476147547655,"type":"FAT"},{"name":"FAT 03/01/02 (ENDIK)","lat":-7.548506198523342,"lng":112.6362269424003,"type":"FAT"},{"name":"FAT 03/01/03 (DENDY)","lat":-7.549063175763331,"lng":112.6363731103405,"type":"FAT"},{"name":"FDT 06","lat":-7.542424336266749,"lng":112.6345343147304,"type":"FDT"},{"name":"FAT 06/01/04 (ILHAM FATWA)","lat":-7.54126395954164,"lng":112.6335279372692,"type":"FAT"},{"name":"FAT  06/01/01 (TAMTO)","lat":-7.542416875786651,"lng":112.6345536243574,"type":"FAT"},{"name":"FAT 06/01/03 (LINDA)","lat":-7.541849702766569,"lng":112.6351426096274,"type":"FAT"},{"name":"FAT 06/03/01 (FARIS)","lat":-7.543324639245575,"lng":112.6385686146191,"type":"FAT"},{"name":"FAT 06/02/03(MAULANA )","lat":-7.542347285520909,"lng":112.6330883646061,"type":"FAT"},{"name":"FAT 06/02/01 (PRAYIT)","lat":-7.541755336407454,"lng":112.6329629024989,"type":"FAT"},{"name":"FAT 06/04/01 (RISTANTI)","lat":-7.541030048100401,"lng":112.6327064128805,"type":"FAT"},{"name":"FAT  06/02/02 (LASIANTO)","lat":-7.541508023861573,"lng":112.6324832029153,"type":"FAT"},{"name":"FAT  03/03/01 (HENI)","lat":-7.539953298124986,"lng":112.6312528220623,"type":"FAT"},{"name":"FAT 03/04/01 DIHAR","lat":-7.533861663985141,"lng":112.6184610953179,"type":"FAT"},{"name":"FAT 05/01/02 RISA","lat":-7.553079315507428,"lng":112.6122519675087,"type":"FAT"},{"name":"FAT 05/01/04 HERU","lat":-7.553044406188267,"lng":112.6109393092128,"type":"FAT"},{"name":"FAT 05/03/02 DIDIK","lat":-7.550147455562894,"lng":112.6148814758635,"type":"FAT"},{"name":"FAT BAGUS ANANTA 05/04/02","lat":-7.550615389864144,"lng":112.6165799394914,"type":"FAT"},{"name":"FAT IRFAN 05/04/01","lat":-7.550856376772375,"lng":112.6172767616478,"type":"FAT"},{"name":"FAT PUTRI 05/04/03","lat":-7.549382455839127,"lng":112.6170362897008,"type":"FAT"},{"name":"FAT 08/01/01 NISA","lat":-7.535151116001786,"lng":112.5966714896413,"type":"FAT"},{"name":"FAT 08/06/03 AYUNDA","lat":-7.536629344388325,"lng":112.5972852937246,"type":"FAT"},{"name":"FAT 08/06/01 BHATARA","lat":-7.537995149761288,"lng":112.5977413301435,"type":"FAT"},{"name":"FDC 08/06 BALDES PURWOJATI","lat":-7.538659353968471,"lng":112.5997660301207,"type":"FDC"},{"name":"FAT 08/06/02 ROZAK","lat":-7.539657400125034,"lng":112.600134471295,"type":"FAT"},{"name":"FAT 08/05/03 WIWIN","lat":-7.544024262382912,"lng":112.604029085444,"type":"FAT"},{"name":"FAT 08/05/01 BAMBANG","lat":-7.541140365046536,"lng":112.6054675450525,"type":"FAT"},{"name":"FAT 08/03/04 SUBUR","lat":-7.540581048731212,"lng":112.603714516389,"type":"FAT"},{"name":"FAT 08/03/03 IMAS","lat":-7.539822305402257,"lng":112.6038656412222,"type":"FAT"},{"name":"FAT 08/03/01 IRA","lat":-7.539545031028135,"lng":112.6031649141258,"type":"FAT"},{"name":"FAT 08/03/02 PULUNG","lat":-7.539141262303621,"lng":112.6023845341584,"type":"FAT"},{"name":"FAT 08/04/02 JOHAN","lat":-7.540004556550898,"lng":112.605351723374,"type":"FAT"},{"name":"FAT 08/04/03 ISWATIN","lat":-7.540172718005395,"lng":112.6066163238062,"type":"FAT"},{"name":"FAT 08/05/02 EM WARUNG","lat":-7.541388631930547,"lng":112.6066140403426,"type":"FAT"},{"name":"FAT 08/07/01 NINIK","lat":-7.541794682865087,"lng":112.6079408391846,"type":"FAT"},{"name":"FAT NASRULLAH 07/02/02","lat":-7.545918104279004,"lng":112.6065839701477,"type":"FAT"},{"name":"FAT LALA 07/02/01","lat":-7.547413834148099,"lng":112.605984139257,"type":"FAT"},{"name":"Fat 03/03/03","lat":-7.534920260673325,"lng":112.6210126566796,"type":"FAT"},{"name":"FAT P PAWIT 10/01","lat":-7.566377678611148,"lng":112.646397572939,"type":"FAT"},{"name":"FDC 02/01 BUNDA","lat":-7.560304484844943,"lng":112.634580443842,"type":"FDC"},{"name":"FDT 02","lat":-7.559993081719701,"lng":112.6340115942051,"type":"FDT"},{"name":"FDC 02/02","lat":-7.55923732472453,"lng":112.6324411170327,"type":"FDC"},{"name":"FDC TAMTO 06/01","lat":-7.542428452384411,"lng":112.6345701150854,"type":"FDC"},{"name":"FAT 06/01/02 (jun)","lat":-7.54244219058879,"lng":112.6347962392897,"type":"FAT"},{"name":"FDT 05","lat":-7.550345512000629,"lng":112.6130951574762,"type":"FDT"},{"name":"FAT 05/01/01","lat":-7.551890886319181,"lng":112.6125608670066,"type":"FAT"},{"name":"FDC 04/02","lat":-7.551214762131341,"lng":112.6223402018311,"type":"FDC"},{"name":"FAT 02/02/02","lat":-7.555843643795138,"lng":112.626133805542,"type":"FAT"},{"name":"FDC 03/03","lat":-7.539882393249506,"lng":112.6312755343898,"type":"FDC"},{"name":"FDC 06/02","lat":-7.54197617470897,"lng":112.6328198026097,"type":"FDC"},{"name":"FDC 06/03","lat":-7.543379481424115,"lng":112.6386090823015,"type":"FDC"},{"name":"FDC 06/04","lat":-7.541038508934403,"lng":112.6327554832105,"type":"FDC"},{"name":"FDC 03/02","lat":-7.549091175927026,"lng":112.6380215827578,"type":"FDC"},{"name":"FDC 03/04","lat":-7.552973934987338,"lng":112.6415731239351,"type":"FDC"},{"name":"Fat 03/03/02","lat":-7.536143829779967,"lng":112.623781523007,"type":"FAT"},{"name":"FAT 02/02/01","lat":-7.558079100739121,"lng":112.6301668987084,"type":"FAT"},{"name":"FDC 05/03 NURFAIDAH","lat":-7.550778804585181,"lng":112.6147015219299,"type":"FDC"},{"name":"FDT 07","lat":-7.548208405356573,"lng":112.6081206423057,"type":"FDT"},{"name":"FDC 07/06","lat":-7.544596947861739,"lng":112.5983594184018,"type":"FDC"},{"name":"FAT 08/07/02 MUHIDIN","lat":-7.542162253248323,"lng":112.6092663704279,"type":"FAT"},{"name":"FAT JURANG 07/07/01","lat":-7.545285111201935,"lng":112.5982360671931,"type":"FAT"},{"name":"FAT CHALIM 09/01/02","lat":-7.56566628939248,"lng":112.646773315073,"type":"FAT"},{"name":"FAT KHIMER 10/01/02","lat":-7.568621528041449,"lng":112.646070910045,"type":"FAT"},{"name":"FAT MAWALDI 11/07/03","lat":-7.558875074224009,"lng":112.6501071528304,"type":"FAT"},{"name":"FAT 01/02/01 PURWANTO","lat":-7.561685566462887,"lng":112.6430473881571,"type":"FAT"},{"name":"FAT 02/02/03 ARYA","lat":-7.554203019197744,"lng":112.6228361771636,"type":"FAT"},{"name":"SERVER  Seloliman","lat":-7.602629371452445,"lng":112.5872191911193,"type":"OLT"},{"name":"FAT 01/01/01-1 BU RUJAK","lat":-7.602748666502936,"lng":112.5873315791373,"type":"FAT"},{"name":"FDC 01/02 AGH 01","lat":-7.601485100081325,"lng":112.5907148607231,"type":"FDC"},{"name":"FAT 01/02/01  ROSSY AGH","lat":-7.602713675304402,"lng":112.5909368659694,"type":"FAT"},{"name":"FDC 01/03 JAYUS","lat":-7.6000144859084,"lng":112.5906174764113,"type":"FDC"},{"name":"FDC 01/04 JUNAEDI","lat":-7.598002538306314,"lng":112.5921809836128,"type":"FDC"},{"name":"FAT 01/04/02 MISTRI","lat":-7.597829580997527,"lng":112.592890799235,"type":"FAT"},{"name":"FDC 01/05 SUWANTO","lat":-7.597251793096895,"lng":112.5931898196135,"type":"FDC"},{"name":"FAT 01/05/02  RUMAH SUWANTO","lat":-7.597147380255803,"lng":112.5931550658971,"type":"FAT"},{"name":"FAT 01/05/03 ITA","lat":-7.596113734504702,"lng":112.5933191544434,"type":"FAT"},{"name":"FAT 01/05/04 SAFIRA","lat":-7.595016869398838,"lng":112.5935025621798,"type":"FAT"},{"name":"FAT 01/01/03 KAVLING JOLOTUNDO","lat":-7.607341354471394,"lng":112.5881912046213,"type":"FAT"},{"name":"FAT 02/02/01 LOKET BAWAH","lat":-7.60803744745789,"lng":112.5930708381716,"type":"FAT"},{"name":"FAT 02/02/02 LOKET ATAS","lat":-7.60909488955604,"lng":112.5952950844928,"type":"FAT"},{"name":"FAT 02/01/02/01-01 SHOFI","lat":-7.604014788729789,"lng":112.5824722301527,"type":"FAT"},{"name":"FDC 02/01/02 BENGKEL","lat":-7.604097027335499,"lng":112.5819986177812,"type":"FDC"},{"name":"FAT 02/01/01 P SALAM","lat":-7.604527650989379,"lng":112.5819674425746,"type":"FAT"},{"name":"FAT 02/01/02/04 LAILA","lat":-7.603437921067224,"lng":112.5815585288679,"type":"FAT"},{"name":"FAT 02/01/02/03 IIN","lat":-7.604190626058061,"lng":112.5812543798331,"type":"FAT"},{"name":"FDC 02/03 MAK KIN","lat":-7.609812809592833,"lng":112.5843909418519,"type":"FDC"},{"name":"FAT 02/04/02-02 ULFA","lat":-7.610029884957486,"lng":112.5817735109482,"type":"FAT"},{"name":"FAT 01/01/03 IDA","lat":-7.59916827981769,"lng":112.5844045689222,"type":"FAT"},{"name":"ODP MASJID","lat":-7.602804741659905,"lng":112.5864442634627,"type":"ODP"},{"name":"FAT 02/01/02/01 BENGKEL","lat":-7.60409960368114,"lng":112.5819843588808,"type":"FAT"},{"name":"FDT 02","lat":-7.602667359284269,"lng":112.5872002958512,"type":"FDT"},{"name":"FAT 01/04/01 JUNAEDI","lat":-7.597971939653949,"lng":112.5921613543999,"type":"FAT"},{"name":"FAT 01/05/01 BOX SUWANTO","lat":-7.597219069611767,"lng":112.5932117980952,"type":"FAT"},{"name":"FAT 02/03/01 MAK KIN","lat":-7.609836027877353,"lng":112.584370341178,"type":"FAT"},{"name":"FDC 02/02 LOKET BAWAH","lat":-7.608036658790224,"lng":112.5930586707242,"type":"FDC"},{"name":"FAT 01/03/01 JAYUS","lat":-7.599998974321755,"lng":112.5906186137783,"type":"FAT"},{"name":"FDT 01","lat":-7.602665407502768,"lng":112.58722336766,"type":"FDT"},{"name":"FAT IRAWATI 01/01/01","lat":-7.564035328123945,"lng":112.6473111462881,"type":"FAT"},{"name":"FDC 12/03 PERTIGAAN SOLEH","lat":-7.557415458404595,"lng":112.6455541571109,"type":"FDC"},{"name":"FAT 12/03/01 PERTIGAAN SOLEH","lat":-7.557434737138209,"lng":112.6455604933102,"type":"FAT"},{"name":"FAT 04/02/01","lat":-7.553413109853917,"lng":112.6211479171416,"type":"FAT"},{"name":"FAT 01/01/01-2 TK DHARMA","lat":-7.60189799972427,"lng":112.5890852720048,"type":"FAT"},{"name":"FAT 08/04/01 SLAMET","lat":-7.54051047603761,"lng":112.6085386832436,"type":"FAT"},{"name":"FDT 08 RUMAH NGIJINGAN","lat":-7.53508880515498,"lng":112.5967349939954,"type":"FDT"},{"name":"FDC 08/01 RUMAH NGIJINGAN","lat":-7.535118518474272,"lng":112.5967677844137,"type":"FDC"},{"name":"FDC 08/02","lat":-7.540089848396045,"lng":112.5997002654406,"type":"FDC"},{"name":"FDC 08/03 IRA","lat":-7.53957212040383,"lng":112.6032100001908,"type":"FDC"},{"name":"FDC 08/04 JOHAN","lat":-7.539978794982425,"lng":112.6052925233908,"type":"FDC"},{"name":"FDC 08/05 BAMBANG","lat":-7.5411191898738,"lng":112.605405377872,"type":"FDC"},{"name":"FDC 08/07 NINIK","lat":-7.54179209486768,"lng":112.6079186449446,"type":"FDC"},{"name":"FAT 07/03/01 UMAR","lat":-7.546613860722664,"lng":112.6032104296521,"type":"FAT"},{"name":"FDC 07/04 MAKSUM","lat":-7.549615881164768,"lng":112.6022520736156,"type":"FDC"},{"name":"FAT 07/05/01 DANY","lat":-7.549333812833437,"lng":112.6005137095876,"type":"FAT"},{"name":"FAT 07/04/03 ARIF","lat":-7.55070607895063,"lng":112.6036722035293,"type":"FAT"},{"name":"FAT 07/04/02 MUHAIMIN","lat":-7.54982819879004,"lng":112.6035067205713,"type":"FAT"},{"name":"FAT 07/05/02 NONIK","lat":-7.549599928011816,"lng":112.5997542254251,"type":"FAT"},{"name":"FAT 07/03/02 MASJID","lat":-7.548115622778115,"lng":112.6026762798646,"type":"FAT"},{"name":"FAT 07/04/01 MAKSUM","lat":-7.549627491264649,"lng":112.6022033204027,"type":"FAT"},{"name":"FDC 09/03 TIS","lat":-7.563818504205467,"lng":112.6462307586988,"type":"FDC"},{"name":"FAT 09/03/01 TIS","lat":-7.563810552624081,"lng":112.6462662505362,"type":"FAT"},{"name":"FDC 02/01 SEMPUR","lat":-7.60453072799331,"lng":112.581985897782,"type":"FDC"},{"name":"FDC 07/07","lat":-7.545287327806395,"lng":112.5982063069827,"type":"FDC"},{"name":"FAT DELTA 07/07/02","lat":-7.545694541321613,"lng":112.5986679114179,"type":"FAT"},{"name":"FAT RIZKY 05/05/01","lat":-7.548986657032644,"lng":112.6157381084509,"type":"FAT"},{"name":"FAT 05/05/01 BAHRUL","lat":-7.548841843142096,"lng":112.6148199351493,"type":"FAT"},{"name":"FDT 09 HSGQ","lat":-7.566383194007811,"lng":112.646364820635,"type":"FDT"},{"name":"FDC 09/01","lat":-7.565441679939446,"lng":112.6459571324222,"type":"FDC"},{"name":"FAT 09/02/01 PINANGGIH","lat":-7.564660119873024,"lng":112.6498022190676,"type":"FAT"},{"name":"FDT 10 HIOSO MANDURO","lat":-7.5664068977187,"lng":112.6463581465196,"type":"FDT"},{"name":"FDC 10/01 OM DIKIN","lat":-7.567076092193425,"lng":112.6460128024832,"type":"FDC"},{"name":"FDC ELIS 01/03","lat":-7.550701020292267,"lng":112.658982260552,"type":"FDC"},{"name":"FDT 01 PORONG","lat":-7.550041370163458,"lng":112.6593252148877,"type":"FDT"},{"name":"FDC 01/01 AYU","lat":-7.549996135497891,"lng":112.6592638067635,"type":"FDC"},{"name":"FAT 01/01/02 SUMARLIM","lat":-7.548563879842186,"lng":112.6569067796226,"type":"FAT"},{"name":"FAT 01/01/01","lat":-7.549988588569733,"lng":112.6592784072192,"type":"FAT"},{"name":"FDC KASTAMUN 01/02","lat":-7.548724,"lng":112.658625,"type":"FDC"},{"name":"FAT 01/02/01","lat":-7.54875025067613,"lng":112.6586201184099,"type":"FAT"},{"name":"FAT ELIS 01/03/01","lat":-7.550698831182306,"lng":112.6589947061424,"type":"FAT"},{"name":"FAT UNIMA 01/03/02","lat":-7.551491968525241,"lng":112.6596387683845,"type":"FAT"},{"name":"FDC SUMARIYADI 10/03","lat":-7.567462196959586,"lng":112.6471193744912,"type":"FDC"},{"name":"FAT MAURI 04/01/02","lat":-7.567194676962207,"lng":112.6482868491604,"type":"FAT"},{"name":"FDC BIDAN 11/01","lat":-7.5650916374979,"lng":112.6491430551922,"type":"FDC"},{"name":"FAT Yohanes 11/05/03","lat":-7.565670777018711,"lng":112.6596580806047,"type":"FAT"},{"name":"FDC 11/03 SAWOK","lat":-7.565449881702857,"lng":112.6563347874416,"type":"FDC"},{"name":"FDC LEK TUTIK 11/04","lat":-7.564240697741369,"lng":112.6570476846377,"type":"FDC"},{"name":"FDC PERTIGAAN P WONG 11/05","lat":-7.564740069993791,"lng":112.6580229785408,"type":"FDC"},{"name":"FDC RORO 11/02","lat":-7.562392659507958,"lng":112.6490848624326,"type":"FDC"},{"name":"FAT AULIA 11/02/02","lat":-7.561901713989847,"lng":112.6477938012171,"type":"FAT"},{"name":"FDC YUDHA 11/07","lat":-7.560163021948959,"lng":112.6494940125653,"type":"FDC"},{"name":"FDC 05/05","lat":-7.549060063965926,"lng":112.6156948752262,"type":"FDC"},{"name":"FDC 05/04 IRFAN","lat":-7.550842413603394,"lng":112.6172500622382,"type":"FDC"},{"name":"FAT 02/04/02-01SUYATMI","lat":-7.610438611568974,"lng":112.5823381024682,"type":"FAT"},{"name":"FDT 11 BIDAN","lat":-7.565111616597417,"lng":112.6491334940114,"type":"FDT"},{"name":"FAT 05/03/01 NURFAIDAH","lat":-7.550770104893664,"lng":112.614655255315,"type":"FAT"},{"name":"FDC 07/05","lat":-7.549302951139043,"lng":112.6005190052954,"type":"FDC"},{"name":"FAT 02/01/02/02 HMD","lat":-7.60135824880081,"lng":112.5817418695216,"type":"FAT"},{"name":"FDC 03/04","lat":-7.534175695396816,"lng":112.6194418894129,"type":"FDC"},{"name":"FDC 01/01 SERVER","lat":-7.60268396026598,"lng":112.5872388228622,"type":"FDC"},{"name":"BOX SERVER","lat":-7.602689049744557,"lng":112.5871782456539,"type":"OLT"},{"name":"FDT 12","lat":-7.558409984299391,"lng":112.6457741856668,"type":"FDT"},{"name":"FAT 01/01/01","lat":-7.549988588569733,"lng":112.6592784072192,"type":"FAT"},{"name":"FDC 04/02","lat":-7.553429840452995,"lng":112.6211501058917,"type":"FDC"},{"name":"FDT 03","lat":-7.548212272140153,"lng":112.6348352283891,"type":"FDT"},{"name":"FAT 03/01/01","lat":-7.548623981951369,"lng":112.6346855431303,"type":"FAT"},{"name":"FDC 03/02","lat":-7.553241845245548,"lng":112.6338640015846,"type":"FDC"},{"name":"FAT 04/01","lat":-7.552393244952408,"lng":112.6192232348531,"type":"FAT"},{"name":"FDC 05/01","lat":-7.550271360713551,"lng":112.6130889668774,"type":"FDC"},{"name":"FDC 07/01","lat":-7.54826874159093,"lng":112.608195606769,"type":"FDC"},{"name":"FDC 07/02","lat":-7.547340593958293,"lng":112.6060733168386,"type":"FDC"},{"name":"FDC 07/03","lat":-7.546611298113351,"lng":112.6032262777921,"type":"FDC"},{"name":"FDT 08 RUMAH NGIJINGAN","lat":-7.53508880515498,"lng":112.5967349939954,"type":"FDT"},{"name":"FDC 09/03 TIS","lat":-7.563818504205467,"lng":112.6462307586988,"type":"FDC"},{"name":"FAT 09/03/01 TIS","lat":-7.563810552624081,"lng":112.6462662505362,"type":"FAT"}]

const KML_LINES: KMLLine[] = [{"name":"kabel distribusi  12 core adss","coords":[[-7.566492233173049,112.6463542227922],[-7.566320073164231,112.6463900883748],[-7.566204600665286,112.6457467978898],[-7.566161797085477,112.6457233958941],[-7.565945666645773,112.6457984264528],[-7.565747959436226,112.6458427393694],[-7.565530862388695,112.6459100351047],[-7.565264580198847,112.6459611841147],[-7.565007680811592,112.6460217818763],[-7.564718498215896,112.6460806958112],[-7.564388290240836,112.6461514955352],[-7.564097185772047,112.6461971546652],[-7.563913226862131,112.646205693682],[-7.563769978413762,112.6462038614972],[-7.563536965804447,112.6462109620083],[-7.563373649895001,112.6462162765083],[-7.562762960714619,112.6463183527786],[-7.562508965591688,112.6463413800498],[-7.562234956756039,112.6463456451453],[-7.561825613773613,112.6463521979657],[-7.561387963699127,112.6463588282736],[-7.560974024765636,112.6463606505869],[-7.560574003990754,112.6463609018427],[-7.56016965261019,112.6463608949988],[-7.559684742555093,112.6463526804609],[-7.559308862327756,112.6463472869059],[-7.558976018218064,112.6463421600483],[-7.558675467613792,112.6458474745093],[-7.558475427729543,112.6457990148547],[-7.558241063940283,112.6457515028358],[-7.557980424720543,112.645694484843],[-7.557720067397975,112.6456351716444],[-7.557413786157694,112.6455667453459],[-7.557170052699879,112.6455038613756],[-7.556916834748538,112.6454374839551],[-7.55650455424918,112.6453326481505],[-7.556174337706485,112.6452497720367],[-7.555807476779778,112.645095095613],[-7.555507636620754,112.6449637266285],[-7.555138367009047,112.6447949879855],[-7.554690620428208,112.6445818261014],[-7.554316413960578,112.6444084965699],[-7.553886044580649,112.6442036649637],[-7.553573337519003,112.6440600703413],[-7.553159895064591,112.6438708553832],[-7.552801494965046,112.6437011044965],[-7.552414742773226,112.6435244571424],[-7.552197019049948,112.6434251892395],[-7.551961527659396,112.6433169219267],[-7.551638882741264,112.6431726478527],[-7.551278823637634,112.6430092780834],[-7.550879988887696,112.6428266052698],[-7.550437600978619,112.6426313440785],[-7.550083478748591,112.6424746994099],[-7.549695803892665,112.642296498779],[-7.549281479453988,112.6420977527849],[-7.54871393022949,112.6419007785571],[-7.548162888793726,112.6417058278046],[-7.547628040804003,112.641524985618],[-7.547006706694023,112.6413208640534],[-7.546359534073505,112.6410970247994],[-7.545627614920063,112.6408398065867]]},{"name":"Kabel FDT 01~FDC 02","coords":[[-7.563690639094871,112.645485459093],[-7.563659028022219,112.645486793484],[-7.562995476869888,112.644939068978],[-7.562611490285862,112.6445820827621],[-7.562311987003671,112.6443247966416],[-7.561817478127898,112.6439087869405],[-7.561423073897261,112.6435809413826],[-7.561221888455261,112.6433942499393],[-7.560775505637688,112.6429844516374],[-7.560444162756316,112.6426944009609],[-7.560063703302898,112.642341073267],[-7.559760454748734,112.6420591882936],[-7.559429024153726,112.6417588574478],[-7.559107421162439,112.6414753762536],[-7.558877034284289,112.641270665735],[-7.558514720993754,112.640993527437],[-7.558181454397085,112.6407091942079]]},{"name":"FDC~FAT IKHWAN-GARENG 2C","coords":[[-7.562895,112.643267],[-7.562602,112.642889],[-7.562350,112.642591],[-7.562087,112.643119],[-7.561866,112.643283],[-7.561592,112.643350],[-7.561244,112.643178],[-7.561101,112.643175],[-7.560900,112.643302],[-7.560719,112.644014],[-7.560500,112.644200],[-7.560300,112.644400],[-7.560100,112.644600]]},{"name":"Kabel Distribusi 48c","coords":[[-7.563690,112.645485],[-7.563200,112.644900],[-7.562700,112.644300],[-7.562200,112.643700],[-7.561700,112.643100],[-7.561200,112.642500],[-7.560700,112.641900],[-7.560200,112.641300],[-7.559700,112.640700],[-7.559200,112.640100],[-7.558700,112.639500]]},{"name":"FDC~FAT MINHAJUL","coords":[[-7.5668,112.6481],[-7.5669,112.6482],[-7.5670,112.6483],[-7.5671,112.6484]]}]

// ── Type config ───────────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<NodeType, { label:string; color:string; bg:string; icon:string; show:boolean }> = {
  OLT:   { label:'OLT',   color:'#7C3AED', bg:'#EDE9FE', icon:'🖥️',  show:true },
  FDT:   { label:'FDT',   color:'#2563EB', bg:'#DBEAFE', icon:'📦',  show:true },
  FDC:   { label:'FDC',   color:'#0D9488', bg:'#CCFBF1', icon:'🔌',  show:true },
  FAT:   { label:'FAT',   color:'#F97316', bg:'#FFEDD5', icon:'📡',  show:true },
  ODP:   { label:'ODP',   color:'#D97706', bg:'#FEF3C7', icon:'🔶',  show:true },
  OTHER: { label:'Lainnya',color:'#78716C', bg:'#F5F5F4', icon:'📍', show:false },
}

// ── Haversine distance ────────────────────────────────────────────────────────
function haversine(lat1:number,lng1:number,lat2:number,lng2:number) {
  const R=6371000,dLat=(lat2-lat1)*Math.PI/180,dLng=(lng2-lng1)*Math.PI/180
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
}

function fmt_dist(m:number) { return m>=1000 ? (m/1000).toFixed(2)+' km' : Math.round(m)+' m' }

// ── ODP data (dari screenshot: slot info) ─────────────────────────────────────
interface ODPItem { id:number; lat:number; lng:number; slot:number; pakai:number }
const ODP_DATA: ODPItem[] = [
  { id:17386, lat:-7.5620, lng:112.6455, slot:7, pakai:0 },
  { id:17361, lat:-7.5635, lng:112.6452, slot:4, pakai:3 },
  { id:17382, lat:-7.5618, lng:112.6468, slot:8, pakai:5 },
  { id:17390, lat:-7.5642, lng:112.6480, slot:8, pakai:2 },
  { id:17345, lat:-7.5608, lng:112.6440, slot:8, pakai:7 },
  { id:17370, lat:-7.5595, lng:112.6460, slot:4, pakai:1 },
  { id:17352, lat:-7.5650, lng:112.6445, slot:8, pakai:8 },
  { id:17398, lat:-7.5628, lng:112.6492, slot:8, pakai:3 },
  { id:17310, lat:-7.5590, lng:112.6448, slot:4, pakai:0 },
  { id:17405, lat:-7.5660, lng:112.6498, slot:8, pakai:6 },
]

// ── Leaflet map component (vanilla JS injected via useEffect) ─────────────────
declare global { interface Window { L: any } }

export default function MonitoringModule() {
  const mapRef      = useRef<HTMLDivElement>(null)
  const leafletRef  = useRef<any>(null)
  const markersRef  = useRef<any[]>([])
  const linesRef    = useRef<any[]>([])
  const odp_markersRef = useRef<any[]>([])

  const [mapType,   setMapType]   = useState<'Map'|'Satellite'>('Satellite')
  const [filter,    setFilter]    = useState<Set<NodeType>>(new Set(['OLT','FDT','FDC','FAT','ODP']))
  const [search,    setSearch]    = useState('')
  const [searchCoord, setSearchCoord] = useState('')
  const [gMapsUrl,  setGMapsUrl]  = useState('')
  const [results,   setResults]   = useState<Array<KMLPoint&{dist:number}>>([])
  const [curLoc,    setCurLoc]    = useState<{lat:number;lng:number}|null>(null)
  const [searching, setSearching] = useState(false)
  const [gpsError,  setGpsError]  = useState('')
  const [selectedNode, setSelectedNode] = useState<KMLPoint|null>(null)
  const [showLines, setShowLines] = useState(true)
  const [showODP,   setShowODP]   = useState(true)
  const [leafletReady, setLeafletReady] = useState(false)

  // ── Load Leaflet ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((window as any).L) { setLeafletReady(true); return }

    const cssLink = document.createElement('link')
    cssLink.rel = 'stylesheet'
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(cssLink)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => setLeafletReady(true)
    document.head.appendChild(script)
  }, [])

  // ── Init map ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletReady || !mapRef.current || leafletRef.current) return
    const L = (window as any).L
    const map = L.map(mapRef.current, { zoomControl:true, attributionControl:false })
    leafletRef.current = map

    updateTileLayer(map, mapType)
    map.setView([-7.557, 112.635], 13)

    // Double-click to search nearest
    map.on('dblclick', (e:any) => {
      const { lat, lng } = e.latlng
      setSearchCoord(`${lat.toFixed(6)},${lng.toFixed(6)}`)
      findNearest(lat, lng)
    })

    renderAll(map, filter, showLines, showODP)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leafletReady])

  function updateTileLayer(map:any, type:'Map'|'Satellite') {
    const L = (window as any).L
    map.eachLayer((l:any) => { if (l._url) map.removeLayer(l) })
    if (type === 'Satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom:19 }).addTo(map)
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom:19 }).addTo(map)
    }
  }

  function renderAll(map:any, vis:Set<NodeType>, lines:boolean, odp:boolean) {
    const L = (window as any).L
    // Clear
    markersRef.current.forEach(m => map.removeLayer(m))
    markersRef.current = []
    linesRef.current.forEach(l => map.removeLayer(l))
    linesRef.current = []
    odp_markersRef.current.forEach(m => map.removeLayer(m))
    odp_markersRef.current = []

    // Lines
    if (lines) {
      KML_LINES.forEach(line => {
        const pl = L.polyline(line.coords, { color:'#22c55e', weight:2.5, opacity:.7 }).addTo(map)
        pl.bindTooltip(line.name, { sticky:true })
        linesRef.current.push(pl)
      })
    }

    // Points
    KML_POINTS.forEach(pt => {
      if (!vis.has(pt.type)) return
      const cfg = TYPE_CONFIG[pt.type]
      const icon = L.divIcon({
        className:'',
        html:`<div style="width:22px;height:22px;border-radius:50%;background:${cfg.color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:10px;color:white;font-weight:700">${cfg.label[0]}</div>`,
        iconSize:[22,22], iconAnchor:[11,11]
      })
      const m = L.marker([pt.lat,pt.lng], { icon }).addTo(map)
      m.bindTooltip(`<b>${pt.name}</b><br/><span style="color:${cfg.color}">${cfg.label}</span>`, { direction:'top' })
      m.on('click', () => setSelectedNode(pt))
      markersRef.current.push(m)
    })

    // ODP markers
    if (odp) {
      ODP_DATA.forEach(od => {
        const sisa = od.slot - od.pakai
        const col = sisa===0 ? '#DC2626' : sisa<=2 ? '#D97706' : '#16A34A'
        const icon = L.divIcon({
          className:'',
          html:`<div style="background:${col};color:white;padding:2px 5px;border-radius:5px;font-size:9px;font-weight:800;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.4);border:1.5px solid white">${od.id} | S${od.slot} | P${od.pakai} | R${sisa}</div>`,
          iconSize:[120,20], iconAnchor:[60,10]
        })
        const m = L.marker([od.lat,od.lng], { icon }).addTo(map)
        m.bindTooltip(`ODP #${od.id}<br/>Slot: ${od.slot} | Pakai: ${od.pakai} | Sisa: ${sisa}`)
        odp_markersRef.current.push(m)
      })
    }
  }

  // ── Toggle layer visibility ─────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletRef.current || !leafletReady) return
    renderAll(leafletRef.current, filter, showLines, showODP)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, showLines, showODP, leafletReady])

  // ── Tile layer swap ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletRef.current) return
    updateTileLayer(leafletRef.current, mapType)
  }, [mapType])

  // ── GPS ─────────────────────────────────────────────────────────────────────
  function getGPS() {
    setGpsError('')
    if (!navigator.geolocation) { setGpsError('Browser tidak mendukung GPS.'); return }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        setCurLoc({ lat:latitude, lng:longitude })
        setSearchCoord(`${latitude.toFixed(6)},${longitude.toFixed(6)}`)
        findNearest(latitude, longitude)
        if (leafletRef.current) leafletRef.current.setView([latitude, longitude], 15)
      },
      () => setGpsError('Izin lokasi GPS belum diizinkan. Izinkan lokasi browser atau masukkan koordinat manual.')
    )
  }

  // ── Parse Google Maps URL ───────────────────────────────────────────────────
  function extractGMapsCoord(url:string) {
    const m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
      || url.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/)
      || url.match(/\?ll=(-?\d+\.\d+),(-?\d+\.\d+)/)
    return m ? { lat:parseFloat(m[1]), lng:parseFloat(m[2]) } : null
  }

  function handleGMaps() {
    const coords = extractGMapsCoord(gMapsUrl)
    if (!coords) { setGpsError('URL tidak valid, pastikan format Google Maps URL yang benar.'); return }
    setSearchCoord(`${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`)
    setGMapsUrl('')
    setGpsError('')
    findNearest(coords.lat, coords.lng)
    if (leafletRef.current) leafletRef.current.setView([coords.lat, coords.lng], 15)
  }

  // ── Find nearest ODP ────────────────────────────────────────────────────────
  function findNearest(lat:number, lng:number) {
    setSearching(true)
    const odps = KML_POINTS.filter(p => p.type === 'ODP' || p.type === 'FAT' || p.type === 'FDC')
    const withDist = odps.map(p => ({ ...p, dist:haversine(lat, lng, p.lat, p.lng) }))
    withDist.sort((a,b) => a.dist - b.dist)
    setResults(withDist.slice(0, 8))
    setSearching(false)

    // Add current loc marker
    if (leafletRef.current) {
      const L = (window as any).L
      const icon = L.divIcon({
        className:'',
        html:`<div style="width:18px;height:18px;border-radius:50%;background:#EF4444;border:3px solid white;box-shadow:0 0 0 3px rgba(239,68,68,.3)"></div>`,
        iconSize:[18,18], iconAnchor:[9,9]
      })
      L.marker([lat,lng],{icon}).addTo(leafletRef.current).bindTooltip('Lokasi Anda',{permanent:true})
    }
  }

  // ── Search by coord input ───────────────────────────────────────────────────
  function handleSearch() {
    const parts = searchCoord.replace(/\s/g,'').split(',')
    if (parts.length < 2) return
    const lat = parseFloat(parts[0]), lng = parseFloat(parts[1])
    if (isNaN(lat)||isNaN(lng)) return
    setCurLoc({ lat, lng })
    findNearest(lat, lng)
    if (leafletRef.current) leafletRef.current.setView([lat, lng], 15)
  }

  function toggleFilter(t:NodeType) {
    setFilter(prev => {
      const n = new Set(prev)
      n.has(t) ? n.delete(t) : n.add(t)
      return n
    })
  }

  const stats = {
    olt: KML_POINTS.filter(p=>p.type==='OLT').length,
    fdt: KML_POINTS.filter(p=>p.type==='FDT').length,
    fdc: KML_POINTS.filter(p=>p.type==='FDC').length,
    fat: KML_POINTS.filter(p=>p.type==='FAT').length,
    odp: ODP_DATA.length,
    lines: KML_LINES.length,
  }

  return (
    <div style={{ padding:'1.25rem', display:'flex', flexDirection:'column', gap:'1rem', minHeight:'100%' }}>

      {/* ── Header Stats ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:'.75rem' }}>
        {[
          { label:'OLT', value:stats.olt, color:'#7C3AED', bg:'#EDE9FE', icon:'🖥️' },
          { label:'FDT', value:stats.fdt, color:C.blue,    bg:C.blueLight, icon:'📦' },
          { label:'FDC', value:stats.fdc, color:C.teal,    bg:C.tealLight, icon:'🔌' },
          { label:'FAT', value:stats.fat, color:C.orange,  bg:C.orangeLight, icon:'📡' },
          { label:'ODP', value:stats.odp, color:C.amber,   bg:C.amberLight, icon:'🔶' },
          { label:'Kabel', value:stats.lines, color:C.green, bg:C.greenLight, icon:'〰️' },
        ].map(s => (
          <div key={s.label} style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:12,
            padding:'.75rem 1rem', display:'flex', flexDirection:'column', gap:6 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:32,height:32,borderRadius:8,background:s.bg,display:'flex',alignItems:'center',
                justifyContent:'center',fontSize:'1rem' }}>{s.icon}</div>
              <span style={{ fontSize:'.72rem',fontWeight:700,color:C.muted }}>{s.label}</span>
            </div>
            <div style={{ fontSize:'1.5rem',fontWeight:900,color:s.color,fontFamily:'var(--mono)',lineHeight:1 }}>
              {s.value.toLocaleString('id-ID')}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Panel ── */}
      <div style={{ background:'#fff', borderRadius:14, border:`1.5px solid ${C.border}`, overflow:'hidden' }}>

        {/* Title + filter bar */}
        <div style={{ padding:'1rem 1.25rem', borderBottom:`1.5px solid ${C.border}`, display:'flex',
          flexWrap:'wrap', alignItems:'center', gap:'.75rem' }}>
          <span style={{ fontWeight:800, fontSize:'1rem', color:C.text }}>Data Mapping ODP Terdekat</span>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginLeft:'auto', alignItems:'center' }}>
            <span style={{ fontSize:'.75rem', color:C.muted, fontWeight:600 }}>Map:</span>
            {(['Semua',...Object.keys(TYPE_CONFIG).filter(k=>TYPE_CONFIG[k as NodeType].show)] as string[]).map(t => {
              const isAll = t === 'Semua'
              const active = isAll
                ? Object.keys(TYPE_CONFIG).filter(k=>TYPE_CONFIG[k as NodeType].show).every(k=>filter.has(k as NodeType))
                : filter.has(t as NodeType)
              const cfg = isAll ? null : TYPE_CONFIG[t as NodeType]
              return (
                <button key={t} onClick={() => {
                  if (isAll) {
                    setFilter(new Set(Object.keys(TYPE_CONFIG).filter(k=>TYPE_CONFIG[k as NodeType].show) as NodeType[]))
                  } else toggleFilter(t as NodeType)
                }} style={{
                  padding:'4px 10px', borderRadius:20, border:'1.5px solid',
                  borderColor: active ? (cfg?.color||C.orange) : C.border,
                  background: active ? (cfg?.bg||C.orangeLight) : '#fff',
                  color: active ? (cfg?.color||C.orange) : C.muted,
                  fontWeight:700, fontSize:'.72rem', cursor:'pointer', transition:'all .15s',
                }}>
                  {isAll ? '🗺️ Semua' : `${cfg?.icon} ${t}`}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search bar */}
        <div style={{ padding:'1rem 1.25rem', borderBottom:`1.5px solid ${C.border}`, display:'flex', flexDirection:'column', gap:'.65rem' }}>
          <div style={{ display:'flex', gap:'.5rem' }}>
            <input
              className="form-input"
              style={{ flex:1 }}
              placeholder="Masukkan titik koordinat: latitude,longitude"
              value={searchCoord}
              onChange={e => setSearchCoord(e.target.value)}
              onKeyDown={e => e.key==='Enter' && handleSearch()}
            />
            <button className="btn-primary" onClick={handleSearch} style={{ whiteSpace:'nowrap' }}>
              🔍 Cari
            </button>
            <button onClick={getGPS} style={{
              padding:'10px 16px', borderRadius:8, border:'none', background:'#16A34A',
              color:'#fff', fontWeight:700, fontSize:'.875rem', cursor:'pointer', whiteSpace:'nowrap'
            }}>
              📍 Saat Ini
            </button>
          </div>

          {gpsError && (
            <div style={{ background:'#FEF2F2', border:'1.5px solid #FCA5A5', borderRadius:8, padding:'.65rem .875rem',
              color:'#DC2626', fontWeight:600, fontSize:'.8rem' }}>
              {gpsError}
            </div>
          )}

          <div style={{ display:'flex', gap:'.5rem' }}>
            <input
              className="form-input"
              style={{ flex:1 }}
              placeholder="Paste URL share lokasi Google Maps, contoh: https://www.google.com/maps?q=..."
              value={gMapsUrl}
              onChange={e => setGMapsUrl(e.target.value)}
            />
            <button onClick={handleGMaps} style={{
              padding:'10px 16px', borderRadius:8, border:'none', background:C.blue,
              color:'#fff', fontWeight:700, fontSize:'.875rem', cursor:'pointer', whiteSpace:'nowrap'
            }}>
              Ambil Koordinat
            </button>
          </div>

          <div style={{ fontSize:'.75rem', color:C.muted }}>
            GPS akan dideteksi otomatis saat halaman dibuka. Klik tombol <b>📍 Saat Ini</b> untuk mengambil ulang koordinat
            lokasi berada, atau double klik map / ketik manual koordinat / paste URL share lokasi Google Maps untuk mencari ODP
            terdekat beserta total slot, slot digunakan, dan sisa slot.
          </div>

          {/* Layer toggles */}
          <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap' }}>
            <button onClick={()=>setShowLines(v=>!v)} style={{
              padding:'5px 12px', borderRadius:20, border:'1.5px solid',
              borderColor: showLines ? C.green : C.border,
              background: showLines ? C.greenLight : '#fff',
              color: showLines ? C.green : C.muted,
              fontWeight:700, fontSize:'.72rem', cursor:'pointer'
            }}>〰️ Kabel Distribusi</button>
            <button onClick={()=>setShowODP(v=>!v)} style={{
              padding:'5px 12px', borderRadius:20, border:'1.5px solid',
              borderColor: showODP ? C.amber : C.border,
              background: showODP ? C.amberLight : '#fff',
              color: showODP ? C.amber : C.muted,
              fontWeight:700, fontSize:'.72rem', cursor:'pointer'
            }}>🔶 Label ODP</button>
          </div>
        </div>

        {/* Map */}
        <div style={{ position:'relative' }}>
          {/* Map/Satellite toggle */}
          <div style={{ position:'absolute', top:12, left:12, zIndex:1000, background:'#fff',
            borderRadius:10, border:`1.5px solid ${C.border}`, display:'flex', overflow:'hidden',
            boxShadow:'0 2px 8px rgba(0,0,0,.15)' }}>
            {(['Map','Satellite'] as const).map(t => (
              <button key={t} onClick={()=>setMapType(t)} style={{
                padding:'7px 14px', border:'none', background: mapType===t ? C.text : '#fff',
                color: mapType===t ? '#fff' : C.muted, fontWeight:700, fontSize:'.8rem', cursor:'pointer'
              }}>{t}</button>
            ))}
          </div>

          {/* Leaflet map */}
          <div ref={mapRef} style={{ height:480, width:'100%', background:'#E8E8E8' }}>
            {!leafletReady && (
              <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100%',
                flexDirection:'column',gap:8,color:C.muted }}>
                <div style={{ fontSize:'2rem' }}>🗺️</div>
                <div style={{ fontWeight:600 }}>Memuat peta...</div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div style={{ position:'absolute', bottom:12, right:12, zIndex:1000, background:'rgba(255,255,255,.95)',
            borderRadius:10, border:`1px solid ${C.border}`, padding:'.5rem .75rem',
            boxShadow:'0 2px 8px rgba(0,0,0,.12)', fontSize:'.7rem' }}>
            {Object.entries(TYPE_CONFIG).filter(([,v])=>v.show).map(([k,v]) => (
              <div key={k} style={{ display:'flex',alignItems:'center',gap:5,marginBottom:2 }}>
                <div style={{ width:10,height:10,borderRadius:'50%',background:v.color,flexShrink:0 }}/>
                <span style={{ color:C.text,fontWeight:600 }}>{k}</span>
              </div>
            ))}
            <div style={{ display:'flex',alignItems:'center',gap:5,marginTop:4,borderTop:`1px solid ${C.border}`,paddingTop:4 }}>
              <div style={{ width:14,height:3,background:'#22c55e',flexShrink:0,borderRadius:2 }}/>
              <span style={{ color:C.text,fontWeight:600 }}>Kabel</span>
            </div>
          </div>
        </div>

        {/* Node detail popup */}
        {selectedNode && (
          <div style={{ margin:'1rem 1.25rem', background:TYPE_CONFIG[selectedNode.type].bg,
            border:`1.5px solid ${TYPE_CONFIG[selectedNode.type].color}`, borderRadius:10, padding:'.875rem 1rem',
            display:'flex', alignItems:'center', justifyContent:'space-between', gap:'.75rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
              <div style={{ width:38,height:38,borderRadius:10,background:TYPE_CONFIG[selectedNode.type].color,
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem' }}>
                {TYPE_CONFIG[selectedNode.type].icon}
              </div>
              <div>
                <div style={{ fontWeight:800,fontSize:'.95rem',color:C.text }}>{selectedNode.name||'(Tanpa nama)'}</div>
                <div style={{ fontSize:'.75rem',color:TYPE_CONFIG[selectedNode.type].color,fontWeight:700 }}>
                  {selectedNode.type} · {selectedNode.lat.toFixed(6)}, {selectedNode.lng.toFixed(6)}
                </div>
                {curLoc && (
                  <div style={{ fontSize:'.72rem',color:C.muted,marginTop:2 }}>
                    📏 Jarak dari Anda: <b>{fmt_dist(haversine(curLoc.lat,curLoc.lng,selectedNode.lat,selectedNode.lng))}</b>
                  </div>
                )}
              </div>
            </div>
            <button onClick={()=>setSelectedNode(null)} style={{ border:'none',background:'transparent',
              cursor:'pointer',fontSize:'1.2rem',color:C.muted,padding:'4px 6px' }}>✕</button>
          </div>
        )}

        {/* ── ODP Terdekat results ── */}
        {results.length > 0 && (
          <div style={{ padding:'1rem 1.25rem' }}>
            <div style={{ fontWeight:800,fontSize:'.9rem',color:C.text,marginBottom:'.65rem' }}>
              📍 {results[0].type==='ODP'?'ODP':'Titik Infrastruktur'} Terdekat dari Koordinat Anda
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:'.5rem' }}>
              {results.map((r,i) => {
                const cfg = TYPE_CONFIG[r.type]
                return (
                  <div key={i} onClick={() => {
                    setSelectedNode(r)
                    if (leafletRef.current) leafletRef.current.setView([r.lat,r.lng],16)
                  }} style={{
                    background: i===0 ? cfg.bg : '#FAFAF9',
                    border: `1.5px solid ${i===0 ? cfg.color : C.border}`,
                    borderRadius:10, padding:'.6rem .875rem', cursor:'pointer',
                    display:'flex', alignItems:'center', gap:'.75rem', transition:'all .15s'
                  }}>
                    <div style={{ width:32,height:32,borderRadius:8,background:cfg.color,
                      display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',
                      fontWeight:900,fontSize:'.75rem',flexShrink:0 }}>
                      {i===0 ? '★' : i+1}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,fontSize:'.8rem',color:C.text }}>{r.name||'(Tanpa nama)'}</div>
                      <div style={{ fontSize:'.7rem',color:C.muted }}>
                        <span style={{ color:cfg.color,fontWeight:700 }}>{r.type}</span>
                        {' · '}{r.lat.toFixed(5)}, {r.lng.toFixed(5)}
                      </div>
                    </div>
                    <div style={{ background:i===0?cfg.color:'#fff', color:i===0?'#fff':cfg.color,
                      border:`1.5px solid ${cfg.color}`, borderRadius:20, padding:'3px 10px',
                      fontSize:'.72rem',fontWeight:800,flexShrink:0 }}>
                      {fmt_dist(r.dist)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── ODP Slot Table ── */}
        <div style={{ padding:'0 1.25rem 1.25rem' }}>
          <div style={{ fontWeight:800,fontSize:'.9rem',color:C.text,margin:'.75rem 0 .5rem' }}>
            🔶 Status Slot ODP
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'.8rem' }}>
              <thead>
                <tr style={{ background:C.bg }}>
                  {['ID ODP','Slot Total','Slot Pakai','Sisa Slot','Status','Koordinat'].map(h => (
                    <th key={h} style={{ padding:'8px 12px',textAlign:'left',fontWeight:700,color:C.muted,
                      borderBottom:`1.5px solid ${C.border}`,whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ODP_DATA.map(od => {
                  const sisa = od.slot - od.pakai
                  const col = sisa===0 ? C.red : sisa<=2 ? C.amber : C.green
                  const bg  = sisa===0 ? '#FEF2F2' : sisa<=2 ? '#FFFBEB' : '#F0FDF4'
                  return (
                    <tr key={od.id} style={{ borderBottom:`1px solid ${C.border}`, cursor:'pointer' }}
                      onClick={()=>{ if(leafletRef.current) leafletRef.current.setView([od.lat,od.lng],16) }}>
                      <td style={{ padding:'8px 12px',fontWeight:800,color:C.orange,fontFamily:'var(--mono)' }}>
                        {od.id}
                      </td>
                      <td style={{ padding:'8px 12px',fontWeight:700 }}>{od.slot}</td>
                      <td style={{ padding:'8px 12px' }}>{od.pakai}</td>
                      <td style={{ padding:'8px 12px' }}>
                        <span style={{ background:bg,color:col,padding:'2px 8px',borderRadius:20,fontWeight:700 }}>
                          {sisa}
                        </span>
                      </td>
                      <td style={{ padding:'8px 12px' }}>
                        <span style={{ background:bg,color:col,padding:'2px 8px',borderRadius:20,fontWeight:700,fontSize:'.7rem' }}>
                          {sisa===0?'🔴 Penuh':sisa<=2?'🟡 Hampir Penuh':'🟢 Tersedia'}
                        </span>
                      </td>
                      <td style={{ padding:'8px 12px',color:C.muted,fontFamily:'var(--mono)',fontSize:'.72rem' }}>
                        {od.lat.toFixed(5)}, {od.lng.toFixed(5)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ── Network Stats Summary ── */}
      <div style={{ background:'#fff',borderRadius:14,border:`1.5px solid ${C.border}`,padding:'1rem 1.25rem' }}>
        <div style={{ fontWeight:800,fontSize:'.9rem',color:C.text,marginBottom:'.75rem' }}>
          📊 Ringkasan Infrastruktur Jaringan
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'1rem' }}>
          {[
            { label:'Total Node Aktif',  value: KML_POINTS.filter(p=>p.type!=='OTHER').length, icon:'🌐', color:C.blue },
            { label:'Total Titik FAT',   value: stats.fat, icon:'📡', color:C.orange },
            { label:'Total FDC',         value: stats.fdc, icon:'🔌', color:C.teal },
            { label:'ODP Tersedia',      value: ODP_DATA.filter(o=>o.slot-o.pakai>0).length, icon:'🟢', color:C.green },
            { label:'ODP Penuh',         value: ODP_DATA.filter(o=>o.slot===o.pakai).length, icon:'🔴', color:C.red },
            { label:'Ruas Kabel',        value: KML_LINES.length, icon:'〰️', color:C.green },
          ].map(s => (
            <div key={s.label} style={{ display:'flex',alignItems:'center',gap:'.75rem' }}>
              <div style={{ fontSize:'1.4rem' }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:'1.25rem',fontWeight:900,color:s.color,fontFamily:'var(--mono)',lineHeight:1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize:'.72rem',color:C.muted,fontWeight:600 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
