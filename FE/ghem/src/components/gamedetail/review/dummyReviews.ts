type ReviewProps = {
  reply: {
    id?: string,
    profileImageURL?: string,
    name: string,
    date: string,
    isRecomm: boolean,
    content: string,
    helpfulCount: number,
  }
}

class Review {
  constructor(public name: string, public date: string, public isRecomm: boolean, public helpfulCount: number, public content: string) {
    this.name = name;
    this.date = date;
    this.isRecomm = isRecomm;
    this.helpfulCount = helpfulCount;
    this.content = content;
  }
}

export const dummyReviews = [
  new Review("티코", "20221022", true, 35, "헤는 토끼, 지나고 헤일 파란 오면 아스라히 자랑처럼 동경과 버리었습니다. 비둘기, 차 북간도에 밤을 나는 이국 하나에 별 버리었습니다. 남은 이국 딴은 지나가는 묻힌 있습니다. 사랑과 이름과, 마리아 밤을 이 까닭입니다."),
  new Review("윤동주", "20231022", false, 0, "별 다 오면 흙으로 까닭입니다. 하나의 별이 어머님, 프랑시스 오면 패, 버리었습니다. 어머님, 별 많은 무엇인지 어머니 가을로 계십니다. 둘 때 내일 덮어 하나에 묻힌 별 딴은 봅니다."),
  new Review("머스크", "20211022", true, 1, "어머니, 이런 지나가는 자랑처럼 가을로 묻힌 까닭입니다. 옥 위에도 사람들의 소학교 이웃 아무 속의 하나의 까닭입니다."),
  new Review("조 바이든", "20231022", true, 13, "봄이 나는 별 옥 불러 하나에 동경과 이웃 계십니다. 까닭이요, 노새, 다 애기 당신은 묻힌 계십니다. 불러 어머니, 별 노루, 않은 새워 오는 풀이 듯합니다. 하나의 동경과 경, 덮어 속의 하나에 아이들의 봅니다."),
  new Review("에이스", "23231022", false, 72, "봄이 마리아 다 많은 있습니다. 별빛이 밤이 이네들은 별 거외다."),
  new Review("트럼프", "20031022", false, 5, ""),
  new Review("잭슨", "20101022", true, 999, "나의 멀리 언덕 같이 듯합니다. 어머님, 된 위에 버리었습니다. 불러 언덕 보고, 헤일 가을로 책상을 별을 듯합니다. 나는 잠, 했던 쉬이 동경과 프랑시스 이름과 하나의 버리었습니다."),
  new Review("김정은", "20230322", false, 1, "새겨지는 많은 써 있습니다. 하나에 이름을 밤이 했던 별 가을 멀리 때 잠, 계십니다."),
  new Review("빈라덴", "20230301", true, 0, "마리아 묻힌 내 하나에 나는 내 무덤 봅니다. 이런 멀리 가을로 이름자 노루, 말 그리고 시와 있습니다. 하나에 이름을 애기 부끄러운 북간도에 하늘에는 까닭입니다. 북간도에 마디씩 당신은 어머니, 피어나듯이 있습니다.")
]