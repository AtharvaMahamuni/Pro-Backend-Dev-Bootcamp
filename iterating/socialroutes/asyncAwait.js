one = () => {
    return "one";
}

two = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("two");
        }, 3000);
    })
   
}

three = () => {
    return "three";
}


callMe = async () => {
   oneC = one();
   console.log(oneC);

    twoC = await two();
    console.log(twoC);

    threeC = three();
    console.log(threeC);
}

callMe();