import java.util.Arrays;
import java.util.Comparator;

public class EcommerceSearch{

    public static Product linearSearch(Product[] products,int targetId){
        for(Product product:products){
            if(product.productId==targetId){
                return product;
            }
        }
        return null;
    }

    public static Product binarySearch(Product[] products,int targetId){
        int low=0;
        int high=products.length-1;

        while(low<=high){
            int mid=(low+high)/2;

            if(products[mid].productId==targetId){
                return products[mid];
            }

            if(products[mid].productId<targetId){
                low=mid+1;
            }
            else{
                high=mid-1;
            }
        }
        return null;
    }

    public static void main(String[] args){

        Product[] products={
            new Product(101,"Laptop","Electronics"),
            new Product(105,"Mobile","Electronics"),
            new Product(103,"Shoes","Fashion"),
            new Product(104,"Watch","Accessories"),
            new Product(102,"Tablet","Electronics")
        };

        int searchId=104;

        Product result1=linearSearch(products,searchId);

        System.out.println("Linear Search Result:");
        if(result1!=null)
            System.out.println(result1);
        else
            System.out.println("Product Not Found");

        Arrays.sort(products,Comparator.comparingInt(p->p.productId));

        Product result2=binarySearch(products,searchId);

        System.out.println("\nBinary Search Result:");
        if(result2!=null)
            System.out.println(result2);
        else
            System.out.println("Product Not Found");
    }
}
