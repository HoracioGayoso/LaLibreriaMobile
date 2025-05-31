export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  BarcodeScanner: undefined;
  Product: {barcode: string};
  ProductsList: undefined
};
export type Mode = 'none' | 'edit' | 'create';
declare interface HomeCardProps {
  userName: string;
  handleLogOut: () => void;
}
interface BarcodeScannerCardProps {
  isScanning: boolean; // Indica si el escáner está activo
  onBarcodeScanned: (barcode: string) => void; // Callback que se ejecuta cuando se escanea un código de barras
}

declare interface ProductCardProps {
  saveProduct: (product: Product) => void;
  barcode: string;
  product?: Product;
}
declare interface ImageCardProps {
  productImage: string;
  onClose: () => void;
  onUpdateImage: (image: string) => void;
}
declare interface ProductNotFoundCardProps {
  onCreate: (product: Product) => void;
}
declare interface ProductListItemProps {
  product: ProductCardProps;
}
declare interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
