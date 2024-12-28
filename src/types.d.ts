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
  product: {
    id: string,
    name: string,
    barcode: string,
    description?: string,
    prize?: number,
    profitMargin?: number,
    min_stock?: number,
    current_stock?: number, 
    category_name?: string,
    provider_name?: string,
    image?: string,
    is_active?: boolean,
    created_at?: Date,
    updated_at?: Date
  };
}

