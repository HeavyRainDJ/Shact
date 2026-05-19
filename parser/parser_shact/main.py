import requests
from bs4 import BeautifulSoup
import csv
import re
from selenium import webdriver
import models
from models import parser


def csv_write(csv_name, data: list[models.Hackathon]):
    with open(csv_name, 'w', newline="") as file:
        header = ['name', "adress", "regitration", "link"]
        writer = csv.writer(file)
        writer.writerow(header)
        for row in data:
            writer.writerow([row.name, row.address, row.registration, row.link])


@parser
def parsing_hackathons_rus(url: str, data_storage: list[models.Hackathon]):
    class_is_multi = {'t-feed__link js-feed-post-link', 't-feed__post-tag t-uptitle t-uptitle_xs'}
    driver = webdriver.Chrome()
    driver.get(url)

    pattern = r"(online|offline)|([а-яА-Я\-]+)"
    driver.implicitly_wait(20)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    driver.quit()

    names = soup.find_all('a', class_=class_is_multi)
    city = soup.find_all('div', class_='t-feed__post-parts-date-row t-feed__post-parts-date-row_beforetitle')
    registration = soup.find_all('div', class_='t-feed__post-parts-date-row t-feed__post-parts-date-row_beforetitle')
    links = soup.find_all('a', class_='t-feed__link js-feed-post-link')

    if len(names) != len(city) != len(registration) != len(links):
        raise Exception("length are not equal")

    for i in range(len(names)):
        current_name = names[i]
        current_city = city[i]
        current_registration = registration[i]
        current_link = links[i]

        # Scraping address str from current_city
        text = current_city.text.replace('Регистрация открыта', '').replace('Регистрация закрыта', '') \
            .replace('Для школьников', '').replace('/u2028', '')
        matches = re.findall(pattern, text)
        new_matches = [', '.join(match) for match in matches]
        events_joined = [''.join(filter(None, event)) for event in new_matches]
        merged_string = ','.join(events_joined)
        # <--  -->

        # Scraping registration str from current_registration
        text = current_registration.text.replace('/u2028', '')
        pattern = re.compile(r'(Регистрация (?:открыта|закрыта))', re.IGNORECASE)
        matches = pattern.findall(text)
        match = matches[0]
        # <--  -->

        hackathon = models.Hackathon(name=current_name.text,
                                     address=merged_string,
                                     registration=match,
                                     link=current_link.get("href"))

        data_storage.append(hackathon)


@parser
def parsing_hackathons_rf(url: str, data_storage: list[models.Hackathon]):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 '
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    class_is_multi = {'t776__title t-name t-name_xl js-product-name', 't776__title t-name t-name_md js-product-name'}

    names = soup.find_all('div', class_=class_is_multi)
    city = soup.find_all('div', class_='t776__descr t-descr t-descr_xxs')
    links = soup.find_all('a', class_='t776__btn t-btn t-btn_sm')

    if len(names) != len(city) != len(links):
        raise Exception("length are not equal")

    for i in range(len(names)):
        current_name = names[i]
        current_city = city[i]
        current_link = links[i]

        address = "отсутствует"
        registration = "отсутствует"
        if current_city is not None:
            parts = str(current_city).split("<br/>")
            address = re.sub('<[^<]+?>', '', parts[0])
            registration = re.sub('<[^<]+?>', '', parts[3])

        hackathon = models.Hackathon(name=current_name.text,
                                     address=address,
                                     registration=registration,
                                     link=current_link.get("href"))
        data_storage.append(hackathon)


def main():
    # preparing data
    new_data = []  # type: list[models.Hackathon]
    csv_name = 'hackathons.csv'

    # starting parse process
    parsing_hackathons_rf('https://www.хакатоны.рф', new_data)
    parsing_hackathons_rus('https://www.хакатоны.рус', new_data)

    print(f"Total hackathons: {len(new_data)}")

    # saving data
    csv_write(csv_name, new_data)


if __name__ == "__main__":
    main()
