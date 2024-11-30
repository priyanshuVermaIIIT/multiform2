function imageToBase64(imageFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      // Triggered when the file is successfully read
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString()); // Base64 string
        } else {
          reject("Failed to convert image to Base64");
        }
      };
  
      // Triggered on error
      reader.onerror = (error) => {
        reject(error);
      };
  
      // Start reading the file as a Data URL (Base64 string)
      reader.readAsDataURL(imageFile);
    });
  }