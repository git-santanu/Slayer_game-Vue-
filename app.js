const randomValue = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            countRound: 0,
            winner : null
        }
    },
    computed: {
        monsterHealth() {
            return { width: this.monsterHealth + '%' };
        },
        playerHealth() {
            return { width: this.playerHealth + '%' };
        },
        mayUserAttack() {
            return this.countRound % 3 !== 0;
        }
    },
    watch:{
        monsterHealth(value){
        if(value<=0 && this.playerHealth<=0){
            this.winner = 'Draw';
        }else if(value<=0){
        this.winner = 'monster';
        }
        },
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                this.winner = 'Draw';
            }else if(value<=0){
            this.winner = 'player';
            }
        }
    },
    methods: {
        attckMonster() {
            const attackValue = randomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attckPlayer();
        },
        attckPlayer() {
            const attackValue = randomValue(8, 12);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {
            this.countRound++;
            const attackValue = randomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attckPlayer();
        },
        healvalue() {
            this.countRound++;
            const healvalue = randomValue(8, 20);
            if (this.playerHealth + healvalue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healvalue;
            }
            this.attckPlayer();
        }
    }
});
app.mount('#game');