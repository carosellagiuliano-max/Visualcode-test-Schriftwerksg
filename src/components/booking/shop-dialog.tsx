import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';
import { products } from '@/data/products';

interface ShopDialogProps {
  children: React.ReactNode;
}

const ShopDialog = ({ children }: ShopDialogProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any, category: string) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: category
    });
    toast.success(`${product.name} wurde zum Warenkorb hinzugefügt`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-foreground flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Shop - Unsere Produkte
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Hochwertige Trinity Haircare Produkte für die perfekte Haarpflege zu Hause
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {products.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                {category.category}
              </h3>
              <div className="grid gap-4">
                {category.items.map((product, productIndex) => (
                  <Card key={productIndex} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-md border border-border"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base font-medium text-foreground">
                              {product.name}
                            </CardTitle>
                            <Badge variant="secondary" className="text-sm ml-2 flex-shrink-0">
                              {product.price}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <CardDescription className="text-muted-foreground text-sm">
                              {product.detailedDescription}
                            </CardDescription>
                            <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                              <strong>Anwendung:</strong> {product.usage}
                            </div>
                          </div>
                          <Button
                            onClick={() => handleAddToCart(product, category.category)}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            In den Warenkorb
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Alle Produkte können direkt im Salon erworben oder per WhatsApp bestellt werden.
            Gerne beraten wir Sie persönlich über die passenden Produkte für Ihr Haar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopDialog;