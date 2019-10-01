"use strict";

var FormData = require("form-data");
var neo4j = require("neo4j-driver").v1;
var fs = require("fs");
var request = require("request");
const fetch = require("node-fetch");
var count = 0;
var driver = new neo4j.driver(
    "bolt://3.210.77.29:7687",
  neo4j.auth.basic("neo4j", "123456")
);
var customers = {
	"emails": [{
			"email": "info@spinnaker-watches.com",
			"items": ["al.albay", "pauldavidmaudsley", "tobybateman", "caffeineandgasoline.x", "ronniefieg", "thewatchbloke", "jcpieri", "paulandknife"]
		}, {
			"email": "SHELLEY@HILLANDFRIENDS.COM",
			"items": ["wearsmymoney", "gcoleridgecole", "hellomissjordan", "laillimirza", "stylemesunday", "sarahtankelellis", "emily_hunt_", "wearetwinset"]
		}, {
			"email": "Info@magee1866.com",
			"items": ["mrcavaliere", "robert.reider", "alecxpaval", "thompsons_tweeds", "ethanmwong", "tweed_hat", "benjaminjardine_", "justkassi"]
		}, {
			"email": "SUPPORT@CUFFLINKS.COM",
			"items": ["mrgarcia__", "nicklemonparty", "runnineverlong", "mydapperself", "hendrickarody", "burnstyle_", "businessformal"]
		}, {
			"email": "Sales@MelissaAndDoug.com",
			"items": ["annistyn.and.rosalie", "treehousethreadsblog", "athomewithnatalie", "jo.noodle", "michellechapin", "littlelifelonglearners", "themomtrotter", "juelz_jourdan"]
		}, {
			"email": "marketing@grandcanyonresort.com",
			"items": ["pilotpatrick", "elcortezlv", "maverickairlines", "hualapairiverrunners"]
		}, {
			"email": "info@cymbiotika.com",
			"items": ["crystalladyluna", "zenlifedan", "3rd_eye_orgone", "the.holistic.psychologist", "waterpriestess", "archerlove", "chervin333"]
		}, {
			"email": "galen@backfliptech.com",
			"items": ["gina_mcnulty", "itspsgamers", "my_switch", "thenintendoworld", "controlfell", "famousetups", "forthnite"]
		}, {
			"email": "service@magiccabin.com",
			"items": ["cuddleandkind", "christine_simplybloom", "this.little.wandering", "_ashley_noel_", "happygreylucky", "fivelittlebirds", "gentlebreezemontessori", "oh.little.wren"]
		}, {
			"email": "service@hearthsong.com",
			"items": ["pencilstopigtails", "pauladolubizno", "attachedandalbright", "chloeuberkid", "nynneetliloujos", "thismodernlife", "mother_of_daughters", "tthese_beautiful_thingss"]
		}, {
			"email": "customerservice@vivaterra.com",
			"items": ["thegreenhub_", "aldenwicker", "camillestyles", "greyandscout", "thegoodabode", "loridennisinc", "jdpinteriors", "edbdesigns"]
		}, {
			"email": "info@windandweather.com",
			"items": ["appaloosa___artisans", "ourcottagehome", "alicia.vilas", "reinventingmyselfandmyspace", "blessedcrazytxnest", "homewithgigi", "mymountainretreat", "hollys.hobby"]
		}, {
			"email": "jonathan@grover.com",
			"items": ["maximilian.kelm", "ninamarleen", "joshuawichtrup", "cf_terri", "miri.krug", "stagedives", "valentastisch", "felixba"]
		}, {
			"email": "emily@stackers.com",
			"items": ["megs_home_edit", "twelvethegreyhouse", "nadia_allure", "elliesimmonite", "myarmparty", "meet_the_fosters_", "kabukirune", "wanderlustruby"]
		}, {
			"email": "greyden@versamarketinginc.com",
			"items": ["theproductivityzone", "shediditherway", "mydubsado", "cultivatewhatmatters", "emilyandmeritt", "gatormom_reviews", "emilyley", "crohnicallyblonde"]
		}, {
			"email": "affiliates@luxurygaragesale.com",
			"items": ["lindsaylovelyhq", "brittlathrece", "sabrina_runge", "styleofsam", "fashion_unfolded_by_mandy", "_moda_md", "erindendres", "nicolecripestyle"]
		}, {
			"email": "custserv@paulfredrick.com",
			"items": ["parkeryorksmith", "stuylin", "therevdmr", "keyesopensdoors", "runnineverlong", "phaeton4kast", "berzinsky", "curtailored"]
		}, {
			"email": "ankit.koushik@edureka.co",
			"items": ["sundarpichai", "zuck", "entrepreneurind", "sherylsandberg", "pycoders", "datascienceinfo", "learn.machinelearning", "entrepreneurind"]
		}, {
			"email": "customerservice@relaxtheback.com",
			"items": ["jadafox4", "dr.giardina.dpt", "cristybastidas", "modernholistic", "mommygotmoving", "simplynicnutrition"]
		}, {
			"email": "bhelfand@vousvitamin.com",
			"items": ["imperfectlysarah", "kaylakleinman", "collectivelykaitlyn", "daphnie.pearl", "tiaperciballi", "thebabblingblondes", "onceuponadollhouse", "glamberly_"]
		}, {
			"email": "info@vionicshoes.com",
			"items": ["lois_sofie_", "momminginmanolos", "simply.stewart", "mulsymouse", "katherineewitt", "alyakepa", "blondegonevogue", "withashleykay"]
		}, {
			"email": "ryan.wong@fedex.com",
			"items": ["sandrawiller", "erisrhodes", "seewantshop", "rebecca_stella", "julieviktoria", "daimaperezz", "anit.love", "velkell_official"]
		}, {
			"email": "questions@dillards.com",
			"items": ["inbloomintimates", "bugaboousa", "rebeccaminkoff", "triforceluggage"]
		}, {
			"email": "support@case-mate.com",
			"items": ["gimaguas", "redcarpetgirlz", "rebeccacarmen", "mookyybabyy", "brit_harvey", "overglowedit", "forevervanny"]
		}, {
			"email": "CustomerCare@newbalance.com",
			"items": ["evanungar", "aikines", "rolows13", "protosofthegram", "vincent.viet", "egotbloxz", "aikines"]
		}, {
			"email": "hello@sandandsky.com",
			"items": ["sally_fitz", "mark.a.wales", "katie_michaelis46", "justinhenrybeauty", "skinfluencedd", "champagneglow"]
		}, {
			"email": "support@myrevair.com",
			"items": ["coachshaunie", "mariatettamanti", "afroglory_", "karlasaviotte", "ashleyrockshair", "nickybnatural", "jenellbstewart", "tiffanylaibhen"]
		}, {
			"email": "customerservice@xcvi.com",
			"items": ["merrittbeck", "thestylineducator", "nyssas_kitchen", "truerebelclothing", "livingwithfreckles", "afittingview", "thejessicaexperience", "thekirstyfiles"]
		}, {
			"email": "chloe.smith@mountainwarehouse.com",
			"items": ["thaichris1970", "terrygreen66", "wood_shaun", "jay_ledgeway", "meltolan_fitness", "pure_nature__"]
		}, {
			"email": "jadejenkins@marissacollections.com",
			"items": ["ms_stephanie_xo", "ullajohnson", "kirsten_m_maas", "estellechemouny", "carlospinedamx", "christina.alexiou", "blaireadiebee", "viva_a_viva"]
		}, {
			"email": "brett@justcbdstore.com",
			"items": ["tripppy.king", "galinddoo", "moderntarzan", "ashporto"]
		}, {
			"email": "CustomerService@BotanicChoice.com",
			"items": ["myveganorganicbaby", "herbsnheart", "happyfitmommies", "fitbalancenutrition_rd", "samantha.m.schulz", "tarakemp_", "emmaascherfit", "samanthakozuch"]
		}, {
			"email": "cult@razer.com",
			"items": ["ambvelo", "icata", "kittyplays", "strawburry17", "missrage", "sssniperwolf", "playapex", "ava.gg"]
		}, {
			"email": "Privacy@Coastal.com",
			"items": ["karrie_locher", "jamie_jetaime", "natterdoodles", "thecrystalpress", "learning2loveburpees", "rebeccapiersol", "halle_hathaway", "makeupminimalism"]
		}, {
			"email": "stu.haack@effem.com",
			"items": ["dainabobaina", "malcbuff", "myperfectitinerary", "christaquilts", "johannalynjones", "the_sportsnista", "lindseygurk", "courtneyperna"]
		}, {
			"email": "albertovico@raffaello-network.com",
			"items": ["iamromlap", "carlomsl", "lds.margot", "mertcaakaar", "fileks", "laurabuendiaj", "autourdaudrey", "aslihan_unal"]
		}, {
			"email": "jaym@prfo.com",
			"items": ["melroseboyer", "naturalpretty_beautifulwolf", "thom_skateboard", "emile_prudhomme", "nana_labar", "dakota_sbrega", "matteo_opz", "sambeauch"]
		}, {
			"email": "contact@thekooples.com",
			"items": ["journaldelaura", "eniramd", "paulineajung", "jessmeupblog", "natymichele", "clement_gbk", "mathilde._.bb", "vthechan"]
		}, {
			"email": "katy@xdorialife.com",
			"items": ["asempe", "raulsaiz", "mommydiary", "whoispaul_", "lapetite_lyonnaise", "thestilettoholic", "marinegaby_", "dylanchaillou__"]
		}, {
			"email": "support@canvaspeople.com",
			"items": ["woodside.farm", "trendifarmgirl", "allboysandamama", "jeanne.patricia", "paintyourevent", "farmhouseon41st", "cillalambert", "2hangrymoms"]
		}, {
			"email": "easternmntn@ems.com",
			"items": ["twopeople_oneadventure", "tiffnault_", "i_need_mountains", "coreyoutdoors", "jproberts", "tessa_the_irish_setter", "matt_oliphant_photography", "james_lucas", ""]
		}, {
			"email": "marketing@apt2b.com",
			"items": ["kreeshaturner", "candycoloredhome", "arianna_danielson", "mango_manor", "citychicdecor", "asekyb", "celebrationstylist", "sarahbelleelizabeth"]
		}, {
			"email": "jwang@ryderseyewear.com",
			"items": ["jaxsonriddle", "allarms7", "maggiecoleslyster", "bretttippie", "rich_ridr", "logan_binggeli", "ryan.mcnulty", "thomasvanderham"]
		}, {
			"email": "info@thenomadik.com",
			"items": ["scorpivo_", "parkingonthewildside", "wanderlikeus", "thetravelguyslife", "ccr_out_of_here", "damianrileyphoto", "x.laurenann.elizabeth.x", "andynammm"]
		}, {
			"email": "rsherman@treadlabs.com",
			"items": ["the_jenevans_story", "maria.polyzou", "letsmoveultras", "craigathor", "drewhunter00", "tinmanelite", "zachbitter", "nicole_mtb"]
		}, {
			"email": "ansis@velosock.com",
			"items": ["nimrodeldar", "elena.martinello", "enrico_baretta", "joshua_silas_winkler", "magdalenalobnig", "capitan_ferro", "pf_tri", "williammazzardis"]
		}, {
			"email": "smelo@drbrandtskincare.com",
			"items": ["thequeenofskincare", "boxypreview", "makeupangel23", "boxycharmsneakpeek", "jaxandrose", "runninginrockstuds", "ivan_chepelenkov", "kamilabravo"]
		}, {
			"email": "affiliates@jane.com",
			"items": ["destinyhens0n", "emilyannraynes", "thetrendytomboy", "rachelprochnow", "caitlynneier", "homedecormomma", "xomelissalucy", "nightchayde"]
		}, {
			"email": "cris.liu@patpat.com",
			"items": ["moxie", "meenaofficialll", "tempestazaria_", "savspald", "mickeybarmama", "haceryesilyaz", "luizasaya", "boys_plus_triplets"]
		}, {
			"email": "kimi@zaful.com",
			"items": ["saratoufali", "kamaleiielamak", "kailinasummer", "flopereira", "rachelrocconi", "jackiemcrae_xo", "allylifee", "samanthalynnarb"]
		}, {
			"email": "INFO@COPPERANDCRANE.COM",
			"items": ["lighttravelsfaster", "petitetammie", "lindshubbs", "melissadvale", "milkamireille", "lipsticksnblushes", "devine_beauty_by_t", "renegianos", ""]
		}, {
			"email": "serviceUSA@e.uspoloassn.com",
			"items": ["sinkthesun", "tommydidario", "melvin_mellblom", "diklagoren", "drewthorn", "whoislature", "politopieres", "dougiejoseph"]
		}, {
			"email": "dhughes@plushbeds.com",
			"items": ["acleanbee", "the_aesthetic_side_of_homes", "dontmesswithmama", "livingwithlandyn", "pillowguy", "thesinceremama", "healthmagazine", "carolina.moves"]
		}, {
			"email": "craig@scentbox.com",
			"items": ["missdominiqueb", "sneakstostilettos", "viviannn.wong", "slashedbeauty", "rachmoon", "cortneytayla", "yackievds", "everythingnavy"]
		}, {
			"email": "allysonr@sequin-nyc.com",
			"items": ["alwaysmeliss", "thestylewright", "brittneypretzel", "jordanunderwood", "jennhanft", "marinashaystyle", "bethann.wagner", "adaatude"]
		}, {
			"email": "justin@ism-sf.com",
			"items": ["msbrandymorgan", "agiputraaspian", "timdessaint", "juliakbrou", "b.arroso", "miwaesthetic", "thepacman82", "othomasgarcia"]
		}, {
			"email": "info@sockrunway.com",
			"items": ["_nonsky", "richyjenness", "jsimsfit", "iamsimplymorgan", "uglobegirl", "cierrapashawn", "janicevillamor", "alicemarieni"]
		}, {
			"email": "Kamron@Puffy.com",
			"items": ["audreyjudith_", "amiharuna", "linguamarina", "carissa_nunez", "_meg_leigh", "theparenttrail", "forresthoffman", "josephcannats"]
		}, {
			"email": "affiliates@dreamcloudsleep.com",
			"items": ["drtaniaelliott", "theethicalagent", "brickellista", "oliviamuenter", "karaallen", "dtkaustin", "goldalamode", "jennylynnebrooks"]
		}, {
			"email": "devin.concannon@gmail.com",
			"items": ["onetakestace", "alilevinedesign", "thelacouple", "emmapeercy", "germeinsisters", "gamzeberberci", "brickhouse11", "christophekeyes"]
		}, {
			"email": "wells@rogue-industries.com",
			"items": ["khalilb.alaoui", "modernmainer", "alias_jee", "theurbanstory", "hicham_biza", "sadhique_aboobacker", "silvioabstract", "jcpeters_"]
		}, {
			"email": "hello@daughteroftheland.com",
			"items": ["morningtide.shop", "aimebird", "nelleclark", "topknotnails", "onadulting", "katraawad", "kerrilynnpamer", "caroline_wachsmuth"]
		}, {
			"email": "camille@camillejewelry.com",
			"items": ["thestylewright", "auroraperrineau", "tinsleyerin", "robineblickman", "peachandpepper", "mishaskova", "chrissyionno", "ofthemomnt"]
		}, {
			"email": "clcooper@gmail.com",
			"items": ["danielmeschino", "anthonyhperaza", "missamyha", "kai__wes", "peanutthewicked", "danielmeschino", "hiimkejiann", "gantanegwane"]
		}, {
			"email": "rachel@humablanco.com",
			"items": ["rileyblanks", "ktzahorak", "jenpinkston", "ashleehuff", "truelane", "thegoldatlas", "cocoabutterdiaries", "gretchen_jones"]
		}, {
			"email": "andrea@contornobelts.com",
			"items": ["50isthenew50blog", "urbangirlgonebeachmom", "50shadesofstylebykelley", "everydayover50", "patrishpages", "crazyblondelifeblog", "rememberwynn18"]
		}, {
			"email": "legal@stelladot.com",
			"items": ["mrslaneylou", "michelebell21", "thestyledrealtor365", "themominstyle", "herstorey", "mackenzieholik", "lyfestyleofmine", "trishalynmerk"]
		}, {
			"email": "traskcustomerservice@trask.com",
			"items": ["bluecollarprep", "rather__dashing", "boymominjeans", "fleurdille", "shelby__barnes", "cutenlittle", "itscameronhinkle", "kristenmayx"]
		}, {
			"email": "fergus@besamecosmetics.com",
			"items": ["lacifay", "fiorevanil", "brynrosevintage", "gracejaques", "littlemissfruitkates", "dolewhipdame", "kiyrathehuman", "maggies.healthy.beauty"]
		}, {
			"email": "rob@allsc.net",
			"items": ["baileyschwartz", "britt_horton", "tannermmann", "baileyannhawkins", "kallie_branciforte", "tashapolis", "thechicmamas", "thegracemattei"]
		}, {
			"email": "eb@hitcase.com",
			"items": ["paddymackk", "actuallyitsaxel", "bladiecoco", "stratacous", "toughtraining", "andrewtaylormtb", "merlinhanna", "stevecrazy__"]
		}, {
			"email": "andrew@tucann.com",
			"items": ["rbnfitness_", "chasesavoie", "ryan_greasley", "jessekelly_wbffpro", "stephen_ifbb", "proteinguru", "lambropoulos_7", "pascalmunzfitness"]
		}, {
			"email": "loren.arthur@innovaderma.com",
			"items": ["sj.sammyj", "ariellyndsey", "anetalauradotcom", "em_mac", "sayladean", "katealexandra._", "erikaheynatz", "vargabarbie"]
		}, {
			"email": "info@ballast1903.com",
			"items": ["mrbagz007", "captureasecond", "philipp_watch", "solitary_man", "thewatchtrend", "watchdavid", "tech_writer", "stephen_tuffatore"]
		}, {
			"email": "affiliate@luvye.com",
			"items": ["rosergda1993", "federicafederica91_", "chiaraloss_", "photosbycris", "jessiicagobbi", "theofficialgeorgelife", "lovelauren.eu", "marghefal_"]
		}, {
			"email": "partners@setsclub.com",
			"items": ["iamrockyl", "samanthascarlettemusic", "beautybyvilla", "styleascension", "thefashiontag", "ashexperience", "vigor.and.vogue", "traininfortacos"]
		}, {
			"email": "gwhite@taosfootwear.com",
			"items": ["rebeca.lacblog", "brooklynhelder", "christinejaxx", "bryanalikes", "ivy_lc", "ohh_dhays", "shylacino", "classroom.couture"]
		}, {
			"email": "wtonkin@fanatics.com",
			"items": ["xoashleytaggart", "antoniettabrownell", "jessajo7", "patriotsfgsn", "saquon", "raisinghowells", "debbieoutdoors", "about_that_misty_life"]
		}, {
			"email": "Steve@rangerstation.co",
			"items": ["dkc.mama", "cohl.world", "claire.p.jones", "madeline_n_co", "thekennedycurate", "alexsaintclark", "ivywildvisuals", "peytoncdollar"]
		}, {
			"email": "susan@simplyworkout.com",
			"items": ["melnasab", "slimyogini", "petiteandtoned", "miss_natasha_jade", "jalilajones", "afriquitarp", "fitfashionfile", "fabulouslyfitwithkatie"]
		}, {
			"email": "mayercohenrb@gmail.com",
			"items": ["ayla_woodruff", "mrslaneylou", "michelebell21", "thestyledrealtor365", "themominstyle", "herstorey", "mackenzieholik", "lyfestyleofmine"]
		}, {
			"email": "ashley.ludgood@vibesbase.com",
			"items": ["alyssaalexander_88", "rhondamarierawls", "love_nat", "glitzglamom", "wearebebot", "throughthesprawl", "karisbedey", "stacipratt"]
		}, {
			"email": "JohnstonMurphy@JohnstonMurphy.com",
			"items": ["rustandtrust", "millennialmiss", "mycreativelook", "amardahal", "noahwilliamsstyle", "classytendencies", "esthersanter", "mrdavvee", "", ""]
		}, {
			"email": "info@rachelzoe.com",
			"items": ["", "rachelzoe", "stylevoila", "opalbyopal", "hautehustla", "ellaarose", "thebrockbabes", "fashionismyfortee"]
		}, {
			"email": "msrobin@nataliefragrance.com",
			"items": ["nataliewood", "simplysharontate", "forevergracekelly", "fixation.nation", "rileysmammyx"]
		}, {
			"email": "marketing@abershoes.com",
			"items": ["magdamaciejowska", "ok_kovtun", "alexsalavarrieta", "maarikaa91", "angela_maciag", "iam_alessiaa", "kamciaaa00", "zoevassileiou"]
		}, {
			"email": "marketing@sleafjewel.com",
			"items": ["rosalimaloureiro", "sienna.hollen", "chocolateismyvice", "kari____kari", "meachywong", "julia.tric", "diletta2605", "justmblair"]
		}, {
			"email": "ivyguo@b.ja-corp.com",
			"items": ["hendoart", "killerquinncosplay", "tashi.ogeekgirl", "richellaloree", "a.li.as", "erikacosplay", "arsenio.arsenal", "teamashen"]
		}, {
			"email": "tuanbobaizhong911@gmail.com",
			"items": ["getfitwithcabi", "josiie.bee", "lexalamode", "alohakatiex", "margheritadarienzo", "thepolishedapproach", "itsamandalauren", "mrandmrsinteresante"]
		}, {
			"email": "affiliate_dresslily@dresslily.com",
			"items": ["caroland14", "sadiegrayheart", "glitterina17", "eduardag.__", "rosiesoile", "crisxtyle", "luisiana.romanella", "asiove_love"]
		}, {
			"email": "Daniel@jumperthreads.com",
			"items": ["cori.story", "chasingjuliawild", "moderntarzan", "alfaroandreas", "stronglikesosa", "_juni_gutierrez", "ninja_natalie", "rikkicarman", "mindful_jess"]
		}, {
			"email": "info@sunglasswarehouse.com",
			"items": ["leahshoup", "roulette_travel", "pattys_kloset", "spence.spends", "lunaticatlarge", "rdulay", "tourist2townie", "rachelmeetsplanet"]
		}, {
			"email": "lori@rosengrouppr.com",
			"items": ["miravellichor", "sofi_ja069", "golden.floral", "maryjobenz", "saba.hamburg", "lealeini93", "modeweltmuenchen", "fountainof30"]
		}, {
			"email": "aris.bsjr1@gmail.com",
			"items": ["mgederos", "jake_cantsleep", "alyssaruizxo", "sarahrav", "palkinfitness", "joharryburgos", "noah_bfit", "ifbbpro_michaelspencer03"]
		}, {
			"email": "dylan@oliversapparel.com",
			"items": ["grant_michaels_", "iamredcavi", "meetmeeker", "gamzatus", "enyou_wang", "nathanmmueller", "britwkent", "itscameronhinkle"]
		}, {
			"email": "info@suitusa.com",
			"items": ["imsanjaysinghal", "humblecurrency_", "carmen.gabriel.official", "spiritualgod33", "canerkurtulus", "artofthegent", "bespokuture", "thearabgatsby"]
		}, {
			"email": "munish@mrmisocki.com",
			"items": ["hamzaxnour", "zonmbei", "chaneeuncanny", "atpratt", "jabranelanyar", "yorker75", "raffy_run", "ryan.warrender"]
		}, {
			"email": "marshal.downey@scalablepress.com",
			"items": ["caitlinmosley", "iamkristynevelyn", "cmikegetfit", "morgan_lynn97", "juliannagreen", "yogamerman", "hessian_hellcat", "ninacbrock"]
		}, {
			"email": "petwr@peachcouture.com",
			"items": ["eyedavenport", "elle.pinkk", "celia_rnts", "callmeimmmature", "patricejwill", "rylee.bogden", "swordssugars", "jaimeshrayber"]
		}, {
			"email": "elisa@bymilaner.com",
			"items": ["kara_bino", "serena.spinucci", "audreyrivet", "emilyrachael_", "melissalharris", "serena.spinucci", "frassyaudrey", "claudia__ciocca"]
		}, {
			"email": "joseph@bohowrapsody.com",
			"items": ["officialdanivi", "sam_adams_duh", "britt_mcmahon", "liz_kerr_", "michaelgiragosian", "marianamcdonald", "meghan_mua", "imchristal"]
		}, {
			"email": "suman@corsetdeal.com",
			"items": ["thenotsoavgbermudian", "etherealchocolategoddess", "callixxoo", "aliceinlingerie", "mariedauphine", "taradarson", "paperpashes", "h.emerocallis"]
		}, {
			"email": "chitra@gozaida.com",
			"items": ["kara_bino", "serena.spinucci", "audreyrivet", "emilyrachael_", "melissalharris", "serena.spinucci", "frassyaudrey", "claudia__ciocca"]
		}, {
			"email": "affiliate@sherop.com",
			"items": ["kara_bino", "serena.spinucci", "audreyrivet", "emilyrachael_", "melissalharris", "serena.spinucci", "frassyaudrey", "claudia__ciocca"]
		}, {
			"email": "monirj@instantfigure.com",
			"items": ["alyssacastillo1", "danielle_curve_model", "iamtulin", "aneutrallife", "curvygirlchic", "sarahssss", "wendoleeayala", "barefootkimtessa"]
		}, {
			"email": "elena@undercovermama.com",
			"items": ["laurajcampana", "mombossofboys", "aashhhhlee", "nicollette.vizuet", "alexazurcher", "girl.mom.of.1", "janninemackinnon", "lifeofcoco_"]
		}, {
			"email": "boxofstyle@zoemg.com",
			"items": ["linhniller", "leaura", "fashinny", "fashionismyfortee", "brookedauval", "tamminsursok", "alltheprettys", "rachelzoe"]
		}, {
			"email": "pr@teleties.com",
			"items": ["marisabarbarise", "everyday__rae", "bnlove.yoga", "rachelloebs", "katherinemason_", "slduke", "styleelyst", "thegeelife"]
		}, {
			"email": "meg@wearnyla.com",
			"items": ["laurenhendrix92", "dawnpdarnell", "dsweetest_", "shelbymoroney", "courtney_shields", "stacie.lamothe", "sarah_jade_huntsville", "classycleanchic"]
		}, {
			"email": "dave@shinesty.com",
			"items": ["shawncey", "lorynpowell", "crazyclev1", "kingsbu", "taylor_tails_", "iamdanielburke", "mr_brickster", "chill_sgt_luke"]
		}, {
			"email": "alex@papercape.com",
			"items": ["mamacopfer", "diva.on.a.dime", "atgreenwell", "chasing_rainbows34", "nicola.gram", "emmalews", "trendy_boys_adventures", "mamanicole215", ""]
		}, {
			"email": "chloe@dossier.co",
			"items": ["lilymateo", "mandycon", "jadorelexiecouture", "susiessu", "leahlynnxo", "deekaaybright", "tiffbenson", "perfumetalks", ""]
		}, {
			"email": "rginfo@robertgraham.us",
			"items": ["tomfetner", "dustinpoirier", "thejoshaltman", "casualfridaze51", "donovan.mcdaniel", "chuchovaldesoficial", "samuelanthony", "jakejensenofficial"]
		}, {
			"email": "vera@boldcactus.com",
			"items": ["stirandstyle", "kimiellie", "missminussized", "linhwinn", "belledecouture", "livinlikelarz", "wink_and_a_twirl", "readytwowear"]
		}, {
			"email": "ben.walter@indochino.com",
			"items": ["thee_urban_gent", "iammrmartinez", "kurtzorpia", "tesschristinexo", "thestylishgrownman", "adryanhanson", "dylanbenjam", "daneshhanbury"]
		}, {
			"email": "support@cricut.com",
			"items": ["pigskinsandpigtails", "thelittlegreenbean", "shondellsdecorllc", "909prettypetals", "thepixiedustorchid", "mysisterssuitcase", "bebechicdesign", "paperbloomsla"]
		}, {
			"email": "hello@sebastiancruzcouture.co",
			"items": ["dandyman_gumede", "whiter35gtr", "mr.anderssons", "mrfresco_", "ataca_official", "gentlemenlobby", "the_bespoken", "lowkeydandy"]
		}, {
			"email": "hello@vanityplanet.com",
			"items": ["anasmakeupartistry", "kaylaraereid", "marcelleleblanc_", "lyndellwerling", "kenziemeads", "saralrash", "misspaigekoren", "gianasiska_"]
		}, {
			"email": "info@flexwatches.com",
			"items": ["derekhurtado", "notyouraveragedogtor", "robvaka", "autismdads", "dscript__________", "trav", "andresoukmma", "katze_la"]
		}, {
			"email": "support@inkkas.com",
			"items": ["krystaleverdeen", "bronwynprice", "stilettosandsincity", "fridasbrow", "katiegodec", "oksanyta", "naturalthetrainerrr", "karidane"]
		}, {
			"email": "Customerservice@drfuhrman.com",
			"items": ["eattolive_retreat", "eattolivedaily", "kitchenofyouth", "joyimd", "mariofabbri_tryingvegan", "taliafuhrman", "glasshealthfull", "planttrainers"]
		}, {
			"email": "kevin@noblecarriage.com",
			"items": ["thisblessed_wife", "thehouseandthehen", "rachelcast", "chrissyjpowers", "pauvivas", "greyandscout", "alexisjadekaiser", "newdarlings"]
		}, {
			"email": "hello@illuminatecosmetics.com",
			"items": ["nicholerayartistry", "kimdaugherty_", "renatagermanno", "ashleytisdale", "danielahofficial", "kelsey93maher", "mallorcakid", "postmodernindigenous"]
		}, {
			"email": "support@wearellison.com",
			"items": ["jetsetdior", "thedannywilliams", "annzabonanza", "iamgreece", "therealloggy", "meeshindle", "michelleciotti", "johnparkerbach"]
		}, {
			"email": "contact@talentless.co",
			"items": ["laadylah", "letthelordbewithyou", "sergiofernandespreto", "burberry.erry", "savannahlangham", "woodreaux", "daveophilly", "samglamm"]
		}, {
			"email": "info@featsocks.com",
			"items": ["caseywebbster", "beyondthetats", "riz_kahn1", "taylorparker", "michaelrobertkuhn", "mikimango", "geno1989", "tdtrains"]
		}, {
			"email": "monirj@instantfigure.com",
			"items": ["brandongirtzmma", "walkinpets", "mayathedox", "cutest_goldens", "sassywoof", "dudethedoood", "hilothegoldendoodle", "peytonthedoubledood"]
		}, {
			"email": "strongselfie@gmail.com",
			"items": ["chloe.oceana.h", "olivia.lucia.h", "mamaofboth83", "lovenatalyn", "fiamiadancer", "audrey_dancer08", "growingupglad", "fittestcore"]
		}, {
			"email": "katina@marcellamodanyc.com",
			"items": ["themjelle", "katestoltz", "theprimpysheep", "exploring_simple", "thoughtfulmisfit", "ligiawanderley", "preppyfashionist", "aloebella"]
		}, {
			"email": "marianna@hellojackalo.com",
			"items": ["ministylemag", "growing.oak", "elianeroest", "superafroboys", "danishpainter", "simplylivandco", "melanienicolejespersen", "motheruntitled"]
		}, {
			"email": "support@candid.com",
			"items": ["colonelmueller", "_ashleymontano", "avacapra", "evaacatherine", "seniaax3", "_jo.anastasia", "tashacourtney", "the.becktriplets"]
		}, {
			"email": "annie@kabrita.ca",
			"items": ["bigcitymoms", "midwestdimples", "madelinedelage", "hippiemamangelbaby", "thewilliamsparty", "everything.lilyrose", "hollymomtress", "littlemonkeysonthebed"]
		}, {
			"email": "anthony@federalfulfillment.com",
			"items": ["rachaelthewino", "hayleyscellar", "the.wine.girl", "watchmesip", "wine.gini", "thewineabout", "joaniemetivier", "winelifestyle_"]
		}, {
			"email": "agentcru@winespies.com",
			"items": ["rachaelthewino", "hayleyscellar", "the.wine.girl", "watchmesip", "wine.gini", "thewineabout", "joaniemetivier", "winelifestyle_"]
		}, {
			"email": "lsimon@knork.net",
			"items": ["champagneandcookies", "thejoyfultribe", "hereslookingatyoula", "lismarie_lifestyle", "ohsodelicioso", "cleaneats_cleantreats", "thejoyfultribe", "mariamarlowe"]
		}, {
			"email": "jim@yu-be.com",
			"items": ["thesparkleenthusiast", "glowbelll", "nazish.blog", "butterandbeauty", "snuggle_bunnies", "spence.spends", "beautychick101", "runnineverlong"]
		}, {
			"email": "lissa@join-eby.com",
			"items": ["meridethmorgan", "georgia.zamai", "janalynkristine", "ashleigh_dunn_", "thecurvyclass", "chloemarshall01", "skhammer", "tanielle_powell"]
		}, {
			"email": "faith@crowdcow.com",
			"items": ["mrfrankstagram", "robertsandberg", "zeferinomma", "vertsmoke", "revolutionbbq", "meatslayerbbq", "smokeafattybbq", "captsophie"]
		}, {
			"email": "info@childscupfull.org",
			"items": ["sica_schmitz", "youngxable", "peacefuldumpling", "darzahdesigns", "jillematthews", "stillbeingmolly", "muslimgirl", "suror"]
		}, {
			"email": "grozon.wb@gmail.com",
			"items": ["lovepjnoj", "tinytastesworld", "bovbakerortho", "luxelabelbrows"]
		}, {
			"email": "jack@outofthegreycoffee.com",
			"items": ["adudewithfoodny", "maryna_moroz_ufc", "coffee_attendant", "nazaninsdiary", "theholybarista", "loveespressouk", "baristadaily", "thetrendybarista"]
		}, {
			"email": "kaivand@completenutrition.com",
			"items": ["jamielynnlifts", "mitchford_surgingeneral", "tyluer_mikal_chancy", "fremontfatloss", "50_shadesofwhey", "madixfit", "surgesupplements", "briresilient"]
		}, {
			"email": "blair@personalcheftogo.com",
			"items": ["alexhonnold", "sannimccandless", "homemadewanderlust", "darwin_onthetrail", "chicstripes", "fitlife_by_jennifer", "mike_ledesma", "chefmichaelmacknight"]
		}, {
			"email": "houman.s@nutritioncorp.com",
			"items": ["anthonynapo", "josh_herrin", "cbuchanan68", "amybilquist", "bradleyward757", "kels.movement", "tylerabron", "katieledecky"]
		}, {
			"email": "affiliates@obersee.com",
			"items": ["gymnast_mariaisabella", "gymnast_haley8", "gymnast_savvyg", "stellat927", "noegymnast", "charleigh.bullock", "_gymnastisabelle_", "jordanmatter"]
		}, {
			"email": "rb1canobe@aol.com",
			"items": ["hair.editary", "fabricatingfringe", "hairlossboss", "jonrenau", "baldmothertucker", "lusta.hair", "kimdubs_", "polycystic_coiffure"]
		}, {
			"email": "jackie@Myrecess.co",
			"items": ["madelaine_oconnell", "wanderwithmacy", "garrettmunce", "_beautybee", "jillarsen_magicmix", "lisamateowellness", "jeannine_morris", "michprom"]
		}, {
			"email": "adam@hightly.com",
			"items": ["eattolive_retreat", "eattolivedaily", "kitchenofyouth", "joyimd", "mariofabbri_tryingvegan", "taliafuhrman", "glasshealthfull", "planttrainers"]
		}, {
			"email": "Ellen@spinaorganics.com",
			"items": ["propetclub", "davidflorentin", "rebeccacorry", "pudgethepit", "maedayrescue", "iwonaburnat", "philippa_pippa", "marley.the.doodle", "scotlandwithfluffywolf", "_beagle_ben", "luna_thelurcher", "zweichaoten_aufvierpfoten", "husky_umka", "felineflora", "wakanfamily_siberianhusky", "joinmyescape"]
		}, {
			"email": "earlt@mymorphiis.com",
			"items": ["brickellista", "ounowho", "juvea", "lafashionbae", "kellysaks", "ariellecharnas", "floritadiaz_", "lissamrios"]
		}, {
			"email": "laura.vanmarter@greensproutsbaby.com",
			"items": ["simply.siobhan", "erinphraner", "mrslizhenderson", "babybums", "travelingtribe_", "how_lo_grows", "maureeneisenhart", "whitmargolis"]
		}, {
			"email": "annalynn.jefferis@gmail.com",
			"items": ["masteringfrugality", "5ivefingaz", "talk2spirit", "liztwotimes", "frugalteacher", "sistercircletv"]
		}, {
			"email": "alliheafner@outlook.com",
			"items": ["tizkai", "billionaireheaven", "menwithstyle", "dandyinthebronx", "streetsfashions", "classywolf", "bestofmenstyle", "dandy_elegance", "sinkthesun"]
		}, {
			"email": "austin.ratner@hp.com",
			"items": ["mflynnpete", "paperfashion", "_laurennelson_", "foxyoxie", "zinafashionvibe", "fashionablehostess", "sidesmilestyle", "juliahengel"]
		}, {
			"email": "team@thespoiledmama.com",
			"items": ["laceynycole", "sarahevanlandingham", "sweatsav", "hopegabriela", "carachatwin", "evisiskos", "simplybethanyxo", "arbyerley", ""]
		}, {
			"email": "info@isharya.com",
			"items": ["theswishceo", "komalpandeyofficial", "diva.dhawan", "anushreeaaneja", "madlysophisticated", "radhikamehra", "ojasrajani", "thesilksneaker", ""]
		}, {
			"email": "valeria@teadorabeauty.com",
			"items": ["marianaa.ruelas", "daf_hne", "_clarityoga_", "aidasnek", "syoghina", "kanoeinh20", "seenewskincare", "stacycoxbeauty"]
		}, {
			"email": "dan@buddynutrition.com",
			"items": ["vikadove", "dawnbythe_sea", "lauramariapyt", "markva_usa", "christinaemiller", "allisonmjoy", "floragitsis", "medkarina"]
		}, {
			"email": "szieminski@gmail.com",
			"items": ["ahammettfit", "macro_chef", "thenutritiouskitchen", "fooddolls", "chiddy3", "swiftwellness", "melissafabiano_", "kanoeinh20"]
		}, {
			"email": "love@humnutrition.com",
			"items": ["queen_kirstennn", "trinaalbus", "kayleighskloset", "enchanted_but_not_amused", "detailed_beauty_", "jolenegoring", "mijamorena", "christyclassyfied"]
		}, {
			"email": "he@halloweenempireonline.com",
			"items": ["orijahnelmakeovergroup", "thedapperdogbox", "dasa_lavric", "master_makeup_bremen", "halloweendays", "hollyjollyjackolantern", "thehalloweencollector", "spookylittlehalloween"]
		}, {
			"email": "anna@theladybag.com",
			"items": ["carliestylez", "cameronbrooke", "adelainemorin", "dthompsy", "kathleen_barnes", "zoelaz", "caraloren", "freckledredfox"]
		}, {
			"email": "dustin@pupjoy.com",
			"items": ["theevilsiberianhusky_", "lilmaisiemarie", "simba.sha", "mydogiscutest", "sirmacsoncheese", "good_golly_ms_shollie", "winstondadoodle", "mrkevindoodle"]
		}, {
			"email": "affiliate@aunaturaleglow.com",
			"items": ["gretameyle", "kendra.lspringer", "thatgreenbeautylife", "thegirlwhocanteat", "sanpedrochar", "helloislandmama", "prettypureally", "osmiaorganics"]
		}, {
			"email": "schen@graciousstyle.com",
			"items": ["tableanddine", "stylemeetssoiree", "southernladymag", "mothermag", "cheryleisen", "deerwoodandjones", "thefrenchnestcointeriordesign", "christinemarkatosdesign"]
		}, {
			"email": "phil@projectalta.com",
			"items": ["sany.delight", "thomassengstrom", "theselfmadementality", "mackenziebaker_", "louisa.carmela", "fitfusionhealth_", "alexushfitness", "elegantalchemy"]
		}, {
			"email": "joe4sweetann@gmail.com",
			"items": ["theperrittenest", "amybelievesinpink", "itsme_irinaz", "candyygordon", "chey.pearson", "styleinherited", "haileeday_", "karlaplusthree"]
		}, {
			"email": "customercare@Lipogenbio.com",
			"items": ["juicesandberries", "joellenlove", "hanna.j.smith", "hunterase", "mackennarae", "holisticrx", "aitravelsblog", "heidiisms", ""]
		}, {
			"email": "Svante@xlashcosmetics.com",
			"items": ["urstruly_nika", "sacha.bourget", "rozadleir", "ida_elina", "millyjeanmodel", "elmazingg", "u.ladycleopatra", "junedivino", ""]
		}, {
			"email": "vanessa_rojas@airweave.us",
			"items": ["stylegf", "krisztina__1", "meryledavis", "teamzagitova", "charlieawhite", "thisthriftedabode", "mlee73", "aaronblunck"]
		}, {
			"email": "elizabeth@balooliving.com",
			"items": ["imserenalee", "kaleydignen", "rebecca_kearns", "pipshome", "blablakidsshop", "house.of.darlings", "chelseamohrman", "sarah.betsy"]
		}, {
			"email": "affiliate@mykeyport.com",
			"items": ["collinmontenegro", "greysentinel", "carryology", "edcdads", "antigearco", "everydaycarry", "alexetiawan", "ultralinx"]
		}, {
			"email": "leigh@alasaw.com",
			"items": ["tombeckbe", "adidstudio", "evanlanier", "gardenandgun", "homewoodlife", "studiomcgee", "amberinteriors", "em_henderson"]
		}, {
			"email": "jonsieling@kindjuice.com",
			"items": ["miami", "niallsgurl1d", "jamaicapics", "thejamaicainn"]
		}, {
			"email": "ccardi@blacktie.com",
			"items": ["spencer_j_davis", "jonsum0224", "carlradke", "diggymoreland", "coreybrooks", "georgesats", "everettscottweston", "crownmejordan"]
		}, {
			"email": "iainfo@InfiniteAloe.com",
			"items": ["makeupby_amy03", "honest_reviews21", "alessandro_nicoli_cotugno_", "meganmarod", "mandorlabeauty", "jaxodyssey", "micheladoesmakeup", "moreturquoise"]
		}, {
			"email": "info@okioki.com",
			"items": ["alexafrancesofficial", "cocovandey", "chrisandnate", "shelbsrogers", "saigepetersonn", "robpannell3", "missmalindakat", "justgohwithit"]
		}, {
			"email": "marissa.whisman@shoppriceless.com",
			"items": ["fashion.chic.outfits", "janalynkristine", "thenicolejsmith", "breleee", "itslittlelily", "catherine.grey", "minielenarose", "taliacupcake"]
		}, {
			"email": "info@idlesleep.com",
			"items": ["christiana_raquelle", "maeganvogelfit", "keelygoshia", "alwaysxright", "emilyrose.simmons", "carter27x", "thesleepdoctor", "dr_oz"]
		}, {
			"email": "lacy@laceluxuryhaircare.com",
			"items": ["yourprimadonnagirl", "thesalonproject", "thais_stark", "sophiasosweet", "trubeautyconcepts", "thepaintedblondexo", "jeannielong_", "amyyvaughan"]
		}, {
			"email": "aryan.fazeli@knutri.com",
			"items": ["kindketomama", "thestairlady", "aryfazeli", "brickhouse11", "diaryofashrinkingmommy", "ketomadman", "jovanafit", "getfitwjessica"]
		}, {
			"email": "sandra@thecollectivechild.com",
			"items": ["eloisero_", "carisa.tuma", "analeisethomas", "kiararuth", "ktnewms", "danaavidancohn", "madisonbontempo", "tamaratsamoudakis"]
		}, {
			"email": "contact@eden-lifestyle.com",
			"items": ["pencilskirtprep", "musingsofashopaholicmama", "occasionallyblonde", "oneteachersstyle", "everydayteacherstyle", "iamterrib", "hellofashionblog", "sleepprayshop"]
		}, {
			"email": "dawn@revelwineclub.com",
			"items": ["oythebaker", "lacrusia", "womenwholovewine", "marcusjohnson360", "giorgiacapriglia", "emmeviloves", "raffi.carti", "saraandcatherinestales", ""]
		}, {
			"email": "info@shophbd.com",
			"items": ["acleanbee", "the_aesthetic_side_of_homes", "dontmesswithmama", "livingwithlandyn", "pillowguy", "thesinceremama", "healthmagazine", "carolina.moves"]
		}, {
			"email": "elizabeth.povarova@zazzle.com",
			"items": ["corgiclubcolton", "turtlecreeklane", "designsbyashleyknie", "our_forever_farmhouse", "rachelleswannie", "cohlab_nyc", "thetattooedteacherblog", "angiebellemare"]
		}, {
			"email": "general@levimoon.com",
			"items": ["yankodesign", "mrclassinc", "stargazer_official_", "lukealexn", "ashowens_", "wanderlustyralu", "laurahadlow"]
		}, {
			"email": "ken@lomaliving.com",
			"items": ["heygents", "copycatchic", "nordicstyle", "getliftedmiami", "rusty_woods", "madaboutcycling", "vonderbarre", "trainbyscience"]
		}, {
			"email": "zach@craighill.co",
			"items": ["scwaudby_33", "vicente.munoz", "itsjonwebster", "stillhousenyc", "joelhypponen", "rene_lionheart_", "timothyhungcom", "hub_furniture"]
		}, {
			"email": "vflores@luxbeautyclub.com",
			"items": ["murielvillera", "mimisanchezblog", "nicolelynnbeauty", "tabetha_and_co", "jiacollection", "bduerrer", "aviyr", "u.glow.girl"]
		}, {
			"email": "amanda@gabrielcosmeticsinc.com",
			"items": ["thatgreenbeautylife", "veganmalory", "lifewithlibby", "livingincolorblog", "heathersymmes", "katiewrightyoga", "hellorigby", "azra_greenbeauty"]
		}, {
			"email": "fabienne@eccobella.com",
			"items": ["tenaciouslyme_", "daughtersandthings", "laura_bruj", "mommareview", "everything__e", "emilyt97_", "samhunter.fit", "iamlauramadden"]
		}, {
			"email": "cc@chelseacharles.com",
			"items": ["belenmozo", "michelebell21", "hilliardstudiomethod", "syd_michaelsgolf", "victoriagolf", "alismithstyle", "tingmystyle", "houseonwinchester"]
		}, {
			"email": "amanda@lunabazaar.com",
			"items": ["budgetsavvybride", "kari.teel", "minteventdesign", "blacktwine", "emilyayerthomas", "roque_80", "leneed", "samanthasommelier"]
		}, {
			"email": "service@greatbigcanvas.com",
			"items": ["pjandthomas", "dreaminghomeblog", "homemadehappinest", "theviewfromtobaccoroad", "momentsonmayfair", "houseof.lais", "haus.of.kerr", "themustardseed205", ""]
		}, {
			"email": "support@uqora.com",
			"items": ["fitcityblonde", "elizabethwilson711", "caleeshea", "pillclub", "jyssicayelas", "rachel_katz_", "georgiemorley", "mswendyrose"]
		}, {
			"email": "hello@forkandmelon.com",
			"items": ["aesthete_skin", "rosalierouge", "ofshahanajan", "ashley.valenzuela", "luxefinds", "glowingwithgina", "anaberdesign", "katzieguyhamilton"]
		}, {
			"email": "tyler@bellysleep.com",
			"items": ["thebrunetteblend", "maija_jambalaya", "majestapatterson", "wildthingbend", "dr.mmallet", "brandys.adventures", "gratefully_home", "pureandessentialliving"]
		}, {
			"email": "mattia.sarfati@ledger.fr",
			"items": ["crypto_queenfx", "performante.ca", "sharecrypto", "jasonsallman", "justintronsun", "scottcbusiness", "thebitcoinman", "boxmining", ""]
		}, {
			"email": "mail@gnr8.biz",
			"items": ["gingkodesign", "thebestgiftideas", "mao_loves_art", "notjustashopual", "himwhatshisname", "allisongappa", "chandellepaints", "lorenzo_paglialunga"]
		}, {
			"email": "lisa.stadler@tractive.com",
			"items": ["scotlandwithfluffywolf", "_beagle_ben", "luna_thelurcher", "zweichaoten_aufvierpfoten", "husky_umka", "felineflora", "wakanfamily_siberianhusky", "joinmyescape"]
		}, {
			"email": "help@twillory.com",
			"items": ["ianjamesstauffer", "de.vo.n", "dapperprofessional", "runnineverlong", "gent.life", "jeffreyebeane", "businessformal", "mrjunho3"]
		}, {
			"email": "info@amatag.com",
			"items": ["oliviapalermo", "clairearceri", "womenfashion300", "specscollective", "briana_linea", "shaymitchell", "sleepinthegarden"]
		}, {
			"email": "info@opposuits.com",
			"items": ["scottrogowsky", "elgosso", "almogshur", "thechadflexington", "gabecnc", "owen.atlas", "antonielokhorst", "zakadit"]
		}, {
			"email": "online@beautyplussalon.com",
			"items": ["lemoneyway", "crackhairfix", "beautyplusnewcity", "babe_lash", "essie", "essieclubcollab", "brooklynbaileyfashion", "pacinos"]
		}, {
			"email": "zareena@supercheapsigns.com",
			"items": ["wynwoodexoticcars", "monkeeboyweb", "baldwin_innovative", "aaron.j.marshall"]
		}, {
			"email": "help@petflow.com",
			"items": ["scotlandwithfluffywolf", "_beagle_ben", "luna_thelurcher", "zweichaoten_aufvierpfoten", "husky_umka", "zakgeorge", "vegaskingbenny", "max.theyellowlab"]
		}, {
			"email": "support@ultrascopes.com",
			"items": ["matt_spano8", "alexspinoso_md", "spoonienursingstudent", "lifewithleenrn", "tiffanywpa", "alexspinoso_md", "yournursingeducator", "katybpnp"]
		}, {
			"email": "info@bestbullysticks.com",
			"items": ["theperintonpup", "standardpoodleben", "auggie_the_sheepadoodle", "stella_and_summit", "thecutestcavs", "manny_and_gizmo", "babyandswayze", "hunterthelagotto"]
		}, {
			"email": "support@olloclip.com",
			"items": ["kapowui1", "odd_bbaron", "surfrider", "vipp", "nickgreenphoto", "blaznazn77", "jamesleithart", "jcastroracing", "leo7000", "nowfalnawas"]
		}, {
			"email": "hello@bulubox.com",
			"items": ["eleahphant", "mariabirta", "kyleekrashlanding", "honeybunnytwee", "be.lovingly.curious", "madalingiorgetta", "athenanaa", "our.chaotic.little.life"]
		}, {
			"email": "customerservice@tnvitamins.com",
			"items": ["raul.martinez.jr", "alifiori", "kettlebell_kisses", "johnnyaction", "livinglately", "kayleigh.christina", "captain_hanks", "jbenchampion"]
		}, {
			"email": "TEAM@BARBELLAPPAREL.COM",
			"items": ["paynetank", "_jessicawester", "suspencefitness", "mgederos", "ajbuckley", "supermanisking", "alexdwong", "cynthialeu"]
		}, {
			"email": "info@entrepreneurnow.com",
			"items": ["visionofsuccess", "bigskyvs", "thestreetquotes", "iamemmamumford", "gabbybernstein", "lewishowes", "jayshetty", "tombilyeu"]
		}, {
			"email": "jake@trubrain.com",
			"items": ["raul.martinez.jr", "alifiori", "kettlebell_kisses", "johnnyaction", "livinglately", "kayleigh.christina", "captain_hanks", "jbenchampion"]
		}, {
			"email": "questions@proactiv.com",
			"items": ["ddpaivablog", "brittanyrosemarie", "theprettypeacefulhome", "beautybyrani", "ayzia_", "taylor_cuqua", "simplysheppard", "adrilunamakeup"]
		}, {
			"email": "info@grafomap.com",
			"items": ["heleneisfor", "rubyredslippers8", "duni_cheri", "thestylevisitor", "aretastylesecrets", "emlee7", "thetrendist", "sweet_domicile"]
		}, {
			"email": "bunny@meetblume.com",
			"items": ["thebeautyhobbyist", "madixfit", "skintotheglow", "prettyinclean", "areynoldsbeauty", "jaxhoof", "beccasbeautylist", "the.skinny.on.skin"]
		}, {
			"email": "customerservice@beautystoredepot.com",
			"items": ["joplacencio", "phyrra", "modernbeautymisfit", "slayingmuffintops", "nursestephanieri", "_makeupjo", "misscassielomas", "ginamberx"]
		}, {
			"email": "support@laylopets.com",
			"items": ["buddyboythefrenchie", "bellyrubsandbullysticks", "kdiondesign", "alska_wild", "normanthepomsky", "pumpkinandparker", "minidood.copper", "jaclynrjohnson"]
		}, {
			"email": "tracey@dorissleep.com",
			"items": ["tracewall", "onbeing", "goodscty", "nathb", "megluciano", "jessellon", "thecrunchymommy", "sassytownhouseliving"]
		}, {
			"email": "affiliates@paws.com",
			"items": ["theswaghound", "hotrodmel", "diondesign", "alska_wild", "normanthepomsky", "pumpkinandparker", "minidood.copper", "jaclynrjohnson"]
		}, {
			"email": "support@ovcio.com",
			"items": ["carcar62", "msbeltempo", "alexandreagarza", "jeanwang", "karine_trudel", "sofiacashmere", "collagevintage", "vanillaattack"]
		}, {
			"email": "marykevin@daydreamsociety.com",
			"items": ["lindseybalbierz", "twinkletwinklelittleparty", "favorlaneparty", "cakeandconfetti", "occasions.byshakira", "kelseyklos", "hapa_babes", "basheryandco"]
		}, {
			"email": "help@skylightframe.com",
			"items": ["my.purposed.place", "bellarosamama", "littlesouthernwife", "bellepetitebabe", "mckenzieryan", "shutthefrontdorrblog", "canary_jane", "mrsseacannon"]
		}, {
			"email": "jon@kingkanine.com",
			"items": ["chunk.the.corgi", "hotrodmel", "diondesign", "alska_wild", "normanthepomsky", "pumpkinandparker", "minidood.copper", "jaclynrjohnson"]
		}, {
			"email": "halloweenspot@halloweenspotonline.com",
			"items": ["orijahnelmakeovergroup", "thedapperdogbox", "dasa_lavric", "master_makeup_bremen", "halloweendays", "hollyjollyjackolantern", "thehalloweencollector", "spookylittlehalloween"]
		}, {
			"email": "customerservice@zutano.com",
			"items": ["momlifepnw", "kayleemariebaggerly", "sowewent", "josy.castro1", "theashmoresblog", "mirandaleconte", "clairesuni", "lisaaamot"]
		}, {
			"email": "customerservice@shabbychic.com",
			"items": ["ritalavoe", "rachelashwell", "heathersshabbycottage", "theselect7", "makeupbykevan", "benpeckwhiston", "sweetshadylane", "kateymcfarlan"]
		}, {
			"email": "support@foxybae.com",
			"items": ["mstaejordan", "officialrozen", "belindaarosee", "breemojo", "rawbeautybynatalie", "lea_toshiye", "maranda.makeup", "elybabay"]
		}, {
			"email": "mediateam.im@pg.com",
			"items": ["scottmcglynnofficial", "thisiselijahrowen", "chezrust", "donna.bartoli", "thenakedprofessor", "samgraystyle", "sedthegent_", "chico_branco_", ""]
		}, {
			"email": "conrad@rallylabs.com",
			"items": ["taligatingchallenge", "izzygoodkind", "maxtwitty_", "lindsaysolmer", "dinadee_fit", "evanfitness_nyc", "livetoeatnyc", "talkdirty2yourfood"]
		}, {
			"email": "alexandra.leon@nutripur.com",
			"items": ["chocoviv", "bloomandclementine", "dougcookrd", "nutritionartist", "andriadelia", "mirandamalisani", "nalieagustin", "itslivb"]
		}, {
			"email": "Shaun@soudasouda.com",
			"items": ["chloepark", "benjaminvandiver", "noznozawa", "desireecasoni", "alilabelle", "laetitiawajnapel", "jessicagersteninteriors", "sheenamurph"]
		}, {
			"email": "help@lazyone.com",
			"items": ["goldendoodozzy", "olove.branch", "olgaurbanovich_", "meetthemillersfam", "bowtifillife", "cecilakissel", "babybaileymamadrama", "colleen.travels"]
		}, {
			"email": "erik@buddypetfoods.com",
			"items": ["fridolita", "tina_the_staffy", "life.of.nalle", "anderssonelinase", "teamfaytastic", "kennelpawsome", "jinglebellan", "alfons_the_staffy"]
		}, {
			"email": "saskia.hansen@exporttechnologies.com",
			"items": ["ohsofemme", "caitlynlendrum", "beth__notron", "abbyparsonss", "imhols", "thestylebee", "honeybelleworld", "cosmetics.junkiee"]
		}, {
			"email": "MattP@LuxePillow.com",
			"items": ["minimarie_fit", "itskenzieriley", "kristieramo", "nojo18", "kikidickson", "juliandaigre", "arianna_danielson", "ashleynicoleinteriors"]
		}, {
			"email": "peopletree@acquire.co.uk",
			"items": ["marta_canga", "biancamitabsatz", "enbrogue", "margottalks", "beatriceturner", "storiesbehindthings", "khal_essie", "nicoleocran"]
		}, {
			"email": "humaira@rawindigo.co.uk",
			"items": ["enslucas", "davidfranzofficial", "inked_ror92", "bradxcollins", "dfmarin", "jakewhitehouse", "richalbrow7", "alexcannon"]
		}, {
			"email": "cadi@lilyandlionel.com",
			"items": ["eliza_everyday", "annarrclaudia", "oliviaandalice_", "wearsmymoney", "thefashion_lift", "biancaderhy", "sara_waiste", "doesmybumlook40"]
		}, {
			"email": "Lisa.boelee@debijenkorf.nl",
			"items": ["fashionfoeofficial", "ilyshanielo_", "astridvangeffen", "katjasschuurman", "roksy1304", "goldie_estelle", "thebeauparlour", "juliaverbij"]
		}, {
			"email": "support@taniusa.com",
			"items": ["titaniusmaximus", "ali_princeofpersia", "jamiejaypagan", "i.am.andy", "ryan.rossman", "nikowirachman", "mccartneywild", "tommydidario"]
		}, {
			"email": "cs@planttherapy.com",
			"items": ["hannahshanae", "meagansbookclub", "digitdax", "euphoricherbals", "witch_in_the_woods", "victoriadean_", "mommy.nicole", "kali.nicole.leach"]
		}, {
			"email": "smerrell@silverjeansco.com",
			"items": ["rayanaragan", "casperjanning", "tanaaa.m", "mikaela.wightman", "thefoxandfern", "jaymie_parks", "leannepearson", "lifestyleofleslie"]
		}, {
			"email": "service@cs.chasing-fireflies.com",
			"items": ["emilyjackson", "mrsalikatz", "quincyandskylar", "jaggercraig", "rondamcnae", "rhys_olivia", "annie.hutchings", "thelivbits"]
		}, {
			"email": "service@cs.travelsmith.com",
			"items": ["julia_korf_", "tiaa007", "kristineszabo", "lisasloodts", "drielybennettone", "theplanetd", "shoppingwithclaudia", "nataliediscala"]
		}, {
			"email": "questions@spartancarton.com",
			"items": ["m_bourstt", "patriot_pewpew", "itssoutherngunner", "nickkoumalatsos", "alisoncapra", "100deadlyskills", "krishamaxwell", "everydaycarry"]
		}, {
			"email": "affiliate@ikonick.com",
			"items": ["garyvee", "markbrazil", "t1d_teenager", "yasminesoofi", "pazpaz", "prodigykp", "danielasanguineti", "tslayz", ""]
		}, {
			"email": "info@gaia.com",
			"items": ["womanbewild", "sonia_doubell_yogi", "sebastianmtnez", "umtaldejoao_", "eyshokey", "4biddenknowledgebillycarson", "triciaxpain", "ferdiyoga"]
		}, {
			"email": "msacco@burtsbeesbaby.com",
			"items": ["lenalovescurls", "anna.joy", "whereverishome", "tailsandwings", "katieksturg", "kalliyoder", "modernmamaonline", "mrsgabbygabrielle"]
		}, {
			"email": "angela@hellothinkster.com",
			"items": ["im.thelittlechipmunks", "pencilstopigtails", "attachedandalbright", "chloeuberkid", "nynneetliloujos", "thismodernlife", "mother_of_daughters", "tthese_beautiful_thingss"]
		}, {
			"email": "kimberley.dorman@britishcornershop.co.uk",
			"items": ["traveldaddave", "dubaideserttwins", "thevintagevision", "travellingwithmother", "shopping_on_linee", "christinascucina", "thriftingnation", "sirgordonbennett"]
		}, {
			"email": "john@madewithloveandsparkle.co.uk",
			"items": ["at_home_with_the_pells", "project_in_a_village", "plumpyprickles", "zoloubooth", "natascha.ashford", "jazzfranks", "mumofamiracle", "jessicahayesx_"]
		}, {
			"email": "krzysztof.butryn@pagazzi.com",
			"items": ["our_bellway_victoria", "home_sweet_home_46", "noplacelikehome2018", "ourcheshirehome46", "_homebylaura", "no34home", "cantillionhome", "thehillcrest"]
		}, {
			"email": "support@globein.com",
			"items": ["daughtersandthings", "twolittlestolove", "simplyjennsblog", "sabrina.tewksbury", "melodyinthemaking", "thebohoabode", "isthislivingorwhat_", "bambineandme"]
		}, {
			"email": "devir@stryx.com",
			"items": ["johnross_sd", "tomsandoval1", "mkurian", "austinxhare", "bradleyryan_", "somedailyjoe", "rip_jep", "the.mensch"]
		}, {
			"email": "hello@tomandsherisproducts.com",
			"items": ["chandler.hatchett", "zoemyers", "moiralynnblog", "crazysexykris", "catherinegiudici", "bronsonburgoon", "rhondajenkins", "meetatthebarre", ""]
		}, {
			"email": "info@nectarsunglasses.com",
			"items": ["freestyle_fazz", "robert_lib", "probeautybytaya", "smithfieldmusic", "alandonclements", "xoxohnw", "andrew__muse", "denis_styles"]
		}, {
			"email": "matt@aslanmattress.com",
			"items": ["ryan_thelion_lilley", "saragi90", "mikepettymusic", "wildflowerwritings", "johnny_lilcroc", "whitneyantm", "nat_ouellette", "hanna_covington"]
		}, {
			"email": "marije@nieuwnieuw.com",
			"items": ["geertje_nieuwenhuizen", "k.heida", "vahid.maleknia", "joeyybl", "lifeofjan", ""]
		}, {
			"email": "olly@neat-nutrition.com",
			"items": ["dynamicpilatestv", "farm_fitness", "fred_pompermayer", "ynotwoodland", "adventuretravelfamily", "tomkempfitness", "rizzles1985", "annabellemay__"]
		}, {
			"email": "sales@hersey.co.uk",
			"items": ["theladysmaid", "whatlizzyloves", "booberrit", "ladyofthemanor77", "vanity_and_me", "justaveragejen", "stylebyglossy", "dilan_andme"]
		}, {
			"email": "david@davidguymarketing.co.uk",
			"items": ["adefendernamedblue", "themercedesbenzclub", "audi_household", "connorcee.95", ""]
		}, {
			"email": "contact@ozobot.com",
			"items": ["theprimarypartner", "giulianaflavia_cangelosi", "anaqueenmaker", "chloetaylortech", "taysteaching", "mr.jameshunt", "theworkpad", "the_techie_teacher_"]
		}, {
			"email": "team@morelabs.com",
			"items": ["myglowguide", "fernandaminhoo", "dj_tessa", "lexi_france", "eunique_kollection", "jonathanchia00", "ingtidsilva", "izzygoodkind"]
		}, {
			"email": "bsibley@t3micro.com",
			"items": ["emilyemig", "laurapolko", "pipaplu", "alwaysmeliss", "kaitcurnow", "farynvandyke", "sarahjanebetts", "prishella"]
		}, {
			"email": "david@walklondonshoes.co.uk",
			"items": ["3lmtd", "ankesummer", "abrahamdailydosis", "ankesummer", "nanukboy", "logikriver", "xxjmitch", "husseinaj", ""]
		}, {
			"email": "wangfang@shpinteng.com",
			"items": ["__bellabee", "gotalovemel", "fitxbrit", "shaniqueimari", "arivdna", "natalienightwolf", "themelamoshow", "carol.aroffo"]
		}, {
			"email": "naemi.benz@avawomen.com",
			"items": ["mamastateofmind", "araadstory", "jennakutcher", "nickyschmaderer_fit", "beautyjulianna_", "j_addicted", "ravayna", "broccyourbody"]
		}, {
			"email": "Priscilla@lucyparis.com",
			"items": ["beatrizadrianna_", "shannonbaker", "baileyttaylor", "xoxosonjakovac", "thelenparentstyle", "kristenmayx", "rohinielyse", "mireyarios"]
		}, {
			"email": "SUPPORT@SUPPLEMENTHUNT.COM",
			"items": ["mgederos", "jake_cantsleep", "alyssaruizxo", "sarahrav", "palkinfitness", "joharryburgos", "noah_bfit", "ifbbpro_michaelspencer03"]
		}, {
			"email": "info@soothi.com",
			"items": ["soshacreates", "megjournals", "inspiringjournals", "twylajericho", "stefiereads", "suhotes", "lostol0gy", "jekasjournal"]
		}, {
			"email": "claire.zhou@theapollobox.com",
			"items": ["anaberdesign", "jennaminnie", "macanoniii", "crisshex88", "crazedrayray", "torianicholexoxo", "mommareview", "vannie.beauty", ""]
		}, {
			"email": "nathaniel@qpjewellers.com",
			"items": ["sahargolestani", "amychilds1990", "lydiabright", "emshelx", "the_neutral_home", "unbeadableenergies", "_dazza_smith_", "katerina_themis"]
		}, {
			"email": "orders@happsy.com",
			"items": ["rokketqueen66", "taylor_lovee", "modhippiehabits", "thehealthy_b", "mariahangelina17", "swiftwellness", "allegraroseb", "ownyourglow", ""]
		}, {
			"email": "cs@naturepedic.com",
			"items": ["littlesouthernwife", "theworldwidewebers", "sharayamaples", "thejoyfultribe", "birdofbalance", "homewithkeki", "scarloandco", "mynewroots"]
		}, {
			"email": "usaservice@purecollection.com",
			"items": ["theladysmaid", "deborahhirzelmodel", "elizabeth_mystyle_at50", "backofthewardrobe70", "elle_mio", "welliesandchampagne", "thekateharrison", "evaciland_"]
		}, {
			"email": "contact@priverevaux.com",
			"items": ["oliviagiannella", "laurendeckert", "clairevanbeber", "kace_face1", "marissagalle", "madelynndunham", "theposhstreet", "tally.dilbert"]
		}, {
			"email": "tomas.salazar@wakkap.com",
			"items": ["javigeek", "antonraider_", "sparda1981", "gamer_diana", "collector_chick", "sarahiously_gaming", "liessshy", "frakergame"]
		}, {
			"email": "support@jclub.com",
			"items": ["frugalkittens", "babystepping2freedom", "easy_budget", "debtfreeinsunnyca", "thebudgetmom", "inspiredbudget", "thebudgetingwife", "gobudgetgirl"]
		}, {
			"email": "info@bodyspartan.com",
			"items": ["briancage", "dannybeefcake", "thebigpigulski", "stuart_warren_dansby", "mikeohearn", "christinawilliamsworld", "adrianna.lifestyle.fitness", "gt_fit"]
		}, {
			"email": "hello@airvapeusa.com",
			"items": ["wheezekyleefa", "daniele_vota", "edc_holland", "jeff_sdd", "texascannabisqueen", "joeysuarez"]
		}, {
			"email": "amy@rawpawspet.com",
			"items": ["roscoetheshibapup", "bigdogmomusa", "remingtonthesilverlab", "lonestarmastiffs", "jasmine.the.red.dobie", "pbj_pack", "clydethebully_", "strawsersfrenchbulldogs"]
		}, {
			"email": "administration@bodybody.com",
			"items": ["blkpomegranate", "thebiggayreview", "betty_butch", "kinkbnb"]
		}, {
			"email": "info@readers.com",
			"items": ["confessionsofasuperager", "reinventing50s", "momtrends", "thearchieffect", "mommychronicles", "justincuratola", "cosmicspice", "tysevere"]
		}, {
			"email": "affiliate@ghost.co.uk",
			"items": ["hannahfgale", "mariajblogs", "esteelalonde", "iiolaofficial", "alexandraclare", "sineadcrowe", "the_fashionstalker", "mcqueenhayley"]
		}, {
			"email": "ruth.harrington@lilyandloaf.com",
			"items": ["sweethearts_hair", "sarakirstytwins", "louisasnowsill", "rosanna_davison", "katieleandra", "hillary_michelle90", "sabrinacpercy", "mangozzle"]
		}, {
			"email": "contactus@secretsoftea.com",
			"items": ["jemarquesbr", "savvygreystyles", "ashleypeavey", "mymunchkins3", "jetplanemommy", "everyday.eddies", "christycusato", "shelby.sheene"]
		}, {
			"email": "james.nardell@iolo.com",
			"items": ["bernas19", "nunoseemee", "lindavivah", "msbrandymorgan", "codingblonde", "lillyseay_", "codergirl_", "tiffintech"]
		}, {
			"email": "bente.vanmelick@mybabywatcher.com",
			"items": ["priscillakroezen", "vajensp", "ana.snider", "tamaracuja_", "beautybymichelle___", "laral_slz", "kiaraaybarm", "zianiarubi", ""]
		}, {
			"email": "compliance@nurx.co",
			"items": ["elle_kae", "ohh_dhays", "polishedpiggy", "julie_schott", "revianchang", "oliviapw", "jasminedustin", "joannasimon"]
		}, {
			"email": "affilates@houseology.com",
			"items": ["flawsomehome", "lydiamillenhome", "themccraehome", "westholmeproperty", "thankfifi", "hegeinfrance", "thefashionbugblog", "curatedisplay"]
		}, {
			"email": "concierge@shopthemanual.com",
			"items": ["thebarpoet", "lydiamillenhome", "themccraehome", "westholmeproperty", "thankfifi", "hegeinfrance", "thefashionbugblog", "curatedisplay"]
		}, {
			"email": "cs@esigns.com",
			"items": ["baketoujours", "kaylenvobeauty", "mamitsnyc", "iamvernice", "garyvee", "tombilyeu"]
		}, {
			"email": "support@1Tac.com",
			"items": ["everydaycarry", "thenomadik", "sportsmansbox", "stiv38", "bestmanedc", "therealwillgeddes", "thereallisaann"]
		}, {
			"email": "valerie.savino@avoyatravel.com",
			"items": ["wonguy974", "mygreatescapes", "sennarelax", "asenseofhuber", "michutravel", "lifeandmylens", "janoliverkoch", "loic.lagarde"]
		}, {
			"email": "hello@larkwear.com",
			"items": ["capturing_childhood", "how_lo_grows", "thetrieflertribe", "prepandrally", "raisingbumblebees", "milkandcardamom", "hithapalepu", "helloemmylowe", "whatlolalikes"]
		}, {
			"email": "affiliate@royalrosesyrups.com",
			"items": ["michellesipsandsavors", "gastronomcocktails", "barfaith", "garnish_girl", "lovely.oven", "trinkkultur", "kristaperez", "liquorary"]
		}, {
			"email": "daan.kok@eurail.com",
			"items": ["wonguy974", "mygreatescapes", "sennarelax", "asenseofhuber", "michutravel", "lifeandmylens", "janoliverkoch", "loic.lagarde"]
		}, {
			"email": "katie@wearori.com",
			"items": ["fromsarahlex", "thepluslifeblog", "thatgirl_lucyryan", "anabeth.jpg", "thebaileyp", "alexaphelece", "maddy_gutierrez_", "meararose"]
		}, {
			"email": "pn@miinto.nl",
			"items": ["marjolein.vandenbroek", "jessjitske", "treestyles", "allison_simmonds", "adafijal", "lonnekenooteboom", "stylemyday", "nigel_vanderhorst"]
		}, {
			"email": "alfredo@cherubbaby.com.au",
			"items": ["beanandbaby", "ela.2528", "nolan_and_us", "karlylouisesmith", "modestlifestyleblog", "little.pandababy", "my_familydiary", "tahira_collection"]
		}, {
			"email": "ramiro@alpakagear.com",
			"items": ["mosesberdy", "ariesieass", "justinkuzco", "sreeragnk", "everyday_t1d", "benrashots", "theoliviayang", "everydaycarry"]
		}, {
			"email": "hello@mittenbody.com",
			"items": ["thisisgenevieve_", "cathyanne_", "chicontherunblog", "benitaschuh", "zbyzahrah", "amandacampeanu", "eloisesmith_va", "elamazurcreative"]
		}, {
			"email": "marco@vavoom.com.au",
			"items": ["boutiquehomesvictoria", "fortheloveofmyhome", "roberta.fairbanks", "theexampleau", "cabinfourth", "heidi_lisa_loves", "hideandsleep_interiors", "fiona_michelon_stylist"]
		}, {
			"email": "dani.stephens@takingshape.com",
			"items": ["stace_mcgregs", "thisismeagankerr", "suzie_stevens", "willowcurves", "stefania_model", "fionafalkiner", "jessicavanderleahy", "icurvy", ""]
		}, {
			"email": "p.zadorozhny@svmoscow.com",
			"items": ["sofimalem", "karpichito", "lil_alina", "akvariym", "theanastasiyakab", "santasasha", "davinzgarcia", "bezllyudov"]
		}, {
			"email": "alexander.c@isa-professional.com",
			"items": ["amandacaseyvance", "theodoraraptis", "hairbydianadoodle", "cutbyivis", "anythingbutmarzipan", "liz.colors", "emilyandersonstyling", "kateloveshair"]
		}, {
			"email": "oriane@boody.com.au",
			"items": ["janekim_golf", "cierraloren", "yogagym_arilda", "ashybines", "acjarrett", "alonavibe", "isabelphillips__", "khadiishtar"]
		}, {
			"email": "info@cocktailkit.com.au",
			"items": ["thebarmann", "theofficialcocktailblogger", "stevethebartender", "bitterandtwists", "thebrunchbeast", "withrobinj", "thesydneymixologists", "thediydecorator", "cocktailsbykurtis"]
		}, {
			"email": "marketing@babyheart.com.au",
			"items": ["priscillakroezen", "vajensp", "ana.snider", "tamaracuja_", "beautybymichelle___", "laral_slz", "kiaraaybarm", "zianiarubi", ""]
		}, {
			"email": "kasey.smith@harrys.com",
			"items": ["breathing.room.organization", "shadesofglow", "shansa.ch", "desseydoll", "glowobsessedgirl", "crystalizedcho", "karolinakristina", "theglossarray"]
		}, {
			"email": "contact@grocerypup.com",
			"items": ["pennytheluckdragon", "lolita_the_pomsky", "rhettmuttler", "middyperletxfiddledogs", "freakyneeko", "goldendaysofellie", "kikythehusky", "rhettmuttler"]
		}, {
			"email": "nejc@fnatic.com",
			"items": ["michellexfiebig", "fnatic.lol", "rekklesfansquad", "voidkat_", "romain_bigeard", "neilvfernando", "lolesports", "leagueofbeth"]
		}, {
			"email": "customercare@bowsboutiques.com",
			"items": ["gabby_horner", "jemimapask", "alyaromanovaya", "iamscarlettleeofficial", "holliecagney", "ms_sanja", "rossana.silva_rs", "karolina_slezak"]
		}, {
			"email": "support@fenderdigital.com",
			"items": ["feoforbivol", "marco_jimi", "tatianademaria", "guitar.show", "leonidas_music", "krisssstaa", "nikki.nacho.stevens", "satelliteciti"]
		}, {
			"email": "sales@dronenerds.com",
			"items": ["foxbackpack", "vitor.esteves", "piercegainey", "znicolaou", "_andreacrs_", "radu.nita", "jermjohnston", "desgnarlais"]
		}, {
			"email": "communications@condenast.com",
			"items": ["rebeccaramsdale", "midnightbeeglow", "_themakeupdoll", "erin.boha", "joymanicure", "jayne_edosalon", "colour.jade", "stephanienadia", ""]
		}, {
			"email": "eric@drinkapres.com",
			"items": ["sweatinsd", "its_nicolettemarie", "daniellepascente", "kathyruda", "karaswanson", "lyndsinreallife", "kimberleewilliams_realestate", "easteggstyle"]
		}, {
			"email": "adam@labucq.com",
			"items": ["sisiliapiring", "courtneeruthie", "katcollings", "hannahbaxward", "honeynsilk", "ludovicaragazzo", "andyheart", "annasarlvit"]
		}, {
			"email": "hello@burstoralcare.com",
			"items": ["dentistrywithchelsea", "daisythao", "torikozik", "kate_dial", "acourageousbeauty", "mommy.skelton", "jordiereid", "ddanidavis"]
		}, {
			"email": "jblake@lumens.com",
			"items": ["thebeachbelle", "candycoloredhome", "michelle_adams_", "apriljoy_ful", "thismodernstyle", "hertastylife", "housetweaking", "alexanderreneedesign"]
		}, {
			"email": "andrew@otty.com",
			"items": ["rossocjennings", "travisbluemling", "wearekingingit", "zoloubooth", "itsjoecooper", "emandeverything", "brionygorton", "our1930sfixerupper"]
		}, {
			"email": "customerservice@crocs.com",
			"items": ["itsbizkitt", "emirshiro", "belikova_annichka", "barrettprendergast", "olesyakuba", "steph.silvera", "beritfranwick", "cyahflynn"]
		}, {
			"email": "cs@skyniceland.com",
			"items": ["dustystarks", "justglowfirefly", "miramakeup", "jsapproved", "sarahnelsonmakeup", "melissa.hurkman", "meganlanoux", "shenisesheena"]
		}, {
			"email": "hello@trestique.com",
			"items": ["ekredd", "iamascia", "makeupbytinnash", "haleyscornerr", "sarah_louwho", "sherilabrant", "itsmektcat", "helloislandmama", ""]
		}, {
			"email": "info@agora.care",
			"items": ["fashiontuna", "sveeteskapes", "theurbanumbrella", "littlemeandfree", "mommalovesfashionblog", "jaypersil", "southernblondechic", "vaneberlin", "ladyboarder9669", ""]
		}, {
			"email": "customerservice@fiskgroup.com",
			"items": ["oanaalexandru_beautyblog", "miasolx", "leticiaaggoulart", "krystintysire", "internnails", "diya.nailart.loom", "uptoclaudia", "polished_dream"]
		}, {
			"email": "info@karunaskin.com",
			"items": ["ash_kholm", "fakhiarif", "misskatiepaige", "sophiathao", "patriciagloriacontreras", "skinbeautyaddict", "beautybyjulia", "ayaokubo_"]
		}, {
			"email": "customercare@cosmeticsolutions.com",
			"items": ["ash_kholm", "fakhiarif", "misskatiepaige", "sophiathao", "patriciagloriacontreras", "skinbeautyaddict", "beautybyjulia", "ayaokubo_"]
		}, {
			"email": "karen@karenlazardesign.com",
			"items": ["eatsleepwear", "thetennillelife_", "muchlovesophie", "melissameyers", "xoxomegtaylor", "alliwebb", "mralphlawson", "maespearss"]
		}, {
			"email": "publishers@artemisdm.com",
			"items": ["stprobertdeleo", "richardaaronofficial", "jimmorrison", "therobertvargas"]
		}, {
			"email": "info@wildfox.com",
			"items": ["laceynwalker", "gracedinblue", "thisismirandalynn", "lusedova", "chrissi_joy", "samblacky", "priricart", "londonolive1"]
		}, {
			"email": "support@sanho.com",
			"items": ["mikanovo", "everydaycarry", "thebossphotos", "tjpinkush", "davidgrr", "ultralinx", "theaestheticminimalist", "bestdamnedc"]
		}, {
			"email": "support@greenpathscience.com",
			"items": ["wheezekyleefa", "daniele_vota", "edc_holland", "jeff_sdd", "texascannabisqueen", "joeysuarez", "getbuzzn"]
		}, {
			"email": "info@pandorasboxinc.com",
			"items": ["alison_bass", "marleemurray", "taybalfour", "mollymccay", "codicarlson", "dashkatk", "addeybartlett", "maliajaee"]
		}, {
			"email": "info@yunibeauty.com",
			"items": ["sophie.jaffe", "peipiepoe", "fit_and_dedicated", "fluidformpilates", "beccasbeautylist", "ethicalbunny", "thealivealley", "worldofcolorx"]
		}, {
			"email": "dirk@theragun.com",
			"items": ["baxfit_pt", "gabe_snow", "apoloohno", "calisthenics_runner", "stefanduell", "patricktmoore", "robrichesfitness", "ladysquat"]
		}, {
			"email": "antoinette@windsorsmith.com.au",
			"items": ["remusbujor", "stureardon", "kozel.carthew", "johnosauer", "matttkaos", "vato", "fabio.fi", "kaiden_smales"]
		}, {
			"email": "jason@bellesa.co",
			"items": ["cecile_hotties", "julesjordanx", "bellesafilms", "drjengunter"]
		}, {
			"email": "shaina.nonato@wilson.com",
			"items": ["samuelbegg", "kacperowsiantennis", "michael_blease", "cameronhenricy_", "siennabravo", "staffordslick", "thebaezboys", "bazooka_bella"]
		}, {
			"email": "pkalka@onnit.com",
			"items": ["thedesailifestyle", "chrisgronkowski", "joerogan", "thebrieadventure", "jodieesquibel", "figsfit", "primal.swoledier", "zeferinomma"]
		}, {
			"email": "jana.deluna@lonelyplanet.com",
			"items": ["indrawuphoto", "adventures_az", "chiarabarrasso", "thediaryofanomad", "danflyingsolo", "alixelay", "life.starts.at.30", "nick_rinaldi_", "justgo_syd", ""]
		}, {
			"email": "affiliates@harrys.com",
			"items": ["rule_of_thumbs", "newdarlings", "cristincooper", "tyfrench", "cristincooper", "styleyoursenses", "yummertime", "mckennableu"]
		}, {
			"email": "ali@spiraldirect.com",
			"items": ["joannamaomie", "devileyes.lml", "leago_scars", "anomaly_model_", "x_shadow.mistress_x", "saria_goy", "little.zombie20", "batslover"]
		}, {
			"email": "dario.damico@bruno-wickart.ch",
			"items": ["andreabrotschi", "zuerichstyle.ch", "couch_magazin", "sevdekasa", "__interiorinspo__", "mimarseyma", "aysunoksuzogluu", "mimarsultan", ""]
		}, {
			"email": "customercare@luluguinness.com",
			"items": ["lorrainekeanedevlin", "preppyfashionist", "nataliesalmon", "saoirsemonicajackson", "arabellagreenhill", "alexlight_ldn", "lioumonn", "gabriellebassett"]
		}, {
			"email": "admin@welovelenses.com",
			"items": ["theislandmumma", "chloe_portelli", "shaneldbattista", "maltesegirl_", "the_mama_manual", "tamarawebb_", "iralosco", "claireagiusordway"]
		}, {
			"email": "ProXtra@homedepot.com",
			"items": ["angelarosehome", "stephsterjovski", "eyeinthedetail", "frills_and_drills", "monikahibbs", "brandenharvey", "itscarlabethany", "blesserhouse"]
		}, {
			"email": "here4help@threads4thought.com",
			"items": ["wholeheartedwardrobe", "mrjunho3", "therealcpj", "demetridoesit", "thekentuckygent", "marcellamarieblog", "meganraeoflight", "yogawithsasha"]
		}, {
			"email": "service@agavedenim.com",
			"items": ["mrjunho3", "skinnyjeansandcoffee", "the.mensch", "enslucas", "noahwilliamsstyle", "peterunger", "thepacman82", "jeromeguerzon"]
		}, {
			"email": "aloha@lacausaclothing.com",
			"items": ["allyburnette", "vacillavi", "sianeastmentwilliams", "jenny.obrien", "amandasmitthh", "waxa_katie", "coucoujolieblog", "maitreyabrooks"]
		}, {
			"email": "change-dr@uber.com",
			"items": ["vueeyle", "tallblondebell", "craveitsf", "kevsyim", "kat.eats", "foodie_mary", "mikejalipa", "hifivedoughnuts"]
		}, {
			"email": "jana.bosse@shop-apotheke.com",
			"items": ["sylvislifestyle", "merdinbeauty", "kkkeiki", "modezarin", "_shopaholic_girl", "josieloves", "liebesbotschaft", "sweetlivinginterior"]
		}, {
			"email": "customerservice@craftstash.co.uk",
			"items": ["journalwithpurpose", "emiliasieradzan", "thepaperletterblog", "paigejoannaa", "letters_by_gigi", "blinklettering", "bealettering", "taniaahmed"]
		}, {
			"email": "joel.cayouette@foodspring.com",
			"items": ["philipp_stehler", "__vanessi_", "durmus__k", "stefano_cicchini", "michela_cfmibe", "emi_dtr", "mahya.rahman", "patriciafoehl"]
		}, {
			"email": "anna@sweet-cures.com",
			"items": ["masha.ai.shopping", "zeroprostatecancer", "prostatecancercentre", "prostatecancerfdnbc", "pelvichealing", "activelyautoimmune", "prostatecanceruk", "livinwellwithlyme"]
		}, {
			"email": "antony@zestbeauty.com",
			"items": ["ms_tantrum", "makeupholicworld", "thechroniclesofmrsiava", "leannelimwalker", "maddie_bruce", "sofiafij", "sarahhashcroft", "jamiegenevieve", "gabriella"]
		}, {
			"email": "danny@3retro.com",
			"items": ["watchlfc", "fc.bayern.girls", "bayernsource", "bayern.live72", "berni_fcb", "bild_fcbayern", "mancityp", "england_away"]
		}, {
			"email": "customer.services@thecoutureclub.co.uk",
			"items": ["rossworswick", "kylebeaumont89", "arabellachi", "sarahjoholder", "charlykhn", "jilvanhelen", "robertodidio_1", "umbelentini", "aangelinaxoxo"]
		}, {
			"email": "info@jarlolondon.com",
			"items": ["jennalyyy", "ife_x", "lipstickandluggage", "chessiekingg", "rhitrition", "aliceliveing", "by.osquare", "beckiehart_"]
		}, {
			"email": "care@femmeluxe.co.uk",
			"items": ["lillychugg", "missisabelleberry", "kaylaafenech", "maisie_croft", "bluenailgirl", "lucidbelle", "mariateresascotti_", "cayleymia"]
		}, {
			"email": "hello@larkandberry.com",
			"items": ["lerakapkaikina", "katetik", "kat_gibbs", "iamlivrose", "frejska", "katetik", "thewhitmore", "marthahunt"]
		}, {
			"email": "hello@parisianfashion.com",
			"items": ["wunmibello", "hedonistit", "bris.mehmeti", "erinasherifi", "sincerely_mels", "missviho", "rachelward_e"]
		}, {
			"email": "retail@weirdfish.co.uk",
			"items": ["lucyscarfe", "uktravelling", "the_piplets", "morningbreezeg", "preppyfashionist", "sandandseagulls", "amy_everythingmummy", "mark_j_peart"]
		}, {
			"email": "contactus@joythestore.com",
			"items": ["whatkathydidnext", "rhysrysia", "raffaella_catania", "deriveinlovee", "mrsannitalazzaro", "beth_bartram", "lady_ale86", "lenus89"]
		}, {
			"email": "customerservice@hopefashion.co.uk",
			"items": ["deborahhirzelmodel", "irismaystyle", "rachelgoldstylist_", "styleloving2", "iamsairakhan", "oliviacoxlondon", "aliyoungbeauty", "hollytucker"]
		}, {
			"email": "justin@aussiehealthproducts.com.au",
			"items": ["crushinglimits", "iifym_matt", "thesamuelarmstrong", "rawpublic_", "coconutmagic", "thenuttywhey", "_nicolelouise_", "charlietaylor"]
		}, {
			"email": "a.geerlings@nelson.nl",
			"items": ["esmeevanes", "jurjenharmsma", "daniquevanderwel", "iriszeilstra", "radiatefashion", "amberleemans", "faye.bone", "moderosaofficial"]
		}, {
			"email": "customerservice@dbi.com",
			"items": ["rachelsolomonphoto", "veronica.cook.photography", "pureglamourmua", "blackbird_and_rye", "stephaniemckennaphoto", "weddingdaymagazine", "mmphoto__", "josephineyphotography"]
		}, {
			"email": "support@nixon.com",
			"items": ["toptiervisionllc", "jademagnien", "nicolasmuellair", "jordy_maree", "toxic_camaro19", "timmytorchia", "_calebcrozier", "alejandro_risso"]
		}, {
			"email": "dgcontactgiorgioarmani@info-ccc.com",
			"items": ["mamiset", "chrisellelim", "yukibomb", "mint_factory.1004", "noradanish", "serenawylliemakeup", "smlx0", "kadudantas"]
		}, {
			"email": "dgcontactysl@info-ccc.com",
			"items": ["belenrodriguezreal", "goicoechea22", "costy_caracciolo", "gigi_vives", "alxcext", "reneborisova", "megghiigalo", "zoeisabellakravitz"]
		}, {
			"email": "dgcontacturbandecay@info-ccc.com",
			"items": ["ashghotcakess", "baileysarian", "evangelinedemuro", "lovemelisamichelle", "emilydemelo", "jamiegenevieve", "flawless_by_tenisha", "makeupalii"]
		}, {
			"email": "support@support.clarisonic.com",
			"items": ["monycatamang", "shayna_apopofcolour", "sweetnewyork", "omgitsgare", "parkeryorksmith", "thecodyallen", "gabriellalascano", "cakedbybabyk"]
		}, {
			"email": "dgcontactvichy@info-ccc.com",
			"items": ["emmalalves", "vickiduong", "janielap", "laurendessureault", "typicalpen", "chloezhaang", "albeaton", "beverleycheng"]
		}, {
			"email": "dgcontactlarocheposay@info-ccc.com",
			"items": ["taylor_pischke", "mylittlesecrets_ca", "simranahmed30", "rafaeldiascosta", "chic.mom.in.the.city", "mikaelaabree", "alicia_haque", "denupzter"]
		}, {
			"email": "dgcontactkerastase@info-ccc.com",
			"items": ["raquelstrada", "gullar_aliyeva", "paolaturani", "juribalestra", "gulie_black", "erenboz", "valliludovica", "shereeneidriss"]
		}, {
			"email": "laurina.kennedy@skinnydiplondon.com",
			"items": ["xthuyle", "fellaby", "httpjulia", "sincerely_mels", "rydellynch", "sophiatuxford", "slush.juice", "oliviaandalice_"]
		}, {
			"email": "privacy@ajmadison.com",
			"items": ["brownstoneboys", "reserve_home", "brendanfallis", "melissamale", "farahjmerhi", "houseonasugarhill", "fareisle", "younghuh"]
		}, {
			"email": "service@savile-row.co.uk",
			"items": ["ich_bins_griseldis", "mattcroke", "charlesnchargela", "arnoldsteiner", "alexhoymor", "erwin_trinidad", "thepuggysmalls", "don.locoh"]
		}, {
			"email": "sales@sandals.co.uk",
			"items": ["atasteofkoko", "natashaleeds", "travelinghoppy", "marcy_yu", "cutekatiebug", "honeymoonreviews", "sosageblog", "iamdawnmccoy"]
		}, {
			"email": "eva.flammensbeck@nordgreen.com",
			"items": ["ei7474", "femkeaaldering", "realfashionedit", "iam_laduree", "hiro___412", "an.naomi", "diiiedaniii", "emilydonman", "nlmacks", "bellealice_yt", "doris_magenta", "elmstagrams", "asaikayoko", "_piyogram_"]
		}, {
			"email": "hello@liagriffith.com",
			"items": ["foreverpetalsbyvee", "thelovelyave", "amaranthuspaperflora", "darcymiller", "encontrandoideias", "cobralilyshop", "brittanirosepaper", "katyapaperie"]
		}, {
			"email": "eccocanada@ecco.com",
			"items": ["agneswym", "levitatestyle", "mariellelindahl", "filippahagg", "charlieirons", "sigetty", "josefinlavold", "emmamelins"]
		}, {
			"email": "info@circcell.com",
			"items": ["tanyafosterblog", "everydayraleightay", "ariaadare", "dafnesanchezg", "skincare_in_the_air", "_beautybee", "simplysisters_blog_", "emilie.ullerup"]
		}, {
			"email": "lars.rohlf@underarmour.com",
			"items": ["cedricsoares41", "floringardos", "jasonmccarthy_", "iamryanbertrand", "sam9allagher", "jackstephens27", "mattytargett", "jakeflannigan"]
		}, {
			"email": "david@cakeflix.com",
			"items": ["the_bakeking", "cheflaurent.xiv", "rbicakes", "chefnicholaslodge", "yenersway", "sugarnrosecakes", "veruscawalker", "snowflakescakeartistry"]
		}, {
			"email": "nmansouri@suzyshier.ca",
			"items": ["cindy.millien", "cassandra.bouchard", "mariepaulsimard", "sandou_", "anniepierla", "glambygilly", "maikadesnoyers", "tanismitchell"]
		}, {
			"email": "alan@dessy.com",
			"items": ["loreceinthestreets", "bellabridesmaids", "kelseyrust_", "strictlyweddings", "caratsandcake", "lovemydress", "mollyannesphotos", "corinavphotography"]
		}, {
			"email": "heba@coveti.com",
			"items": ["asallahkamel", "stylecov", "dinzsisters", "shahadballan", "charlottehxx1", "the_happyhippy", "mahiraabdelaziz", "joellemardinian"]
		}, {
			"email": "sergii@nutriocean.com",
			"items": ["yourprimadonnagirl", "thesalonproject", "thais_stark", "sophiasosweet", "trubeautyconcepts", "thepaintedblondexo", "jeannielong_", "amyyvaughan"]
		}, {
			"email": "affiliate@lamp24.se",
			"items": ["our_bellway_victoria", "home_sweet_home_46", "noplacelikehome2018", "ourcheshirehome46", "_homebylaura", "no34home", "cantillionhome", "thehillcrest"]
		}, {
			"email": "naim@packsproject.com",
			"items": ["maryamishtiaq", "biancajade", "kaillowry", "thefashionadmin", "biancajade", "chrisodom93", "laurenluyendyk", "angelababicz"]
		}, {
			"email": "cecile.billiet@scaledigital.co",
			"items": ["itsthefergusons", "mudpiefridays", "dadoftwo_rolandhall", "dadvgirls", "dadoftwo_rolandhall", "iamalisonperry", "goingonanadventureblog", "threegirlsi"]
		}, {
			"email": "emoon@decadentminimalist.com",
			"items": ["everydaycarry", "best_leather_goods", "47images", "bladeops", "trailblazerfirearms", "edc_fanatics", "instafr4nk", "bestdamnedc"]
		}, {
			"email": "gidon@overnightglasses.com",
			"items": ["freestyle_fazz", "robert_lib", "probeautybytaya", "smithfieldmusic", "alandonclements", "xoxohnw", "andrew__muse", "denis_styles"]
		}, {
			"email": "trade@myprotein.com",
			"items": ["carolineclnfit", "jordan_morello", "lucasossaifitness", "mrs_dimples_x", "ciarafits", "tanyafitness_", "officialsagarmogha", "dannygibbons90"]
		}, {
			"email": "frederik@lumigado.com",
			"items": ["our_bellway_victoria", "home_sweet_home_46", "noplacelikehome2018", "ourcheshirehome46", "_homebylaura", "no34home", "cantillionhome", "thehillcrest"]
		}, {
			"email": "legal@etsy.com",
			"items": ["almafied", "carlanatalia__", "hunterpremo", "bamaluzhome", "debrosse_nyc", "breez_lance", "salt_stitches", "jenannhandmade"]
		}, {
			"email": "mclapp@fila.com",
			"items": ["cautiousxclay", "duckwrth", "quinnxcii", "followdee", "twomacks", "djinfamous", "dieschwartzman", "timeababos"]
		}, {
			"email": "manish_chimnani@canada.canon.com",
			"items": ["danschyk", "dgframes_", "sarahlyndsayphotography", "nicoleashley", "argenel", "purecameras", "imjustacheung", "kahliaprilphoto"]
		}, {
			"email": "customerservice@firstaidbeauty.com",
			"items": ["amazedbykay", "allieballiemakeup", "makeuppppbycait", "livxo", "emmadaun", "thebeautyhobbyist", "rachelalexandraafit", "the.skincare.diary"]
		}, {
			"email": "david@hearwithyou.com",
			"items": ["dorynfine", "letterfolk", "swellpress", "darlingandpearl", "hatchgal", "bonnietsang", "riflepaperco", "wearlively"]
		}, {
			"email": "lucy.browning@jojomamanbebe.co.uk",
			"items": ["irinaskarzhinets", "mama_society", "isleofwight_triplets", "_islajune", "lucyjessicacarter", "biffandbaba", "iamlivrose", "shellandthelittlies"]
		}, {
			"email": "jlovchik@lhrtech.com",
			"items": ["mrfixitdiy", "guyswoodshop", "mwawoodworks", "lazyguydiy", "psyfoolrulez_customz", "woodwhisperer", "fixthisbuildthat", "keywoodworks"]
		}, {
			"email": "allan@sacred.site",
			"items": ["chloe.chapdelaine", "heykelseyj", "ivuss", "nicolehandel", "mattymatheson", "alpingirls", "wifitribe.co", "backpackinggirls_", "masakakidsafricana", "", "", "", ""]
		}, {
			"email": "Jessica.McEwen@sosandar.com",
			"items": ["emeliestenman", "hol_at_home", "albertevalentine", "shegoeswear", "thehousebuild", "justalpatri", "monchanvre", "charlottehawkins1"]
		}, {
			"email": "bburdette@ssww.com",
			"items": ["annistyn.and.rosalie", "treehousethreadsblog", "athomewithnatalie", "jo.noodle", "michellechapin", "littlelifelonglearners", "themomtrotter", "juelz_jourdan"]
		}, {
			"email": "forrest@jumpsport.com",
			"items": ["nikkofred03", "aldenspencer_", "derek_therrien", "camshorey77", "coltomn", "max.mcquoid", "brennanmejia", "thesupermomlife"]
		}, {
			"email": "s.lepage@saint-james.com",
			"items": ["hiro___412", "olaartlife", "stellahyc", "shuhei_nishiguchi", "sunnn__y", "jeonhuni", "thuntingtonwhiteley", "y.y.r.10"]
		}, {
			"email": "chris@getsundaily.com",
			"items": ["growintoyourglow", "_glamdiary", "katherine.alicias", "alyssabrieloff", "theyounglow", "skinworship", "carolinemonratier", "theskincarebimbo"]
		}, {
			"email": "b.guillaume@alexandredeparis.fr",
			"items": ["tocestyle", "mommy_nannan", "ownstylefernanda", "amandachic_official", "theankitaagrawal", "sobiaashaikh", "vanessarosetilley", "missyanacherie"]
		}, {
			"email": "carl@unkuppd.com",
			"items": ["tenteracoffee", "thecoffeegent", "shaunbirley", "melissamale", "sdamiani", "lauraleexj", "maddietsang", "andreannu"]
		}, {
			"email": "affiliates@smartbuyglasses.com",
			"items": ["emiwong_", "gothamlove", "thefashionpoet", "pinkmillennial_", "carolineblomst", "accordingtoblaire", "giuse_laguardia", "dorienrose"]
		}, {
			"email": "laura@localsupply.com",
			"items": ["christieswadling", "eleanorpendleton", "itsbrookeharth", "katewaterhouse7", "roguepassport", "zannavandijk", "oliviaarezzolo", "nathantito"]
		}, {
			"email": "info@dartmouthbrands.co.uk",
			"items": ["lifestylemarco__", "remusbujor", "matt.szczepanski", "mrvlstyle", "stylebydillan", "rale_popic", "jorgemsantos", "akiefsheriff"]
		}, {
			"email": "info@avi-8.co.uk",
			"items": ["cuffington", "nordic_scott", "newenglandmenswear", "pmicom", "gabrielmpadilla", "devdxb", "mycreativelook", "stylishgridgame"]
		}, {
			"email": "affiliate@luminaire.fr",
			"items": ["llilooscandilove", "home_style_by_meila", "dessine_moi_une_maison", "aventuremaisondeco", "orchidee_home", "once.upon.a.home", "lili_and_craps", "bonjourtangerine"]
		}, {
			"email": "melissa@bookoutlet.com",
			"items": ["littlehouse_happyfamily", "remarkablylisa", "nerdytalksbookblog", "topshelfbookreviews", "marasfoldedpages", "pretty_little_library", "onetruedaydreamer", "clockwork_reads"]
		}
	]
}
const dbSession = driver.session();
 
start();

async function start(){
for (var i=0; i<customers.emails.length; i++){
    //console.log(i);
    await updatePromise(customers.emails[i].email.toLowerCase(),customers.emails[i].items);
}
}

var count = 0;
async function updatePromise(email, seeds) {
  return new Promise(function(resolve, reject) {
    var query =   `MATCH (merchant:merchant) where merchant.email = "${email}" return merchant.email as email,toString(ID(merchant)) as id`
   dbSession
     .run(query)
     .then(async function(results) {
       var result = results.records[0];
       if (!result) {
         console.log(email);
         resolve("aaaa")
       } else {
        resolve("aaaa") 
        /*
           console.log(result.get('email'));
           console.log(result.get('id'));
           count++;

           var body = {
           "seededProfiles": seeds,
           "ffemail":email
           }

           var params = {
            method: "POST",
            body: JSON.stringify(body)
        }
    console.log(params)
    fetch('https://8i9s27h4vl.execute-api.us-west-2.amazonaws.com/dev/list/creator/recommendation', params)
        .then(r => r.json())
        .then(async data => {
            console.log("Done: " + JSON.stringify(data));
            var wait = Math.ceil(Math.random()*15000)+3000;
            console.log("waiting for "+wait+ " millisecons" );
            await sleep(wait)
            if(count<110)
                resolve("aaaa")
        })


           
         

         
           /*
           await updatePromise(element).then(function(uid) {
             console.log("now we go next ---->");
           });
         */
   
       }
     });

  });
};




function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}