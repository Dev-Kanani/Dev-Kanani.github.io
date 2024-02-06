const co1 = document.querySelector('#comment_section_1')
const co2 = document.querySelector('#comment_section_2')

const li1 = document.querySelector('#likes_count_1')
const li2 = document.querySelector('#likes_count_2')

const bu1 = document.querySelector('#submit1')
const bu2 = document.querySelector('#submit2')

const bu3 = document.querySelector('#like-button_1')
const bu4 = document.querySelector('#like-button_2')

const tex1 = document.querySelector('#text1')
const tex2 = document.querySelector('#text2')

bu1.addEventListener('click', submit_1)
bu2.addEventListener('click', submit_2)

bu3.addEventListener('click', like_blog_1)
bu4.addEventListener('click', like_blog_2)

comment1 = []
comment2 = []


let likesCount1 = 16;
let likesCount2 = 7;

load_data()

let flag1 = 0;
let flag2 = 0;

function like_blog_1() {
    if (flag1 == 0) {
        likesCount1++;
        flag1 = 1;
        updateLikesCount(likesCount1, li1);
        save_Local_1();
    }
}

function like_blog_2() {
    if (flag2 == 0) {
        likesCount2++;
        flag2 = 1;
        updateLikesCount(likesCount2, li2);
        save_Local_2();
    }
}

function updateLikesCount(likes, element) {
    const span = element.querySelector('span');
    if (span) {
        span.textContent = likes;
    }
}

function submit_1() {
    const comment_form = tex1.value

    if (comment_form !== '') {
        new_comment = {
            "userComment": comment_form
        }

        comment1.push(new_comment)

        clear_text_1()

        addComment_1(new_comment)

        save_Local_1();
    }

}

function submit_2(e) {
    const comment_form = tex2.value

    if (comment_form !== '') {
        new_comment = {
            "userComment": comment_form
        }

        comment2.push(new_comment)

        clear_text_2()

        addComment_2(new_comment)

        save_Local_2();
    }

    e.preventDefault()
}


function clear_text_1() {
    tex1.value = ''
}

function clear_text_2() {
    tex2.value = ''
}

function addComment_1(thing) {
    const div = document.createElement('div')

    div.classList = 'comment_1'

    div.innerHTML = `
        <p class="comment">
        ${thing.userComment}
        </p>
    `;

    co1.insertAdjacentElement('beforeend', div)
}

function addComment_2(thing) {
    const div = document.createElement('div')

    div.classList = 'comment_2'

    div.innerHTML = `
        <p class="comment">
        ${thing.userComment}
        </p>
    `;

    co2.insertAdjacentElement('beforeend', div)
}

function save_Local_1() {
    localStorage.setItem('comments1', JSON.stringify(comment1));
    localStorage.setItem('likes1', likesCount1);
}

function save_Local_2() {
    localStorage.setItem('comments2', JSON.stringify(comment2));
    localStorage.setItem('likes2', likesCount2);
}

function load_data() {
    const storedComments_1 = localStorage.getItem('comments1');
    const storedComments_2 = localStorage.getItem('comments2');

    const storedLikes_1 = localStorage.getItem('likes1');
    const storedLikes_2 = localStorage.getItem('likes2');

    if (storedComments_1) {
        comment1 = JSON.parse(storedComments_1)
        comment1.forEach(addComment_1)
    }

    if (storedComments_2) {
        comment2 = JSON.parse(storedComments_2)
        comment2.forEach(addComment_2)
    }

    if (storedLikes_1) {
        likesCount1 = parseInt(storedLikes_1);
        updateLikesCount(likesCount1, li1);
    }

    if (storedLikes_2) {
        likesCount2 = parseInt(storedLikes_2);
        updateLikesCount(likesCount2, li2);
    }

    li1.querySelector('span').textContent = likesCount1;
    li2.querySelector('span').textContent = likesCount2;
}

// localStorage.clear()


