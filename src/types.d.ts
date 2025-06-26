export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  BarcodeScanner: undefined;
  Product: {barcode: string};
  ProductsList: undefined;
  UpdatePrices: undefined;
  Alerts: undefined;
};
export type Mode = 'none' | 'edit' | 'create' | 'view';
declare interface HomeCardProps {
  userName: string;
  handleLogOut: () => void;
}
export type Filter = { [key: string]: string };
 
interface BarcodeScannerCardProps {
  isScanning: boolean; // Indica si el escáner está activo
  onBarcodeScanned: (barcode: string) => void; // Callback que se ejecuta cuando se escanea un código de barras
}

declare interface ProductCardProps {
  saveProduct: (product: Product) => void;
  barcode: string;
  onBack: () => void;
  product?: any;
}
declare interface ImageCardProps {
  productImage: string;
  onClose: () => void;
  onUpdateImage: (image: string) => void;
}
declare interface ProductNotFoundCardProps {
  onCreate: (product: any) => void;
}
declare interface ProductListItemProps {
  product: ProductCardProps;
}
declare interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
declare interface FilterProps {
  onApply: (filter: Record<string, string>) => void;
  onClose: () => void;
}
declare interface FilterTagProps {
  value: string;
  onDelete: (value) => void;
}
declare interface NewProviderProps {
  onCreate: (provider: any) => void;
  onBack: () => void;
}
declare interface SelectProviderProps {
  onSelect: (provider: any) => void;
  onBack: () => void;
}
declare interface ViewProductCardProps {
  product: any;
  onEdit: (product: any) => void;
  onBack: () => void;
}
declare interface UpdatePricesListCardProps {
  document: any;
  onUpdate: (document: any) => void;
  onBack: () => void;
  provider: any;
}