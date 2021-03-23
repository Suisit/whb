import torch as t
import torchvision as tv
import torchnet as tnt

from torch.utils import data

from PackedVGG import Vgg19
from transformer_net import TransformerNet
import utils
from torch.nn import functional as F
import tqdm

from transformer_style3 import TransformerNet2

mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]


class Config(object):
    # General Args
    use_gpu = True
    model_path = 'checkpoints/1_style+2.pth'  # pretrain model path (for resume training or test)

    # Train Args
    image_size = 256  # image crop_size for training
    batch_size = 1
    data_root = 'contect_picture'  # dataset root：$data_root/coco/a.jpg
    num_workers = 4  # dataloader num of workers

    lr = 1e-3
    epoches = 2  # total epoch to train
    content_weight = 1e5  # weight of content_loss
    style_weight = 1e10  # weight of style_loss

    style_path = 'style.jpg'  # style image path
    env = 'neural-style'  # visdom env
    plot_every = 10  # visualize in visdom for every 10 batch

    debug_file = '/tmp/debugnn'  # touch $debug_fie to interrupt and enter ipdb

    # Test Args
    content_path = 'video/%s.jpg'  # input file to do style transfer [for test]
    result_path = 'pic/%s.jpg'  # style transfer result [for test]


def stylize(**kwargs):
    """
    perform style transfer
    """
    opt = Config()
    # model setup
    if opt.model_path == 'checkpoints/0_style2.pth':
        style_model = TransformerNet2().eval()
    else:
        style_model = TransformerNet().eval()
    style_model.load_state_dict(t.load(opt.model_path, map_location=lambda _s, _: _s))
    for i in range(3435):
        i+=1
        for k_, v_ in kwargs.items():
            setattr(opt, k_, v_)
        device = t.device('cpu')
        # input image preprocess
        content_image = tv.datasets.folder.default_loader(opt.content_path%i)
        content_transform = tv.transforms.Compose([
            tv.transforms.ToTensor(),
            tv.transforms.Lambda(lambda x: x.mul(255))
        ])
        content_image = content_transform(content_image)
        content_image = content_image.unsqueeze(0)

        # style transfer and save output
        output = style_model(content_image)
        output_data = output.cpu().data[0]
        tv.utils.save_image(((output_data / 255)).clamp(min=0, max=1), opt.result_path%i)


if __name__ == '__main__':
    stylize()