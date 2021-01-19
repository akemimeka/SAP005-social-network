/* eslint-disable no-alert */
export const googleLogin = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      firebase.firestore().collection('users').doc(user.email)
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
  firebase.auth().signOut();
};

export const emailAndPasswordLogin = (emailValue, passwordValue) => {
  if (!emailValue) {
    alert('Por favor, digite o endereço de email.');
  } else if (!passwordValue) {
    alert('Por favor, digite sua senha.');
  } else {
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
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
  }
};

export const saveInfoProfile = (userName) => {
  const userProfile = firebase.auth().currentUser;

  userProfile.updateProfile({
    displayName: userName,
    photoURL: '../img/default_user_icon.jpg',
  })
    .then()
    .catch();
};

const saveUserInfo = (user, email, userName) => {
  firebase.firestore().collection('users').doc(email)
    .set({
      name: userName,
      id: user.uid,
      photo: '../img/default_user_icon.jpg',
    }, { merge: true });
};

export const createAccount = (userName, email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    alert('A senha digitada está diferente em um dos campos');
    return false;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => user)
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
        alert('Algo deu errado. Por favor, tente novamente.');
      }
    });

  return true;
};

export const createReview = (formReview, titleValue, authorValue, reviewValue) => {
  const user = firebase.auth().currentUser;
  const date = new Date();

  if (!titleValue) {
    alert('Por favor, escreva o nome do livro.');
  } else if (!authorValue) {
    alert('Por favor, escreva o nome do autor.');
  } else if (!reviewValue) {
    alert('Por favor, escreva a resenha.');
  } else {
    firebase.firestore().collection('reviews').add({
      user_information: {
        name: user.displayName,
        user_id: user.uid,
        photo: user.photoURL,
      },
      title: titleValue,
      author: authorValue,
      review: reviewValue,
      date: date.toLocaleString('pt-BR'),
      likes: 0,
    })
      .then(() => {
        formReview.reset();
        alert('Sua resenha foi publicada com sucesso!');
      })
      .catch(() => {
        alert('Algo deu errado. Por favor, tente novamente.');
      });
  }
};

export const getReviews = (isGetAll) => {
  let collection = firebase.firestore().collection('reviews');
  const user = firebase.auth().currentUser;
  if (!isGetAll && user) {
    collection = firebase.firestore().collection('reviews').where('user_information.user_id', '==', user.uid);
  }
  return collection
    .orderBy('date', 'desc')
    .get()
    .then((queryReview) => queryReview.docs);
};

export const saveEditedReview = (reviewId, editedTitle, editedAuthor, editedReview) => {
  const reviewToEdit = firebase.firestore().collection('reviews').doc(reviewId);

  reviewToEdit.update({
    title: editedTitle,
    author: editedAuthor,
    review: editedReview,
  });
};

export const deleteReview = (postId) => {
  firebase.firestore().collection('reviews')
    .doc(postId)
    .delete()
    .then(() => {
      alert('Deletado com sucesso.');
    })
    .catch(() => {
      alert('Algo deu errado. Por favor, tente novamente.');
    });
};

export const likeReview = (reviewId) => {
  const reviewToLike = firebase.firestore().collection('reviews').doc(reviewId);
  reviewToLike.update({
    likes: firebase.firestore.FieldValue.increment(1),
  });
};
