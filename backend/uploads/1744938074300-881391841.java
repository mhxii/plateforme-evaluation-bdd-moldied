public class Exo2 {
    public static void main(String[] args) {
        // Création d'une liste
        LCB liste = new LCB();

        // Test ajout devant
        liste.ajouterDevant("Babacar");
        liste.ajouterDevant("Mohamed");
        liste.ajouterDevant("Nerva");

        // Affichage de la liste
        System.out.println("Liste après ajouts :");
        liste.afficher();

        // Suppression
        liste.supprimer("Babacar");

        // Affichage après suppression
        System.out.println("\nListe après suppression de Babacar :");
        liste.afficher();

        // Test de la version statique avec retour de pointeurs
        MaillonBi[] resultat = UtilsLCB.ajouterDevant("Soda", liste.premier, liste.dernier);
        liste.premier = resultat[0];
        liste.dernier = resultat[1];

        System.out.println("\nListe après ajout avec UtilsLCB :");
        liste.afficher();
    }
}

// Maillon doublement chaîné 
class MaillonBi {
    String val;
    MaillonBi prec;
    MaillonBi suiv;

    public MaillonBi(String val) {
        this.val = val;
    }
}


class LCB {
    MaillonBi premier;
    MaillonBi dernier;

    // Ajouter devant
    public void ajouterDevant(String val) {
        MaillonBi nouveau = new MaillonBi(val);
        nouveau.suiv = premier;

        if (premier != null) {
            premier.prec = nouveau;
        } else {
            dernier = nouveau;
        }

        premier = nouveau;
    }

    // Supprimer le premier maillon contenant la valeur
    public void supprimer(String val) {
        MaillonBi courant = premier;

        while (courant != null && !courant.val.equals(val)) {
            courant = courant.suiv;
        }

        if (courant == null) return;

        if (courant.prec != null) {
            courant.prec.suiv = courant.suiv;
        } else {
            premier = courant.suiv;
        }

        if (courant.suiv != null) {
            courant.suiv.prec = courant.prec;
        } else {
            dernier = courant.prec;
        }
    }

    // Affichage simple
    public void afficher() {
        MaillonBi courant = premier;
        while (courant != null) {
            System.out.print(courant.val);
            if (courant.suiv != null) System.out.print(" <-> ");
            courant = courant.suiv;
        }
        System.out.println();
    }
}


class UtilsLCB {
    public static MaillonBi[] ajouterDevant(String val, MaillonBi premier, MaillonBi dernier) {
        MaillonBi nouveau = new MaillonBi(val);
        nouveau.suiv = premier;

        if (premier != null) {
            premier.prec = nouveau;
        } else {
            dernier = nouveau;
        }

        premier = nouveau;

        return new MaillonBi[]{premier, dernier};
    }
}
