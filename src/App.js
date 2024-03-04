import React, { useState } from "react";
import axios from "axios"; 
import "./App.css";

function App() {
  // Стан для зберігання вибраних файлів та їх зображень
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  // Стан для зберігання результатів обробки
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);

  // Функція для обробки завантаження зображення
  const handleImageUpload = (event, setImage, setFile) => {
    setFile(event.target.files[0]); // Збереження вибраного файлу
    setImage(URL.createObjectURL(event.target.files[0])); // Створення URL для відображення зображення
  };

  // Функція для виконання обміну обличчями
  const handleFaceSwap = async () => {
    console.log("file1 - ", file1);
    console.log("file2 - ", file2);

    // Створення об'єкта FormData та додавання зображень
    const formData = new FormData();
    formData.append("images", file1);
    formData.append("images", file2);

    // Відправлення POST-запиту на сервер
    await axios
      .post("http://localhost:5000/upload", formData)
      .then((response) => {
        // Конвертація base64 в blob
        const blob1 = base64ToBlob(response.data.img1, "image/jpeg");
        const blob2 = base64ToBlob(response.data.img2, "image/jpeg");

        // Відображення blob в тегах img
        setResult1(URL.createObjectURL(blob1));
        setResult2(URL.createObjectURL(blob2));
      });
  };

  // Функція для конвертації base64 в blob
  const base64ToBlob = (base64, type) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    return new Blob([new Uint8Array(byteArrays)], { type });
  };

  return (
    <div className="App">
      <main>
        <div className="image-upload">
          <h2>Завантажте зображення</h2>
          <div className="MainblockUpload">
            <div className="blockUpload">
              {/* Поле для завантаження першого зображення */}
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  handleImageUpload(event, setImage1, setFile1)
                }
              />
              <label htmlFor="file">Виберіть файл</label>
              {/* Перегляд попереднього зображення */}
              {image1 && (
                <img
                  style={{ paddingTop: "10px" }}
                  className="uploadImage"
                  src={image1}
                  alt="Preview"
                />
              )}
            </div>
            <div className="blockUpload">
              {/* Поле для завантаження другого зображення */}
              <input
                id="file2"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  handleImageUpload(event, setImage2, setFile2)
                }
              />
              <label htmlFor="file2">Виберіть файл</label>
              {/* Перегляд попереднього зображення */}
              {image2 && (
                <img
                  style={{ paddingTop: "10px" }}
                  className="uploadImage"
                  src={image2}
                  alt="Preview"
                />
              )}
            </div>
          </div>
        </div>
        <div className="result">
          <h2>Результат</h2>
          {/* Кнопка для запуску обміну обличчями */}
          <button className="buttonSwap" onClick={handleFaceSwap}>
            Face Swap
          </button>
          <div className="MainblockResult">
            <div className="blockUpload">
              {/* Відображення першого результату */}
              {result1 && (
                <img
                  style={{ paddingTop: "10px" }}
                  className="resultImage"
                  src={result1}
                  alt="Result"
                />
              )}
            </div>
            <div className="blockUpload">
              {/* Відображення другого результату */}
              {result2 && (
                <img
                  style={{ paddingTop: "10px" }}
                  className="resultImage"
                  src={result2}
                  alt="Result"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
