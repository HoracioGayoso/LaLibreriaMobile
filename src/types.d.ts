export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    BarcodeScanner: undefined;
    Producto: { barcode: string };
  };
declare interface HomeCardProps {
    userName: string;
    handleLogOut: () => void;
}
interface BarcodeScannerCardProps {
  isScanning: boolean; // Indica si el escáner está activo
  onBarcodeScanned: (barcode: string) => void; // Callback que se ejecuta cuando se escanea un código de barras
}

declare interface ProductCardProps {
  product: Product;
  editProduct: () => void;
}

declare interface EditProductCardProps {
  product: Product;
  saveProduct: (product: Product) => void;
  }
declare interface ImageCardProps {
  productImage: string;
  onClose: () => void;
  onUpdateImage: (image: string) => void;
}


