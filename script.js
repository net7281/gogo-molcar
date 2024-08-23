let num = 1;
let posX, posY, velocityX, velocityY;
let speed ;


document.fonts.ready.then(() => {
    window.wallpaperPropertyListener = {
        applyUserProperties: function (properties) {
            if (properties.colorkey) {
                let color = properties.colorkey.value.split(' ');
                document.querySelector('.bg').style.backgroundColor = `rgb(${color[0] * 255} ${color[1] * 255} ${color[2] * 255})`;
            }
            if (properties.speedkey) {
                velocityX = Number(properties.speedkey.value)// Y축 이동 속도
                velocityY = Number(properties.speedkey.value)// Y축 이동 속도
            }
        }
    }

    const molcar = document.getElementById('molcar');
    posX = Math.random() * (window.innerWidth - molcar.offsetWidth);
    posY = Math.random() * (window.innerHeight - molcar.offsetHeight);


// walk img
    const work = setInterval(() => {
        num = num === 1 ? 2 : 1;
        document.getElementById('molcarImg').setAttribute('src', `img/teddy_${num}.png`);
    }, 200);

// 애니메이션
    const moveMolcar = setInterval(() => {
        posX += velocityX;
        posY += velocityY;

        // 이동 방향에 따라 회전 각도 계산
        const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI) - 90;

        // 화면 경계에 부딪힐 때 반사
        if (posX <= 0 || posX >= window.innerWidth - molcar.offsetWidth) {
            velocityX = -velocityX;
        }
        if (posY <= 0 || posY >= window.innerHeight - molcar.offsetHeight) {
            velocityY = -velocityY;
        }

        // 자동차를 회전하고 위치를 업데이트
        molcar.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;
    }, 20);


    const updateTime = () => {
        const now = new Date();

        // 현재 연도, 월, 일
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = now.getDate();

        // 현재 시, 분, 초
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // AM/PM 결정
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // hour가 0이면 12로 설정

        // DOM에 시간 표시
        document.getElementById('time').innerText = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
        document.getElementById('date').innerText = `${year}.${month}.${day}`;

    }
    updateTime()
    setInterval(updateTime,1000)

    work()
    moveMolcar();
})