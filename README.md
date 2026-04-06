# 10th_Node.js


### Git 작업 순서

본인의 브랜치에서만 작업하고, `main` 브랜치는 직접 수정하지 않습니다.

#### 1. 현재 브랜치 확인
```sh
git branch
```

#### 2. 변경 사항 확인
```sh
git status
```

#### 3. 변경된 파일 추가
```sh
git add .
```

#### 4. 커밋 메시지 작성
```sh
git commit-m "Commit Message"
```

#### 5. 원격 저장소에 본인 브랜치로 푸시
```sh
git push origin <브랜치명>
```

### Commit Convention

커밋 메시지는 `타입: n주차 미션 설명 #이슈넘버`의 형식을 갖추어 작성합니다.

| 타입      | 설명                           |
|-----------|--------------------------------|
| feat      | 새로운 기능 추가               |
| fix       | 버그 수정                      |
| refactor  | 코드 리팩토링                  |
| docs      | 문서 수정 (README 등)          |
| style     | 코드 스타일 변경 (세미콜론 추가 등)|
| chore     | 빌드 및 패키지 설정 변경       |
| test      | 테스트 코드 추가               |

#### Commit Example
```sh
git commit -m "feat: 4주차 미션 엔터티 작성 #1"
git commit -m "fix: 5주차 미션 연관관계 수정 #2"
```

### Branch Naming Convention

브랜치는 `닉네임/weekN` 형식으로 생성합니다.

| 규칙 | 설명 | 예시 |
| --- | --- | --- |
| 닉네임 | GitHub 닉네임 또는 팀 내 별칭 사용 | `naru`, `leeseo` |
| weekN | 미션 주차 번호 (`N`은 숫자) | `week1`, `week4` |
| 구분자 | 슬래시(`/`)로 닉네임과 주차 구분 | `naru/week4` |

#### Commit Example
- `wony/week4` -> 워니의 4주차 미션 브랜치

### PR Convention

- Pull Request(PR)은 미션 별로 생성합니다.
- PR 제목은 `n주차 미션 [닉네임]` 형식으로 작성합니다.
- 스터디원끼리 승인한 후, main 브랜치로 Merge 합니다.

#### PR Example
- 1주차 미션 [워니]
