/* eslint-disable no-alert */

const auth = firebase.auth();
const firestore = firebase.firestore();
const reviewsCollection = firestore.collection('reviews');
const usersCollection = firestore.collection('users');

export const googleLogin = (event) => {
  event.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      alert('usuário logado');

      usersCollection.doc(user.email)
        .set({
          name: user.displayName,
          id: user.uid,
          photo: user.photoURL,
        }, { merge: true });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Essa conta já existe com uma credencial diferente');
      }
    });
};

export const signOut = () => {
  auth.signOut();
};

export const emailAndPasswordLogin = (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('usuário', user);
      alert('usuário logado!');
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        alert('Endereço de email não é válido');
      } else if (errorCode === 'auth/user-disabled.') {
        alert('O usuário correspondente ao e-mail fornecido foi desativado.');
      } else if (errorCode === 'auth/user-not-found') {
        alert('Não há nenhum usuário correspondente ao e-mail fornecido.');
      } else if (errorCode === 'auth/wrong-password') {
        alert('A senha é inválida para o e-mail fornecido ou a conta correspondente ao e-mail não tem uma senha definida.');
      } else {
        alert('Algo deu errado. Por favor, tente novamente.');
      }
    });
};

const saveInfoProfile = (userName) => {
  const userProfile = auth.currentUser;

  userProfile.updateProfile({
    displayName: userName,
    photoURL: '../img/default_user_icon.jpg',
  })
    .then(() => console.log('perfil atualizado'))
    .catch(() => console.log('não rolou'));
};

const saveUserInfo = (user, email, userName) => {
  usersCollection.doc(email)
    .set({
      name: userName,
      id: user.uid,
      photo: '../img/default_user_icon.jpg',
    }, { merge: true });

  alert('usuário salvo');
};

export const createAccount = (event) => {
  event.preventDefault();
  const userName = document.querySelector('#user-name').value;
  const email = document.querySelector('#sign-up-email').value;
  const password = document.querySelector('#sign-up-password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;

  if (password !== confirmPassword) {
    alert('A senha digitada está diferente em um dos campos');
    return false;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('usuário', user);
      return user;
    })
    .then((loggedUser) => {
      saveInfoProfile(userName);
      saveUserInfo(loggedUser.user, email, userName);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('E-mail já cadastrado');
      } else if (errorCode === 'auth/invalid-email') {
        alert('E-mail inválido');
      } else if (errorCode === 'auth/weak-password') {
        alert('Senha fraca');
      } else {
        console.log(error);
        alert('Algo deu errado. Por favor, tente novamente.');
      }
    });

  return true;
};

export const createReview = (event) => {
  event.preventDefault();
  const bookName = document.querySelector('#book-name').value;
  const bookAuthor = document.querySelector('#book-author').value;
  const bookReview = document.querySelector('#book-review').value;
  const user = auth.currentUser;
  const date = new Date();
  if (bookName === null || bookName === undefined || bookName === '') {
    alert('Por favor, escreva o nome do livro.');
  } else if (bookAuthor === null || bookAuthor === undefined || bookAuthor === '') {
    alert('Por favor, escreva o nome do autor.');
  } else if (bookReview === null || bookReview === undefined || bookReview === '') {
    alert('Por favor, escreva a resenha.');
  } else {
    reviewsCollection.add({
      user_information: {
        name: user.displayName,
        user_id: user.uid,
        photo: user.photoURL,
      },
      title: bookName,
      author: bookAuthor,
      review: bookReview,
      date: date.toLocaleString('pt-BR'),
      likes: 0,
    })
      .then(() => {
        document.querySelector('#book-name').value = '';
        document.querySelector('#book-author').value = '';
        document.querySelector('#book-review').value = '';
        alert('Sua resenha foi publicada com sucesso!');
      })
      .catch(() => {
        alert('Algo deu errado. Por favor, tente novamente.');
      });
  }
};

export const getReviews = (isGetAll) => {
  let collection = reviewsCollection;
  const user = auth.currentUser;
  if (!isGetAll && user) {
    collection = reviewsCollection.where('user_information.user_id', '==', user.uid);
  }
  return collection
    .orderBy('date', 'desc')
    .get()
    .then((queryReview) => queryReview.docs);
};

export const saveEditedReview = (reviewId, editedTitle, editedAuthor, editedReview) => {
  const reviewToEdit = reviewsCollection.doc(reviewId);

  reviewToEdit.update({
    title: editedTitle,
    author: editedAuthor,
    review: editedReview,
  });
};

export const deleteReview = (postId) => {
  reviewsCollection
    .doc(postId)
    .delete()
    .then(() => {
      alert('Deletou!');
    })
    .catch(() => {
      alert('Algo deu errado. Por favor, tente novamente.');
    });
};

export const likeReview = (reviewId) => {
  const reviewToLike = reviewsCollection.doc(reviewId);

  reviewToLike.update({
    likes: firebase.firestore.FieldValue.increment(1),
  });
};
