interface IIndustryCode {
  code: string;
  name: string;
}

interface IListStockItem {
  id: string;
  name: string;
  code: string;
  image_url?: string;
  industry_code?: IIndustryCode;
}
