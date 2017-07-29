'use strict';
//let cite= require('../test/fixtures');//从外部引入文件,这个在html里有文件的

function  printReceipt(tags)
{
  let  arr=computePrice(buildItem(tags));
  console.log(buildPriceList(arr));
}

function buildItem(tags)
{     let arr=[];//计数数组
      let listarr=[];//返回的列表数组
      let num=0;
      //let listBasic=cite.loadAllItems();
      let listBasic=loadAllItems();
      for (let i in listBasic)//先给计数数组初值为0
      {
        arr[i]=0;
      }
      for (let i in tags)
      {
          for(let j in listBasic)
          {
              if(tags[i]===listBasic[j].barcode)
              {
                arr[j]++;
              }
              if(tags[i][10]==='-')
              {
                if(tags[i].substring(0,10)===listBasic[j].barcode)
                {
                  let a=tags[i].substring(11,tags[i].length);
                  arr[j]=arr[j]+parseFloat(a);
                }
              }
          }
      }
      for(let i in arr)
      {
        if(arr[i]!=0)
        {
          listarr[num]={};
          listarr[num].name=listBasic[i].name;
          listarr[num].num=arr[i];
          listarr[num].price=listBasic[i].price;
          listarr[num].unit=listBasic[i].unit;
          listarr[num].sum=listBasic[i].price*arr[i];
          listarr[num].barcode=listBasic[i].barcode;
          num++;
        }
      }
      return listarr;
}
function computePrice(listarr)
{   let save=0;//节省的价格
    let summary1=0;//总计价格
    //let bargain=cite.loadPromotions();
      let bargain=loadPromotions();
      for(let i in listarr)
      {
        for(let j in bargain[0].barcodes)
        {
          if(listarr[i].barcode===bargain[0].barcodes[j])
          {
            let num=parseInt(listarr[i].num/3);
            listarr[i].sum=listarr[i].sum-num*listarr[i].price;
            save=save+num*listarr[i].price;
          }
        }

      }
      for(let i in listarr )
      {
          summary1=summary1+listarr[i].sum;
      }
      listarr[listarr.length]=summary1;
      listarr[listarr.length]=save;
      var pricelist=listarr;
      return pricelist;
}
function buildPriceList(pricelist)
{
    let str="";
    for(let i=0;i<pricelist.length-2;i++)
    {
      str=str+`名称：${pricelist[i].name}，数量：${pricelist[i].num}${pricelist[i].unit}，单价：${pricelist[i].price.toFixed(2)}(元)，小计：${pricelist[i].sum.toFixed(2)}(元)\n`;
    }
    str="***<没钱赚商店>收据***\n"+str;
    str=str+"----------------------\n"+`总计：${pricelist[pricelist.length-2].toFixed(2)}(元)\n`+`节省：${pricelist[pricelist.length-1].toFixed(2)}(元)\n`+"**********************";
    return str;
}

//var ss=computePrice(buildItem(tags));
//console.log(buildPriceList(ss));
