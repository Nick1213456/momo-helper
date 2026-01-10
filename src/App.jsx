import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';

/**
 * momo 上架助手 - 核心應用程式
 * 風格：明亮白色系 (Light Mode)
 */
export default function App() {
    const EXPIRATION_DATE = new Date('2027-01-21');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        // 應用程式載入時檢查日期
        const now = new Date();
        if (now > EXPIRATION_DATE) {
            setIsExpired(true);
        }
    }, []);


    // --- 資料定義 ---
    const categories = [
        { code: '4100100001', name: '七星陣' },
        { code: '4100100002', name: '元寶如意' },
        { code: '4100100003', name: '文昌塔' },
        { code: '4100100004', name: '水晶柱' },
        { code: '4100100005', name: '水晶洞' },
        { code: '4100100006', name: '水晶球' },
        { code: '4100100007', name: '水晶鎮' },
        { code: '4100100008', name: '其他開運物' },
        { code: '4100100009', name: '招財樹' },
        { code: '4100100010', name: '流水盆' },
        { code: '4100100012', name: '神獸擺件' },
        { code: '4100100014', name: '聚寶盆' },
        { code: '4100100015', name: '聚寶蛋' },
        { code: '4100100016', name: '鹽燈' },
        { code: '4100100024', name: '水晶石' },
        { code: '4100100030', name: '錢母' },
        { code: '4100100031', name: '印鑑' },
        { code: '4100100017', name: '山海鎮' },
        { code: '4100100018', name: '帝錢' },
        { code: '4100100020', name: '葫蘆' },
        { code: '4100100021', name: '羅盤' },
        { code: '4100100025', name: '八卦鏡' }
    ];

    const shopCategoriesList = [
        { name: "特選精品", code: "910000000000" },
        { name: "最新11/14新品-愛心晶片", code: "760000000000" },
        { name: "巴西全拋光紫水晶洞", code: "690000000000" },
        { name: "巴西大型拋光紫水晶洞", code: "690010000000" },
        { name: "巴西全拋光瑪瑙聚寶盆", code: "690020000000" },
        { name: "巴西全拋光聚寶盆", code: "680000000000" },
        { name: "特頂級稀有珍品-異象雪景晶洞", code: "980000000000" },
        { name: "巴西紫水晶洞", code: "270000000000" },
        { name: "10.99公斤以下", code: "270010000000" },
        { name: "11公斤~20.99公斤", code: "270020000000" },
        { name: "21公斤~30.99公斤", code: "270030000000" },
        { name: "31公斤~40.99公斤", code: "270040000000" },
        { name: "41公斤~50.99公斤", code: "270050000000" },
        { name: "51公斤以上", code: "270060000000" },
        { name: "巴西黃水晶洞", code: "280000000000" },
        { name: "10公斤內", code: "280040000000" },
        { name: "11公斤~20公斤", code: "280010000000" },
        { name: "21公斤~30公斤", code: "280020000000" },
        { name: "31公斤~40公斤", code: "280030000000" },
        { name: "41公斤~50公斤", code: "280070000000" },
        { name: "51公斤~60公斤", code: "280080000000" },
        { name: "巴西黃恐龍蛋", code: "590000000000" },
        { name: "0.1公斤~8公斤", code: "590020000000" },
        { name: "8kg以上😻ESP++", code: "590010000000" },
        { name: "黃拋光原皮", code: "590030000000" },
        { name: "烏拉圭(錢袋子)紫水晶洞", code: "430000000000" },
        { name: "烏拉圭(錢袋子)紫水晶洞", code: "430020000000" },
        { name: "烏拉圭(錢袋子)-金漆皮", code: "430010000000" },
        { name: "烏拉圭(立洞)紫水晶洞", code: "560000000000" },
        { name: "烏拉圭(立洞)", code: "560010000000" },
        { name: "烏拉圭(立洞)-金漆", code: "560020000000" },
        { name: "烏拉圭(恐龍蛋)紫水晶洞", code: "570000000000" },
        { name: "紫水晶愛心晶片(烏拉圭)", code: "210000000000" },
        { name: "(A)", code: "210010000000" },
        { name: "(B)", code: "210020000000" },
        { name: "2星", code: "210040000000" },
        { name: "3星", code: "210030000000" },
        { name: "4星", code: "210050000000" },
        { name: "黃水晶愛心晶片", code: "200000000000" },
        { name: "A級", code: "200010000000" },
        { name: "B級", code: "200020000000" },
        { name: "C級", code: "200030000000" },
        { name: "D級", code: "200040000000" },
        { name: "5星", code: "200050000000" },
        { name: "全拋光黃水晶蛋", code: "800000000000" },
        { name: "糖霜", code: "800010000000" },
        { name: "無星", code: "800040000000" },
        { name: "1星", code: "800020000000" },
        { name: "2星", code: "800030000000" },
        { name: "瑪瑙異象小晶洞", code: "360000000000" },
        { name: "瑪瑙異象小晶洞", code: "360020000000" },
        { name: "佛教七寶之一✨天然瑪瑙晶洞", code: "360030000000" },
        { name: "Mini A 迷你紫晶鎮", code: "970000000000" },
        { name: "天然白水晶愛心晶片", code: "730000000000" },
        { name: "南非糖霜白水晶簇(有錢花)", code: "540000000000" },
        { name: "巴西 糖霜紫水晶鎮&開口笑", code: "770000000000" },
        { name: "特大霸氣 烏拉圭愛心紫水晶片", code: "650000000000" },
        { name: "頂尖異象變種色 橘紅滿天星聚", code: "640000000000" },
        { name: "205kg鹽燈😻超霸氣新品", code: "600000000000" },
        { name: "糖霜黃水晶簇(整盒賣)", code: "820000000000" },
        { name: "黃水晶簇(整盒賣)", code: "790000000000" },
        { name: "單個販賣✅紫水晶簇✨ESP", code: "840000000000" },
        { name: "天然異象紫水晶片 紫水晶簇❤", code: "830000000000" },
        { name: "指定(小款251～300號✅", code: "830060000000" },
        { name: "指定(中款) 1～50號✅", code: "830010000000" },
        { name: "指定(中款)51～100號✅", code: "830030000000" },
        { name: "指定(中款101～150號✅", code: "830020000000" },
        { name: "指定(中款151～200號✅", code: "830040000000" },
        { name: "指定(中款201～250號✅", code: "830050000000" },
        { name: "指定(大款) 1~100號✅", code: "830070000000" },
        { name: "小小可愛雷公蛋", code: "930000000000" },
        { name: "烏拉圭異象小晶洞", code: "500000000000" },
        { name: "頂級 玻利維亞 骨幹紫水晶簇", code: "470000000000" },
        { name: "玻利維亞 骨幹紫水晶", code: "630000000000" },
        { name: "鈦晶-手排/手珠/手鐲系列", code: "250000000000" },
        { name: "頂級 鈦晶手鐲", code: "250060000000" },
        { name: "鈦晶手珠", code: "250070000000" },
        { name: "燕尾鈦晶手排", code: "250040000000" },
        { name: "頂級對花鈦晶手排(太陽花)", code: "250050000000" },
        { name: "A+", code: "250010000000" },
        { name: "A+向上發", code: "250030000000" },
        { name: "A級", code: "250020000000" },
        { name: "頂級 A+ 多寶手排", code: "480000000000" },
        { name: "特選各類手排系列", code: "300000000000" },
        { name: "天然超七系列.頂級彩虹碧璽", code: "990000000000" },
        { name: "頂級彩超七", code: "990010000000" },
        { name: "頂級黑超七", code: "990040000000" },
        { name: "頂級黑金超七", code: "990020000000" },
        { name: "頂級彩虹碧璽", code: "990030000000" },
        { name: "頂級黑髮晶", code: "990050000000" },
        { name: "各類手珠.條珠系列", code: "710000000000" },
        { name: "手珠.條珠系列", code: "710010000000" },
        { name: "天珠系列", code: "710020000000" },
        { name: "靈擺 緬甸玉-三合一項鍊套組", code: "870000000000" },
        { name: "項鍊/玉墜/玉鐲系列", code: "330000000000" },
        { name: "水晶鐲.玉鐲", code: "330030000000" },
        { name: "幽靈項鍊", code: "330010000000" },
        { name: "玉墜", code: "330020000000" },
        { name: "天然木珠/手錬/項錬", code: "330040000000" },
        { name: "七星陣球組", code: "310000000000" },
        { name: "鈦晶球", code: "120000000000" },
        { name: "綠螢石球", code: "170000000000" },
        { name: "紫水晶球", code: "150000000000" },
        { name: "粉水晶球", code: "510000000000" },
        { name: "紫黃水晶球", code: "450000000000" },
        { name: "黃水晶球", code: "420000000000" },
        { name: "黃冰晶球", code: "180000000000" },
        { name: "黃冰晶球(A)", code: "180020000000" },
        { name: "黃冰晶球(B)", code: "180010000000" },
        { name: "白水晶球", code: "110000000000" },
        { name: "黑曜石球", code: "160000000000" },
        { name: "各類水晶柱", code: "460000000000" },
        { name: "綠幽靈水晶柱(有座)", code: "460080000000" },
        { name: "粉水晶柱(無座)", code: "460040000000" },
        { name: "粉水晶柱(有座)", code: "460020000000" },
        { name: "黃水晶柱(無座)", code: "460070000000" },
        { name: "黃水晶柱(有座)", code: "460010000000" },
        { name: "紫水晶柱(有座)", code: "460060000000" },
        { name: "白水晶柱(有座)", code: "460030000000" },
        { name: "白水晶柱(無座)套組", code: "460050000000" },
        { name: "天然樹化玉", code: "380000000000" },
        { name: "鹽燈原礦/鹽燈聚寶盆", code: "370000000000" },
        { name: "造型鹽燈", code: "370220000000" },
        { name: "鹽燈2.0-2.9", code: "370010000000" },
        { name: "鹽燈3.0-3.9", code: "370020000000" },
        { name: "鹽燈4.0-4.4", code: "370030000000" },
        { name: "鹽燈4.5-4.9", code: "370040000000" },
        { name: "鹽燈5.0-5.4", code: "370050000000" },
        { name: "鹽燈5.5-5.9", code: "370060000000" },
        { name: "鹽燈6.0-6.4", code: "370070000000" },
        { name: "鹽燈6.5-6.9", code: "370080000000" },
        { name: "鹽燈7.0-7.4", code: "370090000000" },
        { name: "鹽燈7.5-7.9", code: "370100000000" },
        { name: "鹽燈8.0-8.4", code: "370110000000" },
        { name: "鹽燈10公斤", code: "370150000000" },
        { name: "鹽燈20公斤", code: "370160000000" },
        { name: "鹽燈30公斤", code: "370170000000" },
        { name: "鹽燈40公斤", code: "370180000000" },
        { name: "鹽燈50公斤", code: "370190000000" },
        { name: "鹽燈60公斤", code: "370200000000" },
        { name: "鹽燈70公斤", code: "370210000000" },
        { name: "鴿血紅鹽燈 2kg", code: "370230000000" },
        { name: "鴿血紅鹽燈 3kg", code: "370240000000" },
        { name: "鴿血紅鹽燈 4kg", code: "370250000000" },
        { name: "鴿血紅鹽燈 5kg", code: "370260000000" },
        { name: "鴿血紅鹽燈 6kg", code: "370270000000" },
        { name: "鴿血紅鹽燈 7kg", code: "370280000000" },
        { name: "鴿血紅鹽燈 8kg", code: "370290000000" },
        { name: "鴿血紅鹽燈 9kg", code: "370300000000" },
        { name: "鴿血紅鹽燈 10kg", code: "370310000000" },
        { name: "鴿血紅鹽燈 20kg", code: "370320000000" },
        { name: "鴿血紅鹽燈 30kg", code: "370330000000" },
        { name: "鴿血紅鹽燈 40kg", code: "370340000000" },
        { name: "白玉鹽燈(溫柔暖光系)", code: "740000000000" },
        { name: "白玉鹽燈 2kg", code: "740010000000" },
        { name: "白玉鹽燈 3kg", code: "740020000000" },
        { name: "白玉鹽燈 4kg", code: "740030000000" },
        { name: "白玉鹽燈 5kg", code: "740040000000" },
        { name: "白玉鹽燈 6kg", code: "740050000000" },
        { name: "鹽燈電線", code: "440000000000" },
        { name: "開關線", code: "440010000000" },
        { name: "微調開關線", code: "440020000000" },
        { name: "安全開關線", code: "440030000000" },
        { name: "黑曜葫蘆系列 吊飾/擺件", code: "520000000000" },
        { name: "龍龜 小.中.大款擺件", code: "700000000000" },
        { name: "宮廷風菱紋 消磁碗", code: "860000000000" },
        { name: "水晶雕件系列", code: "410000000000" },
        { name: "白水晶 鈦晶 雕件", code: "410010000000" },
        { name: "粉水晶雕件", code: "410020000000" },
        { name: "紫水晶雕件", code: "410030000000" },
        { name: "黑曜石雕件", code: "410040000000" },
        { name: "壽山石雕件", code: "410050000000" },
        { name: "黃水晶雕件", code: "410060000000" },
        { name: "鈦晶雕件", code: "410070000000" },
        { name: "綠幽靈", code: "410080000000" },
        { name: "鈦晶/貔貅/墜飾", code: "920000000000" },
        { name: "鈦晶貔貅", code: "920010000000" },
        { name: "鈦晶墜飾/無事牌", code: "880000000000" },
        { name: "白水晶貔貅/對", code: "720000000000" },
        { name: "招財水晶方盆樹", code: "240000000000" },
        { name: "方盆(小款)", code: "240010000000" },
        { name: "橢圓盆.方盆(隨機中款)", code: "240020000000" },
        { name: "方盆(大款)", code: "240030000000" },
        { name: "方盆(特大款)", code: "240040000000" },
        { name: "招財水晶福袋樹.招財元寶造型", code: "260000000000" },
        { name: "元寶造型(小.中.大)", code: "260040000000" },
        { name: "福袋(小款)", code: "260010000000" },
        { name: "福袋(中款)", code: "260020000000" },
        { name: "福袋( 大款)", code: "260030000000" },
        { name: "招財水晶樹聚寶盆", code: "780000000000" },
        { name: "五色水晶石套組.聚寶盆套組", code: "490000000000" },
        { name: "貔貅/貔貅聚寶盆", code: "340000000000" },
        { name: "貔貅", code: "340010000000" },
        { name: "貔貅聚寶盆組", code: "340020000000" },
        { name: "各式琉璃擺件", code: "400000000000" },
        { name: "各式琉璃", code: "400010000000" },
        { name: "琉璃貔貅系列", code: "400020000000" },
        { name: "金錢/八卦/黃玉 龍龜系列", code: "290000000000" },
        { name: "黃玉龍龜", code: "290010000000" },
        { name: "黑梓木龍龜", code: "290030000000" },
        { name: "龍印 雕刻印章系列", code: "320000000000" },
        { name: "銅龍/羅盤/麒麟/葫蘆/寶鏡", code: "350000000000" },
        { name: "開運 淨化商品 珐瑯水鑽金象", code: "220000000000" },
        { name: "天然水晶石 水晶粒 😻", code: "900000000000" },
        { name: "各種底座💕", code: "890000000000" },
        { name: "鹽燈五爪底座", code: "890010000000" },
        { name: "圓型實木水晶球座✨可旋轉", code: "890020000000" },
        { name: "奇木實木底座", code: "890030000000" },
        { name: "黑梓木底座❤️大中小 三款", code: "890040000000" },
        { name: "可旋轉式✅紅絨布底座♥️", code: "890050000000" },
        { name: "圓型實木水晶球座✨", code: "890060000000" },
        { name: "天然實木圓型底座✨", code: "890070000000" },
        { name: "米甕", code: "940000000000" },
        { name: "3斤米甕", code: "940010000000" },
        { name: "5斤米甕", code: "940020000000" },
        { name: "10斤米甕", code: "940030000000" },
        { name: "小福瓜甕", code: "950000000000" },
        { name: "小圓甕", code: "960000000000" },
        { name: "臺灣出貨 招財流水盆 擺件", code: "850000000000" },
        { name: "天然綠螢石.異象瑪瑙.發財石", code: "580000000000" }
    ];

    // --- 狀態管理 ---
    const [products, setProducts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [dragActive, setDragActive] = useState(null);
    const [shopSearchTerm, setShopSearchTerm] = useState('');
    const [xlsFile, setXlsFile] = useState(null);
    const [showToast, setShowToast] = useState(null);
    const [showPackResultModal, setShowPackResultModal] = useState(false);
    const [packResultInfo, setPackResultInfo] = useState([]);
    const [showVariableModal, setShowVariableModal] = useState(false);
    const [leaveMColumnEmpty, setLeaveMColumnEmpty] = useState(true);
    // New state for validation errors
    const [showVariablePicker, setShowVariablePicker] = useState(false);
    const [activeInputId, setActiveInputId] = useState(null);
    const [activeField, setActiveField] = useState(null);
    // New state for validation errors
    const [errors, setErrors] = useState({}); // { 0: { name: true, price: true }, 1: { ... } }

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!document.querySelector('script[src*="xlsx.full.min.js"]')) {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
            script.async = true;
            document.body.appendChild(script);
        }
        if (!document.querySelector('script[src*="jszip.min.js"]')) {
            const scriptZip = document.createElement('script');
            scriptZip.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
            scriptZip.async = true;
            document.body.appendChild(scriptZip);
        }
    }, []);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const triggerToast = (msg) => setShowToast(msg);

    const copyToClipboard = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            triggerToast("已複製到剪貼簿");
        } catch (err) {
            triggerToast("複製失敗，請手動複製");
        }
        document.body.removeChild(textarea);
    };

    const insertTextAtCursor = (id, text, field) => {
        const input = document.getElementById(id);
        if (!input) return;

        const start = input.selectionStart;
        const end = input.selectionEnd;
        const currentValue = currentProduct[field] || '';
        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);

        updateProductData(activeIndex, field, newValue);

        setTimeout(() => {
            input.focus();
            input.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    };

    const handleInsertTemplate = (index) => {
        const template = `商品數量:[庫存量]

重量:[淨重]

尺寸（含座 長x寬x高）：[長]*[寬]*[高]公分。  內洞深：[洞深]公分。

石頭/礦物類型:紫水晶

材質:礦物

圖案:晶洞, 水晶洞, 紫水晶洞

出貨地:臺南市永康區`;

        updateProductData(index, 'otherInfo', template);
        triggerToast("已帶入資訊模板");
    };

    const handleInsertFeatureTemplate = (index) => {
        const template = `實拍實物 無修色
⚠️天然水晶會有一些白霧狀、色帶變化、礦紋跟小礦缺都是屬於正常現象。
內容物尺寸（含座長寬高）：[長]*[寬]*[高]公分。
內洞深：[洞深]公分。`;
        updateProductData(index, 'specialFeatures', template);
        triggerToast("已帶入特色模板");
    };

    const replaceVariables = (text, prod) => {
        if (!text) return "";
        let res = text;
        res = res.replace(/\[長\]/g, prod.prodL || '');
        res = res.replace(/\[寬\]/g, prod.prodW || '');
        res = res.replace(/\[高\]/g, prod.prodH || '');

        const weightVal = prod.weight || '';
        const weightUnit = prod.weightUnit || 'kg';
        const weightStr = weightVal ? `${weightVal}${weightUnit}` : '';
        res = res.replace(/\[淨重\]/g, weightStr);

        res = res.replace(/\[庫存量\]/g, prod.stock || '');
        res = res.replace(/\[洞深\]/g, prod.caveDepth || '');
        res = res.replace(/\[編號\]/g, prod.productNumber || '');

        return res;
    };

    const processPromoImage = (file) => {
        return new Promise((resolve, reject) => {
            const MAX_WIDTH = 1000;
            const MAX_HEIGHT = 1500;
            const MAX_SIZE = 500 * 1024;

            const img = new Image();
            const objectUrl = URL.createObjectURL(file);

            img.src = objectUrl;

            img.onload = () => {
                URL.revokeObjectURL(objectUrl);

                let width = img.width;
                let height = img.height;
                let needsResize = false;

                if (width > MAX_WIDTH) {
                    const scale = MAX_WIDTH / width;
                    width = MAX_WIDTH;
                    height = height * scale;
                    needsResize = true;
                }

                if (height > MAX_HEIGHT) {
                    const scale = MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                    width = width * scale;
                    needsResize = true;
                }

                width = Math.floor(width);
                height = Math.floor(height);

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                let quality = 0.95;

                const compress = () => {
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            console.error("Blob creation failed");
                            resolve(URL.createObjectURL(file));
                            return;
                        }

                        if (blob.size <= MAX_SIZE || quality <= 0.2) {
                            resolve(URL.createObjectURL(blob));
                        } else {
                            quality = Math.max(0.1, quality - 0.1);
                            compress();
                        }
                    }, 'image/jpeg', quality);
                };

                compress();
            };

            img.onerror = (e) => {
                console.error("Image load error", e);
                URL.revokeObjectURL(objectUrl);
                resolve(URL.createObjectURL(file));
            };
        });
    };

    const updateProductData = (index, field, value) => {
        setProducts(prevProducts => {
            const updated = [...prevProducts];
            let prod = { ...updated[index], [field]: value };

            if (field === 'copy') {
                prod.mainImages = [];
                prod.adImages = [];
                prod.promoImages = [];
            }

            updated[index] = prod;
            return updated;
        });
    };

    // Helper to update a specific variation
    const updateVariation = (productIndex, variationIndex, field, value) => {
        setProducts(prev => {
            const updated = [...prev];
            const prod = { ...updated[productIndex] };
            // Ensure variations exist
            if (!prod.variations) {
                prod.variations = [{ id: Date.now(), value: prod.specValue, image: prod.specImage, price: prod.price, stock: prod.stock }];
            }
            const newVars = [...prod.variations];
            newVars[variationIndex] = { ...newVars[variationIndex], [field]: value };
            prod.variations = newVars;
            updated[productIndex] = prod;
            return updated;
        });
    };

    const addVariation = (productIndex) => {
        setProducts(prev => {
            const updated = [...prev];
            const prod = { ...updated[productIndex] };
            // Default to current fields if first time
            const basePrice = prod.price || '';
            const baseStock = prod.stock || '';

            const currentVarsCount = (prod.variations || []).length;
            let defaultValue = '';
            if (currentVarsCount === 1) defaultValue = '微調開關線'; // Adding 2nd item
            if (currentVarsCount === 2) defaultValue = '安全開關線'; // Adding 3rd item

            const newVar = { id: Date.now(), value: defaultValue, image: '', price: basePrice, stock: baseStock };
            prod.variations = [...(prod.variations || []), newVar];
            updated[productIndex] = prod;
            return updated;
        });
    };

    const removeVariation = (productIndex, variationIndex) => {
        setProducts(prev => {
            const updated = [...prev];
            const prod = { ...updated[productIndex] };
            if (prod.variations && prod.variations.length > 1) {
                prod.variations = prod.variations.filter((_, i) => i !== variationIndex);
                updated[productIndex] = prod;
            } else {
                triggerToast("至少需要保留一個規格");
            }
            return updated;
        });
    };

    const handleSpecImageUpload = async (productIndex, variationIndex, file) => {
        if (!file) return;
        try {
            const url = URL.createObjectURL(file);
            // If in variation mode, update variation. Else update main (legacy support)
            if (variationIndex !== null && variationIndex !== undefined) {
                updateVariation(productIndex, variationIndex, 'image', url);
            } else {
                updateProductData(productIndex, 'specImage', url);
            }
        } catch (e) {
            console.error("Spec image upload failed", e);
        }
    };

    const handleCopyDimensions = () => {
        if (activeIndex === null) return;
        setProducts(prev => {
            const updated = [...prev];
            const prod = { ...updated[activeIndex] };
            prod.shipL = prod.prodL;
            prod.shipW = prod.prodW;
            prod.shipH = prod.prodH;
            updated[activeIndex] = prod;
            return updated;
        });
        triggerToast("已帶入商品尺寸");
    };

    const handleSetPresetSize = (l, w, h, label) => {
        if (activeIndex === null) return;
        setProducts(prev => {
            const updated = [...prev];
            const prod = { ...updated[activeIndex] };
            prod.shipL = l;
            prod.shipW = w;
            prod.shipH = h;
            updated[activeIndex] = prod;
            return updated;
        });
        triggerToast(`已套用: ${label}`);
    };

    const handleAddProduct = () => {
        const newProduct = {
            productNumber: '',
            name: '',
            prodL: '', prodW: '', prodH: '',
            category: '',
            otherInfo: '',
            specType: 'none',
            specName: '[編號]號，[淨重]',
            specValue: '一般開關線',
            specImage: '',
            price: '',
            specialPrice: '',
            stock: '',
            shippingMethod: 'size',
            shipL: '', shipW: '', shipH: '',
            shipGrade: '',
            weight: '',
            weightUnit: 'kg',
            caveDepth: '',
            tempLayer: 'normal',
            shipMethods: [],
            isFreeShipping: 'no',
            specialFeatures: '',
            shopCategories: [],
            mainImages: [],
            adImages: [],
            promoImages: [],
            // Initialize with one default variation
            variations: [
                { id: Date.now(), value: '一般開關線', image: '', price: '', stock: '' }
            ]
        };
        setProducts(prev => [...prev, newProduct]);
        setActiveIndex(products.length);
        triggerToast("已新增商品草稿");
    };

    useEffect(() => {
        if (products.length > 0 && activeIndex === null) {
            setActiveIndex(0);
        } else if (products.length > 0 && activeIndex === products.length) {
            setActiveIndex(products.length - 1);
        }
    }, [products.length]);


    const handleCopyProduct = (indexToCopy) => {
        setProducts(prev => {
            const sourceProduct = prev[indexToCopy];
            const clonedProduct = JSON.parse(JSON.stringify(sourceProduct));

            clonedProduct.mainImages = [];
            clonedProduct.adImages = [];
            clonedProduct.promoImages = [];
            // Clean up variation images in clone (optional, but consistent with main images)
            if (clonedProduct.variations) {
                clonedProduct.variations = clonedProduct.variations.map(v => ({ ...v, image: '' }));
            }
            clonedProduct.specImage = '';

            return [...prev, clonedProduct];
        });
        triggerToast("商品已複製 (不含圖片)");
    };

    const handleDeleteProduct = (indexToDelete) => {
        setProducts(prev => {
            const updated = prev.filter((_, index) => index !== indexToDelete);
            if (updated.length === 0) {
                setActiveIndex(null);
            } else if (activeIndex >= updated.length) {
                setActiveIndex(updated.length - 1);
            }
            return updated;
        });
        triggerToast("商品已刪除");
    };

    const handleXlsUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setXlsFile(file);
            triggerToast(`已載入 Excel: ${file.name}`);
        }
    };

    const handleImageUpload = async (field, files, max) => {
        if (!files) return;

        const currentProduct = products[activeIndex];
        const currentImages = currentProduct[field] || [];
        const remainingSlots = max - currentImages.length;

        if (remainingSlots <= 0) {
            triggerToast(`圖片已達上限 ${max} 張`);
            return;
        }

        const rawFiles = Array.from(files).slice(0, remainingSlots);

        if (field === 'promoImages') {
            triggerToast("正在處理圖片壓縮與調整...");
        }

        const newImagePromises = rawFiles.map(async (file) => {
            if (field === 'promoImages') {
                try {
                    return await processPromoImage(file);
                } catch (e) {
                    console.error("Image processing failed", e);
                    return URL.createObjectURL(file);
                }
            } else {
                return URL.createObjectURL(file);
            }
        });

        const newImageUrls = await Promise.all(newImagePromises);

        setProducts(prev => {
            const updated = [...prev];
            const prod = { ...updated[activeIndex] };
            const existing = prod[field] || [];
            prod[field] = [...existing, ...newImageUrls];
            updated[activeIndex] = prod;
            return updated;
        });

        if (field === 'promoImages') {
            triggerToast("圖片處理完成");
        }
    };

    const handleDrag = (e, field) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(field);
        } else if (e.type === 'dragleave') {
            setDragActive(null);
        }
    };

    const handleDrop = (e, field, max) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(null);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageUpload(field, e.dataTransfer.files, max);
        }
    };

    const removeImage = (field, imgIndex) => {
        setProducts(prev => {
            const updated = [...prev];
            const prod = { ...updated[activeIndex] };
            const current = prod[field] || [];
            prod[field] = current.filter((_, i) => i !== imgIndex);
            updated[activeIndex] = prod;
            return updated;
        });
    };

    const handlePackData = () => {
        if (!xlsFile) {
            triggerToast("錯誤：請先上傳 Excel 模板檔案");
            return;
        }

        if (products.length === 0) {
            triggerToast("錯誤：沒有商品資料，請至少新增一項商品");
            return;
        }

        // --- 防呆驗證機制 ---
        for (let i = 0; i < products.length; i++) {
            const p = products[i];
            const pId = p.productNumber || String(i + 1); // Use Product Number or Index + 1 if empty
            const pIdentity = `Item ID: ${pId}`;

            let productErrors = {};
            let hasError = false;

            // 1. 必填基本資料
            if (!p.name) {
                productErrors.name = true;
                hasError = true;
            }
            if (!p.mainImages || p.mainImages.length === 0) {
                productErrors.mainImages = true;
                hasError = true;
            }

            // 2. 必填規格與售價/庫存
            if (p.specType === 'none') {
                if (!p.price) {
                    productErrors.price = true;
                    hasError = true;
                }
                if (!p.stock) {
                    productErrors.stock = true;
                    hasError = true;
                }
            } else if (p.specType === 'single') {
                if (!p.specName) {
                    productErrors.specName = true;
                    hasError = true;
                }
                if (!p.variations || p.variations.length === 0) {
                    // This is a structural error, maybe just toast
                    triggerToast(`錯誤：${pIdentity} 至少需有一組規格內容`);
                    setActiveIndex(i);
                    return;
                }

                // Check variations
                let variationErrors = {};
                for (let j = 0; j < p.variations.length; j++) {
                    const v = p.variations[j];
                    if (!v.value) {
                        variationErrors[`var_${j}_value`] = true;
                        hasError = true;
                    }
                    if (!v.price) {
                        variationErrors[`var_${j}_price`] = true;
                        hasError = true;
                    }
                    if (!v.stock) {
                        variationErrors[`var_${j}_stock`] = true;
                        hasError = true;
                    }
                }
                if (Object.keys(variationErrors).length > 0) {
                    productErrors.variations = variationErrors;
                }
            }

            // 3. 必填配送設定
            if (p.shippingMethod === 'size') {
                if (!p.shipL) { productErrors.shipL = true; hasError = true; }
                if (!p.shipW) { productErrors.shipW = true; hasError = true; }
                if (!p.shipH) { productErrors.shipH = true; hasError = true; }
            } else if (p.shippingMethod === 'grade') {
                if (!p.shipGrade) { productErrors.shipGrade = true; hasError = true; }
            }

            if (!p.tempLayer) {
                productErrors.tempLayer = true;
                hasError = true;
            }

            if (!p.shipMethods || p.shipMethods.length === 0) {
                productErrors.shipMethods = true;
                hasError = true;
            }

            if (!p.adImages || p.adImages.length === 0) {
                productErrors.adImages = true;
                hasError = true;
            }

            if (!p.promoImages || p.promoImages.length === 0) {
                productErrors.promoImages = true;
                hasError = true;
            }

            if (!p.category) {
                productErrors.category = true;
                hasError = true;
            }

            if (!p.specialFeatures) {
                productErrors.specialFeatures = true;
                hasError = true;
            }

            if (hasError) {
                // Update error state
                setErrors(prev => ({ ...prev, [i]: productErrors }));

                // Identify the first error field for the message
                let errorMsg = "資料未填寫完整";
                if (productErrors.name) errorMsg = "未填寫「商品名稱」";
                else if (productErrors.mainImages) errorMsg = "未上傳「主圖」";
                else if (productErrors.price) errorMsg = "未填寫「售價」";
                else if (productErrors.stock) errorMsg = "未填寫「庫存量」";
                else if (productErrors.specName) errorMsg = "未填寫「規格名稱」";
                else if (productErrors.variations) errorMsg = "規格內容資料不完整";
                else if (productErrors.shipL || productErrors.shipW || productErrors.shipH) errorMsg = "未設定「材積尺寸」";
                else if (productErrors.shipGrade) errorMsg = "未選擇「材積級距」";
                else if (productErrors.tempLayer) errorMsg = "未選擇「配送溫層」";
                else if (productErrors.shipMethods) errorMsg = "未選擇「配送方式」";
                else if (productErrors.adImages) errorMsg = "未上傳「廣告用圖」";
                else if (productErrors.promoImages) errorMsg = "未上傳「專推圖」";
                else if (productErrors.category) errorMsg = "未選擇「商品分類」";
                else if (productErrors.specialFeatures) errorMsg = "未填寫「商品特色與描述」";

                triggerToast(`錯誤：${pIdentity} ${errorMsg}`);
                setActiveIndex(i);
                return; // Stop at first invalid product
            } else {
                // Clear errors for this product if valid
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[i];
                    return newErrors;
                });
            }
        }
        // --- 驗證結束 ---

        if (!window.XLSX || !window.JSZip) {
            triggerToast("系統錯誤：元件尚未載入完成，請稍後再試");
            return;
        }

        triggerToast("正在處理資料打包 (Excel + 圖片)...");

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = window.XLSX.read(data, { type: 'array' });

                if (workbook.Props) delete workbook.Props;
                if (workbook.Custprops) delete workbook.Custprops;

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                for (let c = 0; c <= 42; c++) {
                    const cellAddress = window.XLSX.utils.encode_cell({ r: 3, c: c });
                    if (worksheet[cellAddress]) {
                        delete worksheet[cellAddress];
                    }
                }

                const tempResults = [];
                let globalIdCounter = 10001; // Global counter for ALL rows generated
                let excelRowCounter = 0; // NEW: Track actual Excel rows

                // This array will hold simple objects { id: '10001', mainImages: [] } to help the image zipper know what ID maps to what images
                const imageMapping = [];

                products.forEach((product) => {
                    // Determine variations. 
                    // If 'single' mode, use variations. If variations is empty (legacy), fallback to single root values.
                    // If 'none' mode, use root values as one row.
                    let rowsToGenerate = [];

                    if (product.specType === 'single') {
                        const vars = (product.variations && product.variations.length > 0)
                            ? product.variations
                            : [{ value: product.specValue, image: product.specImage, price: product.price, stock: product.stock }];

                        rowsToGenerate = vars.map((v, idx) => ({
                            ...product, // inherit base
                            specValue: v.value,
                            specImage: v.image,
                            price: v.price || product.price, // use variation price or fallback to root
                            stock: v.stock || product.stock,
                            varIndex: idx + 1 // Add index for filename generation
                        }));
                    } else {
                        // 'none' or 'double' (treat as single row for now)
                        rowsToGenerate = [product];
                    }

                    // Generate ONE Item ID per product group (same ID for all variations)
                    const currentItemId = globalIdCounter++;

                    // --- Push info once per product to avoid duplicates in modal ---
                    if (rowsToGenerate.length > 0) {
                        const firstRow = rowsToGenerate[0];
                        const processedOtherInfo = replaceVariables(firstRow.otherInfo || "", firstRow);
                        tempResults.push({
                            id: currentItemId,
                            info: processedOtherInfo
                        });
                    }

                    rowsToGenerate.forEach(rowItem => {
                        // Calculate row index based on total rows written, not ID
                        excelRowCounter++;
                        const currentRow = 3 + excelRowCounter; // 4 corresponds to 1st data row

                        // Calculate Spec Image Filename if exists (for Single Spec)
                        let specImageFilename = "";
                        if (product.specType === 'single' && rowItem.specImage) {
                            const paddedIndex = String(rowItem.varIndex).padStart(3, '0');
                            // Format: 10001_01_001_B.jpg
                            specImageFilename = `${currentItemId}_01_${paddedIndex}_B.jpg`;
                        }

                        // Record for image zipping
                        imageMapping.push({
                            id: currentItemId,
                            mainImages: rowItem.mainImages || [],
                            adImages: rowItem.adImages || [],
                            promoImages: rowItem.promoImages || [],
                            specImage: rowItem.specImage, // Add spec image URL
                            specImageFilename: specImageFilename // Add spec image filename
                        });

                        // Check if this is a secondary row for single spec (index > 0)
                        const isSingleSpecSecondary = product.specType === 'single' && rowItem.varIndex > 1;

                        if (isSingleSpecSecondary) {
                            // Sparse Row: Only A, G, Y, Z, AA, AD
                            const sparseRow = Array(42).fill("");
                            sparseRow[0] = currentItemId.toString(); // A: ID
                            sparseRow[6] = rowItem.price || "";      // G: Price

                            // Y: Spec Value
                            sparseRow[24] = replaceVariables(rowItem.specValue || "", rowItem);

                            // Z: Fixed "無" (consistent with full row logic)
                            sparseRow[25] = "無";

                            // AA: Spec Image Filename
                            sparseRow[26] = specImageFilename;

                            // AD: Stock
                            sparseRow[29] = rowItem.stock || "";

                            window.XLSX.utils.sheet_add_aoa(worksheet, [sparseRow], { origin: `A${currentRow}` });
                        } else {
                            // Full Row Logic (Standard)
                            const categoryCode = rowItem.category || "";
                            const shopCatCodes = (rowItem.shopCategories || []).join('\n');
                            const tempMap = { 'normal': '常溫', 'chilled': '冷藏', 'frozen': '冷凍' };
                            const tempText = tempMap[rowItem.tempLayer] || '常溫';

                            const methods = rowItem.shipMethods || [];
                            const hasConvenience = methods.includes('convenience') ? '有' : '無';
                            const hasThirdParty = methods.includes('thirdparty') ? '有' : '無';
                            const hasCustom = methods.includes('custom') ? '有' : '無';
                            const customLogisticsFlag = methods.includes('custom') ? '1' : '';

                            // Image filenames
                            const mainImgCount = (rowItem.mainImages || []).length;
                            const imageFilenames = [];
                            for (let i = 1; i <= mainImgCount; i++) {
                                imageFilenames.push(`${currentItemId}_B${i}.jpg`);
                            }
                            const anColumnValue = imageFilenames.join(',');

                            const promoImgCount = (rowItem.promoImages || []).length;
                            const promoFilenames = [];
                            for (let i = 1; i <= promoImgCount; i++) {
                                promoFilenames.push(`${currentItemId}_m_1_${i}.jpg`);
                            }
                            const apColumnValue = promoFilenames.join(',');

                            const adImgCount = (rowItem.adImages || []).length;
                            const aoColumnValue = adImgCount > 0 ? `${currentItemId}_O.jpg` : "";

                            const processedName = replaceVariables(rowItem.name || "", rowItem);
                            const processedFeatures = replaceVariables(rowItem.specialFeatures || "", rowItem);

                            // Weight
                            let finalWeight = "0.1";
                            if (rowItem.weight && !isNaN(parseFloat(rowItem.weight))) {
                                let val = parseFloat(rowItem.weight);
                                if (rowItem.weightUnit === 'g') {
                                    val = val * 0.001;
                                    val = Math.floor(val * 10) / 10;
                                    finalWeight = val < 0.1 ? "0.1" : val.toString();
                                } else {
                                    finalWeight = val < 0.1 ? "0.1" : rowItem.weight;
                                }
                            }

                            // Specs Columns
                            let uColumn = "";
                            let vColumn = "";
                            let wColumn = "";
                            let yColumn = "無";
                            let aaColumn = "";

                            if (rowItem.specType === 'single') {
                                // Single Spec logic: Name in W, Value in Y, Image in AA
                                wColumn = replaceVariables(rowItem.specName || "", rowItem);
                                yColumn = replaceVariables(rowItem.specValue || "", rowItem);
                                aaColumn = specImageFilename;
                                // U and V remain empty
                            } else {
                                // Default behavior (none)
                                // uColumn, vColumn logic if any... (Currently empty for 'none')
                                // Y default is "無"
                            }

                            const rowData = [
                                [
                                    currentItemId.toString(),
                                    processedName,
                                    categoryCode,
                                    shopCatCodes,
                                    "20240412111809369",
                                    "",
                                    rowItem.price || "",
                                    "",
                                    tempText,
                                    hasConvenience,
                                    hasThirdParty,
                                    hasCustom,
                                    leaveMColumnEmpty ? "" : "否",
                                    customLogisticsFlag,
                                    "",
                                    rowItem.shipW || "",
                                    rowItem.shipL || "",
                                    rowItem.shipH || "",
                                    finalWeight,
                                    "無",
                                    uColumn, // U
                                    vColumn, // V
                                    wColumn, // W
                                    "",      // X
                                    yColumn, // Y
                                    "無",    // Z
                                    aaColumn,// AA
                                    "", "",
                                    rowItem.stock || "",
                                    "000001",
                                    "", "", "", "",
                                    processedFeatures,
                                    "", "", "",
                                    anColumnValue,
                                    aoColumnValue,
                                    apColumnValue
                                ]
                            ];

                            window.XLSX.utils.sheet_add_aoa(worksheet, rowData, { origin: `A${currentRow}` });
                        }
                    });
                });

                setPackResultInfo(tempResults);
                setShowPackResultModal(true);

                const outData = window.XLSX.write(workbook, { bookType: 'xls', type: 'array' });
                const zip = new window.JSZip();

                const excelFilename = `momo_upload_${new Date().toISOString().slice(0, 10)}.xls`;
                zip.file(excelFilename, outData);

                const imgPromises = [];

                // Use imageMapping to zip images with correct IDs
                imageMapping.forEach((item) => {
                    const currentItemId = item.id;

                    // Main Images
                    item.mainImages.forEach((url, i) => {
                        const filename = `${currentItemId}_B${i + 1}.jpg`;
                        const promise = fetch(url)
                            .then(res => res.blob())
                            .then(blob => zip.file(filename, blob));
                        imgPromises.push(promise);
                    });

                    // Ad Images
                    item.adImages.forEach((url, i) => {
                        if (i === 0) {
                            const filename = `${currentItemId}_O.jpg`;
                            const promise = fetch(url)
                                .then(res => res.blob())
                                .then(blob => zip.file(filename, blob));
                            imgPromises.push(promise);
                        }
                    });

                    // Promo Images
                    item.promoImages.forEach((url, i) => {
                        const filename = `${currentItemId}_m_1_${i + 1}.jpg`;
                        const promise = fetch(url)
                            .then(res => res.blob())
                            .then(blob => zip.file(filename, blob));
                        imgPromises.push(promise);
                    });

                    // Spec Image (New)
                    if (item.specImage && item.specImageFilename) {
                        const promise = fetch(item.specImage)
                            .then(res => res.blob())
                            .then(blob => zip.file(item.specImageFilename, blob));
                        imgPromises.push(promise);
                    }
                });

                Promise.all(imgPromises).then(() => {
                    zip.generateAsync({ type: "blob" }).then(function (content) {
                        const zipUrl = URL.createObjectURL(content);
                        const link = document.createElement('a');
                        link.href = zipUrl;
                        link.download = `momo_pack_${new Date().getTime()}.zip`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        triggerToast("打包完成！Excel 與圖片已壓縮下載");
                    });
                });

            } catch (error) {
                console.error("處理失敗:", error);
                triggerToast("錯誤：處理失敗，請確認檔案格式");
            }
        };

        reader.readAsArrayBuffer(xlsFile);
    };

    const currentProduct = activeIndex !== null ? products[activeIndex] : null;

    // Ensure variations are initialized for rendering if not present (migration on the fly)
    const currentVariations = currentProduct ? (currentProduct.variations || [
        { id: 'default', value: currentProduct.specValue || '', image: currentProduct.specImage || '', price: currentProduct.price || '', stock: currentProduct.stock || '' }
    ]) : [];

    const filteredShopCategories = shopCategoriesList.filter(item =>
        item.name.toLowerCase().includes(shopSearchTerm.toLowerCase()) ||
        item.code.includes(shopSearchTerm)
    );

    const isNameTooLong = currentProduct && (currentProduct.name?.length || 0) > 49;

    if (isExpired) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-white">
                <div className="text-center p-8">
                    <h1 className="text-xl font-medium text-gray-800 mb-2">System Error</h1>
                    <p className="text-sm text-gray-600 mb-6">Generic Exception Occurred</p>
                    <div className="inline-block px-4 py-2 bg-gray-100 rounded text-xs font-mono text-gray-500 border border-gray-200">
                        Error Code: 1553
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans text-[15px] overflow-hidden">
            {/* 側邊導覽 - 改為白底 */}
            <nav className="w-72 border-r border-gray-200 flex flex-col bg-white shadow-xl z-20">
                <div className="p-4">
                    <div className="text-xs text-blue-600 font-bold tracking-[0.2em] mb-1">MOMO ASSISTANT</div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-black tracking-tighter text-gray-900">上架助手</h1>
                        <button
                            onClick={() => setShowVariableModal(true)}
                            className="text-[0.8rem] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded border border-gray-300 transition-colors"
                        >
                            變數說明
                        </button>
                    </div>
                </div>

                <div className="px-6">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleXlsUpload}
                        accept=".xls,.xlsx"
                        className="hidden"
                    />

                    <div className="flex gap-2"> {/* New flex container */}
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="flex-1 py-2 px-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-400 text-gray-600 hover:text-blue-600 rounded-lg transition-all text-sm font-bold"
                        >
                            載入 Excel
                        </button>

                        <button
                            onClick={handleAddProduct}
                            className="flex-1 py-2 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-transform active:scale-[0.98] font-bold text-center text-sm"
                        >
                            新增商品
                        </button>
                    </div>

                    {xlsFile && (
                        <div className="mt-2 py-1.5 px-3 bg-blue-50 border border-blue-100 rounded-md">
                            <p className="text-[10px] text-blue-600 truncate font-medium">{xlsFile.name}</p>
                        </div>
                    )}
                </div>
                <hr className="my-2" />
                <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6 custom-scrollbar">
                    {products.length === 0 ? (
                        <div className="py-10 px-4 text-center text-gray-400 text-sm italic">尚無商品，請點擊上方按鈕新增</div>
                    ) : (
                        products.map((p, index) => {
                            const displayId = 10001 + index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-full py-2 px-4 rounded-xl text-left transition-all relative overflow-hidden group border ${activeIndex === index
                                        ? 'bg-blue-50 text-blue-900 border-blue-100 shadow-sm'
                                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[0.7rem] font-bold text-[#aeb7be]">ITEM ID</span>
                                            <span className="font-mono text-base font-bold">{displayId}</span>
                                        </div>
                                        {p.name && (
                                            <div className="text-[11px] opacity-60 max-w-[100px] truncate text-right font-medium">{p.name}</div>
                                        )}
                                    </div>
                                    {activeIndex === index && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>

                <div className="p-3 border-t border-gray-100 bg-gray-50/50 backdrop-blur-md">
                    <div className="flex gap-2">
                        <button
                            onClick={handlePackData}
                            className={`py-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-400 rounded-lg text-gray-600 hover:text-blue-600 transition-all font-bold text-sm ${packResultInfo.length > 0 ? 'flex-1' : 'w-full'}`}
                        >
                            一鍵打包
                        </button>

                        {packResultInfo.length > 0 && (
                            <button
                                onClick={() => setShowPackResultModal(true)}
                                className="px-3 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-600 transition-all font-bold text-sm whitespace-nowrap"
                            >
                                其他資訊列表
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* 主編輯區 - 改為淺灰底 */}
            <main className="flex-1 overflow-y-auto bg-gray-50 relative custom-scrollbar">
                {currentProduct ? (
                    <div className="max-w-6xl mx-auto p-6 pb-32">
                        {/* ... header ... */}
                        <header className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-md py-2 mb-4 flex flex-row justify-between items-center gap-4 border-b border-gray-200 transition-all -mx-2 px-2">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tighter">
                                    商品編號 {10001 + activeIndex}
                                </h2>
                                <p className="text-gray-500 font-medium uppercase tracking-widest text-[0.65rem]">Product management & detail configuration</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleCopyProduct(activeIndex)}
                                    className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 transition-all font-bold text-xs shadow-sm"
                                >
                                    複製本品
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(activeIndex)}
                                    className="px-4 py-1.5 bg-white text-red-500 border border-red-100 rounded-full hover:bg-red-50 transition-all font-bold text-xs shadow-sm"
                                >
                                    刪除商品
                                </button>
                            </div>
                        </header>

                        <div className="space-y-16">
                            {/* 圖片管理 */}
                            <section>
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">圖片資產管理</h3>
                                    <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                </div>

                                <div className="space-y-12">
                                    {/* 主圖 */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[0.8rem] font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-600 font-bold">
                                                    {currentProduct.mainImages?.length || 0} / 6
                                                </span>
                                                <p className="text-sm font-bold text-gray-700">商品主圖 (1:1 小於1000kb 最少1張，最多6張) <span className="text-red-500">*</span></p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                            {(currentProduct.mainImages || []).map((url, i) => (
                                                <div key={i} className={`relative aspect-square bg-white border rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all ${errors[activeIndex]?.mainImages ? 'border-red-500' : 'border-gray-200'}`}>
                                                    <img src={url} alt="主圖" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                    <button
                                                        onClick={() => removeImage('mainImages', i)}
                                                        className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[0.8rem] font-bold text-red-500"
                                                    >
                                                        移除圖片
                                                    </button>
                                                </div>
                                            ))}
                                            {(currentProduct.mainImages?.length || 0) < 6 && (
                                                <label
                                                    className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all
                            ${dragActive === 'mainImages'
                                                            ? 'bg-blue-50 border-blue-500 text-blue-600 scale-[1.02]'
                                                            : (errors[activeIndex]?.mainImages ? 'bg-red-50 border-red-500 text-red-500 ring-2 ring-red-200' : 'bg-white border-gray-300 hover:border-gray-400 text-gray-400 hover:text-gray-600 hover:bg-gray-50')}`}
                                                    onDragEnter={(e) => handleDrag(e, 'mainImages')}
                                                    onDragLeave={(e) => handleDrag(e, 'mainImages')}
                                                    onDragOver={(e) => handleDrag(e, 'mainImages')}
                                                    onDrop={(e) => handleDrop(e, 'mainImages', 6)}
                                                >
                                                    <span className="text-[20px] mb-1 font-light">+</span>
                                                    <span className="text-[0.8rem] font-bold uppercase tracking-wider">上傳圖片</span>
                                                    <input type="file" multiple className="hidden" onChange={(e) => handleImageUpload('mainImages', e.target.files, 6)} />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    {/* 廣告與專推 (統一使用主圖的 grid 與 aspect-square) */}
                                    <div className="grid grid-cols-1 gap-12">
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-[0.8rem] font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-600 font-bold">
                                                    {currentProduct.adImages?.length || 0} / 1
                                                </span>
                                                <p className="text-sm font-bold text-gray-700">廣告用圖 (乾淨商品圖 小於1000kb) <span className="text-red-500">*</span></p>
                                            </div>
                                            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                                {(currentProduct.adImages || []).map((url, i) => (
                                                    <div key={i} className="relative aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all">
                                                        <img src={url} alt="廣告圖" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                        <button
                                                            onClick={() => removeImage('adImages', i)}
                                                            className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[0.8rem] font-bold text-red-500"
                                                        >
                                                            移除圖片
                                                        </button>
                                                    </div>
                                                ))}
                                                {(currentProduct.adImages?.length || 0) < 1 && (
                                                    <label
                                                        className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all
                              ${dragActive === 'adImages'
                                                                ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                                : (errors[activeIndex]?.adImages ? 'bg-red-50 border-red-500 text-red-500 ring-2 ring-red-200' : 'bg-white border-gray-300 text-gray-400 hover:bg-gray-50')}`}
                                                        onDragEnter={(e) => handleDrag(e, 'adImages')}
                                                        onDragLeave={(e) => handleDrag(e, 'adImages')}
                                                        onDragOver={(e) => handleDrag(e, 'adImages')}
                                                        onDrop={(e) => handleDrop(e, 'adImages', 1)}
                                                    >
                                                        <span className="text-[20px] mb-1 font-light">+</span>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">上傳廣告圖</span>
                                                        <input type="file" className="hidden" onChange={(e) => handleImageUpload('adImages', e.target.files, 1)} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-[0.8rem] font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-600 font-bold">
                                                    {currentProduct.promoImages?.length || 0} / 20
                                                </span>
                                                <p className="text-sm font-bold text-gray-700">專推圖 (寬1000px, 高&lt;1500px, &lt;500kb) <span className="text-red-500">*</span></p>
                                            </div>
                                            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                                {(currentProduct.promoImages || []).map((url, i) => (
                                                    <div key={i} className="relative aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all">
                                                        <img src={url} alt="專推圖" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                        <button onClick={() => removeImage('promoImages', i)} className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[0.8rem] font-bold text-red-500">DEL</button>
                                                    </div>
                                                ))}
                                                {(currentProduct.promoImages?.length || 0) < 20 && (
                                                    <label
                                                        className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all
                              ${dragActive === 'promoImages'
                                                                ? 'bg-blue-50 border-blue-500 text-blue-600'
                                                                : (errors[activeIndex]?.promoImages ? 'bg-red-50 border-red-500 text-red-500 ring-2 ring-red-200' : 'bg-white border-gray-300 text-gray-400 hover:bg-gray-50')}`}
                                                        onDragEnter={(e) => handleDrag(e, 'promoImages')}
                                                        onDragLeave={(e) => handleDrag(e, 'promoImages')}
                                                        onDragOver={(e) => handleDrag(e, 'promoImages')}
                                                        onDrop={(e) => handleDrop(e, 'promoImages', 20)}
                                                    >
                                                        <span className="text-[20px] mb-1 font-light">+</span>
                                                        <span className="text-[0.8rem] font-bold uppercase tracking-wider">新增專推</span>
                                                        <input type="file" multiple className="hidden" onChange={(e) => handleImageUpload('promoImages', e.target.files, 20)} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 基本資訊 */}
                            <section>
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">商品基本參數</h3>
                                    <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                                    <div className="md:col-span-6 flex flex-col gap-2">
                                        <label className="text-[0.9rem] font-bold text-gray-500 uppercase">
                                            商品完整名稱 <span className="text-red-500">*</span>
                                            <span className="text-[0.7rem] text-gray-500 font-normal ml-2">
                                                (最多50字，品名禁止有相關文案如：活動名稱、活動日期、贈送××商品、代言、熱銷、與商品認知模糊)
                                            </span>
                                            {isNameTooLong && (
                                                <span className="text-[0.8rem] text-red-500 font-bold ml-2 animate-pulse">
                                                    超過字數限制 請縮短字數
                                                </span>
                                            )}
                                        </label>
                                        <div className="flex gap-2 mb-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveInputId('product-name-input');
                                                    setActiveField('name');
                                                    setShowVariablePicker(true);
                                                }}
                                                className="px-3 py-1 bg-gray-50 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors text-xs font-bold flex items-center gap-1"
                                            >
                                                <span>+</span> 插入自定義變數
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            id="product-name-input"
                                            value={currentProduct.name}
                                            onChange={(e) => updateProductData(activeIndex, 'name', e.target.value)}
                                            placeholder="例如：【千奇精品】巴西頂級紫水晶洞 附鑑定書"
                                            className={`bg-white border ${isNameTooLong ? 'border-red-500 focus:ring-red-500' : (errors[activeIndex]?.name ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200 focus:ring-blue-500')} rounded-xl p-4 focus:border-blue-500 text-lg placeholder:text-gray-300 text-gray-900 transition-all font-semibold shadow-sm`}
                                        />
                                        {currentProduct.weight && parseFloat(currentProduct.weight) > 0 && (
                                            <div className="flex justify-end mt-2">
                                                <a
                                                    href={`https://shopee.tw/search?keyword=${currentProduct.weight}${(!currentProduct.weightUnit || currentProduct.weightUnit === 'kg') ? 'kg' : '公克'}&shop=18046809`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-100 hover:border-orange-300 transition-all text-xs font-bold w-fit group"
                                                >
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                                    查看蝦皮同重量商品
                                                    <span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span>
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-1 flex flex-col gap-2">
                                        <label className="text-[0.9rem] font-bold text-gray-500 uppercase">編號</label>
                                        <input
                                            type="text"
                                            value={currentProduct.productNumber || ''}
                                            onChange={(e) => updateProductData(activeIndex, 'productNumber', e.target.value)}
                                            placeholder=""
                                            className="bg-white border border-gray-200 rounded-xl p-4 text-center text-gray-900 placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-3 flex flex-col gap-2">
                                        <label className="text-[0.9rem] font-bold text-gray-500 uppercase">商品尺寸 (長 x 寬 x 高 cm)</label>
                                        <div className="flex gap-2">
                                            <input type="number" placeholder="L" value={currentProduct.prodL} onChange={(e) => updateProductData(activeIndex, 'prodL', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-4 text-center text-gray-900 placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                            <input type="number" placeholder="W" value={currentProduct.prodW} onChange={(e) => updateProductData(activeIndex, 'prodW', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-4 text-center text-gray-900 placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                            <input type="number" placeholder="H" value={currentProduct.prodH} onChange={(e) => updateProductData(activeIndex, 'prodH', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-4 text-center text-gray-900 placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[0.9rem] font-bold text-gray-500 uppercase">淨重</label>
                                            <div className="flex bg-gray-200 rounded p-0.5 w-3/5">
                                                <button
                                                    onClick={() => updateProductData(activeIndex, 'weightUnit', 'kg')}
                                                    className={`w-1/2 px-1 py-0.5 text-[9px] rounded transition-all ${!currentProduct.weightUnit || currentProduct.weightUnit === 'kg' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                                                >
                                                    kg
                                                </button>
                                                <button
                                                    onClick={() => updateProductData(activeIndex, 'weightUnit', 'g')}
                                                    className={`w-1/2 px-1 py-0.5 text-[9px] rounded transition-all ${currentProduct.weightUnit === 'g' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                                                >
                                                    g
                                                </button>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={currentProduct.weight}
                                                onChange={(e) => updateProductData(activeIndex, 'weight', e.target.value)}
                                                placeholder="0.0"
                                                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-center font-mono text-gray-900 placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex flex-col gap-2">
                                        <label className="text-[0.9rem] font-bold text-gray-500 uppercase">洞深 (cm)</label>
                                        <input type="number" value={currentProduct.caveDepth} onChange={(e) => updateProductData(activeIndex, 'caveDepth', e.target.value)} placeholder="0.0" className="bg-white border border-gray-200 rounded-xl p-4 text-center font-mono text-gray-900 placeholder:text-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>

                                    <div className="md:col-span-3 flex flex-col gap-2">
                                        <label className="text-[0.9rem] font-bold text-gray-500 uppercase">商品分類 (MOMO 前台) <span className="text-red-500">*</span></label>
                                        <select
                                            value={currentProduct.category}
                                            onChange={(e) => updateProductData(activeIndex, 'category', e.target.value)}
                                            className={`bg-white border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none cursor-pointer shadow-sm ${errors[activeIndex]?.category ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`}
                                        >
                                            <option value="">選擇分類</option>
                                            {categories.map((cat) => (
                                                <option key={cat.code} value={cat.code}>{cat.name} ({cat.code})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-3 flex flex-col gap-2">
                                        <label className="text-[0.9rem] font-bold text-gray-500 uppercase">品牌編號</label>
                                        <input
                                            type="text"
                                            value="千奇國際精品 20240412111809369"
                                            disabled
                                            className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-gray-500 font-mono shadow-inner cursor-not-allowed select-all"
                                        />
                                    </div>

                                    <div className="md:col-span-6 flex flex-col gap-2">
                                        <label className="text-[0.9rem] font-bold text-gray-500 uppercase">規格類型</label>
                                        <div className="flex p-1 bg-gray-200 rounded-xl">
                                            {['none', 'single'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => updateProductData(activeIndex, 'specType', type)}
                                                    className={`flex-1 py-3 text-[0.9rem] font-bold rounded-lg transition-all ${currentProduct.specType === type ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                                >
                                                    {type === 'none' ? '單品' : '單規格'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 單規格設定區塊 - 僅在選擇單規格時顯示 */}
                                    {currentProduct.specType === 'single' && (
                                        <div className="md:col-span-6 flex flex-col gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100 shadow-sm">
                                            {/* 第一列：規格名稱 */}
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[0.9rem] font-bold text-blue-800 uppercase tracking-widest">規格名稱 <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={currentProduct.specName}
                                                    onChange={(e) => updateProductData(activeIndex, 'specName', e.target.value)}
                                                    className={`bg-white border rounded-xl p-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[activeIndex]?.specName ? 'border-red-500 ring-2 ring-red-200' : 'border-blue-200'}`}
                                                />
                                            </div>

                                            {/* 規格內容列表 (支援多筆) */}
                                            {currentVariations.map((v, idx) => (
                                                <div key={v.id || idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pb-4 border-b border-blue-100 last:border-0 last:pb-0">
                                                    {/* 圖片上傳 */}
                                                    <div className="md:col-span-1 h-[58px]">
                                                        <div className="relative aspect-square h-full bg-white border border-blue-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group hover:border-blue-400 transition-colors">
                                                            {v.image ? (
                                                                <>
                                                                    <img src={v.image} alt="Spec" className="w-full h-full object-cover" />
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); updateVariation(activeIndex, idx, 'image', ''); }}
                                                                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <label className="w-full h-full flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                                                                    <span className="text-xl text-blue-300">+</span>
                                                                    <input type="file" className="hidden" onChange={(e) => handleSpecImageUpload(activeIndex, idx, e.target.files[0])} />
                                                                </label>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* 規格內容 */}
                                                    <div className="md:col-span-5 flex flex-col gap-2">
                                                        <label className="text-[0.8rem] font-bold text-blue-800 uppercase tracking-widest">規格內容 {idx + 1} <span className="text-red-500">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={v.value}
                                                            onChange={(e) => updateVariation(activeIndex, idx, 'value', e.target.value)}
                                                            className={`w-full h-[58px] bg-white border rounded-xl p-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[activeIndex]?.variations && errors[activeIndex].variations[`var_${idx}_value`] ? 'border-red-500 ring-2 ring-red-200' : 'border-blue-200'}`}
                                                        />
                                                    </div>

                                                    {/* 售價 */}
                                                    <div className="md:col-span-3 flex flex-col gap-2">
                                                        <label className="text-[0.8rem] font-bold text-blue-800 uppercase tracking-widest">售價 <span className="text-red-500">*</span></label>
                                                        <input
                                                            type="number"
                                                            value={v.price}
                                                            onChange={(e) => updateVariation(activeIndex, idx, 'price', e.target.value)}
                                                            className={`w-full h-[58px] bg-white border rounded-xl p-4 text-lg font-bold text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[activeIndex]?.variations && errors[activeIndex].variations[`var_${idx}_price`] ? 'border-red-500 ring-2 ring-red-200' : 'border-blue-200'}`}
                                                            placeholder="0"
                                                        />
                                                    </div>

                                                    {/* 庫存 */}
                                                    <div className="md:col-span-2 flex flex-col gap-2">
                                                        <label className="text-[0.8rem] font-bold text-blue-800 uppercase tracking-widest">庫存量 <span className="text-red-500">*</span></label>
                                                        <input
                                                            type="number"
                                                            value={v.stock}
                                                            onChange={(e) => updateVariation(activeIndex, idx, 'stock', e.target.value)}
                                                            className={`w-full h-[58px] bg-white border rounded-xl p-4 text-lg font-bold text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[activeIndex]?.variations && errors[activeIndex].variations[`var_${idx}_stock`] ? 'border-red-500 ring-2 ring-red-200' : 'border-blue-200'}`}
                                                            placeholder="0"
                                                        />
                                                    </div>

                                                    {/* 刪除按鈕 */}
                                                    <div className="md:col-span-1 h-[58px] flex items-center justify-center">
                                                        {currentVariations.length > 1 && (
                                                            <button
                                                                onClick={() => removeVariation(activeIndex, idx)}
                                                                className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
                                                                title="刪除此規格"
                                                            >
                                                                ✕
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* 新增按鈕 */}
                                            <button
                                                onClick={() => addVariation(activeIndex)}
                                                className="w-full py-3 bg-white border-2 border-dashed border-blue-300 text-blue-500 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all font-bold flex items-center justify-center gap-2"
                                            >
                                                <span className="text-xl">+</span> 新增規格內容
                                            </button>
                                        </div>
                                    )}

                                    {/* 一般售價/庫存區塊 - 僅在非單規格模式下顯示 */}
                                    {currentProduct.specType !== 'single' && (
                                        <div className={`md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl border shadow-sm ${currentProduct.specType === 'none'
                                            ? 'bg-blue-50 border-blue-100'
                                            : 'bg-white border-gray-200'
                                            }`}>
                                            <div className="flex flex-col gap-2">
                                                <label className={`text-[0.9rem] font-bold uppercase tracking-widest ${currentProduct.specType === 'none' ? 'text-blue-800' : 'text-blue-600'}`}>售價 <span className="text-red-500">*</span></label>
                                                <input
                                                    type="number"
                                                    value={currentProduct.price}
                                                    onChange={(e) => updateProductData(activeIndex, 'price', e.target.value)}
                                                    className={`rounded-xl placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500 ${currentProduct.specType === 'none'
                                                        ? `bg-white border p-4 text-lg font-bold text-gray-900 h-[58px] focus:border-blue-500 ${errors[activeIndex]?.price ? 'border-red-500 ring-2 ring-red-200' : 'border-blue-200'}`
                                                        : `bg-gray-50 border p-5 text-2xl font-black text-gray-900 focus:bg-white ${errors[activeIndex]?.price ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`
                                                        }`}
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className={`text-[0.9rem] font-bold uppercase tracking-widest ${currentProduct.specType === 'none' ? 'text-blue-800' : 'text-blue-600'}`}>庫存量 <span className="text-red-500">*</span></label>
                                                <input
                                                    type="number"
                                                    value={currentProduct.stock}
                                                    onChange={(e) => updateProductData(activeIndex, 'stock', e.target.value)}
                                                    className={`rounded-xl placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500 ${currentProduct.specType === 'none'
                                                        ? `bg-white border p-4 text-lg font-bold text-gray-900 h-[58px] focus:border-blue-500 ${errors[activeIndex]?.stock ? 'border-red-500 ring-2 ring-red-200' : 'border-blue-200'}`
                                                        : `bg-gray-50 border p-5 text-2xl font-black text-gray-900 focus:bg-white ${errors[activeIndex]?.stock ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`
                                                        }`}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* New Field Here */}
                                    <div className="md:col-span-6 flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[0.9rem] font-bold text-gray-500 uppercase">商品其他資訊</label>
                                            <button
                                                onClick={() => handleInsertTemplate(activeIndex)}
                                                className="text-[0.9rem] bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-2 py-1 rounded transition-colors font-bold"
                                            >
                                                帶入模板
                                            </button>
                                        </div>
                                        <textarea
                                            value={currentProduct.otherInfo || ''}
                                            onChange={(e) => updateProductData(activeIndex, 'otherInfo', e.target.value)}
                                            className="w-full h-60 bg-white border border-gray-200 rounded-xl p-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium shadow-sm resize-none"
                                            placeholder="請輸入其他備註或資訊..."
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 配送設定 */}
                            <section>
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">物流與配送設定</h3>
                                    <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                </div>

                                <div className="space-y-8 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm">
                                    <div className="flex flex-col md:flex-row gap-12">
                                        <div className="flex-1 space-y-6">
                                            <p className="text-sm font-bold text-gray-600">計算方式</p>
                                            <div className="space-y-3">
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="radio" checked={currentProduct.shippingMethod === 'size'} onChange={() => updateProductData(activeIndex, 'shippingMethod', 'size')} className="w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300" />
                                                    <span className={`text-sm font-semibold transition-colors ${currentProduct.shippingMethod === 'size' ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'}`}>以外箱尺寸計算</span>
                                                </label>
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="radio" checked={currentProduct.shippingMethod === 'grade'} onChange={() => updateProductData(activeIndex, 'shippingMethod', 'grade')} className="w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300" />
                                                    <span className={`text-sm font-semibold transition-colors ${currentProduct.shippingMethod === 'grade' ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'}`}>以材積級距計算</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex-[2] bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            {currentProduct.shippingMethod === 'size' ? (
                                                <div className="flex flex-col gap-4">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-[10px] font-bold text-gray-500">外箱長 (cm) <span className="text-red-500">*</span></label>
                                                            <input type="number" value={currentProduct.shipL} onChange={(e) => updateProductData(activeIndex, 'shipL', e.target.value)} className={`bg-white border rounded-lg p-3 text-center text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 ${errors[activeIndex]?.shipL ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-[10px] font-bold text-gray-500">外箱寬 (cm) <span className="text-red-500">*</span></label>
                                                            <input type="number" value={currentProduct.shipW} onChange={(e) => updateProductData(activeIndex, 'shipW', e.target.value)} className={`bg-white border rounded-lg p-3 text-center text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 ${errors[activeIndex]?.shipW ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-[10px] font-bold text-gray-500">外箱高 (cm) <span className="text-red-500">*</span></label>
                                                            <input type="number" value={currentProduct.shipH} onChange={(e) => updateProductData(activeIndex, 'shipH', e.target.value)} className={`bg-white border rounded-lg p-3 text-center text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 ${errors[activeIndex]?.shipH ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                                        <button onClick={() => handleSetPresetSize('14', '14', '14', '迷你箱')} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[0.8rem] font-bold rounded border border-gray-200 transition-colors">迷你箱 14*14*14</button>
                                                        <button onClick={() => handleSetPresetSize('20', '20', '17', '小箱')} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[0.8rem] font-bold rounded border border-gray-200 transition-colors">小箱 20*20*17</button>
                                                        <button onClick={() => handleSetPresetSize('20', '20', '28', '瘦箱')} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[0.8rem] font-bold rounded border border-gray-200 transition-colors">瘦箱 20*20*28</button>
                                                        <button onClick={() => handleSetPresetSize('22', '22', '28', '胖箱')} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[0.8rem] font-bold rounded border border-gray-200 transition-colors">胖箱 22*22*28</button>
                                                        <button onClick={() => handleSetPresetSize('30', '30', '30', '大箱')} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[0.8rem] font-bold rounded border border-gray-200 transition-colors">大箱 30*30*30</button>
                                                        <button onClick={() => handleSetPresetSize('32', '53', '26', '水果箱')} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[0.8rem] font-bold rounded border border-gray-200 transition-colors">水果箱 32*53*26</button>
                                                    </div>

                                                    <button
                                                        onClick={handleCopyDimensions}
                                                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[0.8rem] font-bold rounded border border-gray-200 transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <span className="text-lg">↑</span> 依照商品尺寸
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap gap-3">
                                                    {['S60', 'S90', 'S105', 'S120', 'S150', 'S151'].map(grade => (
                                                        <button
                                                            key={grade}
                                                            onClick={() => updateProductData(activeIndex, 'shipGrade', grade)}
                                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${currentProduct.shipGrade === grade ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                                        >
                                                            {grade}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-8 pt-8 border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                            <div className="space-y-4">
                                                <p className="text-sm font-bold text-gray-600">配送溫層 <span className="text-red-500">*</span></p>
                                                <div className="flex gap-4">
                                                    {['normal', 'chilled', 'frozen'].map(v => (
                                                        <button key={v} onClick={() => updateProductData(activeIndex, 'tempLayer', v)} className={`px-5 py-2.5 rounded-xl text-xs font-bold border ${currentProduct.tempLayer === v ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                                            {v === 'normal' ? '常溫' : v === 'chilled' ? '冷藏' : '冷凍'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-sm font-bold text-gray-600">配送方式 <span className="text-red-500">*</span></p>
                                                <div className="flex flex-wrap gap-6">
                                                    {[
                                                        { value: 'convenience', label: '超商' },
                                                        { value: 'thirdparty', label: '甲指(第三方)' }
                                                    ].map((option) => {
                                                        const isChecked = (currentProduct.shipMethods || []).includes(option.value);

                                                        return (
                                                            <div key={option.value} className="flex flex-col">
                                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isChecked}
                                                                        onChange={(e) => {
                                                                            const prev = currentProduct.shipMethods || [];
                                                                            const next = e.target.checked
                                                                                ? [...prev, option.value]
                                                                                : prev.filter(v => v !== option.value);
                                                                            updateProductData(activeIndex, 'shipMethods', next);
                                                                        }}
                                                                        className="w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                                    />
                                                                    <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-800'}`}>
                                                                        {option.label}
                                                                    </span>
                                                                </label>
                                                                {option.value === 'custom' && (
                                                                    <span className="text-[0.8rem] text-gray-400 pl-8 mt-1 font-mono">
                                                                        運費285元
                                                                    </span>
                                                                )}
                                                                {option.value === 'thirdparty' && (
                                                                    <span className="text-[0.8rem] text-gray-400 pl-8 mt-1 font-mono">
                                                                        000001 台南市台南市永康區中正南路127號
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-sm font-bold text-gray-600">免運優惠</p>
                                                <button
                                                    onClick={() => updateProductData(activeIndex, 'isFreeShipping', currentProduct.isFreeShipping === 'yes' ? 'no' : 'yes')}
                                                    className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all ${currentProduct.isFreeShipping === 'yes' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                                >
                                                    {currentProduct.isFreeShipping === 'yes' ? '已開啟免運設定' : '尚未開啟免運'}
                                                </button>
                                                {currentProduct.isFreeShipping === 'yes' && (
                                                    <p className="text-xs text-red-500 font-bold mt-2 text-center animate-pulse">此商品運費由商店全額負擔</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 商品特色與描述 (補回) */}
                            <section>
                                <div className="mb-8 flex justify-between items-end">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">商品特色與描述 <span className="text-red-500">*</span></h3>
                                        <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <button
                                        onClick={() => handleInsertFeatureTemplate(activeIndex)}
                                        className="text-[0.9rem] bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-2 py-1 rounded transition-colors font-bold"
                                    >
                                        帶入模板
                                    </button>
                                </div>
                                <textarea
                                    value={currentProduct.specialFeatures}
                                    onChange={(e) => updateProductData(activeIndex, 'specialFeatures', e.target.value)}
                                    placeholder="輸入商品的亮點、材質說明、特殊保固或是適合的送禮場合..."
                                    className={`w-full h-64 bg-white border rounded-3xl p-8 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all leading-relaxed shadow-sm resize-none ${errors[activeIndex]?.specialFeatures ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`}
                                />
                            </section>

                            {/* 商店分類 (補回) */}
                            <section>
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">商店分類</h3>
                                        <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <input
                                        type="text"
                                        value={shopSearchTerm}
                                        onChange={(e) => setShopSearchTerm(e.target.value)}
                                        placeholder="搜尋分類名稱或代碼..."
                                        className="bg-white border border-gray-200 rounded-full px-6 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 w-72 shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-6 custom-scrollbar p-1">
                                    {filteredShopCategories.length > 0 ? (
                                        filteredShopCategories.map((item) => {
                                            const isChecked = (currentProduct.shopCategories || []).includes(item.code);
                                            return (
                                                <label
                                                    key={item.code}
                                                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${isChecked ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                                const prev = currentProduct.shopCategories || [];
                                                                const next = e.target.checked ? [...prev, item.code] : prev.filter(v => v !== item.code);
                                                                updateProductData(activeIndex, 'shopCategories', next);
                                                            }}
                                                            className="w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300"
                                                        />
                                                        <span className={`text-sm font-bold ${isChecked ? 'text-blue-900' : 'text-gray-700'}`}>{item.name}</span>
                                                    </div>
                                                    <span className={`text-[10px] font-mono ${isChecked ? 'text-blue-500' : 'text-gray-400'}`}>{item.code}</span>
                                                </label>
                                            );
                                        })
                                    ) : (
                                        <div className="col-span-full py-10 text-center text-gray-500 italic">找不到對應的分類</div>
                                    )}
                                </div>
                            </section>

                            {/* 輸出設定 */}
                            <section>
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">輸出設定</h3>
                                    <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={leaveMColumnEmpty}
                                            onChange={(e) => setLeaveMColumnEmpty(e.target.checked)}
                                            className="w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-bold text-gray-700">M欄留空</span>
                                    </label>
                                    <p className="text-xs text-gray-400 mt-2 ml-8">
                                        若勾選，匯出 Excel 時 M 欄位將保持空白；若取消勾選，則填入 "否"。
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div >
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-900 p-20">
                        <div className="text-[120px] font-black tracking-tighter opacity-[0.03] select-none uppercase mb-12 text-gray-900">momo助手</div>
                        <div className="max-w-md text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">歡迎使用上架助手</h3>
                            <p className="text-gray-600 leading-relaxed mb-8">請從左側選單選擇現有商品進行編輯，或點擊「新增商品」開始建立全新的上架資料。</p>
                            <button onClick={handleAddProduct} className="px-10 py-3 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all font-bold">立即開始</button>
                        </div>
                    </div>
                )
                }

                {/* 變數說明彈窗 */}
                {
                    showVariableModal && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                            onClick={() => setShowVariableModal(false)}
                        >
                            <div
                                className="bg-white rounded-2xl shadow-2xl max-w-md w-full flex flex-col overflow-hidden animate-fade-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h3 className="text-lg font-bold text-gray-800">可用變數說明</h3>
                                    <button
                                        onClick={() => setShowVariableModal(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-sm text-gray-500 mb-4">
                                        在「商品完整名稱」、「商品特色與描述」及「商品其他資訊」欄位中輸入以下代碼，系統將在一鍵打包時自動替換為商品實際數值：
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-bold w-20 text-center">[編號]</code>
                                            <span className="text-sm text-gray-700">自動帶入自訂編號</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-bold w-20 text-center">[長]</code>
                                            <span className="text-sm text-gray-700">自動帶入商品長度</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-bold w-20 text-center">[寬]</code>
                                            <span className="text-sm text-gray-700">自動帶入商品寬度</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-bold w-20 text-center">[高]</code>
                                            <span className="text-sm text-gray-700">自動帶入商品高度</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-bold w-20 text-center">[淨重]</code>
                                            <span className="text-sm text-gray-700">自動帶入商品淨重 (含單位)</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-bold w-20 text-center">[洞深]</code>
                                            <span className="text-sm text-gray-700">自動帶入洞深</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-bold w-20 text-center">[庫存量]</code>
                                            <span className="text-sm text-gray-700">自動帶入庫存數量</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-gray-100 bg-gray-50 text-right">
                                    <button
                                        onClick={() => setShowVariableModal(false)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        我知道了
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* 打包結果彈窗 */}
                {
                    showPackResultModal && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                            onClick={() => setShowPackResultModal(false)}
                        >
                            <div
                                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden animate-fade-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h3 className="text-xl font-bold text-gray-800">商品其他資訊列表</h3>
                                    <button
                                        onClick={() => setShowPackResultModal(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                    {packResultInfo.length > 0 ? (
                                        packResultInfo.map((item, index) => (
                                            <div key={`${item.id}-${index}`} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">ID: {item.id}</span>
                                                    <button
                                                        onClick={() => copyToClipboard(item.info)}
                                                        className="text-xs bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-bold shadow-sm transition-all active:scale-95"
                                                    >
                                                        複製內容
                                                    </button>
                                                </div>
                                                <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded-lg border border-gray-100 min-h-[60px]">
                                                    {item.info || <span className="text-gray-300 italic">無內容</span>}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-gray-400">無資料</div>
                                    )}
                                </div>

                                <div className="p-4 border-t border-gray-100 bg-gray-50 text-right">
                                    <button
                                        onClick={() => setShowPackResultModal(false)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        關閉
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* 變數選擇器彈窗 */}
                {
                    showVariablePicker && (
                        <div
                            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                            onClick={() => setShowVariablePicker(false)}
                        >
                            <div
                                className="bg-white rounded-xl shadow-2xl max-w-sm w-full flex flex-col overflow-hidden animate-fade-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h3 className="text-lg font-bold text-gray-800">選擇變數插入</h3>
                                    <button
                                        onClick={() => setShowVariablePicker(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-3">
                                    {[
                                        { label: '[編號]', desc: '自訂編號' },
                                        { label: '[淨重]', desc: '商品淨重' },
                                        { label: '[長]', desc: '商品長度' },
                                        { label: '[寬]', desc: '商品寬度' },
                                        { label: '[高]', desc: '商品高度' },
                                        { label: '[洞深]', desc: '洞深' },
                                        { label: '[庫存量]', desc: '庫存數量' }
                                    ].map((v) => (
                                        <button
                                            key={v.label}
                                            onClick={() => {
                                                insertTextAtCursor(activeInputId, v.label, activeField);
                                                setShowVariablePicker(false);
                                            }}
                                            className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all gap-1 group"
                                        >
                                            <span className="font-bold text-sm group-hover:text-blue-700">{v.label}</span>
                                            <span className="text-[10px] text-gray-400 group-hover:text-blue-400">{v.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* 提示訊息 */}
                {
                    showToast && (
                        <div className={`fixed z-50 bg-gray-800 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-sm ${showToast.includes('錯誤') ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'bottom-12 right-12 animate-bounce'}`}>
                            {showToast}
                        </div>
                    )
                }
            </main >

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
        </div >
    );
}
