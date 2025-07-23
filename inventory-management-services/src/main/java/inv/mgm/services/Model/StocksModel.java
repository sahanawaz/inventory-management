package inv.mgm.services.Model;

public class StocksModel {
    private String stockName;
    private String stockCode;
    private Double stockPrice;
    private Integer stockQuantity;
    private String stockCategory;
    private Double purchasePrice;
    private Double sellingPrice;
    private String color;
    private String dimension;

    public StocksModel(String stockName, String stockCode, Double stockPrice, Integer stockQuantity, String stockCategory, Double purchasePrice, Double sellingPrice, String color, String dimension) {
        this.stockName = stockName;
        this.stockCode = stockCode;
        this.stockPrice = stockPrice;
        this.stockQuantity = stockQuantity;
        this.stockCategory = stockCategory;
        this.purchasePrice = purchasePrice;
        this.sellingPrice = sellingPrice;
        this.color = color;
        this.dimension = dimension;
    }

    public StocksModel(){}

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public String getStockCode() {
        return stockCode;
    }

    public void setStockCode(String stockCode) {
        this.stockCode = stockCode;
    }

    public Double getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Double stockPrice) {
        this.stockPrice = stockPrice;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getStockCategory() {
        return stockCategory;
    }

    public void setStockCategory(String stockCategory) {
        this.stockCategory = stockCategory;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }
}
