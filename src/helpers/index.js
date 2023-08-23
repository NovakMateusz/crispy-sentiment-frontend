const insertTags = (text, data) => {
    let old_start, old_stop;
    const sentencesArray = [];
    for (let i = 0; i <= data.length; i++) {
      const item = data[i];
      if (i == data.length) {
        if (old_stop != text.length) {
          sentencesArray.push(text.slice(old_stop));
        }
      } else {
        if (old_start !== undefined && old_stop !== undefined) {
          if (old_stop != item['start']) {
            sentencesArray.push(text.slice(old_stop, item['start']));
          }
        }
  
        let htmlClass;
        switch (item['sentiment']) {
          case 'Positive':
            htmlClass = 'text-success';
            break;
          case 'Negative':
            htmlClass = 'text-danger';
            break;
          default:
            alert('Internal server error');
            return;
        }
  
        const start_tag = `<span class="${htmlClass}">`;
        const end_tag = '</span>';
        const temp_str = start_tag + text.slice(item['start'], item['stop']) + end_tag;
        sentencesArray.push(temp_str);
        old_start = item['start'];
        old_stop = item['stop'];
      }
    }
    const output = sentencesArray.join('');
    return output.replaceAll(/\r?\n/g, '<br>');
  };

export default insertTags;