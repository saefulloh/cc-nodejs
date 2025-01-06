const request = require('supertest');
const app = require('./index');
const { luas } = require('./index');

describe('Fungsi luas()', () => {
  test('Menghitung luas dengan benar', () => {
    expect(luas(5, 10)).toBe(50);
    expect(luas(7, 3)).toBe(21);
  });

  test('Melempar error jika input tidak valid', () => {
    expect(() => luas(-1, 5)).toThrow('Invalid input');
    expect(() => luas(5, 'a')).toThrow('Invalid input');
    expect(() => luas(0, 5)).toThrow('Invalid input');
  });
});

describe('POST /hitung-luas', () => {
  test('Mengembalikan hasil luas yang benar', async () => {
    const response = await request(app)
      .post('/hitung-luas')
      .send({ length: 5, width: 10 })
      .expect(200);
    
    expect(response.body.area).toBe(50);
  });

  test('Mengembalikan error 400 untuk input yang tidak valid', async () => {
    const response = await request(app)
      .post('/hitung-luas')
      .send({ length: -5, width: 10 })
      .expect(400);
    
    expect(response.body.error).toBe('Invalid input');
  });
});
