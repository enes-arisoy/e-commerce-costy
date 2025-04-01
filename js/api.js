const fetchProducts = async () => {
    try {
        //API a istek atmak
    const res = await fetch("../db.json");

    // gelen veriyi js nesnesine dönüştürmek
    const data = await res.json();

    //fonksiyon çağırıldığında veriyi return etmek
    return(data);

    } catch (error) {
        alert(`Error: ${error}`);

        // eğer hata varsa boş dizi döndürmek

        return [];
    };
};

export default fetchProducts;