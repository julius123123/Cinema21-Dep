export interface Place {
  _id: string;
  nama: string;
  lokasi: string;
  buka: string;
  tutup: string;
  hariTutup: string[];
  kursi: string;
  meja: string;
  listrik: boolean;
  ac: boolean;
  bebasRokok: boolean;
  kondusif: boolean;
  lepasAlasKaki: boolean;
  makan: boolean;
  minum: boolean;
  wifi: boolean;
  fasilitas: string[];
  img: string;
  kampus: string;
}
