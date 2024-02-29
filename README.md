### Github address
https://github.com/Kwak-JunYoung/h2

<br>

# 필수 요구 사항

1. API는 jsonplaceholder의 user, album과 photo 사용해야 함. useEffect와 fetch(axios)를 정확히 사용하여 만드세요.
    - Clean-up 함수 작성(abort)하여 네트워크 통신을 취소시킬 수 있도록 하세요!

2. 로그인된 사용자는 useContext와 useReducer를 사용하여 작성하세요.
    - 로컬스토리지에 저장하여 로그인 사용자를 지속시키세요.

3. 앨범 목록은 현재 로그인된 User의 앨범들이며, 이 앨범들을 대상으로 앨범 선택 후 '앨범 상세보기' 클릭시 선택된 앨범의 상세(사진보기) 화면으로 이동. (앨범은 하나만 선택)

4. 페이지 전환은 react-router-dom 사용
    - 상세(사진보기)화면에서 목록으로 다시 돌아왔을 떄, 이전과 동일하게 보여야 함
        - history.back 사용 금지

5. 상세(사진보기)화면에서는 사진의 thumbnailUrl에 해당하는 이미지로 보여주세요.
    - <u>새로고침 했을 때, 해당 앨범의 이미지를 그대로 다시 보여주세요.</u>

6. 간결하고 심플하게 코딩하여 가독성 좋은 코드를 작성하세요.

7. UI디자인 보다는 기능(UX) 완성에 집중하고 버그가 없도록 작성하세요.

8. 프로젝트 생성은 CRA 또는 Vite 등 자유롭게 선택해주세요. (StrictMode는 기본설정 그대로 켜두세요)

9. Node_modules 폴더만 제외하고 프로젝트(소스코드 + 설정) 전체 압축하여 제출.
    - 소스코드는 Github에 repository URL도 제출하세요. 압축 파일명은 본인 이름으로 해주세요.
    - 압축 해제하고 'npm i'과 'yarn dev(또는 npm run dev) start'만 하면 실행 가능하도록!

<br>

## 평가 문제 제출 안내
평가 문제 풀이의 보안을 위해 github repository 링크 제출은 제외합니다.<br>
보안을 위해 github에 올릴 경우 private으로 올려주세요.<br>
즉, 소스 코드(node_modules 폴더 제외) 압축파일만 하나로 제출해주시면 됩니다.