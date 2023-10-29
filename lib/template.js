exports.homePage = function (bookList) {
  var list = bookList.map((n) => `<li><a href="/book/${n}">${n}</a></li>`).join("");
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>도서 관리 시스템</title>
    </head>
    <body>
      <h1>도서 관리 시스템 홈페이지</h1>
      <a href="/book/add">도서 추가하기</a>
      <ul>
        ${list}
      </ul>
    </body>
  </html>
  `;
};

exports.bookInfoPage = function (title, description) {
  var info = description
    .split("\n")
    .map((line) => `<p>${line}</p>`)
    .join("");
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>도서 정보</title>
    </head>
    <body>
      <h1>${title}</h1>
      ${info}
      <a href="/">홈으로</a>
      <a href="/book/edit/${title}">수정하기</a>
    </body>
  </html>
  `;
};

exports.addPage = function () {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>도서 추가</title>
    </head>
    <body>
      <h1>도서 추가하기</h1>
      <form action="/book/add" method="post">
        <p><input type="text" name="title" placeholder="제목" /></p>
        <p><input type="text" name="author" placeholder="저자" /></p>
        <p><input type="text" name="publisher" placeholder="출판사" /></p>
        <p><input type="text" name="year" placeholder="출판년도" /></p>
        <p><input type="submit" /></p>
      </form>
    </body>
  </html>
  `;
};

exports.editPage = function (title, author, publisher, year) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>도서 정보 수정</title>
      <script>
        function deleteBook(event) {
          event.preventDefault();
          fetch('/book/delete/${title}', { method: 'POST' })
            .then(res => window.location.href = res.url);
        }
      </script>
    </head>
    <body>
      <h1>도서 정보 수정하기</h1>
      <form action="/book/edit" method="post">
        <input type="hidden" name="originalTitle" value="${title}" />
        <p><input type="text" name="title" value="${title}" /></p>
        <p><input type="text" name="author" value="${author}" /></p>
        <p><input type="text" name="publisher" value="${publisher}" /></p>
        <p><input type="text" name="year" value="${year}" /></p>
        <p><input type="submit" /></p>
      </form>
      <a href="/book/${title}">취소</a>
      <a href="/book/delete/${title}" onclick="deleteBook(event)">도서 삭제하기</a>
    </body>
  </html>
  `;
};
