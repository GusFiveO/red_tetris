const Tetriminos = {
  Z: [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  I: [
    [0, 2, 0],
    [0, 2, 0],
    [0, 2, 0],
  ],
  L: [
    [0, 3, 3],
    [0, 3, 0],
    [0, 3, 0],
  ],
  T: [
    [0, 4, 0],
    [4, 4, 4],
    [0, 0, 0],
  ],
  O: [
    [5, 5],
    [5, 5],
  ],
  L2: [
    [3, 3, 0],
    [0, 3, 0],
    [0, 3, 0],
  ],
  Z2: [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
};

export const gameService = async () => {
  const gameBoard: number[][] = Array.from({ length: 20 }, () =>
    Array(10).fill(0)
  );
};

/*
class GameService {
  private tableauDeJeu: number[][] = Array.from({ length: 20 }, () => Array(10).fill(0));
  private pieceActuelle: number[][] = [];

  // Fonction pour générer une nouvelle pièce aléatoire
  private générerNouvellePièce(): void {
    const piècesTetris = [
      [[1, 1, 1, 1]],
      [[1, 1], [1, 1]],
      // ... ajoutez d'autres pièces
    ];

    const pièceIndex = Math.floor(Math.random() * piècesTetris.length);
    this.pieceActuelle = piècesTetris[pièceIndex];
  }

  // Fonction pour déplacer la pièce vers le bas
  public déplacerBas(): void {
    if (this.peutDescendre()) {
      this.effacerPièce();
      this.pieceActuelle.forEach(row => row[0]++);
    } else {
      this.pieceActuelle = this.générerNouvellePièce();
      this.mettreÀJourJeu();
    }
  }

  // Fonction pour déplacer la pièce vers la gauche
  public déplacerGauche(): void {
    if (this.peutDéplacer(-1)) {
      this.effacerPièce();
      this.pieceActuelle.forEach(row => row[1]--);
      this.mettreÀJourJeu();
    }
  }

  // Fonction pour déplacer la pièce vers la droite
  public déplacerDroite(): void {
    if (this.peutDéplacer(1)) {
      this.effacerPièce();
      this.pieceActuelle.forEach(row => row[1]++);
      this.mettreÀJourJeu();
    }
  }

  // Fonction pour vérifier si la pièce peut descendre
  private peutDescendre(): boolean {
    for (const [row, col] of this.pieceActuelle) {
      if (row + 1 >= this.tableauDeJeu.length || this.tableauDeJeu[row + 1][col] !== 0) {
        return false;
      }
    }
    return true;
  }

  // Fonction pour vérifier si la pièce peut se déplacer latéralement
  private peutDéplacer(direction: number): boolean {
    for (const [row, col] of this.pieceActuelle) {
      if (col + direction < 0 || col + direction >= this.tableauDeJeu[0].length || this.tableauDeJeu[row][col + direction] !== 0) {
        return false;
      }
    }
    return true;
  }

  // Fonction pour effacer la pièce du tableau de jeu
  private effacerPièce(): void {
    this.pieceActuelle.forEach(([row, col]) => {
      this.tableauDeJeu[row][col] = 0;
    });
  }

  // Fonction pour mettre à jour le tableau de jeu après un déplacement
  private mettreÀJourJeu(): void {
    if (this.peutDescendre()) {
      this.effacerPièce();
      this.pieceActuelle.forEach(([row, col]) => {
        this.tableauDeJeu[row][col] = 1;
      });
      this.effacerLignesComplètes();
    }
  }

  // Fonction pour effacer les lignes complètes
  private effacerLignesComplètes(): void {
    for (let row = this.tableauDeJeu.length - 1; row >= 0; row--) {
      if (this.tableauDeJeu[row].every(cell => cell !== 0)) {
        // Supprimez la ligne complète
        this.tableauDeJeu.splice(row, 1);
        // Ajoutez une nouvelle ligne vide en haut
        this.tableauDeJeu.unshift(Array(10).fill(0));
      }
    }
  }
}

export default GameService;*/
