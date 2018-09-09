


def parse_image_name(image_name):
	image_name = image_name[image_name.rfind('/') + 1:]
	video_name,miliseconds,p_id = image_name.split('-')
	video_name = video_name.replace('_','.')
	miliseconds = int(miliseconds)
	p_id = p_id[:p_id.rfind('.')]
	return (video_name,miliseconds,p_id)

#print(parse_image_name('object_detection/3_mp4-121442-1.jpg')) 
